import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BarChart3,
  Search,
  Download,
  Activity,
  Zap,
  Clock,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  Coins,
  Cpu,
  Server,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Percent,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import EmptyState from '../components/EmptyState';
import InteractiveLineChart from '../components/InteractiveLineChart';
import DonutDistributionChart, { HorizontalStatusBar } from '../components/DonutDistributionChart';
import UsageSkeleton from '../components/UsageSkeleton';
import { useToast } from '../components/ToastContext';
import usageApi from '../api/usageApi';

export const UsagePage = () => {
  const { showToast } = useToast();

  // Controls & Filters State
  const [timeRange, setTimeRange] = useState('24h'); // '1h' | '24h' | '7d' | '30d'
  const [selectedTenantFilter, setSelectedTenantFilter] = useState('all');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState('all');
  const [selectedModelFilter, setSelectedModelFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeViewTab, setActiveViewTab] = useState('tenants'); // 'tenants' | 'records'

  // Pagination & Sorting State for Tables
  const [tenantPage, setTenantPage] = useState(1);
  const [recordsPage, setRecordsPage] = useState(1);
  const [sortField, setSortField] = useState('timestamp');
  const [sortAsc, setSortAsc] = useState(false);
  const pageSize = 10;

  // Data & API status
  const [isLoading, setIsLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [rawSummaryData, setRawSummaryData] = useState(null);
  const [rawTimeSeriesData, setRawTimeSeriesData] = useState([]);
  const [rawTenantData, setRawTenantData] = useState([]);
  const [rawRecordsData, setRawRecordsData] = useState([]);

  // Fetch telemetry from gateway
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [summary, timeseries, tenants, records] = await Promise.allSettled([
        usageApi.getUsageSummary({ timeRange }),
        usageApi.getTimeSeries({ timeRange }),
        usageApi.getTenantUsage(),
        usageApi.getDetailedRecords(),
      ]);

      const anyFulfilled =
        summary.status === 'fulfilled' ||
        timeseries.status === 'fulfilled' ||
        tenants.status === 'fulfilled' ||
        records.status === 'fulfilled';

      if (anyFulfilled) {
        setApiConnected(true);
        if (summary.status === 'fulfilled') setRawSummaryData(summary.value);
        if (timeseries.status === 'fulfilled') setRawTimeSeriesData(timeseries.value || []);
        if (tenants.status === 'fulfilled') setRawTenantData(tenants.value || []);
        if (records.status === 'fulfilled') setRawRecordsData(records.value || []);
      } else {
        setApiConnected(false);
      }
    } catch {
      setApiConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Export CSV
  const handleExportCsv = () => {
    if (!apiConnected || rawRecordsData.length === 0) {
      showToast('Export initiated: 0 records currently stored in gateway ledger.');
      return;
    }
    const headers = ['Request ID', 'Timestamp', 'Tenant', 'Project', 'Provider', 'Model', 'Input Tokens', 'Output Tokens', 'Total Tokens', 'Status', 'Latency'];
    const rows = rawRecordsData.map((r) => [
      r.requestId,
      r.timestamp,
      r.tenant,
      r.project,
      r.provider,
      r.model,
      r.inputTokens,
      r.outputTokens,
      r.totalTokens,
      r.status,
      r.latency,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vyoma-usage-records-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported usage records CSV.');
  };

  // Filter and sort Tenant Usage
  const filteredTenants = useMemo(() => {
    if (!rawTenantData || rawTenantData.length === 0) return [];
    return rawTenantData.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        (item.tenant && item.tenant.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.project && item.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.model && item.model.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTenant = selectedTenantFilter === 'all' || item.tenant === selectedTenantFilter;
      const matchProvider = selectedProviderFilter === 'all' || item.provider === selectedProviderFilter;
      const matchModel = selectedModelFilter === 'all' || item.model === selectedModelFilter;

      return matchSearch && matchTenant && matchProvider && matchModel;
    });
  }, [rawTenantData, searchQuery, selectedTenantFilter, selectedProviderFilter, selectedModelFilter]);

  // Filter and sort Detailed Records
  const filteredRecords = useMemo(() => {
    if (!rawRecordsData || rawRecordsData.length === 0) return [];
    return rawRecordsData
      .filter((rec) => {
        const matchSearch =
          searchQuery === '' ||
          (rec.requestId && rec.requestId.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (rec.tenant && rec.tenant.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (rec.model && rec.model.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchTenant = selectedTenantFilter === 'all' || rec.tenant === selectedTenantFilter;
        const matchProvider = selectedProviderFilter === 'all' || rec.provider === selectedProviderFilter;
        const matchModel = selectedModelFilter === 'all' || rec.model === selectedModelFilter;

        return matchSearch && matchTenant && matchProvider && matchModel;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [rawRecordsData, searchQuery, selectedTenantFilter, selectedProviderFilter, selectedModelFilter, sortField, sortAsc]);

  // Paginated records
  const paginatedTenants = useMemo(() => {
    const start = (tenantPage - 1) * pageSize;
    return filteredTenants.slice(start, start + pageSize);
  }, [filteredTenants, tenantPage]);

  const paginatedRecords = useMemo(() => {
    const start = (recordsPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, recordsPage]);

  // Metric summaries safely derived from backend response or marked as pending
  const totalRequestsFormatted = rawSummaryData?.totalRequests != null ? rawSummaryData.totalRequests.toLocaleString() : 'Not available yet';
  const totalTokensFormatted = rawSummaryData?.totalTokens != null ? rawSummaryData.totalTokens.toLocaleString() : 'Not available yet';
  const inputTokensFormatted = rawSummaryData?.inputTokens != null ? rawSummaryData.inputTokens.toLocaleString() : 'Not available yet';
  const outputTokensFormatted = rawSummaryData?.outputTokens != null ? rawSummaryData.outputTokens.toLocaleString() : 'Not available yet';
  const costFormatted = rawSummaryData?.estimatedCost != null ? `$${rawSummaryData.estimatedCost.toFixed(4)}` : 'Not available yet';
  const errorRateFormatted = rawSummaryData?.errorRate != null ? `${(rawSummaryData.errorRate * 100).toFixed(2)}%` : 'Not available yet';

  // Toggle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>FINANCE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Usage & Metering</span>
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
            Usage & Metering
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            High-density token consumption, request traffic, latency percentiles, and granular gateway invocation telemetry.
          </p>
        </div>

        {/* Global Toolbar: Time Window Selector + Refresh + Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px',
            }}
          >
            {[
              { id: '1h', label: '1H' },
              { id: '24h', label: '24H' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeRange(t.id)}
                style={{
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: timeRange === t.id ? 600 : 500,
                  borderRadius: '4px',
                  backgroundColor: timeRange === t.id ? 'var(--primary)' : 'transparent',
                  color: timeRange === t.id ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchData}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="Refresh Usage Telemetry"
          >
            <RefreshCw size={13} className={isLoading ? 'spin' : ''} /> Refresh
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Backend Metering Architecture Note */}
      <div
        style={{
          backgroundColor: 'var(--blue-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Activity size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Telemetry Engine:</strong> Gateway usage telemetry connects via <code>/api/v1/usage</code> and Prometheus metrics scrapers.
          Zero mock metrics are rendered; when live gateway requests are dispatched, metrics aggregate automatically.
        </span>
      </div>

      {isLoading ? (
        <UsageSkeleton />
      ) : (
        <>
          {/* Top Metric Cards (6 KPI Grid) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))',
              gap: '14px',
              marginBottom: '24px',
            }}
          >
            <MetricCard
              title="Total Requests"
              value={totalRequestsFormatted}
              subtitle="Metered HTTP API calls"
              icon={TrendingUp}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
            <MetricCard
              title="Total Tokens"
              value={totalTokensFormatted}
              subtitle="Cumulative platform throughput"
              icon={Zap}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
            <MetricCard
              title="Input Tokens"
              value={inputTokensFormatted}
              subtitle="Prompts submitted by tenants"
              icon={Coins}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
            <MetricCard
              title="Output Tokens"
              value={outputTokensFormatted}
              subtitle="Completions generated by models"
              icon={Cpu}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
            <MetricCard
              title="Estimated Provider Cost"
              value={costFormatted}
              subtitle="Raw upstream token expenses"
              icon={Server}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
            <MetricCard
              title="Error Rate"
              value={errorRateFormatted}
              subtitle="Failed / rate-limited upstream"
              icon={Percent}
              badgeText={apiConnected ? 'Active' : 'Standby'}
              badgeType={apiConnected ? 'success' : 'neutral'}
            />
          </div>

          {/* Section 4: Analytics and Charts Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            {/* Chart A: Token Consumption Over Time */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <div className="card-title" style={{ fontSize: '0.9rem' }}>Token Consumption Over Time</div>
                  <div className="card-subtitle">Input versus output token throughput ({timeRange.toUpperCase()})</div>
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Time-Series Aggregation</span>
              </div>

              {rawTimeSeriesData.length > 0 ? (
                <InteractiveLineChart
                  data={rawTimeSeriesData}
                  series={[
                    { key: 'inputTokens', name: 'Input Tokens', color: '#2563EB' },
                    { key: 'outputTokens', name: 'Output Tokens', color: '#0284C7' },
                  ]}
                  height={220}
                  xAxisKey="timestamp"
                  unit="tokens"
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '36px 20px',
                    textAlign: 'center',
                  }}
                >
                  <EmptyState
                    icon={BarChart3}
                    title="No time-series token records"
                    description={`No prompt or completion tokens have been processed within the last ${timeRange}. New gateway requests will generate metrics here automatically.`}
                    statusBadge="Awaiting Invocations"
                  />
                </div>
              )}
            </div>

            {/* Chart D: Provider & Model Token Distribution */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <div className="card-title" style={{ fontSize: '0.9rem' }}>Provider Token Share</div>
                  <div className="card-subtitle">Volume distribution across enabled upstream engines</div>
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Upstream Distribution</span>
              </div>

              {rawSummaryData?.providerBreakdown?.length > 0 ? (
                <DonutDistributionChart
                  data={rawSummaryData.providerBreakdown}
                  unit="tokens"
                  height={220}
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '36px 20px',
                    textAlign: 'center',
                  }}
                >
                  <EmptyState
                    icon={Layers}
                    title="No provider distribution available"
                    description="Provider volume metrics will register once gateway proxy routes receive traffic."
                    statusBadge="Standby"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 4 continued: Request Traffic, Latency Percentiles & Status Rates */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {/* Chart C: Latency & Performance Percentiles */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div className="card-title" style={{ fontSize: '0.9rem' }}>Response Latency Benchmarks</div>
                  <div className="card-subtitle">End-to-end gateway execution and upstream TTFT</div>
                </div>
                <Clock size={16} color="var(--primary)" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Average</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {rawSummaryData?.latencyAvg != null ? `${rawSummaryData.latencyAvg} ms` : 'Not available yet'}
                  </div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>P50 (Median)</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {rawSummaryData?.latencyP50 != null ? `${rawSummaryData.latencyP50} ms` : 'Not available yet'}
                  </div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>P95</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {rawSummaryData?.latencyP95 != null ? `${rawSummaryData.latencyP95} ms` : 'Not available yet'}
                  </div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>P99</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {rawSummaryData?.latencyP99 != null ? `${rawSummaryData.latencyP99} ms` : 'Not available yet'}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Percentiles represent time from initial client request receipt until downstream socket completion.
              </div>
            </div>

            {/* Chart E: Request Status & Error Breakdown */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div className="card-title" style={{ fontSize: '0.9rem' }}>Request Status & Reliability</div>
                  <div className="card-subtitle">Proportion of successful vs failed requests</div>
                </div>
                <Activity size={16} color="var(--primary)" />
              </div>

              {rawSummaryData?.statusBreakdown?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <HorizontalStatusBar segments={rawSummaryData.statusBreakdown} height={12} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <CheckCircle2 size={16} color="var(--success)" />
                      <span>200 OK: <strong>{rawSummaryData.statusBreakdown[0]?.value || 0}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <AlertCircle size={16} color="var(--warning)" />
                      <span>429 Rate Limit: <strong>{rawSummaryData.statusBreakdown[1]?.value || 0}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <XCircle size={16} color="var(--danger)" />
                      <span>5xx Error: <strong>{rawSummaryData.statusBreakdown[2]?.value || 0}</strong></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-muted)',
                    fontSize: '0.825rem',
                  }}
                >
                  <CheckCircle2 size={24} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
                  <div>No invocation errors or failures registered</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-secondary)' }}>
                    All downstream invocations will be classified by HTTP status code.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5 & 6: Data Tables with Tab Selector, Search, Filter & Pagination */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Table Header Controls */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Tab Selector: Tenant Usage vs Detailed Records */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveViewTab('tenants')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    backgroundColor: activeViewTab === 'tenants' ? 'var(--primary-light)' : 'transparent',
                    color: activeViewTab === 'tenants' ? 'var(--primary)' : 'var(--text-secondary)',
                    border: activeViewTab === 'tenants' ? '1px solid var(--primary-border)' : '1px solid transparent',
                  }}
                >
                  Tenant Usage Aggregation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveViewTab('records')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    backgroundColor: activeViewTab === 'records' ? 'var(--primary-light)' : 'transparent',
                    color: activeViewTab === 'records' ? 'var(--primary)' : 'var(--text-secondary)',
                    border: activeViewTab === 'records' ? '1px solid var(--primary-border)' : '1px solid transparent',
                  }}
                >
                  Detailed Invocations Log
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search tenant, model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ height: '34px', paddingLeft: '32px', fontSize: '0.8rem' }}
                  />
                </div>

                {/* Tenant Filter */}
                <select
                  className="form-input"
                  value={selectedTenantFilter}
                  onChange={(e) => setSelectedTenantFilter(e.target.value)}
                  style={{ height: '34px', padding: '4px 8px', fontSize: '0.8rem', width: '130px' }}
                >
                  <option value="all">All Tenants</option>
                  <option value="Acme Corp">Acme Corp</option>
                  <option value="FinTech Global">FinTech Global</option>
                  <option value="HealthAI Labs">HealthAI Labs</option>
                </select>

                {/* Provider Filter */}
                <select
                  className="form-input"
                  value={selectedProviderFilter}
                  onChange={(e) => setSelectedProviderFilter(e.target.value)}
                  style={{ height: '34px', padding: '4px 8px', fontSize: '0.8rem', width: '120px' }}
                >
                  <option value="all">All Providers</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="OpenAI">OpenAI</option>
                  <option value="Meta">Meta</option>
                  <option value="Mistral AI">Mistral AI</option>
                </select>

                {/* Model Filter */}
                <select
                  className="form-input"
                  value={selectedModelFilter}
                  onChange={(e) => setSelectedModelFilter(e.target.value)}
                  style={{ height: '34px', padding: '4px 8px', fontSize: '0.8rem', width: '130px' }}
                >
                  <option value="all">All Models</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="Llama 3.3 70B">Llama 3.3 70B</option>
                  <option value="Mistral Large 2">Mistral Large 2</option>
                </select>
              </div>
            </div>

            {/* TAB 1: Tenant Usage Table */}
            {activeViewTab === 'tenants' && (
              <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('tenant')} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Tenant <ArrowUpDown size={12} />
                        </div>
                      </th>
                      <th>Project</th>
                      <th>Provider</th>
                      <th>Model</th>
                      <th style={{ textAlign: 'right' }}>Requests</th>
                      <th style={{ textAlign: 'right' }}>Input Tokens</th>
                      <th style={{ textAlign: 'right' }}>Output Tokens</th>
                      <th style={{ textAlign: 'right' }}>Total Tokens</th>
                      <th style={{ textAlign: 'right' }}>Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTenants.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ padding: 0 }}>
                          <EmptyState
                            icon={BarChart3}
                            title="No tenant usage recorded"
                            description="Live usage metering records, tenant token allocations, and cost metrics will populate once proxy requests are processed."
                            statusBadge="No Usage Data"
                          />
                        </td>
                      </tr>
                    ) : (
                      paginatedTenants.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{row.tenant}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{row.project}</td>
                          <td><span className="badge badge-neutral">{row.provider}</span></td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.model}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{row.requests.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{row.inputTokens.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{row.outputTokens.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{row.totalTokens.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            {row.cost != null ? `$${row.cost.toFixed(4)}` : 'Not available yet'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: Detailed Usage Records */}
            {activeViewTab === 'records' && (
              <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('timestamp')} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Timestamp <ArrowUpDown size={12} />
                        </div>
                      </th>
                      <th>Request ID</th>
                      <th>Tenant</th>
                      <th>Project</th>
                      <th>Provider / Model</th>
                      <th style={{ textAlign: 'right' }}>Input</th>
                      <th style={{ textAlign: 'right' }}>Output</th>
                      <th style={{ textAlign: 'right' }}>Total</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Latency</th>
                      <th style={{ textAlign: 'right' }}>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRecords.length === 0 ? (
                      <tr>
                        <td colSpan={11} style={{ padding: 0 }}>
                          <EmptyState
                            icon={Activity}
                            title="No detailed invocation records"
                            description="Granular event stream logs, request IDs, token breakdowns, and response latencies will display as requests are handled."
                            statusBadge="No Records"
                          />
                        </td>
                      </tr>
                    ) : (
                      paginatedRecords.map((rec) => (
                        <tr key={rec.requestId}>
                          <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{rec.timestamp}</td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--primary)' }}>
                            {rec.requestId.slice(0, 12)}...
                          </td>
                          <td style={{ fontWeight: 500 }}>{rec.tenant}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{rec.project}</td>
                          <td style={{ fontSize: '0.8rem' }}>{rec.model}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{rec.inputTokens.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{rec.outputTokens.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{rec.totalTokens.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${rec.status === 200 ? 'badge-success' : 'badge-danger'}`}>
                              {rec.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{rec.latency} ms</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                            {rec.cost != null ? `$${rec.cost.toFixed(4)}` : 'Not available yet'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table Pagination Footer */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Showing{' '}
                <strong>
                  {activeViewTab === 'tenants'
                    ? filteredTenants.length === 0 ? 0 : (tenantPage - 1) * pageSize + 1
                    : filteredRecords.length === 0 ? 0 : (recordsPage - 1) * pageSize + 1}
                </strong>{' '}
                to{' '}
                <strong>
                  {activeViewTab === 'tenants'
                    ? Math.min(tenantPage * pageSize, filteredTenants.length)
                    : Math.min(recordsPage * pageSize, filteredRecords.length)}
                </strong>{' '}
                of{' '}
                <strong>
                  {activeViewTab === 'tenants' ? filteredTenants.length : filteredRecords.length}
                </strong>{' '}
                entries
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  disabled={activeViewTab === 'tenants' ? tenantPage <= 1 : recordsPage <= 1}
                  onClick={() => {
                    if (activeViewTab === 'tenants') setTenantPage((p) => Math.max(p - 1, 1));
                    else setRecordsPage((p) => Math.max(p - 1, 1));
                  }}
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  disabled={
                    activeViewTab === 'tenants'
                      ? tenantPage * pageSize >= filteredTenants.length
                      : recordsPage * pageSize >= filteredRecords.length
                  }
                  onClick={() => {
                    if (activeViewTab === 'tenants') setTenantPage((p) => p + 1);
                    else setRecordsPage((p) => p + 1);
                  }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsagePage;
