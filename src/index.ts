import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes'; 
import authGoogleRoutes from './routes/authGoogleRoutes'; 
import authUserRoutes from './routes/authUserRoutes'; 
import  { createProductRouter } from './routes/productRoutes'
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import specificationRoutes from './routes/specificationRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cors from 'cors';
import uploadRoutes from "./routes/upload";
import path from "path";
import passport from './config/passport';
import chatRoutes from './routes/chatRoutes';


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT ||5317;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://fe-ecommerce-q-rcode.vercel.app",
];

app.use(cors({
  origin: (origin, callback) => {
    // Cho phép Postman, curl, server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  },
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
app.use("/api/specifications", specificationRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript + MongoDB!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});