import React, { createContext, useContext, useState, useCallback } from 'react';
import { Info, AlertCircle, CheckCircle2, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message = 'Coming soon: This feature is under development.', type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" style={{ borderColor: toast.type === 'error' ? 'var(--danger-border)' : 'var(--primary-border)' }}>
            {toast.type === 'error' ? (
              <AlertCircle size={18} color="var(--danger)" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 size={18} color="var(--success)" />
            ) : (
              <Info size={18} color="var(--primary)" />
            )}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
