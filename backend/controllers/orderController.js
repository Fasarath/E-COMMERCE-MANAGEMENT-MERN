import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = catchAsyncError(async (req, res, next) => {
    const frontendUrl = "http://localhost:0000";

    try {
        // Create a new order
        const newOrder = await orderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address 
        });

        // Save the new order
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout session
        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Add delivery charges to line items
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 5 * 100
            },
            quantity: 1
        });

        // Create a new Stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Send the session URL back to the client
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        // Pass any errors to the error handling middleware
        return next(new ErrorHandler(error));
    }
});

// verify order
const verifyOrder = catchAsyncError( async (req, res, next) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success: true, message: "Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"});
        }
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
} );

// user orders for frontend
const userOrders = catchAsyncError ( async (req, res, next) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
} );

// Listing orders for admin panel
const listOrders = catchAsyncError( async (req, res, next) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (error) {
        return next ( new ErrorHandler( error ))

 } })   


// update the order status
const updateStatus = catchAsyncError( async (req, res, next) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
} );

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};