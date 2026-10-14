import React from 'react';
import { Layers } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Layers,
  title = 'No data available',
  description = 'No tenant records have been registered or this subsystem is currently inactive.',
  actionText,
  onAction,
  statusBadge = null,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border-card)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'var(--bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          marginBottom: '16px',
        }}
      >
        <Icon size={24} />
      </div>

      {statusBadge && (
        <span className="badge badge-neutral" style={{ marginBottom: '10px', fontSize: '0.72rem' }}>
          {statusBadge}
        </span>
      )}

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: actionText ? '20px' : '0' }}>
        {description}
      </p>

      {actionText && (
        <button
          onClick={onAction}
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem' }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
