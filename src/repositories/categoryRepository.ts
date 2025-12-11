// src/infrastructure/repositories/categoryRepository.ts

import Category from "./models/Category";
import {
  ICategory,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CategoryFilters,
} from "../types/categoryTypes";

export interface ICategoryRepository {
  create(data: CreateCategoryDTO): Promise<ICategory>;
  findById(id: string): Promise<ICategory | null>;
  findBySlug(slug: string): Promise<ICategory | null>;
  findAll(filters?: CategoryFilters): Promise<ICategory[]>;
  update(id: string, data: UpdateCategoryDTO): Promise<ICategory | null>;
  delete(id: string): Promise<boolean>;
  checkNameExists(name: string, excludeId?: string): Promise<boolean>;
  incrementProductCount(id: string): Promise<void>;
  decrementProductCount(id: string): Promise<void>;
}

export class CategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryDTO): Promise<ICategory> {
    const category = new Category(data);
    return await category.save();
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return await Category.findOne({ slug });
  }

  async findAll(filters?: CategoryFilters): Promise<ICategory[]> {
    const query: any = {};

    if (filters?.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ];
    }

    return await Category.find(query).sort({ createdAt: -1 });
  }

  async update(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await Category.findByIdAndDelete(id);
    return !!result;
  }

  async checkNameExists(name: string, excludeId?: string): Promise<boolean> {
    const query: any = { name: { $regex: new RegExp(`^${name}$`, "i") } };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const category = await Category.findOne(query);
    return !!category;
  }

  async incrementProductCount(id: string): Promise<void> {
    await Category.findByIdAndUpdate(id, { $inc: { productCount: 1 } });
  }

  async decrementProductCount(id: string): Promise<void> {
    await Category.findByIdAndUpdate(id, { $inc: { productCount: -1 } });
  }
}