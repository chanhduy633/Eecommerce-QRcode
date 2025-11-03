// src/types/cartTypes.ts

// ------------------------------
// 🧱 DOMAIN ENTITY
// ------------------------------
export interface CartItemType {
  productId: string;
  quantity: number;
  addedAt?: string;
  product?: {
    _id: string;
    name: string;
    image?: string;
    price: number;
  };
}

export interface CartType {
  _id?: string;
  userId: string;
  items: CartItemType[];
  createdAt?: string;
  updatedAt?: string;
}

// ------------------------------
// 🧱 DTOs (Data Transfer Objects)
// ------------------------------
export interface AddToCartDto {
  userId: string;
  productId: string;
  quantity?: number;
}

export interface UpdateQuantityDto {
  userId: string;
  productId: string;
  quantity: number;
}
