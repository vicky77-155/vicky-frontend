import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ConsoleLayout from '../layouts/ConsoleLayout';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import TenantManagement from '../pages/TenantManagement';
import TokenPoolManagement from '../pages/TokenPoolManagement';
import ModelCatalog from '../pages/ModelCatalog';
import AdminPlayground from '../pages/AdminPlayground';
import ApiKeyManagement from '../pages/ApiKeyManagement';
import UsagePage from '../pages/UsagePage';
import BillingPage from '../pages/BillingPage';
import ProviderCostsPage from '../pages/ProviderCostsPage';
import CustomerPricingPage from '../pages/CustomerPricingPage';
import InvoicesPage from '../pages/InvoicesPage';
import SettingsPage from '../pages/SettingsPage';
import AuditLogsPage from '../pages/AuditLogsPage';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Login Page */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Console Protected/Layout Routes */}
      <Route path="/admin" element={<ConsoleLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="tenants" element={<TenantManagement />} />
        <Route path="token-pool" element={<TokenPoolManagement />} />
        <Route path="models" element={<ModelCatalog />} />
        <Route path="playground" element={<AdminPlayground />} />
        <Route path="api-keys" element={<ApiKeyManagement />} />

        {/* Five Distinct Finance Pages */}
        <Route path="billing" element={<BillingPage />} />
        <Route path="billing/provider-costs" element={<ProviderCostsPage />} />
        <Route path="billing/customer-pricing" element={<CustomerPricingPage />} />
        <Route path="billing/invoices" element={<InvoicesPage />} />
        <Route path="usage" element={<UsagePage />} />

        <Route path="settings" element={<SettingsPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
