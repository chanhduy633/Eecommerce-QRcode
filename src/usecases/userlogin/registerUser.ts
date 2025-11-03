import { IAuthRepository } from "../../repositories/authUserRepository";
import { IUserDocument } from "../../types/userTypes";

export class RegisterUser {
  constructor(private authRepo: IAuthRepository) {}

  async execute(email: string, password: string, full_name: string, phone: string): Promise<IUserDocument> {
    const user = await this.authRepo.register(email, password, full_name, phone);
    return user;
  }
}
