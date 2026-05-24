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

          {/* Build */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Build <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/build" onClick={close}>All Services</Link>
              <Link href="/build/home-construction" onClick={close}>Home Construction</Link>
              <Link href="/build/villa-construction" onClick={close}>Villa Construction</Link>
              <Link href="/build/renovation" onClick={close}>Renovation</Link>
              <Link href="/cost-estimator" onClick={close}>Cost Estimator</Link>
              <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              <Link href="/boq-audit" onClick={close}>📊 BOQ Audit</Link>
              <Link href="/plan-review" onClick={close}>📐 Plan Review</Link>
            </div>
          </div>

          {/* Materials */}
          <Link href="/materials" onClick={close}>Materials</Link>

          {/* Property */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Property <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/properties/buy" onClick={close}>Buy Properties</Link>
              <Link href="/properties/rent" onClick={close}>Rent Properties</Link>
              <Link href="/properties/list-your-property" onClick={close}>List Your Property</Link>
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

          {/* Projects */}
          <Link href="/projects" onClick={close}>Projects</Link>

          {/* Resources */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Learn <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/how-it-works" onClick={close}>How It Works</Link>
              <Link href="/specifications" onClick={close}>Specifications</Link>
              <Link href="/construction-in-chennai" onClick={close}>Chennai Guide</Link>
              <Link href="/blog" onClick={close}>Blog</Link>
              <Link href="/about" onClick={close}>About Us</Link>
            </div>
          </div>

          {/* CTAs */}
          <Link href="/contact" onClick={close}>Contact</Link>
          <Link href="/login" className="btn btn-primary btn-sm" onClick={close}>Client Login</Link>
        </div>

        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
