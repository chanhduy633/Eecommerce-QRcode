// src/types/authTypes.ts
import { IUserDocument } from "./userTypes";

// Dữ liệu request từ client
export interface LoginDto {
  email: string;
  password: string;
}

// Dữ liệu trả về khi login thành công
export interface AdminLoginResponse {
  success: true;
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: "admin";
  };
}

