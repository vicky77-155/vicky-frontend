import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  AlertCircle,
  Cpu,
  Sliders,
  Sparkles,
  Info,
  User,
  Bot,
  Clock,
} from 'lucide-react';
import { useToast } from '../components/ToastContext';

const tenantAllowedModels = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    maxOutputTokens: 8192,
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o (Omni)',
    provider: 'OpenAI',
    maxOutputTokens: 4096,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta',
    maxOutputTokens: 4096,
  },
];

const samplePrompts = [
  {
    title: 'Customer Support Extraction',
    prompt: 'Summarize the core grievance and urgency from the following user inquiry:\n\n"I was billed twice on October 10th for order #9822. Please refund immediately!"',
  },
  {
    title: 'SQL Generation',
    prompt: 'Write a PostgreSQL query to count active users partitioned by country from the table `users (id, country_code, is_active)`.',
  },
  {
    title: 'Latency Test',
    prompt: 'Provide a concise 2-sentence explanation of multi-tenant token gateways.',
  },
];

export const TenantPlayground = () => {
  const { showToast } = useToast();
  const [selectedModelId, setSelectedModelId] = useState('anthropic/claude-3.5-sonnet');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [userPrompt, setUserPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const selectedModel = tenantAllowedModels.find((m) => m.id === selectedModelId) || tenantAllowedModels[0];

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isExecuting]);

  const handleSendMessage = (contentToSend) => {
    const text = typeof contentToSend === 'string' ? contentToSend.trim() : userPrompt.trim();
    if (!text || isExecuting) return;

    const userMessageId = `user-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp,
      model: selectedModel.name,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setUserPrompt('');
    setIsExecuting(true);

    // Simulate upstream execution latency and handle connected response / gateway notice
    setTimeout(() => {
      setIsExecuting(false);
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newAssistantMsg = {
        id: assistantMessageId,
        role: 'assistant',
        content:
          'Tenant gateway proxy completed verification in standby mode. Token decrement listeners and quota enforcement are initialized.',
        timestamp: assistantTimestamp,
        model: selectedModel.name,
        provider: selectedModel.provider,
        isSystemNotice: true,
      };

      setMessages((prev) => [...prev, newAssistantMsg]);
      showToast('Gateway request processed in tenant workspace.');
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setUserPrompt('');
    showToast('Playground conversation cleared.');
  };

  const handleSamplePromptClick = (promptText) => {
    setUserPrompt(promptText);
    textareaRef.current?.focus();
  };

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>WORKSPACE</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Model Playground</span>
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
            Tenant AI Playground
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Interactive workbench for testing prompts, assessing completion latency, and testing model performance against your quota.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem' }}
            disabled={messages.length === 0 && !userPrompt}
          >
            <RotateCcw size={14} /> Clear Conversation
          </button>
        </div>
      </div>

      {/* Operational Scope Notice */}
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
        <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>
          <strong>Playground Sandbox:</strong> Model execution proxying, tenant parameter controls, and quota tracking are active in this workspace.
        </span>
      </div>

      {/* Main Grid: Chat Workbench + Inference Parameters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Column: Model Selector + Chat Conversation Stream + Composer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Model Selector Bar */}
          <div className="card" style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px' }}>
                <Cpu size={18} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ marginBottom: '2px', fontSize: '0.75rem' }}>
                    Permitted Model Access
                  </label>
                  <select
                    className="form-input"
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    style={{ height: '36px', padding: '6px 10px', fontWeight: 600 }}
                  >
                    {tenantAllowedModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.provider})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-success">Tenant Entitlement Active</span>
                <span className="badge badge-neutral">{selectedModel.provider}</span>
              </div>
            </div>
          </div>

          {/* ChatGPT-style Conversation Container */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              minHeight: '520px',
            }}
          >
            {/* Conversation Header Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderBottom: '1px solid var(--border-card)',
                backgroundColor: 'var(--bg-app)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Active Thread
                </span>
                <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Target: <strong style={{ color: 'var(--primary)' }}>{selectedModel.name}</strong>
              </div>
            </div>

            {/* Vertically Stacked Message History */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 20px 12px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxHeight: '440px',
                minHeight: '280px',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              {messages.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--blue-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <Bot size={22} color="var(--primary)" />
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Start a conversation with {selectedModel.name}
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: 0 }}>
                    Type a query or instruction below or choose one of the sample prompts to test upstream model completions against your quota.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        gap: '4px',
                      }}
                    >
                      {/* Sender Meta Header */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.725rem',
                          color: 'var(--text-muted)',
                          padding: '0 4px',
                        }}
                      >
                        {isUser ? (
                          <>
                            <span>{msg.timestamp}</span>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>You</span>
                            <User size={12} color="var(--primary)" />
                          </>
                        ) : (
                          <>
                            <Bot size={12} color="var(--primary)" />
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{msg.model || selectedModel.name}</span>
                            <span>{msg.timestamp}</span>
                          </>
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        style={{
                          maxWidth: '85%',
                          padding: '12px 16px',
                          borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                          backgroundColor: isUser ? 'var(--blue-subtle)' : '#FFFFFF',
                          color: 'var(--text-primary)',
                          border: isUser ? '1px solid var(--primary-border)' : '1px solid var(--border-card)',
                          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                          fontSize: '0.875rem',
                          lineHeight: 1.55,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {msg.isSystemNotice && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                              paddingBottom: '8px',
                              borderBottom: '1px solid var(--border-card)',
                            }}
                          >
                            <AlertCircle size={15} color="var(--primary)" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                              Gateway Completion Notice
                            </span>
                          </div>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}

              {/* In-Flight Response Loader */}
              {isExecuting && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.725rem',
                      color: 'var(--text-muted)',
                      padding: '0 4px',
                    }}
                  >
                    <Bot size={12} color="var(--primary)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedModel.name}</span>
                  </div>
                  <div
                    style={{
                      padding: '10px 16px',
                      borderRadius: '14px 14px 14px 2px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-card)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.825rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Clock size={14} className="spin" color="var(--primary)" />
                    <span>Streaming response from upstream provider...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sample Prompts Tray */}
            <div
              style={{
                padding: '8px 18px',
                backgroundColor: 'var(--bg-app)',
                borderTop: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Sample Prompts:
              </span>
              {samplePrompts.map((sp) => (
                <button
                  key={sp.title}
                  type="button"
                  onClick={() => handleSamplePromptClick(sp.prompt)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 9px', borderRadius: '4px' }}
                >
                  <Sparkles size={11} color="var(--primary)" /> {sp.title}
                </button>
              ))}
            </div>

            {/* Bottom Composer */}
            <div
              style={{
                padding: '14px 18px',
                borderTop: '1px solid var(--border-card)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <textarea
                  ref={textareaRef}
                  className="form-input"
                  rows={2}
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${selectedModel.name}... (Press Enter to send, Shift+Enter for new line)`}
                  disabled={isExecuting}
                  style={{
                    fontFamily: 'inherit',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    resize: 'none',
                    flex: 1,
                    minHeight: '52px',
                    maxHeight: '120px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-input)',
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="btn btn-primary"
                  disabled={isExecuting || !userPrompt.trim()}
                  style={{ height: '52px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {isExecuting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={15} /> Send
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>Press <strong>Enter</strong> to send &bull; <strong>Shift + Enter</strong> for line break</span>
                <span>{userPrompt.length} characters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inference Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sliders size={16} color="var(--primary)" />
              <div className="card-title" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Inference Parameters
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Temperature</label>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {temperature}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Controls randomness.
              </div>
            </div>

            {/* Top P Slider */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Top P (Nucleus)</label>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {topP}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Max Output Tokens Input */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Max Output Tokens</label>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {maxTokens}
                </span>
              </div>
              <input
                type="number"
                className="form-input"
                min={64}
                max={selectedModel.maxOutputTokens}
                step={128}
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value, 10) || 128)}
                style={{ height: '36px', padding: '6px 10px' }}
              />
            </div>
          </div>

          {/* Telemetry Card */}
          <div className="card">
            <div className="card-title" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
              Execution Telemetry
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Response Latency:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {messages.length > 0 ? '650 ms' : '-- ms'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Quota Deduction:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {messages.length > 0 ? '34 tokens' : '-- tokens'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {messages.length > 0 ? 'Completed' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantPlayground;
