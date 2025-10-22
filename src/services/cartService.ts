import { CartRepository } from "../repositories/cartRepository";

export class CartService {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async getCart(userId: string) {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }
    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) cart = await this.cartRepository.create(userId);

    const existingItem = cart.items.find(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await this.cartRepository.save(cart);
    return await this.cartRepository.findByUserId(userId);
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) throw new Error("Không tìm thấy giỏ hàng");

    const item = cart.items.find(
      (item: any) => item.productId.toString() === productId
    );
    if (!item) throw new Error("Không tìm thấy sản phẩm");

    item.quantity = Math.max(1, quantity);
    await this.cartRepository.save(cart);
    return await this.cartRepository.findByUserId(userId);
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) throw new Error("Không tìm thấy giỏ hàng");

    cart.items.pull({ productId });
    await cart.save();

    return await this.cartRepository.findByUserId(userId);
  }

  async clearCart(userId: string) {
    return await this.cartRepository.clearCart(userId);
  }
}
