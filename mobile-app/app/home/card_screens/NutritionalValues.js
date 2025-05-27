import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';

const NutritionalValuesScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Yiyecek Besin Değerleri" />
      
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-white text-3xl font-bold text-center">Yiyecek Besin Değerleri</Text>
      </View>
    </SafeAreaView>
  );
};

export default NutritionalValuesScreen; 