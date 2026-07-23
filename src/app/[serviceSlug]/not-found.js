import Link from 'next/link';

/**
 * not-found.js for [serviceSlug] dynamic route.
 * Renders when getService(slug) returns null (slug not in SERVICES array).
 * Provides helpful navigation back to services hub.
 */
export default function ServiceNotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(252,110,32,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '28px',
          }}
        >
          🔍
        </div>
        <h1
          style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            color: 'var(--secondary)',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}
        >
          Service Page Not Found
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          This service page doesn&apos;t exist yet, or the URL may have changed.
          Browse our full list of construction and engineering services below.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/services" className="btn btn-primary">
            View All Services
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Engineers
          </Link>
        </div>
      </div>
    </div>
  );
}
