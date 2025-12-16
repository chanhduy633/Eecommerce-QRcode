// ==========================================
// FILE: controllers/ChatController.ts
// ==========================================
import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';

export class ChatController {
  constructor(private chatService: ChatService) {}

  askAI = async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      
      if (!message?.trim()) {
        return res.status(400).json({ error: 'Tin nhắn không được để trống' });
      }

      const aiResponse = await this.chatService.getAIResponse(message.trim());
      
      return res.status(200).json({ 
        userMessage: message.trim(),
        aiResponse 
      });
    } catch (error: any) {
      console.error('Chat error:', error);
      return res.status(500).json({
        error: error.message || 'Đã xảy ra lỗi khi xử lý tin nhắn',
      });
    }
  };
}
