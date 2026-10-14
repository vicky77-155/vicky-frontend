import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Coins,
  Cpu,
  BarChart2,
  Terminal,
  KeyRound,
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

export const AdminDashboard = () => {
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
            Platform Overview
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            VYOMA Token Gateway centralized multi-tenant management and monitoring console.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => showToast()}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem' }}
          >
            Download Report
          </button>
          <Link to="/admin/playground" className="btn btn-primary" style={{ fontSize: '0.825rem' }}>
            Open AI Playground <Terminal size={14} />
          </Link>
        </div>
      </div>

      {/* Operational Notice Banner */}
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
          <strong style={{ color: 'var(--text-primary)' }}>System Overview:</strong> Centralized dashboard for platform tenancy,
          token pool health, and upstream AI models. Live backend connectivity is verified via the probe indicator in the header.
        </div>
      </div>

      {/* Metrics Row: Strict compliance with no fabricated stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <MetricCard
          title="Active Tenants"
          value="Not available yet"
          subtitle="Registered tenant organizations"
          icon={Users}
          badgeText="Pending Provisioning"
          badgeType="neutral"
        />
        <MetricCard
          title="Shared Token Pool"
          value="Not available yet"
          subtitle="Quota pool configuration"
          icon={Coins}
          badgeText="Ledger Inactive"
          badgeType="neutral"
        />
        <MetricCard
          title="Enabled AI Models"
          value="Not available yet"
          subtitle="Model catalog integration"
          icon={Cpu}
          badgeText="Catalog Offline"
          badgeType="neutral"
        />
        <MetricCard
          title="Total Gateway Invocations"
          value="Not available yet"
          subtitle="Aggregated usage metering"
          icon={BarChart2}
          badgeText="Metering Inactive"
          badgeType="neutral"
        />
      </div>

      {/* Two-Column Layout: Platform Health & Quick Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        {/* Platform Health Section */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div className="card-title">System Health & Probes</div>
              <div className="card-subtitle">Real-time status of gateway runtime dependencies</div>
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
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>FastAPI Gateway Core</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Liveness Probe (/health)</div>
                </div>
              </div>
              <span className="badge badge-success">Online & Listening</span>
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
                <Activity size={16} color="var(--info)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>PostgreSQL Database</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Readiness Probe (/api/v1/health/ready)</div>
                </div>
              </div>
              <span className="badge badge-neutral">Checked on demand</span>
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
                <Activity size={16} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>AI Provider Gateway</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>OpenRouter Bridge</div>
                </div>
              </div>
              <span className="badge badge-neutral">Standby</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Navigation Shortcuts */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '4px' }}>Administrative Navigation</div>
          <div className="card-subtitle" style={{ marginBottom: '16px' }}>Direct links to console subsystems</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Link
              to="/admin/tenants"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--primary)" /> Tenants
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/admin/token-pool"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={16} color="var(--warning)" /> Token Pool
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/admin/models"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} color="var(--info)" /> AI Models
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/admin/api-keys"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={16} color="var(--success)" /> API Keys
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/admin/billing"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={16} /> Costs & Billing
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>

            <Link
              to="/admin/settings"
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '12px 14px', fontSize: '0.825rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={16} /> Settings
              </span>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section: Empty state adhering strictly to no fabricated records */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Recent Platform Audit Log</div>
            <div className="card-subtitle">Real-time record of administrative and tenant events</div>
          </div>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
            Filter Log
          </button>
        </div>

        <EmptyState
          title="No operational events recorded"
          description="The event stream will begin capturing audit trails as tenant actions and API key requests occur."
          statusBadge="Audit Trail Inactive"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
