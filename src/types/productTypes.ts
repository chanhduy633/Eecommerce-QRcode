import { Document, Types } from "mongoose";
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductDoc extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  image_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
