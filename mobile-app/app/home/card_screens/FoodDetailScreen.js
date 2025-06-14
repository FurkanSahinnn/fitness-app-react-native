import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';
import { nutritionixApi } from '../../../services/apis/nutritionix-api';

const FoodDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { food, foodType } = route.params;

  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      setLoading(true);
      let response;

      if (foodType === 'branded' && food.nix_item_id) {
        // Branded food için search/item endpoint kullan
        response = await nutritionixApi.searchItem(food.nix_item_id);
      } else if (foodType === 'common' && food.food_name) {
        // Common food için natural/nutrients endpoint kullan
        response = await nutritionixApi.naturalNutrients(food.food_name);
      }

      if (response?.data?.foods && response.data.foods.length > 0) {
        setNutritionData(response.data.foods[0]);
      } else {
        throw new Error('Besin değeri bilgisi bulunamadı');
      }
    } catch (error) {
      console.error('Besin değeri getirme hatası:', error);
      Alert.alert('Hata', 'Besin değeri bilgileri yüklenemedi. Lütfen tekrar deneyin.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const renderNutrientRow = (label, value, unit = 'g', highlight = false) => {
    if (value === null || value === undefined) return null;
    
    return (
      <View className={`flex-row justify-between items-center py-3 px-4 ${highlight ? 'bg-neutral-700' : 'bg-neutral-800'} rounded-lg mb-2`}>
        <Text className="text-gray-300 text-base">{label}</Text>
        <Text className={`text-white font-semibold text-base ${highlight ? 'text-blue-400' : ''}`}>
          {typeof value === 'number' ? value.toFixed(1) : value} {unit}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-950">
        <StatusBar style="light" />
        <TopTabNavigator title="Besin Değerleri" showBackButton />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-white mt-4 text-lg">Besin değerleri yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!nutritionData) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-950">
        <StatusBar style="light" />
        <TopTabNavigator title="Besin Değerleri" showBackButton />
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-white text-xl font-bold mt-4 text-center">Veri Bulunamadı</Text>
          <Text className="text-gray-400 text-center mt-2">Bu yiyecek için besin değeri bilgisi mevcut değil.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const photoUrl = nutritionData.photo?.thumb || food.photo?.thumb || 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <TopTabNavigator title="Besin Değerleri" showBackButton />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Yiyecek Başlığı ve Resmi */}
        <View className="bg-neutral-800 rounded-xl p-4 mb-6">
          <View className="flex-row items-center space-x-4">
            <View className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-700">
              <Image
                source={{ uri: photoUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-xl" numberOfLines={2}>
                {nutritionData.food_name || food.food_name}
              </Text>
              {nutritionData.brand_name && (
                <Text className="text-blue-400 text-base mt-1">{nutritionData.brand_name}</Text>
              )}
              <Text className="text-gray-400 text-sm mt-1">
                {nutritionData.serving_qty} {nutritionData.serving_unit}
              </Text>
            </View>
          </View>
        </View>

        {/* Ana Besin Değerleri */}
        <View className="mb-6">
          <Text className="text-white font-bold text-lg mb-4">Ana Besin Değerleri</Text>
          {renderNutrientRow('Kalori', nutritionData.nf_calories, 'kcal', true)}
          {renderNutrientRow('Toplam Yağ', nutritionData.nf_total_fat)}
          {renderNutrientRow('Doymuş Yağ', nutritionData.nf_saturated_fat)}
          {renderNutrientRow('Kolesterol', nutritionData.nf_cholesterol, 'mg')}
          {renderNutrientRow('Sodyum', nutritionData.nf_sodium, 'mg')}
          {renderNutrientRow('Toplam Karbonhidrat', nutritionData.nf_total_carbohydrate)}
          {renderNutrientRow('Diyet Lifi', nutritionData.nf_dietary_fiber)}
          {renderNutrientRow('Şeker', nutritionData.nf_sugars)}
          {renderNutrientRow('Protein', nutritionData.nf_protein)}
          {renderNutrientRow('Potasyum', nutritionData.nf_potassium, 'mg')}
        </View>

        {/* İçerik Bilgisi */}
        {nutritionData.nf_ingredient_statement && (
          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-4">İçerik</Text>
            <View className="bg-neutral-800 rounded-xl p-4">
              <Text className="text-gray-300 text-sm leading-6">
                {nutritionData.nf_ingredient_statement}
              </Text>
            </View>
          </View>
        )}

        {/* Porsiyon Bilgisi */}
        <View className="bg-neutral-800 rounded-xl p-4 mb-6">
          <Text className="text-white font-bold text-base mb-2">Porsiyon Bilgisi</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-300">Porsiyon Miktarı:</Text>
            <Text className="text-white font-semibold">
              {nutritionData.serving_qty} {nutritionData.serving_unit}
            </Text>
          </View>
          {nutritionData.serving_weight_grams && (
            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-300">Ağırlık:</Text>
              <Text className="text-white font-semibold">
                {nutritionData.serving_weight_grams}g
              </Text>
            </View>
          )}
        </View>

        {/* Alt boşluk */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodDetailScreen; 