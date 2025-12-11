//usecases/category/getCategories.ts
import { ICategoryRepository } from "../../repositories/categoryRepository";
import { CategoryFilters, ICategory } from "../../types/categoryTypes";

export class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(filters?: CategoryFilters): Promise<ICategory[]> {
    return await this.categoryRepository.findAll(filters);
  }
}

export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Không tìm thấy danh mục");
    }
    return category;
  }
}

export class GetCategoryBySlugUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(slug: string): Promise<ICategory> {
    const category = await this.categoryRepository.findBySlug(slug);
    if (!category) {
      throw new Error("Không tìm thấy danh mục");
    }
    return category;
  }
}