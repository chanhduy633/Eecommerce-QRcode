import { Router } from "express";
import { productControllerV1 } from "../../controllers/v1/productControllerV1";
import { protect, adminOnly } from "../../middleware/authMiddleware";

const router = Router();

router.get("/", (req, res) => productControllerV1.getAllProducts(req, res));
router.get("/:id", (req, res) => productControllerV1.getProductById(req, res));
router.post("/", protect, adminOnly, (req, res) => productControllerV1.createProduct(req, res));
router.put("/:id", protect, adminOnly, (req, res) => productControllerV1.updateProduct(req, res));
router.delete("/:id", protect, adminOnly, (req, res) => productControllerV1.deleteProduct(req, res));

export default router;
