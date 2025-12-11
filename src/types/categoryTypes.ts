// src/domain/types/categoryTypes.ts

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  productCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  isActive?: boolean;
  search?: string;
}