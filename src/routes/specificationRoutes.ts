// Backend - specificationRoutes.ts
import express from "express";
import { ResponseHandler, ResponseCode } from "../utils/responseHandler";
import { specificationDependencies } from "../app/dependencies";

const router = express.Router();

/**
 * POST /api/specifications
 * Tạo mới specification
 */
router.post("/", async (req, res) => {
  try {
    const result = await specificationDependencies.create.execute(req.body);
    return res
      .status(201)
      .json(ResponseHandler.success(result, "Tạo thông số sản phẩm thành công!"));
  } catch (error: any) {
    console.error("❌ POST /specifications error:", error);
    return res.status(400).json(
      ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message)
    );
  }
});

/**
 * PUT /api/specifications/:productId
 * Update specification
 */
router.put("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await specificationDependencies.update.execute(productId, req.body);
    return res
      .status(200)
      .json(ResponseHandler.success(result, "Cập nhật thông số thành công!"));
  } catch (error: any) {
    console.error("❌ PUT /specifications/:productId error:", error);
    return res.status(400).json(
      ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message)
    );
  }
});

/**
 * GET /api/specifications/:productId
 * Lấy specification theo productId
 */
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await specificationDependencies.get.execute(productId);

    if (!result) {
      return res.status(404).json(
        ResponseHandler.error(
          ResponseCode.NOT_FOUND,
          "Không tìm thấy thông số sản phẩm"
        )
      );
    }

    return res.status(200).json(
      ResponseHandler.success(result, "Lấy thông số thành công!")
    );
  } catch (error: any) {
    console.error("❌ GET /specifications/:productId error:", error);
    return res.status(500).json(
      ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message)
    );
  }
});

export default router;