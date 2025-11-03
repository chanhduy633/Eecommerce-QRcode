import { IAuthRepository } from "../../repositories/authUserRepository";
import { IUserDocument } from "../../types/userTypes";

export class LoginWithGoogle {
  constructor(private authRepo: IAuthRepository) {}

  async execute(googleId: string, email: string, full_name?: string, phone?: string): Promise<IUserDocument> {
    const user = await this.authRepo.loginWithGoogle(googleId, email, full_name, phone);
    return user;
  }
}
