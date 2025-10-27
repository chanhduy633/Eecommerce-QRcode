// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../repositories/models/User";
import { IUserDocument } from "../types/userTypes";

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  let token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Không có token. Truy cập bị từ chối!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user.toObject() as IUserDocument;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

export const adminOnly = (
  req: AuthenticatedRequest, 
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới có quyền thực hiện hành động này!" });
  }
  next();
};