import { Router } from "express";
import { productDependencies } from "../app/dependencies";
import { adminOnly, protect } from "../middleware/authMiddleware";
import { ResponseCode, ResponseHandler } from "../utils/responseHandler";

export const createProductRouter = (version: "v1" | "v2" = "v1") => {
  const router = Router();
  const usecases = productDependencies[version];

  router.get("/", async (_, res) => {
    try {
      const products = await usecases.getAll.execute();
      res.json(ResponseHandler.success(products));
    } catch (err: any) {
      res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const product = await usecases.getById.execute(req.params.id);
      if (!product) return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy sản phẩm"));
      res.json(ResponseHandler.success(product));
    } catch (err: any) {
      res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
    }
  });

  router.post("/", protect, adminOnly, async (req, res) => {
    try {
      const created = await usecases.create.execute(req.body);
      res.status(201).json(ResponseHandler.created(created, "Tạo sản phẩm thành công"));
    } catch (err: any) {
      res.status(400).json(ResponseHandler.error(ResponseCode.BAD_REQUEST, err.message));
    }
  });

  router.put("/:id", protect, adminOnly, async (req, res) => {
    try {
      const updated = await usecases.update.execute(req.params.id, req.body);
      if (!updated) return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy sản phẩm"));
      res.json(ResponseHandler.success(updated, "Cập nhật sản phẩm thành công"));
    } catch (err: any) {
      res.status(400).json(ResponseHandler.error(ResponseCode.BAD_REQUEST, err.message));
    }
  });

  router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
      const deleted = await usecases.delete.execute(req.params.id);
      if (!deleted) return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy sản phẩm"));
      res.json(ResponseHandler.success(null, "Xóa sản phẩm thành công"));
    } catch (err: any) {
      res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
    }
  });

  return router;
};
