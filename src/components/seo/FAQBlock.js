import React from 'react';
import { generateFAQSchema } from '@/lib/seo/schema';

/**
 * FAQBlock: Renders a semantic details/summary FAQ list and injects JSON-LD.
 */
export default function FAQBlock({ faqs, title = 'Frequently Asked Questions' }) {
  if (!faqs || faqs.length === 0) return null;
  const schema = generateFAQSchema(faqs);

  return (
    <section style={{ margin: '48px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, i) => (
          <details key={i} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <summary style={{ fontWeight: 700, cursor: 'pointer', color: '#0F172A' }}>{faq.question}</summary>
            <p style={{ marginTop: '12px', marginBottom: 0, color: '#475569', lineHeight: 1.6 }}>{faq.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
