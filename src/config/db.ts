// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
 const connectionString = process.env.MONGODB_CONNECTION_STRING;

  if (!connectionString) {
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB kết nối: ${conn.connection.host}`);
  } catch (error) {
    console.error('Lỗi khi kết nối MongoDb:', error);
    process.exit(1);
  }
};

export default connectDB;