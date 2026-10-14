import React, { useState } from 'react';
import {
  Plus,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '../components/ToastContext';

export const TenantProjects = () => {
  const { showToast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  const sampleProjects = [
    {
      id: 'proj_default',
      name: 'Default Environment',
      description: 'Primary tenant development workspace for AI gateway integration.',
      createdAt: 'Standard Deployment',
      status: 'Active',
      apiKeysCount: 1,
      quotaCap: '10,000,000 tokens',
      allowedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3.3 70B'],
    },
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    showToast('Project creation request submitted.');
    setIsCreateOpen(false);
    setProjectName('');
  };

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>WORKSPACE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Projects</span>
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
            Workspace Projects
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Partition API keys, token quota ceilings, and allowed models across engineering teams and applications.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.825rem' }}
        >
          <Plus size={15} /> Create Project
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
          <strong>Project Isolation:</strong> Project-level sub-allocations and scoped API keys maintain workspace boundaries.
        </span>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {sampleProjects.map((p) => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {p.id}
                </div>
              </div>
              <span className="badge badge-success">{p.status}</span>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1 }}>
              {p.description}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.785rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Project Quota Limit:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.quotaCap}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active API Keys:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.apiKeysCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Permitted Models:</span>
                <span style={{ color: 'var(--text-primary)' }}>3 models</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => showToast('Project settings updated.')}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                Project Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="modal-backdrop" onClick={() => setIsCreateOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Create New Project
            </h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Staging Customer Chatbot"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Token Limit (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 5,000,000 tokens"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantProjects;
