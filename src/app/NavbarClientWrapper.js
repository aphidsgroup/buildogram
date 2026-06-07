'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function NavbarClientWrapper({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // initial check
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`${styles.topbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        {children}
      </div>
    </nav>
  );
}
