import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// GET /api/users — Lấy danh sách tất cả người dùng
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users/:id — Lấy thông tin chi tiết người dùng theo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy User' });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/users — Tạo người dùng mới
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, full_name, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email đã được sử dụng' });
      return;
    }

    const user = new User({
      email,
      password,
      full_name,
      phone,
      address,
      role: 'user',
    });

    const savedUser = await user.save();
    res.status(201).json({
      id: savedUser._id,
      email: savedUser.email,
      full_name: savedUser.full_name,
      phone: savedUser.phone,
      address: savedUser.address,
      role: savedUser.role,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/users/:id — Cập nhật người dùng
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy User' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/users/:id — Xoá người dùng
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy User' });
      return;
    }
    res.status(200).json({ message: 'Xóa User thành công' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};