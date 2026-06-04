import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_COLS = [
  {
    title: 'For Owners',
    links: [
      ['Build Your Home', '/contact?type=construction'],
      ['BOQ & Plan Review', '/contact?type=boq_audit'],
      ['Material Support', '/materials'],
      ['Property Passport', '/property-passport'],
      ['Site Progress Tracking', '/projects'],
      ['Contact Buildogram', '/contact?type=general'],
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      ['Verified Partners', '/partners/directory'],
      ['Become a Partner', '/partners/register'],
      ['Material Suppliers', '/materials'],
      ['Cost Estimator', '/cost-estimator'],
      ['BOQ Audit Tool', '/boq-audit'],
      ['AI Floor Plan', '/partner/ai-floor-plan-creator'],
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
      ['Contact', '/contact?type=general'],
      ['Privacy Policy', '/privacy-policy'],
      ['Terms', '/terms'],
      ['Guides', '/guides/what-is-boq-in-construction'],
      ['FAQs', '/faqs/construction'],
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
                <div className={styles.brandMark} aria-hidden="true">
                  <i/><i/><i/><i/><i/><i/><i/><i/><i/>
                </div>
                <span className={styles.brandName}>Buildogram</span>
              </Link>
              <p className={styles.brandDesc}>
                Engineer-led construction and property ecosystem helping owners plan, build, source materials, verify progress, and maintain digital property records.
              </p>
              <div className={styles.tagline}>Engineer-led. Owner-first. Build with confidence.</div>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span>Active Platform · Chennai, Tamil Nadu</span>
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
              © 2026 Buildogram. Engineer-Led Construction Companion. Chennai, Tamil Nadu, India.
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
