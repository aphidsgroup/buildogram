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
      { href: '/build/home-construction', label: 'Home Construction Guidance' },
      { href: '/build/villa-construction', label: 'Villa Construction' },
      { href: '/build/renovation', label: 'Renovation' },
      { href: '/build/commercial', label: 'Commercial Fit-Out' },
      { href: '/construction-in-chennai', label: 'Construction in Chennai' },
      { href: '/build/warranty', label: 'Warranty & Maintenance' },
    ]
  },
  {
    label: 'Review',
    links: [
      { href: '/boq-audit', label: 'BOQ Audit' },
      { href: '/plan-review', label: 'Plan Review' },
      { href: '/review/contractor-quote', label: 'Contractor Quote Review' },
      { href: '/cost-estimator', label: 'Cost Estimator' },
      { href: '/review/specifications', label: 'Specification Review' },
      { href: '/review/hidden-costs', label: 'Hidden Cost Checklist' },
    ]
  },
  {
    label: 'Materials',
    links: [
      { href: '/materials', label: 'Material Quote Support' },
      { href: '/materials/cement', label: 'Cement Rate Support' },
      { href: '/materials/steel', label: 'TMT Steel Rate Support' },
      { href: '/materials/sand', label: 'Sand & M-Sand' },
      { href: '/materials/bricks', label: 'Bricks & Blocks' },
      { href: '/materials/tiles', label: 'Tiles & Flooring' },
      { href: '/materials/electrical-plumbing', label: 'Electrical & Plumbing' },
      { href: '/materials/network', label: 'Supplier Network' },
    ]
  },
  {
    label: 'Partners',
    links: [
      { href: '/partners/directory', label: 'Verified Partner Directory' },
      { href: '/partners/builders', label: 'Builders' },
      { href: '/partners/contractors', label: 'Contractors' },
      { href: '/partners/architects', label: 'Architects' },
      { href: '/partners/interiors', label: 'Interior Designers' },
      { href: '/partners/suppliers', label: 'Material Suppliers' },
      { href: '/partners/waterproofing', label: 'Waterproofing' },
      { href: '/partners/solar', label: 'Solar' },
      { href: '/partners/elevators', label: 'Elevators' },
      { href: '/partners/register', label: 'Become a Partner' },
    ]
  },
  {
    label: 'Property',
    links: [
      { href: '/property-passport', label: 'Property Passport' },
      { href: 'https://www.realproprealty.com', label: 'Buy Properties', external: true },
      { href: 'https://toletboardchennai.in', label: 'Rent Properties', external: true },
      { href: '/property/list', label: 'List Your Property' },
      { href: '/property/maintenance', label: 'Property Maintenance' },
      { href: '/property/records', label: '360 Property Records' },
    ]
  },
  {
    label: 'AI Tools',
    links: [
      { href: '/ai-floor-plan-creator', label: 'AI Floor Plan Creator' },
      { href: '/cost-estimator', label: 'Cost Estimator' },
      { href: '/ai/boq-draft', label: 'BOQ Draft Assistant' },
      { href: '/ai/plan-review', label: 'Plan Review Assistant' },
      { href: '/ai/site-assistant', label: 'Site Assistant' },
    ]
  },
  {
    label: 'Resources',
    links: [
      { href: '/resources/guides', label: 'Guides' },
      { href: '/resources/faqs', label: 'FAQs' },
      { href: '/resources/glossary', label: 'Glossary' },
      { href: '/blog', label: 'Blog' },
      { href: '/resources/compare', label: 'Compare Pages' },
      { href: '/resources/chennai', label: 'Chennai Locality Pages' },
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
