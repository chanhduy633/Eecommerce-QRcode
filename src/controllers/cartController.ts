import { Request, Response } from "express";
import { CartRepository } from "../repositories/cartRepository";
import { CartService } from "../services/cartService";

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);

export class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const cart = await cartService.getCart(userId);
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: error.message });
    }
  }

  async addToCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      const cart = await cartService.addToCart(userId, productId, quantity);
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error: error.message });
    }
  }

  async updateQuantity(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateQuantity(userId, productId, quantity);
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi cập nhật số lượng", error: error.message });
    }
  }

  async removeFromCart(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const cart = await cartService.removeFromCart(userId, productId);
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng", error: error.message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const cart = await cartService.clearCart(userId);
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi xóa toàn bộ giỏ hàng", error: error.message });
    }
  }
}
