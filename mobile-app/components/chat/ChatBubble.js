import React from 'react';
import { View, Text } from 'react-native';

const ChatBubble = ({ message, isUser, timestamp }) => {
  // Zaman bilgisini formatlama
  const formattedTime = new Date(timestamp).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <View className={`mb-2 max-w-[80%] ${isUser ? 'self-end' : 'self-start'}`}>
      <View 
        className={`rounded-xl p-3 ${
          isUser 
            ? 'bg-blue-500 rounded-tr-none' 
            : 'bg-gray-600 rounded-tl-none'
        }`}
      >
        <Text className="text-white">{message}</Text>
      </View>
      <Text className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
        {formattedTime}
      </Text>
    </View>
  );
};

export default ChatBubble; 