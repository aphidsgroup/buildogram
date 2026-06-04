'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/contact?type=construction', label: 'Talk to an Engineer' },
  { href: '/materials',                 label: 'Materials' },
  { href: '/partners/directory',        label: 'Verified Partners' },
  { href: '/property-passport',         label: 'Property Passport' },
  { href: '/properties',                label: 'Property Portals' },
  { href: '/partners/register',         label: 'Become a Partner' },
  { href: '/contact?type=general',      label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation]     = useState('Chennai, TN');
  const [scrolled, setScrolled]     = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    close();
    if (q.includes('cement') || q.includes('steel') || q.includes('sand') || q.includes('material')) {
      router.push('/materials');
    } else if (q.includes('buy') || q.includes('sell') || q.includes('property')) {
      window.open('https://www.realproprealty.com', '_blank');
    } else if (q.includes('rent') || q.includes('lease')) {
      window.open('https://toletboardchennai.in', '_blank');
    } else if (q.includes('boq') || q.includes('plan') || q.includes('review')) {
      router.push('/boq-audit');
    } else {
      router.push(`/partners/directory?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(location)}`);
    }
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

        {/* Desktop search */}
        <form className={`${styles.globalSearch} hide-mobile`} onSubmit={handleSearch} role="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search builders, materials, BOQ review…"
            aria-label="Search Buildogram"
          />
          <select value={location} onChange={e => setLocation(e.target.value)} aria-label="Select location">
            <option value="Chennai, TN">Chennai</option>
            <option value="Coimbatore, TN">Coimbatore</option>
            <option value="Madurai, TN">Madurai</option>
            <option value="Trichy, TN">Trichy</option>
          </select>
        </form>

        {/* Desktop nav */}
        <div className={`${styles.topActions} hide-mobile`}>
          <Link href="/contact?type=construction" className={styles.navLink}>Talk to an Engineer</Link>
          <Link href="/materials"          className={styles.navLink}>Materials</Link>
          <Link href="/partners/directory" className={styles.navLink}>Verified Partners</Link>
          <Link href="/login" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>Dashboard OS</Link>
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
            <form className={styles.mobileSearch} onSubmit={handleSearch} role="search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search builders, materials, BOQ review…"
                aria-label="Search"
              />
            </form>
            <div className={styles.mobileLinks}>
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className={`${styles.mobileLink} ${l.label === 'Become a Partner' ? styles.mobileLinkAccent : ''}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/login" onClick={close} className={`${styles.mobileLink} ${styles.mobileLinkPrimary}`}>
                Open Dashboard OS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
