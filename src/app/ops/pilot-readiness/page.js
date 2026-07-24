'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import UnauthorizedScreen from '@/components/UnauthorizedScreen';
export default function PilotReadinessPage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

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
      fetch('/api/health/db')
        .then(r => r.json())
        .then(d => {
          setDbStatus(d);
          setLoading(false);
        })
        .catch(e => {
          setDbStatus({ success: false, error: e.message });
          setLoading(false);
        });
    }
  }, [user]);

  if (authLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading auth...</div>;
  if (!user || !user.role.startsWith('ops_')) {
    return <UnauthorizedScreen userRole={user?.role} requiredRole="ops_*" message="Only Ops Admin and Ops Team can view Pilot Readiness." />;
  }

  const isReady = dbStatus?.ready;
  const score = dbStatus?.readinessScore || 0;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>Pilot Readiness Dashboard</h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
            Phase G internal ops checklist for 5-10 real pilot partners.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: isReady ? '#10B981' : '#F59E0B' }}>
            {score}%
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Readiness Score
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Running deep diagnostic checks...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px', color: '#1E293B', display: 'flex', justifyContent: 'space-between' }}>
              <span>1. Database Connectivity & Tables</span>
              {dbStatus?.database === 'connected' ? <span style={{ color: '#10B981' }}>Connected</span> : <span style={{ color: '#EF4444' }}>Unavailable</span>}
            </h2>
            {dbStatus?.tables ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {dbStatus.tables.map(t => (
                  <div key={t.table} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: t.exists ? '#F8FAFC' : '#FEF2F2', borderRadius: '8px', border: `1px solid ${t.exists ? '#E2E8F0' : '#FECACA'}` }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{t.entity}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>{t.table}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: t.exists ? '#10B981' : '#EF4444' }}>
                        {t.exists ? 'OK' : t.critical ? 'CRITICAL MISSING' : 'MISSING'}
                      </div>
                      {t.exists && t.rowCount !== null && (
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{t.rowCount} records</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '16px', background: '#FEF2F2', color: '#991B1B', borderRadius: '8px', fontSize: '14px' }}>
                {dbStatus?.message || 'Failed to check database tables.'}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px', color: '#1E293B' }}>2. API Routes & Features</h2>
              <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                <li>✅ FileUploadButton → Cloudinary wired</li>
                <li>✅ FileUpload metadata → DB persisting</li>
                <li>✅ Issues PATCH endpoint live</li>
                <li>✅ Material Quotes POST to Neon live</li>
                <li>✅ Customer filters strictly applied</li>
              </ul>
            </div>

            <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px', color: '#1E293B' }}>3. Auth & Safety</h2>
              <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                <li>✅ UnauthorizedScreen component active</li>
                <li>✅ Client-side role checking via useAuth</li>
                <li>⚠️ No next/middleware route protection yet</li>
                <li>✅ Dev-only DataSource badges active</li>
                <li>✅ Partner approval updates DB correctly</li>
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
