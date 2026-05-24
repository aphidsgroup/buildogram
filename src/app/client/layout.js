'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../ops/layout.module.css';
import BottomNav from '@/components/BottomNav';

const CLIENT_NAV = [
  { href: '/client/dashboard', icon: '🏠', label: 'My Dashboard' },
  { href: '/client/requests', icon: '📝', label: 'My Requests' },
  { href: '/client/project', icon: '🏗️', label: 'My Project' },
  { href: '/client/passport', icon: '🛂', label: 'Property Passport' },
  { href: '/client/documents', icon: '📁', label: 'Documents' },
  { href: '/client/invoices', icon: '🧾', label: 'My Invoices' },
  { href: '/client/profile', icon: '👤', label: 'My Profile' },
  { href: '/client/notifications', icon: '🔔', label: 'Notifications' },
  { href: '/client/issues', icon: '⚠️', label: 'Raise Issue' },
];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}><span>⬡</span> Buildogram</Link>
          <div className={styles.sidebarBadge}>Client Portal</div>
        </div>
        <nav className={styles.nav}>
          {CLIENT_NAV.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={`${styles.navItem} ${pathname.startsWith(href) ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
              <span className={styles.navIcon}>{icon}</span><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          {user && <div className={styles.userInfo}><div className={styles.avatar}>{user.name[0]}</div><div><div style={{ fontSize: '13px', fontWeight: '600' }}>{user.name}</div><div className="text-muted text-xs">Homeowner</div></div></div>}
          <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <div className={`${styles.main} has-bottom-nav`}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1 }} />
          <Link href="/client/issues" className="btn btn-outline btn-sm">🚨 Raise Issue</Link>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
