//usecases/category/deleteCategory.ts

import { ICategoryRepository } from "../../repositories/categoryRepository";


export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<void> {
    // Check if category exists
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Không tìm thấy danh mục");
    }

    // Check if category has products
    if (category.productCount && category.productCount > 0) {
      throw new Error(
        `Không thể xóa danh mục có ${category.productCount} sản phẩm. Vui lòng xóa hoặc chuyển sản phẩm sang danh mục khác trước.`
      );
    }

    // Delete category
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) {
      throw new Error("Xóa danh mục thất bại");
    }
  }
}