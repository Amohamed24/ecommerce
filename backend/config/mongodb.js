import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const dbUri = process.env.MONGODB_URI; // Ensure the URI is correct in your .env file
    await mongoose.connect(dbUri); // Ensure no deprecated options are used
    console.log("MongoDB Connected Successfully!")
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the app if the connection fails
  }
};

export default connectDb;


