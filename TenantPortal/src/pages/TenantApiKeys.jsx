import React, { useState } from 'react';
import { KeyRound, Plus, Shield } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const TenantApiKeys = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyName, setKeyName] = useState('');

  const handleCreateKey = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast('Coming soon: This feature is under development.');
    setKeyName('');
  };

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
            API Keys & Authentication
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Generate and manage API keys used by your backend services to interact with the gateway.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Create New Secret Key
        </button>
      </div>

      {/* Security Info Card */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Shield size={18} color="var(--primary)" />
        <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Authentication Token Note:</strong> Use your secret key as a Bearer token in the <code>Authorization</code> header:
          <code style={{ marginLeft: '6px', color: 'var(--info)' }}>Authorization: Bearer vtg_live_...</code> to authenticate gateway requests.
        </div>
      </div>

      {/* Keys Table */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Key Label</th>
              <th>Secret Prefix</th>
              <th>Environment Scope</th>
              <th>Created Date</th>
              <th>Last Invocations</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ padding: 0 }}>
                <EmptyState
                  icon={KeyRound}
                  title="No API keys generated"
                  description="Tenant API key issuance and hashed credential verification provide secure programmatic gateway access."
                  actionText="Create Secret Key"
                  onAction={() => setIsModalOpen(true)}
                  statusBadge="No Active Keys"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create Key Modal (UI-Only) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Tenant API Key"
        subtitle="Generate a secret key to authenticate your application with the gateway."
        footer={
          <>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleCreateKey} className="btn btn-primary">
              Create Key
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateKey}>
          <div className="form-group">
            <label className="form-label">Key Name / Identifier</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Backend Production Server"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Environment</label>
            <select className="form-input" defaultValue="production">
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Model Permissions</label>
            <select className="form-input" defaultValue="all">
              <option value="all">All Accessible Models</option>
              <option value="restricted">Restricted Subset</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TenantApiKeys;
