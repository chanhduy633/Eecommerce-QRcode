
// ==========================================
// FILE: routes/chatRoutes.ts
// ==========================================
import { Router } from 'express';
import { ChatController } from '../controllers/chatController';
import { ProductRepository } from '../repositories/productRepository';
import { GeminiService } from '../services/geminiService';
import { ChatService } from '../services/chatService';

const router = Router();

// Dependency injection
const productRepo = new ProductRepository();
const geminiService = new GeminiService();
const chatService = new ChatService(productRepo, geminiService);
const chatController = new ChatController(chatService);

// Route duy nhất
router.post('/ask', chatController.askAI);

export default router;