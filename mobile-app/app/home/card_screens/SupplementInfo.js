import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SupplementInfoScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-1">
        <View className="bg-neutral-900 px-4 py-3">
          <TouchableOpacity 
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            className="p-1 w-10"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-white text-3xl font-bold text-center">Supplement Bilgi Ekranı</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupplementInfoScreen; 