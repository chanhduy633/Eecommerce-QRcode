// middleware/authMiddleware.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../repositories/models/User";
import { IUserDocument } from "../types/userTypes";

interface JwtPayload {
  id: string;
}

// Middleware bảo vệ route, xác thực token
export const protect: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Không có token. Truy cập bị từ chối!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userDoc = await User.findById(decoded.id).select("-password");

    if (!userDoc) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    // Gán user vào req, ép kiểu IUserDocument
    (req as any).user = {
      _id: userDoc._id,
      email: userDoc.email,
      full_name: userDoc.full_name,
      role: userDoc.role,
      phone: userDoc.phone,
      address: userDoc.address,
    } as IUserDocument;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// Middleware chỉ cho admin
export const adminOnly: RequestHandler = (req, res, next) => {
  const user = (req as any).user as IUserDocument;

  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới có quyền thực hiện hành động này!" });
  }

  next();
};
