//usecases/category/createCategory.ts

import { ICategoryRepository } from "../../repositories/categoryRepository";
import { CreateCategoryDTO, ICategory } from "../../types/categoryTypes";


export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryDTO): Promise<ICategory> {
    // Validate input
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("Tên danh mục không được để trống");
    }

    // Check if category name already exists
    const nameExists = await this.categoryRepository.checkNameExists(data.name);
    if (nameExists) {
      throw new Error("Tên danh mục đã tồn tại");
    }

    // Create category
    const category = await this.categoryRepository.create({
      name: data.name.trim(),
      description: data.description?.trim(),
      isActive: data.isActive !== undefined ? data.isActive : true,
    });

    return category;
  }
}