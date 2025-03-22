import mongoose from "mongoose";

const cartData = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 },
  category: { type: String },
  size: { type: String }
}, { _id: false });


export default cartData;

