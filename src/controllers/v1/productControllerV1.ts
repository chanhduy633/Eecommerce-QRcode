import { Request, Response } from "express";
import { ProductService } from "../../services/productService";
import { CreateProductDto, UpdateProductDto } from "../../types/productTypes";

export class ProductControllerV1 {
  protected service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  // ✅ Mặc định: Lấy ngẫu nhiên
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.service.getAllProducts();
      const shuffled = products.sort(() => 0.5 - Math.random());
      res.status(200).json(shuffled);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await this.service.getProductById(req.params.id);
      res.status(product ? 200 : 404).json(product || { error: "Không tìm thấy sản phẩm" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const created = await this.service.createProduct(req.body as CreateProductDto);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const updated = await this.service.updateProduct(req.params.id, req.body as UpdateProductDto);
      res.status(updated ? 200 : 404).json(updated || { error: "Không tìm thấy sản phẩm" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const deleted = await this.service.deleteProduct(req.params.id);
      res.status(deleted ? 200 : 404).json(
        deleted ? { message: "Xóa thành công" } : { error: "Không tìm thấy sản phẩm" }
      );
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
