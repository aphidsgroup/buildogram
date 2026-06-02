/**
 * UnauthorizedScreen — Phase G
 * Clean "you do not have access" screen for role-based protection.
 * Data is never rendered — this replaces the page content entirely.
 */
'use client';
import Link from 'next/link';

const ROLE_REDIRECTS = {
  partner:    { href: '/partner/dashboard', label: 'Partner Dashboard' },
  supplier:   { href: '/supplier/dashboard', label: 'Supplier Dashboard' },
  customer:   { href: '/client/projects', label: 'My Projects' },
  ops_admin:  { href: '/ops/dashboard', label: 'Ops Dashboard' },
  ops_pm:     { href: '/ops/dashboard', label: 'Ops Dashboard' },
  default:    { href: '/login', label: 'Sign In' },
};

/**
 * @param {string} [userRole] - current user's role (to show proper redirect)
 * @param {string} [requiredRole] - the role needed for this page
 * @param {string} [message] - custom message
 */
export default function UnauthorizedScreen({ userRole, requiredRole, message }) {
  const redirect = ROLE_REDIRECTS[userRole] || ROLE_REDIRECTS.default;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
        Access Denied
      </h1>
      <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '440px', lineHeight: 1.6, margin: '0 0 8px' }}>
        {message || 'You do not have access to this page.'}
      </p>
      {requiredRole && (
        <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '24px' }}>
          Required role: <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>{requiredRole}</code>
        </p>
      )}
      {!requiredRole && <div style={{ marginBottom: '24px' }} />}
      <Link
        href={redirect.href}
        style={{
          display: 'inline-block',
          padding: '11px 28px',
          background: 'linear-gradient(135deg, #FFB347, #FC6E20)',
          color: 'white',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(252,110,32,0.3)',
        }}
      >
        ← Go to {redirect.label}
      </Link>
      <p style={{ marginTop: '16px', fontSize: '12px', color: '#CBD5E1' }}>
        If you believe this is an error, contact{' '}
        <a href="mailto:support@buildogram.in" style={{ color: '#FC6E20' }}>support@buildogram.in</a>
      </p>
    </div>
  );
}
