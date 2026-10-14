import React from 'react';

export const MetricCard = ({
  title,
  value = 'Not available yet',
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'neutral',
  onClick,
}) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '4px' }}>
            {title}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        {subtitle && (
          <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </span>
        )}
        {badgeText && (
          <span className={`badge badge-${badgeType}`} style={{ fontSize: '0.7rem' }}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
