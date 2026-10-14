import apiClient from './client';

/**
 * Usage and Metering API Client
 *
 * Prepared for live FastAPI gateway usage aggregation and Prometheus/Grafana adapter endpoints.
 * Handles graceful fallbacks when endpoints are pending backend provisioning.
 */
export const usageApi = {
  /**
   * Fetch aggregated usage metrics summary across the platform
   * @param {Object} params - { timeRange: '1h' | '24h' | '7d' | '30d', tenantId, modelId }
   */
  async getUsageSummary(params = {}) {
    const response = await apiClient.get('/api/v1/usage/summary', { params });
    return response.data;
  },

  /**
   * Fetch time-series consumption data for charts (token trends, traffic, latency)
   * @param {Object} params - { timeRange: '1h' | '24h' | '7d' | '30d', resolution: 'hourly' | 'daily' }
   */
  async getTimeSeries(params = {}) {
    const response = await apiClient.get('/api/v1/usage/timeseries', { params });
    return response.data;
  },

  /**
   * Fetch tenant usage aggregation table
   * @param {Object} params - { page, limit, search, tenantId, provider, model }
   */
  async getTenantUsage(params = {}) {
    const response = await apiClient.get('/api/v1/usage/tenants', { params });
    return response.data;
  },

  /**
   * Fetch granular request invocation records
   * @param {Object} params - { page, limit, search, status, provider, model, sortBy, sortOrder }
   */
  async getDetailedRecords(params = {}) {
    const response = await apiClient.get('/api/v1/usage/records', { params });
    return response.data;
  },
};

export default usageApi;
