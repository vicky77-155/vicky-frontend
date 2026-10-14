import React, { useState, useEffect, useCallback } from 'react';
import { Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import healthApi from '../api/healthApi';

export const HealthStatusBadge = ({ showDetails = false }) => {
  const [status, setStatus] = useState('checking'); // 'checking' | 'connected' | 'disconnected' | 'error'
  const [details, setDetails] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // First probe service liveness
      const liveness = await healthApi.checkLiveness();
      if (liveness && liveness.status === 'ok') {
        // Also probe versioned health for DB status
        try {
          const v1Health = await healthApi.checkApiHealth();
          setDetails(v1Health);
        } catch {
          setDetails({ status: 'ok', service: liveness.service, database: 'unknown' });
        }
        setStatus('connected');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.warn('Backend health probe failed:', err.message);
      setStatus('disconnected');
      setDetails(null);
    } finally {
      setIsRefreshing(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  useEffect(() => {
    checkHealth();
    // Poll every 15 seconds
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle size={14} color="var(--success)" />,
          text: 'Backend Online',
          badgeClass: 'badge-success',
          dotColor: 'var(--success)',
        };
      case 'disconnected':
        return {
          icon: <XCircle size={14} color="var(--danger)" />,
          text: 'Backend Offline',
          badgeClass: 'badge-danger',
          dotColor: 'var(--danger)',
        };
      case 'error':
        return {
          icon: <AlertTriangle size={14} color="var(--warning)" />,
          text: 'Backend Degraded',
          badgeClass: 'badge-warning',
          dotColor: 'var(--warning)',
        };
      case 'checking':
      default:
        return {
          icon: <Activity size={14} color="var(--info)" />,
          text: 'Checking API...',
          badgeClass: 'badge-neutral',
          dotColor: 'var(--info)',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <div
        className={`badge ${config.badgeClass}`}
        style={{ padding: '4px 10px', fontSize: '0.785rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        title={details ? `Service: ${details.service} | DB: ${details.database || 'N/A'}` : 'Backend probe status'}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: config.dotColor,
            boxShadow: status === 'connected' ? `0 0 6px ${config.dotColor}` : 'none',
          }}
        />
        <span>{config.text}</span>
        {details?.database && (
          <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>
            (DB: {details.database})
          </span>
        )}
      </div>

      <button
        onClick={checkHealth}
        disabled={isRefreshing}
        style={{
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          borderRadius: '4px',
          transition: 'color 0.15s ease',
        }}
        title={`Retry connection probe (Last checked: ${lastChecked || 'just now'})`}
        aria-label="Refresh backend health"
      >
        <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
      </button>

      {showDetails && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {lastChecked ? `Checked ${lastChecked}` : ''}
        </span>
      )}
    </div>
  );
};

export default HealthStatusBadge;
