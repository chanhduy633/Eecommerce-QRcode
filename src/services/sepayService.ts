import axios from "axios";
import { sepayConfig } from "../config/sepayConfig";

// =========== Kiểu dữ liệu API trả về ===========
export interface SepayTransaction {
  transaction_date: string;
  amount_in: number;
  transaction_content: string;
}

export interface SepayResponse {
  messages?: { success: boolean };
  transactions?: SepayTransaction[];
}

class SepayService {
  /**
   * Lấy danh sách giao dịch
   */
  async getTransactions(): Promise<SepayResponse> {
    try {
      const response = await axios.get<SepayResponse>(
        sepayConfig.SEPAY_API_URL,
        {
          params: {
            account_number: sepayConfig.SEPAY_ACCOUNT_NUMBER,
            limit: sepayConfig.LIMIT,
          },
          headers: {
            Authorization: `Bearer ${sepayConfig.SEPAY_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Error fetching Sepay transactions:", error.message);
      throw new Error("Không thể kết nối với Sepay API");
    }
  }

  /**
   * Kiểm tra giao dịch khớp đơn hàng
   */
  async checkPaymentReceived(
  orderNumber: string,
  expectedAmount: number,
  maxMinutes: number = 10
): Promise<boolean> {
  try {
    const response = await this.getTransactions();

    if (!response.messages?.success || !response.transactions) {
      return false;
    }

    const now = new Date();
    const limitDate = new Date(now.getTime() - maxMinutes * 60 * 1000);

    // Normalize orderNumber: xóa ký tự đặc biệt, về dạng giống bank
    const normalizedOrder = orderNumber.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

    const match = response.transactions.find((tx) => {
      const date = new Date(tx.transaction_date);

      // 1. Giao dịch phải nằm trong window thời gian
      const isRecent = date >= limitDate;

      // 2. So sánh số tiền: bank trả về amount_in = number
      const amountNumber = Number(tx.amount_in);
      const isCorrectAmount =
        Math.round(amountNumber) === Math.round(expectedAmount);

      // 3. Normalize nội dung giao dịch
      const contentRaw = tx.transaction_content || "";
      const normalizedContent = contentRaw
        .replace(/[^A-Za-z0-9]/g, "")
        .toLowerCase();

      const hasOrderNumber =
        normalizedContent.includes(normalizedOrder);

      console.log("Check TX:", {
        date,
        amount_in: tx.amount_in,
        expectedAmount,
        content: tx.transaction_content,
        normalizedContent,
        normalizedOrder,
        isRecent,
        isCorrectAmount,
        hasOrderNumber,
      });

      return isRecent && isCorrectAmount && hasOrderNumber;
    });

    return !!match;
  } catch (error: any) {
    console.error("Error checking payment:", error.message);
    return false;
  }
}

}

export const sepayService = new SepayService();
