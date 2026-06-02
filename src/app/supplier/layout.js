'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../ops/layout.module.css';

const SUPPLIER_NAV = [
  { href: '/supplier/dashboard',   icon: '📊', label: 'Dashboard'         },
  { href: '/supplier/requests',    icon: '📋', label: 'Material RFQs'     },
  { href: '/supplier/quotations',  icon: '💬', label: 'My Quotations'     },
  { href: '/supplier/orders',      icon: '📦', label: 'Orders & Delivery' },
  { href: '/supplier/products',    icon: '🏷️', label: 'Product Catalogue' },
  { href: '/supplier/profile',     icon: '🏢', label: 'Supplier Profile'  },
  { href: '/supplier/settings',    icon: '⚙️', label: 'Settings'         },
];

const BUILT = ['/supplier/dashboard', '/supplier/requests', '/supplier/quotations', '/supplier/orders', '/supplier/products'];

export default function SupplierLayout({ children }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comingSoon, setComingSoon]   = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
  }, []);

  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
        style={{ width: '260px', zIndex: 100, background: '#0F172A', color: 'white' }}>
        <div className={styles.sidebarHeader} style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" className={styles.logo} style={{ fontSize: '17px', color: 'white' }}>
            <span style={{ color: '#FC6E20' }}>⬡</span> Buildogram <span style={{ fontWeight: 400, color: '#94A3B8' }}>Supplier</span>
          </Link>
          <div style={{ marginTop: '10px', background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, display: 'inline-block' }}>
            MATERIAL SUPPLIER
          </div>
        </div>

        <nav className={styles.nav} style={{ padding: '16px 12px' }}>
          {SUPPLIER_NAV.map((item, idx) => (
            <Link key={idx} href={item.href}
              onClick={(e) => {
                if (!BUILT.includes(item.href)) { e.preventDefault(); setComingSoon(item.label); }
                setSidebarOpen(false);
              }}
              className={`${styles.navItem} ${pathname === item.href || pathname.startsWith(item.href + '/') ? styles.active : ''}`}
              style={{ color: pathname === item.href ? 'white' : '#94A3B8' }}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {user && (
            <div className={styles.userInfo}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}>{user.name[0]}</div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Material Supplier</div>
              </div>
            </div>
          )}
          <button onClick={logout} className={styles.logoutBtn} style={{ color: '#F87171' }}>Sign Out</button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} style={{ zIndex: 90 }} />}

      <div className={styles.main} style={{ marginLeft: '260px', background: '#F8FAFC' }}>
        <header className={styles.topbar}>
          <button aria-label="Open menu" className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1, fontWeight: 600, fontSize: '15px' }}>
            {SUPPLIER_NAV.find(m => m.href === pathname)?.label || 'Supplier Portal'}
          </div>
          <Link href="/" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}>← Public Site</Link>
        </header>

        <div className={styles.content} style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </div>

      {comingSoon && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div role="dialog" aria-modal="true" aria-labelledby="coming-soon-title" style={{ background: 'white', borderRadius: '20px', padding: '32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚧</div>
            <h3 id="coming-soon-title" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>{comingSoon}</h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>This module is coming soon for the Supplier Portal.</p>
            <button onClick={() => setComingSoon(null)} style={{ background: '#0F172A', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, width: '100%' }}>Got it</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media(max-width:900px){ .${styles.main}{ margin-left:0!important; } }
        .${styles.navItem}:hover { background: rgba(255,255,255,0.05); color: white !important; }
        .${styles.navItem}.${styles.active} { background: rgba(16,185,129,0.1)!important; color:#10B981!important; border-left:3px solid #10B981; border-radius:0 10px 10px 0; }
      `}} />
    </div>
  );
}
