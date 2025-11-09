import { CartRepository } from "../../repositories/cartRepository";
import { OrderRepository } from "../../repositories/orderRepository";
import { ProductRepository } from "../../repositories/productRepository";
import { Types } from "mongoose";

interface ICreateOrderInput {
  userId?: string; // ✅ cho phép null
  guestId?: string; // ✅ thêm guestId
  shippingAddress: any;
  notes?: string;
  paymentMethod?: string;
}

export class CreateOrderUseCase {
  constructor(
    private cartRepo: CartRepository,
    private productRepo: ProductRepository,
    private orderRepo: OrderRepository
  ) {}

  async execute(input: ICreateOrderInput) {
    const { userId, guestId, shippingAddress, notes, paymentMethod } = input;

    const customerId = userId || guestId;
    if (!customerId) throw new Error("Thiếu thông tin người dùng hoặc khách vãng lai");

    // 🛒 Lấy giỏ hàng người dùng hoặc khách
    const cart = await this.cartRepo.findByUserId(customerId);
    if (!cart || cart.items.length === 0) {
      throw new Error("Giỏ hàng trống!");
    }

    // ✅ Kiểm tra tồn kho
    for (const item of cart.items) {
      const product = item.product;
      if (!product || (product.stock ?? 0) < item.quantity) {
        throw new Error(`Sản phẩm "${product?.name ?? "Không tồn tại"}" không đủ hàng`);
      }
    }

    // 💰 Tính tổng tiền
    const totalAmount = cart.items.reduce(
      (sum, i) => sum + (i.product?.price ?? 0) * i.quantity,
      0
    );

    const shippingFee = 30000;
    const finalAmount = totalAmount + shippingFee;

    // 🧾 Tạo đơn hàng
    const order = await this.orderRepo.create({
      orderNumber: "ORD-" + Date.now(),
      userId: userId ?? null, // ✅ có thể null
      guestId: guestId ?? null, // ✅ nếu là khách
      items: cart.items.map((i) => ({
        productId: i.product?._id,
        name: i.product?.name,
        price: i.product?.price,
        quantity: i.quantity,
        image: i.product?.image,
      })),
      totalAmount,
      shippingFee,
      finalAmount,
      shippingAddress,
      notes,
      payment: {
        method: paymentMethod || "COD",
        status: paymentMethod === "COD" ? "pending" : "paid",
      },
    });

    // 🧮 Trừ tồn kho
    for (const item of cart.items) {
      if (item.product?._id) {
        await this.productRepo.decreaseStock(
          new Types.ObjectId(item.product._id),
          item.quantity
        );
      }
    }

    // 🧹 Xóa giỏ hàng
    await this.cartRepo.deleteCart(customerId);

    return order;
  }
}
