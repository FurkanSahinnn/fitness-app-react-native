import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipeSearchInput = ({ onSearch, placeholder = "Tarif ara...", loading = false }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    diet: '',
    intolerances: '',
    includeIngredients: '',
    excludeIngredients: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  // Diyet seçenekleri
  const dietOptions = [
    { value: '', label: 'Herhangi' },
    { value: 'vegetarian', label: 'Vejetaryen' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'ketogenic', label: 'Ketojenik' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'gluten free', label: 'Glütensiz' },
    { value: 'dairy free', label: 'Sütsüz' }
  ];

  // Alerjiler/Hoşgörmeme seçenekleri
  const intoleranceOptions = [
    { value: '', label: 'Yok' },
    { value: 'gluten', label: 'Glüten' },
    { value: 'dairy', label: 'Süt Ürünleri' },
    { value: 'egg', label: 'Yumurta' },
    { value: 'peanut', label: 'Fıstık' },
    { value: 'tree nut', label: 'Sert Kabuklu' },
    { value: 'soy', label: 'Soya' },
    { value: 'seafood', label: 'Deniz Ürünleri' }
  ];

  const handleSearch = () => {
    if (searchParams.query.trim() && onSearch) {
      onSearch(searchParams);
    }
  };

  const handleClear = () => {
    setSearchParams({
      query: '',
      diet: '',
      intolerances: '',
      includeIngredients: '',
      excludeIngredients: ''
    });
    inputRef.current?.focus();
  };

  const updateParam = (key, value) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <View className="mb-4">
      {/* Ana Arama Çubuğu */}
      <View className="flex-row items-center bg-neutral-800 rounded-xl p-3 mb-3">
        <View className="flex-1 flex-row items-center">
          <Ionicons name="search" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={searchParams.query}
            onChangeText={(text) => updateParam('query', text)}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            className="flex-1 text-white text-base"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchParams.query.length > 0 && (
            <TouchableOpacity onPress={handleClear} className="ml-2">
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading || !searchParams.query.trim()}
          className={`ml-3 px-4 py-2 rounded-lg ${
            loading || !searchParams.query.trim() 
              ? 'bg-neutral-700' 
              : 'bg-green-600'
          }`}
        >
          {loading ? (
            <Text className="text-neutral-400 font-medium">Arıyor...</Text>
          ) : (
            <Text className="text-white font-medium">Ara</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Gelişmiş Arama Butonu */}
      <TouchableOpacity
        onPress={() => setShowAdvanced(true)}
        className="flex-row items-center justify-center bg-neutral-700 rounded-lg p-3"
      >
        <Ionicons name="options" size={18} color="#9CA3AF" />
        <Text className="text-gray-300 ml-2 font-medium">Gelişmiş Arama</Text>
      </TouchableOpacity>

      {/* Gelişmiş Arama Modal */}
      <Modal
        visible={showAdvanced}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAdvanced(false)}
      >
        <View className="flex-1 bg-neutral-950">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 pt-12 bg-neutral-900">
            <TouchableOpacity onPress={() => setShowAdvanced(false)}>
              <Text className="text-blue-400 text-lg">İptal</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Gelişmiş Arama</Text>
            <TouchableOpacity onPress={() => setShowAdvanced(false)}>
              <Text className="text-green-400 text-lg font-semibold">Tamam</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* Diyet */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">Diyet Tercihi</Text>
              <View className="flex-row flex-wrap">
                {dietOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => updateParam('diet', option.value)}
                    className={`mr-2 mb-2 px-3 py-2 rounded-lg border ${
                      searchParams.diet === option.value
                        ? 'bg-green-600 border-green-600'
                        : 'bg-neutral-800 border-neutral-600'
                    }`}
                  >
                    <Text className={`${
                      searchParams.diet === option.value ? 'text-white' : 'text-gray-300'
                    }`}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Alerjiler */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">Alerjiler / Hoşgörmeme</Text>
              <View className="flex-row flex-wrap">
                {intoleranceOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => updateParam('intolerances', option.value)}
                    className={`mr-2 mb-2 px-3 py-2 rounded-lg border ${
                      searchParams.intolerances === option.value
                        ? 'bg-red-600 border-red-600'
                        : 'bg-neutral-800 border-neutral-600'
                    }`}
                  >
                    <Text className={`${
                      searchParams.intolerances === option.value ? 'text-white' : 'text-gray-300'
                    }`}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* İçermesi Gereken Malzemeler */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">İçermesi Gereken Malzemeler</Text>
              <TextInput
                placeholder="Örn: peynir, fındık (virgülle ayırın)"
                placeholderTextColor="#9CA3AF"
                value={searchParams.includeIngredients}
                onChangeText={(text) => updateParam('includeIngredients', text)}
                className="bg-neutral-800 text-white p-4 rounded-lg"
                multiline
              />
            </View>

            {/* İçermemesi Gereken Malzemeler */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">İçermemesi Gereken Malzemeler</Text>
              <TextInput
                placeholder="Örn: yumurta, süt (virgülle ayırın)"
                placeholderTextColor="#9CA3AF"
                value={searchParams.excludeIngredients}
                onChangeText={(text) => updateParam('excludeIngredients', text)}
                className="bg-neutral-800 text-white p-4 rounded-lg"
                multiline
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default RecipeSearchInput; 