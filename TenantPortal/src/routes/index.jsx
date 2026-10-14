import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import TenantLayout from '../layouts/TenantLayout';
import TenantLogin from '../pages/TenantLogin';
import TenantDashboard from '../pages/TenantDashboard';
import TenantProjects from '../pages/TenantProjects';
import TenantPlayground from '../pages/TenantPlayground';
import TenantApiKeys from '../pages/TenantApiKeys';
import TenantQuotas from '../pages/TenantQuotas';
import TenantUsage from '../pages/TenantUsage';
import TenantUsers from '../pages/TenantUsers';
import TenantBilling from '../pages/TenantBilling';
import TenantSettings from '../pages/TenantSettings';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to tenant workspace */}
      <Route path="/" element={<Navigate to="/tenant" replace />} />

      {/* Login */}
      <Route path="/login" element={<TenantLogin />} />

      {/* Tenant Workspace Routes */}
      <Route path="/tenant" element={<TenantLayout />}>
        <Route index element={<TenantDashboard />} />
        <Route path="projects" element={<TenantProjects />} />
        <Route path="playground" element={<TenantPlayground />} />
        <Route path="api-keys" element={<TenantApiKeys />} />
        <Route path="quotas" element={<TenantQuotas />} />
        <Route path="usage" element={<TenantUsage />} />
        <Route path="users" element={<TenantUsers />} />
        <Route path="billing" element={<TenantBilling />} />
        <Route path="settings" element={<TenantSettings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
