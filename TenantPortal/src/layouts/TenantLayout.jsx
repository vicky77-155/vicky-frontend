import React from 'react';
import { Outlet } from 'react-router-dom';
import TenantSidebar from '../components/TenantSidebar';
import TenantHeader from '../components/TenantHeader';
import { ToastProvider } from '../components/ToastContext';

export const TenantLayout = () => {
  return (
    <ToastProvider>
      <div className="tenant-layout">
        <TenantSidebar />
        <div className="tenant-main">
          <TenantHeader />
          <main className="tenant-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default TenantLayout;
