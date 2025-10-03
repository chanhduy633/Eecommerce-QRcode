// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Middleware: Xác thực token (bắt buộc đăng nhập)
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Không có token. Truy cập bị từ chối!' });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    
    // Tìm user theo ID trong token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // Gắn user vào request để dùng ở controller/route sau
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Middleware: Chỉ cho phép admin
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'admin') {
    return res.status(403).json({ message: 'Chỉ admin mới có quyền thực hiện hành động này!' });
  }
  next();
};