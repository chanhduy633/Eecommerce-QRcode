import { Request, Response } from "express";
import Cart from "../models/Cart";
// 🧩 Lấy giỏ hàng theo userId
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(200).json({ userId, items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error });
  }
};

// ➕ Thêm sản phẩm vào giỏ
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(await cart.populate("items.productId"));
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error });
  }
};

// 🔁 Cập nhật số lượng sản phẩm
export const updateQuantity = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    const item = cart.items.find(
      (item: any) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    item.quantity = Math.max(1, quantity);
    await cart.save();
    res.json(await cart.populate("items.productId"));
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật số lượng", error });
  }
};

// ❌ Xóa 1 sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    cart.items.pull({ productId });
    await cart.save();

    // 🔁 Fetch lại giỏ hàng mới để đảm bảo dữ liệu chính xác
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng", error });
  }
};


// 🗑️ Xóa toàn bộ giỏ hàng
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa toàn bộ giỏ hàng", error });
  }
};
