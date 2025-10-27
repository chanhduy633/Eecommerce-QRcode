import express from "express";
import { cartDependencies } from "../app/dependencies";
import { ResponseCode, ResponseHandler } from "../utils/responseHandler";

const router = express.Router();

// 🛒 Lấy giỏ hàng người dùng
router.get("/:userId", async (req, res) => {
  try {
    const result = await cartDependencies.get.execute(req.params.userId);
    if (!result) {
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy giỏ hàng"
          )
        );
    }
    res
      .status(200)
      .json(ResponseHandler.success(result, "Lấy giỏ hàng thành công"));
  } catch (e: any) {
    res
      .status(500)
      .json(
        ResponseHandler.error(
          ResponseCode.INTERNAL_ERROR,
          e.message || "Lỗi server"
        )
      );
  }
});

// ➕ Thêm sản phẩm vào giỏ
router.post("/", async (req, res) => {
  try {
    const result = await cartDependencies.add.execute(req.body);
    res
      .status(200)
      .json(
        ResponseHandler.success(result, "Thêm sản phẩm vào giỏ thành công")
      );
  } catch (e: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, e.message));
  }
});

// 🔄 Cập nhật số lượng sản phẩm
router.put("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!userId || !productId || isNaN(qty) || qty <= 0) {
      return res
        .status(400)
        .json(
          ResponseHandler.error(
            ResponseCode.BAD_REQUEST,
            "userId, productId và quantity (số dương) là bắt buộc"
          )
        );
    }

    const result = await cartDependencies.updateQuantity.execute(
      userId,
      productId,
      qty
    );
    res
      .status(200)
      .json(ResponseHandler.success(result, "Cập nhật số lượng thành công"));
  } catch (e: any) {
    res
      .status(400)
      .json(
        ResponseHandler.error(
          ResponseCode.BAD_REQUEST,
          e.message || "Không thể cập nhật số lượng"
        )
      );
  }
});

// ❌ Xóa sản phẩm khỏi giỏ
router.delete("/", async (req, res) => {
  try {
    const result = await cartDependencies.remove.execute(req.body);
    res
      .status(200)
      .json(ResponseHandler.success(result, "Xóa sản phẩm thành công"));
  } catch (e: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, e.message));
  }
});

// 🧹 Xóa toàn bộ giỏ
router.delete("/:userId/clear", async (req, res) => {
  try {
    await cartDependencies.clear.execute(req.params.userId);
    res
      .status(200)
      .json(ResponseHandler.success(null, "Đã xóa toàn bộ giỏ hàng"));
  } catch (e: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, e.message));
  }
});

export default router;
