import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../services/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../form/FormInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Geçersiz e-posta').required('E-posta gerekli'),
  password: Yup.string().min(8, 'Şifre en az 8 karakter olmalı').required('Şifre gerekli'),
});

const LoginForm = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const result = await login(values.email, values.password);
      
      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        Alert.alert('Hata', result.message || 'Giriş işlemi başarısız oldu');
      }
    } catch (error) {
      let errorMessage = 'Giriş işlemi başarısız oldu';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Hata', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-neutral-900 p-6 rounded-xl w-full">
      <Text className="text-2xl font-bold text-white mb-6">Giriş Yap</Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="w-full">
            <FormInput
              field="email"
              placeholder="E-posta veya kullanıcı adı"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View className="mb-6">
              <FormInput
                field="password"
                placeholder="Şifre"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                secureTextEntry={true}
                marginClass="mb-0"
              />
              <TouchableOpacity 
                className="self-end mt-2" 
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-indigo-400">Şifremi Unuttum?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`py-4 rounded-lg items-center justify-center ${isLoading ? 'bg-indigo-700' : 'bg-indigo-600'}`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-lg">Giriş Yap</Text>
              )}
            </TouchableOpacity>
            
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Hesabınız yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-indigo-400 font-bold">Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm; 