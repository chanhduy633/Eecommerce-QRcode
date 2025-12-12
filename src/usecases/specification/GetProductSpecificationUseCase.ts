import { IProductSpecificationRepository } from "../../repositories/SpecificationRepository";

export class GetProductSpecificationUseCase {
  constructor(private repo: IProductSpecificationRepository) {}

  async execute(productId: string) {
    return await this.repo.getByProductId(productId);
  }
}
