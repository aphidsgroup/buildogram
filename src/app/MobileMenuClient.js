'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Navbar.module.css';

export default function MobileMenuClient({ menus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const pathname = usePathname();

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
    <>
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

      {/* Since this is inside navInner, we can still render a fixed drawer because it has position: fixed */}
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
              {menus.map((menu, idx) => (
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
                            key={link.href + link.label} 
                            href={link.href} 
                            onClick={close} 
                            className={styles.mobileLink}
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
                <Link href="/contact?type=construction" onClick={close} className={`${styles.mobileLink} ${styles.mobileLinkPrimary}`}>
                  Start Your Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
