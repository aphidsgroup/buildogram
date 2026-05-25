'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const close = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const q = searchQuery.toLowerCase();
    close();
    
    // Routing logic based on query
    if (q.includes('cement') || q.includes('steel') || q.includes('sand') || q.includes('material')) {
      router.push('/materials');
    } else if (q.includes('buy') || q.includes('sell') || q.includes('property')) {
      window.open('https://www.realproprealty.com', '_blank');
    } else if (q.includes('rent') || q.includes('lease')) {
      window.open('https://toletboardchennai.in', '_blank');
    } else {
      router.push(`/partners/directory?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>Buildogram</span>
        </Link>

        {/* Main Search (Desktop) */}
        <div className={styles.navSearchWrapper}>
          <form className={styles.navSearch} onSubmit={handleSearch}>
            <input 
              type="text" 
              className={styles.navSearchInput} 
              placeholder="Search builders, architects, materials, properties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.navSearchBtn} aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Nav Links */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          
          {/* Mobile Search - Only visible when menu open on mobile */}
          <div className="hide-desktop" style={{ width: '100%', marginBottom: '10px' }}>
             <form className={styles.navSearch} onSubmit={handleSearch} style={{ width: '100%' }}>
              <input 
                type="text" 
                className={styles.navSearchInput} 
                placeholder="Search marketplace..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className={styles.navSearchBtn} aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </form>
          </div>

          <Link href="/partners/directory" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Find Verified Partners</Link>
          <Link href="/materials" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Request Material Quote</Link>
          <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Buy/Sell Properties</a>
          <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Rent/Lease Properties</a>
          <Link href="/property-passport" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Property Passport™</Link>
          <Link href="/maintenance" onClick={close} className="hide-desktop" style={{ fontWeight: 700, fontSize: '16px' }}>Maintenance & AMC</Link>
          
          <hr className="hide-desktop" style={{ margin: '8px 0', border: 'none', borderTop: '1px solid var(--border)', width: '100%' }} />

          {/* Partners */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Partners <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/partners/directory" onClick={close}>Partner Directory</Link>
              <Link href="/partners" onClick={close}>Join as Partner</Link>
              <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              <Link href="/build" onClick={close}>Construction Services</Link>
              <Link href="/boq-audit" onClick={close}>BOQ Audit</Link>
            </div>
          </div>

          {/* Materials */}
          <Link href="/materials" onClick={close} className="hide-mobile">Materials</Link>

          {/* Properties */}
          <div className={`${styles.dropdown} hide-mobile`}>
            <span className={styles.dropdownTrigger}>Properties <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" onClick={close}>Buy/Sell Properties</a>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" onClick={close}>Rent/Lease Properties</a>
              <Link href="/property-passport" onClick={close}>Property Passport™</Link>
              <Link href="/maintenance" onClick={close}>Maintenance & AMC</Link>
            </div>
          </div>

          {/* Resources */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownTrigger}>Resources <span className={styles.arrow}>▾</span></span>
            <div className={styles.dropdownMenu}>
              <Link href="/resources" onClick={close}>Resources Hub</Link>
              <Link href="/faqs" onClick={close}>FAQs</Link>
              <Link href="/cost-estimator" onClick={close}>Cost Estimator</Link>
            </div>
          </div>
          
          <Link href="/login" onClick={close} style={{ fontWeight: 600 }}>Login</Link>
          <Link href="/contact" onClick={close} className="btn btn-primary" style={{ padding: '8px 16px', color: 'white', border: 'none' }}>Request Quote</Link>

        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileMenuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
