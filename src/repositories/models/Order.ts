import mongoose from "mongoose";
import { email } from "zod";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    guestId: { type: String, default: null },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: Number,
    shippingFee: Number,
    finalAmount: Number,
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },

      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },

    // 🧾 Thông tin thanh toán
    payment: {
      method: {
        type: String,
        enum: ["COD", "BANK_TRANSFER", "MOMO", "VNPAY", "ZALOPAY"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },
      transactionId: { type: String },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
