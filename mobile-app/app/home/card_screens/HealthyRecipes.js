import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';

const HealthyRecipesScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Sağlıklı Yemek Tarifleri" />
      
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-white text-3xl font-bold text-center">Sağlıklı Yemek Tarifleri</Text>
      </View>
    </SafeAreaView>
  );
};

export default HealthyRecipesScreen; 