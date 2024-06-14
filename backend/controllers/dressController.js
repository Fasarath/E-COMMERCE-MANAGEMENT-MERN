
import dressModel from "../models/dressModel.js";
import fs from 'fs';
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// add dress item
const addDress = catchAsyncError(async (req, res, next) => {
    let image_filename = `${req.file.filename}`;

    const dress = new dressModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await dress.save();
        res.json({success: true, message: "Dress Added"});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
});

// all dress list
const listDress = catchAsyncError(async (req, res, next) => {
    try {
        const dresses = await dressModel.find({});
        res.json({success: true, data: dresses});
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
});


// remove dress item
const removeDress = catchAsyncError(async (req, res, next) => {
    try {
        const dress = await dressModel.findById(req.body.id);
        fs.unlink(`uploads/${dress.image}`, () => {});

        await dressModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Dress Removed"})
    } catch (error) {
        return next ( new ErrorHandler( error ))
    }
});

export {addDress, listDress, removeDress};