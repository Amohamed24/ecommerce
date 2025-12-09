import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import userModel from './models/userModel.js'; 
import productRouter from './routes/productRoute.js';

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// App Config
const app = express();
const PORT = process.env.PORT || 5001;
connectDb();

// CORS setup: wide-open in DEV, strict whitelist in PROD
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: true,
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
    })
  );
} else {
  const allowedOrigins = [
    'https://ecommerce-mohamed-ahmeds-projects-dc30db48.vercel.app',
    'https://ecommerce-git-main-mohamed-ahmeds-projects-dc30db48.vercel.app',
    'https://ecommerce-6uq8gfv0j-mohamed-ahmeds-projects-dc30db48.vercel.app',
    'http://localhost:5173',
  ];
  app.use(
    cors({
      origin: (origin, callback) =>
        !origin || allowedOrigins.includes(origin)
          ? callback(null, true)
          : callback(new Error('Not allowed by CORS')),
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: false,
    })
  );
}

// Body parser
app.use(express.json());

// Simple health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// DB connection test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({
      success: true,
      message: 'DB connection works',
      userCount: count,
    });
  } catch (error) {
    console.error('DB Test Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/user', cartRouter);
app.use('/api/user', orderRouter);
app.use('/api/product', productRouter);

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message,
  });
});

// Only start server if not in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
  });
}

export default app;
