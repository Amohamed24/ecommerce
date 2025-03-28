import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import userModel from './models/userModel.js'; // Import your user model

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// App Config
const app = express();
const PORT = process.env.PORT;
connectDb();

// CORS setup to allow requests from both local and production frontend
const allowedOrigins = [
  'https://ecommerce-git-main-mohamed-ahmeds-projects-dc30db48.vercel.app', // production URL
  'https://ecommerce-6uq8gfv0j-mohamed-ahmeds-projects-dc30db48.vercel.app', // current frontend URL
  'http://localhost:5174', // local URL for testing
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow localhost and the production frontend to access the API
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      console.log('CORS blocked request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization', // Ensure Authorization header is allowed
  credentials: false, // No need for cookies, since we're using tokens
};

// Use CORS middleware
app.use(cors(corsOptions));

// Explicit OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // Allow dynamic origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'false'); // No need for credentials since you're using tokens
  res.status(200).end();
});

app.use(express.json());

// Simple health check endpoint for the root path
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// DB connection test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({ success: true, message: 'DB connection works', userCount: count });
  } catch (error) {
    console.error('DB Test Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/user', cartRouter);
app.use('/api/user', orderRouter);

// Catch-all route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Server error', 
    error: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

export default app;