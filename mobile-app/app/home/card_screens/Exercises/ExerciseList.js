import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { exerciseApi } from '../../../../services/apis/exercise-api';
import TopTabNavigator from '../../../../components/navigation/TopTabNavigator';

const ExerciseListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bodyPart } = route.params;
  
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Belirli vücut bölgesi için egzersizleri getir
  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await exerciseApi.getExercisesByBodyPart(bodyPart);
      setExercises(response || []); // response.data yerine response kullan ve fallback ekle
    } catch (error) {
      console.error('Egzersizler getirilirken hata:', error);
      Alert.alert(
        'Hata', 
        'Egzersizler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      );
      setExercises([]); // Hata durumunda boş array set et
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [bodyPart]);

  // Egzersiz kartına tıklandığında
  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise });
  };

  // Egzersiz kartı bileşeni
  const ExerciseCard = ({ item }) => (
    <TouchableOpacity
      className="bg-neutral-800 rounded-2xl m-2 p-4"
      onPress={() => handleExercisePress(item)}
      activeOpacity={0.8}
    >
      <View className="flex-row">
        {/* GIF Resmi */}
        <Image 
          source={{ uri: item.gifUrl }}
          className="w-20 h-20 rounded-xl mr-4"
          resizeMode="cover"
        />
        
        {/* Egzersiz Bilgileri */}
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold mb-2 capitalize">
            {item.name}
          </Text>
          <Text className="text-gray-400 text-sm mb-1">
            Hedef: {item.target}
          </Text>
          <Text className="text-gray-400 text-sm">
            Ekipman: {item.equipment}
          </Text>
        </View>
        
        {/* Ok ikonu */}
        <View className="justify-center">
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-950">
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white text-lg mt-4">Egzersizler yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title={`${bodyPart.replace('_', ' ')} Egzersizleri`} />
      
      {/* Content */}
      <View className="flex-1 p-4">
        <Text className="text-gray-400 text-center mb-6">
          {exercises?.length || 0} egzersiz bulundu
        </Text>
        
        <FlatList
          data={exercises || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExerciseListScreen; 