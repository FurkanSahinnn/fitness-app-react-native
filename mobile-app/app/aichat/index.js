import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import apis from '../../services/apis';

const AIChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Sohbet geçmişini yükle
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await apis.getAIChatHistory();
      // Response içindeki verileri uygun formata dönüştür
      if (response.data && response.data.data) {
        const formattedMessages = response.data.data.map(chat => ([
          {
            id: `${chat.id}-user`,
            text: chat.message,
            isUser: true,
            timestamp: chat.created_at
          },
          {
            id: `${chat.id}-ai`,
            text: chat.response,
            isUser: false,
            timestamp: chat.created_at
          }
        ])).flat();
        
        setMessages(formattedMessages.reverse());
      }
    } catch (error) {
      console.error('Sohbet geçmişi yüklenirken hata:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    // Kullanıcı mesajını ekle
    const userMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // API isteği başlat
    setLoading(true);
    
    try {
      const response = await apis.sendAIMessage(text);
      
      if (response.data && response.data.data) {
        // AI yanıtını ekle
        const aiMessage = {
          id: `${response.data.data.id}-ai`,
          text: response.data.data.response,
          isUser: false,
          timestamp: response.data.data.created_at
        };
        
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.error('AI mesajı gönderilirken hata:', error);
      // Hata mesajını ekle
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Mesaj listesi görünümünü otomatik olarak en sona kaydır
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-center p-4 border-b border-gray-800">
        <Text className="text-white text-xl font-bold">AI Chat</Text>
      </View>
      
      {initialLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#3b82f6" size="large" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          className="flex-1 p-4"
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChatBubble 
              message={item.text} 
              isUser={item.isUser} 
              timestamp={item.timestamp}
            />
          )}
          contentContainerStyle={{ 
            flexGrow: 1, 
            paddingBottom: 10,
            justifyContent: messages.length === 0 ? 'center' : 'flex-start' 
          }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center">
              <Text className="text-gray-400 text-center">
                Henüz mesaj yok. Fitness hakkında bir şeyler sorabilirsiniz.
              </Text>
            </View>
          )}
        />
      )}
      
      {loading && (
        <View className="items-center justify-center py-2">
          <ActivityIndicator color="#3b82f6" size="small" />
          <Text className="text-gray-400 mt-1 text-xs">AI yanıt yazıyor...</Text>
        </View>
      )}
      
      <ChatInput onSend={handleSendMessage} />
    </SafeAreaView>
  );
};

export default AIChatScreen; 