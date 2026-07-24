'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TYPE_LABELS = {
  property_inquiry: 'Property Inquiry',
  property_listing: 'List My Property',
  material_quote: 'Material Quote',
  maintenance: 'Maintenance Request',
  construction: 'Construction',
  boq_audit: 'BOQ Audit',
  plan_review: 'Plan Review',
  general: 'General Inquiry'
};

const STATUS_LABELS = {
  new: { label: 'New', color: '#2563eb', bg: '#eff6ff' },
  contacted: { label: 'In Progress', color: '#d97706', bg: '#fffbeb' },
  qualified: { label: 'In Progress', color: '#d97706', bg: '#fffbeb' },
  proposal: { label: 'In Progress', color: '#0891b2', bg: '#ecfeff' },
  won: { label: 'Completed', color: '#16a34a', bg: '#dcfce7' },
  lost: { label: 'Closed', color: '#64748b', bg: '#f1f5f9' },
};

export default function MyRequestsPage() {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/client/requests')
      .then(r => r.json())
      .then(d => {
        if (d.success) setReqs(d.requests);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>My Requests</h1>

      {loading ? (
        <div className="card text-center py-8 text-muted">Loading requests...</div>
      ) : reqs.length === 0 ? (
        <div className="card text-center" style={{ padding: '48px 24px', background: 'white' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
          <h3 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '8px' }}>No Requests Yet</h3>
          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
            Your Buildogram requests will appear here once our team links them to your account.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reqs.map(r => {
            const statusConfig = STATUS_LABELS[r.status] || STATUS_LABELS.new;
            const m = r.metadata || {};
            
            // Dynamic Title based on type
            let title = TYPE_LABELS[r.lead_type] || 'Inquiry';
            let subtitle = '';

            if (r.lead_type === 'property_inquiry') {
              subtitle = `Inquiry for ${m.property_location || 'Property'}`;
            } else if (r.lead_type === 'maintenance') {
              subtitle = `Maintenance: ${m.issue_category || 'General'}`;
            } else if (r.lead_type === 'material_quote') {
              subtitle = `Materials to ${m.delivery_location || 'Site'}`;
            }

            return (
              <Link key={r.id} href={`/client/requests/${r.id}`} className="card" style={{ padding: '20px', background: 'white', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{title}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', background: statusConfig.bg, color: statusConfig.color, textTransform: 'uppercase' }}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>{subtitle}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Submitted on {formatDate(r.created_at)}</div>
                </div>
                <div style={{ color: '#cbd5e1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
