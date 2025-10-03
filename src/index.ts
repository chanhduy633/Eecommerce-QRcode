import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes'; 
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT ||5317;

app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript + MongoDB!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});