import React, { useState } from 'react';

/**
 * Clean SVG Donut Chart with breakdown legend, percentages, and center metric
 */
export const DonutDistributionChart = ({
  data = [],
  _title = '',
  height = 200,
  unit = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const total = data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  if (!data || data.length === 0 || total === 0) {
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
        No distribution data available
      </div>
    );
  }

  // Pre-calculate SVG donut slices
  const size = 160;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const slices = data.map((item, idx) => {
    const percent = (item.value / total) * 100;
    const strokeDashoffset = circumference - (circumference * percent) / 100;
    const rotation = (cumulativePercent / 100) * 360 - 90;
    cumulativePercent += percent;

    return {
      ...item,
      percent,
      strokeDashoffset,
      rotation,
      idx,
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
      {/* SVG Donut */}
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, margin: '0 auto', flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Base background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {slices.map((slice) => {
            const isHovered = hoveredIdx === slice.idx;
            return (
              <circle
                key={slice.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${circumference * (slice.percent / 100)} ${circumference * (1 - slice.percent / 100)}`}
                strokeDashoffset={0}
                transform={`rotate(${slice.rotation} ${size / 2} ${size / 2})`}
                style={{
                  transition: 'stroke-width 0.15s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIdx(slice.idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {hoveredIdx !== null ? slices[hoveredIdx]?.label : 'Total'}
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {hoveredIdx !== null
              ? `${slices[hoveredIdx]?.percent.toFixed(1)}%`
              : `${(total > 1000000 ? `${(total / 1000000).toFixed(1)}M` : total > 1000 ? `${(total / 1000).toFixed(1)}K` : total)}`}
          </span>
        </div>
      </div>

      {/* Legend & Breakdown table */}
      <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isHovered ? 'var(--bg-app)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.1s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: item.color }} />
                <span style={{ fontSize: '0.8rem', fontWeight: isHovered ? 600 : 400, color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {item.value.toLocaleString()} {unit}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', minWidth: '40px', textAlign: 'right' }}>
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Horizontal Progress Comparison Bar
 */
export const HorizontalStatusBar = ({
  segments = [],
  height = 10,
}) => {
  const total = segments.reduce((sum, s) => sum + (s.value || 0), 0);
  if (total === 0) return null;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: '#F1F5F9',
          borderRadius: '999px',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {segments.map((s, i) => {
          const widthPct = (s.value / total) * 100;
          if (widthPct === 0) return null;
          return (
            <div
              key={i}
              style={{
                width: `${widthPct}%`,
                backgroundColor: s.color,
                transition: 'width 0.3s ease',
              }}
              title={`${s.label}: ${s.value} (${widthPct.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: s.color }} />
            <span>{s.label}: <strong style={{ color: 'var(--text-primary)' }}>{s.value.toLocaleString()}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutDistributionChart;
