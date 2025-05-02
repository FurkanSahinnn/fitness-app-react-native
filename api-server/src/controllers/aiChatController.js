import aiChatService from '../services/aiChatService.js';

const aiChatController = {
  async createChat(req, res, next) {
    try {
      const { message } = req.body;
      const userId = req.user.id; // Oturum açan kullanıcı kimliği

      if (!message) {
        return res.status(400).json({ message: 'Mesaj içeriği gerekli' });
      }

      // AI yanıtı al
      const aiResponse = await aiChatService.getAIResponse(message);
      
      // Konuşmayı kaydet
      const savedChat = await aiChatService.saveChat(userId, message, aiResponse);
      
      res.status(201).json({
        success: true,
        data: savedChat
      });
    } catch (error) {
      next(error);
    }
  },

  async getChatHistory(req, res, next) {
    try {
      const userId = req.user.id; // Oturum açan kullanıcı kimliği
      
      const chatHistory = await aiChatService.getChatHistory(userId);
      
      res.status(200).json({
        success: true,
        data: chatHistory
      });
    } catch (error) {
      next(error);
    }
  }
};

export default aiChatController; 