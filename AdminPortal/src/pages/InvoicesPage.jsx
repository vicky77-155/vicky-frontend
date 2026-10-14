import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const InvoicesPage = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Initial enterprise invoice repository (empty ledger compliant with no fabricated fake data)
  const invoicesList = [];

  const handleOpenInvoiceDetail = (inv) => {
    setSelectedInvoice(inv);
    setIsDetailModalOpen(true);
  };

  const filteredInvoices = invoicesList.filter((inv) => {
    const matchSearch =
      searchQuery === '' ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>FINANCE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Customer Invoices</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Customer Invoices & Billing Statements
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Tax invoices, line-item metered token statements, cycle billing schedules, and customer settlement states.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('Invoice ledger export initiated.')}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <Download size={14} /> Export Invoices Ledger
        </button>
      </div>

      {/* Scope Notice */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Receipt size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Billing Cycle Automation:</strong> Invoices are generated at the close of each tenant monthly billing cycle based on metered token consumption.
          No artificial invoices are fabricated.
        </span>
      </div>

      {/* Invoices Top KPI Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricCard
          title="Total Invoices Issued"
          value="0"
          subtitle="All-time billing statements"
          icon={Receipt}
          badgeText="Active Ledger"
          badgeType="neutral"
        />
        <MetricCard
          title="Outstanding Receivables"
          value="Not available yet"
          subtitle="Unsettled customer invoices"
          icon={Clock}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Collected Revenue"
          value="Not available yet"
          subtitle="Cleared tenant payment receipts"
          icon={CheckCircle2}
          badgeText="Standby"
          badgeType="neutral"
        />
        <MetricCard
          title="Overdue Accounts"
          value="0"
          subtitle="Past due customer accounts"
          icon={AlertCircle}
          badgeText="Zero Delinquency"
          badgeType="success"
        />
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="form-input"
            placeholder="Search invoice number, tenant organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '6px 0' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ height: '34px', padding: '4px 8px', fontSize: '0.8rem', width: '140px' }}
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <span className="badge badge-neutral">{filteredInvoices.length} Invoices</span>
        </div>
      </div>

      {/* Invoices Table / Empty State */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Tenant Organization</th>
              <th>Billing Period</th>
              <th style={{ textAlign: 'right' }}>Metered Tokens</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: 0 }}>
                  <EmptyState
                    icon={Receipt}
                    title="No Customer Invoices Issued"
                    description="Monthly billing summaries, automated tax invoices, and customer payment receipts will be recorded here as tenant token usage accumulates."
                    actionLabel="Preview Invoice Specification"
                    onAction={() => showToast('Enterprise invoice specification template viewed.')}
                  />
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv.invoiceNumber}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--primary)' }}>
                    {inv.invoiceNumber}
                  </td>
                  <td style={{ fontWeight: 500 }}>{inv.tenant}</td>
                  <td style={{ fontSize: '0.8rem' }}>{inv.period}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{inv.tokens.toLocaleString()}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{inv.amount}</td>
                  <td>
                    <span className={`badge badge-${inv.statusType}`}>{inv.status}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inv.issueDate}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inv.dueDate}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenInvoiceDetail(inv)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                    >
                      <Eye size={12} /> View Statement
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Invoice ${selectedInvoice.invoiceNumber}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tenant:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{selectedInvoice.tenant}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Billing Period:</span>
              <span>{selectedInvoice.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Metered Tokens:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedInvoice.tokens.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Invoiced Amount:</span>
              <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                {selectedInvoice.amount}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  showToast(`Invoice ${selectedInvoice.invoiceNumber} downloaded.`);
                  setIsDetailModalOpen(false);
                }}
                className="btn btn-primary"
              >
                <Download size={14} /> Download Official PDF
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoicesPage;
