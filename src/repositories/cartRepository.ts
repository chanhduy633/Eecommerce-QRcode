import Cart from "../models/Cart";
import { CartType } from "../types/cartTypes";

export class CartRepository {
  async findByUserId(userId: string) {
    return await Cart.findOne({ userId }).populate("items.productId");
  }

  async create(userId: string) {
    const cart = new Cart({ userId, items: [] });
    return await cart.save();
  }

  async save(cart: any) {
    return await cart.save();
  }

  async updateItems(userId: string, items: any[]) {
    return await Cart.findOneAndUpdate({ userId }, { items }, { new: true }).populate("items.productId");
  }

  async clearCart(userId: string) {
    return await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
  }
}
