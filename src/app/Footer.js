import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const FOOTER_COLS = [
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
      ['Careers', '/careers'],
      ['Partners', '/partners/register'],
    ],
  },
  {
    title: 'Construction Support',
    links: [
      ['End-to-End Construction Support', '/end-to-end-construction-support-chennai'],
      ['Home Construction Chennai', '/home-construction-chennai'],
      ['Construction Project Management', '/construction-project-management-chennai'],
      ['Site Supervision', '/site-supervision-chennai'],
      ['Quality Inspection', '/quality-inspection-chennai'],
    ],
  },
  {
    title: 'Review Services',
    links: [
      ['BOQ Audit', '/boq-audit'],
      ['BOQ Review Chennai', '/boq-review-chennai'],
      ['Plan Review', '/plan-review'],
      ['Structural Plan Review', '/structural-plan-review-chennai'],
      ['Contractor Quote Review', '/contractor-quote-review-chennai'],
      ['Construction Cost Estimator', '/cost-estimator'],
    ],
  },
  {
    title: 'Structural Safety',
    links: [
      ['Structural Audit Chennai', '/structural-audit-chennai'],
      ['Building Crack Inspection', '/building-crack-inspection-chennai'],
      ['Old Building Structural Audit', '/old-building-structural-audit-chennai'],
      ['Apartment Structural Audit', '/apartment-structural-audit-chennai'],
    ],
  },
  {
    title: 'Steel Construction',
    links: [
      ['Steel Construction Chennai', '/steel-construction-chennai'],
      ['PEB Buildings', '/peb-building-contractors-chennai'],
      ['Industrial Shed Construction', '/industrial-shed-construction-chennai'],
      ['Warehouse Steel Building', '/warehouse-steel-building-chennai'],
      ['Steel Fabrication Contractors', '/steel-fabrication-contractors-chennai'],
    ],
  },
  {
    title: 'Locations',
    links: [
      ['Chennai Construction Areas', '/locations/chennai'],
      ['Velachery', '/locations/chennai/velachery'],
      ['Tambaram', '/locations/chennai/tambaram'],
      ['Anna Nagar', '/locations/chennai/anna-nagar'],
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
      ['Materials', '/materials'],
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
                  width={180}
                  height={45}
                  style={{ objectFit: 'contain', height: '38px', width: 'auto', marginBottom: '12px' }}
                />
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
