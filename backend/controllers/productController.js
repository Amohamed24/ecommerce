import productModel from '../models/productModel.js';

// List all products
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    
    res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};