import React from 'react';
import Link from 'next/link';

/**
 * EntitySummary: Anchors the Buildogram entity to the local page.
 */
export default function EntitySummary({ serviceName }) {
  return (
    <aside style={{ padding: '24px', background: '#F1F5F9', borderRadius: '12px', margin: '32px 0' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B' }}>
        About Buildogram {serviceName && `— ${serviceName}`}
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '15px', lineHeight: 1.6, color: '#0F172A' }}>
        Buildogram is an engineer-led construction companion for Chennai. We help property owners review BOQs, source verified materials, manage site progress, and connect with trusted <Link href="/builders-in-chennai" style={{ color: '#FC6E20', fontWeight: 600 }}>verified builders</Link>.
      </p>
      <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-block' }}>
        Speak to an Engineer
      </Link>
    </aside>
  );
}
