import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SignUpForm from '../../components/auth/SignUpForm';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="absolute left-6 top-12 z-10"
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center p-6">
            <View className="w-full max-w-sm items-center mb-8">
              <Image
                source={require('../../assets/icons/logo.png')}
                className="w-24 h-24 mb-4"
                resizeMode="contain"
              />
              <Text className="text-white text-3xl font-bold">FitnessApp</Text>
              <Text className="text-gray-400 text-center mt-2">
                Kişisel fitness yolculuğunuza bugün başlayın
              </Text>
            </View>
            
            <SignUpForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen; 