import React from 'react';
import { Shield, Server, Key, Bell, Save } from 'lucide-react';
import { useToast } from '../components/ToastContext';

export const SettingsPage = () => {
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
          Platform Settings
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configure gateway infrastructure parameters, AI provider credentials, and security defaults.
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
              <Server size={15} /> General Gateway
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Key size={15} /> AI Providers
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Shield size={15} /> Security & CORS
            </button>
            <button
              onClick={() => showToast()}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', fontSize: '0.825rem', border: 'none' }}
            >
              <Bell size={15} /> Notifications
            </button>
          </div>
        </div>

        {/* Form Panel */}
        <div className="card">
          <form onSubmit={handleSave}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div className="card-title">Gateway Configuration</div>
              <div className="card-subtitle">Global runtime controls and rate limits</div>
            </div>

            <div className="form-group">
              <label className="form-label">Gateway Service Identifier</label>
              <input
                type="text"
                className="form-input"
                defaultValue="vyoma-token-gateway-api"
                disabled
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Defined in BackEnd/src/core/config.py
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Default Request Timeout (seconds)</label>
              <input
                type="number"
                className="form-input"
                defaultValue={60}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Global Rate Limit per Tenant (requests/min)</label>
              <input
                type="number"
                className="form-input"
                defaultValue={600}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">AI Provider Target</label>
              <select className="form-input" defaultValue="openrouter">
                <option value="openrouter">OpenRouter (Unified Multi-Model Gateway)</option>
                <option value="direct_anthropic">Direct Anthropic API</option>
                <option value="direct_openai">Direct OpenAI API</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => showToast()} className="btn btn-secondary">
                Reset Defaults
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
