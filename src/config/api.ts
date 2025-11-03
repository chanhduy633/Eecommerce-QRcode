// src/config/api.ts

// Base URL backend
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:5317";

// Các route REST API
export const API_ROUTES = {
  LOGIN_GOOGLE: `${SERVER_URL}/auth/google`,
  LOGIN_GOOGLE_CALLBACK: `${SERVER_URL}/auth/google/callback`,
  PRODUCTS: `${SERVER_URL}/products`,
  UPLOAD: `${SERVER_URL}/uploads/products`,
  USERS: `${SERVER_URL}/users`,
  CART: `${SERVER_URL}/cart`,
  ORDERS: `${SERVER_URL}/orders`,
};

// Frontend redirect URLs (sử dụng khi backend redirect sau OAuth)
export const CLIENT_ROUTES = {
  LOGIN_SUCCESS: `${process.env.CLIENT_URL}/auth/success`,
  LOGIN_FAILURE: `${process.env.CLIENT_URL}/login?error=google_failed`,
};
