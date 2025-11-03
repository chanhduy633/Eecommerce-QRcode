import { IAuthRepository } from "../../repositories/authUserRepository";
import { IUserDocument } from "../../types/userTypes";

export class LoginUser {
  constructor(private authRepo: IAuthRepository) {}

  async execute(email: string, password: string): Promise<IUserDocument> {
    const user = await this.authRepo.login(email, password);
    if (!user) throw new Error("Sai email hoặc mật khẩu");
    return user;
  }
}
