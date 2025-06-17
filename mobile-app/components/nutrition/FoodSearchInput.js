import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoodSearchInput = ({ onSearch, placeholder = "Yiyecek ara...", loading = false }) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (searchText.trim() && onSearch) {
      onSearch(searchText.trim());
    }
  };

  const handleClear = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  return (
    <View className="flex-row items-center bg-neutral-800 rounded-xl p-3 mb-4">
      <View className="flex-1 flex-row items-center">
        <Ionicons name="search" size={20} color="#9CA3AF" className="mr-3" />
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          className="flex-1 text-white text-base"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="ml-2">
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        onPress={handleSearch}
        disabled={loading || !searchText.trim()}
        className={`ml-3 px-4 py-2 rounded-lg ${
          loading || !searchText.trim() 
            ? 'bg-neutral-700' 
            : 'bg-blue-600'
        }`}
      >
        {loading ? (
          <Text className="text-neutral-400 font-medium">Arıyor...</Text>
        ) : (
          <Text className="text-white font-medium">Ara</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FoodSearchInput; 