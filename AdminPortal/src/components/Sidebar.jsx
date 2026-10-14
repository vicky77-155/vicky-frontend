import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Coins,
  Cpu,
  Terminal,
  KeyRound,
  CreditCard,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Receipt,
  BarChart3,
  FileText,
  Layers,
} from 'lucide-react';

export const Sidebar = () => {
  const [collapsedGroups, setCollapsedGroups] = useState({
    PLATFORM: false,
    RESOURCES: false,
    FINANCE: false,
    ADMINISTRATION: false,
  });

  const toggleGroup = (groupName) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navSections = [
    {
      group: 'PLATFORM',
      items: [
        { name: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
        { name: 'Tenant Management', path: '/admin/tenants', icon: Users },
        { name: 'Model Registry', path: '/admin/models', icon: Cpu },
        { name: 'AI Playground', path: '/admin/playground', icon: Terminal },
      ],
    },
    {
      group: 'RESOURCES',
      items: [
        {
          name: 'Token Pool & Allocations',
          path: '/admin/token-pool',
          icon: Coins,
        },
        { name: 'API Keys', path: '/admin/api-keys', icon: KeyRound },
      ],
    },
    {
      group: 'FINANCE',
      items: [
        {
          name: 'Billing Overview',
          path: '/admin/billing',
          icon: CreditCard,
          end: true,
        },
        {
          name: 'Provider Costs',
          path: '/admin/billing/provider-costs',
          icon: DollarSign,
        },
        {
          name: 'Customer Pricing',
          path: '/admin/billing/customer-pricing',
          icon: Layers,
        },
        {
          name: 'Invoices',
          path: '/admin/billing/invoices',
          icon: Receipt,
        },
        {
          name: 'Usage & Metering',
          path: '/admin/usage',
          icon: BarChart3,
        },
      ],
    },
    {
      group: 'ADMINISTRATION',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: Settings },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileText },
      ],
    },
  ];

  return (
    <aside className="console-sidebar">
      {/* VYOMA Brand Logo */}
      <div
        style={{
          height: '72px',
          minHeight: '72px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid var(--border-card)',
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        <img
          src="/images/vyoma-logo.png"
          alt="VYOMA"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '180px',
            height: '48px',
            objectFit: 'contain',
            objectPosition: 'left center',
          }}
        />
      </div>

      {/* Grouped Navigation Links */}
      <nav
        style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
        }}
      >
        {navSections.map((section) => {
          const isCollapsed = collapsedGroups[section.group];

          return (
            <div key={section.group}>
              <div
                className="sidebar-group-header"
                onClick={() => toggleGroup(section.group)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleGroup(section.group);
                  }
                }}
              >
                <span>{section.group}</span>

                {isCollapsed ? (
                  <ChevronRight size={13} />
                ) : (
                  <ChevronDown size={13} />
                )}
              </div>

              {!isCollapsed && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    marginTop: '4px',
                  }}
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        style={({ isActive }) => ({
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.84rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive
                            ? 'var(--primary)'
                            : 'var(--text-primary)',
                          backgroundColor: isActive
                            ? 'var(--primary-light)'
                            : 'transparent',
                          borderLeft: isActive
                            ? '3px solid var(--primary)'
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                          textDecoration: 'none',
                        })}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
          >
            <ShieldAlert size={16} />
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              Root Admin
            </div>

            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
              }}
            >
              admin@vyoma.ai
            </div>
          </div>
        </div>

        <NavLink
          to="/login"
          title="Switch / Re-login"
          style={{
            color: 'var(--text-secondary)',
            padding: '6px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LogOut size={16} />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;