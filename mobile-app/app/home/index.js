import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FitnessCard from '../../components/home/FitnessCard';

const HomeScreen = () => {
  const cardItems = [
    { title: 'Egzersizler', screenName: 'Exercises' },
    { title: 'Günlük Kalori İhtiyacı Hesapla', screenName: 'CalorieCalculator' },
    { title: 'BMI Hesapla', screenName: 'BMICalculator' },
    { title: 'Supplement Bilgi Ekranı', screenName: 'SupplementInfo' },
    { title: 'Sağlıklı Yemek Tarifleri', screenName: 'HealthyRecipes' },
    { title: 'Yiyecek Besin Değerleri', screenName: 'NutritionalValues' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-white text-3xl font-bold">FitnessApp</Text>
          <Text className="text-gray-400 mt-2">Hoş geldiniz!</Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="items-center">
            {cardItems.map((item, index) => (
              <FitnessCard 
                key={index} 
                title={item.title} 
                screenName={item.screenName} 
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen; 