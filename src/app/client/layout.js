'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../ops/layout.module.css';
import BottomNav from '@/components/BottomNav';

const CLIENT_NAV = [
  { href: '/client/dashboard', icon: '🏠', label: 'My Dashboard' },
  { href: '/client/projects', icon: '🏗️', label: 'My Projects' },
  { href: '/client/requests', icon: '📝', label: 'My Requests' },
  { href: '/client/project', icon: '🔧', label: 'Project (Legacy)' },
  { href: '/client/passport', icon: '🛂', label: 'Property Passport' },
  { href: '/client/documents', icon: '📁', label: 'Documents' },
  { href: '/client/invoices', icon: '🧾', label: 'My Invoices' },
  { href: '/client/profile', icon: '👤', label: 'My Profile' },
  { href: '/client/notifications', icon: '🔔', label: 'Notifications' },
  { href: '/client/settings', icon: '⚙️', label: 'Settings' },
];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comingSoonModule, setComingSoonModule] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { 
      if (d.user) {
        if (d.user.role !== 'client') {
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

  const handleNavClick = (e, href, label) => {
    // Intercept unbuilt routes
    const builtRoutes = [
      '/client/dashboard', '/client/profile', '/client/passport',
      '/client/projects', '/client/project', '/client/invoices',
      '/client/maintenance', '/client/notifications', '/client/requests',
      '/client/settings',
    ];

    // Also allow dynamic sub-routes like /client/projects/P001
    const isDynamic = ['/client/projects/'].some(prefix => href.startsWith(prefix));
    if (!builtRoutes.includes(href) && !isDynamic) {
      e.preventDefault();
      setComingSoonModule(label);
    }
    setSidebarOpen(false);
  };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`} style={{ background: '#0F172A', color: 'white' }}>
        <div className={styles.sidebarHeader} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" className={styles.logo} style={{ color: 'white' }}><span style={{ color: '#FC6E20' }}>⬡</span> Buildogram</Link>
          <div className={styles.sidebarBadge} style={{ background: 'rgba(252,110,32,0.15)', color: '#FC6E20', border: '1px solid rgba(252,110,32,0.3)' }}>Owner Portal</div>
        </div>
        <nav className={styles.nav}>
          {CLIENT_NAV.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={`${styles.navItem} ${pathname.startsWith(href) ? styles.active : ''}`} onClick={(e) => handleNavClick(e, href, label)} style={{ color: pathname.startsWith(href) ? 'white' : '#94A3B8' }}>
              <span className={styles.navIcon}>{icon}</span><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {user && <div className={styles.userInfo}><div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white' }}>{user.name[0]}</div><div><div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{user.name}</div><div style={{ fontSize: '12px', color: '#94A3B8' }}>Homeowner</div></div></div>}
          <button onClick={logout} className={styles.logoutBtn} style={{ color: '#F87171' }}>Sign Out</button>
        </div>
      </aside>
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      
      <div className={`${styles.main} has-bottom-nav`} style={{ background: '#F8FAFC' }}>
        <header className={styles.topbar} style={{ background: 'white', borderBottom: '1px solid #E2E8F0' }}>
          <button aria-label="Open menu" className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1, fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>Client Dashboard</div>
          <button onClick={() => setComingSoonModule('Raise Issue')} style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🚨 Raise Issue</button>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
      <BottomNav />

      {/* Coming Soon Modal */}
      {comingSoonModule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div role="dialog" aria-modal="true" aria-labelledby="client-coming-soon-title" style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
            <h3 id="client-coming-soon-title" style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>{comingSoonModule} is Upgrading</h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>
              We are currently transitioning this module to our new Engineer-Led Construction Companion platform. It will be back online soon with enhanced capabilities!
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
