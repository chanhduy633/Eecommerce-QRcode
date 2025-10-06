import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import { LoginDto, AdminLoginResponse } from "../types/authTypes";

const toAuthUserResponse = (user: any) => ({
  id: user._id.toString(),
  email: user.email,
  full_name: user.full_name,
  role: user.role,
});

// POST /api/auth/admin/login
export const adminLogin = async (req: Request<any, AdminLoginResponse, LoginDto, any>,res: Response<AdminLoginResponse, any>): Promise<void> => {
  try {
    const { email, password } = req.body;
    //Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ" } as any);
      return;
    }

    //Kiểm tra role
    if (user.role !== "admin") {
      res
        .status(403)
        .json({ message: "Chỉ admin mới được phép truy cập" } as any);
      return;
    }

    // 3. Xác minh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ" } as any);
      return;
    }

    // 4. Tạo token
    const token = generateToken(user._id.toString());

    // 5. Trả về response thành công
    const response: AdminLoginResponse = {
      success: true,
      token,
      user: toAuthUserResponse(user),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi khi đăng nhập admin:", error);
    res.status(500).json({ message: "Lỗi server nội bộ" } as any);
  }
};
