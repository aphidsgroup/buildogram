import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const FOOTER_COLS = [
  {
    title: 'Services',
    links: [
      ['Home Construction', '/home-construction-chennai'],
      ['End-to-End Support', '/end-to-end-construction-support-chennai'],
      ['BOQ Review', '/boq-review-chennai'],
      ['Site Supervision', '/site-supervision-chennai'],
      ['Property Passport', '/property-passport'],
    ],
  },
  {
    title: 'Materials & Resources',
    links: [
      ['Shop Materials', '/materials'],
      ['Cement', '/materials/cement'],
      ['TMT Steel', '/materials/tmt-steel'],
      ['Find Verified Partners', '/partners/directory'],
      ['AI Tools', '/ai-tools'],
    ],
  },
  {
    title: 'Engineering & Audits',
    links: [
      ['Building Structural Audit', '/structural-audit-chennai'],
      ['NDT Testing', '/ndt-testing-chennai'],
      ['Land Survey', '/land-survey-chennai'],
      ['Soil Testing', '/soil-testing-chennai'],
      ['Pile Foundation', '/pile-foundation-contractors-chennai'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Buildogram', '/about'],
      ['Guides & Glossary', '/guides'],
      ['Chennai Locations', '/locations/chennai'],
      ['Contact Us', '/contact'],
      ['Privacy & Terms', '/privacy-policy'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>

            {/* Brand column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.brandLink} aria-label="Buildogram home">
                <Image
                  src="/logo-main.png"
                  alt="Buildogram"
                  width={280}
                  height={70}
                  style={{ objectFit: 'contain', height: '60px', width: 'auto', marginBottom: '8px', filter: 'brightness(0) invert(1)' }}
                />
              </Link>
              <p className={styles.brandDesc}>
                Buildogram is an AI-driven, engineer-led construction and property ecosystem serving Chennai and surrounding areas.
              </p>
              <div className={styles.tagline}>AI-Driven. Engineer-Led. Build with Confidence.</div>
              <div style={{ marginTop: '24px', fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6 }}>
                <strong>Buildogram Headquarters</strong><br />
                No.35, 7th floor, Awfis Space, Centre Point 3,<br />
                Poonamallee High Road, Manapakkam, Porur,<br />
                Chennai — 600089, Tamil Nadu, India.<br />
                📞 +91 93602 32456<br />
                ✉️ hello@buildogram.in
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLS.map(col => (
              <div key={col.title} className={styles.linkCol}>
                <h4 className={styles.colTitle}>{col.title}</h4>
                <ul className={styles.linkList}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className={styles.footerLink}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span className={styles.copyright}>
              © 2026 Buildogram. AI-Driven, Engineer-Led Construction & Property Ecosystem. Chennai, Tamil Nadu, India.
            </span>
            <div className={styles.legalLinks}>
              {[['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Contact', '/contact']].map(([l, h]) => (
                <Link key={l} href={h} className={styles.legalLink}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
