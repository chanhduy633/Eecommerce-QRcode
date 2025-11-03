import { IAuthRepository } from "../../repositories/authUserRepository";

export class ForgotPassword {
  constructor(private authRepo: IAuthRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.authRepo.findByEmail(email);
    if (!user) throw new Error("Không tìm thấy tài khoản");
    // TODO: Gửi email reset link
  }
}
