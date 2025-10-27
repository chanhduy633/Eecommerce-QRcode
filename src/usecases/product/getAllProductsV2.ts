import { IProductRepository } from "../../repositories/productRepository";
import { IProduct } from "../../types/productTypes";

export class GetAllProductsV2 {
  constructor(private repo: IProductRepository) {}

  async execute(): Promise<IProduct[]> {
    const products = await this.repo.findAll();
    
    // Sắp xếp theo price (giảm dần)
    const sorted = products.sort((a, b) => b.price - a.price);

    // Chuyển đổi sang IProduct
    return sorted.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      price: doc.price,
      category: doc.category,
      stock: doc.stock,
      sold: doc.sold,
      image_url: doc.image_url,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }
}