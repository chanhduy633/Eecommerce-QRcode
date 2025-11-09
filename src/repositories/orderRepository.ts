import Order from "./models/Order";

export class OrderRepository {
  async create(orderData: any) {
    return Order.create(orderData);
  }
}
