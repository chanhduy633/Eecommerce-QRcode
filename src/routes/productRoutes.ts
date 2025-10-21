import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/productController";
import { adminOnly, protect } from "../middleware/authMiddleware";

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', protect, adminOnly, ProductController.createProduct);
router.put('/:id', protect, adminOnly, ProductController.updateProduct);
router.delete('/:id', protect, adminOnly, ProductController.deleteProduct);

export default router;