import { CartRepository } from "../../repositories/cartRepository";

export class GetCart {
  constructor(private readonly repository: CartRepository) {}

  async execute(userId: string) {
    let cart = await this.repository.findByUserId(userId);
    if (!cart) cart = await this.repository.create(userId);
    return cart;
  }
}
