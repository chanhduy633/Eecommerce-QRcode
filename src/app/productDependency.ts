import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productService";

// ✅ Chỉ khởi tạo 1 lần, chia sẻ cho tất cả version controller
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export { productRepository, productService };
