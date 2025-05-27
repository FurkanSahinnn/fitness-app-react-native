import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import TopTabNavigator from '../../../../components/navigation/TopTabNavigator';
import SupplementCard from '../../../../components/home/SupplementCard';
import supplementsData from '../../../../assets/supplements.json';

const SupplementInfoScreen = () => {
  const navigation = useNavigation();
  
  const handleSupplementPress = (supplement) => {
    navigation.navigate('SupplementDetail', { supplement });
  };

  const renderSupplementCard = ({ item }) => (
    <SupplementCard 
      supplement={item} 
      onPress={handleSupplementPress}
    />
  );
  
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      
      <TopTabNavigator title="Supplement Bilgileri" />
      
      <View className="flex-1">
        <FlatList
          data={supplementsData}
          renderItem={renderSupplementCard}
          keyExtractor={(item, index) => index.toString()}
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

export default SupplementInfoScreen; 