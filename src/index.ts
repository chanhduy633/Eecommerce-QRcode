import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes'; 
import authGoogleRoutes from './routes/authGoogleRoutes'; 
import authUserRoutes from './routes/authUserRoutes'; 
import  { createProductRouter } from './routes/productRoutes'
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cors from 'cors';
import uploadRoutes from "./routes/upload";
import path from "path";
import passport from './config/passport';



dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT ||5317;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api/upload", uploadRoutes);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use("/api/auth/oauth", authGoogleRoutes);
app.use('/api/auth/user', authUserRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/v1/products", createProductRouter("v1"));
app.use("/api/v2/products", createProductRouter("v2"));
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript + MongoDB!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});