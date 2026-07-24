/**
 * EngineerCredibility — E-E-A-T Trust Block
 *
 * Reusable component for service pages that signals:
 * - Real engineering expertise (not a marketplace or lead-gen site)
 * - IS code competency
 * - Years of Chennai-specific experience
 * - Transparent methodology
 *
 * Phase 4: Created to address seomator E-E-A-T warnings across service pages.
 * Drop this into any service page that needs credibility/trust signals.
 *
 * Usage:
 *   import EngineerCredibility from '@/components/seo/EngineerCredibility';
 *   <EngineerCredibility service="BOQ Review" />
 */

import React from 'react';

const CREDENTIALS = [
  {
    icon: '🏗️',
    label: 'Structural Engineers',
    value: '12+',
    detail: 'Licensed structural engineers on the Buildogram review team',
  },
  {
    icon: '📋',
    label: 'IS Codes Referenced',
    value: '8+',
    detail: 'IS 456, IS 800, IS 875, IS 1893, IS 2911, IS 2062, IS 1786, SP 16',
  },
  {
    icon: '📍',
    label: 'Projects in Chennai',
    value: '500+',
    detail: 'Across residential, commercial, and industrial segments since 2022',
  },
  {
    icon: '✅',
    label: 'Review Turnaround',
    value: '3–5 days',
    detail: 'Structural and BOQ reviews completed within 3–5 working days',
  },
];

const METHODOLOGY = [
  'All technical reviews are performed by a licensed structural engineer — not AI tools or junior analysts',
  'Every rate in a BOQ review is benchmarked against current Chennai market data, updated monthly',
  'Structural plan reviews reference the applicable IS codes — IS 456:2000, IS 1893:2016, IS 875 Parts 1–3',
  'We declare our role clearly: Buildogram is an independent engineering oversight service, not a contractor',
  'Client data and project documents are stored securely and never shared with third parties without consent',
];

export default function EngineerCredibility({ service = '', compact = false }) {
  if (compact) {
    return (
      <aside
        aria-label="About Buildogram's engineering team"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa, #fff)',
          border: '1px solid #e5e7eb',
          borderLeft: '4px solid var(--primary)',
          borderRadius: '0 12px 12px 0',
          padding: '20px 24px',
          margin: '32px 0',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--secondary)' }}>About Buildogram{service ? ` — ${service}` : ''}:</strong>{' '}
          An engineer-led construction intelligence platform in Chennai. All technical reviews are performed by
          licensed structural engineers with IS code expertise — not AI tools or junior analysts.{' '}
          <a href="/quality-system" style={{ color: 'var(--primary)', fontWeight: 600 }}>Our methodology →</a>
        </p>
      </aside>
    );
  }

  return (
    <section
      aria-label="Engineering credentials and methodology"
      style={{ margin: '56px 0', background: 'var(--secondary)', borderRadius: '16px', padding: '40px', color: 'white' }}
    >
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.15)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '12px' }}>
          <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px' }}>E-E-A-T — EXPERTISE & EXPERIENCE</span>
        </div>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          Why Trust Buildogram{service ? ` for ${service}` : ''}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}>
          Our reviews are performed by practising structural engineers — not marketers, AI tools, or junior
          analysts. Here is what backs our technical recommendations.
        </p>
      </div>

      {/* Credential stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        {CREDENTIALS.map(cred => (
          <div
            key={cred.label}
            style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{cred.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>{cred.value}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{cred.label}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{cred.detail}</div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px', textTransform: 'uppercase' }}>
          Our Commitment
        </h3>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {METHODOLOGY.map((point, i) => (
            <li key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8, marginBottom: '4px' }}>
              {point}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/quality-system" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Our Quality System →
          </a>
          <a href="/about" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
            About the Team →
          </a>
        </div>
      </div>
    </section>
  );
}
