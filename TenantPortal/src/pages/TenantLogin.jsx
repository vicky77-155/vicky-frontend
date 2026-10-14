import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Info, AlertCircle, Building2 } from 'lucide-react';
import HealthStatusBadge from '../components/HealthStatusBadge';

export const TenantLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid organization email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    // UI authentication notice
    setTimeout(() => {
      setIsLoading(false);
      setInfoMessage(
        'Authentication is currently in preview mode. You may proceed to explore the Tenant Portal UI below.'
      );
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Top Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: '#2563EB',
          zIndex: 2,
        }}
      />

      {/* System Health Status Probe */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          zIndex: 3,
        }}
      >
        <HealthStatusBadge />
      </div>

      {/* Main Login Layout Grid */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '72px 32px 40px',
        }}
      >
        <div
          className="tenant-login-layout"
          style={{
            width: '100%',
            maxWidth: '1120px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            alignItems: 'center',
            gap: '64px',
          }}
        >
          {/* Left: VYOMA Branding & Platform Information */}
          <section
            className="tenant-login-brand"
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <img
              src="/images/vyoma-logo.png"
              alt="VYOMA"
              style={{
                display: 'block',
                width: '190px',
                maxWidth: '100%',
                height: '64px',
                objectFit: 'contain',
                objectPosition: 'left center',
                marginBottom: '32px',
              }}
            />

            <h1
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.045em',
                fontWeight: 750,
                color: '#172033',
                marginBottom: '16px',
              }}
            >
              Developer access.
              <br />
              <span style={{ color: '#2563EB' }}>
                Multi-model gateway.
              </span>
            </h1>

            <p
              style={{
                maxWidth: '430px',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#64748B',
                marginBottom: '28px',
              }}
            >
              Access your tenant API keys, monitor metered token quotas, test prompts in the AI playground, and track consumption across workspace projects.
            </p>

            {/* Login Banner Illustration */}
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src="/images/vyoma-login-banner.png"
                alt="VYOMA Token Gateway Workspace"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '24px',
                color: '#64748B',
                fontSize: '0.82rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#2563EB',
                  flexShrink: 0,
                }}
              />
              Multi-tenant isolated workspace &amp; token routing
            </div>
          </section>

          {/* Right: Login Card */}
          <section
            style={{
              width: '100%',
              maxWidth: '440px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Form Heading */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: '18px',
                  }}
                >
                  <Building2 size={14} />
                  TENANT &amp; DEVELOPER WORKSPACE
                </div>

                <h2
                  aria-label="Organization Sign In"
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    letterSpacing: '-0.035em',
                    color: '#172033',
                    marginBottom: '8px',
                  }}
                >
                  Organization Sign In
                </h2>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: '#64748B',
                  }}
                >
                  Sign in to manage your tenant API keys, quota balance, and AI sandbox.
                </p>
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <div
                  role="alert"
                  style={{
                    backgroundColor: 'var(--danger-bg)',
                    border: '1px solid var(--danger-border)',
                    color: 'var(--danger)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Preview Information Notice */}
              {infoMessage && (
                <div
                  role="status"
                  style={{
                    backgroundColor: 'var(--info-bg)',
                    border: '1px solid var(--info-border)',
                    color: 'var(--info)',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    marginBottom: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <Info size={16} />
                    Notice
                  </div>

                  <p
                    style={{
                      color: '#172033',
                      lineHeight: 1.6,
                    }}
                  >
                    {infoMessage}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate('/tenant')}
                    className="btn btn-primary"
                    style={{
                      marginTop: '4px',
                      fontSize: '0.82rem',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    Enter Tenant Workspace
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label
                    className="form-label"
                    htmlFor="tenant-email-input"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#334155',
                      fontWeight: 600,
                    }}
                  >
                    Organization Email
                  </label>

                  <input
                    id="tenant-email-input"
                    type="email"
                    className="form-input"
                    placeholder="developer@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <label
                      className="form-label"
                      htmlFor="tenant-password-input"
                      style={{
                        marginBottom: 0,
                        color: '#334155',
                        fontWeight: 600,
                      }}
                    >
                      Password
                    </label>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      id="tenant-password-input"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your organization password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      style={{
                        width: '100%',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                        paddingRight: '44px',
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '46px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Connecting...' : 'Sign In to Workspace'}
                </button>
              </form>

              {/* Direct Workspace Preview Link */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #F1F5F9',
                  textAlign: 'center',
                }}
              >
                <Link
                  to="/tenant"
                  style={{
                    fontSize: '0.825rem',
                    color: '#2563EB',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Direct Workspace Preview
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bottom Security Note */}
            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '0.78rem',
                color: '#64748B',
              }}
            >
              Enterprise-grade token management &amp; quota enforcement
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '20px 32px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          fontSize: '0.8rem',
          color: '#64748B',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>VYOMA TOKEN GATEWAY &bull; Multi-Tenant Developer Workspace</div>
        <div>Active Environment: Production Sandbox</div>
      </footer>
    </div>
  );
};

export default TenantLogin;
