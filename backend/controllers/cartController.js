import jwt from 'jsonwebtoken';
import cartData from '../models/cartModel.js';
import userModel from '../models/userModel.js';

// Get the users current cart
export const usersCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID is required' });
    }

    // Find user and get their cart
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      cart: user.cart || [],
    });
  } catch (error) {
    console.error('Get user cart error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      name,
      price,
      image,
      quantity = 1,
      category,
      size,
    } = req.body;

    if (!productId || !name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required product information',
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (!user.cart) {
      user.cart = [];
    }

    // Check if product already exists in cart
    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex > -1) {
      // Update quantity if product exists
      user.cart[productIndex].quantity += parseInt(quantity) || 1;
    } else {
      user.cart.push({
        productId,
        name,
        price,
        image,
        quantity: parseInt(quantity) || 1,
        category,
        size,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart: user.cart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'ProductId and quantity are required',
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Check if cart exists
    if (!user.cart || !Array.isArray(user.cart)) {
      user.cart = [];
      return res.status(404).json({ success: false, message: 'Cart is empty' });
    }

    // Find the product in the cart
    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found in cart' });
    }

    // Update quantity
    user.cart[productIndex].quantity = parseInt(quantity);

    // Save user
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart item quantity updated',
      cart: user.cart,
    });
  } catch (error) {
    console.error('Update cart item quantity error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Get product ID from params
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: 'ProductId is required' });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Check if cart exists
    if (!user.cart || !Array.isArray(user.cart)) {
      user.cart = [];
      return res.status(404).json({ success: false, message: 'Cart is empty' });
    }

    // Filter out the product to remove
    user.cart = user.cart.filter((item) => item.productId !== productId);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart: user.cart,
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};
