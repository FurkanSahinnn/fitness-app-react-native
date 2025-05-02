import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './services/auth/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './app/login';
import SignUpScreen from './app/signup';
import MainTabs from './app/MainTabs';
import ExercisesScreen from './app/home/card_screens/Exercises';
import CalorieCalculatorScreen from './app/home/card_screens/CalorieCalculator';
import BMICalculatorScreen from './app/home/card_screens/BMICalculator';
import SupplementInfoScreen from './app/home/card_screens/SupplementInfo';
import HealthyRecipesScreen from './app/home/card_screens/HealthyRecipes';
import NutritionalValuesScreen from './app/home/card_screens/NutritionalValues';
import "./global.css";
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0a0a0a' }
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Exercises" component={ExercisesScreen} />
            <Stack.Screen name="CalorieCalculator" component={CalorieCalculatorScreen} />
            <Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
            <Stack.Screen name="SupplementInfo" component={SupplementInfoScreen} />
            <Stack.Screen name="HealthyRecipes" component={HealthyRecipesScreen} />
            <Stack.Screen name="NutritionalValues" component={NutritionalValuesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
