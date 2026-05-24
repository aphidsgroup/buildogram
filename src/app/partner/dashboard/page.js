'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PartnerDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard...</div>;

  const kpis = [
    { label: 'Total Leads', value: '14', icon: '🎯' },
    { label: 'Ongoing Projects', value: '3', icon: '🏗️' },
    { label: 'Total BOQ Value', value: '₹4.2 Cr', icon: '💰' },
    { label: 'Project P&L', value: '+14%', icon: '📈' },
    { label: 'Pending Payments', value: '₹12.5 L', icon: '💸' },
    { label: 'Quality Checks Pending', value: '7', icon: '✅' },
    { label: 'Active Issues', value: '2', icon: '🚩' },
    { label: 'Profile Completion', value: '85%', icon: '🏢' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '8px' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Partner'}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Here is your project overview for today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '24px', background: 'rgba(252, 110, 32, 0.1)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-dark)' }}>{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Active Projects Timeline</h2>
          <div style={{ padding: '40px 20px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed var(--border)' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>📊</span>
            <p style={{ color: 'var(--text-muted)' }}>No active projects on timeline. Start by converting a lead.</p>
            <Link href="/partner/leads" className="btn btn-primary mt-4">View Leads</Link>
          </div>
        </div>
        
        <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Recent Activity</h2>
          <div style={{ padding: '40px 20px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed var(--border)' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>⚡</span>
            <p style={{ color: 'var(--text-muted)' }}>Activity log will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
