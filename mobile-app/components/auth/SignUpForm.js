import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apis } from '../../services/apis';
import FormInput from '../form/FormInput';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Ad-Soyad gerekli'),
  email: Yup.string().email('Geçersiz e-posta').required('E-posta gerekli'),
  password: Yup.string().min(8, 'Şifre en az 8 karakter olmalı').required('Şifre gerekli'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı gerekli'),
});

const SignUpForm = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      const response = await apis.signup({
        name: values.name,
        email: values.email,
        password: values.password
      });
      
      if (response.data && response.data.data) {
        Alert.alert(
          'Başarılı',
          'Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.',
          [
            { 
              text: 'Tamam', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      }
    } catch (error) {
      let errorMessage = 'Kayıt işlemi başarısız oldu';
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
      <Text className="text-2xl font-bold text-white mb-6">Hesap Oluştur</Text>
      
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="w-full">
            <FormInput
              field="name"
              placeholder="Ad Soyad"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />

            <FormInput
              field="email"
              placeholder="E-posta"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              field="password"
              placeholder="Şifre"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              secureTextEntry={true}
            />

            <FormInput
              field="confirmPassword"
              placeholder="Şifre Tekrar"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              secureTextEntry={true}
              marginClass="mb-6"
            />

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`py-4 rounded-lg items-center justify-center ${isLoading ? 'bg-indigo-700' : 'bg-indigo-600'}`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-lg">Kayıt Ol</Text>
              )}
            </TouchableOpacity>
            
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Zaten bir hesabınız var mı? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-indigo-400 font-bold">Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm; 