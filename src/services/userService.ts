import {
  IUserService,
  IUserRepository,
  IUserDocument,
  UserResponse,
  CreateUserDto,
  UpdateUserDto,
} from "../types/userTypes";

export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}

  private toResponse(user: IUserDocument): UserResponse {
    return {
      _id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      address: user.address ?? null,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async getAll(): Promise<UserResponse[]> {
    const users = await this.repository.findAll();
    return users.map((u) => this.toResponse(u));
  }

  async getById(id: string): Promise<UserResponse | null> {
    const user = await this.repository.findById(id);
    return user ? this.toResponse(user) : null;
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) throw new Error("Email đã được sử dụng");

    const newUser = await this.repository.create(data);
    return this.toResponse(newUser);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse | null> {
    const updated = await this.repository.update(id, data);
    return updated ? this.toResponse(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return !!deleted;
  }
}
