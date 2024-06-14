import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter the name"] },

    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
      validate: [validator.isEmail, "Please enter the email in correct format"],
    },

    password: {
      type: String,
      required: [true, "Please enter the password"],
      select: false,
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    cartData: { type: Object, default: {} },
  },
  
);

//hashing the password
userSchema.pre('save', async function (next) {
    if(!this.isModified) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const userModel = mongoose.model("User", userSchema);

export default userModel;
