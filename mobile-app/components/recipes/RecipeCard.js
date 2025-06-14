import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipeCard = ({ recipe, onPress }) => {
  // Ekran genişliğini al ve kart genişliğini hesapla
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // padding: 16*2 + gap: 16

  // Görüntülenecek bilgileri belirle
  const title = recipe.title || '';
  const imageUrl = recipe.image || 'https://via.placeholder.com/312x231?text=No+Image';
  const likes = recipe.likes || 0;
  const usedIngredients = recipe.usedIngredientCount || 0;
  const missedIngredients = recipe.missedIngredientCount || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(recipe)}
      className="bg-neutral-800 rounded-xl mb-3 border border-neutral-700 overflow-hidden"
      style={{ width: cardWidth }}
      activeOpacity={0.7}
    >
      {/* Tarif resmi */}
      <View className="w-full h-32 bg-neutral-700">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
          onError={() => {
            console.log('Recipe image load error, using fallback');
          }}
        />
        
        {/* Beğeni sayısı overlay */}
        {likes > 0 && (
          <View className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-lg flex-row items-center">
            <Ionicons name="heart" size={12} color="#EF4444" />
            <Text className="text-white text-xs ml-1 font-medium">{likes}</Text>
          </View>
        )}
      </View>

      {/* Tarif bilgileri */}
      <View className="p-3">
        {/* Tarif adı */}
        <Text 
          className="text-white font-semibold text-sm mb-2" 
          numberOfLines={2}
          style={{ minHeight: 32 }}
        >
          {title}
        </Text>

        {/* Malzeme bilgileri */}
        <View className="space-y-1">
          {/* Mevcut malzemeler */}
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={12} color="#10B981" />
            <Text className="text-green-400 text-xs ml-1">
              {usedIngredients} mevcut malzeme
            </Text>
          </View>
          
          {/* Eksik malzemeler */}
          {missedIngredients > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={12} color="#F59E0B" />
              <Text className="text-amber-400 text-xs ml-1">
                {missedIngredients} eksik malzeme
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Tıklama göstergesi */}
      <View className="absolute bottom-2 right-2">
        <Ionicons name="chevron-forward" size={16} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard; 