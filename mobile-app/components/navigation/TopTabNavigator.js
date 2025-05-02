import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopTabNavigator = ({ title }) => {
  const navigation = useNavigation();
  
  return (
    <View className="flex-1 bg-neutral-950">
      <View className="bg-neutral-900 px-4 py-3">
        <TouchableOpacity 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
          className="p-1 w-10"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-white text-3xl font-bold text-center">{title}</Text>
      </View>
    </View>
  );
};

export default TopTabNavigator; 