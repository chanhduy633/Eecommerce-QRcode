import { Document, Types } from "mongoose";
// --- 1. Address (dùng trong User) ---
export interface IAddress {
  street: string;
  city: string;
  district: string;
  ward: string;
}
type UserRole =  'user'|'admin';

// --- 2. Dữ liệu đầy đủ từ DB (có password) ---
export interface IUserDocument {
  _id:Types.ObjectId;
  email: string;
  password: string;  
  full_name: string;
  phone: string;
  address?: IAddress | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// --- 3. Dữ liệu client gửi lên (DTO) ---
export interface CreateUserDto {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: IAddress;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  full_name?: string;
  phone?: string;
  address?: Partial<IAddress>;
}

// --- 4. Dữ liệu trả về client (không có password) ---
export interface UserResponse {
  _id: string;
  email: string;
  full_name: string;
  phone: string;
  address?: IAddress | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}


// ------------------ Service ------------------
export interface IUserService {
  getAll(): Promise<UserResponse[]>;
  getById(id: string): Promise<UserResponse | null>;
  create(data: CreateUserDto): Promise<UserResponse>;
  update(id: string, data: UpdateUserDto): Promise<UserResponse | null>;
  delete(id: string): Promise<boolean>;
}