import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HealthStatusBadge from '../src/components/HealthStatusBadge';
import healthApi from '../src/api/healthApi';

vi.mock('../src/api/healthApi');

describe('Tenant HealthStatusBadge Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays probing state initially', () => {
    healthApi.checkLiveness.mockImplementation(() => new Promise(() => {}));
    render(<HealthStatusBadge />);
    expect(screen.getByText(/Probing Gateway.../i)).toBeInTheDocument();
  });

  it('displays connected state when backend responds ok', async () => {
    healthApi.checkLiveness.mockResolvedValueOnce({ status: 'ok', service: 'vyoma-token-gateway-api' });
    healthApi.checkApiHealth.mockResolvedValueOnce({ status: 'ok', database: 'connected' });

    render(<HealthStatusBadge />);

    await waitFor(() => {
      expect(screen.getByText(/Gateway Online/i)).toBeInTheDocument();
    });
  });

  it('displays offline state when backend probe fails', async () => {
    healthApi.checkLiveness.mockRejectedValueOnce(new Error('Network Error'));

    render(<HealthStatusBadge />);

    await waitFor(() => {
      expect(screen.getByText(/Gateway Offline/i)).toBeInTheDocument();
    });
  });

  it('handles retry button click', async () => {
    healthApi.checkLiveness.mockRejectedValueOnce(new Error('Network Error'));
    render(<HealthStatusBadge />);

    await waitFor(() => {
      expect(screen.getByText(/Gateway Offline/i)).toBeInTheDocument();
    });

    healthApi.checkLiveness.mockResolvedValueOnce({ status: 'ok', service: 'vyoma-token-gateway-api' });
    healthApi.checkApiHealth.mockResolvedValueOnce({ status: 'ok', database: 'connected' });

    const retryBtn = screen.getByRole('button', { name: /Refresh gateway health/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByText(/Gateway Online/i)).toBeInTheDocument();
    });
  });
});
