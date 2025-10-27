import { IProductRepository } from "../../repositories/productRepository";
import { CreateProductDto, IProduct } from "../../types/productTypes";

export class CreateProduct {
  constructor(private repository: IProductRepository) {}

  private toResponse(product: any): IProduct {
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

  async execute(data: CreateProductDto): Promise<IProduct> {
    const created = await this.repository.create(data);
    return this.toResponse(created);
  }
}
