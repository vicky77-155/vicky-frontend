import React, { useState } from 'react';

/**
 * Clean SVG-based multi-series line chart with grid, smooth area fills, points, and interactive tooltip
 */
export const InteractiveLineChart = ({
  data = [],
  series = [
    { key: 'inputTokens', name: 'Input Tokens', color: '#2563EB' },
    { key: 'outputTokens', name: 'Output Tokens', color: '#0284C7' },
  ],
  height = 240,
  yAxisFormatter = (val) => val.toLocaleString(),
  xAxisKey = 'label',
  unit = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        No time-series data available for this range
      </div>
    );
  }

  const padding = { top: 20, right: 24, bottom: 32, left: 56 };
  const width = 640;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Calculate global max across all series
  const allValues = data.flatMap((d) => series.map((s) => Number(d[s.key]) || 0));
  const maxVal = Math.max(...allValues, 10);
  // Nice round max
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal)));
  const yMax = Math.ceil(maxVal / magnitude) * magnitude || 100;

  const getX = (index) => padding.left + (index / (data.length - 1 || 1)) * innerWidth;
  const getY = (val) => padding.top + innerHeight - (val / yMax) * innerHeight;

  // Generate grid ticks
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: `${height}px`, overflow: 'visible', display: 'block' }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          {series.map((s) => (
            <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
            </linearGradient>
          ))}
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map((tick, i) => {
          const y = getY(tick);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={i === 0 ? 'none' : '3 3'}
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#94A3B8"
                fontFamily="var(--font-mono)"
              >
                {yAxisFormatter(tick)}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
          // Render every nth label depending on density
          const step = Math.ceil(data.length / 7);
          if (i % step !== 0 && i !== data.length - 1) return null;
          const x = getX(i);
          return (
            <text
              key={i}
              x={x}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#64748B"
            >
              {d[xAxisKey]}
            </text>
          );
        })}

        {/* Area and Line for each series */}
        {series.map((s) => {
          const points = data.map((d, i) => ({ x: getX(i), y: getY(d[s.key] || 0) }));
          const linePath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
          const areaPath = `${linePath} L ${points[points.length - 1].x} ${getY(0)} L ${points[0].x} ${getY(0)} Z`;

          return (
            <g key={s.key}>
              <path d={areaPath} fill={`url(#grad-${s.key})`} />
              <path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {data.map((d, i) => {
                const p = points[i];
                const isHovered = hoverIndex === i;
                return (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 5 : 3}
                    fill="#FFFFFF"
                    stroke={s.color}
                    strokeWidth={isHovered ? 2.5 : 1.8}
                    style={{ transition: 'r 0.15s ease' }}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Vertical hover crosshair & trigger regions */}
        {data.map((_, i) => {
          const x = getX(i);
          const stepWidth = innerWidth / (data.length - 1 || 1);
          return (
            <rect
              key={i}
              x={x - stepWidth / 2}
              y={padding.top}
              width={stepWidth}
              height={innerHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverIndex(i)}
            />
          );
        })}

        {hoverIndex !== null && (
          <line
            x1={getX(hoverIndex)}
            y1={padding.top}
            x2={getX(hoverIndex)}
            y2={padding.top + innerHeight}
            stroke="#2563EB"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            pointerEvents="none"
          />
        )}
      </svg>

      {/* Floating Tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: `${Math.min(Math.max(getX(hoverIndex) / width * 100, 15), 85)}%`,
            transform: 'translateX(-50%)',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            padding: '8px 12px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 10,
            minWidth: '150px',
          }}
        >
          <div style={{ fontWeight: 600, borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '6px' }}>
            {data[hoverIndex][xAxisKey]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {series.map((s) => (
              <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: s.color }} />
                  {s.name}:
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {(data[hoverIndex][s.key] || 0).toLocaleString()} {unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        {series.map((s) => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            <span style={{ width: '10px', height: '3px', borderRadius: '2px', backgroundColor: s.color }} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLineChart;
