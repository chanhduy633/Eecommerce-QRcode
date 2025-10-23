import { Router } from "express";
import { protect, adminOnly } from "../../middleware/authMiddleware";

export function createProductRouter(controller: any) {
  const router = Router();

  router.get("/", (req, res) => controller.getAllProducts(req, res));
  router.get("/:id", (req, res) => controller.getProductById(req, res));
  router.post("/", protect, adminOnly, (req, res) => controller.createProduct(req, res));
  router.put("/:id", protect, adminOnly, (req, res) => controller.updateProduct(req, res));
  router.delete("/:id", protect, adminOnly, (req, res) => controller.deleteProduct(req, res));

  return router;
}
