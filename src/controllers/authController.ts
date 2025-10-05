import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt';
import { LoginDto } from '../types/auth.types';

const toAuthUserResponse = (user: any) => ({
  id: user._id.toString(),
  email: user.email,
  full_name: user.full_name,
  role: user.role,
});

// POST /api/auth/admin/login
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    // Dùng LoginDto để typing req.body
    const { email, password } = req.body as LoginDto;

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
      user: toAuthUserResponse(user),
    });
  } catch (error: any) {
    console.error('Lỗi khi đăng nhập admin:', error);
    res.status(500).json({ message: 'Lỗi server nội bộ' });
  }
};