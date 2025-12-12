import { CreateProductSpecificationDTO, IProductSpecificationDoc, UpdateProductSpecificationDTO } from "../types/productSpecificationTypes";
import ProductSpecification from "./models/productSpecification";


export interface IProductSpecificationRepository {
  create(data: CreateProductSpecificationDTO): Promise<IProductSpecificationDoc>;
  update(productId: string, data: UpdateProductSpecificationDTO): Promise<IProductSpecificationDoc | null>;
  getByProductId(productId: string): Promise<IProductSpecificationDoc | null>;
  delete(productId: string): Promise<boolean>;
}
export class ProductSpecificationRepository implements IProductSpecificationRepository {
  async create(data: CreateProductSpecificationDTO) {
    return await ProductSpecification.create(data);
  }

  async update(productId: string, data: UpdateProductSpecificationDTO) {
    return await ProductSpecification.findOneAndUpdate(
      { product: productId },
      { $set: data },
      { new: true }
    );
  }

  async getByProductId(productId: string) {
    return await ProductSpecification.findOne({ product: productId });
  }

  async delete(productId: string) {
    const result = await ProductSpecification.deleteOne({ product: productId });
    return result.deletedCount > 0;
  }
}