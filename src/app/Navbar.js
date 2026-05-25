'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

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
    <nav className={styles.topbar}>
      <Link href="/" className={styles.brand} onClick={close}>
        <div className={styles.brandMark}><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        Buildogram
      </Link>
      
      <form className={`${styles.globalSearch} hide-mobile`} onSubmit={handleSearch}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          placeholder="Search verified builders, steel, 360° tours..."
        />
      </form>

      <div className={`${styles.topActions} hide-mobile`}>
        <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px', border: 'none', background: 'var(--bg)' }}>360° tours</a>
        <Link href="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Open dashboard OS</Link>
      </div>

      <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className={styles.mobileNav}>
          <form className={styles.globalSearch} onSubmit={handleSearch} style={{ display: 'grid', marginBottom: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder="Search builders, materials..."
            />
          </form>
          <Link href="/partners/directory" onClick={close}>Directory</Link>
          <Link href="/materials" onClick={close}>Materials</Link>
          <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" onClick={close}>360° Property Tours</a>
          <Link href="/login" onClick={close} style={{ fontWeight: 800, color: 'var(--primary)', borderBottom: 'none' }}>Open Dashboard OS</Link>
        </div>
      )}
    </nav>
  );
}
