'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from '../ops/layout.module.css';
import { getUnreadCount, getNotifications, markRead, markAllRead } from '@/lib/services/notificationService';

// All Possible Modules in Partner OS
const MODULES = {
  dashboard: { href: '/partner/dashboard', icon: '📊', label: 'Home Dashboard' },
  leads: { href: '/partner/leads', icon: '🎯', label: 'Lead & Sales CRM' },
  preConstruction: { href: '/partner/pre-construction', icon: '📐', label: 'Pre-Construction' },
  projects: { href: '/partner/projects', icon: '🏗️', label: 'Project Control' },
  boq: { href: '/partner/boq-studio', icon: '💰', label: 'BOQ Studio' },
  budget: { href: '/partner/budget', icon: '📉', label: 'Budget & Cost' },
  design: { href: '/partner/design', icon: '🎨', label: 'Design Manager' },
  logbook: { href: '/partner/site-logbook', icon: '📓', label: 'Site Logbook' },
  progress: { href: '/partner/progress', icon: '📈', label: 'Progress Tracker' },
  materials: { href: '/partner/materials', icon: '🧱', label: 'Material Flow' },
  procurement: { href: '/partner/procurement', icon: '🛒', label: 'Procurement' },
  vendors: { href: '/partner/vendors', icon: '🤝', label: 'Vendors & Subs' },
  crew: { href: '/partner/crew', icon: '👷', label: 'Crew Manager' },
  equipment: { href: '/partner/equipment', icon: '🚜', label: 'Asset & Equipment' },
  quality: { href: '/partner/quality', icon: '✅', label: 'Quality Vault' },
  issues: { href: '/partner/issues', icon: '🚩', label: 'Issue & Blocker' },
  clientRoom: { href: '/partner/client-room', icon: '💬', label: 'Client Room' },
  documents: { href: '/partner/documents', icon: '📁', label: 'Document Locker' },
  finance: { href: '/partner/finance', icon: '💸', label: 'Finance Tracker' },
  invoices: { href: '/partner/invoices', icon: '🧾', label: 'Invoice Manager' },
  maintenance: { href: '/partner/maintenance', icon: '🔧', label: 'Maintenance & AMC' },
  reports: { href: '/partner/reports', icon: '📑', label: 'Smart MIS Reports' },
  aiAssistant: { href: '/partner/ai-assistant', icon: '🤖', label: 'AI Site Assistant' },
  profile: { href: '/partner/profile', icon: '🏢', label: 'Public Profile' },
  settings: { href: '/partner/settings', icon: '⚙️', label: 'Settings' }
};

