import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginForm from '../../components/auth/LoginForm';

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar style="light" />
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
                Fitness hedeflerinize ulaşmak için giriş yapın
              </Text>
            </View>
            
            <LoginForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen; 