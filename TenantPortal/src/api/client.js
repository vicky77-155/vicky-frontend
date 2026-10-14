import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.warn(`[Tenant API Error] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.warn('[Tenant API Network Error] Backend server unreachable at:', baseURL);
    } else {
      console.warn('[Tenant API Setup Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
