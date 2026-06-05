import React from 'react';

/**
 * ProcessSteps: Semantic ordered list for "How it works" blocks.
 */
export default function ProcessSteps({ steps, title = 'Our Process' }) {
  return (
    <section style={{ margin: '48px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>{title}</h2>
      <ol style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {steps.map((step, i) => (
          <li key={i} style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
            <span style={{ display: 'block', marginBottom: '8px' }}>{step.title}</span>
            <span style={{ display: 'block', fontWeight: 400, fontSize: '15px', color: '#475569', lineHeight: 1.6 }}>{step.desc}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
