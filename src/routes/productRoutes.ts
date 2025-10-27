import { Router } from "express";
import { productDependencies } from "../app/dependencies";

export const createProductRouter = (version: "v1" | "v2" = "v1") => {
  const router = Router();
  const usecases = productDependencies[version];

  // ✅ GET all products (version-specific)
  router.get("/", async (_, res) => {
    try {
      const products = await usecases.getAll.execute();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ GET by id
  router.get("/:id", async (req, res) => {
    const product = await usecases.getById.execute(req.params.id);
    if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    res.status(200).json(product);
  });

  // ✅ CREATE
  router.post("/", async (req, res) => {
    try {
      const created = await usecases.create.execute(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ✅ UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updated = await usecases.update.execute(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      res.status(200).json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ✅ DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await usecases.delete.execute(req.params.id);
      res.status(deleted ? 200 : 404).json(
        deleted ? { message: "Xóa thành công" } : { error: "Không tìm thấy sản phẩm" }
      );
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
