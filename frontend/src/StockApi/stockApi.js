// frontend/src/api/stockApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/assets';

export const getAssets = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};


// Fetch chart data for a specific asset symbol
export const getChartData = async (symbol) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};
