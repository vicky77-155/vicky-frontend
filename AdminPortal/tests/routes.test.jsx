import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AppRoutes from '../src/routes';

// Mock HealthStatusBadge to ensure no async act() warnings occur during route assertions
vi.mock('../src/components/HealthStatusBadge', () => ({
  default: () => <div data-testid="health-status-badge">Healthy</div>,
}));

// Mock health probe as fallback
vi.mock('../src/api/healthApi', () => ({
  default: {
    checkLiveness: vi.fn().mockResolvedValue({ status: 'ok', service: 'vyoma-token-gateway-api' }),
    checkApiHealth: vi.fn().mockResolvedValue({ status: 'ok', service: 'vyoma-token-gateway-api', database: 'connected' }),
    checkReadiness: vi.fn().mockResolvedValue({ status: 'ready', database: 'connected' }),
  },
}));

describe('Admin Portal Route Rendering', () => {
  it('renders login page on /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Admin Sign In/i })).toBeInTheDocument();
  });

  it('renders dashboard on /admin', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Platform Overview/i })).toBeInTheDocument();
  });

  it('renders tenants page on /admin/tenants', () => {
    render(
      <MemoryRouter initialEntries={['/admin/tenants']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Tenant Management/i })).toBeInTheDocument();
  });

  it('renders token pool page on /admin/token-pool', () => {
    render(
      <MemoryRouter initialEntries={['/admin/token-pool']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Shared Token Pool Management/i })).toBeInTheDocument();
  });

  it('renders models page on /admin/models as Model Registry', () => {
    render(
      <MemoryRouter initialEntries={['/admin/models']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /AI Model Registry/i })).toBeInTheDocument();
  });

  it('renders playground on /admin/playground with Bedrock layout and without System Instructions', () => {
    render(
      <MemoryRouter initialEntries={['/admin/playground']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /AI Model Playground/i })).toBeInTheDocument();
    expect(screen.queryByText(/System Instructions/i)).not.toBeInTheDocument();
  });

  it('renders API keys on /admin/api-keys', () => {
    render(
      <MemoryRouter initialEntries={['/admin/api-keys']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Platform API Keys/i })).toBeInTheDocument();
  });

  it('renders usage on /admin/usage', () => {
    render(
      <MemoryRouter initialEntries={['/admin/usage']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Usage & Metering/i })).toBeInTheDocument();
  });

  it('renders billing on /admin/billing', () => {
    render(
      <MemoryRouter initialEntries={['/admin/billing']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Financial & Billing Management/i })).toBeInTheDocument();
  });

  it('renders provider costs on /admin/billing/provider-costs', () => {
    render(
      <MemoryRouter initialEntries={['/admin/billing/provider-costs']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /AI Provider Cost Management/i })).toBeInTheDocument();
  });

  it('renders customer pricing on /admin/billing/customer-pricing', () => {
    render(
      <MemoryRouter initialEntries={['/admin/billing/customer-pricing']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Customer Pricing & Rate Schedules/i })).toBeInTheDocument();
  });

  it('renders invoices on /admin/billing/invoices', () => {
    render(
      <MemoryRouter initialEntries={['/admin/billing/invoices']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Customer Invoices & Billing Statements/i })).toBeInTheDocument();
  });

  it('renders settings on /admin/settings', () => {
    render(
      <MemoryRouter initialEntries={['/admin/settings']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Platform Settings/i })).toBeInTheDocument();
  });

  it('renders audit logs on /admin/audit-logs', () => {
    render(
      <MemoryRouter initialEntries={['/admin/audit-logs']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /System Audit & Governance Logs/i })).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-admin-page']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
  });
});
