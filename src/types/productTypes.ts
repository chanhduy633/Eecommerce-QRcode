export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  stock: number;
  sold: number;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  stock: number;
  image_url?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}