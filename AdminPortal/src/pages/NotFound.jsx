import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          marginBottom: '20px',
        }}
      >
        <Compass size={28} />
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
        404 — Page Not Found
      </h1>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '24px' }}>
        The administrative route you navigated to does not exist or has been relocated.
      </p>

      <Link to="/admin" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
