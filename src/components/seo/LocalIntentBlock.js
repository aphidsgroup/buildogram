import React from 'react';
import Link from 'next/link';

/**
 * LocalIntentBlock: Strengthens local Chennai signals.
 */
export default function LocalIntentBlock({ locations = ['Chennai', 'Anna Nagar', 'OMR', 'Velachery', 'Tambaram'] }) {
  return (
    <section style={{ margin: '48px 0', padding: '32px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', color: '#0F172A' }}>Serving the Chennai Region</h2>
      <p style={{ margin: '0 0 20px 0', fontSize: '15px', lineHeight: 1.6, color: '#475569' }}>
        We provide engineer-led construction support across major residential and commercial hubs in Chennai.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {locations.map(loc => (
          <span key={loc} style={{ background: '#F1F5F9', padding: '6px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>
            {loc}
          </span>
        ))}
      </div>
      <div style={{ marginTop: '24px' }}>
        <Link href="/locations/chennai" style={{ color: '#FC6E20', fontWeight: 700, fontSize: '15px' }}>
          View all service areas →
        </Link>
      </div>
    </section>
  );
}
