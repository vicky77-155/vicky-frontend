import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '../components/ToastContext';

export const TenantUsers = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Developer');

  const sampleUsers = [
    {
      id: 'usr_01',
      name: 'Primary Organization Admin',
      email: 'admin@acme-corp.internal',
      role: 'Org Admin',
      status: 'Active',
      joinedAt: 'Active',
      mfaEnabled: true,
    },
    {
      id: 'usr_02',
      name: 'Lead AI Engineer',
      email: 'engineer@acme-corp.internal',
      role: 'Developer',
      status: 'Invited',
      joinedAt: 'Pending Verification',
      mfaEnabled: false,
    },
  ];

  const handleInvite = (e) => {
    e.preventDefault();
    showToast('Member invitation sent.');
    setIsInviteOpen(false);
    setInviteEmail('');
  };

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>ORGANIZATION</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>User Management</span>
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
            Organization Team Members
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage team access, role-based permissions (RBAC), and invitation statuses for Acme AI Labs (org_acme01).
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.825rem' }}
        >
          <UserPlus size={15} /> Invite Member
        </button>
      </div>

      {/* Scope Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <AlertCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Security Notice:</strong> Organization access is governed by strict role-based access control (RBAC) and scoped token isolation.
        </span>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="form-input"
            placeholder="Search organization members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: '36px', padding: '6px 12px' }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Member Name & Email</th>
              <th>Assigned Role</th>
              <th>Status</th>
              <th>MFA Protected</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td>
                  <span className="badge badge-neutral">{u.role}</span>
                </td>
                <td>
                  {u.status === 'Active' ? (
                    <span className="badge badge-success">
                      <CheckCircle size={11} /> Active
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      <Clock size={11} /> Pending Activation
                    </span>
                  )}
                </td>
                <td>
                  {u.mfaEnabled ? (
                    <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>Enforced</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Not configured</span>
                  )}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.joinedAt}</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => showToast('User role settings updated.')}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="modal-backdrop" onClick={() => setIsInviteOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Invite Team Member
            </h3>
            <form onSubmit={handleInvite}>
              <div className="form-group">
                <label className="form-label">Corporate Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="colleague@yourcompany.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Organization Role</label>
                <select
                  className="form-input"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option value="Developer">Developer (Generate keys, view project quota)</option>
                  <option value="Billing Admin">Billing Admin (Manage invoices and subscription)</option>
                  <option value="Org Admin">Organization Admin (Full tenant privileges)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsInviteOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantUsers;
