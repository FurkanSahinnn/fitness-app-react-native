import axios from 'axios';
import { X_RAPIDAPI_KEY } from '@env';

// Spoonacular API base URL
const SPOONACULAR_BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

// Spoonacular API client
const spoonacularClient = axios.create({
  baseURL: SPOONACULAR_BASE_URL,
  timeout: 15000,
  headers: {
    'x-rapidapi-key': X_RAPIDAPI_KEY,
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  },
});

// API request interceptor
spoonacularClient.interceptors.request.use(
  (config) => {
    console.log('Spoonacular API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Spoonacular API Request Error:', error);
    return Promise.reject(error);
  }
);

// API response interceptor
spoonacularClient.interceptors.response.use(
  (response) => {
    console.log('Spoonacular API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Spoonacular API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Spoonacular API functions
export const spoonacularApi = {
  // Complex Search endpoint - Recipe arama
  searchRecipes: ({ query, diet, intolerances, includeIngredients, excludeIngredients }) => 
    spoonacularClient.get('/recipes/complexSearch', {
      params: {
        query,
        ...(diet && { diet }),
        ...(intolerances && { intolerances }),
        ...(includeIngredients && { includeIngredients }),
        ...(excludeIngredients && { excludeIngredients }),
        instructionsRequired: 'true',
        fillIngredients: 'false',
        addRecipeInformation: 'false',
        addRecipeInstructions: 'false',
        addRecipeNutrition: 'false',
        maxReadyTime: '60',
        ignorePantry: 'true',
        sort: 'max-used-ingredients',
        offset: '0',
        number: '20'
      }
    }),

  // Recipe Information endpoint - Detaylı tarif bilgisi
  getRecipeInformation: (recipeId) => 
    spoonacularClient.get(`/recipes/${recipeId}/information`, {
      params: {
        includeNutrition: 'true'
      }
    }),

  // Recipe Instructions endpoint - Tarif adımları
  getRecipeInstructions: (recipeId) => 
    spoonacularClient.get(`/recipes/${recipeId}/analyzedInstructions`)
};

export default spoonacularApi; 