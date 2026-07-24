'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PilotGuides from './guides';

export default function PilotLaunchPage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [pwaStatus, setPwaStatus] = useState(null);

  useEffect(() => {
    // Check PWA status client-side
    const status = {
      swRegistered: false,
      isStandalone: false,
      pwaEnabledEnv: process.env.NEXT_PUBLIC_ENABLE_PWA !== 'false'
    };
    if (typeof window !== 'undefined') {
      status.isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg) {
            status.swRegistered = true;
          }
          setPwaStatus(status);
        });
      } else {
        setPwaStatus(status);
      }
    }
  }, []);

  const fetchStatus = () => {
    setLoading(true);
    fetch('/api/ops/pilot-launch-status')
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.user) setUser(d.user);
        setAuthLoading(false);
      })
      .catch(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (user?.role?.startsWith('ops_')) {
      fetchStatus();
    }
  }, [user]);

  const handleSeed = async () => {
    if (!confirm('This will wipe existing pilot seed data and recreate the full Phase H Pilot flow. Continue?')) return;
    setSeeding(true);
    try {
      const r = await fetch('/api/ops/seed-pilot', { method: 'POST' });
      const d = await r.json();
      if (d.success) {
        alert('Pilot seeded successfully!');
        fetchStatus();
      } else {
        alert('Failed: ' + d.message);
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
    setSeeding(false);
  };

  if (authLoading) return <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>Loading Auth...</div>;
  if (!user || !user.role?.startsWith('ops_')) {
    return <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>Unauthorized. Ops only.</div>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <Link href="/ops/dashboard" style={{ color: '#FC6E20', textDecoration: 'none', fontWeight: 700, marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: '#0F172A' }}>🚀 Phase H Pilot Launch</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B' }}>Real-time pilot environment tracking and training hub.</p>
        </div>
        <button 
          onClick={handleSeed}
          disabled={seeding}
          style={{ padding: '12px 24px', background: seeding ? '#94A3B8' : '#FC6E20', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: seeding ? 'not-allowed' : 'pointer' }}
        >
          {seeding ? 'Seeding Pilot...' : '🔄 Master Seed Pilot'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {/* Tracker Panel */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0F172A' }}>Pilot Data Metrics</h2>
          {loading ? <p>Loading stats...</p> : stats ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <MetricRow label="Active Pilot Users" val={stats.users} target={8} />
              <MetricRow label="Projects Tracked" val={stats.projects} target={2} />
              <MetricRow label="Pending Material Requests" val={stats.materials} target={5} />
              <MetricRow label="Supplier Quotes" val={stats.quotes} target={5} />
              <MetricRow label="Site Updates" val={stats.updates} target={5} />
              
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', marginBottom: '8px' }}>SYSTEM BLOCKERS</div>
                {stats.blockers.length === 0 ? (
                  <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 600 }}>✅ No Blockers. Ready for pilot.</div>
                ) : (
                  <ul style={{ color: '#EF4444', fontSize: '13px', margin: 0, paddingLeft: '20px' }}>
                    {stats.blockers.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ) : <p>Failed to load stats.</p>}
        </div>

        {/* Quick Start Guides */}
        <div>
          <h2 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#0F172A' }}>In-App Onboarding Guides</h2>
          <PilotGuides />
          
          <h2 style={{ fontSize: '16px', margin: '24px 0 16px 0', color: '#0F172A' }}>PWA Diagnostic</h2>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#475569' }}>
            {pwaStatus ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>PWA Env Enabled:</span>
                  <span style={{ fontWeight: 600, color: pwaStatus.pwaEnabledEnv ? '#10B981' : '#EF4444' }}>{pwaStatus.pwaEnabledEnv ? 'Yes' : 'No'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Service Worker Registered:</span>
                  <span style={{ fontWeight: 600, color: pwaStatus.swRegistered ? '#10B981' : '#EF4444' }}>{pwaStatus.swRegistered ? 'Yes' : 'No'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Standalone Mode:</span>
                  <span style={{ fontWeight: 600, color: pwaStatus.isStandalone ? '#10B981' : '#64748B' }}>{pwaStatus.isStandalone ? 'Yes' : 'Browser'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Manifest:</span>
                  <span style={{ fontWeight: 600, color: '#10B981' }}>/manifest.webmanifest</span>
                </div>
              </div>
            ) : <p>Checking PWA capabilities...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, val, target }) {
  const ok = val >= target;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#475569', fontSize: '14px', fontWeight: 500 }}>{label}</span>
      <span style={{ 
        background: ok ? '#DCFCE7' : '#FEE2E2', 
        color: ok ? '#166534' : '#991B1B', 
        padding: '2px 8px', borderRadius: '12px', fontSize: '13px', fontWeight: 700 
      }}>
        {val} / {target}
      </span>
    </div>
  );
}
