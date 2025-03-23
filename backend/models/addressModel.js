import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  country: { type: String, required: true, default: 'United States' },
}, {
  timestamps: true
});


export default addressSchema;