import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express();
const PORT = process.env.PORT;
connectDb();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/user', cartRouter);
app.use('/api/user', orderRouter)

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
