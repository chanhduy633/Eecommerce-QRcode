// src/controllers/authController.ts
import { Request, Response } from "express";
import { AuthRepository } from "../repositories/authRepository";
import { AuthService } from "../services/authService";
import { LoginDto, AdminLoginResponse } from "../types/authTypes";

// Khởi tạo dependency injection
const repository = new AuthRepository();
const service = new AuthService(repository);

export class AuthController {
  static async adminLogin(
    req: Request<any, AdminLoginResponse, LoginDto, any>,
    res: Response<AdminLoginResponse>
  ): Promise<void> {
    try {
      const result = await service.adminLogin(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Lỗi khi đăng nhập admin:", error);
      if (
        error.message === "Thông tin đăng nhập không hợp lệ" ||
        error.message === "Chỉ admin mới được phép truy cập"
      ) {
        res.status(401).json({ message: error.message } as any);
      } else {
        res.status(500).json({ message: "Lỗi server nội bộ" } as any);
      }
    }
  }
}
