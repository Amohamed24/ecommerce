import mongoose from 'mongoose';
import cartData from './cartModel.js';
import addressSchema from './addressModel.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartData],
  address: [addressSchema],
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
