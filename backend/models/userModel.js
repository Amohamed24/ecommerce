import mongoose from 'mongoose';
import cartData from './cartModel.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartData],
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
