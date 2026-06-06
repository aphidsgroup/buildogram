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
      ['Steel & PEB', '/steel-construction-chennai'],
      ['Turnkey Construction', '/turnkey-construction-chennai'],
    ],
  },
  {
    title: 'Shop Materials',
    links: [
      ['All Materials', '/materials'],
      ['Cement', '/materials/cement'],
      ['TMT Steel', '/materials/tmt-steel'],
      ['M-Sand & P-Sand', '/materials/msand-psand'],
      ['Bricks & AAC Blocks', '/materials/bricks-aac-blocks'],
      ['Request Material Quote', '/material-quotes'],
    ],
  },
  {
    title: 'Structural Auditing',
    links: [
      ['Building Structural Audit', '/structural-audit-chennai'],
      ['Crack Inspection', '/building-crack-inspection-chennai'],
      ['NDT Testing', '/ndt-testing-chennai'],
      ['Old Building Audit', '/old-building-structural-audit-chennai'],
      ['Rebound Hammer Test', '/rebound-hammer-test-chennai'],
    ],
  },
  {
    title: 'Survey, Testing & Piling',
    links: [
      ['Land Survey', '/land-survey-chennai'],
      ['Soil Testing', '/soil-testing-chennai'],
      ['Pile Foundation', '/pile-foundation-contractors-chennai'],
      ['Pile Load Test', '/pile-load-test-chennai'],
      ['Drone Survey', '/drone-survey-chennai'],
    ],
  },
  {
    title: 'Partners',
    links: [
      ['Find Verified Partners', '/partners/directory'],
      ['Builders', '/partners/builders'],
      ['Contractors', '/partners/contractors'],
      ['Architects', '/partners/architects'],
      ['Join as Partner', '/join-as-partner'],
    ],
  },
  {
    title: 'AI Tools',
    links: [
      ['All AI Tools', '/ai-tools'],
      ['Cost Estimator', '/ai-construction-cost-estimator'],
      ['BOQ Checker', '/ai-boq-checker'],
      ['Quote Analyzer', '/ai-contractor-quote-analyzer'],
      ['Property Passport Assistant', '/ai-property-passport-assistant'],
    ],
  },
  {
    title: 'Quality & Property Passport',
    links: [
      ['Quality System (BQS)', '/quality-system'],
      ['Property Passport', '/property-passport'],
      ['Site Documentation', '/quality-system'],
    ],
  },
  {
    title: 'Learn',
    links: [
      ['Guides', '/guides'],
      ['FAQs', '/faqs'],
      ['Chennai Service Areas', '/locations/chennai'],
      ['Glossary', '/glossary'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
      ['Careers', '/careers'],
      ['Privacy Policy', '/privacy-policy'],
      ['Terms', '/terms'],
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
                AI-driven, engineer-led construction, materials, structural auditing, survey, testing, piling, partner, and property documentation ecosystem in Chennai.
              </p>
              <div className={styles.tagline}>AI-Driven. Engineer-Led. Build with Confidence.</div>
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
