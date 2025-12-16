import Product from "./models/Product";
import {
  CreateProductDto,
  UpdateProductDto,
  IProductDoc,
} from "../types/productTypes";
import { Types } from "mongoose";
import ProductSpecification from "./models/productSpecification";

// Interface định nghĩa hợp đồng Repository
export interface IProductRepository {
  findAll(): Promise<IProductDoc[]>;
  findAllWithSpecs(): Promise<any[]>;
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
  async findAllWithSpecs(): Promise<any[]> {
    try {
      const products = await Product.find().lean().exec();

      // Lấy tất cả specifications
      const specs = await ProductSpecification.find().lean().exec();

      console.log("[ProductRepository] Products count:", products.length);
      console.log("[ProductRepository] Specifications count:", specs.length);

      // Join thủ công: map specification vào từng product
      const productsWithSpecs = products.map((product) => {
        const spec = specs.find(
          (s) => s.product.toString() === product._id.toString()
        );

        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: product.category,
          description: product.description,
          image_url: product.image_url,
          sold: product.sold,
          specification: spec
            ? {
                brand: spec.brand,
                model: spec.model,
                warranty: spec.warranty,
                color: spec.color,
                origin: spec.origin,
                material: spec.material,
                releaseYear: spec.releaseYear,
              }
            : undefined,
        };
      });

      return productsWithSpecs;
    } catch (error) {
      console.error("[ProductRepository] Error in findAllWithSpecs:", error);
      throw error;
    }
  }
  async findById(id: string): Promise<IProductDoc | null> {
    return await Product.findById(id);
  }

  async create(data: CreateProductDto): Promise<IProductDoc> {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  async update(
    id: string,
    data: UpdateProductDto
  ): Promise<IProductDoc | null> {
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
