'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCard, SectionHeader, StatusBadge } from '../_shared/components';
import { DEMO_LEADS, DEMO_PROJECTS, DEMO_MATERIALS, DEMO_LOGBOOK } from '../_shared/demoData';
import { getLeads } from '@/lib/services/leadService';
import { getProjects } from '@/lib/services/projectService';
import { getMaterialRequests } from '@/lib/services/materialRequestService';
import { getOnboardingChecklist, completeOnboardingStep } from '@/lib/services/onboardingService';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import styles from './dashboard.module.css';

const ACTIVITY = [
  { icon: '🎯', text: 'New lead from Buildogram – Deepa Menon', time: '2 hours ago' },
  { icon: '📓', text: 'Daily logbook updated for P001 – Rajesh Kumar Villa', time: '4 hours ago' },
  { icon: '✅', text: 'BOQ approved for ECR Villa project', time: 'Yesterday' },
  { icon: '🧱', text: 'Material request raised – 200 bags cement', time: 'Yesterday' },
];

const STAT_COLORS = ['orange', 'green', 'purple', 'danger', 'danger', 'purple', 'orange', 'blue'];

function ProgressBar({ pct }) {
  return (
    <div className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function PartnerDashboard() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState(DEMO_LEADS);
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [materials, setMaterials] = useState(DEMO_MATERIALS);
  const [matches, setMatches] = useState([]);
  const [checklist, setChecklist] = useState(null);
  const [checklistDismissed, setChecklistDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        const cl = getOnboardingChecklist(d.user.id || 'demo');
        setChecklist(cl);
        const dismissed = localStorage.getItem('bos_checklist_dismissed');
        if (dismissed) setChecklistDismissed(true);
      }
    });
    getLeads().then(data => { if (data?.length) setLeads(data); });
    getProjects().then(data => { if (data?.length) setProjects(data); });
    getMaterialRequests().then(data => { if (data?.length) setMaterials(data); });
    fetch('/api/partner-matches').then(r => r.json()).then(d => {
      if (d.data) setMatches(d.data);
    }).catch(() => {});
  }, []);

  const dismissChecklist = () => {
    setChecklistDismissed(true);
    localStorage.setItem('bos_checklist_dismissed', '1');
  };

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const totalMaterials = materials.length;
  const firstName = user?.name?.split(' ')[0] || 'Partner';

  const CHECKLIST_ITEMS = [
    { key: 'profile_completed',  label: 'Complete business profile', href: '/partner/profile',      icon: '👤' },
    { key: 'first_project',      label: 'Add first project',         href: '/partner/projects',     icon: '🏗️' },
    { key: 'first_site_update',  label: 'Post a site update',        href: '/partner/site-logbook', icon: '📸' },
    { key: 'first_material_req', label: 'Create material request',   href: '/partner/materials',    icon: '🧱' },
    { key: 'first_document',     label: 'Upload a document',         href: '/partner/documents',    icon: '📄' },
    { key: 'first_milestone',    label: 'Add a project milestone',   href: '/partner/projects',     icon: '✅' },
    { key: 'boq_generated',      label: 'Generate a BOQ',            href: '/partner/boq-studio',   icon: '💰' },
  ];
  const completedSteps = checklist ? CHECKLIST_ITEMS.filter(i => checklist[i.key]).length : 0;
  const showChecklist = checklist && !checklistDismissed && completedSteps < CHECKLIST_ITEMS.length;

  const type = user?.partnerType || user?.partner_type || user?.partnerCategory || 'default';
  const typeMap = {
    builder:           { label: 'Builder',          icon: '🏗️', actions: [{ href: '/partner/projects', icon: '📋', text: 'View Projects' }, { href: '/partner/site-logbook', icon: '📓', text: 'Update Logbook' }, { href: '/partner/materials', icon: '🧱', text: 'Material Requests' }, { href: '/partner/issues', icon: '⚠️', text: 'Site Issues' }] },
    contractor:        { label: 'Contractor',       icon: '🔨', actions: [{ href: '/partner/projects', icon: '📋', text: 'View Projects' }, { href: '/partner/materials', icon: '🧱', text: 'Material Requests' }, { href: '/partner/issues', icon: '⚠️', text: 'Raise Issues' }, { href: '/partner/finance', icon: '💰', text: 'Finance Overview' }] },
    architect:         { label: 'Architect',        icon: '📐', actions: [{ href: '/partner/leads', icon: '🎯', text: 'Design Inquiries' }, { href: '/partner/projects', icon: '📁', text: 'Project Files' }, { href: '/partner/documents', icon: '📄', text: 'Drawings & Docs' }, { href: '/partner/profile', icon: '🌐', text: 'Public Profile' }] },
    civil_engineer:    { label: 'Civil Engineer',   icon: '📏', actions: [{ href: '/partner/projects', icon: '📋', text: 'Active Projects' }, { href: '/partner/site-logbook', icon: '📓', text: 'Site Logbook' }, { href: '/partner/materials', icon: '🧱', text: 'Material Orders' }, { href: '/partner/issues', icon: '⚠️', text: 'Site Issues' }] },
    interior_designer: { label: 'Interior Designer',icon: '🎨', actions: [{ href: '/partner/leads', icon: '🎯', text: 'Client Leads' }, { href: '/partner/projects', icon: '🏠', text: 'Design Projects' }, { href: '/partner/materials', icon: '🪑', text: 'Material Selection' }, { href: '/partner/profile', icon: '🌐', text: 'Portfolio' }] },
    material_supplier: { label: 'Supplier',         icon: '🚚', actions: [{ href: '/supplier/requests', icon: '📬', text: 'Open RFQs' }, { href: '/supplier/quotations', icon: '📊', text: 'My Quotations' }, { href: '/supplier/dashboard', icon: '📈', text: 'Dashboard' }, { href: '/partner/profile', icon: '🌐', text: 'My Profile' }] },
    default:           { label: 'Partner',          icon: '🤝', actions: [{ href: '/partner/leads', icon: '🎯', text: 'My Leads' }, { href: '/partner/projects', icon: '📋', text: 'Projects' }, { href: '/partner/materials', icon: '🧱', text: 'Materials' }, { href: '/partner/finance', icon: '💰', text: 'Finance' }] },
  };
  const cfg = typeMap[type] || typeMap.default;

  return (
    <div className={styles.page}>

      {/* ── GREETING BANNER ── */}
      <AnimatedSection className={styles.greetBanner}>
        <div className={styles.greetLeft}>
          <div className={styles.greetEyebrow}>Buildogram Partner OS</div>
          <h1 className={styles.greetTitle}>Good day, {firstName}! 👋</h1>
          <p className={styles.greetSub}>Here is your Partner OS overview for today.</p>
        </div>
        <div className={styles.greetRight}>
          <div className={styles.greetStat}>
            <span className={styles.greetStatVal}>{leads.length}</span>
            <span className={styles.greetStatLabel}>Total Leads</span>
          </div>
          <div className={styles.greetDivider} />
          <div className={styles.greetStat}>
            <span className={styles.greetStatVal}>{activeProjects}</span>
            <span className={styles.greetStatLabel}>Active Projects</span>
          </div>
          <div className={styles.greetDivider} />
          <div className={styles.greetStat}>
            <span className={styles.greetStatVal}>{totalMaterials}</span>
            <span className={styles.greetStatLabel}>Material Req.</span>
          </div>
        </div>
      </AnimatedSection>

      <PWAInstallPrompt message="Install Buildogram Partner OS for faster site updates." />

      {/* ── KPI CARDS ── */}
      <AnimatedSection className={styles.kpiGrid} delay={0.05}>
        <MetricCard icon="🎯" label="Total Leads"       value={leads.length}        sub={`${leads.filter(l => l.status === 'New').length} new`} onClick={() => window.location.href = '/partner/leads'} />
        <MetricCard icon="🏗️" label="Active Projects"   value={activeProjects}       sub={`${projects.length} total`} color="#10B981" onClick={() => window.location.href = '/partner/projects'} />
        <MetricCard icon="💰" label="Total BOQ Value"   value="₹4.2 Cr"             sub="Approved budgets" color="#6366F1" onClick={() => window.location.href = '/partner/boq-studio'} />
        <MetricCard icon="💸" label="Pending Payments"  value="₹12.5 L"             sub="3 milestones due" color="#EF4444" onClick={() => window.location.href = '/partner/finance'} />
        <MetricCard icon="🚩" label="Open Issues"       value="2"                    sub="1 high priority" color="#EF4444" onClick={() => window.location.href = '/partner/issues'} />
        <MetricCard icon="📓" label="Site Updates Today" value={DEMO_LOGBOOK.length} sub="Across all projects" color="#8B5CF6" onClick={() => window.location.href = '/partner/site-logbook'} />
        <MetricCard icon="🧱" label="Material Requests" value={totalMaterials}       sub={`${materials.filter(m => m.status === 'Approved' || m.status === 'approved').length} approved`} color="#F59E0B" onClick={() => window.location.href = '/partner/materials'} />
        <MetricCard icon="🏢" label="Profile Completion" value="75%"                sub="Add more details" color="#0EA5E9" onClick={() => window.location.href = '/partner/profile'} />
      </AnimatedSection>

      {/* ── ONBOARDING CHECKLIST ── */}
      {showChecklist && (
        <AnimatedSection className={styles.checklist} delay={0.08}>
          <div className={styles.checklistHeader}>
            <div>
              <div className={styles.checklistTitle}>🚀 Get Started — {completedSteps}/{CHECKLIST_ITEMS.length} steps complete</div>
              <div className={styles.checklistSub}>Complete your Partner OS setup to unlock full capabilities.</div>
            </div>
            <button onClick={dismissChecklist} className={styles.checklistClose} aria-label="Dismiss checklist">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className={styles.checklistBar}>
            <div className={styles.checklistBarFill} style={{ width: `${Math.round((completedSteps / CHECKLIST_ITEMS.length) * 100)}%` }} />
          </div>
          <div className={styles.checklistItems}>
            {CHECKLIST_ITEMS.map(item => (
              <Link key={item.key} href={item.href} className={`${styles.checklistItem} ${checklist[item.key] ? styles.checklistItemDone : ''}`}>
                <span className={styles.checklistItemIcon}>{checklist[item.key] ? '✓' : item.icon}</span>
                <span className={checklist[item.key] ? styles.checklistItemLabelDone : ''}>{item.label}</span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* ── PROJECTS + LEADS ── */}
      <div className={styles.midGrid}>
        {/* Active Projects */}
        <AnimatedSection className={styles.card} delay={0.1}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Active Projects</h2>
            <a href="#" onClick={e => { e.preventDefault(); alert('Project Control is being upgraded.'); }} className={styles.viewAll}>View all →</a>
          </div>
          {projects.slice(0, 4).map(p => (
            <div key={p.id} className={styles.projectRow}>
              <div className={styles.projectTop}>
                <span className={styles.projectName}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className={styles.projectMeta}>{p.location} · Stage: {p.stage}</div>
              <ProgressBar pct={p.progress} />
              <div className={styles.projectPct}>{p.progress}% complete</div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className={styles.emptyMsg}>No projects yet. <a href="#" onClick={e => { e.preventDefault(); alert('Coming Soon!'); }} className={styles.emptyLink}>Add one →</a></div>
          )}
        </AnimatedSection>

        {/* Lead Pipeline */}
        <AnimatedSection className={styles.card} delay={0.12}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Lead Pipeline</h2>
            <a href="#" onClick={e => { e.preventDefault(); alert('Lead CRM is being upgraded.'); }} className={styles.viewAll}>View all →</a>
          </div>
          {leads.slice(0, 5).map(l => (
            <div key={l.id} className={styles.leadRow}>
              <div>
                <div className={styles.leadName}>{l.customerName}</div>
                <div className={styles.leadReq}>{l.requirement}</div>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* ── ACTIVITY FEED ── */}
      <AnimatedSection className={styles.card} delay={0.14}>
        <h2 className={styles.cardTitle} style={{ marginBottom: '20px' }}>Recent Activity</h2>
        <div className={styles.activityList}>
          {ACTIVITY.map((a, i) => (
            <div key={i} className={styles.activityRow}>
              <div className={styles.activityIcon}>{a.icon}</div>
              <div className={styles.activityBody}>
                <div className={styles.activityText}>{a.text}</div>
                <div className={styles.activityTime}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── QUICK ACTIONS (Role-based) ── */}
      <AnimatedSection className={styles.quickActionsWrap} delay={0.16}>
        <div className={styles.qaHeader}>
          <span className={styles.qaEyebrow}>{cfg.icon} {cfg.label} Quick Actions</span>
          <span className={styles.qaSub}>Shortcuts tailored for your role.</span>
        </div>
        <div className={styles.qaGrid}>
          {cfg.actions.map(a => (
            <Link key={a.href} href={a.href} className={styles.qaCard}>
              <span className={styles.qaIcon}>{a.icon}</span>
              <span>{a.text}</span>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* ── ASSIGNED OPPORTUNITIES ── */}
      <AnimatedSection className={styles.card} delay={0.18}>
        <h2 className={styles.cardTitle} style={{ marginBottom: '20px' }}>Assigned Opportunities & Action Items</h2>
        <div className={styles.oppsGrid}>
          <div className={styles.oppCard}>
            <div className={styles.oppCardHeader}>
              <span className={styles.oppCardTitle}>Profile Status</span>
              <Badge variant="warning">Verification Pending</Badge>
            </div>
            <p className={styles.oppCardDesc}>Please upload your recent project completion certificates.</p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Coming Soon!')}>Submit Profile Proof</button>
          </div>

          {matches.map(m => (
            <div key={m.id} className={styles.oppCard}>
              <div className={styles.oppCardHeader}>
                <span className={styles.oppCardTitle}>{m.partnerType || 'Opportunity'}</span>
                <Badge variant="info">{m.matchStatus}</Badge>
              </div>
              <p className={styles.oppCardDesc}>Buildogram matched you with a new requirement.</p>
              <button className="btn btn-outline btn-sm" onClick={() => alert('Coming Soon!')}>View Opportunity</button>
            </div>
          ))}

          <div className={styles.oppCard}>
            <div className={styles.oppCardHeader}>
              <span className={styles.oppCardTitle}>Marketing</span>
              <Badge variant="success">Project Showcase Request</Badge>
            </div>
            <p className={styles.oppCardDesc}>Our media team wants to feature your recent site on Instagram Reels.</p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Coming soon.')}>Request Showcase Collaboration</button>
          </div>
        </div>
      </AnimatedSection>

      {/* ── FREE PLAN USAGE ── */}
      <AnimatedSection className={styles.card} delay={0.2}>
        <div className={styles.planHeader}>
          <div>
            <h2 className={styles.cardTitle}>Free Partner OS Plan</h2>
            <p className={styles.planSub}>You are using the free Buildogram Partner OS plan. Upgrade coming soon.</p>
          </div>
          <Badge variant="orange">FREE PLAN</Badge>
        </div>
        <div className={styles.usageGrid}>
          {[
            { label: 'Private Projects',  used: projects.filter(p => p.status !== 'Completed').length, max: 2 },
            { label: 'Material Requests', used: materials.length, max: 20 },
            { label: 'Documents',         used: 3,  max: 25 },
            { label: 'Team Members',      used: 1,  max: 3  },
          ].map(item => {
            const pct = Math.min(100, Math.round((item.used / item.max) * 100));
            const warn = pct >= 80;
            return (
              <div key={item.label} className={`${styles.usageItem} ${warn ? styles.usageWarn : ''}`}>
                <div className={styles.usageTop}>
                  <span className={styles.usageLabel}>{item.label}</span>
                  <span className={`${styles.usageCount} ${warn ? styles.usageCountWarn : ''}`}>{item.used} / {item.max}</span>
                </div>
                <div className={styles.usageTrack}>
                  <div className={styles.usageFill} style={{ width: `${pct}%`, background: warn ? '#F59E0B' : 'var(--gradient-orange)' }} />
                </div>
                {warn && <div className={styles.usageWarning}>Approaching limit</div>}
              </div>
            );
          })}
        </div>
        <div className={styles.upgradeBanner}>
          <span>🚀 Unlock unlimited projects, team members & priority leads with Buildogram Pro.</span>
          <button className="btn btn-primary btn-sm">Upgrade Coming Soon</button>
        </div>
      </AnimatedSection>

    </div>
  );
}
