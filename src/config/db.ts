// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import env from './env';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB kết nối: ${conn.connection.host}`);
  } catch (error) {
    console.error('Lỗi khi kết nối MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;