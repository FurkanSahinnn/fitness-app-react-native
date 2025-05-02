import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../services/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-white text-3xl font-bold">Ayarlar</Text>
        </View>
        
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 py-4 px-10 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen; 