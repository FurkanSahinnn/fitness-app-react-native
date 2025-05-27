import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ExerciseDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="bg-neutral-900 px-4 py-3">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-1 w-10"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Egzersiz İsmi */}
          <Text className="text-white text-3xl font-bold text-center mb-6 capitalize">
            {exercise.name}
          </Text>
          
          {/* GIF Animasyonu */}
          <View className="items-center mb-6">
            <Image 
              source={{ uri: exercise.gifUrl }}
              className="w-80 h-80 rounded-2xl"
              resizeMode="cover"
            />
          </View>
          
          {/* Temel Bilgiler */}
          <View className="bg-neutral-800 rounded-2xl p-4 mb-4">
            <Text className="text-white text-xl font-bold mb-4">Temel Bilgiler</Text>
            
            <View className="mb-3">
              <Text className="text-gray-400 text-sm">Hedef Kas Grubu</Text>
              <Text className="text-white text-lg capitalize">{exercise.target}</Text>
            </View>
            
            <View className="mb-3">
              <Text className="text-gray-400 text-sm">Ekipman</Text>
              <Text className="text-white text-lg capitalize">{exercise.equipment}</Text>
            </View>
            
            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
              <View>
                <Text className="text-gray-400 text-sm">Yardımcı Kas Grupları</Text>
                <Text className="text-white text-lg capitalize">
                  {exercise.secondaryMuscles.join(', ')}
                </Text>
              </View>
            )}
          </View>
          
          {/* Talimatlar */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <View className="bg-neutral-800 rounded-2xl p-4">
              <Text className="text-white text-xl font-bold mb-4">Nasıl Yapılır?</Text>
              
              {exercise.instructions.map((instruction, index) => (
                <View key={index} className="flex-row mb-3">
                  <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3 mt-1">
                    <Text className="text-white text-xs font-bold">{index + 1}</Text>
                  </View>
                  <Text className="text-white text-base flex-1 leading-6">
                    {instruction}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetailScreen; 