import { IProductRepository } from "../repositories/productRepository";
import { IProduct, CreateProductDto, UpdateProductDto } from "../types/productTypes";

// Interface định nghĩa hợp đồng Service
export interface IProductService {
  getAllProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct | null>;
  createProduct(data: CreateProductDto): Promise<IProduct>;
  updateProduct(id: string, data: UpdateProductDto): Promise<IProduct | null>;
  deleteProduct(id: string): Promise<boolean>;
}

// Triển khai Service cụ thể (phụ thuộc vào interface Repository)
export class ProductService implements IProductService {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  private toProductResponse(product: any): IProduct {
    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description || undefined,
      price: product.price,
      category: product.category,
      stock: product.stock,
      sold: product.sold,
      image_url: product.image_url || undefined,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.repository.findAll();
    return products.map(this.toProductResponse);
  }

  async getProductById(id: string): Promise<IProduct | null> {
    const product = await this.repository.findById(id);
    return product ? this.toProductResponse(product) : null;
  }

  async createProduct(data: CreateProductDto): Promise<IProduct> {
    const created = await this.repository.create(data);
    return this.toProductResponse(created);
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<IProduct | null> {
    const updated = await this.repository.update(id, data);
    return updated ? this.toProductResponse(updated) : null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return !!deleted;
  }
}
