import express from "express";
import { cartDependencies } from "../app/dependencies";


const router = express.Router();


// 🛒 Lấy giỏ hàng người dùng
router.get("/:userId", async (req, res) => {
  try {
    const result = await cartDependencies.get.execute(req.params.userId);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// ➕ Thêm sản phẩm vào giỏ
router.post("/", async (req, res) => {
  try {
    const result = await cartDependencies.add.execute(req.body);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// 🔄 Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Ép kiểu quantity về number (vì req.body thường là string)
    const qty = Number(quantity);

    // Kiểm tra dữ liệu hợp lệ
    if (!userId || !productId || isNaN(qty) || qty <= 0) {
      return res
        .status(400)
        .json({ error: "userId, productId và quantity (số dương) là bắt buộc" });
    }

    // Gọi use case
    const result = await cartDependencies.updateQuantity.execute(userId, productId, qty);

    res.status(200).json(result);
  } catch (e: any) {
    console.error("Lỗi cập nhật số lượng:", e);
    res.status(400).json({ error: e.message || "Không thể cập nhật số lượng" });
  }
});


// ❌ Xóa sản phẩm khỏi giỏ
router.delete("/", async (req, res) => {
  try {
    const result = await cartDependencies.remove.execute(req.body);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// 🧹 Xóa toàn bộ giỏ
router.delete("/:userId/clear", async (req, res) => {
  try {
    await cartDependencies.clear.execute(req.params.userId);
    res.status(200).json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
