import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Receipt,
  AlertCircle,
  Download,
  Clock,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/ToastContext';

export const TenantBilling = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Subscription & Usage Charges', icon: CreditCard },
    { id: 'invoices', label: 'Invoices & Statements', icon: Receipt },
    { id: 'payment-methods', label: 'Payment Settings', icon: DollarSign },
  ];

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>ORGANIZATION</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Billing</span>
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
            Organization Billing & Invoices
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Review your organization subscription plan, cycle token fees, payment history, and tax statements.
          </p>
        </div>

        <button
          onClick={() => showToast('Statement download initiated.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <Download size={14} /> Download Statements
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
        <AlertCircle size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Platform Billing Separation:</strong> Token quotas govern model invocation rate
          and request limits. Monetary balances and subscription invoices reflect contracted account billing.
        </div>
      </div>

      {/* Financial Overview Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricCard
          title="Current Cycle Charges"
          value="Not available yet"
          subtitle="Accrued token usage"
          icon={DollarSign}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Active Subscription Plan"
          value="Standard Growth"
          subtitle="Tier allocation"
          icon={CreditCard}
          badgeText="Active"
          badgeType="success"
        />
        <MetricCard
          title="Outstanding Balance"
          value="Not available yet"
          subtitle="Net due at cycle end"
          icon={Receipt}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Next Invoice Date"
          value="Not available yet"
          subtitle="Monthly cycle reset"
          icon={Clock}
          badgeText="Pending Generation"
          badgeType="neutral"
        />
      </div>

      {/* Tab Navigation */}
      <div className="tab-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div className="card-title">Past Invoices & Receipts</div>
              <div className="card-subtitle">Download official corporate invoices and payment confirmations</div>
            </div>
            <button
              onClick={() => showToast('Billing settings opened.')}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem' }}
            >
              Update Billing Details
            </button>
          </div>

          <EmptyState
            icon={Receipt}
            title="No Invoices Issued Yet"
            description="Your organization has not completed an invoicing cycle. Monthly statements will appear here upon completion of billing cycle."
            actionLabel="View Pricing Schedule"
            onAction={() => showToast('Standard Developer plan terms.')}
          />
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div className="card-title">Plan Entitlements & Metered Rates</div>
              <div className="card-subtitle">Contracted model rates and monthly quota packaging for Acme AI Labs</div>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Model / Service</th>
                  <th>Contracted Input Rate</th>
                  <th>Contracted Output Rate</th>
                  <th>Included Tier Allowance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Claude 3.5 Sonnet</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$3.00 / 1M tokens</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$15.00 / 1M tokens</td>
                  <td>Included in Monthly Quota</td>
                  <td><span className="badge badge-success">Entitled</span></td>
                </tr>
                <tr>
                  <td><strong>GPT-4o (Omni)</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$2.50 / 1M tokens</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$10.00 / 1M tokens</td>
                  <td>Included in Monthly Quota</td>
                  <td><span className="badge badge-success">Entitled</span></td>
                </tr>
                <tr>
                  <td><strong>Llama 3.3 70B</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$0.40 / 1M tokens</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>$0.40 / 1M tokens</td>
                  <td>Included in Monthly Quota</td>
                  <td><span className="badge badge-success">Entitled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Settings Tab */}
      {activeTab === 'payment-methods' && (
        <div className="card">
          <EmptyState
            icon={CreditCard}
            title="Payment Method Standby"
            description="Stripe customer portal and automated ACH / credit card processing can be configured for your billing account."
            actionLabel="Configure Billing Contact"
            onAction={() => showToast('Billing contact configuration updated.')}
          />
        </div>
      )}
    </div>
  );
};

export default TenantBilling;
