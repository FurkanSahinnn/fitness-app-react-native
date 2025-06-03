import axiosClient from './axios-client';
import { RAPID_URL, X_RAPIDAPI_KEY } from '@env';

// Exercise DB API yapılandırması - axios kullanarak

const exerciseAxiosClient = axiosClient.create({
  baseURL: RAPID_URL,
  headers: {
    'x-rapidapi-key': X_RAPIDAPI_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
});

const fetchWithAxios = async (endpoint) => {
  try {
    const response = await exerciseAxiosClient.get(endpoint);
    
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error.response ? error.response : error.message);
    throw error;
  }
};

export const exerciseApi = {
  // Vücut bölgesi listesini getirir
  getBodyPartList: () => 
    fetchWithAxios('/exercises/bodyPartList'),
  
  // Belirli bir vücut bölgesi için egzersizleri getirir
  getExercisesByBodyPart: (bodyPart) => {
    // Shoulder için özel mapping
    const apiBodyPart = bodyPart === 'shoulder' ? 'shoulders' : bodyPart;
    return fetchWithAxios(`/exercises/bodyPart/${apiBodyPart}`);
  },
  
  // Egzersiz detayını getirir
  getExerciseById: (id) => 
    fetchWithAxios(`/exercises/exercise/${id}`),
};

export default exerciseApi; 