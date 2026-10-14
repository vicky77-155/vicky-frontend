import React, { useState } from 'react';
import { Coins, Plus, Layers, Sliders, AlertCircle } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const TokenPoolManagement = () => {
  const { showToast } = useToast();
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);

  const handleAllocate = (e) => {
    e.preventDefault();
    setIsAllocateModalOpen(false);
    showToast('Coming soon: This feature is under development.');
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
            Shared Token Pool Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure platform token reserves, tenant allocations, and atomic reservation policies.
          </p>
        </div>

        <button
          onClick={() => setIsAllocateModalOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Allocate Tenant Quota
        </button>
      </div>

      {/* Information Banner */}
      <div
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid var(--warning-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <AlertCircle size={18} color="var(--warning)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Token Ledger Architecture:</strong> The token pool separates allocated quota
          from provider execution cost. Atomic quota reservation, balance ledgers, and overage throttling protect tenant limits.
        </div>
      </div>

      {/* Token Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <MetricCard
          title="Master Pool Capacity"
          value="Not available yet"
          subtitle="Configured via platform settings"
          icon={Coins}
          badgeText="Ledger Offline"
          badgeType="neutral"
        />
        <MetricCard
          title="Total Allocated Quota"
          value="Not available yet"
          subtitle="Sum of active tenant allocations"
          icon={Layers}
          badgeText="Allocation Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Unassigned Pool Balance"
          value="Not available yet"
          subtitle="Available for tenant distribution"
          icon={Sliders}
          badgeText="Pending Ledger"
          badgeType="neutral"
        />
      </div>

      {/* Tenant Quotas Table & Ledger History */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="card-title">Tenant Quota Allocations</div>
            <div className="card-subtitle">Active distribution of platform tokens per organization</div>
          </div>
          <button onClick={() => showToast()} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
            Export Quota Map
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenant Organization</th>
                <th>Quota Limit</th>
                <th>Reserved / In-Flight</th>
                <th>Consumed</th>
                <th>Remaining</th>
                <th>Enforcement Policy</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} style={{ padding: 0 }}>
                  <EmptyState
                    icon={Coins}
                    title="No tenant quota allocations"
                    description="Token pool allocations and quota ledger transactions will become available as tenant models are initialized."
                    actionText="Allocate Quota"
                    onAction={() => setIsAllocateModalOpen(true)}
                    statusBadge="Pool Unassigned"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocation Modal (UI-Only) */}
      <Modal
        isOpen={isAllocateModalOpen}
        onClose={() => setIsAllocateModalOpen(false)}
        title="Allocate Quota from Master Pool"
        subtitle="Assign AI tokens to a registered tenant organization."
        footer={
          <>
            <button type="button" onClick={() => setIsAllocateModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleAllocate} className="btn btn-primary">
              Confirm Allocation
            </button>
          </>
        }
      >
        <form onSubmit={handleAllocate}>
          <div className="form-group">
            <label className="form-label">Select Tenant</label>
            <select className="form-input" disabled defaultValue="">
              <option value="" disabled>No tenants currently provisioned</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tokens to Allocate</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 5,000,000"
              disabled
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Overage Behavior</label>
            <select className="form-input" defaultValue="hard_stop">
              <option value="hard_stop">Hard Stop (Reject requests when quota is 0)</option>
              <option value="allow_overage">Allow Overage with Post-billing</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TokenPoolManagement;
