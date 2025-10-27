// src/usecases/cart/addToCart.usecase.ts
import { ICartRepository, AddToCartDto, CartType } from "../../types/cartTypes";

export class AddToCart {
  constructor(private readonly repo: ICartRepository) {}

  async execute({ userId, productId, quantity = 1 }: AddToCartDto): Promise<CartType> {
    let cart = await this.repo.findByUserId(userId);
    if (!cart) cart = await this.repo.create(userId);

    const existingItem = cart.items.find((i) => i.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    return await this.repo.save(cart);
  }
}
