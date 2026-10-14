import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Building } from 'lucide-react';
import HealthStatusBadge from './HealthStatusBadge';

const routeTitleMap = {
  '/tenant': 'Dashboard',
  '/tenant/playground': 'AI Playground',
  '/tenant/api-keys': 'API Keys & Access',
  '/tenant/usage': 'Usage & Quotas',
  '/tenant/billing': 'Billing & Plan',
  '/tenant/settings': 'Organization Settings',
};

export const TenantHeader = () => {
  const location = useLocation();
  const currentTitle = routeTitleMap[location.pathname] || 'Tenant Workspace';

  return (
    <header className="tenant-header">
      {/* Breadcrumb Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Workspace</span>
        <ChevronRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentTitle}</span>
      </div>

      {/* Header Badges & Health Probe */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          className="badge badge-neutral"
          style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <Building size={12} color="var(--primary)" />
          <span>Workspace Active</span>
        </div>

        <HealthStatusBadge showDetails={false} />
      </div>
    </header>
  );
};

export default TenantHeader;
