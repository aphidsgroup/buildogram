'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../ops/layout.module.css';

const PARTNER_NAV = [
  { href: '/partner/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/partner/projects', icon: '🏗️', label: 'My Projects' },
  { href: '/partner/logs', icon: '📸', label: 'Daily Logs' },
  { href: '/partner/qc', icon: '✅', label: 'QC Checklists' },
  { href: '/partner/settings', icon: '⚙️', label: 'Settings' },
];

export default function PartnerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => { fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); }); }, []);
  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}><span>⬡</span> Buildogram</Link>
          <div className={styles.sidebarBadge}>Partner Portal</div>
        </div>
        <nav className={styles.nav}>
          {PARTNER_NAV.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={`${styles.navItem} ${pathname.startsWith(href) ? styles.active : ''}`}>
              <span className={styles.navIcon}>{icon}</span><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          {user && <div className={styles.userInfo}><div className={styles.avatar}>{user.name[0]}</div><div><div style={{ fontSize: '13px', fontWeight: '600' }}>{user.name}</div><div className="text-muted text-xs">{user.role}</div></div></div>}
          <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>
      <div className={styles.main}>
        <header className={styles.topbar}><div style={{ flex: 1 }} /></header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
