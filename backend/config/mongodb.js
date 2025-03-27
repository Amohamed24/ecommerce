import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.connection.on('connected', () => {
    console.log('DB Connected');
  });

  const dbUri = process.env.MONGODB_URI;

  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
