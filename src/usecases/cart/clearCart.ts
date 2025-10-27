import { ICartRepository } from "../../types/cartTypes";

export class ClearCart {
  constructor(private readonly repo: ICartRepository) {}

  async execute(userId: string): Promise<void> {
    await this.repo.deleteCart(userId);
  }
}
