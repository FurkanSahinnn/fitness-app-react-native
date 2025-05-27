import { RAPID_URL, X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from '@env';

// Exercise DB API yapılandırması - fetch kullanarak dokümantasyon örneğine uygun

const fetchWithOptions = async (endpoint) => {
  const url = `${RAPID_URL}${endpoint}`;
  
  console.log('Fetch Request:', {
    url,
    headers: {
      'x-rapidapi-key': X_RAPIDAPI_KEY,
      'x-rapidapi-host': X_RAPIDAPI_HOST
    }
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': X_RAPIDAPI_HOST
      }
    });

    console.log('Fetch Response Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetch Response Data:', data);
    
    return { data };
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const exerciseApi = {
  // Vücut bölgesi listesini getirir
  getBodyPartList: () => 
    fetchWithOptions('/exercises/bodyPartList'),
  
  // Belirli bir vücut bölgesi için egzersizleri getirir
  getExercisesByBodyPart: (bodyPart) => 
    fetchWithOptions(`/exercises/bodyPart/${bodyPart}`),
  
  // Egzersiz detayını getirir
  getExerciseById: (id) => 
    fetchWithOptions(`/exercises/exercise/${id}`),
};

export default exerciseApi; 