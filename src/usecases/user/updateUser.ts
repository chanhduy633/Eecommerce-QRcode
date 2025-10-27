import { IUserRepository } from "../../repositories/userRepository";
import {  UpdateUserDto, UserResponse } from "../../types/userTypes";

export class UpdateUser {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<UserResponse | null> {
    // 1. Lấy thông tin user hiện tại
    const currentUser = await this.repo.findById(id);
    if (!currentUser) {
      return null;
    }

    // 2. Nếu có cập nhật email, kiểm tra tính duy nhất
    if (data.email && data.email !== currentUser.email) {
      const existingUser = await this.repo.findByEmail(data.email);
      if (existingUser) {
        throw new Error('Email đã được sử dụng');
      }
    }

    // 3. Tiến hành cập nhật
    const updated = await this.repo.update(id, data);
    return updated
      ? {
          _id: updated._id.toString(),
          email: updated.email,
          full_name: updated.full_name,
          phone: updated.phone,
          address: updated.address ?? null,
          role: updated.role,
          createdAt: updated.createdAt.toISOString(),
          updatedAt: updated.updatedAt.toISOString(),
        }
      : null;
  }
}