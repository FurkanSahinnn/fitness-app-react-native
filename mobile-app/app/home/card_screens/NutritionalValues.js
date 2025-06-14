import React, { useState, useCallback } from 'react';
import { View, FlatList, SafeAreaView, Alert, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';
import { FoodSearchInput, FoodCard } from '../../../components/nutrition';
import { nutritionixApi } from '../../../services/apis/nutritionix-api';

const NutritionalValuesScreen = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState({ common: [], branded: [] });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  // Arama fonksiyonu
  const handleSearch = async (query) => {
    if (!query.trim() || query.length < 3) {
      Alert.alert('Uyarı', 'Lütfen en az 3 karakter girin');
      return;
    }

    try {
      setLoading(true);
      setCurrentQuery(query);
      
      const response = await nutritionixApi.searchInstant(query);
      
      if (response?.data) {
        setSearchResults({
          common: response.data.common || [],
          branded: response.data.branded || []
        });
        setHasSearched(true);
      } else {
        throw new Error('Arama sonucu bulunamadı');
      }
    } catch (error) {
      console.error('Arama hatası:', error);
      Alert.alert('Hata', 'Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      setSearchResults({ common: [], branded: [] });
    } finally {
      setLoading(false);
    }
  };

  // Yenileme fonksiyonu
  const handleRefresh = useCallback(async () => {
    if (currentQuery) {
      setRefreshing(true);
      await handleSearch(currentQuery);
      setRefreshing(false);
    }
  }, [currentQuery]);

  // Yiyecek kartına tıklama
  const handleFoodPress = (food, type) => {
    navigation.navigate('FoodDetailScreen', {
      food: food,
      foodType: type
    });
  };

  // Tüm sonuçları birleştir ve benzersiz ID'ler ekle
  const allFoods = [
    ...searchResults.common.map((food, index) => ({ 
      ...food, 
      type: 'common',
      uniqueId: `common-${index}-${food.tag_id || food.food_name?.replace(/\s+/g, '-') || Math.random()}`
    })),
    ...searchResults.branded.map((food, index) => ({ 
      ...food, 
      type: 'branded',
      uniqueId: `branded-${index}-${food.nix_item_id || food.food_name?.replace(/\s+/g, '-') || Math.random()}`
    }))
  ];

  // FlatList item render
  const renderFoodItem = ({ item }) => (
    <FoodCard
      food={item}
      type={item.type}
      onPress={(food) => handleFoodPress(food, item.type)}
    />
  );

  // Grid için boş item separator
  const renderItemSeparator = () => <View style={{ width: 16 }} />;

  // Boş liste mesajı
  const renderEmptyState = () => {
    if (loading) return null;
    
    if (!hasSearched) {
      return (
        <View className="flex-1 justify-center items-center p-8">
          <Text className="text-gray-400 text-lg text-center mb-2">
            Yiyecek Arama Motoru
          </Text>
          <Text className="text-gray-500 text-center leading-6">
            Yukarıdaki arama çubuğunu kullanarak yiyecekleri arayabilir ve besin değerlerini inceleyebilirsiniz.
          </Text>
        </View>
      );
    }
    
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-gray-400 text-lg text-center mb-2">
          Sonuç Bulunamadı
        </Text>
        <Text className="text-gray-500 text-center">
          "{currentQuery}" için herhangi bir yiyecek bulunamadı. Farklı anahtar kelimeler deneyin.
        </Text>
      </View>
    );
  };

  const renderSectionHeader = () => {
    if (!hasSearched || allFoods.length === 0) return null;
    
    return (
      <View className="mb-4 px-2">
        <Text className="text-white font-bold text-lg">
          Arama Sonuçları ({allFoods.length})
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          "{currentQuery}" için bulunan yiyecekler
        </Text>
      </View>
    );
  };

  // Ekran odaklandığında çağrılır
  useFocusEffect(
    useCallback(() => {
      // Navigation state temizleme veya güncelleme burada yapılabilir
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Yiyecek Besin Değerleri" />
      
      <View className="flex-1 px-4 pt-4">
        {/* Arama Çubuğu */}
        <FoodSearchInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="Hamburger, elma, süt... ara"
        />

        {/* Yüklenme Göstergesi */}
        {loading && (
          <View className="py-8">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-white text-center mt-4">Aranıyor...</Text>
          </View>
        )}

        {/* Sonuçlar Grid Listesi */}
        <FlatList
          data={allFoods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.uniqueId}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          ListHeaderComponent={renderSectionHeader}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#3B82F6']}
              tintColor="#3B82F6"
            />
          }
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            paddingHorizontal: 2
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NutritionalValuesScreen; 