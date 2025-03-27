// /api/user.js
import connectDb from '../config/mongodb.js';
import { registerUser, loginUser } from '../controllers/userController.js';

// Connect to database once
connectDb();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request for registration or login
  if (req.method === 'POST') {
    // Determine if it's a login or register request based on the body
    const { email, password, name } = req.body;

    if (name) {
      // If name is provided, it's a registration request
      return registerUser(req, res);
    } else {
      // Otherwise it's a login request
      return loginUser(req, res);
    }
  }

  // Handle other methods
  return res.status(405).json({ message: 'Method not allowed' });
}
