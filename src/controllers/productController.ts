import { Request, Response } from "express";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productService";
import { CreateProductDto, UpdateProductDto, IProduct } from "../types/productTypes";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

// Interface định nghĩa hợp đồng Controller
export interface IProductController {
  getAllProducts(req: Request, res: Response): Promise<void>;
  getProductById(req: Request, res: Response): Promise<void>;
  createProduct(req: Request, res: Response): Promise<void>;
  updateProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
}

// Triển khai Controller
export const ProductController: IProductController = {
  async getAllProducts(req, res): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProductById(req, res): Promise<void> {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async createProduct(req, res): Promise<void> {
    try {
      const newProduct = await productService.createProduct(req.body as CreateProductDto);
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateProduct(req, res): Promise<void> {
    try {
      const updatedProduct = await productService.updateProduct(
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
  },

  async deleteProduct(req, res): Promise<void> {
    try {
      const success = await productService.deleteProduct(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        return;
      }
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
