import { Types } from "mongoose";

interface IShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  ward: string;
}

interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}