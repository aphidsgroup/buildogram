import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_COLS = [
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
      ['Careers', '/careers'],
      ['Projects', '/projects'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Home Construction in Chennai', '/home-construction-chennai'],
      ['BOQ Review', '/boq-audit'],
      ['Construction Cost Estimator', '/cost-estimator'],
      ['Plan Review', '/plan-review'],
      ['Site Supervision', '/site-supervision-chennai'],
    ],
  },
  {
    title: 'Materials',
    links: [
      ['Cement', '/materials/cement'],
      ['TMT Steel', '/materials/tmt-steel'],
      ['M Sand', '/materials/m-sand'],
      ['Bricks', '/materials/bricks'],
      ['RMC', '/materials/ready-mix-concrete'],
    ],
  },
  {
    title: 'Locations',
    links: [
      ['Chennai', '/locations/chennai'],
      ['Velachery', '/locations/chennai/velachery'],
      ['Anna Nagar', '/locations/chennai/anna-nagar'],
      ['Tambaram', '/locations/chennai/tambaram'],
      ['OMR', '/locations/chennai/omr'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Guides', '/guides'],
      ['FAQ', '/faqs'],
      ['Glossary', '/glossary'],
      ['Property Passport', '/property-passport'],
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
