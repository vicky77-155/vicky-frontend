import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Shield,
} from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/ToastContext';

export const AuditLogsPage = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>ADMINISTRATION</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Audit Logs</span>
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
            System Audit & Governance Logs
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Immutable chronological record of administrative actions, tenant provisioning, key rotations, and policy updates.
          </p>
        </div>

        <button
          onClick={() => showToast('Audit log export initiated.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <Download size={14} /> Export Audit Log
        </button>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="form-input"
            placeholder="Search audit trail by actor, IP address, or event type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: '36px', padding: '6px 12px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={14} color="var(--text-muted)" />
          <select
            className="form-input"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{ height: '36px', padding: '6px 10px', minWidth: '130px' }}
          >
            <option value="All">All Severities</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="SECURITY">SECURITY</option>
          </select>
        </div>
      </div>

      {/* Audit Log Card */}
      <div className="card">
        <EmptyState
          icon={Shield}
          title="Audit Trail Logging Standby"
          description="Centralized audit trail captures immutable platform events, tenant modifications, and security verification logs."
          actionLabel="View Retention Policy"
          onAction={() => showToast('Audit retention policy: 365 days.')}
        />
      </div>
    </div>
  );
};

export default AuditLogsPage;
