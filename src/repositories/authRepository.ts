// src/repositories/authRepository.ts
import User from "./models/User";
import { IAuthRepository } from "../types/authTypes";
import { IUserDocument } from "../types/userTypes";

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }
}
