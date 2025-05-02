import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FitnessCard = ({ title, screenName }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      className="bg-neutral-800 rounded-xl p-6 mb-4 w-80 mx-2"
      onPress={() => navigation.navigate(screenName)}
    >
      <View className="items-center justify-center">
        <Text className="text-white text-lg font-semibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FitnessCard; 