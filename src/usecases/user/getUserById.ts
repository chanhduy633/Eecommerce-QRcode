import { IUserRepository } from "../../repositories/userRepository";
import { UserResponse } from "../../types/userTypes";

export class GetUserById {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<UserResponse | null> {
    const user = await this.repo.findById(id);
    return user
      ? {
          _id: user._id.toString(),
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          address: user.address ?? null,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }
      : null;
  }
}
