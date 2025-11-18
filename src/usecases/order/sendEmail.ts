import nodemailer from "nodemailer";

export interface OrderEmailData {
  email: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
}

export class SendEmailUseCase {
  private transporter;

  constructor() {
    
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async execute(data: OrderEmailData) {
    const formatPrice = (price: number) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${
          item.name
        }</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${
          item.quantity
        }</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(
          item.price
        )}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(
          item.price * item.quantity
        )}</td>
      </tr>
    `
      )
      .join("");

    const htmlContent = `
      <h2>Xác nhận đơn hàng #${data.orderNumber}</h2>
      <p>Xin chào <strong>${data.customerName}</strong>, bạn có thể tra cứu đơn hàng của mình trong ứng dụng bằng mã đơn hàng</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p><strong>Tổng:</strong> ${formatPrice(data.totalAmount)}</p>
      <p>Địa chỉ giao hàng: ${data.shippingAddress.street}, ${
      data.shippingAddress.ward
    }, ${data.shippingAddress.district}, ${data.shippingAddress.city}</p>
    `;

    const mailOptions = {
      from: `"Your Store" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Xác nhận đơn hàng #${data.orderNumber}`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", data.email);
      return { success: true };
    } catch (error) {
      console.error("Email sending error:", error);
      return { success: false, error };
    }
  }
}
