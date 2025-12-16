// ==========================================
// FILE: services/ChatService.ts
// ==========================================
import { ProductRepository } from '../repositories/productRepository';
import { GeminiService } from './geminiService';
import { IProduct, PromptBuilder } from './promptBuilder';

export class ChatService {
  constructor(
    private productRepo: ProductRepository,
    private geminiService: GeminiService
  ) {}

  async getAIResponse(userMessage: string): Promise<string> {
    try {
      // ✅ Lấy products kèm specifications
      const productsWithSpecs = await this.productRepo.findAllWithSpecs();
      
      console.log('[ChatService] Products with specs count:', productsWithSpecs.length);
      
      if (!productsWithSpecs || productsWithSpecs.length === 0) {
        return 'Xin lỗi, hiện tại cửa hàng chưa có sản phẩm nào. Vui lòng quay lại sau!';
      }

      // Convert sang format IProduct
      const products: IProduct[] = productsWithSpecs.map(p => ({
        _id: p._id.toString(),
        name: p.name || 'Sản phẩm không tên',
        price: Number(p.price) || 0,
        stock: Number(p.stock) || 0,
        category: p.category || 'Chưa phân loại',
        description: p.description,
        specification: p.specification,
      }));

      console.log('[ChatService] First product sample:', JSON.stringify(products[0], null, 2));

      // Build system prompt
      const systemPrompt = PromptBuilder.buildProductContext(products);
      
      // Gọi Gemini AI
      return await this.geminiService.generateResponse(systemPrompt, userMessage);
    } catch (error) {
      console.error('[ChatService] Error in getAIResponse:', error);
      throw error;
    }
  }
}
