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
    // Graceful error logging without crashing application
    if (error.response) {
      console.warn(`[API Response Error] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.warn('[API Network Error] Backend server unreachable at:', baseURL);
    } else {
      console.warn('[API Setup Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
