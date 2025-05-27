import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isUser, timestamp }) => {
  // Zaman bilgisini formatlama
  let formattedTime;
  try {
    formattedTime = new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    formattedTime = '';
    console.error('Tarih formatı hatası:', e);
  }

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.aiContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Text style={[
        styles.timestamp,
        isUser ? styles.userTimestamp : styles.aiTimestamp
      ]}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 12,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#3b82f6', // blue-500
    borderTopRightRadius: 0,
  },
  aiBubble: {
    backgroundColor: '#4b5563', // gray-600
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: '#9ca3af', // gray-400
    textAlign: 'right',
  },
  aiTimestamp: {
    color: '#9ca3af', // gray-400
    textAlign: 'left',
  }
});

export default ChatBubble; 