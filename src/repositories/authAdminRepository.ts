import User from "./models/User";
import { IUserDocument } from "../types/userTypes";

// Repository interface
export interface IAuthRepository {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

export class AuthAdminRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }
}
