import React, { useState, useEffect, useCallback } from 'react';
import { Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import healthApi from '../api/healthApi';

export const HealthStatusBadge = ({ showDetails = false }) => {
  const [status, setStatus] = useState('checking');
  const [details, setDetails] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const liveness = await healthApi.checkLiveness();
      if (liveness && liveness.status === 'ok') {
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
      console.warn('Tenant backend health probe failed:', err.message);
      setStatus('disconnected');
      setDetails(null);
    } finally {
      setIsRefreshing(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle size={14} color="var(--success)" />,
          text: 'Gateway Online',
          badgeClass: 'badge-success',
          dotColor: 'var(--success)',
        };
      case 'disconnected':
        return {
          icon: <XCircle size={14} color="var(--danger)" />,
          text: 'Gateway Offline',
          badgeClass: 'badge-danger',
          dotColor: 'var(--danger)',
        };
      case 'error':
        return {
          icon: <AlertTriangle size={14} color="var(--warning)" />,
          text: 'Gateway Degraded',
          badgeClass: 'badge-warning',
          dotColor: 'var(--warning)',
        };
      case 'checking':
      default:
        return {
          icon: <Activity size={14} color="var(--info)" />,
          text: 'Probing Gateway...',
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
        title={details ? `Service: ${details.service}` : 'Gateway probe'}
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
        }}
        title={`Retry gateway connection (Checked: ${lastChecked || 'just now'})`}
        aria-label="Refresh gateway health"
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
