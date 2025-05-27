import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { getSupplementImage } from '../../../../mapping/supplement_image_mapping';

const SupplementCard = ({ supplement, onPress }) => {
  const localImage = getSupplementImage(supplement.name);

  return (
    <TouchableOpacity 
      className="bg-gray-800 rounded-xl p-4 m-2 flex-1 shadow-lg"
      onPress={() => onPress(supplement)}
    >
      {/* Resim */}
      <View className="items-center mb-3 flex-1">
        {localImage ? (
          <Image 
            source={localImage}
            className="w-full h-28 rounded-lg"
            resizeMode="cover"
            style={{ flex: 1, minHeight: 112 }}
          />
        ) : (
          <View className="w-full h-28 rounded-lg bg-gray-600 items-center justify-center">
            <Text className="text-gray-400 text-xs">Resim Yok</Text>
          </View>
        )}
      </View>
      
      {/* Supplement Adı */}
      <Text className="text-white font-bold text-center text-sm mb-1" numberOfLines={2}>
        {supplement.name}
      </Text>
      
      {/* Kategori */}
      <Text className="text-gray-300 text-center text-xs" numberOfLines={1}>
        {supplement.category}
      </Text>
    </TouchableOpacity>
  );
};

export default SupplementCard; 