'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { roleCan } from '@/lib/permissions';

const OPS_NAV = [
  { href: '/ops/dashboard',   icon: '📊', label: 'Dashboard' },
  { href: '/ops/leads',       icon: '🎯', label: 'Leads' },
  { href: '/ops/pipeline',    icon: '🛤️', label: 'Pipeline' },
  { href: '/ops/partners',    icon: '🤝', label: 'Partners' },
  { href: '/ops/properties',  icon: '🛂', label: 'Properties' },
  { href: '/ops/projects',    icon: '🏗️', label: 'Projects' },
  { href: '/ops/users',       icon: '👥', label: 'Users' },
  { href: '/ops/blog',        icon: '📝', label: 'Blog CMS' },
  { href: '/ops/whatsapp-templates', icon: '💬', label: 'WA Templates', requiredPerm: 'manage_whatsapp_templates' },
  { href: '/ops/notification-rules', icon: '⚙️', label: 'Notif Rules', requiredPerm: 'manage_notification_rules' },
  { href: '/ops/notification-queue', icon: '⏳', label: 'WA Queue', requiredPerm: 'manage_notification_queue' },
  { href: '/ops/reports',     icon: '📈', label: 'Reports', requiredPerm: 'view_reports' },
  { href: '/ops/cost-config', icon: '📊', label: 'Cost Config' },
  { href: '/ops/revenue',     icon: '💰', label: 'Revenue', requiredPerm: 'view_revenue' },
];

export default function OpsLayout({ children }) {
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
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}><span>⬡</span> Buildogram</Link>
          <div className={styles.sidebarBadge}>Ops Console</div>
        </div>
        <nav className={styles.nav}>
          {OPS_NAV.map(({ href, icon, label, requiredPerm }) => {
            if (requiredPerm && user && !roleCan(user.role, requiredPerm)) return null;
            return (
              <Link key={href} href={href} className={`${styles.navItem} ${pathname.startsWith(href) ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                <span className={styles.navIcon}>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          {user && <div className={styles.userInfo}><div className={styles.avatar}>{user.name[0]}</div><div><div style={{ fontSize: '13px', fontWeight: '600' }}>{user.name}</div><div className="text-muted text-xs">{user.role}</div></div></div>}
          <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* MAIN */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1 }} />
          <Link href="/ops/leads" className="btn btn-primary btn-sm">+ New Lead</Link>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
