import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addToCart);
router.put("/:userId/update/:productId", updateQuantity);
router.delete("/:userId/remove/:productId", removeFromCart);
router.delete("/:userId/clear", clearCart);

export default router;
