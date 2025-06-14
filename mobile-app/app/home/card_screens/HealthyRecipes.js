import React, { useState, useCallback } from 'react';
import { View, FlatList, SafeAreaView, Alert, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import TopTabNavigator from '../../../components/navigation/TopTabNavigator';
import { RecipeSearchInput, RecipeCard } from '../../../components/recipes';
import { spoonacularApi } from '../../../services/apis/spoonacular-api';

const HealthyRecipesScreen = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);

  // Arama fonksiyonu
  const handleSearch = async (searchParams) => {
    if (!searchParams.query?.trim() || searchParams.query.length < 3) {
      Alert.alert('Uyarı', 'Lütfen en az 3 karakter girin');
      return;
    }

    try {
      setLoading(true);
      setCurrentSearchParams(searchParams);
      
      const response = await spoonacularApi.searchRecipes(searchParams);
      
      if (response?.data?.results) {
        setSearchResults(response.data.results);
        setHasSearched(true);
      } else {
        throw new Error('Arama sonucu bulunamadı');
      }
    } catch (error) {
      console.error('Tarif arama hatası:', error);
      Alert.alert('Hata', 'Tarif arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Yenileme fonksiyonu
  const handleRefresh = useCallback(async () => {
    if (currentSearchParams) {
      setRefreshing(true);
      await handleSearch(currentSearchParams);
      setRefreshing(false);
    }
  }, [currentSearchParams]);

  // Tarif kartına tıklama
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetailScreen', {
      recipe: recipe
    });
  };

  // Benzersiz ID'ler ekle
  const recipesWithIds = searchResults.map((recipe, index) => ({
    ...recipe,
    uniqueId: `recipe-${recipe.id}-${index}`
  }));

  // FlatList item render
  const renderRecipeItem = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={handleRecipePress}
    />
  );

  // Boş liste mesajı
  const renderEmptyState = () => {
    if (loading) return null;
    
    if (!hasSearched) {
      return (
        <View className="flex-1 justify-center items-center p-8">
          <Text className="text-gray-400 text-lg text-center mb-2">
            Sağlıklı Tarif Arama Motoru
          </Text>
          <Text className="text-gray-500 text-center leading-6">
            Yukarıdaki arama çubuğunu kullanarak sağlıklı yemek tariflerini arayabilir ve detaylarını inceleyebilirsiniz.
          </Text>
        </View>
      );
    }
    
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-gray-400 text-lg text-center mb-2">
          Tarif Bulunamadı
        </Text>
        <Text className="text-gray-500 text-center">
          "{currentSearchParams?.query}" için herhangi bir tarif bulunamadı. Farklı anahtar kelimeler deneyin.
        </Text>
      </View>
    );
  };

  const renderSectionHeader = () => {
    if (!hasSearched || searchResults.length === 0) return null;
    
    return (
      <View className="mb-4 px-2">
        <Text className="text-white font-bold text-lg">
          Tarif Sonuçları ({searchResults.length})
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          "{currentSearchParams?.query}" için bulunan tarifler
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
      
      <TopTabNavigator title="Sağlıklı Yemek Tarifleri" />
      
      <View className="flex-1 px-4 pt-4">
        {/* Arama Çubuğu */}
        <RecipeSearchInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="Salata, çorba, sağlıklı... ara"
        />

        {/* Yüklenme Göstergesi */}
        {loading && (
          <View className="py-8">
            <ActivityIndicator size="large" color="#10B981" />
            <Text className="text-white text-center mt-4">Tarifler aranıyor...</Text>
          </View>
        )}

        {/* Sonuçlar Grid Listesi */}
        <FlatList
          data={recipesWithIds}
          renderItem={renderRecipeItem}
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
              colors={['#10B981']}
              tintColor="#10B981"
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

export default HealthyRecipesScreen; 