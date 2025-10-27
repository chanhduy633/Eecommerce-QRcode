import User from "./models/User";
import bcrypt from "bcryptjs";
import {
  IUserDocument,
  CreateUserDto,
  UpdateUserDto,
} from "../types/userTypes";

export interface IUserRepository {
  findAll(): Promise<IUserDocument[]>;
  findById(id: string): Promise<IUserDocument | null>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  create(data: CreateUserDto): Promise<IUserDocument>;
  update(id: string, data: UpdateUserDto): Promise<IUserDocument | null>;
  delete(id: string): Promise<IUserDocument | null>;
}

export class UserRepository implements IUserRepository {
  async findAll(): Promise<IUserDocument[]> {
    return await User.find().select("-password");
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return await User.findById(id).select("-password");
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }

  async create(data: CreateUserDto): Promise<IUserDocument> {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User({
      ...data,
      password: hashedPassword,
      role: "user",
    });
    return await user.save();
  }

  async update(id: string, data: UpdateUserDto): Promise<IUserDocument | null> {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  async delete(id: string): Promise<IUserDocument | null> {
    return await User.findByIdAndDelete(id);
  }
}
