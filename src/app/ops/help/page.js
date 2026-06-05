import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: 'Ops Dashboard Help & SOPs',,
  path: '/ops/help',
});

export default function OpsHelpPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>Help & Standard Operating Procedures (SOPs)</h1>
        <Link href="/ops" className="btn btn-outline">Back to Ops</Link>
      </div>

      <div className="grid-2" style={{ gap: '24px' }}>
        {/* LEADS */}
        <div className="card" style={{ background: 'white' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📞</span> Lead Management
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Response SLA:</strong> All new leads must be moved from "New" to "Contacted" within 2 hours.</li>
            <li><strong>Material Quotes:</strong> Verify requested brands. If a brand is unavailable, quote the nearest Tier-1 equivalent and note it.</li>
            <li><strong>BOQ Audits:</strong> AI-generated reports are preliminary. An engineer MUST manually review and add comments before marking "Review Complete".</li>
          </ul>
        </div>

        {/* PROJECTS */}
        <div className="card" style={{ background: 'white' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏗️</span> Project & Quality Tracking
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Daily Logs:</strong> Site engineers must submit progress photos by 6:00 PM daily.</li>
            <li><strong>Cube Tests:</strong> Upload 7-day and 28-day compressive strength reports to the specific project's document vault.</li>
            <li><strong>Milestone Triggers:</strong> Do not request escrow release until the BQS checklist for that phase is 100% verified.</li>
          </ul>
        </div>

        {/* PARTNERS */}
        <div className="card" style={{ background: 'white' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🤝</span> Partner Verifications
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Contractors:</strong> Request past 2 project handover letters before switching status to "Active".</li>
            <li><strong>Suppliers:</strong> Verify GST number and primary dealership certificates.</li>
            <li><strong>Public Profiles:</strong> Only check "Show Public Profile" if the partner has completed at least 1 successful Buildogram transaction.</li>
          </ul>
        </div>

        {/* ADMIN */}
        <div className="card" style={{ background: 'white' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚙️</span> System Administration
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>WhatsApp Approvals:</strong> Review all queued WhatsApp notifications before 8:00 PM to ensure clients get daily summaries.</li>
            <li><strong>Invoices:</strong> Verify Razorpay order IDs match the generated invoice amounts.</li>
            <li><strong>Support:</strong> Escalate technical portal issues to `dev@buildogram.in`.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
