// controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt';

// POST /api/auth/admin/login
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
      return;
    }

    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Chỉ admin mới được phép truy cập' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Lỗi khi đăng nhập admin:', error);
    res.status(500).json({ message: 'Lỗi server nội bộ' });
  }
};