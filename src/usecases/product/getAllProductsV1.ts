import { IProductRepository } from "../../repositories/productRepository";
import { IProduct } from "../../types/productTypes";

export class GetAllProductsV1 {
  constructor(private repo: IProductRepository) {}

  async execute(): Promise<IProduct[]> {
    const products = await this.repo.findAll();
    const shuffled = products.sort(() => 0.5 - Math.random());

    return shuffled.map((doc) => ({
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