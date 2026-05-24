import Link from 'next/link';

const FOOTER_COLS = [
  { title: 'Build', links: [['Home Construction', '/build/home-construction'], ['Villa Construction', '/build/villa-construction'], ['Renovation', '/build/renovation'], ['BOQ Audit', '/boq-audit'], ['Plan Review', '/plan-review'], ['Cost Estimator', '/cost-estimator']] },
  { title: 'Property', links: [['Verified Rentals', '/rentals'], ['Property Passport™', '/property-passport'], ['Maintenance & AMC', '/maintenance'], ['Warranty', '/warranty-and-maintenance'], ['Materials', '/materials'], ['Partners', '/partners']] },
  { title: 'Learn', links: [['How It Works', '/how-it-works'], ['Specifications', '/specifications'], ['Chennai Guide', '/construction-in-chennai'], ['Blog', '/blog'], ['About Us', '/about']] },
  { title: 'Portals', links: [['Client Login', '/login'], ['Partner Login', '/login'], ['Ops Console', '/login'], ['Contact Us', '/contact']] },
];

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: 'white', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand col */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '300px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <span style={{ fontSize: '24px' }}>⬡</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '20px', color: 'white' }}>Buildogram</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, maxWidth: '240px', marginBottom: '20px' }}>
              India's Property Transparency Platform. Build with proof, not promises.
            </p>
            <div style={{ fontFamily: 'DM Serif Text, serif', fontStyle: 'italic', color: '#BBA07A', fontSize: '15px' }}>
              Buy. Build. Track. Rent. Sell. Maintain.
            </div>
          </div>
          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>{col.title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FFDA01'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>© 2025 Buildogram. All rights reserved. Chennai, Tamil Nadu, India.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Refund Policy', '#']].map(([l, h]) => (
              <Link key={l} href={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
