import { Request, Response } from "express";
import { ProductControllerV1 } from "../v1/productControllerV1";
import { ProductService } from "../../services/productService";
import { ProductRepository } from "../../repositories/productRepository";

export class ProductControllerV2 extends ProductControllerV1 {
  constructor(service: ProductService) {
    super(service);
  }

  
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.service.getAllProducts();
      const sorted = products.sort((a, b) => b.price - a.price); // ✅ sắp xếp giảm dần
      res.status(200).json(sorted);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

// ✅ Instance
const repo = new ProductRepository();
const service = new ProductService(repo);
export const productControllerV2 = new ProductControllerV2(service);
