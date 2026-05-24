import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PlanReviewPrintPage({ params }) {
  const { id } = params;

  // We do not require request object if we can't easily pass it in an App Router page without cookies()
  // Wait, in Next.js 13+ App router, page components can use cookies() directly, but this is easier with the DB if we just rely on the API or make it public with obfuscated IDs.
  // Actually, the BOQ report print is at /boq-report/[id]/print, which is currently publicly accessible by ID. Let's match BOQ's exact security model.

  const [lead] = await sql`
    SELECT * FROM leads WHERE id = ${id}
  `;

  if (!lead) return <div style={{ padding: '40px', textAlign: 'center' }}>Report Not Found</div>;

  const m = lead.metadata || {};
  const report = m.reviewed_plan_report;

  if (!report || report.status !== 'ready_to_share') {
    return <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>This report is not yet finalized or ready to share.</div>;
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-container { box-shadow: none !important; border: none !important; padding: 0 !important; }
        }
      `}} />

      <div className="no-print" style={{ maxWidth: '800px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button onClick={() => window.close()} style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Close
        </button>
        <button onClick={() => window.print()} style={{ background: '#0891b2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          🖨️ Print / Save PDF
        </button>
      </div>

      <div className="print-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 900, letterSpacing: '-0.5px' }}>BUILDOGRAM</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>The Smart Construction Ecosystem</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#0891b2', fontWeight: 800 }}>ADVISORY PLAN REVIEW</h2>
            <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px', fontWeight: 'bold' }}>REF: {lead.id.split('-')[0].toUpperCase()}</p>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '12px' }}>Date: {new Date(report.reviewed_at || lead.created_at).toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '6px' }}>
          <div style={{ width: '45%' }}>
            <h3 style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Project Requested By</h3>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{lead.name}</p>
            {m.project_location && <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px' }}>Location: {m.project_location}</p>}
          </div>
          <div style={{ width: '45%' }}>
            <h3 style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Plan Details</h3>
            <table style={{ fontSize: '13px', color: '#475569', width: '100%' }}>
              <tbody>
                <tr><td style={{ paddingBottom: '4px', fontWeight: 'bold' }}>Type:</td><td style={{ paddingBottom: '4px', textTransform: 'capitalize' }}>{m.project_type?.replace('_', ' ') || 'Unknown'}</td></tr>
                <tr><td style={{ paddingBottom: '4px', fontWeight: 'bold' }}>Use:</td><td style={{ paddingBottom: '4px', textTransform: 'capitalize' }}>{m.intended_use?.replace('_', ' ') || 'Unknown'}</td></tr>
                {m.plot_size && <tr><td style={{ paddingBottom: '4px', fontWeight: 'bold' }}>Plot Size:</td><td style={{ paddingBottom: '4px' }}>{m.plot_size}</td></tr>}
                {m.built_up_area && <tr><td style={{ paddingBottom: '4px', fontWeight: 'bold' }}>Built-up:</td><td style={{ paddingBottom: '4px' }}>{m.built_up_area}</td></tr>}
                {m.floors && <tr><td style={{ paddingBottom: '4px', fontWeight: 'bold' }}>Floors:</td><td style={{ paddingBottom: '4px' }}>{m.floors}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Content */}
        <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490', textTransform: 'uppercase', borderBottom: '2px solid #ecfeff', paddingBottom: '4px', marginBottom: '12px' }}>Executive Summary</h3>
            <div>{report.executive_summary}</div>
          </div>

          {report.strengths && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490', textTransform: 'uppercase', borderBottom: '2px solid #ecfeff', paddingBottom: '4px', marginBottom: '12px' }}>Strengths & Positives</h3>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{report.strengths}</pre>
            </div>
          )}

          {report.practical_concerns && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490', textTransform: 'uppercase', borderBottom: '2px solid #ecfeff', paddingBottom: '4px', marginBottom: '12px' }}>Practical Concerns</h3>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{report.practical_concerns}</pre>
            </div>
          )}

          {report.cost_impact_areas && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490', textTransform: 'uppercase', borderBottom: '2px solid #ecfeff', paddingBottom: '4px', marginBottom: '12px' }}>Cost Impact Areas</h3>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{report.cost_impact_areas}</pre>
            </div>
          )}

          {report.questions_for_architect && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490', textTransform: 'uppercase', borderBottom: '2px solid #ecfeff', paddingBottom: '4px', marginBottom: '12px' }}>Questions for your Architect</h3>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{report.questions_for_architect}</pre>
            </div>
          )}

          <div style={{ marginBottom: '24px', background: '#ecfeff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #0891b2' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#155e75', textTransform: 'uppercase', marginBottom: '8px', marginTop: 0 }}>Buildogram Recommendation</h3>
            <div style={{ fontWeight: 600, color: '#164e63' }}>{report.buildogram_recommendation}</div>
          </div>
        </div>

        {/* Footer Notes */}
        <div style={{ marginTop: '40px', padding: '20px', background: '#fffbeb', borderRadius: '6px', border: '1px solid #fde68a' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#92400e', textTransform: 'uppercase', fontWeight: 800 }}>Mandatory Disclaimer</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#b45309', lineHeight: 1.5 }}>
            {report.disclaimer || 'This plan review is advisory and based on the information provided. It is not structural approval, architectural certification, legal approval, or government approval. Final decisions must be reviewed by qualified architects, structural engineers, and relevant approval authorities.'}
          </p>
        </div>

      </div>
    </div>
  );
}
