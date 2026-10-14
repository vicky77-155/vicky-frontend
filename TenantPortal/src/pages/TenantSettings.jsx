import React from 'react';
import { Settings, Users, Webhook, Bell, Save } from 'lucide-react';
import { useToast } from '../components/ToastContext';

export const TenantSettings = () => {
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Coming soon: This feature is under development.');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Organization Settings
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configure organization profile, manage developer team members, and set webhook callback URLs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
        {/* Navigation Subtabs */}
        <div className="card" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              className="btn btn-primary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem' }}
            >
              <Settings size={15} /> General Profile
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Users size={15} /> Team Members
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Webhook size={15} /> Webhook Endpoints
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Bell size={15} /> Quota Alerts
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="card">
          <form onSubmit={handleSave}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div className="card-title">Tenant Organization Profile</div>
              <div className="card-subtitle">Organization metadata and default environment identifiers</div>
            </div>

            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                className="form-input"
                defaultValue="Acme AI Engineering"
                placeholder="Organization name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technical Contact Email</label>
              <input
                type="email"
                className="form-input"
                defaultValue="devops@acme.ai"
                placeholder="tech-lead@company.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quota Depletion Webhook URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://api.acme.ai/webhooks/token-alerts"
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Called when remaining quota falls below 10%.
              </span>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Default Completion Model</label>
              <select className="form-input" defaultValue="claude-3.5-sonnet">
                <option value="claude-3.5-sonnet">Anthropic Claude 3.5 Sonnet</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="llama-3.1-70b">Meta LLaMA 3.1 70B</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => showToast()} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} /> Save Organization Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantSettings;
