import express from 'express';
import {
  usersCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../controllers/cartController';
import authUser from '../middleware/auth';

const cartRouter = express.Router();

// All routes need a valid login
cartRouter.get('/cart', authUser, usersCart);
cartRouter.post('/addToCart', authUser, addToCart);
cartRouter.put('/update-cart-quantity', authUser, updateCartItemQuantity);
cartRouter.delete('/remove-from-cart/:productId', authUser, removeFromCart);

export default cartRouter;
