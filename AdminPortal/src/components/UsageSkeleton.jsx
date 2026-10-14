import React from 'react';

export const UsageSkeleton = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Row Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="card"
            style={{
              height: '110px',
              animation: 'pulse 1.5s infinite ease-in-out',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div style={{ width: '40%', height: '12px', backgroundColor: '#F1F5F9', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ width: '65%', height: '24px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ width: '50%', height: '10px', backgroundColor: '#F1F5F9', borderRadius: '4px' }} />
          </div>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        <div className="card" style={{ height: '300px', animation: 'pulse 1.5s infinite ease-in-out' }}>
          <div style={{ width: '30%', height: '16px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '20px' }} />
          <div style={{ width: '100%', height: '220px', backgroundColor: '#F8FAFC', borderRadius: '4px' }} />
        </div>
        <div className="card" style={{ height: '300px', animation: 'pulse 1.5s infinite ease-in-out' }}>
          <div style={{ width: '40%', height: '16px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '20px' }} />
          <div style={{ width: '100%', height: '220px', backgroundColor: '#F8FAFC', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="card" style={{ height: '260px', animation: 'pulse 1.5s infinite ease-in-out' }}>
        <div style={{ width: '25%', height: '16px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '16px' }} />
        <div style={{ width: '100%', height: '180px', backgroundColor: '#F8FAFC', borderRadius: '4px' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default UsageSkeleton;
