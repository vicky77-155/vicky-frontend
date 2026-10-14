import React, { useState } from 'react';
import {
  Layers,
  Search,
  Plus,
  Edit2,
  CheckCircle2,
  Users,
  Percent,
  DollarSign,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Modal from '../components/Modal';
import { useToast } from '../components/ToastContext';

export const CustomerPricingPage = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Form states for creating or editing tier
  const [planName, setPlanName] = useState('');
  const [includedTokens, setIncludedTokens] = useState('10,000,000');
  const [overageRate, setOverageRate] = useState('$0.004 / 1k');
  const [rateLimit, setRateLimit] = useState('120 req/min');
  const [marginMarkup, setMarginMarkup] = useState('20%');

  const defaultTiers = [
    {
      id: 'tier-dev',
      name: 'Developer (Sandbox)',
      monthlyPool: '1,000,000 tokens',
      overageRate: '$0.005 / 1k tokens',
      rateLimit: '60 req/min',
      marginMarkup: '15% platform markup',
      assignedTenants: 0,
      status: 'Standard',
      statusType: 'neutral',
      description: 'Default tier for evaluating model integration and non-production testing.',
    },
    {
      id: 'tier-growth',
      name: 'Growth (Standard)',
      monthlyPool: '50,000,000 tokens',
      overageRate: '$0.0035 / 1k tokens',
      rateLimit: '600 req/min',
      marginMarkup: '20% platform markup',
      assignedTenants: 0,
      status: 'Popular',
      statusType: 'info',
      description: 'Production workloads with SLA guarantees and multi-model routing.',
    },
    {
      id: 'tier-ent',
      name: 'Enterprise Dedicated',
      monthlyPool: 'Custom Dedicated Pool',
      overageRate: 'Cost + 15% Pass-Through',
      rateLimit: 'Unlimited',
      marginMarkup: '15% custom margin',
      assignedTenants: 0,
      status: 'Custom SLA',
      statusType: 'success',
      description: 'Volume enterprise accounts with dedicated token reserves and 1h support SLA.',
    },
  ];

  const [pricingTiers, setPricingTiers] = useState(defaultTiers);

  const handleOpenEdit = (tier) => {
    setEditingPlan(tier);
    setPlanName(tier.name);
    setIncludedTokens(tier.monthlyPool);
    setOverageRate(tier.overageRate);
    setRateLimit(tier.rateLimit);
    setMarginMarkup(tier.marginMarkup);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setPlanName('');
    setIncludedTokens('');
    setOverageRate('');
    setRateLimit('');
    setMarginMarkup('20%');
    setIsModalOpen(true);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!planName.trim()) {
      showToast('Please provide a valid plan name.');
      return;
    }

    if (editingPlan) {
      setPricingTiers((prev) =>
        prev.map((t) =>
          t.id === editingPlan.id
            ? {
                ...t,
                name: planName,
                monthlyPool: includedTokens,
                overageRate,
                rateLimit,
                marginMarkup,
              }
            : t
        )
      );
      showToast(`Pricing plan "${planName}" updated successfully.`);
    } else {
      const newTier = {
        id: `tier-${Date.now()}`,
        name: planName,
        monthlyPool: includedTokens || '10,000,000 tokens',
        overageRate: overageRate || '$0.004 / 1k tokens',
        rateLimit: rateLimit || '120 req/min',
        marginMarkup: marginMarkup || '20%',
        assignedTenants: 0,
        status: 'Active',
        statusType: 'success',
        description: 'Custom tenant rate schedule configured by platform administrator.',
      };
      setPricingTiers((prev) => [...prev, newTier]);
      showToast(`New custom pricing plan "${planName}" created.`);
    }

    setIsModalOpen(false);
  };

  const filteredTiers = pricingTiers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>FINANCE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Customer Pricing</span>
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
            Customer Pricing & Rate Schedules
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure tenant pricing tiers, token markups, rate limits, overage policies, and volume discounts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn btn-primary"
          style={{ fontSize: '0.825rem' }}
        >
          <Plus size={15} /> Create Pricing Tier
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
        <Layers size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Pricing Governance:</strong> Pricing tiers define how raw provider token expenses are marked up before billing tenants.
          Changes take effect upon confirmation and apply to subsequent invoice calculation cycles.
        </span>
      </div>

      {/* Pricing Top KPI Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricCard
          title="Active Pricing Plans"
          value={pricingTiers.length.toString()}
          subtitle="Tier schedules published"
          icon={Layers}
          badgeText="Configured"
          badgeType="success"
        />
        <MetricCard
          title="Assigned Tenants"
          value="0"
          subtitle="Tenant organizations on paid tiers"
          icon={Users}
          badgeText="Pending Provisioning"
          badgeType="neutral"
        />
        <MetricCard
          title="Average Platform Markup"
          value="18.3%"
          subtitle="Target gross margin across tiers"
          icon={Percent}
          badgeText="Healthy"
          badgeType="success"
        />
        <MetricCard
          title="Custom Contract Overrides"
          value="0"
          subtitle="Tenant-specific rate agreements"
          icon={DollarSign}
          badgeText="None"
          badgeType="neutral"
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
            placeholder="Search pricing tier by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '6px 0' }}
          />
        </div>

        <span className="badge badge-neutral">{filteredTiers.length} Plans Defined</span>
      </div>

      {/* Pricing Plans Table */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tier Plan Name</th>
              <th>Monthly Token Pool</th>
              <th>Overage Rate</th>
              <th>Rate Limit Ceiling</th>
              <th>Platform Markup</th>
              <th style={{ textAlign: 'center' }}>Active Tenants</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTiers.map((tier) => (
              <tr key={tier.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tier.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {tier.description}
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{tier.monthlyPool}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{tier.overageRate}</td>
                <td>{tier.rateLimit}</td>
                <td><span className="badge badge-info">{tier.marginMarkup}</span></td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{tier.assignedTenants}</td>
                <td><span className={`badge badge-${tier.statusType}`}>{tier.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(tier)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    <Edit2 size={12} /> Edit Tier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating / Editing Pricing Tier */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? `Edit Tier: ${editingPlan.name}` : 'Create Custom Pricing Tier'}
      >
        <form onSubmit={handleSavePlan}>
          <div className="form-group">
            <label className="form-label">Tier Plan Name</label>
            <input
              type="text"
              className="form-input"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g., Enterprise Dedicated Plus"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Included Monthly Token Pool</label>
            <input
              type="text"
              className="form-input"
              value={includedTokens}
              onChange={(e) => setIncludedTokens(e.target.value)}
              placeholder="e.g., 100,000,000 tokens"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Overage Rate</label>
              <input
                type="text"
                className="form-input"
                value={overageRate}
                onChange={(e) => setOverageRate(e.target.value)}
                placeholder="e.g., $0.003 / 1k tokens"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rate Limit Ceiling</label>
              <input
                type="text"
                className="form-input"
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
                placeholder="e.g., 1200 req/min"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Platform Margin Markup</label>
            <input
              type="text"
              className="form-input"
              value={marginMarkup}
              onChange={(e) => setMarginMarkup(e.target.value)}
              placeholder="e.g., 20% platform markup"
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={15} /> Save Tier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerPricingPage;
