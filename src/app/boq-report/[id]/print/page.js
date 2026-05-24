'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function BOQPrintPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/boq-report/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setData(d.data);
          setTimeout(() => window.print(), 800);
        } else {
          setError(d.error || 'Failed to load report');
        }
      })
      .catch(() => setError('Network error'));
  }, [id]);

  if (error) return <div style={{ padding: '40px', color: 'red', fontFamily: 'sans-serif' }}>Error: {error}</div>;
  if (!data) return <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#64748b' }}>Generating printable report...</div>;

  const { report, project_type, quoted_amount, built_up_area, floors, created_at } = data;
  const reportDate = new Date(report.reviewed_at || created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{
      maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px',
      color: '#0f172a', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hide the print button when printing */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 20mm; }
        }
      `}</style>

      <div className="no-print" style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button onClick={() => window.print()} style={{
          background: '#4f46e5', color: 'white', padding: '8px 16px',
          border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600
        }}>
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#1e293b' }}>Buildogram</h1>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engineering & Cost Auditing</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#4f46e5' }}>Official BOQ Audit Report</h2>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Date: {reportDate}</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>ID: {id.split('-')[0]}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}>
        {[
          ['Project Type', project_type],
          ['Built-up Area', built_up_area ? `${built_up_area} sq.ft` : null],
          ['Floors', floors],
          ['Contractor Quote', quoted_amount ? `₹${Number(quoted_amount).toLocaleString('en-IN')}` : null]
        ].filter(([, v]) => v).map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.6 }}>
        <section>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', borderBottom: '1px solid #e0e7ff', paddingBottom: '4px', marginBottom: '8px' }}>Executive Summary</h3>
          <div style={{ fontSize: '13px', color: '#334155' }}>{report.executive_summary}</div>
        </section>

        {report.missing_or_unclear_items && (
          <section>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', borderBottom: '1px solid #e0e7ff', paddingBottom: '4px', marginBottom: '8px' }}>Missing or Unclear Items</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', color: '#334155' }}>{report.missing_or_unclear_items}</pre>
          </section>
        )}

        {report.escalation_risks && (
          <section>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', borderBottom: '1px solid #e0e7ff', paddingBottom: '4px', marginBottom: '8px' }}>Escalation & Cost Risks</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', color: '#334155' }}>{report.escalation_risks}</pre>
          </section>
        )}

        {report.questions_to_ask_contractor && (
          <section>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', borderBottom: '1px solid #e0e7ff', paddingBottom: '4px', marginBottom: '8px' }}>Questions for your Contractor</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', color: '#334155' }}>{report.questions_to_ask_contractor}</pre>
          </section>
        )}

        <section style={{ background: '#f5f3ff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginTop: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#5b21b6', textTransform: 'uppercase', marginBottom: '8px' }}>Buildogram Recommendation</h3>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95' }}>{report.buildogram_recommendation}</div>
        </section>

        <section style={{ borderTop: '2px solid #e2e8f0', marginTop: '32px', paddingTop: '16px' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic', textAlign: 'justify' }}>
            <strong>Important Disclaimer:</strong> {report.disclaimer}
          </div>
        </section>
      </div>
    </div>
  );
}
