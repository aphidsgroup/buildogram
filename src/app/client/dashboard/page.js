'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()), 
      fetch('/api/client/dashboard').then(r => r.json()),
      fetch('/api/requirements').then(r => r.json()).catch(() => ({ data: [] })),
      fetch('/api/proposals').then(r => r.json()).catch(() => ({ data: [] }))
    ])
      .then(([ud, dash, reqs, props]) => { 
        if (ud.user) setUser(ud.user); 
        if (dash.success) setData(dash.data); 
        if (reqs.data) setRequirements(reqs.data);
        if (props.data) setProposals(props.data);
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
      <div className="page-header mb-8" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '40px', borderRadius: '24px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Welcome, {user?.name?.split(' ')[0]} 👋</h1>
        <p style={{ color: '#94A3B8', fontSize: '16px' }}>Manage your property ecosystem</p>
      </div>

      {/* Holistic Summary Grid */}
      <div className="grid-4 gap-4 mb-10">
        <div className="card p-4 flex flex-col justify-center text-center" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛂</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>{counts.passports}</div>
          <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px' }}>Property Passports</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>{counts.active_requests}</div>
          <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px' }}>Active Requests</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>{counts.boq_reports}</div>
          <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px' }}>BOQ Reports</div>
        </div>
        <div className="card p-4 flex flex-col justify-center text-center" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔧</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>{counts.maintenance}</div>
          <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px' }}>Maintenance Logs</div>
        </div>
      </div>

      <h3 className="mb-4 font-bold" style={{ fontSize: '18px', color: '#0F172A' }}>Active Projects</h3>
      {projects.length === 0 ? (
        <div className="card text-center mb-8" style={{ padding: '60px 40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏗️</div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>No Active Construction</h3>
          <p className="text-muted text-sm mb-6" style={{ maxWidth: '400px', margin: '0 auto 24px' }}>You don't have any live construction or renovation projects at the moment. Our engineers are ready when you are.</p>
          <button onClick={(e) => { e.preventDefault(); alert('Cost Estimator is being upgraded. Coming soon!'); }} style={{ background: 'linear-gradient(135deg, #FFB347, #FC6E20)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}>Get a Free Estimate</button>
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
              <button onClick={() => alert('Project details are being upgraded. Coming soon!')} style={{ background: '#0F172A', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>View Full Project →</button>
              <button onClick={() => alert('Issue tracker is being upgraded. Coming soon!')} style={{ background: 'white', color: '#0F172A', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>🚨 Raise Issue</button>
            </div>
          </div>
        </div>
      ))}

      {/* ── RECENT INQUIRIES (WORKFLOW INTEGRATION) ── */}
      <h3 className="mb-4 font-bold" style={{ fontSize: '18px', color: '#0F172A', marginTop: '32px' }}>Your Requirement Journey</h3>
      <div className="grid-3 gap-4 mb-8">
        {requirements.length === 0 && proposals.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '20px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No active requirements or proposals yet.
          </div>
        ) : (
          <>
            {requirements.map(req => (
              <div key={req.id} className="card" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
                <div className="flex-between mb-2">
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>{req.requirementType.replace('_', ' ')}</span>
                  <span className="badge badge-blue" style={{ fontSize: '12px' }}>{req.currentStage || 'Received'}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>{req.projectLocation || 'Location TBD'} · {req.budgetRange || 'Budget TBD'}</p>
                <button className="btn btn-outline btn-sm" onClick={() => alert('Lead detail view is coming soon!')}>View Status</button>
              </div>
            ))}
            {proposals.map(prop => (
              <div key={prop.id} className="card" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
                <div className="flex-between mb-2">
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{prop.title}</span>
                  <span className={`badge ${prop.proposalStatus === 'shared' ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: '12px' }}>{prop.proposalStatus}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Estimated Value: {prop.estimatedValue || 'Pending'}</p>
                <button className="btn btn-outline btn-sm" onClick={() => alert('View proposal PDF coming soon...')}>View Draft Proposal</button>
              </div>
            ))}
          </>
        )}
        {/* ── DOCUMENT VAULT (PHASE 6) ── */}
        <h3 className="mb-4 font-bold" style={{ fontSize: '18px', color: '#0F172A', marginTop: '32px' }}>Your Document Vault</h3>
        <div className="card mb-8" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
          <div className="flex-between mb-4">
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Upload your drawings, floor plans, and BOQs safely here.</p>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Client document upload will be enabled soon.')}>Upload Document</button>
          </div>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Document Name</th>
                <th style={{ padding: '10px' }}>Type</th>
                <th style={{ padding: '10px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No documents in your vault yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="mb-4 font-bold" style={{ fontSize: '18px', color: '#0F172A', marginTop: '32px' }}>Quick Links</h3>
      <div className="grid-3 gap-4">
        {[
          { icon: '📝', title: 'My Requests', desc: 'Track inquiries and quotes', href: '/client/requests' },
          { icon: '🛂', title: 'Property Passport', desc: 'Permanent property record', href: '/client/passport' },
          { icon: '👤', title: 'My Profile', desc: 'Update your contact preferences', href: '/client/profile' },
        ].map(c => (
          <a key={c.title} href={c.href} onClick={(e) => { e.preventDefault(); alert(`${c.title} module is being upgraded. Coming soon!`); }} className="card" style={{ display: 'block', transition: 'all 0.2s', background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', textDecoration: 'none', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FC6E20'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(252,110,32,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '32px', marginBottom: '12px', background: '#F8FAFC', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{c.icon}</div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>{c.title}</h4>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
