import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';
import { bmiApi } from '../../../services/apis/bmi-api';

const BMICalculatorScreen = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Form verilerini güncelle
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Form validasyonu
  const validateForm = () => {
    const { weight, height } = formData;
    
    if (!weight || !height) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return false;
    }
    
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (isNaN(weightNum) || weightNum <= 0) {
      Alert.alert('Hata', 'Lütfen geçerli bir kilo değeri girin.');
      return false;
    }
    
    if (isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Hata', 'Lütfen geçerli bir boy değeri girin.');
      return false;
    }
    
    if (heightNum > 300) {
      Alert.alert('Hata', 'Boy değeri 300 cm\'den büyük olamaz.');
      return false;
    }
    
    if (weightNum > 500) {
      Alert.alert('Hata', 'Kilo değeri 500 kg\'dan büyük olamaz.');
      return false;
    }
    
    return true;
  };

  // BMI hesaplama
  const calculateBMI = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const response = await bmiApi.calculateBMI(formData.weight, formData.height);
      
      if (response.status === 'ok' && response.data) {
        setResults(response.data);
        setShowResults(true);
      } else {
        Alert.alert('Hata', 'BMI hesaplanırken bir hata oluştu.');
      }
    } catch (error) {
      console.error('BMI hesaplama hatası:', error);
      Alert.alert('Hata', 'BMI hesaplanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // BMI risk rengini belirle
  const getBMIRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low risk':
        return 'bg-green-600';
      case 'moderate risk':
        return 'bg-yellow-600';
      case 'high risk':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  // Form bileşeni
  const BMIForm = () => (
    <View className="p-6">
      <Text className="text-white text-2xl font-bold text-center mb-8">BMI Hesapla</Text>
      
      {/* Kilo Input */}
      <View className="mb-6">
        <Text className="text-white text-lg font-semibold mb-2">
          Kilonuz (kg)<Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="bg-neutral-800 text-white p-4 rounded-lg text-lg"
          placeholder="Örn: 70"
          placeholderTextColor="#9ca3af"
          value={formData.weight}
          onChangeText={(value) => updateFormData('weight', value)}
          keyboardType="numeric"
        />
      </View>

      {/* Boy Input */}
      <View className="mb-8">
        <Text className="text-white text-lg font-semibold mb-2">
          Boyunuz (cm)<Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="bg-neutral-800 text-white p-4 rounded-lg text-lg"
          placeholder="Örn: 170"
          placeholderTextColor="#9ca3af"
          value={formData.height}
          onChangeText={(value) => updateFormData('height', value)}
          keyboardType="numeric"
        />
      </View>

      {/* Hesapla Butonu */}
      <TouchableOpacity 
        onPress={calculateBMI}
        disabled={loading}
        className={`p-4 rounded-lg ${loading ? 'bg-gray-600' : 'bg-blue-600'}`}
      >
        {loading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="#ffffff" />
            <Text className="text-white text-lg font-semibold ml-2">Hesaplanıyor...</Text>
          </View>
        ) : (
          <Text className="text-white text-center text-xl font-semibold">BMI Hesapla</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  // Sonuçlar bileşeni
  const ResultsDisplay = () => (
    <View className="p-6">
      <Text className="text-white text-2xl font-bold text-center mb-8">BMI Sonuçlarınız</Text>
      
      {/* BMI Değeri */}
      <View className={`p-6 rounded-xl mb-6 ${getBMIRiskColor(results.risk)}`}>
        <Text className="text-white text-center text-lg font-semibold">BMI Değeriniz</Text>
        <Text className="text-white text-center text-4xl font-bold">{results.bmi}</Text>
        <Text className="text-white text-center text-lg mt-2">{results.risk}</Text>
      </View>

      {/* Detaylar */}
      <View className="bg-neutral-800 rounded-xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">Detaylar</Text>
        
        <View className="mb-4">
          <Text className="text-gray-400 text-sm">Boy</Text>
          <Text className="text-white text-lg">{results.height}</Text>
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-400 text-sm">Kilo</Text>
          <Text className="text-white text-lg">{results.weight}</Text>
        </View>
      </View>

      {/* Özet */}
      <View className="bg-neutral-800 rounded-xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">Değerlendirme</Text>
        <Text className="text-white text-base leading-6 mb-4">{results.summary}</Text>
        
        <Text className="text-gray-400 text-sm font-semibold mb-2">Öneriler:</Text>
        <Text className="text-white text-base leading-6">{results.recommendation}</Text>
      </View>

      {/* Yeniden Hesapla Butonu */}
      <TouchableOpacity 
        onPress={() => setShowResults(false)}
        className="p-4 bg-blue-600 rounded-lg"
      >
        <Text className="text-white text-center text-xl font-semibold">Yeniden Hesapla</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="BMI Hesapla" />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {showResults && results ? <ResultsDisplay /> : <BMIForm />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BMICalculatorScreen; 