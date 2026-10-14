import React from 'react';
import { BarChart3, Filter, Calendar, Download, Zap, Activity, Clock } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/ToastContext';

export const TenantUsage = () => {
  const { showToast } = useToast();

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Usage & Quota Consumption
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Monitor your organization&apos;s token burn rate, completion requests, and quota allowance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            <Calendar size={14} /> Current Billing Cycle
          </button>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            <Download size={14} /> Export Usage Report
          </button>
        </div>
      </div>

      {/* Quota Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <MetricCard
          title="Tokens Consumed (Cycle)"
          value="Not available yet"
          subtitle="Metered input & output tokens"
          icon={Zap}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Remaining Quota"
          value="Not available yet"
          subtitle="Available before threshold alerts"
          icon={Activity}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Total Gateway Invocations"
          value="Not available yet"
          subtitle="Requests completed successfully"
          icon={Clock}
          badgeText="Standby"
          badgeType="neutral"
        />
      </div>

      {/* Detailed Invocations Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Token Request History</div>
            <div className="card-subtitle">Detailed breakdown by model and timestamp</div>
          </div>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
            <Filter size={13} /> Filter by Model
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>API Key</th>
                <th>Model</th>
                <th>Input Tokens</th>
                <th>Output Tokens</th>
                <th>Total Tokens</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} style={{ padding: 0 }}>
                  <EmptyState
                    icon={BarChart3}
                    title="No usage recorded in this cycle"
                    description="Token metering pipelines and usage event logs will record gateway requests here."
                    statusBadge="No Usage Data"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantUsage;
