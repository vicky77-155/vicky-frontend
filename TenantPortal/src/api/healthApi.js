import apiClient from './client';

export const healthApi = {
  async checkLiveness() {
    const response = await apiClient.get('/health');
    return response.data;
  },

  async checkApiHealth() {
    const response = await apiClient.get('/api/v1/health');
    return response.data;
  },

  async checkReadiness() {
    const response = await apiClient.get('/api/v1/health/ready');
    return response.data;
  },
};

export default healthApi;
