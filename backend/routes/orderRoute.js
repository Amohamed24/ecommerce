import express from 'express';
import { saveAddress, getAddress } from '../controllers/addressController.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Address routes
orderRouter.post('/address', authUser, saveAddress);
orderRouter.get('/address', authUser, getAddress);

export default orderRouter;
