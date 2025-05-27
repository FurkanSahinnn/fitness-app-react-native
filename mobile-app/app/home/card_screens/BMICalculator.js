import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';

const BMICalculatorScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="BMI Hesapla" />
      
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-white text-3xl font-bold text-center">BMI Hesapla</Text>
      </View>
    </SafeAreaView>
  );
};

export default BMICalculatorScreen; 