import { IProductRepository } from "../../repositories/productRepository";

export class GetProductById {
  constructor(private readonly repo: IProductRepository) {}

  async execute(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }
}
