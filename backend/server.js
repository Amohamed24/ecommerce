import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const PORT = process.env.PORT;
connectDb();

// Add CORS headers to all responses
const allowedOrigins = [
  'https://ecommerce-git-main-mohamed-ahmeds-projects-dc30db48.vercel.app', 
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, 
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Explicit OPTIONS handler for all routes (preflight)
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

app.use(express.json());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/user', cartRouter);
app.use('/api/user', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

export default app;
