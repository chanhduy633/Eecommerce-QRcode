import { IProductSpecificationRepository } from "../../repositories/SpecificationRepository";
import { UpdateProductSpecificationDTO } from "../../types/productSpecificationTypes";

export class UpdateProductSpecificationUseCase {
  constructor(private repo: IProductSpecificationRepository) {}

  async execute(productId: string, data: UpdateProductSpecificationDTO) {
    return await this.repo.update(productId, data);
  }
}
