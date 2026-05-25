'use client';
import { useState } from 'react';
import { SectionHeader, Modal, StatusBadge } from '../_shared/components';
import { DEMO_LEADS, DEMO_PROJECTS, DEMO_MATERIALS, DEMO_BOQ_ITEMS, DEMO_LOGBOOK, LEAD_STATUSES } from '../_shared/demoData';

function fmtRs(n) {
  if (!n) return '₹0';
  return n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr' : n >= 100000 ? '₹' + (n / 100000).toFixed(2) + ' L' : '₹' + Math.round(n).toLocaleString('en-IN');
}

function lineTotal(row) {
  const base = (Number(row.materialCost) + Number(row.labourCost) + Number(row.equipmentCost)) * Number(row.qty);
  return base * (1 + Number(row.wastage) / 100) * (1 + Number(row.margin) / 100) * (1 + Number(row.gst) / 100);
}

// ── Report Content Components ──────────────────────────────────────
function DailyProgressReport() {
  const logs = typeof window !== 'undefined' && localStorage.getItem('bos_logbook')
    ? JSON.parse(localStorage.getItem('bos_logbook')) : DEMO_LOGBOOK;
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Site updates across all projects as of today.</p>
      {logs.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No site logs recorded yet.</p> : logs.map(l => (
        <div key={l.id} style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '10px' }}>
          <div style={{ fontWeight: 700, marginBottom: '6px' }}>📅 {l.date}</div>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>✅ {l.workDone}</div>
          {l.labourCount && <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>👷 {l.labourCount} workers</div>}
          {l.issues && l.issues !== 'None' && <div style={{ fontSize: '13px', color: '#EF4444', marginTop: '4px' }}>🚩 {l.issues}</div>}
        </div>
      ))}
    </div>
  );
}

