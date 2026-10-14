import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AppRoutes from '../src/routes';

// Mock HealthStatusBadge to ensure no async act() warnings occur during route assertions
vi.mock('../src/components/HealthStatusBadge', () => ({
  default: () => <div data-testid="health-status-badge">Healthy</div>,
}));

vi.mock('../src/api/healthApi', () => ({
  default: {
    checkLiveness: vi.fn().mockResolvedValue({ status: 'ok', service: 'vyoma-token-gateway-api' }),
    checkApiHealth: vi.fn().mockResolvedValue({ status: 'ok', service: 'vyoma-token-gateway-api', database: 'connected' }),
    checkReadiness: vi.fn().mockResolvedValue({ status: 'ready', database: 'connected' }),
  },
}));

describe('Tenant Portal Route Rendering', () => {
  it('renders login page on /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Organization Sign In/i })).toBeInTheDocument();
  });

  it('renders dashboard on /tenant', () => {
    render(
      <MemoryRouter initialEntries={['/tenant']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Tenant Workspace/i })).toBeInTheDocument();
  });

  it('renders projects on /tenant/projects', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/projects']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Workspace Projects/i })).toBeInTheDocument();
  });

  it('renders playground on /tenant/playground without System Instructions', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/playground']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Tenant AI Playground/i })).toBeInTheDocument();
    expect(screen.queryByText(/System Instructions/i)).not.toBeInTheDocument();
  });

  it('renders API keys on /tenant/api-keys', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/api-keys']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /API Keys & Authentication/i })).toBeInTheDocument();
  });

  it('renders quotas on /tenant/quotas', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/quotas']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Token Quota Management/i })).toBeInTheDocument();
  });

  it('renders usage on /tenant/usage', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/usage']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Usage & Quota Consumption/i })).toBeInTheDocument();
  });

  it('renders users on /tenant/users', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/users']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Organization Team Members/i })).toBeInTheDocument();
  });

  it('renders billing on /tenant/billing', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/billing']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Organization Billing & Invoices/i })).toBeInTheDocument();
  });

  it('renders settings on /tenant/settings', () => {
    render(
      <MemoryRouter initialEntries={['/tenant/settings']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Organization Settings/i })).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-tenant-page']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
  });
});
