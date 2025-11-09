import Product from "./models/Product";
import { CreateProductDto, UpdateProductDto, IProductDoc } from "../types/productTypes";
import { Types } from "mongoose";

// Interface định nghĩa hợp đồng Repository
export interface IProductRepository {
  findAll(): Promise<IProductDoc[]>;
  findById(id: string): Promise<IProductDoc | null>;
  create(data: CreateProductDto): Promise<IProductDoc>;
  update(id: string, data: UpdateProductDto): Promise<IProductDoc | null>;
  delete(id: string): Promise<IProductDoc | null>;
}

// Triển khai Repository cụ thể dùng MongoDB
export class ProductRepository implements IProductRepository {
  async findAll(): Promise<IProductDoc[]> {
    return await Product.find();
  }

  async findById(id: string): Promise<IProductDoc | null> {
    return await Product.findById(id);
  }

  async create(data: CreateProductDto): Promise<IProductDoc> {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  async update(id: string, data: UpdateProductDto): Promise<IProductDoc | null> {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<IProductDoc | null> {
    return await Product.findByIdAndDelete(id);
  }
  
  async decreaseStock(productId: Types.ObjectId, quantity: number) {
    return Product.findByIdAndUpdate(productId, {
      $inc: { stock: -quantity },
    });
  }
}
