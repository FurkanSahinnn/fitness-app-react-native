import { GoogleGenerativeAI } from '@google/generative-ai';
import db from '../config/db.js';

class AIChatService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async getAIResponse(message) {
    try {
      // Gemini modeli ile konuşma
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Prompt oluştur
      const prompt = `Sen bir fitness asistanısın. Kullanıcı: ${message}`;

      // Yanıt al
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error('AI yanıtı alınırken hata:', error);
      throw new Error('AI yanıtı oluşturulamadı');
    }
  }

  async saveChat(userId, message, response) {
    try {
      const query = `
        INSERT INTO ai_chats (user_id, message, response)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [userId, message, response];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Sohbet kaydedilirken hata:', error);
      throw new Error('Sohbet kaydedilemedi');
    }
  }

  async getChatHistory(userId) {
    try {
      const query = `
        SELECT *
        FROM ai_chats
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const values = [userId];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Sohbet geçmişi alınırken hata:', error);
      throw new Error('Sohbet geçmişi alınamadı');
    }
  }

  async clearChatHistory(userId) {
    try {
      const query = `
        DELETE FROM ai_chats
        WHERE user_id = $1
        RETURNING *
      `;
      const values = [userId];
      const result = await db.query(query, values);
      return { success: true, count: result.rowCount };
    } catch (error) {
      console.error('Sohbet geçmişi temizlenirken hata:', error);
      throw new Error('Sohbet geçmişi temizlenemedi');
    }
  }
}

export default new AIChatService(); 