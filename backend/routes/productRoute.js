import express from 'express';
import { listProducts } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/list', listProducts);

export default productRouter;
