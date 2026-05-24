'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className="container flex-between" style={{ height: '100%', width: '100%' }}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>Buildogram</span>
        </Link>

        {/* Nav Links */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>

          {/* Construction */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Construction <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/build" onClick={close}>All Services</Link>
              <Link href="/build/home-construction" onClick={close}>Home Construction</Link>
              <Link href="/build/villa-construction" onClick={close}>Villa Construction</Link>
              <Link href="/build/renovation" onClick={close}>Renovation</Link>
              <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              <Link href="/boq-audit" onClick={close}>📊 BOQ Audit</Link>
              <Link href="/plan-review" onClick={close}>📐 Plan Review</Link>
            </div>
          </div>

          {/* Materials */}
          <Link href="/materials" onClick={close}>Materials</Link>

          {/* Properties */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Properties <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" onClick={close}>Buy/Sell Properties</a>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" onClick={close}>Rent/Lease Properties</a>
              <Link href="/property-passport" onClick={close}>Property Passport™</Link>
              <Link href="/maintenance" onClick={close}>Maintenance & AMC</Link>
            </div>
          </div>

          {/* Partners */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Partners <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/partners/directory" onClick={close}>Partner Directory</Link>
              <Link href="/partners" onClick={close}>Join Network</Link>
            </div>
          </div>

          {/* Resources */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Resources <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/resources" onClick={close}>Resources Hub</Link>
              <Link href="/resources/construction-guide" onClick={close}>Construction Guide</Link>
              <Link href="/resources/material-guide" onClick={close}>Material Guide</Link>
              <Link href="/resources/property-buying-guide" onClick={close}>Property Buying Guide</Link>
              <Link href="/resources/home-design-guide" onClick={close}>Home Design Guide</Link>
              <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              <Link href="/faqs" onClick={close}>FAQs</Link>
              <Link href="/cost-estimator" onClick={close}>Cost Estimator</Link>
            </div>
          </div>
          
          <Link href="/contact" onClick={close}>Contact</Link>

        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileMenuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
