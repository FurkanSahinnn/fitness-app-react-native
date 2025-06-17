import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IP_ADDRESS } from '@env';

const baseURL = `http://${IP_ADDRESS}:3000/api`;
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte token ekler
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Token alınırken hata oluştu:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - 401 hatası durumunda token'ı siler
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token geçersiz veya süresi dolmuş
      try {
        await AsyncStorage.removeItem('token');
      } catch (storageError) {
        console.error('Token silinirken hata:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient; 