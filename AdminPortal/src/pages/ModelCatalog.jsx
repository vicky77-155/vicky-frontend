import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useToast } from '../components/ToastContext';

// Enterprise model catalog with provider separation and capabilities
const initialModels = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    category: 'General Reasoning',
    modalities: ['Text', 'Vision'],
    contextWindow: '200k tokens',
    providerStatus: 'Operational',
    approvalStatus: 'Approved',
    tenantAccess: 'Global (All Tenants)',
    promptPrice: '$3.00 / 1M tokens',
    completionPrice: '$15.00 / 1M tokens',
    recommended: true,
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o (Omni)',
    provider: 'OpenAI',
    category: 'Multimodal Flagship',
    modalities: ['Text', 'Vision', 'Audio'],
    contextWindow: '128k tokens',
    providerStatus: 'Operational',
    approvalStatus: 'Approved',
    tenantAccess: 'Global (All Tenants)',
    promptPrice: '$2.50 / 1M tokens',
    completionPrice: '$10.00 / 1M tokens',
    recommended: true,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta',
    category: 'Open Weights',
    modalities: ['Text'],
    contextWindow: '128k tokens',
    providerStatus: 'Operational',
    approvalStatus: 'Approved',
    tenantAccess: 'Tier 1 & Tier 2',
    promptPrice: '$0.40 / 1M tokens',
    completionPrice: '$0.40 / 1M tokens',
    recommended: false,
  },
  {
    id: 'mistralai/mistral-large-2411',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    category: 'Code & Reasoning',
    modalities: ['Text'],
    contextWindow: '128k tokens',
    providerStatus: 'Operational',
    approvalStatus: 'Approved',
    tenantAccess: 'Global (All Tenants)',
    promptPrice: '$2.00 / 1M tokens',
    completionPrice: '$6.00 / 1M tokens',
    recommended: false,
  },
  {
    id: 'google/gemini-1.5-pro-latest',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    category: 'Long Context',
    modalities: ['Text', 'Vision', 'Audio', 'Video'],
    contextWindow: '2,000k tokens',
    providerStatus: 'Operational',
    approvalStatus: 'Review Pending',
    tenantAccess: 'Restricted',
    promptPrice: '$3.50 / 1M tokens',
    completionPrice: '$10.50 / 1M tokens',
    recommended: false,
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    category: 'Cost Optimized',
    modalities: ['Text'],
    contextWindow: '64k tokens',
    providerStatus: 'Degraded',
    approvalStatus: 'Disabled',
    tenantAccess: 'Suspended',
    promptPrice: '$0.14 / 1M tokens',
    completionPrice: '$0.28 / 1M tokens',
    recommended: false,
  },
];

export const ModelCatalog = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedModel, setSelectedModel] = useState(null);

  const filteredModels = initialModels.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = providerFilter === 'All' || m.provider === providerFilter;
    const matchesStatus = statusFilter === 'All' || m.approvalStatus === statusFilter;
    return matchesSearch && matchesProvider && matchesStatus;
  });

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>PLATFORM</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Model Registry</span>
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
            AI Model Registry
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Enterprise catalog of supported upstream LLM models, provider availability states, and platform approval policies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => showToast('Upstream provider synchronization completed.')}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem' }}
          >
            Sync Upstream Registry
          </button>
        </div>
      </div>

      {/* Architecture Separation Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <Info size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Governance Boundary:</strong> Provider availability reflects upstream provider uptime.
          Platform Approval governs whether the model is accessible via the Vyoma Gateway. Tenant Access governs organization-level entitlements.
        </div>
      </div>

      {/* Filter Toolbar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="form-input"
            placeholder="Filter by model name, identifier (e.g. claude-3.5-sonnet), or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: '36px', padding: '6px 12px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={14} color="var(--text-muted)" />
            <select
              className="form-input"
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              style={{ height: '36px', padding: '6px 10px', minWidth: '130px' }}
            >
              <option value="All">All Providers</option>
              <option value="Anthropic">Anthropic</option>
              <option value="OpenAI">OpenAI</option>
              <option value="Meta">Meta</option>
              <option value="Mistral AI">Mistral AI</option>
              <option value="Google">Google</option>
              <option value="DeepSeek">DeepSeek</option>
            </select>
          </div>

          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ height: '36px', padding: '6px 10px', minWidth: '140px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Review Pending">Review Pending</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Models Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Model Identifier</th>
              <th>Provider</th>
              <th>Modalities</th>
              <th>Context</th>
              <th>Provider Status</th>
              <th>Platform Status</th>
              <th>Tenant Access</th>
              <th>Input / Output Price</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No models match your current filter criteria.
                </td>
              </tr>
            ) : (
              filteredModels.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {m.name}
                      {m.recommended && (
                        <span className="badge badge-info" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {m.id}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{m.provider}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {m.modalities.map((mod) => (
                        <span
                          key={mod}
                          style={{
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'var(--bg-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.contextWindow}</td>
                  <td>
                    {m.providerStatus === 'Operational' ? (
                      <span className="badge badge-success">
                        <CheckCircle size={11} /> Up
                      </span>
                    ) : (
                      <span className="badge badge-warning">
                        <AlertCircle size={11} /> Degraded
                      </span>
                    )}
                  </td>
                  <td>
                    {m.approvalStatus === 'Approved' ? (
                      <span className="badge badge-success">Approved</span>
                    ) : m.approvalStatus === 'Review Pending' ? (
                      <span className="badge badge-warning">Pending Review</span>
                    ) : (
                      <span className="badge badge-danger">Disabled</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.tenantAccess}</td>
                  <td style={{ fontSize: '0.775rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    <div>In: {m.promptPrice}</div>
                    <div>Out: {m.completionPrice}</div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedModel(m)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Model Detail Drawer / Modal */}
      {selectedModel && (
        <div className="modal-backdrop" onClick={() => setSelectedModel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedModel.name}</h3>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {selectedModel.id}
                </div>
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Provider</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>{selectedModel.provider}</div>
              </div>
              <div className="card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Context Window</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>{selectedModel.contextWindow}</div>
              </div>
              <div className="card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Prompt Pricing</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '2px' }}>{selectedModel.promptPrice}</div>
              </div>
              <div className="card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completion Pricing</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '2px' }}>{selectedModel.completionPrice}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedModel(null)} className="btn btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  showToast('Tenant access control policy updated.');
                  setSelectedModel(null);
                }}
                className="btn btn-primary"
              >
                Configure Access Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCatalog;
