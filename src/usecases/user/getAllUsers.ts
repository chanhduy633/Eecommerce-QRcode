import { IUserRepository } from "../../repositories/userRepository";
import {  UserResponse } from "../../types/userTypes";

export class GetAllUsers {
  constructor(private readonly repo: IUserRepository) {}

  async execute(): Promise<UserResponse[]> {
    const users = await this.repo.findAll();
    return users.map(u => ({
      _id: u._id.toString(),
      email: u.email,
      full_name: u.full_name,
      phone: u.phone,
      address: u.address ?? null,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    }));
  }
}
