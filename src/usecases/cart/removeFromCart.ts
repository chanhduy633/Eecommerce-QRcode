import { ICartRepository, CartType } from "../../types/cartTypes";

interface RemoveParams {
  userId: string;
  productId: string;
}

export class RemoveFromCart {
  constructor(private readonly repo: ICartRepository) {}

  async execute({ userId, productId }: RemoveParams): Promise<CartType> {
    const cart = await this.repo.findByUserId(userId);
    if (!cart) throw new Error("Không tìm thấy giỏ hàng");

    cart.items = cart.items.filter((i) => i.productId !== productId);
    return await this.repo.save(cart);
  }
}
