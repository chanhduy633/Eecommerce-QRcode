import { IUserRepository } from "../../repositories/userRepository";
import { CreateUserDto, UserResponse } from "../../types/userTypes";

export class CreateUser {
  constructor(private readonly repo: IUserRepository) {}

  async execute(data: CreateUserDto): Promise<UserResponse> {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new Error("Email đã được sử dụng");

    const created = await this.repo.create(data);
    return {
      _id: created._id.toString(),
      email: created.email,
      full_name: created.full_name,
      phone: created.phone,
      address: created.address ?? null,
      role: created.role,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
  }
}
