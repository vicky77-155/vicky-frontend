import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Terminal,
  KeyRound,
  Coins,
  BarChart3,
  Users2,
  CreditCard,
  Settings,
  Building2,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export const TenantSidebar = () => {
  const [collapsedGroups, setCollapsedGroups] = useState({
    WORKSPACE: false,
    RESOURCES: false,
    ORGANIZATION: false,
  });

  const toggleGroup = (groupName) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navSections = [
    {
      group: 'WORKSPACE',
      items: [
        { name: 'Overview', path: '/tenant', icon: LayoutDashboard, end: true },
        { name: 'Projects', path: '/tenant/projects', icon: FolderGit2 },
        { name: 'Model Playground', path: '/tenant/playground', icon: Terminal },
      ],
    },
    {
      group: 'RESOURCES',
      items: [
        { name: 'API Keys', path: '/tenant/api-keys', icon: KeyRound },
        { name: 'Quota Management', path: '/tenant/quotas', icon: Coins },
        { name: 'Usage', path: '/tenant/usage', icon: BarChart3 },
      ],
    },
    {
      group: 'ORGANIZATION',
      items: [
        { name: 'User Management', path: '/tenant/users', icon: Users2 },
        { name: 'Billing', path: '/tenant/billing', icon: CreditCard },
        { name: 'Settings', path: '/tenant/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="tenant-sidebar">
      {/* VYOMA Brand Logo */}
      <div
        style={{
          height: '72px',
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
            maxWidth: '180px',
            width: '100%',
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

      {/* Tenant Organization Context Card */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            <Building2 size={16} />
          </div>

          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              Acme AI Labs
            </div>

            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
              }}
            >
              Tenant ID: org_acme01
            </div>
          </div>
        </div>

        <NavLink
          to="/login"
          title="Switch Tenant / Login"
          aria-label="Switch Tenant / Login"
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

export default TenantSidebar;