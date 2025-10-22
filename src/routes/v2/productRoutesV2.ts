import { Router } from "express";
import { productControllerV2 } from "../../controllers/v2/productControllerV2";
import { protect, adminOnly } from "../../middleware/authMiddleware";

const router = Router();

router.get("/", (req, res) => productControllerV2.getAllProducts(req, res));
router.get("/:id", (req, res) => productControllerV2.getProductById(req, res));
router.post("/", protect, adminOnly, (req, res) => productControllerV2.createProduct(req, res));
router.put("/:id", protect, adminOnly, (req, res) => productControllerV2.updateProduct(req, res));
router.delete("/:id", protect, adminOnly, (req, res) => productControllerV2.deleteProduct(req, res));

export default router;
