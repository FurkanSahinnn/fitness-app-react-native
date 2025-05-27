import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { getSupplementImage } from '../../mapping/supplement_image_mapping';

const SupplementCard = ({ supplement, onPress }) => {
  const localImage = getSupplementImage(supplement.name);

  return (
    <TouchableOpacity 
      className="bg-gray-800 rounded-xl mx-4 my-2 shadow-lg overflow-hidden"
      style={{ width: 160, height: 160 }}
      onPress={() => onPress(supplement)}
      activeOpacity={0.8}
    >
      {/* Sadece Resim */}
      {localImage ? (
        <Image 
          source={localImage}
          className="w-full h-full rounded-xl"
          resizeMode="contain"
          style={{ backgroundColor: '#F5F1EB' }}
        />
      ) : (
        <View className="w-full h-full rounded-xl bg-gray-600 items-center justify-center">
          <Text className="text-gray-400 text-xs">Resim Yok</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SupplementCard; 