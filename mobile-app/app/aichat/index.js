import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
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
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        const messagesArray = [];
        
        // Yeni API formatına göre verileri işle
        response.data.data.forEach(item => {
          if (item.user_message) {
            messagesArray.push({
              id: item.user_message.id,
              text: item.user_message.content,
              isUser: true,
              timestamp: item.user_message.created_at
            });
          }
          
          if (item.ai_response) {
            messagesArray.push({
              id: item.ai_response.id,
              text: item.ai_response.content,
              isUser: false, 
              timestamp: item.ai_response.created_at
            });
          }
        });
        
        // Konuşma tarihine göre sırala (en son mesajlar altta)
        messagesArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(messagesArray);
      }
    } catch (error) {
      console.error('Sohbet geçmişi yüklenirken hata:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Benzersiz bir geçici ID oluştur
    const tempId = Date.now().toString();
    
    // Kullanıcı mesajını ekle (geçici ID ile)
    const userMessage = {
      id: `temp-${tempId}-user`,
      text: text,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    // Kullanıcı mesajını listeye ekle
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Otomatik kaydır
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
    
    // AI yanıtını al
    setLoading(true);
    
    try {
      const response = await apis.sendAIMessage(text);
      
      if (response.data && response.data.data) {
        const { data } = response.data;
        
        // Kullanıcı mesajını güncelle (geçici ID yerine gerçek ID kullan)
        setMessages(prevMessages => prevMessages.map(msg => 
          msg.id === `temp-${tempId}-user` 
            ? {
                id: data.user_message.id,
                text: data.user_message.content,
                isUser: true,
                timestamp: data.user_message.created_at
              }
            : msg
        ));
        
        // AI yanıtını ekle
        setMessages(prevMessages => [
          ...prevMessages, 
          {
            id: data.ai_response.id,
            text: data.ai_response.content,
            isUser: false,
            timestamp: data.ai_response.created_at
          }
        ]);
        
        // Otomatik kaydır
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    } catch (error) {
      console.error('AI mesajı gönderilirken hata:', error);
      
      // Hata mesajını ekle
      const errorMessage = {
        id: `error-${tempId}`,
        text: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Sohbet geçmişini temizleme
  const handleClearChat = () => {
    Alert.alert(
      'Sohbet Geçmişini Temizle',
      'Tüm sohbet geçmişiniz silinecek. Devam etmek istiyor musunuz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: async () => {
            try {
              await apis.clearAIChatHistory();
              setMessages([]);
              Alert.alert('Başarılı', 'Sohbet geçmişiniz temizlendi.');
            } catch (error) {
              console.error('Sohbet temizlenirken hata:', error);
              Alert.alert('Hata', 'Sohbet geçmişi temizlenemedi.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
        <View className="flex-1"/>
        <Text className="text-white text-xl font-bold flex-1 text-center">AI Chat</Text>
        <View className="flex-1 items-end">
          <TouchableOpacity 
            onPress={handleClearChat}
            className="w-10 h-10 items-center justify-center rounded-full"
          >
            <Ionicons name="trash-outline" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
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