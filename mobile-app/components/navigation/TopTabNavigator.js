import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopTabNavigator = ({ title, onBackPress, showBackButton = true }) => {
  const navigation = useNavigation();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  
  return (
    <View className="bg-neutral-900 px-4 py-3 pt-12">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity 
            onPress={handleBackPress}
            className="p-1 w-10"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View className={`flex-1 ${showBackButton ? 'ml-2' : ''}`}>
          <Text className="text-white text-xl font-bold">{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default TopTabNavigator; 