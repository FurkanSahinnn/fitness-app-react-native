import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopTabNavigator from '../../../../components/navigation/TopTabNavigator';
import { getExerciseImage } from '../../../../mapping/exercise_image_mapping';

const ExercisesScreen = () => {
  const navigation = useNavigation();
  
  // Static vücut bölgeleri listesi - exercise_image_mapping.js'deki key'leri kullanıyoruz
  const bodyParts = [
    { key: 'chest', name: 'Göğüs', description: 'Göğüs kasları' },
    { key: 'back', name: 'Sırt', description: 'Sırt kasları' },
    { key: 'shoulder', name: 'Omuz', description: 'Omuz kasları' },
    { key: 'upper arms', name: 'Üst Kol', description: 'Biceps & Triceps' },
    { key: 'lower arms', name: 'Alt Kol', description: 'Önkol kasları' },
    { key: 'upper legs', name: 'Üst Bacak', description: 'Quadriceps & Hamstring' },
    { key: 'lower legs', name: 'Alt Bacak', description: 'Baldır kasları' },
    { key: 'waist', name: 'Karın', description: 'Karın kasları' },
    { key: 'neck', name: 'Boyun', description: 'Boyun kasları' },
    { key: 'cardio', name: 'Cardio', description: 'Kardiyovasküler' }
  ];

  // Vücut bölgesi kartına tıklandığında ExerciseList'e yönlendir
  const handleBodyPartPress = (bodyPart) => {
    navigation.navigate('ExerciseList', { bodyPart: bodyPart.key });
  };

     // Kart bileşeni - Sadece resim
   const BodyPartCard = ({ item }) => {
     const localImage = getExerciseImage(item.key);

     return (
       <TouchableOpacity 
         className="bg-gray-800 rounded-xl mx-4 my-2 shadow-lg overflow-hidden"
         style={{ width: 160 }}
         onPress={() => handleBodyPartPress(item)}
         activeOpacity={0.8}
       >
         {/* Sadece Resim */}
         {localImage ? (
           <Image 
             source={localImage}
             className="w-full rounded-xl"
             resizeMode="contain"
             style={{ height: 240, backgroundColor: '#F5F1EB' }}
           />
         ) : (
           <View className="w-full h-48 rounded-xl bg-gray-600 items-center justify-center">
             <Text className="text-gray-400 text-xs">Resim Yok</Text>
           </View>
         )}
       </TouchableOpacity>
     );
   };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Egzersiz Kategorileri" />
      
      {/* Content */}
      <View className="flex-1">
        
        <FlatList
          data={bodyParts}
          renderItem={({ item }) => <BodyPartCard item={item} />}
          keyExtractor={(item) => item.key}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingVertical: 16,
            paddingHorizontal: 8,
            paddingBottom: 32,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          columnWrapperStyle={{ justifyContent: 'center' }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExercisesScreen; 