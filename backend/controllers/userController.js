import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = createToken(user.id);
       // Send user's name along with the token
      res.json({
        success: true,
        token,
        name: user.name,
        email: user.email,
      });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Checking if user exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email',
      });
    }
    
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a strong password',
      });
    }
    
    // Hashing users password and identical passwords will still produce unique hashes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    
    // Stores user in database
    const user = await newUser.save();
    
    const token = createToken(user._id);
    
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

export { loginUser, registerUser };
