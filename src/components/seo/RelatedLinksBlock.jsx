import Link from 'next/link';

export default function RelatedLinksBlock({ title = "Explore Related Services", links = [], variant = 'light' }) {
  if (!links || links.length === 0) return null;

  const bgStyle = variant === 'dark' ? { background: '#0F172A', color: 'white' } : { background: '#F8FAFC', color: '#0F172A' };
  const cardStyle = variant === 'dark' 
    ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' } 
    : { background: 'white', border: '1px solid #E2E8F0' };
  const descStyle = variant === 'dark' ? { color: '#94A3B8' } : { color: '#64748B' };
  const titleStyle = variant === 'dark' ? { color: 'white' } : { color: '#0F172A' };

  return (
    <section style={{ padding: '60px 0', ...bgStyle }}>
      <div className="container">
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', textAlign: 'center', ...titleStyle }}>
          {title}
        </h2>
        <div className="grid-3" style={{ gap: '20px' }}>
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', ...cardStyle }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', ...titleStyle }}>
                  {link.label}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, margin: 0, ...descStyle }}>
                  {link.description}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>
                  Learn more <span style={{ marginLeft: '4px' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
