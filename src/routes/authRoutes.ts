// routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import { adminLogin } from '../controllers/authController';

const router = Router();
router.post('/admin/login', adminLogin);

export default router;