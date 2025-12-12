import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const dbUri = process.env.MONGODB_URI; 
    await mongoose.connect(dbUri); 
    console.log("MongoDB Connected Successfully!")
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDb;


