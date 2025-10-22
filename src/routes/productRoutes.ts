import { Router } from "express";
import { productController } from "../controllers/productController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/:id", (req, res) => productController.getProductById(req, res));
router.post("/", protect, adminOnly, (req, res) => productController.createProduct(req, res));
router.put("/:id", protect, adminOnly, (req, res) => productController.updateProduct(req, res));
router.delete("/:id", protect, adminOnly, (req, res) => productController.deleteProduct(req, res));

export default router;
