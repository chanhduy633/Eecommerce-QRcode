import express from "express";
import { ResponseHandler, ResponseCode } from "../utils/responseHandler";
import { orderDependencies } from "../app/dependencies";
import Order from "../repositories/models/Order";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, guestId, shippingAddress, notes, paymentMethod } = req.body;

    const order = await orderDependencies.create.execute({
      userId,
      guestId,
      shippingAddress,
      notes,
      paymentMethod,
    });

    res
      .status(201)
      .json(ResponseHandler.success(order, "Đặt hàng thành công!"));
  } catch (error: any) {
    console.error("❌ Order error:", error);
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message));
  }
});

router.get("/track/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber });
    if (!order)
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy đơn hàng với mã này"
          )
        );

    res
      .status(200)
      .json(ResponseHandler.success(order, "Lấy đơn hàng thành công!"));
  } catch (error: any) {
    console.error("❌ GET /orders/track/:orderNumber error:", error);
    res
      .status(500)
      .json(
        ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message)
      );
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, userId, guestId } = req.query;

    const filter: any = {};
    if (status) filter.status = status;
    if (userId) filter.userId = userId;
    if (guestId) filter.guestId = guestId;

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res
      .status(200)
      .json(
        ResponseHandler.success(orders, "Lấy danh sách đơn hàng thành công!")
      );
  } catch (error: any) {
    console.error("❌ GET /orders error:", error);
    res
      .status(500)
      .json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message));
  }
});

/**
 * ✅ Lấy chi tiết 1 đơn hàng theo ID
 * GET /api/orders/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy đơn hàng"
          )
        );

    res
      .status(200)
      .json(
        ResponseHandler.success(order, "Lấy chi tiết đơn hàng thành công!")
      );
  } catch (error: any) {
    console.error("❌ GET /orders/:id error:", error);
    res
      .status(500)
      .json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message));
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order)
      return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy đơn hàng"));
    res.status(200).json(ResponseHandler.success(order, "Cập nhật trạng thái thành công!"));
  } catch (error: any) {
    console.error("❌ PUT /orders/:id/status error:", error);
    res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message));
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy đơn hàng"
          )
        );
    }

    res
      .status(200)
      .json(
        ResponseHandler.success(
          { _id: order._id },
          "Xóa đơn hàng thành công!"
        )
      );
  } catch (error: any) {
    console.error("❌ DELETE /orders/:id error:", error);
    res
      .status(500)
      .json(
        ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message)
      );
  }
});

export default router;
