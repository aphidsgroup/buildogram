'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './layout.module.css';
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
  aiFloorPlan: { href: '/partner/ai-floor-plan-creator', icon: '📐', label: 'AI Floor Plan' },
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
    MODULES.maintenance, MODULES.reports, MODULES.aiFloorPlan, MODULES.aiAssistant, MODULES.profile, MODULES.settings
  ],
  architect: [
    MODULES.dashboard, MODULES.leads, 
    { ...MODULES.projects, label: 'Design Projects' }, MODULES.design, 
    MODULES.documents, { ...MODULES.boq, label: 'BOQ Estimation' }, 
    MODULES.clientRoom, MODULES.reports, MODULES.aiFloorPlan, MODULES.aiAssistant, MODULES.profile, MODULES.settings
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
  const [category, setCategory] = useState('builder');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comingSoonModule, setComingSoonModule] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  useEffect(() => { 
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
    
    setUnreadCount(getUnreadCount('partner'));
    const interval = setInterval(() => setUnreadCount(getUnreadCount('partner')), 30000);
    
    const handleClick = (e) => { 
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); 
    };
    document.addEventListener('mousedown', handleClick);
    return () => { clearInterval(interval); document.removeEventListener('mousedown', handleClick); };
  }, []);

  const logout = async () => { 
    await fetch('/api/auth/logout', { method: 'POST' }); 
    router.push('/login'); 
  };

  const currentMenu = ROLE_MENUS[category] || ROLE_MENUS.builder;

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>⬡</span>
            Buildogram <span className={styles.logoSub}>OS</span>
          </Link>
          <div className={styles.sidebarBadge}>
            {category.toUpperCase()} PARTNER
          </div>
        </div>
        
        <nav className={styles.nav}>
          {currentMenu.map((item, idx) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link 
                key={idx} 
                href={item.href} 
                onClick={(e) => {
                  const builtRoutes = [
                    '/partner/dashboard', '/partner/profile', '/partner/leads',
                    '/partner/projects', '/partner/materials', '/partner/documents',
                    '/partner/site-logbook', '/partner/boq-studio', '/partner/reports',
                    '/partner/ai-assistant', '/partner/issues', '/partner/finance',
                    '/partner/crew', '/partner/pre-construction', '/partner/settings',
                    '/partner/budget', '/partner/design', '/partner/progress',
                    '/partner/procurement', '/partner/vendors', '/partner/equipment',
                    '/partner/quality', '/partner/client-room', '/partner/invoices',
                    '/partner/maintenance', '/partner/ai-floor-plan-creator',
                  ];

                  if (!builtRoutes.includes(item.href)) {
                    e.preventDefault();
                    setComingSoonModule(item.label);
                  }
                  setSidebarOpen(false);
                }}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.userInfo}>
              <div className={styles.avatar}>{user.name[0]}</div>
              <div style={{ overflow: 'hidden' }}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userRole}>{category} Partner</div>
              </div>
            </div>
          )}
          <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button aria-label="Open menu" className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          
          <div className={styles.topbarTitle}>
            {currentMenu.find(m => m.href === pathname)?.label || 'Partner OS'}
          </div>
          
          <div className={styles.topActions}>
            <div ref={notifRef} className={styles.notifWrapper}>
              <button
                className={styles.notifBtn}
                onClick={() => {
                  setNotifOpen(o => !o);
                  if (!notifOpen) {
                    getNotifications('partner').then(setNotifications);
                  }
                }}
                aria-label="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className={styles.notifBadge}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {notifOpen && (
                <div className={styles.notifPanel}>
                  <div className={styles.notifHeader}>
                    <span className={styles.notifTitle}>🔔 Notifications</span>
                    <button 
                      className={styles.notifMarkRead}
                      onClick={() => { 
                        markAllRead('partner'); 
                        setUnreadCount(0); 
                        setNotifications(n => n.map(x => ({ ...x, read: true }))); 
                      }}
                    >
                      Mark all read
                    </button>
                  </div>
                  
                  <div className={styles.notifList}>
                    {notifications.length === 0 ? (
                      <div className={styles.notifEmpty}>No notifications</div>
                    ) : notifications.slice(0, 10).map(n => (
                      <div 
                        key={n.id} 
                        className={`${styles.notifItem} ${n.read ? styles.notifItemRead : styles.notifItemUnread}`}
                        onClick={() => { 
                          markRead(n.id); 
                          setUnreadCount(c => Math.max(0, c - 1)); 
                          setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x)); 
                          setNotifOpen(false); 
                          if (n.linkUrl) window.location.href = n.linkUrl; 
                        }}
                      >
                        <div className={styles.notifItemTitle} style={{ fontWeight: n.read ? 500 : 700 }}>
                          {n.title}
                        </div>
                        <div className={styles.notifItemBody}>{n.body}</div>
                        <div className={styles.notifItemTime}>
                          {new Date(n.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.notifFooter}>
                    <Link href="/partner/notifications" onClick={() => setNotifOpen(false)} className={styles.notifViewAll}>
                      View all notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/partner/profile" className={styles.topAvatar} aria-label="Profile">
              {user ? user.name[0] : 'P'}
            </Link>
          </div>
        </header>
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {comingSoonModule && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="partner-coming-soon">
            <div className={styles.modalIcon}>🚧</div>
            <h3 id="partner-coming-soon" className={styles.modalTitle}>{comingSoonModule} is Upgrading</h3>
            <p className={styles.modalDesc}>
              We are currently transitioning this module to our new Engineer-Led Construction Ecosystem. It will be back online soon with enhanced capabilities for {category} partners!
            </p>
            <button onClick={() => setComingSoonModule(null)} className={`btn btn-primary ${styles.modalBtn}`}>
              Got it
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
