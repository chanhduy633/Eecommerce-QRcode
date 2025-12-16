// ==========================================
// FILE: services/PromptBuilder.ts
// ==========================================
export interface IProductSpec {
  brand?: string | null;
  model?: string | null;
  warranty?: string | null;
  color?: string | null;
  origin?: string | null;
  material?: string | null;
  releaseYear?: number | null;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  specification?: IProductSpec;
}

export class PromptBuilder {
  static buildProductContext(products: IProduct[]): string {
    const productList = products
      .map((p) => {
        let info = `- ${p.name}\n  Giá: ${p.price.toLocaleString('vi-VN')}đ\n  Danh mục: ${p.category}\n  Còn lại: ${p.stock}`;

        // Thêm mô tả nếu có
        if (p.description) {
          info += `\n  Mô tả: ${p.description}`;
        }

        // Thêm specifications nếu có
        if (p.specification) {
          const specs = [];
          if (p.specification.brand) specs.push(`Hãng: ${p.specification.brand}`);
          if (p.specification.model) specs.push(`Model: ${p.specification.model}`);
          if (p.specification.releaseYear) specs.push(`Năm: ${p.specification.releaseYear}`);
          if (p.specification.warranty) specs.push(`Bảo hành: ${p.specification.warranty}`);
          if (p.specification.color) specs.push(`Màu: ${p.specification.color}`);
          if (p.specification.origin) specs.push(`Xuất xứ: ${p.specification.origin}`);
          if (p.specification.material) specs.push(`Chất liệu: ${p.specification.material}`);

          if (specs.length > 0) {
            info += `\n  ${specs.join(', ')}`;
          }
        }

        return info;
      })
      .join('\n\n');

    return `Bạn là trợ lý bán hàng thông minh cho website bán đồ công nghệ.

NHIỆM VỤ:
- Tư vấn sản phẩm dựa trên nhu cầu khách hàng
- Giải đáp về giá, tính năng, bảo hành, tồn kho
- Gợi ý sản phẩm phù hợp ngân sách
- So sánh sản phẩm khi được yêu cầu

DANH SÁCH SẢN PHẨM:
${productList}

HƯỚNG DẪN:
1. Trả lời ngắn gọn, thân thiện, chuyên nghiệp
2. CHỈ đề xuất sản phẩm CÓ TRONG DANH SÁCH
3. Đề cập giá & tồn kho khi liên quan
4. Không biết thì nói thẳng: "Tôi chưa có thông tin này"
5. Format giá chuẩn Việt Nam: 29.990.000đ
6. KHÔNG bịa đặt thông tin
7. Nếu hỏi sản phẩm không có → thông báo lịch sự
8. Gợi ý 2-3 lựa chọn nếu có thể
9. Tập trung vào điểm mạnh của từng sản phẩm`;
  }
}