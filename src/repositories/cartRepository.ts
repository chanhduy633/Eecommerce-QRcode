import { CartType } from "../types/cartTypes";
import Cart from "./models/Cart";

export interface ICartRepository {
  findByUserId(userId: string): Promise<CartType | null>;
  create(userId: string): Promise<CartType>;
  save(cart: CartType): Promise<CartType>;
  deleteCart(userId: string): Promise<void>;
}

export class CartRepository implements ICartRepository {
  async findByUserId(userId: string): Promise<CartType | null> {
    const doc = await Cart.findOne({ userId }).populate("items.productId");
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async create(userId: string): Promise<CartType> {
    const doc = await Cart.create({ userId, items: [] });
    return this.toDomain(doc);
  }

  async save(cart: CartType): Promise<CartType> {
    const doc = await Cart.findOneAndUpdate(
      { userId: cart.userId },
      { items: cart.items },
      { new: true, upsert: true }
    ).populate("items.productId");
    return this.toDomain(doc);
  }

  async deleteCart(userId: string): Promise<void> {
    await Cart.deleteOne({ userId });
  }

  // 🧩 Helper chuyển từ Mongo Document sang Domain Entity
  private toDomain(doc: any): CartType {
    return {
      _id: doc._id.toString(),
      userId: doc.userId.toString(),
      items: doc.items.map((i: any) => ({
        productId: i.productId?._id?.toString() ?? i.productId,
        quantity: i.quantity,
        addedAt: i.addedAt,
        product: i.productId && typeof i.productId === "object"
          ? {
              _id: i.productId._id.toString(),
              name: i.productId.name,
              price: i.productId.price,
              image: i.productId.image_url,
              stock: i.productId.stock ?? 0,
            }
          : undefined,
      })),
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    };
  }
}
