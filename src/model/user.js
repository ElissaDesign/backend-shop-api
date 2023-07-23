import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: false,
    },
    phone: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("users", userSchema);

export default users;
