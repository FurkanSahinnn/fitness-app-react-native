import React from 'react';
import { View, Text, TextInput } from 'react-native';

/**
 * Generic form input bileşeni
 * @param {Object} props - Bileşen props'ları
 * @param {string} props.field - Formik field adı
 * @param {string} props.placeholder - Input placeholder metni
 * @param {function} props.handleChange - Formik handleChange fonksiyonu
 * @param {function} props.handleBlur - Formik handleBlur fonksiyonu
 * @param {Object} props.values - Formik values objesi
 * @param {Object} props.errors - Formik errors objesi
 * @param {Object} props.touched - Formik touched objesi
 * @param {string} props.keyboardType - Klavye tipi (opsiyonel)
 * @param {boolean} props.secureTextEntry - Şifre girişi mi? (opsiyonel)
 * @param {string} props.autoCapitalize - Auto capitalize özelliği (opsiyonel)
 * @param {string} props.className - Ek stil sınıfları (opsiyonel)
 * @param {string} props.marginClass - Kenar boşluğu sınıfı (opsiyonel, varsayılan: "mb-4")
 */
const FormInput = ({
  field,
  placeholder,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  className = '',
  marginClass = 'mb-4'
}) => {
  return (
    <View className={marginClass}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
        value={values[field]}
        className={`bg-neutral-800 text-white p-4 rounded-lg w-full ${className}`}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
      {touched[field] && errors[field] && (
        <Text className="text-red-500 mt-1">{errors[field]}</Text>
      )}
    </View>
  );
};

export default FormInput; 