// Category Role Mapping
const ROLE_MENUS = {
  builder: [
    MODULES.dashboard, MODULES.leads, MODULES.preConstruction, MODULES.projects,
    MODULES.boq, MODULES.budget, MODULES.logbook, MODULES.progress, MODULES.materials,
    MODULES.procurement, MODULES.vendors, MODULES.crew, MODULES.equipment, MODULES.quality,
    MODULES.issues, MODULES.clientRoom, MODULES.documents, MODULES.finance, MODULES.invoices,
    MODULES.maintenance, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  architect: [
    MODULES.dashboard, MODULES.leads, 
    { ...MODULES.projects, label: 'Design Projects' }, MODULES.design, 
    MODULES.documents, { ...MODULES.boq, label: 'BOQ Estimation' }, 
    MODULES.clientRoom, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  interior: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Interior Projects' }, 
    MODULES.design, { ...MODULES.boq, label: 'Room-wise BOQ' }, MODULES.materials, 
    MODULES.procurement, MODULES.clientRoom, MODULES.documents, MODULES.finance, 
    MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  supplier: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Orders & Tracking' },
    { ...MODULES.materials, label: 'Product Catalogue' }, MODULES.procurement, 
    MODULES.invoices, MODULES.finance, MODULES.reports, MODULES.profile, MODULES.settings
  ],
  solar: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Solar Installations' },
    { ...MODULES.preConstruction, label: 'Site & Roof Assesment' }, MODULES.quality, 
    MODULES.maintenance, MODULES.boq, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  elevator: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Lift Installations' },
    { ...MODULES.preConstruction, label: 'Dimension Checklist' }, MODULES.quality, 
    MODULES.maintenance, MODULES.boq, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  waterproofing: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Waterproofing Projects' },
    { ...MODULES.preConstruction, label: 'Site Inspection' }, { ...MODULES.issues, label: 'Leakage Tracker' },
    MODULES.quality, MODULES.maintenance, MODULES.boq, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  homeAutomation: [
    MODULES.dashboard, MODULES.leads, { ...MODULES.projects, label: 'Automation Projects' },
    { ...MODULES.boq, label: 'Package Builder' }, { ...MODULES.quality, label: 'Device Installation' },
    MODULES.maintenance, MODULES.documents, MODULES.reports, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ]
};

export default function PartnerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('builder'); // default fallback
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comingSoonModule, setComingSoonModule] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  useEffect(() => { 
    // Fetch user and profile to determine category
    fetch('/api/auth/me').then(r => r.json()).then(d => { 
      if (d.user) setUser(d.user); 
    });
    fetch('/api/partner/profile').then(r => r.json()).then(p => {
      if (p.success && p.profile?.metadata?.category) {
        const rawCat = p.profile.metadata.category.toLowerCase();
        if (rawCat.includes('architect')) setCategory('architect');
        else if (rawCat.includes('interior')) setCategory('interior');
        else if (rawCat.includes('supplier')) setCategory('supplier');
        else if (rawCat.includes('solar')) setCategory('solar');
        else if (rawCat.includes('elevator')) setCategory('elevator');
        else if (rawCat.includes('waterproofing')) setCategory('waterproofing');
        else if (rawCat.includes('automation')) setCategory('homeAutomation');
        else setCategory('builder');
      }
    });
    // Load notification count
    setUnreadCount(getUnreadCount('partner'));
    const interval = setInterval(() => setUnreadCount(getUnreadCount('partner')), 30000);
    // Close notif panel on outside click
    const handleClick = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => { clearInterval(interval); document.removeEventListener('mousedown', handleClick); };
  }, []);

  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); };

  const currentMenu = ROLE_MENUS[category] || ROLE_MENUS.builder;

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`} style={{ width: '280px', zIndex: 100, background: '#0F172A', color: 'white' }}>
        <div className={styles.sidebarHeader} style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" className={styles.logo} style={{ fontSize: '18px', color: 'white' }}>
            <span style={{ color: '#FC6E20' }}>⬡</span> Buildogram <span style={{ fontWeight: 400, color: '#94A3B8' }}>OS</span>
          </Link>
          <div className={styles.sidebarBadge} style={{ background: 'rgba(252,110,32,0.15)', color: '#FC6E20', border: '1px solid rgba(252,110,32,0.3)' }}>
            {category.toUpperCase()} PARTNER
          </div>
        </div>
        
        <nav className={styles.nav} style={{ padding: '16px 12px' }}>
          {currentMenu.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href} 
              onClick={(e) => {
                const builtRoutes = [
                  '/partner/dashboard',
                  '/partner/profile',
                  '/partner/leads',
                  '/partner/projects',
                  '/partner/materials',
                  '/partner/documents',
                  '/partner/site-logbook',
                  '/partner/boq-studio',
                  '/partner/reports',
                  '/partner/ai-assistant',
                  '/partner/issues',
                  '/partner/finance',
                  '/partner/crew',
                  '/partner/pre-construction',
                  '/partner/settings',
                ];
                if (!builtRoutes.includes(item.href)) {
                  e.preventDefault();
                  setComingSoonModule(item.label);
                }
                setSidebarOpen(false);
              }}
              style={{ color: pathname === item.href || pathname.startsWith(item.href + '/') ? 'white' : '#94A3B8' }}
              className={`${styles.navItem} ${pathname === item.href || pathname.startsWith(item.href + '/') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span style={{ fontSize: '14.5px' }}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {user && (
            <div className={styles.userInfo}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white' }}>
                {user.name[0]}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user.name}
                </div>
                <div className="text-muted text-xs" style={{ textTransform: 'capitalize', color: '#94A3B8' }}>
                  {category} Partner
                </div>
              </div>
            </div>
          )}
          <button onClick={logout} className={styles.logoutBtn} style={{ color: '#F87171' }}>Sign Out</button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} style={{ zIndex: 90 }} />}

      <div className={styles.main} style={{ marginLeft: '280px', background: '#F8FAFC' }}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1, fontWeight: 600, fontSize: '16px' }}>
            {currentMenu.find(m => m.href === pathname)?.label || 'Partner OS'}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Notification Bell */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setNotifOpen(o => !o);
                  if (!notifOpen) {
                    getNotifications('partner').then(setNotifications);
                  }
                }}
                style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '50%', width: '36px', height: '36px', fontSize: '16px', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#EF4444', color: 'white', borderRadius: '50%', fontSize: '10px', fontWeight: 800, minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px', lineHeight: 1 }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div style={{ position: 'absolute', right: 0, top: '44px', width: '320px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', zIndex: 9999, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '14px' }}>🔔 Notifications</span>
                    <button onClick={() => { markAllRead('partner'); setUnreadCount(0); setNotifications(n => n.map(x => ({ ...x, read: true }))); }} style={{ fontSize: '11px', color: '#FC6E20', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Mark all read</button>
                  </div>
                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>No notifications</div>
                    ) : notifications.slice(0, 10).map(n => (
                      <div key={n.id} onClick={() => { markRead(n.id); setUnreadCount(c => Math.max(0, c - 1)); setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x)); setNotifOpen(false); if (n.linkUrl) window.location.href = n.linkUrl; }}
                        style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer', background: n.read ? 'white' : '#FFF7ED', transition: 'background 0.15s' }}
                      >
                        <div style={{ fontWeight: n.read ? 500 : 700, fontSize: '13px', color: '#0F172A', marginBottom: '3px' }}>{n.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>{n.body}</div>
                        <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>{new Date(n.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <Link href="/partner/notifications" onClick={() => setNotifOpen(false)} style={{ fontSize: '12px', color: '#FC6E20', fontWeight: 700, textDecoration: 'none' }}>View all notifications →</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/partner/profile" style={{ background: 'var(--gradient-orange)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 600 }}>
              {user ? user.name[0] : 'P'}
            </Link>
          </div>
        </header>
        
        <div className={styles.content} style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {comingSoonModule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>{comingSoonModule} is Upgrading</h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>
              We are currently transitioning this module to our new Engineer-Led Construction Ecosystem. It will be back online soon with enhanced capabilities for {category} partners!
            </p>
            <button onClick={() => setComingSoonModule(null)} style={{ background: '#0F172A', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', width: '100%' }}>
              Got it
            </button>
          </div>
        </div>
      )}
      
      {/* Dynamic CSS override for mobile layout sidebar width compensation */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .${styles.main} { margin-left: 0 !important; }
        }
        .${styles.navItem}:hover { background: rgba(255,255,255,0.05); color: white !important; }
        .${styles.navItem}.${styles.active} {
          background: rgba(252, 110, 32, 0.1) !important;
          color: #FC6E20 !important;
          border-left: 3px solid #FC6E20;
          border-radius: 0 10px 10px 0;
        }
      `}} />
    </div>
  );
}
