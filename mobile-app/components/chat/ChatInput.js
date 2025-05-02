import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-center border-t border-gray-700 p-2 bg-gray-900">
      <TextInput
        className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 mr-2"
        placeholder="Mesajınızı yazın..."
        placeholderTextColor="#9ca3af"
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity 
        onPress={handleSend}
        className="bg-blue-500 rounded-full w-10 h-10 items-center justify-center"
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput; 