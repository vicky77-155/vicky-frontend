import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  DollarSign,
  Receipt,
  AlertCircle,
  Download,
  Layers,
  Percent,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/ToastContext';

export const BillingPage = () => {
  const { showToast } = useToast();

  const financeSections = [
    {
      title: 'Provider Costs',
      desc: 'Inspect raw upstream model rates, token consumption costs, and active provider agreements.',
      path: '/admin/billing/provider-costs',
      icon: DollarSign,
      action: 'Inspect Provider Expenses',
    },
    {
      title: 'Customer Pricing',
      desc: 'Manage tenant pricing tiers, per-token markups, rate limits, and custom contract overrides.',
      path: '/admin/billing/customer-pricing',
      icon: Layers,
      action: 'Manage Pricing Tiers',
    },
    {
      title: 'Invoices',
      desc: 'Track generated tax invoices, payment collections, line-item audits, and settlement states.',
      path: '/admin/billing/invoices',
      icon: Receipt,
      action: 'View Invoices Ledger',
    },
    {
      title: 'Usage & Metering',
      desc: 'High-density telemetry dashboard with token time-series, latency metrics, and invocation logs.',
      path: '/admin/usage',
      icon: BarChart3,
      action: 'Open Usage Telemetry',
    },
  ];

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>FINANCE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Billing Overview</span>
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
            Financial & Billing Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Consolidated platform accounting: provider expenditure, billable tenant revenue, gross margins, and settlement cycles.
          </p>
        </div>

        <button
          onClick={() => showToast('Financial ledger export initiated.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <Download size={14} /> Export Financial Ledger
        </button>
      </div>

      {/* Strict Three-Tier Accounting Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <AlertCircle size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Three-Tier Cost Separation:</strong> Vyoma strictly distinguishes (1) Token quota
          allocated to a tenant, (2) Actual costs billed by upstream providers (OpenRouter/Anthropic/OpenAI), and (3) Amounts
          invoiced to customers based on platform subscription markups.
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <MetricCard
          title="Provider Expenditure"
          value="Not available yet"
          subtitle="Upstream raw API costs"
          icon={DollarSign}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Customer Billable Revenue"
          value="Not available yet"
          subtitle="Total invoiced to tenants"
          icon={CreditCard}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Gross Platform Margin"
          value="Not available yet"
          subtitle="Markup over raw tokens"
          icon={Percent}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Unsettled Invoices"
          value="Not available yet"
          subtitle="Pending customer collections"
          icon={Receipt}
          badgeText="Standby"
          badgeType="neutral"
        />
      </div>

      {/* Finance Navigation Cards Grid */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Finance Modules & Portals
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {financeSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {sec.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {sec.desc}
                  </p>
                </div>

                <Link
                  to={sec.path}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.8rem',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                  }}
                >
                  <span>{sec.action}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Ledger Activity Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Tenant Financial Ledger Summary</div>
            <div className="card-subtitle">Aggregated billable accounts, quota plans, and payment terms</div>
          </div>
          <Link
            to="/admin/billing/customer-pricing"
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem' }}
          >
            Configure Pricing Plans
          </Link>
        </div>

        <EmptyState
          icon={CreditCard}
          title="No Invoiced Transactions Yet"
          description="Customer usage tracking and automated month-end invoicing will activate as tenant usage accumulates."
          actionLabel="View Billing Policy Spec"
          onAction={() => showToast('Billing policy specification loaded.')}
        />
      </div>
    </div>
  );
};

export default BillingPage;
