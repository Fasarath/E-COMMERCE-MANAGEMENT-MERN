import userModel from "../models/userModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


// add items to user cart 
const addToCart = catchAsyncError ( async (req, res, next) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart"});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
} );


// remove items from user cart
const removeFromCart = catchAsyncError(async (req, res, next) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Removed From Cart"});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
});


// fetch user cart data
const getCart = catchAsyncError(async (req, res, next) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
});


export {addToCart, removeFromCart, getCart};