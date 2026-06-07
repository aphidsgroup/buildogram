'use client';
import Link from 'next/link';
import Image from 'next/image';
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
  { href: '/ops/reels',       icon: '📱', label: 'Reels Player' },
  { href: '/ops/blog',        icon: '📝', label: 'Blog CMS' },
  { href: '/ops/whatsapp-templates', icon: '💬', label: 'WA Templates', requiredPerm: 'manage_whatsapp_templates' },
  { href: '/ops/notification-rules', icon: '⚙️', label: 'Notif Rules', requiredPerm: 'manage_notification_rules' },
  { href: '/ops/notification-queue', icon: '⏳', label: 'WA Queue', requiredPerm: 'manage_notification_queue' },
  { href: '/ops/reports',     icon: '📈', label: 'Reports', requiredPerm: 'view_reports' },
  { href: '/ops/cost-config', icon: '📊', label: 'Cost Config' },
  { href: '/ops/revenue',     icon: '💰', label: 'Revenue', requiredPerm: 'view_revenue' },
  { href: '/ops/invoices',    icon: '🧾', label: 'Invoices', requiredPerm: 'manage_invoices' },
  { href: '/ops/accounting',  icon: '🧮', label: 'Accounting', requiredPerm: 'manage_revenue' },
  { href: '/ops/exports',     icon: '💾', label: 'Exports & Backup', requiredPerm: 'view_reports' },
  { href: '/ops/settings',    icon: '⚙️', label: 'Settings' },
];

export default function OpsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comingSoonModule, setComingSoonModule] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { 
      if (d.user) {
        if (!['ops_admin', 'ops_pm', 'ops_engineer'].includes(d.user.role)) {
          router.push('/login');
        } else {
          setUser(d.user); 
        }
      } else {
        router.push('/login');
      }
    }).catch(() => router.push('/login'));
  }, [router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className={styles.shell}>
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`} style={{ background: '#0F172A', color: 'white' }}>
        <div className={styles.sidebarHeader} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" className={styles.logo} style={{ color: 'white', display: 'block' }}>
            <Image src="/logo-main.png" alt="Buildogram" width={240} height={60} style={{ objectFit: 'contain', height: '56px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div className={styles.sidebarBadge} style={{ background: 'rgba(252,110,32,0.15)', color: '#FC6E20', border: '1px solid rgba(252,110,32,0.3)' }}>Ops Console</div>
        </div>
        <nav className={styles.nav}>
          {OPS_NAV.map(({ href, icon, label, requiredPerm }) => {
            if (requiredPerm && user && !roleCan(user.role, requiredPerm)) return null;
            return (
              <Link 
                key={href} 
                href={href} 
                onClick={(e) => {
                  const builtRoutes = [
                    '/ops/dashboard', '/ops/leads', '/ops/users', '/ops/partners',
                    '/ops/projects', '/ops/properties', '/ops/payments', '/ops/invoices',
                    '/ops/reports', '/ops/settings', '/ops/pipeline', '/ops/revenue',
                    '/ops/accounting', '/ops/cost-config', '/ops/pilot-readiness',
                    '/ops/pilot-launch', '/ops/launch-checklist', '/ops/system-status',
                    '/ops/notification-settings', '/ops/notification-rules',
                    '/ops/notification-queue', '/ops/whatsapp-templates',
                    '/ops/blog', '/ops/help', '/ops/reels', '/ops/exports',
                  ];

                  if (!builtRoutes.includes(href)) {
                    e.preventDefault();
                    setComingSoonModule(label);
                  }
                  setSidebarOpen(false);
                }}
                style={{ color: pathname.startsWith(href) ? 'white' : '#94A3B8' }}
                className={`${styles.navItem} ${pathname.startsWith(href) ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {user && <div className={styles.userInfo}><div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white' }}>{user.name[0]}</div><div><div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{user.name}</div><div className="text-muted text-xs" style={{ color: '#94A3B8', textTransform: 'capitalize' }}>{user.role.replace('ops_', '')}</div></div></div>}
          <button onClick={logout} className={styles.logoutBtn} style={{ color: '#F87171' }}>Sign Out</button>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* MAIN */}
      <div className={styles.main} style={{ background: '#F8FAFC' }}>
        <header className={styles.topbar} style={{ background: 'white', borderBottom: '1px solid #E2E8F0' }}>
          <button aria-label="Open menu" className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1, fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>Ops Dashboard</div>
          <Link href="/ops/leads" className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', border: 'none', color: 'white', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}>+ New Lead</Link>
        </header>
        <div className={styles.content}>{children}</div>
      </div>

      {/* Coming Soon Modal */}
      {comingSoonModule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div role="dialog" aria-modal="true" aria-labelledby="ops-coming-soon-title" style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
            <h3 id="ops-coming-soon-title" style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>{comingSoonModule} is Upgrading</h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>
              We are currently transitioning this Ops module to our new Engineer-Led platform architecture. It will be back online soon!
            </p>
            <button onClick={() => setComingSoonModule(null)} style={{ background: '#0F172A', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', width: '100%' }}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Override global layout styles to match new aesthetic */}
      <style dangerouslySetInnerHTML={{__html: `
        .${styles.navItem}:hover { background: rgba(255,255,255,0.05); color: white !important; }
        .${styles.navItem}.${styles.active} { background: rgba(252,110,32,0.1) !important; color: #FC6E20 !important; border-left: 3px solid #FC6E20; }
      `}} />
    </div>
  );
}
