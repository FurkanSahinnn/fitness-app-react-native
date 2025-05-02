import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../services/auth/AuthContext';

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-white text-3xl font-bold">Profil</Text>
        </View>

        <View className="bg-neutral-900 p-6 rounded-xl mb-6">
          <Text className="text-white text-xl font-bold mb-4">Profil Bilgileri</Text>
          <Text className="text-gray-300">Kullanıcı: {user?.name}</Text>
          <Text className="text-gray-300">E-posta: {user?.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen; 