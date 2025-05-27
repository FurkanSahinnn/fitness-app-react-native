import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import TopTabNavigator from '../../../../components/navigation/TopTabNavigator';
import { getSupplementImage } from '../../../../mapping/supplement_image_mapping';

const SupplementDetail = ({ route, navigation }) => {
  const { supplement } = route.params;
  
  const localImage = getSupplementImage(supplement.name);

  const renderSection = (title, content) => {
    if (!content) return null;
    
    return (
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
        <Text className="text-gray-700 leading-6">{content}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <TopTabNavigator 
        title={supplement.name}
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView className="flex-1">
        {/* Image Section */}
        <View className="bg-gray-900 px-0 py-4">
          {localImage ? (
            <Image 
              source={localImage}
              className="w-full h-96"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-96 bg-gray-700 items-center justify-center">
              <Text className="text-gray-300 text-lg">Resim Yok</Text>
            </View>
          )}
        </View>

        {/* Title Section */}
        <View className="bg-gray-800 px-6 py-6">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold text-center mb-2">
              {supplement.name}
            </Text>
            <Text className="text-gray-300 text-lg text-center">
              {supplement.category}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View className="bg-white rounded-t-3xl -mt-4 px-6 py-8">
          {renderSection("Temel Etkiler", supplement.primary_effects)}
          {renderSection("Fitness Kullanımı", supplement.fitness_use)}
          {renderSection("Sağlık Kullanımı", supplement.health_use)}
          {renderSection("Dozaj", supplement.dosage)}
          {renderSection("Bilimsel Destek", supplement.scientific_support)}
          {renderSection("Riskler ve Yan Etkiler", supplement.risks)}
        </View>
      </ScrollView>
    </View>
  );
};

export default SupplementDetail; 