import React from 'react';
import {
  Coins,
  TrendingUp,
  Clock,
  ShieldCheck,
  Info,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { useToast } from '../components/ToastContext';

export const TenantQuotas = () => {
  const { showToast } = useToast();

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>RESOURCES</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Quota Management</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Token Quota Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Inspect organization allocation caps, track token burn rate, and manage sub-project quota thresholds.
          </p>
        </div>

        <button
          onClick={() => showToast('Quota expansion request submitted.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          Request Quota Increase
        </button>
      </div>

      {/* Scope Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <Info size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Quota Isolation Principle:</strong> Total tenant quota is granted from the
          Vyoma Root Token Pool. Projects within this tenant consume tokens from this pool and cannot exceed assigned limits.
        </div>
      </div>

      {/* Quota Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricCard
          title="Organization Quota Cap"
          value="Not available yet"
          subtitle="Assigned by platform admin"
          icon={Coins}
          badgeText="Active Policy"
          badgeType="neutral"
        />
        <MetricCard
          title="Tokens Consumed (Cycle)"
          value="Not available yet"
          subtitle="Current billing window"
          icon={TrendingUp}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Tokens Remaining"
          value="Not available yet"
          subtitle="Available for requests"
          icon={ShieldCheck}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Quota Burn Velocity"
          value="Not available yet"
          subtitle="Tokens per hour average"
          icon={Clock}
          badgeText="Standby"
          badgeType="neutral"
        />
      </div>

      {/* Project Sub-Allocation Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Project Quota Thresholds</div>
            <div className="card-subtitle">Project ceilings preventing individual environments from exhausting tenant tokens</div>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Ceiling (Monthly)</th>
                <th>Consumed</th>
                <th>Remaining</th>
                <th>Hard-Stop Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Default Environment (proj_default)</strong></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>10,000,000</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>Not available yet</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>Not available yet</td>
                <td><span className="badge badge-success">Enabled</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => showToast('Threshold adjustments updated.')}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    Adjust Limit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantQuotas;
