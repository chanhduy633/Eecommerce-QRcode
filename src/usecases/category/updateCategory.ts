// src/application/usecases/category/updateCategory.ts

import { ICategoryRepository } from "../../repositories/categoryRepository";
import { ICategory, UpdateCategoryDTO } from "../../types/categoryTypes";


export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, data: UpdateCategoryDTO): Promise<ICategory> {
    // Check if category exists
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new Error("Không tìm thấy danh mục");
    }

    // Validate name if provided
    if (data.name !== undefined) {
      if (data.name.trim().length === 0) {
        throw new Error("Tên danh mục không được để trống");
      }

      // Check if new name already exists (excluding current category)
      const nameExists = await this.categoryRepository.checkNameExists(
        data.name,
        id
      );
      if (nameExists) {
        throw new Error("Tên danh mục đã tồn tại");
      }
    }

    // Prepare update data
    const updateData: UpdateCategoryDTO = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.description !== undefined) updateData.description = data.description.trim();
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    // Update category
    const updatedCategory = await this.categoryRepository.update(id, updateData);
    if (!updatedCategory) {
      throw new Error("Cập nhật danh mục thất bại");
    }

    return updatedCategory;
  }
}