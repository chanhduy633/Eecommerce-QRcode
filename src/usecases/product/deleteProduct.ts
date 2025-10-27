import { IProductRepository } from "../../repositories/productRepository";

export class DeleteProduct {
  constructor(private repository: IProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return !!deleted;
  }
}
