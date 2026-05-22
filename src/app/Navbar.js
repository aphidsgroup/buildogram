'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className="container flex-between" style={{ height: '100%', width: '100%' }}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>Buildogram</span>
        </Link>
        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/specifications" onClick={() => setMenuOpen(false)}>Specifications</Link>
          <Link href="/cost-estimator" onClick={() => setMenuOpen(false)}>Cost Estimator</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/why-vs-mason" onClick={() => setMenuOpen(false)}>Vs Local Mason</Link>
          <Link href="/why-vs-aggregators" onClick={() => setMenuOpen(false)}>Vs Corporate Aggregators</Link>
          <Link href="/warranty-and-maintenance" onClick={() => setMenuOpen(false)}>Warranty & Loans</Link>
          <Link href="/construction-in-chennai" onClick={() => setMenuOpen(false)}>Chennai Guide</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/login" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Client Login</Link>
        </div>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
