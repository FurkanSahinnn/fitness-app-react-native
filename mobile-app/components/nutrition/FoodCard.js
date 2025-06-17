import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoodCard = ({ food, onPress, type = 'common' }) => {
  // Ekran genişliğini al ve kart genişliğini hesapla
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // padding: 16*2 + gap: 16

  // Common ve branded food tiplerini ayır
  const isCommon = type === 'common';
  const isBranded = type === 'branded';

  // Görüntülenecek bilgileri belirle
  const foodName = food.food_name || '';
  const brandName = food.brand_name || '';
  const servingInfo = `${food.serving_qty || 1} ${food.serving_unit || 'porsiyon'}`;
  const calories = food.nf_calories ? `${food.nf_calories} kcal` : null;
  const photoUrl = food.photo?.thumb || 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(food)}
      className="bg-neutral-800 rounded-xl p-3 mb-3 border border-neutral-700"
      style={{ width: cardWidth }}
      activeOpacity={0.7}
    >
      {/* Üst kısım: Marka etiketi */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1" />
        {isBranded && (
          <View className="bg-blue-600 px-2 py-1 rounded-md">
            <Text className="text-white text-xs font-medium">Marka</Text>
          </View>
        )}
      </View>

      {/* Yiyecek resmi - orta kısım */}
      <View className="items-center mb-3">
        <View className="w-20 h-20 rounded-full overflow-hidden bg-neutral-700">
          <Image
            source={{ uri: photoUrl }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => {
              console.log('Food image load error, using fallback');
            }}
          />
        </View>
      </View>

      {/* Yiyecek adı */}
      <View className="mb-2">
        <Text 
          className="text-white font-semibold text-sm text-center" 
          numberOfLines={2}
          style={{ minHeight: 32 }}
        >
          {foodName}
        </Text>
      </View>

      {/* Marka adı (sadece branded için) */}
      {isBranded && brandName && (
        <View className="mb-2">
          <Text 
            className="text-gray-400 text-xs text-center" 
            numberOfLines={1}
          >
            {brandName}
          </Text>
        </View>
      )}

      {/* Alt bilgiler */}
      <View className="space-y-1">
        {/* Porsiyon bilgisi */}
        <View className="flex-row items-center justify-center">
          <Ionicons name="restaurant-outline" size={12} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs ml-1 text-center" numberOfLines={1}>
            {servingInfo}
          </Text>
        </View>
        
        {/* Kalori bilgisi (varsa) */}
        {calories && (
          <View className="flex-row items-center justify-center">
            <Ionicons name="flame-outline" size={12} color="#F59E0B" />
            <Text className="text-amber-400 text-xs ml-1 font-medium">
              {calories}
            </Text>
          </View>
        )}
      </View>

      {/* Tıklama göstergesi */}
      <View className="absolute bottom-2 right-2">
        <Ionicons name="chevron-forward" size={16} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard; 