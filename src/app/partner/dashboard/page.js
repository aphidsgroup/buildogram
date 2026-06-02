'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCard, SectionHeader, StatusBadge } from '../_shared/components';
import { DEMO_LEADS, DEMO_PROJECTS, DEMO_MATERIALS, DEMO_LOGBOOK } from '../_shared/demoData';
import { getLeads } from '@/lib/services/leadService';
import { getProjects } from '@/lib/services/projectService';
import { getMaterialRequests } from '@/lib/services/materialRequestService';
import { getOnboardingChecklist, completeOnboardingStep } from '@/lib/services/onboardingService';

const ACTIVITY = [
  { icon: '🎯', text: 'New lead from Buildogram – Deepa Menon', time: '2 hours ago' },
  { icon: '📓', text: 'Daily logbook updated for P001 – Rajesh Kumar Villa', time: '4 hours ago' },
  { icon: '✅', text: 'BOQ approved for ECR Villa project', time: 'Yesterday' },
  { icon: '🧱', text: 'Material request raised – 200 bags cement', time: 'Yesterday' },
];

function ProgressBar({ pct }) {
  return (
    <div style={{ background: '#E2E8F0', borderRadius: '4px', height: '6px', margin: '8px 0 4px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #FFB347, #FC6E20)', borderRadius: '4px' }} />
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
        // Load onboarding checklist
        const cl = getOnboardingChecklist(d.user.id || 'demo');
        setChecklist(cl);
        const dismissed = localStorage.getItem('bos_checklist_dismissed');
        if (dismissed) setChecklistDismissed(true);
      }
    });
    // Load data via service layer (API first, localStorage fallback)
    getLeads().then(data => { if (data?.length) setLeads(data); });
    getProjects().then(data => { if (data?.length) setProjects(data); });
    getMaterialRequests().then(data => { if (data?.length) setMaterials(data); });
    fetch('/api/partner-matches').then(r => r.json()).then(d => {
      if (d.data) setMatches(d.data);
    }).catch(e => console.error(e));
  }, []);

  const dismissChecklist = () => {
    setChecklistDismissed(true);
    localStorage.setItem('bos_checklist_dismissed', '1');
  };

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const totalMaterials = materials.length;
  const firstName = user?.name?.split(' ')[0] || 'Partner';

  // Onboarding checklist items
  const CHECKLIST_ITEMS = [
    { key: 'profile_completed',  label: 'Complete business profile', href: '/partner/profile',   icon: '👤' },
    { key: 'first_project',      label: 'Add first project',         href: '/partner/projects',  icon: '🏗️' },
    { key: 'first_site_update',  label: 'Post a site update',        href: '/partner/site-logbook', icon: '📸' },
    { key: 'first_material_req', label: 'Create material request',   href: '/partner/materials', icon: '🧱' },
    { key: 'first_document',     label: 'Upload a document',         href: '/partner/documents', icon: '📄' },
    { key: 'first_milestone',    label: 'Add a project milestone',   href: '/partner/projects',  icon: '✅' },
    { key: 'boq_generated',      label: 'Generate a BOQ',            href: '/partner/boq-studio',icon: '💰' },
  ];
  const completedSteps = checklist ? CHECKLIST_ITEMS.filter(i => checklist[i.key]).length : 0;
  const showChecklist = checklist && !checklistDismissed && completedSteps < CHECKLIST_ITEMS.length;

  return (
    <div>
      {/* GREETING */}
      <div style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '40px', borderRadius: '24px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
          Good day, {firstName}! 👋
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '16px' }}>Here is your Buildogram Partner OS overview.</p>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <MetricCard icon="🎯" label="Total Leads" value={leads.length} sub={`${leads.filter(l => l.status === 'New').length} new`} onClick={() => window.location.href = '/partner/leads'} />
        <MetricCard icon="🏗️" label="Active Projects" value={activeProjects} sub={`${projects.length} total`} color="#10B981" onClick={() => window.location.href = '/partner/projects'} />
        <MetricCard icon="💰" label="Total BOQ Value" value="₹4.2 Cr" sub="Approved budgets" color="#6366F1" onClick={() => window.location.href = '/partner/boq-studio'} />
        <MetricCard icon="💸" label="Pending Payments" value="₹12.5 L" sub="3 milestones due" color="#EF4444" onClick={() => window.location.href = '/partner/finance'} />
        <MetricCard icon="🚩" label="Open Issues" value="2" sub="1 high priority" color="#EF4444" onClick={() => window.location.href = '/partner/issues'} />
        <MetricCard icon="📓" label="Site Updates Today" value={DEMO_LOGBOOK.length} sub="Across all projects" color="#8B5CF6" onClick={() => window.location.href = '/partner/site-logbook'} />
        <MetricCard icon="🧱" label="Material Requests" value={totalMaterials} sub={`${materials.filter(m => m.status === 'Approved' || m.status === 'approved').length} approved`} color="#F59E0B" onClick={() => window.location.href = '/partner/materials'} />
        <MetricCard icon="🏢" label="Profile Completion" value="75%" sub="Add more details" color="#0EA5E9" onClick={() => window.location.href = '/partner/profile'} />
      </div>

      {/* ONBOARDING CHECKLIST BANNER */}
      {showChecklist && (
        <div style={{ marginBottom: '28px', background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)', border: '1px solid #FDE68A', borderRadius: '20px', padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#92400E', marginBottom: '4px' }}>
                🚀 Get Started — {completedSteps}/{CHECKLIST_ITEMS.length} steps complete
              </div>
              <div style={{ fontSize: '13px', color: '#B45309' }}>Complete your Partner OS setup to unlock full capabilities.</div>
            </div>
            <button onClick={dismissChecklist} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B45309', fontSize: '18px', flexShrink: 0 }} title="Dismiss">✕</button>
          </div>
          {/* Progress bar */}
          <div style={{ background: '#FDE68A', borderRadius: '4px', height: '6px', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.round((completedSteps / CHECKLIST_ITEMS.length) * 100)}%`, height: '100%', background: '#D97706', borderRadius: '4px', transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
            {CHECKLIST_ITEMS.map(item => (
              <Link key={item.key} href={item.href}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: checklist[item.key] ? '#F0FDF4' : 'white', border: `1px solid ${checklist[item.key] ? '#86EFAC' : '#FDE68A'}`, borderRadius: '10px', textDecoration: 'none', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <span style={{ fontSize: '18px' }}>{checklist[item.key] ? '✅' : item.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: checklist[item.key] ? '#15803D' : '#78350F', textDecoration: checklist[item.key] ? 'line-through' : 'none' }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MIDDLE GRID */}
      <div className="dash-mid-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '32px' }}>
        {/* PROJECTS */}
        <div className="card" style={{ padding: '28px', borderRadius: '24px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Active Projects</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Project Control is being upgraded.'); }} style={{ fontSize: '13px', color: '#FC6E20', fontWeight: 700, textDecoration: 'none' }}>View all →</a>
          </div>
          {projects.slice(0, 4).map(p => (
            <div key={p.id} style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: 500 }}>{p.location} · Stage: {p.stage}</div>
              <ProgressBar pct={p.progress} />
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', fontWeight: 600 }}>{p.progress}% complete</div>
            </div>
          ))}
          {projects.length === 0 && <div style={{ color: '#94A3B8', textAlign: 'center', padding: '20px', fontSize: '14px' }}>No projects yet. <a href="#" onClick={(e) => { e.preventDefault(); alert('Project Control is being upgraded.'); }} style={{ color: '#FC6E20', fontWeight: 600 }}>Add one →</a></div>}
        </div>

        {/* LEADS */}
        <div className="card" style={{ padding: '28px', borderRadius: '24px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Lead Pipeline</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Lead CRM is being upgraded.'); }} style={{ fontSize: '13px', color: '#FC6E20', fontWeight: 700, textDecoration: 'none' }}>View all →</a>
          </div>
          {leads.slice(0, 5).map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>{l.customerName}</div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>{l.requirement}</div>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div className="card" style={{ padding: '28px', borderRadius: '24px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', flexShrink: 0, background: '#F8FAFC', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{a.icon}</div>
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>{a.text}</div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT REFERRALS (WORKFLOW INTEGRATION) */}
      <div className="card" style={{ padding: '28px', borderRadius: '24px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Assigned Opportunities & Action Items</h2>
        <div className="grid-3 gap-4">
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
            <div className="flex-between mb-2">
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Profile Status</span>
              <span className="badge badge-yellow" style={{ fontSize: '12px' }}>Verification Pending</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Please upload your recent project completion certificates.</p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Coming Soon!')}>Submit Profile Proof</button>
          </div>
          
          {matches.map(m => (
            <div key={m.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
              <div className="flex-between mb-2">
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>{m.partnerType || 'Opportunity'}</span>
                <span className="badge badge-blue" style={{ fontSize: '12px' }}>{m.matchStatus}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Buildogram matched you with a new requirement.</p>
              <button className="btn btn-outline btn-sm" onClick={() => alert('Coming Soon!')}>View Opportunity</button>
            </div>
          ))}
          
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
            <div className="flex-between mb-2">
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Marketing</span>
              <span className="badge badge-green" style={{ fontSize: '12px' }}>Project Showcase Request</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Our media team wants to feature your recent site on Instagram Reels.</p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Partner Document Upload feature ready soon.')}>Request Showcase Collaboration</button>
          </div>
        </div>
      </div>

      {/* PARTNER-TYPE CONTEXT WIDGET */}
      {(() => {
        const type = user?.partnerType || user?.partner_type || user?.partnerCategory || 'default';
        const typeMap = {
          builder:           { label: 'Builder', icon: '🏗️', color: '#6366F1', bg: '#EEF2FF', actions: [{ href: '/partner/projects', icon: '📋', text: 'View Projects' }, { href: '/partner/logbook', icon: '📓', text: 'Update Logbook' }, { href: '/partner/materials', icon: '🧱', text: 'Material Requests' }, { href: '/partner/issues', icon: '⚠️', text: 'Site Issues' }] },
          contractor:        { label: 'Contractor', icon: '🔨', color: '#0EA5E9', bg: '#F0F9FF', actions: [{ href: '/partner/projects', icon: '📋', text: 'View Projects' }, { href: '/partner/materials', icon: '🧱', text: 'Material Requests' }, { href: '/partner/issues', icon: '⚠️', text: 'Raise Issues' }, { href: '/partner/finance', icon: '💰', text: 'Finance Overview' }] },
          architect:         { label: 'Architect', icon: '📐', color: '#7C3AED', bg: '#F5F3FF', actions: [{ href: '/partner/leads', icon: '🎯', text: 'Design Inquiries' }, { href: '/partner/projects', icon: '📁', text: 'Project Files' }, { href: '/partner/documents', icon: '📄', text: 'Drawings & Docs' }, { href: '/partner/profile', icon: '🌐', text: 'Public Profile' }] },
          civil_engineer:    { label: 'Civil Engineer', icon: '📏', color: '#0891B2', bg: '#ECFEFF', actions: [{ href: '/partner/projects', icon: '📋', text: 'Active Projects' }, { href: '/partner/logbook', icon: '📓', text: 'Site Logbook' }, { href: '/partner/materials', icon: '🧱', text: 'Material Orders' }, { href: '/partner/issues', icon: '⚠️', text: 'Site Issues' }] },
          interior_designer: { label: 'Interior Designer', icon: '🎨', color: '#EC4899', bg: '#FDF2F8', actions: [{ href: '/partner/leads', icon: '🎯', text: 'Client Leads' }, { href: '/partner/projects', icon: '🏠', text: 'Design Projects' }, { href: '/partner/materials', icon: '🪑', text: 'Material Selection' }, { href: '/partner/profile', icon: '🌐', text: 'Portfolio' }] },
          material_supplier: { label: 'Material Supplier', icon: '🚚', color: '#D97706', bg: '#FFFBEB', actions: [{ href: '/supplier/requests', icon: '📬', text: 'Open RFQs' }, { href: '/supplier/quotations', icon: '📊', text: 'My Quotations' }, { href: '/supplier/dashboard', icon: '📈', text: 'Supplier Dashboard' }, { href: '/partner/profile', icon: '🌐', text: 'My Profile' }] },
          property_partner:  { label: 'Property Partner', icon: '🏘️', color: '#059669', bg: '#ECFDF5', actions: [{ href: '/partner/leads', icon: '🎯', text: 'Property Leads' }, { href: '/properties', icon: '🏠', text: 'Listings' }, { href: '/partner/finance', icon: '💰', text: 'Commission Tracker' }, { href: '/partner/profile', icon: '🌐', text: 'My Profile' }] },
          default:           { label: 'Partner', icon: '🤝', color: '#FC6E20', bg: '#FFF7ED', actions: [{ href: '/partner/leads', icon: '🎯', text: 'My Leads' }, { href: '/partner/projects', icon: '📋', text: 'Projects' }, { href: '/partner/materials', icon: '🧱', text: 'Materials' }, { href: '/partner/finance', icon: '💰', text: 'Finance' }] },
        };
        const cfg = typeMap[type] || typeMap.default;
        return (
          <div style={{ padding: '24px 28px', borderRadius: '20px', background: cfg.bg, border: `1px solid ${cfg.color}22`, marginTop: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{cfg.icon} {cfg.label} Quick Actions</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Shortcuts tailored for your role as a {cfg.label}.</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
              {cfg.actions.map(a => (
                <Link key={a.href} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'white', borderRadius: '12px', border: `1px solid ${cfg.color}22`, textDecoration: 'none', fontWeight: 600, fontSize: '13px', color: '#0F172A', transition: 'box-shadow 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 12px ${cfg.color}22`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{a.icon}</span>
                  <span>{a.text}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* FREE PLAN USAGE */}
      <div className="card" style={{ padding: '28px', borderRadius: '24px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>🆓 Free Partner OS Plan</h2>
            <p style={{ fontSize: '13px', color: '#64748B' }}>You are using the free Buildogram Partner OS plan. Upgrade coming soon.</p>
          </div>
          <span style={{ background: 'rgba(252,110,32,0.1)', color: '#FC6E20', border: '1px solid rgba(252,110,32,0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>FREE PLAN</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { label: 'Private Projects', used: projects.filter(p => p.status !== 'Completed').length, max: 2, icon: '🏗️', color: '#6366F1' },
            { label: 'Material Requests', used: materials.length, max: 20, icon: '🧱', color: '#F59E0B' },
            { label: 'Documents', used: 3, max: 25, icon: '📁', color: '#0EA5E9' },
            { label: 'Team Members', used: 1, max: 3, icon: '👷', color: '#10B981' },
          ].map(item => {
            const pct = Math.min(100, Math.round((item.used / item.max) * 100));
            const warn = pct >= 80;
            return (
              <div key={item.label} style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '12px', border: `1px solid ${warn ? '#FDE68A' : 'var(--border)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.icon} {item.label}</span>
                  <span style={{ fontSize: '12px', color: warn ? '#D97706' : '#64748B', fontWeight: 700 }}>{item.used} / {item.max}</span>
                </div>
                <div style={{ background: '#E2E8F0', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: warn ? '#F59E0B' : item.color, borderRadius: '4px', transition: 'width 0.4s' }} />
                </div>
                {warn && <div style={{ fontSize: '11px', color: '#D97706', marginTop: '4px', fontWeight: 600 }}>⚠️ Approaching limit</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'linear-gradient(135deg, #FFF7ED, #FED7AA)', borderRadius: '10px', fontSize: '13px', color: '#92400E', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span>🚀 Unlock unlimited projects, team members & priority leads with Buildogram Pro.</span>
          <button style={{ background: '#FC6E20', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>Upgrade Coming Soon</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `@media(max-width:900px){.dash-mid-grid{grid-template-columns:1fr!important}}`}} />
    </div>
  );
}
