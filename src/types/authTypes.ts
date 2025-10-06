export interface LoginDto {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: true;
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: 'admin';
  };
}