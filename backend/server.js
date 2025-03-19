import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// App Config
const app = express();
const PORT = process.env.PORT;
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
