// --- 1. Address (dùng trong User) ---
export interface IAddress {
  street: string;
  city: string;
  district: string;
  ward: string;
}

// --- 2. Dữ liệu đầy đủ từ DB (có password) ---
export interface IUserDocument {
  _id: string;
  email: string;
  password: string;  
  full_name: string;
  phone: string;
  address: IAddress;
  role: 'user' | 'admin';
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
  address: IAddress;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}