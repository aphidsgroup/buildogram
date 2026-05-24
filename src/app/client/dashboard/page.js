'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()), 
      fetch('/api/client/dashboard').then(r => r.json())
    ])
      .then(([ud, dash]) => { 
        if (ud.user) setUser(ud.user); 
        if (dash.success) setData(dash.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const statusColor = { design: 'badge-blue', boq_approval: 'badge-yellow', execution: 'badge-orange', handover: 'badge-green', complete: 'badge-green', on_hold: 'badge-gray' };
  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  const projects = data?.projects || [];
  const counts = data?.counts || { passports: 0, maintenance: 0, boq_reports: 0, active_requests: 0 };

  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1>Welcome, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted mt-2">Manage your property ecosystem</p>
      </div>

      {/* Holistic Summary Grid */}
      <div className="grid-4 gap-4 mb-8">
        <div className="card p-4 flex flex-col justify-center text-center">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛂</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{counts.passports}</div>
          <div className="text-xs text-muted uppercase font-bold mt-1">Property Passports</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{counts.active_requests}</div>
          <div className="text-xs text-muted uppercase font-bold mt-1">Active Requests</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{counts.boq_reports}</div>
          <div className="text-xs text-muted uppercase font-bold mt-1">BOQ Reports</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔧</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{counts.maintenance}</div>
          <div className="text-xs text-muted uppercase font-bold mt-1">Maintenance Logs</div>
        </div>
      </div>

      <h3 className="mb-4 font-bold" style={{ fontSize: '18px' }}>Active Projects</h3>
      {projects.length === 0 ? (
        <div className="card text-center mb-8" style={{ padding: '40px', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏗️</div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No Active Construction</h3>
          <p className="text-muted text-sm mb-6">You don't have any live construction or renovation projects at the moment.</p>
          <Link href="/cost-estimator" className="btn btn-outline btn-sm">Get a Free Estimate</Link>
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

            <div className="grid-3 gap-4">
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

      <h3 className="mb-4 font-bold" style={{ fontSize: '18px' }}>Quick Links</h3>
      <div className="grid-3 gap-4">
        {[
          { icon: '📝', title: 'My Requests', desc: 'Track inquiries and quotes', href: '/client/requests' },
          { icon: '🛂', title: 'Property Passport', desc: 'Permanent property record', href: '/client/passport' },
          { icon: '👤', title: 'My Profile', desc: 'Update your contact preferences', href: '/client/profile' },
        ].map(c => (
          <Link key={c.title} href={c.href} className="card" style={{ display: 'block', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
            <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>{c.title}</h4>
            <p className="text-muted" style={{ fontSize: '12px' }}>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
