'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Navbar.module.css';

const MEGA_MENUS = [
  {
    label: 'Build',
    links: [
      { href: '/home-construction-chennai', label: 'Home Construction in Chennai' },
      { href: '/end-to-end-construction-support-chennai', label: 'End-to-End Construction Support' },
      { href: '/construction-project-management-chennai', label: 'Construction Project Management' },
      { href: '/residential-construction-chennai', label: 'Residential Construction' },
      { href: '/commercial-construction-chennai', label: 'Commercial Construction' },
      { href: '/turnkey-construction-chennai', label: 'Turnkey Construction' },
    ]
  },
  {
    label: 'Services',
    links: [
      { href: '/boq-review-chennai', label: 'BOQ Review' },
      { href: '/boq-audit', label: 'BOQ Audit Tool' },
      { href: '/plan-review', label: 'Architectural Plan Review' },
      { href: '/structural-plan-review-chennai', label: 'Structural Plan Review' },
      { href: '/site-supervision-chennai', label: 'Site Supervision' },
      { href: '/quality-inspection-chennai', label: 'Quality Inspection' },
      { href: '/cost-estimator', label: 'Cost Estimator' },
    ]
  },
  {
    label: 'Structural Safety',
    links: [
      { href: '/structural-audit-chennai', label: 'Structural Audit' },
      { href: '/building-crack-inspection-chennai', label: 'Building Crack Inspection' },
      { href: '/old-building-structural-audit-chennai', label: 'Old Building Audit' },
      { href: '/apartment-structural-audit-chennai', label: 'Apartment Structural Audit' },
      { href: '/structural-plan-review-chennai', label: 'Structural Plan Review' },
    ]
  },
  {
    label: 'Steel Construction',
    links: [
      { href: '/steel-construction-chennai', label: 'Steel Construction' },
      { href: '/peb-building-contractors-chennai', label: 'PEB Buildings' },
      { href: '/industrial-shed-construction-chennai', label: 'Industrial Shed Construction' },
      { href: '/warehouse-steel-building-chennai', label: 'Warehouse Steel Building' },
      { href: '/steel-fabrication-contractors-chennai', label: 'Steel Fabrication Contractors' },
    ]
  },
  {
    label: 'Materials',
    links: [
      { href: '/materials', label: 'Material Quote Support' },
      { href: '/materials/cement', label: 'Cement' },
      { href: '/materials/tmt-steel', label: 'TMT Steel' },
      { href: '/materials/m-sand', label: 'M Sand' },
      { href: '/materials/ready-mix-concrete', label: 'RMC' },
      { href: '/materials/bricks', label: 'Bricks & Blocks' },
    ]
  },
  {
    label: 'Partners',
    links: [
      { href: '/builders-in-chennai', label: 'Verified Builders' },
      { href: '/renovation-contractors-chennai', label: 'Renovation Contractors' },
      { href: '/partners/directory', label: 'Partner Directory' },
      { href: '/partners/register', label: 'Become a Partner' },
    ]
  },
  {
    label: 'Resources',
    links: [
      { href: '/resources', label: 'Resource Hub' },
      { href: '/guides', label: 'Guides' },
      { href: '/faqs', label: 'FAQs' },
      { href: '/locations/chennai', label: 'Chennai Service Areas' },
      { href: '/ai-floor-plan-creator', label: 'AI Floor Plan Tool' },
    ]
  },
  {
    label: 'Contact',
    links: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/about', label: 'About Buildogram' },
      { href: '/careers', label: 'Careers' },
    ]
  }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { 
    setMenuOpen(false); 
    setOpenAccordion(null);
  }, [pathname]);

  const close = () => {
    setMenuOpen(false);
    setOpenAccordion(null);
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <nav className={`${styles.topbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>

        {/* Brand */}
        <Link href="/" className={styles.brand} onClick={close} aria-label="Buildogram home">
          <div className={styles.brandMark} aria-hidden="true">
            <i/><i/><i/><i/><i/><i/><i/><i/><i/>
          </div>
          <span className={styles.brandName}>Buildogram</span>
        </Link>

        {/* Desktop nav */}
        <div className={`${styles.topActions} hide-mobile`}>
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
                    key={link.href} 
                    href={link.href} 
                    className={styles.megaLink}
                    target={link.external ? '_blank' : '_self'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <div className={styles.navItemContainer} style={{ marginLeft: 8 }}>
             <Link href="/login" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>Dashboard OS</Link>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className={`${styles.menuBtn} hide-desktop`}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileLinks}>
              {MEGA_MENUS.map((menu, idx) => (
                <div key={idx} className={styles.mobileAccordion}>
                  <button 
                    className={styles.mobileAccordionBtn}
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={openAccordion === idx}
                  >
                    {menu.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={openAccordion === idx ? styles.chevronOpen : ''}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openAccordion === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.mobileAccordionContent}
                      >
                        {menu.links.map(link => (
                          <Link 
                            key={link.href} 
                            href={link.href} 
                            onClick={close} 
                            className={styles.mobileLink}
                            target={link.external ? '_blank' : '_self'}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div style={{ padding: '16px 0 0 0', marginTop: '8px', borderTop: '1px solid var(--border)' }}>
                <Link href="/login" onClick={close} className={`${styles.mobileLink} ${styles.mobileLinkPrimary}`}>
                  Open Dashboard OS
                </Link>
                <Link href="/contact?type=construction" onClick={close} className={styles.mobileLinkOutline}>
                  Talk to an Engineer
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
