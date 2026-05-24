'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClientRequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/client/requests/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setReq(d.request);
        else if (d.error === 'Not Found') router.push('/client/requests');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className="card text-center py-8 text-muted">Loading request...</div>;
  if (!req) return <div className="card text-center py-8 text-muted">Request not found.</div>;

  const m = req.metadata || {};
  const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Map metadata to safe label-value pairs based on lead_type
  let details = [];
  if (req.lead_type === 'property_inquiry') {
    details = [
      ['Inquiry Type', m.inquiry_type],
      ['Location', m.property_location],
      ['Listing Type', m.listing_type],
      ['Preferred Visit', m.visit_scheduled_at ? formatDate(m.visit_scheduled_at) : m.preferred_visit_time],
      ['Current Status', m.inquiry_status]
    ];
  } else if (req.lead_type === 'maintenance') {
    details = [
      ['Category', m.issue_category],
      ['Urgency', m.urgency],
      ['Location', m.property_location],
      ['Preferred Visit', m.preferred_visit_time],
      ['Status', m.maintenance_status]
    ];
  } else if (req.lead_type === 'material_quote') {
    details = [
      ['Materials Needed', m.materials_required],
      ['Delivery Location', m.delivery_location],
      ['Status', m.materials_status]
    ];
  } else {
    details = [
      ['Status', req.status]
    ];
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/client/requests" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>← Back to My Requests</Link>
      </div>

      <div className="card" style={{ background: 'white', padding: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>Request Details</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>Submitted on {formatDate(req.created_at)}</p>

        <div style={{ display: 'grid', gap: '16px' }}>
          {details.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} style={{ paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
              <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: 500, textTransform: 'capitalize' }}>{v}</div>
            </div>
          ))}
          
          {m.source_listing_lead_id && (
            <div style={{ paddingTop: '8px' }}>
              <a href={`/properties/listing/${m.source_listing_lead_id}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                View Public Listing ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
