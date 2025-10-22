import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ProductRepository } from "../repositories/productRepository";
import { CreateProductDto, UpdateProductDto } from "../types/productTypes";

// Interface định nghĩa hợp đồng Controller
export interface IProductController {
  getAllProducts(req: Request, res: Response): Promise<void>;
  getProductById(req: Request, res: Response): Promise<void>;
  createProduct(req: Request, res: Response): Promise<void>;
  updateProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
}

//  Triển khai Controller dạng class
export class ProductController implements IProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.service.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.service.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = await this.service.createProduct(req.body as CreateProductDto);
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await this.service.updateProduct(
        req.params.id,
        req.body as UpdateProductDto
      );
      if (!updatedProduct) {
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.deleteProduct(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        return;
      }
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

// ✅ Khởi tạo controller instance (Dependency Injection)
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
export const productController = new ProductController(productService);
