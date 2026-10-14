import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ToastProvider } from '../components/ToastContext';

export const ConsoleLayout = () => {
  return (
    <ToastProvider>
      <div className="console-layout">
        <Sidebar />
        <div className="console-main">
          <Header />
          <main className="console-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default ConsoleLayout;
