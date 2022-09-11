import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
});

export default mongoose.model(`User`, UserModel);
