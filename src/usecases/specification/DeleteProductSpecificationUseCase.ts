import { IProductSpecificationRepository } from "../../repositories/SpecificationRepository";

export class DeleteProductSpecificationUseCase {
  constructor(private repo: IProductSpecificationRepository) {}

  async execute(productId: string) {
    return await this.repo.delete(productId);
  }
}
