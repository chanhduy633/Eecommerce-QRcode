import { CartRepository } from "../../repositories/cartRepository";

export class UpdateQuantity {
  constructor(private readonly repository: CartRepository) {}

  async execute(userId: string, productId: string, quantity: number) {
    const cart = await this.repository.findByUserId(userId);
    if (!cart) throw new Error("Không tìm thấy giỏ hàng");

    const item = cart.items.find(
      (i: any) => i.productId.toString() === productId
    );
    if (!item) throw new Error("Không tìm thấy sản phẩm");

    item.quantity = Math.max(1, quantity);
    await this.repository.save(cart);
    return await this.repository.findByUserId(userId);
  }
}
