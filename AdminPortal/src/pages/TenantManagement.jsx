import React, { useState } from 'react';
import { Plus, Search, Filter, Building } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const TenantManagement = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');

  const handleCreateTenant = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast('Coming soon: This feature is under development.');
    setTenantName('');
    setTenantEmail('');
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
            Tenant Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Provision, inspect, and configure multi-tenant organizations and quotas.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Create Tenant
        </button>
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
            placeholder="Search tenants by organization name or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '6px 0' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => showToast()}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Filter size={14} /> Filter Status
          </button>
          <span className="badge badge-neutral">0 Total Tenants</span>
        </div>
      </div>

      {/* Table Container / Complete UI with Empty State */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Tenant ID / Slug</th>
              <th>Status</th>
              <th>Allocated Quota</th>
              <th>Active Keys</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ padding: 0 }}>
                <EmptyState
                  icon={Building}
                  title="No tenants provisioned"
                  description="Tenant registration records, database models, and organization isolation are currently unassigned."
                  actionText="Provision Initial Tenant"
                  onAction={() => setIsModalOpen(true)}
                  statusBadge="No Tenants"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create Tenant Modal (UI-Only implementation with Coming Soon notification) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision New Tenant Organization"
        subtitle="Configure the organization entity and primary administrator."
        footer={
          <>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleCreateTenant} className="btn btn-primary">
              Provision Tenant
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTenant}>
          <div className="form-group">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Acme Corporation"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Administrator Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@acme.com"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Initial Token Quota Tier</label>
            <select className="form-input" defaultValue="standard">
              <option value="starter">Starter (1,000,000 tokens)</option>
              <option value="standard">Standard (10,000,000 tokens)</option>
              <option value="enterprise">Enterprise (Custom Allocation)</option>
            </select>

          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TenantManagement;
