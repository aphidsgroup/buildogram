import Link from 'next/link';
import Image from 'next/image';
import NavbarClientWrapper from './NavbarClientWrapper';
import MobileMenuClient from './MobileMenuClient';
import styles from './Navbar.module.css';

const MEGA_MENUS = [
  {
    label: 'Services',
    links: [
      { href: '/home-construction-chennai', label: 'Home Construction in Chennai' },
      { href: '/end-to-end-construction-support-chennai', label: 'End-to-End Construction Support' },
      { href: '/builders-in-chennai', label: 'Builders in Chennai' },
      { href: '/construction-company-chennai', label: 'Construction Company Chennai' },
      { href: '/villa-construction', label: 'Villa Construction' },
      { href: '/turnkey-construction-chennai', label: 'Turnkey Construction' },
      { href: '/residential-construction-chennai', label: 'Residential Construction' },
      { href: '/commercial-construction-chennai', label: 'Commercial Construction' },
      { href: '/renovation-contractors-chennai', label: 'Renovation & Remodeling' },
      { href: '/boq-review-chennai', label: 'BOQ Review' },
      { href: '/contractor-quote-review-chennai', label: 'Contractor Quote Review' },
      { href: '/construction-cost-estimation-chennai', label: 'Construction Cost Estimation' },
      { href: '/structural-plan-review-chennai', label: 'Structural Plan Review' },
      { href: '/plan-review', label: 'Floor Plan Review' },
      { href: '/site-supervision-chennai', label: 'Site Supervision' },
      { href: '/construction-project-management-chennai', label: 'Project Management' },
      { href: '/steel-construction-chennai', label: 'Steel Construction' },
      { href: '/peb-building-contractors-chennai', label: 'PEB Buildings' },
      { href: '/industrial-shed-construction-chennai', label: 'Industrial Shed Construction' },
    ]
  },
  {
    label: 'Shop Materials',
    links: [
      { href: '/materials', label: 'Shop All Materials' },
      { href: '/materials/cement', label: 'Cement' },
      { href: '/materials/tmt-steel', label: 'TMT Steel' },
      { href: '/materials/msand-psand', label: 'M-Sand & P-Sand' },
      { href: '/materials/bricks-aac-blocks', label: 'Bricks & AAC Blocks' },
      { href: '/materials/ready-mix-concrete', label: 'Ready Mix Concrete' },
      { href: '/materials/waterproofing', label: 'Waterproofing Materials' },
      { href: '/materials/electrical', label: 'Electrical Materials' },
      { href: '/materials/plumbing', label: 'Plumbing Materials' },
      { href: '/materials/fabrication-steel', label: 'Fabrication & Steel Materials' },
      { href: '/materials/piling-foundation-materials', label: 'Piling & Foundation Materials' },
      { href: '/materials/finishing-materials', label: 'Finishing Materials' },
      { href: '/material-quotes', label: 'Request Material Quote' },
    ]
  },
  {
    label: 'Structural Auditing',
    links: [
      { href: '/structural-audit-chennai', label: 'Building Structural Audit' },
      { href: '/building-structural-audit-chennai', label: 'Residential Structural Audit' },
      { href: '/commercial-structural-audit-chennai', label: 'Commercial Building Audit' },
      { href: '/apartment-structural-audit-chennai', label: 'Apartment Structural Audit' },
      { href: '/old-building-structural-audit-chennai', label: 'Old Building Safety Audit' },
      { href: '/building-crack-inspection-chennai', label: 'Crack Inspection' },
      { href: '/ndt-testing-chennai', label: 'NDT Testing' },
      { href: '/rebound-hammer-test-chennai', label: 'Rebound Hammer Test' },
      { href: '/upv-test-chennai', label: 'Ultrasonic Pulse Velocity Test' },
      { href: '/rebar-scanning-chennai', label: 'Cover Meter / Rebar Scanning' },
      { href: '/core-test-concrete-chennai', label: 'Concrete Core Test' },
    ]
  },
  {
    label: 'Survey & Piling',
    links: [
      { href: '/land-survey-chennai', label: 'Land Survey' },
      { href: '/topographic-survey-chennai', label: 'Topographic Survey' },
      { href: '/dgps-survey-chennai', label: 'DGPS / RTK Survey' },
      { href: '/drone-survey-chennai', label: 'Drone Survey / UAV Mapping' },
      { href: '/construction-layout-marking-chennai', label: 'Construction Layout Marking' },
      { href: '/soil-testing-chennai', label: 'Soil Investigation' },
      { href: '/plate-load-test-chennai', label: 'Plate Load Test' },
      { href: '/pile-foundation-contractors-chennai', label: 'Pile Foundation' },
      { href: '/bored-cast-in-situ-piles-chennai', label: 'Bored Cast-In-Situ Piles' },
      { href: '/dmc-piling-contractors-chennai', label: 'DMC Piles' },
      { href: '/micro-piling-contractors-chennai', label: 'Micro Piles' },
      { href: '/pile-load-test-chennai', label: 'Pile Load Test' },
      { href: '/pile-integrity-test-chennai', label: 'Pile Integrity Test' },
      { href: '/dynamic-pile-load-test-chennai', label: 'Dynamic Pile Load Test' },
    ]
  },
  {
    label: 'Partners',
    links: [
      { href: '/partners/directory', label: 'Find Verified Partners' },
      { href: '/partners/builders', label: 'Builders' },
      { href: '/partners/contractors', label: 'Contractors' },
      { href: '/partners/architects', label: 'Architects' },
      { href: '/partners/directory?category=Structural+Engineers', label: 'Structural Engineers' },
      { href: '/partners/directory?category=Surveyors', label: 'Surveyors' },
      { href: '/partners/directory?category=NDT+Labs', label: 'NDT Testing Labs' },
      { href: '/partners/directory?category=Piling', label: 'Piling Contractors' },
      { href: '/partners/suppliers', label: 'Material Suppliers' },
      { href: '/partners/directory?category=Steel+Fabricators', label: 'Steel Fabricators' },
      { href: '/partners/interiors', label: 'Interior Designers' },
      { href: '/partners/waterproofing', label: 'Waterproofing Vendors' },
      { href: '/partners/solar', label: 'Solar Vendors' },
      { href: '/join-as-partner', label: 'Join as Partner' },
      { href: '/partner-os', label: 'Partner OS' },
    ]
  },
  {
    label: 'AI Tools',
    links: [
      { href: '/ai-tools', label: 'All AI Tools' },
      { href: '/ai-construction-cost-estimator', label: 'AI Cost Estimator' },
      { href: '/ai-boq-checker', label: 'AI BOQ Checker' },
      { href: '/ai-contractor-quote-analyzer', label: 'AI Quote Analyzer' },
      { href: '/ai-material-estimator', label: 'AI Material Estimator' },
      { href: '/ai-structural-audit-intake', label: 'AI Structural Audit Intake' },
      { href: '/ai-survey-requirement-builder', label: 'AI Survey Requirement Builder' },
      { href: '/ai-soil-test-requirement-builder', label: 'AI Soil Test Builder' },
      { href: '/ai-pile-foundation-boq-checker', label: 'AI Pile Foundation BOQ' },
      { href: '/ai-property-passport-assistant', label: 'AI Property Passport Assistant' },
      { href: '/boq-calculator', label: 'AI BOQ Calculator (Coming Soon)' },
    ]
  },
  {
    label: 'Quality & Passport',
    links: [
      { href: '/quality-system', label: 'Buildogram Quality System (BQS)' },
      { href: '/property-passport', label: 'Property Passport' },
      { href: '/quality-system', label: 'Site Documentation' },
      { href: '/quality-system', label: 'Material Verification Records' },
      { href: '/structural-audit-chennai', label: 'Structural Audit Records' },
    ]
  },
  {
    label: 'Learn',
    links: [
      { href: '/guides', label: 'Construction Guides' },
      { href: '/resources/material-guide', label: 'Material Guides' },
      { href: '/faqs', label: 'FAQs' },
      { href: '/locations/chennai', label: 'Chennai Service Areas' },
      { href: '/glossary', label: 'Glossary' },
    ]
  },
];

export default function Navbar() {
  return (
    <NavbarClientWrapper>
      <Link href="/" className={styles.brand} aria-label="Buildogram home">
        <Image
          src="/logo-main.png"
          alt="Buildogram"
          width={240}
          height={60}
          priority
          style={{ objectFit: 'contain', height: '52px', width: 'auto' }}
        />
      </Link>

      <div className={`${styles.topActions} hide-mobile`} style={{ flex: 1, justifyContent: 'center', margin: '0 2rem' }}>
        {MEGA_MENUS.map((menu, idx) => (
          <div key={idx} className={styles.navItemContainer}>
            <button className={styles.navLink}>
              {menu.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.navChevron}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={styles.megaMenu}>
              {menu.links.map(link => (
                <Link 
                  key={link.href + link.label} 
                  href={link.href} 
                  className={styles.megaLink}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
        
      <div className="hide-mobile" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <Link href="/contact?type=construction" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>Start Project</Link>
      </div>

      <MobileMenuClient menus={MEGA_MENUS} />
    </NavbarClientWrapper>
  );
}
