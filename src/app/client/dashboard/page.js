'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/auth/me').then(r => r.json()), fetch('/api/projects').then(r => r.json())])
      .then(([ud, pd]) => { setUser(ud.user); setProjects(pd.projects || []); setLoading(false); });
  }, []);

  const statusColor = { design: 'badge-blue', boq_approval: 'badge-yellow', execution: 'badge-orange', handover: 'badge-green', complete: 'badge-green', on_hold: 'badge-gray' };
  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted mt-2">Track your home construction in real-time</p>
      </div>

      {projects.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🏠</div>
          <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>No Project Yet</h3>
          <p className="text-muted mb-6">Your construction project will appear here once our team sets it up after your consultation.</p>
          <Link href="/cost-estimator" className="btn btn-primary">Get a Free Estimate →</Link>
        </div>
      ) : projects.map(p => (
        <div key={p.id} style={{ marginBottom: '24px' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-card2))', border: '1px solid rgba(15,118,110,0.2)', marginBottom: '24px' }}>
            <div className="flex-between mb-4">
              <div>
                <h2 style={{ fontSize: '22px' }}>{p.name}</h2>
                <p className="text-muted mt-1">{p.city}{p.locality ? `, ${p.locality}` : ''} · {p.plot_area_sqft} sqft · {p.floors}</p>
              </div>
              <span className={`badge ${statusColor[p.status] || 'badge-gray'}`} style={{ fontSize: '13px', padding: '8px 16px' }}>{p.status?.replace('_', ' ')}</span>
            </div>

            <div className="mb-4">
              <div className="flex-between mb-2">
                <span className="text-muted text-sm">Overall Progress</span>
                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{p.completion_pct || 0}%</span>
              </div>
              <div className="progress-bar" style={{ height: '10px' }}>
                <div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} />
              </div>
            </div>

            <div className="grid-3">
              {[['Contract Value', fmt(p.total_contract_value)], ['Project Manager', p.pm_name || 'Being Assigned'], ['Start Date', p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN') : 'TBD']].map(([k, v]) => (
                <div key={k} style={{ padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                  <div className="text-muted text-xs mb-1">{k}</div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Link href={`/client/project?id=${p.id}`} className="btn btn-primary">View Full Project →</Link>
              <Link href="/client/issues" className="btn btn-outline">🚨 Raise Issue</Link>
            </div>
          </div>
        </div>
      ))}

      {/* QUICK LINKS */}
      <div className="grid-3">
        {[
          { icon: '🛂', title: 'Property Passport', desc: 'View your permanent property record and documents', href: '/client/passport' },
          { icon: '📋', title: 'BOQ & Contract', desc: 'View your detailed Bill of Quantities and approved specifications', href: '/client/project' },
          { icon: '📸', title: 'Site Progress', desc: 'Daily photos and progress updates from your construction site', href: '/client/project' },
        ].map(c => (
          <Link key={c.title} href={c.href} className="card" style={{ display: 'block', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{c.icon}</div>
            <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>{c.title}</h4>
            <p className="text-muted" style={{ fontSize: '13px' }}>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
