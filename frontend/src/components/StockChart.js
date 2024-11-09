// frontend/src/api/stockApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAssets = async () => {
  const response = await axios.get(`${API_BASE_URL}/assets`);
  return response.data;
};

export const getChartData = async (symbol) => {
  const response = await axios.get(`${API_BASE_URL}/chart`, { params: { symbol } });
  return response.data;
};


