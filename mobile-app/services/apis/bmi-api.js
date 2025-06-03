import axiosClient from './axios-client';
import { X_RAPIDAPI_KEY } from '@env';

// BMI Calculator API yapılandırması - axios kullanarak

const bmiAxiosClient = axiosClient.create({
  baseURL: 'https://bmi-calculator-api-apiverve.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': X_RAPIDAPI_KEY,
    'x-rapidapi-host': 'bmi-calculator-api-apiverve.p.rapidapi.com',
    'Accept': 'application/json'
  }
});

const fetchBMI = async (weight, height) => {
  try {
    const response = await bmiAxiosClient.get('/v1/bmicalculator', {
      params: {
        weight: weight.toString(),
        height: height.toString(),
        unit: 'metric'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('BMI API Error:', error.response ? error.response : error.message);
    throw error;
  }
};

export const bmiApi = {
  // BMI hesaplama
  calculateBMI: (weight, height) => fetchBMI(weight, height),
};

export default bmiApi; 