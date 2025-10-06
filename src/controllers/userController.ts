import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { CreateUserDto, UpdateUserDto, UserResponse } from "../types/userTypes";

const toUserResponse = (user: any): UserResponse => ({
  _id: user._id.toString(),
  email: user.email,
  full_name: user.full_name,
  phone: user.phone,
  address: user.address,
  role: user.role,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});

// GET /api/users — Lấy danh sách tất cả người dùng
export const getAllUsers = async (
  req: Request<any, UserResponse[], any, any>,
  res: Response<UserResponse[]>
): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    const response: UserResponse[] = users.map(toUserResponse);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};

// GET /api/users/:id — Lấy thông tin chi tiết người dùng theo ID
export const getUserById = async (
  req: Request<{id: string},UserResponse, any, any>,
  res: Response<UserResponse>
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy User" } as any);
      return;
    }
    res.status(200).json(toUserResponse(user));
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};

// POST /api/users — Tạo người dùng mới
export const createUser = async (
  req: Request<any, UserResponse, CreateUserDto, any>,
  res: Response<UserResponse>
): Promise<void> => {
  try {
    // ✅ Dùng CreateUserDto để typing req.body
    const { email, password, full_name, phone, address } =
      req.body as CreateUserDto;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email đã được sử dụng" } as any);
      return;
    }

    const user = new User({
      email,
      password,
      full_name,
      phone,
      address,
      role: "user",
    });

    const savedUser = await user.save();
    res.status(201).json(toUserResponse(savedUser));
  } catch (error: any) {
    res.status(400).json({ error: error.message } as any);
  }
};

// PUT /api/users/:id — Cập nhật người dùng
export const updateUser = async (
  req: Request<{ id: string }, UserResponse, UpdateUserDto, any>,
  res: Response<UserResponse>
): Promise<void> => {
  try {
    // ✅ Dùng UpdateUserDto
    const updateData = req.body as UpdateUserDto;
    let finalUpdateData = { ...updateData };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(12);
      finalUpdateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, finalUpdateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      res.status(404).json({ message: "Không tìm thấy User" } as any);
      return;
    }

    res.status(200).json(toUserResponse(user));
  } catch (error: any) {
    res.status(400).json({ error: error.message } as any);
  }
};

// DELETE /api/users/:id — Xoá người dùng
export const deleteUser = async (
   req: Request<{ id: string }, { message: string }, any, any>,
  res: Response<{ message: string }>
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy User" });
      return;
    }
    res.status(200).json({ message: "Xóa User thành công" });
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};
