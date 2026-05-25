'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCard, SectionHeader, StatusBadge } from '../_shared/components';
import { DEMO_LEADS, DEMO_PROJECTS, DEMO_MATERIALS, DEMO_LOGBOOK } from '../_shared/demoData';

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

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_leads');
    if (stored) setLeads(JSON.parse(stored));
    const storedP = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
    if (storedP) setProjects(JSON.parse(storedP));
  }, []);

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const totalMaterials = DEMO_MATERIALS.length;
  const firstName = user?.name?.split(' ')[0] || 'Partner';

  return (
    <div>
      {/* GREETING */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', color: 'var(--primary-dark)', marginBottom: '6px' }}>
          Good day, {firstName}! 👋
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Here is your Buildogram Partner OS overview.</p>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <MetricCard icon="🎯" label="Total Leads" value={leads.length} sub={`${leads.filter(l => l.status === 'New').length} new today`} onClick={() => window.location.href = '/partner/leads'} />
        <MetricCard icon="🏗️" label="Active Projects" value={activeProjects} sub={`${projects.length} total`} color="#10B981" onClick={() => window.location.href = '/partner/projects'} />
        <MetricCard icon="💰" label="Total BOQ Value" value="₹4.2 Cr" sub="Approved budgets" color="#6366F1" />
        <MetricCard icon="💸" label="Pending Payments" value="₹12.5 L" sub="3 milestones due" color="#EF4444" />
        <MetricCard icon="🚩" label="Open Issues" value="2" sub="1 high priority" color="#EF4444" />
        <MetricCard icon="📓" label="Site Updates Today" value={DEMO_LOGBOOK.length} sub="Across all projects" color="#8B5CF6" onClick={() => window.location.href = '/partner/site-logbook'} />
        <MetricCard icon="🧱" label="Material Requests" value={totalMaterials} sub={`${DEMO_MATERIALS.filter(m => m.status === 'Ordered').length} ordered`} color="#F59E0B" />
        <MetricCard icon="🏢" label="Profile Completion" value="75%" sub="Add more details" color="#0EA5E9" onClick={() => window.location.href = '/partner/profile'} />
      </div>

      {/* MIDDLE GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* PROJECTS */}
        <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Active Projects</h2>
            <Link href="/partner/projects" style={{ fontSize: '13px', color: '#FC6E20' }}>View all →</Link>
          </div>
          {projects.slice(0, 4).map(p => (
            <div key={p.id} style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{p.location} · Stage: {p.stage}</div>
              <ProgressBar pct={p.progress} />
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.progress}% complete</div>
            </div>
          ))}
          {projects.length === 0 && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No projects yet. <Link href="/partner/projects">Add one →</Link></div>}
        </div>

        {/* LEADS */}
        <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Lead Pipeline</h2>
            <Link href="/partner/leads" style={{ fontSize: '13px', color: '#FC6E20' }}>View all →</Link>
          </div>
          {leads.slice(0, 5).map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{l.customerName}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l.requirement}</div>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '20px', flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px' }}>{a.text}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `@media(max-width:900px){.dash-mid-grid{grid-template-columns:1fr!important}}`}} />
    </div>
  );
}
