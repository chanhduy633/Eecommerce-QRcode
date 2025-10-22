import express from "express";
import { CartController } from "../controllers/cartController";

const router = express.Router();
const cartController = new CartController();

router.get("/:userId", cartController.getCart.bind(cartController));
router.post("/:userId/add", cartController.addToCart.bind(cartController));
router.put("/:userId/update/:productId", cartController.updateQuantity.bind(cartController));
router.delete("/:userId/remove/:productId", cartController.removeFromCart.bind(cartController));
router.delete("/:userId/clear", cartController.clearCart.bind(cartController));

export default router;
