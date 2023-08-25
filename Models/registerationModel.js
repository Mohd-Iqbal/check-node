import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  options: {
    type: Array,
    default: ["Default", "Personal", "Shopping", "Wishlist", "Work"],
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      password: this.password,
    },
    "jwtPrivateKey"
  );
  return token;
};

const User = mongoose.model("User", userSchema);

let schema;
function validateUser() {
  return (schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),

    email: Joi.string().min(5).max(255).required().email(),

    password: Joi.string().min(5).max(255).required(),

    options: Joi.string(),
  }));
}

export { User, validateUser };
