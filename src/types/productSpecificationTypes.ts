// ================== DOMAIN TYPES ==================
export interface IProductSpecification {
  product: string;        // ObjectId dạng string
  brand: string | null;
  model: string | null;
  releaseYear: number | null;
  warranty: string | null;
  origin: string | null;
  color: string | null;
  material: string | null;
}

export interface IProductSpecificationDoc extends IProductSpecification {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ================== DTO ==================
export interface CreateProductSpecificationDTO {
  product: string;
  brand?: string;
  model?: string;
  releaseYear?: number;
  warranty?: string;
  origin?: string;
  color?: string;
  material?: string;
}

export interface UpdateProductSpecificationDTO {
  brand?: string;
  model?: string;
  releaseYear?: number;
  warranty?: string;
  origin?: string;
  color?: string;
  material?: string;
}
