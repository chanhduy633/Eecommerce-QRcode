import bcrypt from "bcryptjs";
import { generateToken } from "../../config/jwt";
import {
  IAuthRepository,
  LoginDto,
  AdminLoginResponse,
} from "../../types/authTypes";

export class AdminLoginUseCase {
  private readonly repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  async execute(data: LoginDto): Promise<AdminLoginResponse> {
    const { email, password } = data;

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Thông tin đăng nhập không hợp lệ");
    }

    if (user.role !== "admin") {
      throw new Error("Chỉ admin mới được phép truy cập");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Thông tin đăng nhập không hợp lệ");
    }

    const token = generateToken(user._id.toString());

    return {
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        full_name: user.full_name,
        role: "admin",
      },
    };
  }
}
