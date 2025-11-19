import { Router, Request, Response } from "express";
import { sepayService } from "../services/sepayService";

const router = Router();

interface CheckPaymentBody {
  orderNumber: string;
  totalAmount: number;
}
router.post(
  "/check-sepay",
  async (req: Request<{}, {}, CheckPaymentBody>, res: Response) => {
    try {
      console.log("📨 Received payment check request:");
      console.log("  - Body:", req.body);

      const { orderNumber, totalAmount } = req.body;

      // ✅ Kiểm tra kiểu dữ liệu chặt chẽ hơn
      if (typeof orderNumber !== "string" || orderNumber.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "orderNumber là bắt buộc và phải là chuỗi không rỗng",
        });
      }

      if (
        typeof totalAmount !== "number" ||
        isNaN(totalAmount) ||
        totalAmount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "totalAmount là bắt buộc và phải là số dương",
          received: { orderNumber, totalAmount },
        });
      }

      console.log("✅ Validation passed, checking payment...");
      console.log("  - orderNumber:", orderNumber);
      console.log("  - totalAmount:", totalAmount);

      const isPaid = await sepayService.checkPaymentReceived(
        orderNumber,
        totalAmount,
        10 // Lấy 10 giao dịch gần nhất
      );

      console.log(`📊 Payment result: ${isPaid ? "PAID" : "NOT PAID"}`);

      res.json({
        success: true,
        isPaid,
        message: isPaid
          ? "Đã tìm thấy giao dịch thanh toán"
          : "Chưa tìm thấy giao dịch",
      });
    } catch (error: any) {
      console.error("❌ Check payment error:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi kiểm tra thanh toán",
        error: error.message,
      });
    }
  }
);

export default router;
