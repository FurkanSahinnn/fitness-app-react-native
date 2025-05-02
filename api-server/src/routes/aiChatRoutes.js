import express from 'express';
import aiChatController from '../controllers/aiChatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Tüm AI Chat rotaları yetkilendirme gerektirir
router.use(authenticate);

// AI Chat oluştur
router.post('/aichat', aiChatController.createChat);

// Sohbet geçmişini getir
router.get('/aichat/history', aiChatController.getChatHistory);

export default router; 