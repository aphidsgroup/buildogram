import Link from 'next/link';

const FOOTER_COLS = [
  {
    title: 'For Owners',
    links: [
      ['Build Your Home', '/contact'],
      ['BOQ & Plan Review', '/boq-audit'],
      ['Material Support', '/materials'],
      ['Property Passport', '/property-passport'],
      ['Site Progress Tracking', '/projects'],
      ['Contact Buildogram', '/contact'],
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      ['Verified Partners', '/partners/directory'],
      ['Partner Directory', '/partners/directory'],
      ['Become a Partner', '/partners/register'],
      ['Material Suppliers', '/materials'],
      ['Cost Estimator', '/cost-estimator'],
      ['BOQ Audit Tool', '/boq-audit'],
    ],
  },
  {
    title: 'Property Portals',
    links: [
      ['Buy / Sell Properties', 'https://www.realproprealty.com'],
      ['Rent / Lease Properties', 'https://toletboardchennai.in'],
      ['360° Property Tours', 'https://www.realproprealty.com'],
      ['Property Discovery', '/properties'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
      ['Privacy Policy', '/privacy-policy'],
      ['Terms', '/terms'],
      ['Guides', '/guides/what-is-boq-in-construction'],
      ['FAQs', '/faqs/construction'],
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: 'white', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand col */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '320px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <span style={{ fontSize: '24px' }}>⬡</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '20px', color: 'white' }}>Buildogram</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, maxWidth: '260px', marginBottom: '20px' }}>
              Buildogram is an engineer-led construction and property ecosystem helping owners plan, build, source materials, verify progress, connect with trusted partners, and maintain digital property records.
            </p>
            <div style={{ fontFamily: 'DM Serif Text, serif', fontStyle: 'italic', color: '#BBA07A', fontSize: '15px' }}>
              Engineer-led. Owner-first. Build with confidence.
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>{col.title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FC6E20'}
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
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>© 2026 Buildogram. Engineer-Led Construction Companion. Chennai, Tamil Nadu, India.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} href={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
