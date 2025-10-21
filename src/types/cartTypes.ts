export interface CartItemType {
  productId: string; 
  quantity: number;
  addedAt?: string; 
  product?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export interface CartType {
  _id?: string;
  userId: string;
  items: CartItemType[];
  createdAt?: string;
  updatedAt?: string;
}
