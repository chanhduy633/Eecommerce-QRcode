// src/config/api.ts

// Base URL backend
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const SERVER_URL = process.env.CLIENT_URL || "http://localhost:5317";

// Các route REST API
export const API_ROUTES = {
  LOGIN_GOOGLE: `${CLIENT_URL}/auth/google`,
  LOGIN_GOOGLE_CALLBACK: `${CLIENT_URL}/auth/google/callback`,
  PRODUCTS: `${CLIENT_URL}/products`,
  UPLOAD: `${CLIENT_URL}/uploads`,
  USERS: `${CLIENT_URL}/users`,
  CART: `${CLIENT_URL}/cart`,
  ORDERS: `${CLIENT_URL}/orders`,
};

// Frontend redirect URLs (sử dụng khi backend redirect sau OAuth)
export const CLIENT_ROUTES = {
  LOGIN_SUCCESS: `${process.env.CLIENT_URL}/auth/success`,
  LOGIN_FAILURE: `${process.env.CLIENT_URL}/login?error=google_failed`,
};
