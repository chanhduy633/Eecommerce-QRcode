// ==========================================
// FILE: services/GeminiService.ts
// ==========================================
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private model: any = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      this.model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash-lite',
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7,
        }
      });
    }
  }

  async generateResponse(systemPrompt: string, userMessage: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API chưa được cấu hình');
    }

    try {
      const fullPrompt = `${systemPrompt}\n\n---\n\nKhách hàng hỏi: ${userMessage}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      
      return response.text();
    } catch (error: any) {
      console.error('Gemini API error:', error);
      
      // Better error messages
      if (error.status === 429) {
        throw new Error('Đã vượt quá giới hạn API. Vui lòng thử lại sau 1 phút.');
      }
      
      if (error.message?.includes('API key')) {
        throw new Error('API key không hợp lệ.');
      }
      
      throw new Error('Không thể tạo phản hồi từ AI. Vui lòng thử lại.');
    }
  }
}
