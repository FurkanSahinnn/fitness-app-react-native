import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apis } from '../apis';

// Context oluştur
const AuthContext = createContext();

// Context provider bileşeni
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Uygulama başlatıldığında token kontrolü yap
  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
          // Token varsa kullanıcı bilgilerini çek
          try {
            // JWT token'ı çözümle (React Native uyumlu)
            const base64Url = savedToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
            const decoded = JSON.parse(jsonPayload);
            
            // Çözümlenen bilgileri user state'ine kaydet
            if (decoded.id && decoded.email) {
              setUser({
                id: decoded.id,
                email: decoded.email,
                name: decoded.name || decoded.email.split('@')[0]  // Email'den kullanıcı adı oluştur
              });
            }
          } catch (decodeError) {
            console.error('Token çözümlenirken hata:', decodeError);
          }
        }
      } catch (error) {
        console.error('Token yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // Giriş yap fonksiyonu
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apis.login({ email, password });
      
      if (response.data && response.data.data) {
        // Token'ı sakla
        const userToken = response.data.data.token;
        setToken(userToken);
        await AsyncStorage.setItem('token', userToken);
        
        // Kullanıcı bilgilerini state'e kaydet
        const userData = response.data.data.user;
        setUser(userData || { 
          email,
          name: email.split('@')[0] // Kullanıcı adı yoksa email'den oluştur
        });
        
        return { success: true };
      }
      return { success: false, message: 'Giriş başarısız' };
    } catch (error) {
      let errorMessage = 'Giriş işlemi başarısız oldu';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Kayıt ol fonksiyonu
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await apis.signup({ name, email, password });
      
      if (response.data && response.data.data) {
        return { success: true, message: 'Kayıt başarılı' };
      }
      return { success: false, message: 'Kayıt başarısız' };
    } catch (error) {
      let errorMessage = 'Kayıt işlemi başarısız oldu';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yap fonksiyonu
  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Çıkış yaparken hata:', error);
      return { success: false, message: 'Çıkış yaparken hata oluştu' };
    } finally {
      setLoading(false);
    }
  };

  // Auth durumunu kontrol et
  const isAuthenticated = () => {
    return !!token;
  };

  const authContextValue = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook olarak kullanım için
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 