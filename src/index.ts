import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import User from './models/User';
import Product from './models/Product';
import Cart from './models/Cart';
import Order from './models/Order';


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT ||5317;

app.use(express.json());

app.get('/users', (req: Request, res: Response) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
app.post('/users', (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save()
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});




app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript + MongoDB!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});