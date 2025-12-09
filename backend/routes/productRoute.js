import express from 'express';
import { listProducts } from '../controllers/productController.js'; 

const productRouter = express.Router();

productRouter.get('/list', listProducts);

export default productRouter;
