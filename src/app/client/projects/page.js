'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCustomerProjects } from '@/lib/services/customerService';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const STAGE_ORDER = ['Planning', 'Foundation', 'Structure', 'Brickwork', 'Roofing', 'Electrical & Plumbing', 'Plastering', 'Flooring', 'Painting', 'Finishing', 'Handover'];

function ProgressBar({ pct }) {
  const color = pct >= 75 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#6366F1';
  return (
    <div style={{ background: '#E2E8F0', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '6px', transition: 'width 0.4s' }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: ['#DCFCE7', '#166534'],
    Planning: ['#EFF6FF', '#2563EB'],
    Completed: ['#F5F3FF', '#7C3AED'],
    'On Hold': ['#FEF9C3', '#854D0E'],
  };
  const [bg, color] = map[status] || ['#F1F5F9', '#64748B'];
  return <span style={{ background: bg, color, padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{status}</span>;
}

function initClientProjects() {
  if (typeof window === 'undefined') return [];
  // Try loading demo projects from localStorage or use built-in demo
  const stored = localStorage.getItem('bos_projects');
  if (stored) {
    const all = JSON.parse(stored);
    // In a real app, filter by client's user ID. For demo, show all.
    return all;
  }
  // Fallback demo
  return [
    { id: 'P001', name: 'My G+2 Residential Villa', client: 'Rajesh Kumar', location: 'Porur, Chennai', type: 'Residential Construction', status: 'Active', progress: 62, stage: 'Structure', budget: 7500000, startDate: '2025-02-01', targetDate: '2025-12-30' },
    { id: 'P002', name: 'Office Renovation Project', client: 'Rajesh Kumar', location: 'OMR, Chennai', type: 'Commercial Renovation', status: 'Planning', progress: 15, stage: 'Foundation', budget: 2200000, startDate: '2025-04-15', targetDate: '2025-09-30' },
  ];
}

export default function ClientProjectsList() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); }).catch(() => {});
    // Load via service (API first, localStorage fallback)
    getCustomerProjects().then(data => {
      if (data?.length) setProjects(data);
      else setProjects(initClientProjects());
    }).catch(() => setProjects(initClientProjects()));
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '36px', borderRadius: '20px', color: 'white', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800 }}>🏗️ My Construction Projects</h1>
            <p style={{ margin: '8px 0 0', color: '#94A3B8', fontSize: '14px' }}>Track the progress of your Buildogram projects in real time</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', padding: '12px 20px', borderRadius: '14px', textAlign: 'right' }}>
            <div style={{ fontSize: '22px', fontWeight: 800 }}>{projects.length}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Active Projects</div>
          </div>
        </div>
      </div>

      <PWAInstallPrompt message="Install Buildogram to track your project easily." />

      {/* Support Banner */}
      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '14px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '20px' }}>🛡️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#92400E' }}>Buildogram Customer Support</div>
          <div style={{ fontSize: '13px', color: '#B45309' }}>Any questions about your project? Call or WhatsApp us on <strong>+91 98765 43210</strong></div>
        </div>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
          style={{ padding: '8px 18px', background: '#22C55E', color: 'white', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
          💬 WhatsApp
        </a>
      </div>

      {/* Project Cards */}
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏗️</div>
          <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>No Projects Yet</div>
          <p>Your Buildogram construction projects will appear here once they are set up by our team.</p>
          <a href="/contact" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#FC6E20', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Contact Buildogram →</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {projects.map(p => {
            const stageIdx = STAGE_ORDER.indexOf(p.stage);
            const daysLeft = p.targetDate ? Math.ceil((new Date(p.targetDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
            return (
              <div key={p.id} style={{ background: 'white', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>📍 {p.location} &nbsp;·&nbsp; {p.type}</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                {/* Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Overall Progress</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#FC6E20' }}>{p.progress}%</span>
                  </div>
                  <ProgressBar pct={p.progress} />
                </div>

                {/* Current Stage */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {STAGE_ORDER.slice(Math.max(0, stageIdx - 1), stageIdx + 3).map((stage, i) => {
                    const idx = STAGE_ORDER.indexOf(stage);
                    const done = idx < stageIdx;
                    const current = idx === stageIdx;
                    return (
                      <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: current ? 700 : 500, color: current ? '#FC6E20' : done ? '#10B981' : '#94A3B8' }}>
                        <span>{done ? '✅' : current ? '🔶' : '⭕'}</span>
                        <span>{stage}</span>
                        {i < 2 && <span style={{ color: '#E2E8F0' }}>›</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {daysLeft !== null && daysLeft > 0 ? `🗓 ${daysLeft} days remaining` : daysLeft !== null ? '⚠️ Past deadline' : ''}
                  </div>
                  <Link href={`/client/projects/${p.id}`}
                    style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
