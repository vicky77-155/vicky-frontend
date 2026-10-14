import React, { useState } from 'react';
import { KeyRound, Plus, Shield } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const ApiKeyManagement = () => {
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
            Platform API Keys
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Issue and govern platform root API keys, tenant credentials, and scoped gateway permissions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Create API Key
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
        <Shield size={18} color="var(--info)" />
        <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Security Protocol:</strong> Vyoma API keys are hashed with Argon2/SHA-256 before storage.
          API credentials provide secure programmatic gateway access.
        </div>
      </div>

      {/* Keys Table Container with Empty State */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Key Name & Label</th>
              <th>Owner / Tenant</th>
              <th>Key Prefix</th>
              <th>Scope Permissions</th>
              <th>Created Date</th>
              <th>Last Used</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ padding: 0 }}>
                <EmptyState
                  icon={KeyRound}
                  title="No API keys generated"
                  description="API key hashing, validation middleware, and rotation policies protect access across environments."
                  actionText="Generate Test Key"
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
        title="Generate Platform API Key"
        subtitle="Create an authentication credential for gateway access."
        footer={
          <>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleCreateKey} className="btn btn-primary">
              Generate Key
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateKey}>
          <div className="form-group">
            <label className="form-label">Key Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Production Service Agent"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assign to Tenant (Optional)</label>
            <select className="form-input" disabled defaultValue="">
              <option value="" disabled>No tenants currently provisioned</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Key Expiration</label>
            <select className="form-input" defaultValue="90">
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="never">Never (Requires Rotation Policy)</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ApiKeyManagement;
