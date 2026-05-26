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
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_leads');
    if (stored) setLeads(JSON.parse(stored));
    const storedP = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
    if (storedP) setProjects(JSON.parse(storedP));
    
    fetch('/api/partner-matches').then(r => r.json()).then(d => {
      if (d.data) setMatches(d.data);
    }).catch(e => console.error(e));
  }, []);

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const totalMaterials = DEMO_MATERIALS.length;
  const firstName = user?.name?.split(' ')[0] || 'Partner';

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
        <MetricCard icon="🎯" label="Total Leads" value={leads.length} sub={`${leads.filter(l => l.status === 'New').length} new today`} onClick={(e) => { e.preventDefault(); alert('Lead CRM is being upgraded. Coming soon!'); }} />
        <MetricCard icon="🏗️" label="Active Projects" value={activeProjects} sub={`${projects.length} total`} color="#10B981" onClick={(e) => { e.preventDefault(); alert('Project Control is being upgraded. Coming soon!'); }} />
        <MetricCard icon="💰" label="Total BOQ Value" value="₹4.2 Cr" sub="Approved budgets" color="#6366F1" />
        <MetricCard icon="💸" label="Pending Payments" value="₹12.5 L" sub="3 milestones due" color="#EF4444" />
        <MetricCard icon="🚩" label="Open Issues" value="2" sub="1 high priority" color="#EF4444" />
        <MetricCard icon="📓" label="Site Updates Today" value={DEMO_LOGBOOK.length} sub="Across all projects" color="#8B5CF6" onClick={(e) => { e.preventDefault(); alert('Site Logbook is being upgraded. Coming soon!'); }} />
        <MetricCard icon="🧱" label="Material Requests" value={totalMaterials} sub={`${DEMO_MATERIALS.filter(m => m.status === 'Ordered').length} ordered`} color="#F59E0B" />
        <MetricCard icon="🏢" label="Profile Completion" value="75%" sub="Add more details" color="#0EA5E9" onClick={(e) => { e.preventDefault(); alert('Profile Builder is being upgraded. Coming soon!'); }} />
      </div>

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

      <style dangerouslySetInnerHTML={{__html: `@media(max-width:900px){.dash-mid-grid{grid-template-columns:1fr!important}}`}} />
    </div>
  );
}
