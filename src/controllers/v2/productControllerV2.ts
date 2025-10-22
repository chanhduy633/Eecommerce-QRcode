import { Request, Response } from "express";
import { ProductControllerV1 } from "../v1/productControllerV1";
import { ProductService } from "../../services/productService";

export class ProductControllerV2 extends ProductControllerV1 {
  constructor(service: ProductService) {
    super(service);
  }

  // ✅ V2 ghi đè hàm getAllProducts, có sắp xếp giảm dần theo price
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.service.getAllProducts();
      const sorted = products.sort((a, b) => b.price - a.price);
      res.status(200).json(sorted);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
