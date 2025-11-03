import User from "./models/User";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../types/userTypes";

export interface IAuthRepository {
  register(email: string, password: string, full_name: string, phone: string): Promise<IUserDocument>;
  login(email: string, password: string): Promise<IUserDocument | null>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  loginWithGoogle(googleId: string, email: string, full_name?: string, phone?: string): Promise<IUserDocument>;
}

export class AuthUserRepository implements IAuthRepository {
  async register(email: string, password: string, full_name: string, phone: string): Promise<IUserDocument> {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email đã được sử dụng");

    const user = new User({
      email,
      password,
      full_name,
      phone,
      role: "user",
      address: null,
    });

    return await user.save();
  }

  async login(email: string, password: string): Promise<IUserDocument | null> {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }

  async loginWithGoogle(googleId: string, email: string, full_name?: string, phone?: string): Promise<IUserDocument> {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        full_name: full_name || "Người dùng Google",
        phone: phone || "",
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 12),
        role: "user",
        address: {
          street: "",
          city: "",
          district: "",
          ward: "",
        },
      });
      await user.save();
    }
    return user;
  }
}
