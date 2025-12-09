import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  gender: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  size: { type: String },
  alt: { type: String },
  image: [String],
  description: { type: String },
  rating: { type: Number },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, default: Date.now }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;