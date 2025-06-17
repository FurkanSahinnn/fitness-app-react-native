import axios from 'axios';
import { NUTRITIONIX_ID, NUTRITIONIX_KEY } from '@env';

// Nutritionix API base URL
const NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';

// Nutritionix API client
const nutritionixClient = axios.create({
  baseURL: NUTRITIONIX_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-app-id': NUTRITIONIX_ID,
    'x-app-key': NUTRITIONIX_KEY,
  },
});

// API request interceptor
nutritionixClient.interceptors.request.use(
  (config) => {
    console.log('Nutritionix API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Nutritionix API Request Error:', error);
    return Promise.reject(error);
  }
);

// API response interceptor
nutritionixClient.interceptors.response.use(
  (response) => {
    console.log('Nutritionix API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Nutritionix API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Nutritionix API functions
export const nutritionixApi = {
  // Search/Instant endpoint - Autocomplete için
  searchInstant: (query) => 
    nutritionixClient.get('/search/instant', {
      params: {
        query,
        branded: true,
        common: true,
        detailed: true
      }
    }),

  // Search/Item endpoint - Detailed nutrition info için
  searchItem: (nixItemId) => 
    nutritionixClient.get('/search/item', {
      params: {
        nix_item_id: nixItemId
      }
    }),

  // Natural/Nutrients endpoint - Common foods için (opsiyonel)
  naturalNutrients: (query) => 
    nutritionixClient.post('/natural/nutrients', {
      query
    })
};

export default nutritionixApi; 