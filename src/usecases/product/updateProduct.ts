import { IProductRepository } from "../../repositories/productRepository";
import { UpdateProductDto, IProduct } from "../../types/productTypes";

export class UpdateProduct{
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

  async execute(id: string, data: UpdateProductDto): Promise<IProduct | null> {
    const updated = await this.repository.update(id, data);
    return updated ? this.toResponse(updated) : null;
  }
}
