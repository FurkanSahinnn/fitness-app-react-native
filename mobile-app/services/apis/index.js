import axiosClient from './axios-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API istekleri için fonksiyonlar
export const apis = {
  login: ({ email, password }) => 
    axiosClient.post('/login', { email, password }),
  
  signup: ({ name, email, password }) => 
    axiosClient.post('/register', { name, email, password }),
  
  getAllUsers: () => 
    axiosClient.get('/user'),
  
  getUserById: (id) => 
    axiosClient.get(`/user/${id}`),
  
  updateUser: (id, { name, email }) => 
    axiosClient.put(`/user/${id}`, { name, email }),
  
  deleteUser: (id) => 
    axiosClient.delete(`/user/${id}`),
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
      return { success: false, error };
    }
  },
  
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token;
    } catch (error) {
      console.error('Token kontrolü yapılırken hata:', error);
      return false;
    }
  },

  // AI Chat ile ilgili istekler
  sendAIMessage: (message) => 
    axiosClient.post('/aichat', { message }),
  
  getAIChatHistory: () => 
    axiosClient.get('/aichat/history')
};

export default apis; 