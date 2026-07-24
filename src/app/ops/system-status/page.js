'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SystemStatusPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const StatusPill = ({ val }) => {
    let color = '#94a3b8'; // grey
    if (val === 'connected' || val === 'configured') color = '#10b981'; // green
    if (val === 'error' || val === 'missing_keys') color = '#ef4444'; // red

    return (
      <span style={{ background: color + '22', color: color, padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>
        {val || 'Unknown'}
      </span>
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b' }}>System Status</h1>
        <Link href="/ops" className="btn btn-outline">Back to Ops</Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>Pinging microservices...</div>
      ) : health ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ background: 'white' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '16px' }}>Core Platform</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 500, color: '#475569' }}>Neon Database (PostgreSQL)</span>
                <StatusPill val={health.services.database} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 500, color: '#475569' }}>OpenAI Engine (Cost Estimator)</span>
                <StatusPill val={health.services.openai} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 500, color: '#475569' }}>WhatsApp Cloud API</span>
                <StatusPill val={health.services.whatsapp} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500, color: '#475569' }}>Razorpay Escrow Gateway</span>
                <StatusPill val={health.services.razorpay} />
              </div>
            </div>
          </div>

          <div className="card" style={{ background: '#f8fafc', fontSize: '13px', color: '#64748b' }}>
            <strong>Server Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}<br />
            <strong>Environment:</strong> {health.environment}<br />
            <strong>App Version:</strong> {health.version}
          </div>
        </div>
      ) : (
        <div className="card" style={{ background: '#fef2f2', color: '#b91c1c', textAlign: 'center' }}>
          Failed to connect to the health API. The server might be down or misconfigured.
        </div>
      )}
    </div>
  );
}
