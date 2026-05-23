'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientMaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/client/maintenance')
      .then(r => r.json())
      .then(d => {
        if (d.success) setMaintenanceRequests(d.leads || []);
        else setError(d.error || 'Failed to load maintenance records.');
        setLoading(false);
      })
      .catch(() => {
        setError('Network error');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  if (error === 'Forbidden') {
    return (
      <div className="flex-center" style={{ height: '60vh', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p className="text-muted">Please log in to view your maintenance records.</p>
        <Link href="/auth/signin" className="btn btn-primary mt-4">Log In</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ── Client Header ── */}
      <div style={{ background: 'var(--secondary)', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Property Maintenance</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>Manage requests and view maintenance history for your properties.</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/maintenance/request" className="btn btn-primary">
            + Raise New Request
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        
        {maintenanceRequests.length === 0 ? (
          <div className="card text-center py-20">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>No Maintenance Records</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>You haven't raised any maintenance requests for your properties yet.</p>
          </div>
        ) : (
          <div className="grid-1 gap-6">
            {maintenanceRequests.map(req => {
              const m = req.metadata || {};
              const statusColors = {
                requested: { bg: '#fef3c7', color: '#b45309' },
                inspection_scheduled: { bg: '#e0e7ff', color: '#4338ca' },
                quoted: { bg: '#ffedd5', color: '#c2410c' },
                approved: { bg: '#dbeafe', color: '#1d4ed8' },
                work_started: { bg: '#fce7f3', color: '#be185d' },
                completed: { bg: '#ecfdf5', color: '#047857' },
                closed: { bg: '#f1f5f9', color: '#475569' },
                cancelled: { bg: '#fef2f2', color: '#b91c1c' },
              };
              
              const st = m.maintenance_status || 'requested';
              const cfg = statusColors[st] || statusColors.requested;

              return (
                <div key={req.id} className="card p-6" style={{ borderRadius: '16px', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {new Date(req.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', textTransform: 'capitalize' }}>
                        {m.issue_category?.replace('_', ' ')}
                      </h3>
                      <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                        📍 {req.property_title}
                      </div>
                    </div>

                    <div style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize', background: cfg.bg, color: cfg.color }}>
                      {st.replace('_', ' ')}
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '16px 0' }} />

                  <div className="grid-3" style={{ gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Urgency</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155', textTransform: 'capitalize' }}>{m.urgency}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Vendor</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{m.assigned_vendor || 'Awaiting Assignment'}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Final Cost</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: m.final_cost ? '#059669' : '#94a3b8' }}>
                        {m.final_cost ? `₹${m.final_cost.toLocaleString('en-IN')}` : '—'}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Description</span>
                    <p style={{ fontSize: '14px', color: '#334155', margin: 0, lineHeight: 1.5 }}>{req.message}</p>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
