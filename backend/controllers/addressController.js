import User from '../models/userModel.js';

// Save user address
export const saveAddress = async (req, res) => {
  try {
    const { address, city, zipcode, userId } = req.body;
    
    if (!address || !city || !zipcode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Debugging
    console.log('User ID from request:', userId);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID not provided. Authentication required.'
      });
    }
    
    // Find the user by the ID from the token
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Add the new address to the user's address array
    if (!user.address) {
      user.address = [];
    }
    
    user.address.push({
      address,
      city,
      zipcode,
      country: 'United States' // Default as it's disabled in frontend
    });
    
    // Save the updated user
    await user.save();
    
    // Return the newly added address
    const newAddress = user.address[user.address.length - 1];
    
    res.status(201).json({
      success: true,
      message: 'Address saved successfully',
      address: newAddress
    });
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
};

// Get user's addresses
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID not provided. Authentication required.'
      });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (!user.address || user.address.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No address found'
      });
    }
    
    // Return the most recent address (last in the array)
    const latestAddress = user.address[user.address.length - 1];
    
    res.status(200).json({
      success: true,
      address: latestAddress
    });
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};