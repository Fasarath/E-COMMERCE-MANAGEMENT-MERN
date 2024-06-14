import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!validator.isEmail(email)) {
    return res.json({
      success: false,
      message: "Please enter the valid email",
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const user = await userModel.create({
      name: name,
      email: email,
      password: password,
    });

    const token = createToken(user._id);
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error));
  }
});

export { loginUser, registerUser };
