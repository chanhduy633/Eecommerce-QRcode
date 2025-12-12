import { IProductSpecificationRepository } from "../../repositories/SpecificationRepository";
import { CreateProductSpecificationDTO } from "../../types/productSpecificationTypes";

export class CreateProductSpecificationUseCase {
  constructor(private repo: IProductSpecificationRepository) {}

  async execute(data: CreateProductSpecificationDTO) {
    const exists = await this.repo.getByProductId(data.product);

    if (exists) {
      throw new Error("Specification for this product already exists");
    }

    return await this.repo.create(data);
  }
}
