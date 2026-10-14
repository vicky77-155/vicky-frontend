import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Download,
  Server,
  TrendingDown,
  Info,
  Layers,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { useToast } from '../components/ToastContext';

export const ProviderCostsPage = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');

  const providerPricingSchedules = [
    {
      provider: 'Anthropic',
      connection: 'Direct Enterprise API (org_anthropic_prod)',
      models: [
        { model: 'Claude 3.5 Sonnet', inputPerMillion: '$3.00', outputPerMillion: '$15.00', cacheRead: '$0.30' },
        { model: 'Claude 3.5 Haiku', inputPerMillion: '$0.80', outputPerMillion: '$4.00', cacheRead: '$0.08' },
        { model: 'Claude 3 Opus', inputPerMillion: '$15.00', outputPerMillion: '$75.00', cacheRead: '$1.50' },
      ],
      billingCycle: 'Monthly Net 30',
      activeStatus: 'Active',
      statusType: 'success',
      cycleSpend: 'Not available yet',
    },
    {
      provider: 'OpenAI',
      connection: 'Direct Organization API (org_openai_prod)',
      models: [
        { model: 'GPT-4o (Omni)', inputPerMillion: '$2.50', outputPerMillion: '$10.00', cacheRead: '$1.25' },
        { model: 'GPT-4o mini', inputPerMillion: '$0.15', outputPerMillion: '$0.60', cacheRead: '$0.075' },
        { model: 'o1-preview', inputPerMillion: '$15.00', outputPerMillion: '$60.00', cacheRead: 'N/A' },
      ],
      billingCycle: 'Prepaid Balance Ledger',
      activeStatus: 'Active',
      statusType: 'success',
      cycleSpend: 'Not available yet',
    },
    {
      provider: 'Meta',
      connection: 'OpenRouter Aggregator (org_openrouter_dev)',
      models: [
        { model: 'Llama 3.3 70B Instruct', inputPerMillion: '$0.40', outputPerMillion: '$0.40', cacheRead: 'Free' },
        { model: 'Llama 3.1 8B Instruct', inputPerMillion: '$0.055', outputPerMillion: '$0.055', cacheRead: 'Free' },
        { model: 'Llama 3.1 405B Instruct', inputPerMillion: '$2.00', outputPerMillion: '$2.00', cacheRead: 'Free' },
      ],
      billingCycle: 'Pay-As-You-Go Credits',
      activeStatus: 'Active',
      statusType: 'success',
      cycleSpend: 'Not available yet',
    },
    {
      provider: 'Mistral AI',
      connection: 'Direct Cloud Endpoint (org_mistral_prod)',
      models: [
        { model: 'Mistral Large 2 (2411)', inputPerMillion: '$2.00', outputPerMillion: '$6.00', cacheRead: 'N/A' },
        { model: 'Codestral 2501', inputPerMillion: '$0.30', outputPerMillion: '$0.90', cacheRead: 'N/A' },
      ],
      billingCycle: 'Monthly Postpaid',
      activeStatus: 'Active',
      statusType: 'success',
      cycleSpend: 'Not available yet',
    },
  ];

  const filteredProviders = providerPricingSchedules.filter((p) => {
    const matchSearch =
      searchQuery === '' ||
      p.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.models.some((m) => m.model.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchProvider = selectedProvider === 'all' || p.provider === selectedProvider;
    return matchSearch && matchProvider;
  });

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>FINANCE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Provider Costs</span>
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
            AI Provider Cost Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Upstream price schedules, raw token consumption fees, provider connections, and direct infrastructure expenditure.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('Provider price schedule exported.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <Download size={14} /> Export Cost Schedules
        </button>
      </div>

      {/* Provider Economics Scope Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Provider Rate Schedules:</strong> Rates reflect actual upstream contracts billed to Vyoma per 1,000,000 tokens.
          Actual monthly expenses compute in real-time as metered requests execute.
        </span>
      </div>

      {/* Provider Top KPI Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricCard
          title="Active Upstream Providers"
          value="4"
          subtitle="Direct and aggregated APIs"
          icon={Server}
          badgeText="Connected"
          badgeType="success"
        />
        <MetricCard
          title="Catalog Model Profiles"
          value="10"
          subtitle="Distinct pricing definitions"
          icon={Layers}
          badgeText="Verified"
          badgeType="success"
        />
        <MetricCard
          title="Lowest Input Cost"
          value="$0.055 / 1M"
          subtitle="Llama 3.1 8B Instruct (Meta)"
          icon={TrendingDown}
          badgeText="Economy"
          badgeType="neutral"
        />
        <MetricCard
          title="Current Cycle Expenses"
          value="Not available yet"
          subtitle="Aggregated provider invoice total"
          icon={DollarSign}
          badgeText="Standby"
          badgeType="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="form-input"
            placeholder="Search provider, connection, or model name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '6px 0' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-input"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            style={{ height: '34px', padding: '4px 8px', fontSize: '0.8rem', width: '150px' }}
          >
            <option value="all">All Providers</option>
            <option value="Anthropic">Anthropic</option>
            <option value="OpenAI">OpenAI</option>
            <option value="Meta">Meta</option>
            <option value="Mistral AI">Mistral AI</option>
          </select>
          <span className="badge badge-neutral">{filteredProviders.length} Providers Listed</span>
        </div>
      </div>

      {/* Provider Details & Model Rate Schedules Table */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Provider & Connection</th>
              <th>Supported Model</th>
              <th style={{ textAlign: 'right' }}>Input / 1M Tokens</th>
              <th style={{ textAlign: 'right' }}>Output / 1M Tokens</th>
              <th style={{ textAlign: 'right' }}>Cache Read / 1M</th>
              <th>Billing Terms</th>
              <th style={{ textAlign: 'right' }}>Cycle Spend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.flatMap((provider) =>
              provider.models.map((model, idx) => (
                <tr key={`${provider.provider}-${model.model}`}>
                  {idx === 0 ? (
                    <td rowSpan={provider.models.length} style={{ verticalAlign: 'top', borderRight: '1px solid var(--border-card)' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {provider.provider}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                        {provider.connection}
                      </div>
                    </td>
                  ) : null}
                  <td style={{ fontWeight: 600 }}>{model.model}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{model.inputPerMillion}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{model.outputPerMillion}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {model.cacheRead}
                  </td>
                  {idx === 0 ? (
                    <td rowSpan={provider.models.length} style={{ verticalAlign: 'top', fontSize: '0.8rem' }}>
                      {provider.billingCycle}
                    </td>
                  ) : null}
                  {idx === 0 ? (
                    <td rowSpan={provider.models.length} style={{ verticalAlign: 'top', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {provider.cycleSpend}
                    </td>
                  ) : null}
                  {idx === 0 ? (
                    <td rowSpan={provider.models.length} style={{ verticalAlign: 'top' }}>
                      <span className={`badge badge-${provider.statusType}`}>{provider.activeStatus}</span>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderCostsPage;
