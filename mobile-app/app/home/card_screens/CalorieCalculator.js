import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';

const CalorieCalculatorScreen = () => {
  const navigation = useNavigation();
  
  // Form state
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    dailyCalories: 0
  });

  // Sonuçlar
  const [results, setResults] = useState({
    bmr: 0,
    dailyCalories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [showResults, setShowResults] = useState(false);

  // Form güncelleme fonksiyonu
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // BMR hesaplama (Mifflin-St Jeor formülü)
  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  // Aktivite faktörü
  const getActivityFactor = (activityLevel) => {
    switch (activityLevel) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'high': return 1.725;
      case 'extreme': return 1.9;
      default: return 1.2;
    }
  };

  // Hedef faktörü
  const getGoalFactor = (goal) => {
    switch (goal) {
      case 'lose': return 0.8; // %20 azaltım
      case 'gain': return 1.2; // %20 artış
      case 'fastGain': return 1.3; // %30 artış
      case 'maintain': return 1.0;
      default: return 1.0;
    }
  };

  // Hesaplama fonksiyonu
  const calculateCalories = () => {
    const { gender, age, height, weight, activityLevel, goal } = formData;

    // Validasyon
    if (!gender || !age || !height || !weight || !activityLevel || !goal) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) {
      Alert.alert('Hata', 'Lütfen geçerli sayılar girin');
      return;
    }

    // BMR hesaplama
    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    
    // Aktivite faktörü ile TDEE hesaplama
    const activityFactor = getActivityFactor(activityLevel);
    const tdee = bmr * activityFactor;
    
    // Hedef faktörü ile günlük kalori ihtiyacı
    const goalFactor = getGoalFactor(goal);
    const dailyCalories = Math.round(tdee * goalFactor);

    // Makro besin hesaplama (standart oranlar)
    const proteinCalories = dailyCalories * 0.25; // %25 protein
    const carbsCalories = dailyCalories * 0.45; // %45 karbonhidrat
    const fatCalories = dailyCalories * 0.30; // %30 yağ

    const proteinGrams = Math.round(proteinCalories / 4); // 1g protein = 4 kalori
    const carbsGrams = Math.round(carbsCalories / 4); // 1g karbonhidrat = 4 kalori
    const fatGrams = Math.round(fatCalories / 9); // 1g yağ = 9 kalori

    setResults({
      bmr: Math.round(bmr),
      dailyCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams
    });

    setShowResults(true);
  };

  const GenderSelector = () => (
    <View className="mb-8">
      <Text className="text-white text-xl font-semibold mb-4">
        Cinsiyetiniz<Text className="text-red-500">*</Text>
      </Text>
      <View className="space-y-4">
        <TouchableOpacity
          onPress={() => updateFormData('gender', 'male')}
          className={`flex-row items-center p-4 rounded-lg ${
            formData.gender === 'male' ? 'bg-blue-600' : 'bg-neutral-800'
          }`}
        >
          <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
            formData.gender === 'male' ? 'border-white bg-white' : 'border-gray-400'
          }`}>
            {formData.gender === 'male' && (
              <View className="w-3 h-3 bg-blue-600 rounded-full m-0.5" />
            )}
          </View>
          <Text className="text-white text-lg">Erkek</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => updateFormData('gender', 'female')}
          className={`flex-row items-center p-4 rounded-lg ${
            formData.gender === 'female' ? 'bg-blue-600' : 'bg-neutral-800'
          }`}
        >
          <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
            formData.gender === 'female' ? 'border-white bg-white' : 'border-gray-400'
          }`}>
            {formData.gender === 'female' && (
              <View className="w-3 h-3 bg-blue-600 rounded-full m-0.5" />
            )}
          </View>
          <Text className="text-white text-lg">Kadın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ActivityLevelSelector = () => (
    <View className="mb-8">
      <Text className="text-white text-xl font-semibold mb-4">
        Gün içi hareketlilik seviyeniz<Text className="text-red-500">*</Text>
      </Text>
      <View className="space-y-4">
        {[
          { 
            key: 'sedentary', 
            label: 'Sedanter (Hareket etmiyorum veya çok az hareket ediyorum.)' 
          },
          { 
            key: 'light', 
            label: 'Az hareketli (Hafif hareketli bir yaşam / Haftada 1-3 gün egzersiz yapıyorum.)' 
          },
          { 
            key: 'moderate', 
            label: 'Orta derece hareketli (Hareketli bir yaşam / Haftada 3-5 gün egzersiz yapıyorum.)' 
          },
          { 
            key: 'high', 
            label: 'Çok hareketli (Çok hareketli bir yaşam / Haftada 6-7 gün egzersiz yapıyorum.)' 
          },
          { 
            key: 'extreme', 
            label: 'Aşırı hareketli (Profesyonel sporcu, atlet seviyesi.)' 
          }
        ].map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => updateFormData('activityLevel', option.key)}
            className={`flex-row items-start p-4 rounded-lg ${
              formData.activityLevel === option.key ? 'bg-blue-600' : 'bg-neutral-800'
            }`}
          >
            <View className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 ${
              formData.activityLevel === option.key ? 'border-white bg-white' : 'border-gray-400'
            }`}>
              {formData.activityLevel === option.key && (
                <View className="w-3 h-3 bg-blue-600 rounded-full m-0.5" />
              )}
            </View>
            <Text className="text-white text-base flex-1 leading-5">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const GoalSelector = () => (
    <View className="mb-8">
      <Text className="text-white text-xl font-semibold mb-4">
        Hedefiniz nedir?<Text className="text-red-500">*</Text>
      </Text>
      <View className="space-y-4">
        {[
          { key: 'lose', label: 'Zayıflamak, yağ yakmak.' },
          { key: 'maintain', label: 'Kilo almak (kas kütlesini arttırma, clean bulking)' },
          { key: 'gain', label: 'Hızlı kilo almak (yağ oranınız artabilir, dirty bulking)' },
          { key: 'fastGain', label: 'Kilomu korumak' }
        ].map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => updateFormData('goal', option.key)}
            className={`flex-row items-start p-4 rounded-lg ${
              formData.goal === option.key ? 'bg-blue-600' : 'bg-neutral-800'
            }`}
          >
            <View className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 ${
              formData.goal === option.key ? 'border-white bg-white' : 'border-gray-400'
            }`}>
              {formData.goal === option.key && (
                <View className="w-3 h-3 bg-blue-600 rounded-full m-0.5" />
              )}
            </View>
            <Text className="text-white text-base flex-1">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const ResultsDisplay = () => (
    <View className="mt-8 p-6 bg-neutral-800 rounded-xl">
      <Text className="text-white text-2xl font-bold mb-4">Sonuçlarınız</Text>
      
      {/* Günlük Kalori İhtiyacı */}
      <View className="mb-6 p-4 bg-blue-600 rounded-lg">
        <Text className="text-white text-xl font-semibold">Günlük kalori ihtiyacınız</Text>
        <Text className="text-white text-4xl font-bold">{results.dailyCalories}</Text>
      </View>

      {/* Makro Besinler */}
      <Text className="text-white text-xl font-semibold mb-4">Günlük almanız gereken makrolar</Text>
      
      <View className="space-y-5">
        <View className="flex-row justify-between items-center p-5 bg-neutral-700 rounded-lg">
          <Text className="text-white text-lg">Protein</Text>
          <Text className="text-white text-xl font-semibold">{results.protein} gram</Text>
        </View>
        
        <View className="flex-row justify-between items-center p-5 bg-neutral-700 rounded-lg">
          <Text className="text-white text-lg">Karbonhidrat</Text>
          <Text className="text-white text-xl font-semibold">{results.carbs} gram</Text>
        </View>
        
        <View className="flex-row justify-between items-center p-5 bg-neutral-700 rounded-lg">
          <Text className="text-white text-lg">Yağ</Text>
          <Text className="text-white text-xl font-semibold">{results.fat} gram</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => setShowResults(false)}
        className="mt-6 p-4 bg-blue-600 rounded-lg"
      >
        <Text className="text-white text-center text-xl font-semibold">Yeniden Hesapla</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Günlük Kalori İhtiyacı Hesapla" />
      
      <ScrollView className="flex-1 px-6">
        <View className="py-6">
          
          {!showResults ? (
            <>
              {/* Cinsiyet */}
              <GenderSelector />
              
              {/* Yaş */}
              <View className="mb-8">
                <Text className="text-white text-xl font-semibold mb-4">
                  Yaşınız<Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Yaşınızı girin"
                  placeholderTextColor="#9CA3AF"
                  value={formData.age}
                  onChangeText={(text) => updateFormData('age', text)}
                  keyboardType="numeric"
                  className="bg-neutral-800 text-white p-4 rounded-lg text-lg"
                />
              </View>

              {/* Boy */}
              <View className="mb-8">
                <Text className="text-white text-xl font-semibold mb-4">
                  Boyunuz (cm)<Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Boyunuzu cm cinsinden giriniz. (örnek : 174)"
                  placeholderTextColor="#9CA3AF"
                  value={formData.height}
                  onChangeText={(text) => updateFormData('height', text)}
                  keyboardType="numeric"
                  className="bg-neutral-800 text-white p-4 rounded-lg text-lg"
                />
                <Text className="text-blue-400 text-base mt-2">
                  Santimetre cinsinden boyunuzu giriniz. (örnek : 174)
                </Text>
              </View>

              {/* Kilo */}
              <View className="mb-8">
                <Text className="text-white text-xl font-semibold mb-4">
                  Kilonuz (kg)<Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Kilonuzu kg cinsinden giriniz."
                  placeholderTextColor="#9CA3AF"
                  value={formData.weight}
                  onChangeText={(text) => updateFormData('weight', text)}
                  keyboardType="numeric"
                  className="bg-neutral-800 text-white p-4 rounded-lg text-lg"
                />
                <Text className="text-blue-400 text-base mt-2">
                  Kilogram cinsinden kilonuzu giriniz. (örnek : 76)
                </Text>
              </View>

              {/* Aktivite Seviyesi */}
              <ActivityLevelSelector />

              {/* Hedef */}
              <GoalSelector />

              {/* Hesapla Butonu */}
              <TouchableOpacity 
                onPress={calculateCalories}
                className="bg-blue-600 p-4 rounded-lg mt-8 mb-8"
              >
                <Text className="text-white text-center text-xl font-bold">Hesapla</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ResultsDisplay />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalorieCalculatorScreen; 