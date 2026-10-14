import apiClient from './client';

export const healthApi = {
  /**
   * Check root service liveness probe (independent of DB)
   */
  async checkLiveness() {
    const response = await apiClient.get('/health');
    return response.data;
  },

  /**
   * Check versioned API health information
   */
  async checkApiHealth() {
    const response = await apiClient.get('/api/v1/health');
    return response.data;
  },

  /**
   * Check full system readiness probe (including DB connectivity)
   */
  async checkReadiness() {
    const response = await apiClient.get('/api/v1/health/ready');
    return response.data;
  },
};

export default healthApi;
