// // frontend/src/api/stockApi.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';  // Update to match FastAPI base URL

// // Fetch assets from the backend
// export const getAssets = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/assets`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching assets:', error);
//     throw error;
//   }
// };

// // Fetch chart data for a specific asset symbol
// export const getChartData = async (symbol) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/chart/${symbol}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching chart data:', error);
//     throw error;
//   }
// };
