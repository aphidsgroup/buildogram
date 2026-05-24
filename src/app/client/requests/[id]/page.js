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
  } else if (req.lead_type === 'boq_audit') {
    details = [
      ['Project Type', m.project_type],
      ['Floors', m.floors],
      ['Built-up Area', m.built_up_area ? `${m.built_up_area} sqft` : ''],
      ['Quoted Amount', m.quoted_amount ? `₹${Number(m.quoted_amount).toLocaleString('en-IN')}` : ''],
      ['Your Concern', m.customer_concern]
    ];
  } else if (req.lead_type === 'plan_review') {
    details = [
      ['Project Type', m.project_type],
      ['Intended Use', m.intended_use],
      ['Location', m.project_location],
      ['Plot Size', m.plot_size],
      ['Built-up Area', m.built_up_area],
      ['Floors', m.floors],
      ['Main Concern', m.main_concern]
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

          {m.boq_file_url && req.lead_type === 'boq_audit' && (
            <div style={{ paddingTop: '8px' }}>
              <a href={m.boq_file_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                📄 View Uploaded BOQ Document
              </a>
            </div>
          )}
        </div>
      </div>

      {req.lead_type === 'boq_audit' && (
        <div className="card mt-6" style={{ background: 'white', padding: '32px', border: '2px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#4c1d95', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span> Official BOQ Audit Report
            </h2>
            {m.reviewed_boq_report && (
              <a href={`/boq-report/${req.id}/print`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#4f46e5', color: 'white', textDecoration: 'none' }}>
                🖨️ Download PDF
              </a>
            )}
          </div>

          {m.reviewed_boq_report ? (
            <div style={{ fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Executive Summary</div>
                <div style={{ fontWeight: 500, color: '#0f172a' }}>{m.reviewed_boq_report.executive_summary}</div>
              </div>
              
              {m.reviewed_boq_report.missing_or_unclear_items && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Missing or Unclear Items</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_boq_report.missing_or_unclear_items}</pre>
                </div>
              )}
              
              {m.reviewed_boq_report.escalation_risks && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Escalation & Cost Risks</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_boq_report.escalation_risks}</pre>
                </div>
              )}
              
              {m.reviewed_boq_report.questions_to_ask_contractor && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Questions for your Contractor</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_boq_report.questions_to_ask_contractor}</pre>
                </div>
              )}
              
              <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #7c3aed' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#5b21b6', textTransform: 'uppercase', marginBottom: '4px' }}>Buildogram Recommendation</div>
                <div style={{ fontWeight: 600, color: '#4c1d95' }}>{m.reviewed_boq_report.buildogram_recommendation}</div>
              </div>
              
              <div style={{ background: '#fffbeb', padding: '12px', fontSize: '11px', fontStyle: 'italic', borderRadius: '6px', color: '#b45309', border: '1px solid #fde68a' }}>
                <strong>Disclaimer:</strong> {m.reviewed_boq_report.disclaimer}
              </div>
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <h3 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '8px' }}>Report In Progress</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Your BOQ review report is currently being prepared by the Buildogram engineering team. We will notify you once it is ready.
              </p>
            </div>
          )}
        </div>
      )}

      {req.lead_type === 'plan_review' && (
        <div className="card mt-6" style={{ background: 'white', padding: '32px', border: '2px solid #0891b2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#164e63', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>📐</span> Advisory Plan Review Report
            </h2>
            {m.reviewed_plan_report && (
              <a href={`/plan-review-report/${req.id}/print`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#0891b2', color: 'white', textDecoration: 'none' }}>
                🖨️ Download PDF
              </a>
            )}
          </div>

          {m.reviewed_plan_report ? (
            <div style={{ fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', marginBottom: '4px' }}>Executive Summary</div>
                <div style={{ fontWeight: 500, color: '#0f172a' }}>{m.reviewed_plan_report.executive_summary}</div>
              </div>
              
              {m.reviewed_plan_report.strengths && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', marginBottom: '4px' }}>Strengths</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_plan_report.strengths}</pre>
                </div>
              )}
              
              {m.reviewed_plan_report.practical_concerns && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', marginBottom: '4px' }}>Practical Concerns</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_plan_report.practical_concerns}</pre>
                </div>
              )}
              
              {m.reviewed_plan_report.cost_impact_areas && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', marginBottom: '4px' }}>Cost Impact Areas</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_plan_report.cost_impact_areas}</pre>
                </div>
              )}
              
              {m.reviewed_plan_report.questions_for_architect && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', marginBottom: '4px' }}>Questions for your Architect</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#1e293b' }}>{m.reviewed_plan_report.questions_for_architect}</pre>
                </div>
              )}
              
              <div style={{ background: '#ecfeff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #0891b2' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#155e75', textTransform: 'uppercase', marginBottom: '4px' }}>Buildogram Recommendation</div>
                <div style={{ fontWeight: 600, color: '#164e63' }}>{m.reviewed_plan_report.buildogram_recommendation}</div>
              </div>
              
              <div style={{ background: '#fffbeb', padding: '12px', fontSize: '11px', fontStyle: 'italic', borderRadius: '6px', color: '#b45309', border: '1px solid #fde68a' }}>
                <strong>Disclaimer:</strong> {m.reviewed_plan_report.disclaimer}
              </div>
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <h3 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '8px' }}>Review In Progress</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Your plan is currently being reviewed by the Buildogram architectural advisory team. We will notify you once it is ready.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
