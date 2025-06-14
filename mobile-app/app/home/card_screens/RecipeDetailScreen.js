import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';
import { spoonacularApi } from '../../../services/apis/spoonacular-api';

const RecipeDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params;

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      
      // Paralel istekler - detaylar ve adımlar
      const [detailsResponse, instructionsResponse] = await Promise.all([
        spoonacularApi.getRecipeInformation(recipe.id),
        spoonacularApi.getRecipeInstructions(recipe.id)
      ]);

      if (detailsResponse?.data) {
        setRecipeDetails(detailsResponse.data);
      }

      if (instructionsResponse?.data && instructionsResponse.data.length > 0) {
        setInstructions(instructionsResponse.data[0]?.steps || []);
      }
    } catch (error) {
      console.error('Tarif detayları getirme hatası:', error);
      Alert.alert('Hata', 'Tarif detayları yüklenemedi. Lütfen tekrar deneyin.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const renderNutrient = (label, value, unit = 'g', color = '#9CA3AF') => {
    if (!value) return null;
    
    return (
      <View className="bg-neutral-800 rounded-lg p-3 flex-1 mx-1">
        <Text className="text-gray-400 text-xs text-center mb-1">{label}</Text>
        <Text className="text-white text-lg font-bold text-center" style={{ color }}>
          {Math.round(value)}{unit}
        </Text>
      </View>
    );
  };

  const renderIngredient = (ingredient, index) => (
    <View key={index} className="flex-row items-center py-2 px-4 bg-neutral-800 rounded-lg mb-2">
      <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
      <Text className="text-white flex-1">{ingredient.original || ingredient.name}</Text>
    </View>
  );

  const renderInstruction = (step, index) => (
    <View key={index} className="flex-row mb-4">
      <View className="w-8 h-8 bg-green-600 rounded-full items-center justify-center mr-3 mt-1">
        <Text className="text-white font-bold text-sm">{step.number}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-white leading-6">{step.step}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-950">
        <StatusBar style="light" />
        <TopTabNavigator title="Tarif Detayı" showBackButton />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="text-white mt-4 text-lg">Tarif yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!recipeDetails) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-950">
        <StatusBar style="light" />
        <TopTabNavigator title="Tarif Detayı" showBackButton />
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-white text-xl font-bold mt-4 text-center">Veri Bulunamadı</Text>
          <Text className="text-gray-400 text-center mt-2">Bu tarif için detay bilgisi mevcut değil.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = recipeDetails.image || recipe.image;
  const nutrition = recipeDetails.nutrition?.nutrients || [];

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <TopTabNavigator title="Tarif Detayı" showBackButton />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Tarif resmi ve başlık */}
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
            <Text className="text-white font-bold text-xl mb-2" numberOfLines={2}>
              {recipeDetails.title}
            </Text>
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color="#10B981" />
                <Text className="text-green-400 ml-1">{recipeDetails.readyInMinutes || 30} dk</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#3B82F6" />
                <Text className="text-blue-400 ml-1">{recipeDetails.servings || 4} kişi</Text>
              </View>
              {recipeDetails.aggregateLikes > 0 && (
                <View className="flex-row items-center">
                  <Ionicons name="heart" size={16} color="#EF4444" />
                  <Text className="text-red-400 ml-1">{recipeDetails.aggregateLikes}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View className="p-4">
          {/* Özet */}
          {recipeDetails.summary && (
            <View className="mb-6">
              <Text className="text-white font-bold text-lg mb-3">Tarif Hakkında</Text>
              <View className="bg-neutral-800 rounded-xl p-4">
                <Text className="text-gray-300 leading-6">
                  {recipeDetails.summary.replace(/<[^>]*>/g, '')}
                </Text>
              </View>
            </View>
          )}

          {/* Besin değerleri */}
          {nutrition.length > 0 && (
            <View className="mb-6">
              <Text className="text-white font-bold text-lg mb-3">Besin Değerleri (Porsiyon)</Text>
              <View className="flex-row mb-3">
                {renderNutrient('Kalori', 
                  nutrition.find(n => n.name === 'Calories')?.amount, 
                  '', '#F59E0B')}
                {renderNutrient('Protein', 
                  nutrition.find(n => n.name === 'Protein')?.amount, 
                  'g', '#10B981')}
              </View>
              <View className="flex-row">
                {renderNutrient('Karbonhidrat', 
                  nutrition.find(n => n.name === 'Carbohydrates')?.amount, 
                  'g', '#3B82F6')}
                {renderNutrient('Yağ', 
                  nutrition.find(n => n.name === 'Fat')?.amount, 
                  'g', '#EF4444')}
              </View>
            </View>
          )}

          {/* Malzemeler */}
          {recipeDetails.extendedIngredients && (
            <View className="mb-6">
              <Text className="text-white font-bold text-lg mb-3">
                Malzemeler ({recipeDetails.extendedIngredients.length})
              </Text>
              {recipeDetails.extendedIngredients.map(renderIngredient)}
            </View>
          )}

          {/* Yapılışı */}
          {instructions.length > 0 && (
            <View className="mb-6">
              <Text className="text-white font-bold text-lg mb-3">
                Yapılışı ({instructions.length} adım)
              </Text>
              {instructions.map(renderInstruction)}
            </View>
          )}

          {/* Alt boşluk */}
          <View className="h-6" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen; 