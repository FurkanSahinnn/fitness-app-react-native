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
      
      // İstemciye uygun bir yanıt formatı dön
      res.status(201).json({
        success: true,
        data: {
          id: savedChat.id,
          user_message: {
            id: `${savedChat.id}-user`,
            content: savedChat.message,
            is_user: true,
            created_at: savedChat.created_at
          },
          ai_response: {
            id: `${savedChat.id}-ai`,
            content: savedChat.response,
            is_user: false,
            created_at: savedChat.created_at
          }
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async getChatHistory(req, res, next) {
    try {
      const userId = req.user.id; // Oturum açan kullanıcı kimliği
      
      const chatHistory = await aiChatService.getChatHistory(userId);
      
      // İstemciye uygun bir yanıt formatı dön
      const formattedHistory = chatHistory.map(chat => ({
        id: chat.id,
        user_message: {
          id: `${chat.id}-user`,
          content: chat.message,
          is_user: true,
          created_at: chat.created_at
        },
        ai_response: {
          id: `${chat.id}-ai`,
          content: chat.response,
          is_user: false,
          created_at: chat.created_at
        }
      }));
      
      res.status(200).json({
        success: true,
        data: formattedHistory
      });
    } catch (error) {
      next(error);
    }
  },

  async clearChatHistory(req, res, next) {
    try {
      const userId = req.user.id; // Oturum açan kullanıcı kimliği
      
      const result = await aiChatService.clearChatHistory(userId);
      
      res.status(200).json({
        success: true,
        message: 'Sohbet geçmişi başarıyla temizlendi',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};

export default aiChatController; 