function BOQSummaryReport() {
  const items = typeof window !== 'undefined' && localStorage.getItem('bos_boq')
    ? JSON.parse(localStorage.getItem('bos_boq')) : DEMO_BOQ_ITEMS;
  const byCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += lineTotal(item);
    return acc;
  }, {});
  const grandTotal = Object.values(byCategory).reduce((a, b) => a + b, 0);
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Category-wise cost breakdown from BOQ Builder.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead><tr style={{ background: '#F8FAFC' }}>
          <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>Category</th>
          <th style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>Total Value</th>
          <th style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>% of Total</th>
        </tr></thead>
        <tbody>
          {Object.entries(byCategory).map(([cat, val]) => (
            <tr key={cat} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px' }}>{cat}</td>
              <td style={{ padding: '10px', textAlign: 'right', fontWeight: 600 }}>{fmtRs(val)}</td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'var(--text-muted)' }}>{grandTotal ? ((val / grandTotal) * 100).toFixed(1) + '%' : '0%'}</td>
            </tr>
          ))}
          <tr style={{ background: 'rgba(252,110,32,0.05)', fontWeight: 800 }}>
            <td style={{ padding: '10px' }}>Grand Total</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#FC6E20' }}>{fmtRs(grandTotal)}</td>
            <td style={{ padding: '10px', textAlign: 'right' }}>100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function LeadPipelineReport() {
  const leads = typeof window !== 'undefined' && localStorage.getItem('bos_leads')
    ? JSON.parse(localStorage.getItem('bos_leads')) : DEMO_LEADS;
  const byStat = LEAD_STATUSES.reduce((acc, s) => { acc[s] = leads.filter(l => l.status === s).length; return acc; }, {});
  const won = byStat['Won'] || 0;
  const total = leads.length;
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Lead status distribution and conversion rate.</p>
      <div style={{ marginBottom: '16px', padding: '14px 18px', background: 'rgba(16,185,129,0.07)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)' }}>
        <span style={{ fontWeight: 700 }}>Conversion Rate: </span>
        <span style={{ color: '#10B981', fontWeight: 800, fontSize: '18px' }}>{total ? ((won / total) * 100).toFixed(0) : 0}%</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>({won} Won / {total} Total)</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead><tr style={{ background: '#F8FAFC' }}>
          <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>Status</th>
          <th style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>Count</th>
          <th style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>Share</th>
        </tr></thead>
        <tbody>
          {LEAD_STATUSES.map(s => (
            <tr key={s} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px' }}><StatusBadge status={s} /></td>
              <td style={{ padding: '10px', textAlign: 'right', fontWeight: 600 }}>{byStat[s] || 0}</td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'var(--text-muted)' }}>{total ? (((byStat[s] || 0) / total) * 100).toFixed(0) + '%' : '0%'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectStatusReport() {
  const projects = typeof window !== 'undefined' && localStorage.getItem('bos_projects')
    ? JSON.parse(localStorage.getItem('bos_projects')) : DEMO_PROJECTS;
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Overview of all projects, stages, and progress.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead><tr style={{ background: '#F8FAFC' }}>
          {['Project', 'Client', 'Stage', 'Progress', 'Budget', 'Status'].map(h => (
            <th key={h} style={{ padding: '10px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px', fontWeight: 600, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</td>
              <td style={{ padding: '10px', color: 'var(--text-muted)' }}>{p.client}</td>
              <td style={{ padding: '10px' }}>{p.stage}</td>
              <td style={{ padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: '#E2E8F0', borderRadius: '4px', height: '6px', width: '80px', overflow: 'hidden' }}>
                    <div style={{ width: `${p.progress}%`, height: '100%', background: '#FC6E20', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{p.progress}%</span>
                </div>
              </td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{fmtRs(p.budget)}</td>
              <td style={{ padding: '10px' }}><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MaterialReport() {
  const items = typeof window !== 'undefined' && localStorage.getItem('bos_materials')
    ? JSON.parse(localStorage.getItem('bos_materials')) : DEMO_MATERIALS;
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Material requests and delivery tracking summary.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead><tr style={{ background: '#F8FAFC' }}>
          {['Material', 'Qty', 'Unit', 'Priority', 'Status', 'Required By'].map(h => (
            <th key={h} style={{ padding: '10px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px', fontWeight: 600 }}>{i.material}</td>
              <td style={{ padding: '10px' }}>{i.qty}</td>
              <td style={{ padding: '10px', color: 'var(--text-muted)' }}>{i.unit}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ color: i.priority === 'High' ? '#EF4444' : i.priority === 'Medium' ? '#D97706' : '#10B981', fontWeight: 700 }}>{i.priority}</span>
              </td>
              <td style={{ padding: '10px' }}><StatusBadge status={i.status} /></td>
              <td style={{ padding: '10px', color: 'var(--text-muted)' }}>{i.requiredDate || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PLReport() {
  const projects = typeof window !== 'undefined' && localStorage.getItem('bos_projects')
    ? JSON.parse(localStorage.getItem('bos_projects')) : DEMO_PROJECTS;
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Estimated P&L per project based on BOQ margin data.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead><tr style={{ background: '#F8FAFC' }}>
          {['Project', 'Budget', 'Est. Revenue', 'Est. Cost', 'Profit (12% Margin)'].map(h => (
            <th key={h} style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {projects.map(p => {
            const rev = Number(p.budget) || 0;
            const cost = rev * 0.88;
            const profit = rev - cost;
            return (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px', fontWeight: 600, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</td>
                <td style={{ padding: '10px' }}>{fmtRs(rev)}</td>
                <td style={{ padding: '10px' }}>{fmtRs(rev * 1.12)}</td>
                <td style={{ padding: '10px' }}>{fmtRs(cost)}</td>
                <td style={{ padding: '10px', fontWeight: 700, color: '#10B981' }}>{fmtRs(profit * 1.12)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Report Config ──────────────────────────────────────────────────
const REPORTS = [
  { id: 'daily', icon: '📓', title: 'Daily Progress Report', desc: "Today's site updates across all active projects", component: DailyProgressReport },
  { id: 'boq', icon: '💰', title: 'BOQ Summary', desc: 'Category-wise cost breakdown and grand totals', component: BOQSummaryReport },
  { id: 'leads', icon: '🎯', title: 'Lead Pipeline Report', desc: 'Lead status funnel and conversion metrics', component: LeadPipelineReport },
  { id: 'projects', icon: '🏗️', title: 'Project Status Report', desc: 'All projects with stage, progress, and budget overview', component: ProjectStatusReport },
  { id: 'materials', icon: '🧱', title: 'Material Procurement Report', desc: 'Material requests, delivery status, and priorities', component: MaterialReport },
  { id: 'payments', icon: '💸', title: 'Payment Summary', desc: 'Milestone payments received vs pending', component: () => <div style={{ padding: '20px', color: 'var(--text-muted)', textAlign: 'center' }}>⏳ Payment data will sync from Finance module once connected to your project invoices.</div> },
  { id: 'quality', icon: '✅', title: 'Quality Check Summary', desc: 'Pending and completed inspection checklists', component: () => <div style={{ padding: '20px', color: 'var(--text-muted)', textAlign: 'center' }}>⏳ Quality check data will appear here once you use the Quality Vault module.</div> },
  { id: 'issues', icon: '🚩', title: 'Delay & Issue Report', desc: 'Open blockers, delay risk flags, and resolution status', component: () => <div style={{ padding: '20px' }}><p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Current open issues across all projects:</p><div style={{ padding: '14px', background: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA', marginBottom: '8px' }}><span style={{ fontWeight: 700, color: '#EF4444' }}>🚩 High:</span> P001 – Concrete pump delay caused 2-hour halt on May 24. Add 4 extra workers to recover schedule.</div><div style={{ padding: '14px', background: '#FFF7ED', borderRadius: '10px', border: '1px solid #FED7AA' }}><span style={{ fontWeight: 700, color: '#D97706' }}>⚠️ Medium:</span> P002 – Bathroom waterproofing material pending from vendor. Delivery expected May 28.</div></div> },
  { id: 'pl', icon: '📊', title: 'Project P&L Summary', desc: 'Estimated revenue, cost, and profit per project', component: PLReport },
];

export default function ReportsPage() {
  const [openReport, setOpenReport] = useState(null);
  const report = REPORTS.find(r => r.id === openReport);

  return (
    <div>
      <SectionHeader icon="📑" title="Smart MIS Reports" desc="Generate and export project reports in one click" />

      {/* SUMMARY ROW */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {[
          { label: 'Reports Available', value: REPORTS.length, color: '#FC6E20' },
          { label: 'Projects Tracked', value: DEMO_PROJECTS.length, color: '#10B981' },
          { label: 'Active Leads', value: DEMO_LEADS.filter(l => l.status !== 'Won' && l.status !== 'Lost').length, color: '#6366F1' },
          { label: 'Last Generated', value: 'Today', color: '#0EA5E9' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '12px 18px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-dark)' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* REPORT CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {REPORTS.map(r => (
          <div key={r.id} className="card" style={{ padding: '22px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '28px', background: 'rgba(252,110,32,0.08)', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{r.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last generated: Today</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary" onClick={() => setOpenReport(r.id)} style={{ flex: 1, fontSize: '13px', padding: '8px' }}>View Report</button>
              <button className="btn btn-outline" onClick={() => alert('PDF export coming soon — connect your PDF library')} style={{ fontSize: '13px', padding: '8px 12px' }}>PDF</button>
              <button className="btn btn-outline" onClick={() => alert('Excel export coming soon — connect your accounting system')} style={{ fontSize: '13px', padding: '8px 12px' }}>XLS</button>
            </div>
          </div>
        ))}
      </div>

      {/* REPORT DETAIL MODAL */}
      <Modal open={!!openReport} onClose={() => setOpenReport(null)} title={report ? `${report.icon} ${report.title}` : ''}
        footer={
          <>
            <button className="btn" onClick={() => setOpenReport(null)}>Close</button>
            <button className="btn btn-outline" onClick={() => alert('PDF export coming soon')}>📄 Export PDF</button>
            <button className="btn btn-outline" onClick={() => alert('Excel export coming soon')}>📊 Export XLS</button>
          </>
        }>
        {report && <report.component />}
      </Modal>
    </div>
  );
}
