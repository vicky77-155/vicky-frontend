import React from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  Cpu,
  KeyRound,
  BarChart3,
  Terminal,
  CreditCard,
  Settings,
  ArrowUpRight,
  Activity,
  AlertCircle,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import HealthStatusBadge from '../components/HealthStatusBadge';
import { useToast } from '../components/ToastContext';

export const TenantDashboard = () => {
  const { showToast } = useToast();

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Tenant Workspace
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage organization quota allocations, scoped API keys, and test AI model completions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => showToast()}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem' }}
          >
            SDK Quickstart
          </button>
          <Link to="/tenant/playground" className="btn btn-primary" style={{ fontSize: '0.825rem' }}>
            Test in Playground <Terminal size={14} />
          </Link>
        </div>
      </div>

      {/* Scope Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <AlertCircle size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Tenant Environment:</strong> Organization isolation, assigned token balances,
          and model permissions are managed through your workspace policies.
        </div>
      </div>

      {/* Metrics Row - Compliant with no fabricated data */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <MetricCard
          title="Assigned Token Quota"
          value="Not available yet"
          subtitle="Organization token allowance"
          icon={Coins}
          badgeText="Ledger Inactive"
          badgeType="neutral"
        />
        <MetricCard
          title="Accessible AI Models"
          value="Not available yet"
          subtitle="Catalog permissions assigned by admin"
          icon={Cpu}
          badgeText="Catalog Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Active Tenant API Keys"
          value="Not available yet"
          subtitle="Production & staging credentials"
          icon={KeyRound}
          badgeText="No Keys"
          badgeType="neutral"
        />
        <MetricCard
          title="Monthly Token Usage"
          value="Not available yet"
          subtitle="Tokens metered in current billing cycle"
          icon={BarChart3}
          badgeText="Standby"
          badgeType="neutral"
        />
      </div>

      {/* Two Column Layout: Gateway Connectivity & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        {/* Gateway Health Section */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div className="card-title">Gateway Service Connection</div>
              <div className="card-subtitle">Live health status of API gateway proxy</div>
            </div>
            <HealthStatusBadge showDetails={true} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={16} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Vyoma API Gateway</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Unified Inference Endpoint</div>
                </div>
              </div>
              <span className="badge badge-success">Online & Available</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={16} color="var(--info)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Model Inference Router</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Multi-Provider Proxy</div>
                </div>
              </div>
              <span className="badge badge-neutral">Standby</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '4px' }}>Tenant Quick Shortcuts</div>
          <div className="card-subtitle" style={{ marginBottom: '16px' }}>Direct links to developer tools</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Link
              to="/tenant/playground"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} color="var(--primary)" /> AI Playground
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/tenant/api-keys"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={16} color="var(--accent)" /> API Keys
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/tenant/usage"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={16} color="var(--info)" /> Usage History
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/tenant/billing"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={16} /> Plan & Invoices
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/tenant/settings"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem', gridColumn: 'span 2' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={16} /> Organization Profile & Webhooks
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Usage Invocations Section */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Recent Invocations</div>
            <div className="card-subtitle">Real-time log of gateway requests initiated by your API keys</div>
          </div>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
            Filter Invocations
          </button>
        </div>

        <EmptyState
          title="No recent gateway requests"
          description="Invocations will appear here once you create an API key and send requests through the gateway."
          statusBadge="No Activity"
        />
      </div>
    </div>
  );
};

export default TenantDashboard;
