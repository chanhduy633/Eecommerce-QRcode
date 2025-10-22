import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware";
import { API_VERSION } from "../config/apiVersion";

// import cả 2 version controller
import { productControllerV1 } from "../controllers/v1/productControllerV1";
import { productControllerV2 } from "../controllers/v2/productControllerV2";

const router = Router();

const controllers = {
  v1: productControllerV1,
  v2: productControllerV2,
} as const;

// Nếu version không hợp lệ => fallback về v1
const controller =controllers[API_VERSION] || controllers.v1;

// Dùng controller chung cho toàn bộ route
router.get("/", (req, res) => controller.getAllProducts(req, res));
router.get("/:id", (req, res) => controller.getProductById(req, res));
router.post("/", protect, adminOnly, (req, res) => controller.createProduct(req, res));
router.put("/:id", protect, adminOnly, (req, res) => controller.updateProduct(req, res));
router.delete("/:id", protect, adminOnly, (req, res) => controller.deleteProduct(req, res));

export default router;
