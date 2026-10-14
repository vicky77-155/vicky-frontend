import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import HealthStatusBadge from './HealthStatusBadge';

const routeTitleMap = {
  '/admin': 'Dashboard',
  '/admin/tenants': 'Tenant Management',
  '/admin/token-pool': 'Shared Token Pool',
  '/admin/models': 'AI Model Catalog',
  '/admin/playground': 'AI Gateway Playground',
  '/admin/api-keys': 'Platform API Keys',
  '/admin/usage': 'Usage & Metering',
  '/admin/billing': 'Provider Costs & Invoicing',
  '/admin/settings': 'Platform Settings',
};

export const Header = () => {
  const location = useLocation();
  const currentTitle = routeTitleMap[location.pathname] || 'Admin Console';

  return (
    <header className="console-header">
      {/* Breadcrumb Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Console</span>
        <ChevronRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentTitle}</span>
      </div>

      {/* Header Actions & Health Monitoring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Environment Badge */}
        <div
          className="badge badge-neutral"
          style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <ShieldCheck size={12} color="var(--primary)" />
          <span>Platform Active</span>
        </div>

        {/* Real Backend Connectivity Indicator */}
        <HealthStatusBadge showDetails={false} />
      </div>
    </header>
  );
};

export default Header;
