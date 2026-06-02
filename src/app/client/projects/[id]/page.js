'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/* ── Helpers ─────────────────────────────────────────────────────────── */
const fmt = n => n ? '₹' + (n >= 10000000 ? (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? (n / 100000).toFixed(1) + 'L' : Number(n).toLocaleString('en-IN')) : '—';
const STAGE_ORDER = ['Planning', 'Foundation', 'Structure', 'Brickwork', 'Roofing', 'Electrical & Plumbing', 'Plastering', 'Flooring', 'Painting', 'Finishing', 'Handover'];

/* ── Demo Data Loader ────────────────────────────────────────────────── */
function loadProjectById(id) {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('bos_projects');
  const projects = stored ? JSON.parse(stored) : [
    { id: 'P001', name: 'My G+2 Residential Villa', client: 'Rajesh Kumar', location: 'Porur, Chennai', type: 'Residential Construction', status: 'Active', progress: 62, stage: 'Structure', budget: 7500000, startDate: '2025-02-01', targetDate: '2025-12-30' },
    { id: 'P002', name: 'Office Renovation Project', client: 'Rajesh Kumar', location: 'OMR, Chennai', type: 'Commercial Renovation', status: 'Planning', progress: 15, stage: 'Foundation', budget: 2200000, startDate: '2025-04-15', targetDate: '2025-09-30' },
  ];
  return projects.find(p => p.id === id) || null;
}

const DEMO_MILESTONES = [
  { id: 'M001', projectId: 'P001', title: 'Foundation Complete', stage: 'Foundation', targetDate: '2025-03-15', completedDate: '2025-03-18', status: 'completed', customerVisible: true, description: 'RCC foundation poured and cured. Column stubs in place.' },
  { id: 'M002', projectId: 'P001', title: 'Ground Floor Slab Cast', stage: 'Structure', targetDate: '2025-04-30', completedDate: '2025-05-02', status: 'completed', customerVisible: true, description: 'GF slab concreting done. 7-day curing in progress.' },
  { id: 'M003', projectId: 'P001', title: 'First Floor Structure', stage: 'Structure', targetDate: '2025-06-15', completedDate: null, status: 'in_progress', customerVisible: true, description: 'First floor columns and beams underway. TMT placed.' },
  { id: 'M004', projectId: 'P001', title: 'Brickwork - All Floors', stage: 'Brickwork', targetDate: '2025-08-01', completedDate: null, status: 'pending', customerVisible: true, description: 'AAC block or conventional brick as per final BOQ approval.' },
  { id: 'M005', projectId: 'P001', title: 'Electrical & Plumbing Rough-in', stage: 'Electrical & Plumbing', targetDate: '2025-09-15', completedDate: null, status: 'pending', customerVisible: false, description: 'Internal milestone — not customer-visible yet.' },
  { id: 'M006', projectId: 'P001', title: 'Roof Terrace Waterproofing', stage: 'Roofing', targetDate: '2025-07-20', completedDate: null, status: 'pending', customerVisible: true, description: 'APP membrane + brick bat coba waterproofing on terrace.' },
];

const DEMO_UPDATES = [
  { id: 'U001', projectId: 'P001', title: 'Column Concreting - G+1 Level', content: 'All 12 columns at G+1 level concreted successfully today. Grade M25 concrete used. Curing started.', date: '2025-06-01', photos: [], clientVisible: true, postedBy: 'Site Engineer' },
  { id: 'U002', projectId: 'P001', title: 'TMT Steel Delivery', content: 'Fe500D TMT bars (8 MT) delivered and stored on site. Quality check done — mill certificate verified.', date: '2025-05-28', photos: [], clientVisible: true, postedBy: 'Site Supervisor' },
  { id: 'U003', projectId: 'P001', title: 'Supplier coordination note', content: 'Internal: Contacted cement supplier for next delivery schedule.', date: '2025-05-25', photos: [], clientVisible: false, postedBy: 'Partner' },
  { id: 'U004', projectId: 'P001', title: 'Formwork Erected - First Floor Slab', content: 'Shuttering for first floor slab erected. Centering material placed. Ready for rebaring and concreting by end of week.', date: '2025-05-20', photos: [], clientVisible: true, postedBy: 'Site Engineer' },
];

const DEMO_DOCS = [
  { id: 'D001', projectId: 'P001', name: 'Approved Building Plan', type: 'plan', uploadedDate: '2025-02-05', customerVisible: true, url: '#' },
  { id: 'D002', projectId: 'P001', name: 'Structural Drawing Set', type: 'structural', uploadedDate: '2025-02-10', customerVisible: true, url: '#' },
  { id: 'D003', projectId: 'P001', name: 'Soil Test Report', type: 'report', uploadedDate: '2025-01-28', customerVisible: true, url: '#' },
  { id: 'D004', projectId: 'P001', name: 'Internal BOQ Workings', type: 'internal', uploadedDate: '2025-02-01', customerVisible: false, url: '#' },
];

const DEMO_PAYMENTS = [
  { id: 'PAY001', projectId: 'P001', milestone: 'Mobilization Advance', amount: 750000, dueDate: '2025-02-01', paidDate: '2025-02-03', status: 'paid' },
  { id: 'PAY002', projectId: 'P001', milestone: 'Foundation Completion', amount: 1125000, dueDate: '2025-03-20', paidDate: '2025-03-22', status: 'paid' },
  { id: 'PAY003', projectId: 'P001', milestone: 'Ground Floor Slab', amount: 1125000, dueDate: '2025-05-10', paidDate: null, status: 'due' },
  { id: 'PAY004', projectId: 'P001', milestone: 'First Floor Structure', amount: 1125000, dueDate: '2025-06-30', paidDate: null, status: 'upcoming' },
  { id: 'PAY005', projectId: 'P001', milestone: 'Brickwork & Roofing', amount: 1125000, dueDate: '2025-08-15', paidDate: null, status: 'upcoming' },
  { id: 'PAY006', projectId: 'P001', milestone: 'Finishing & Handover', amount: 2250000, dueDate: '2025-11-30', paidDate: null, status: 'upcoming' },
];

const DEMO_ISSUES = [
  { id: 'I001', projectId: 'P001', title: 'Window frame size clarification needed', description: 'Customer wants to confirm if kitchen window frame size can be changed from 4x4 to 5x4 feet.', raisedBy: 'Customer', date: '2025-05-15', status: 'resolved', customerVisible: true },
];

/* ── Sub-Components ─────────────────────────────────────────────────── */
function ProgressBar({ pct }) {
  const c = pct >= 75 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#6366F1';
  return (
    <div style={{ background: '#E2E8F0', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: '6px', transition: 'width 0.5s' }} />
    </div>
  );
}

function InfoBox({ label, value, icon }) {
  return (
    <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>{icon} {label}</div>
      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{value}</div>
    </div>
  );
}

/* ── Tab: Overview ─────────────────────────────────────────────────── */
function TabOverview({ project }) {
  const stageIdx = STAGE_ORDER.indexOf(project.stage);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Progress Card */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A5F)', borderRadius: '16px', padding: '24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Overall Progress</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: '#FC6E20' }}>{project.progress}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: '#94A3B8' }}>Current Stage</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>🔶 {project.stage}</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${project.progress}%`, height: '100%', background: '#FC6E20', borderRadius: '6px', transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* Key Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
        <InfoBox icon="📍" label="Location" value={project.location} />
        <InfoBox icon="🏠" label="Project Type" value={project.type} />
        <InfoBox icon="📅" label="Start Date" value={project.startDate} />
        <InfoBox icon="🎯" label="Target Date" value={project.targetDate || '—'} />
        <InfoBox icon="💰" label="Contract Value" value={fmt(project.budget)} />
        <InfoBox icon="🏗️" label="Status" value={project.status} />
      </div>

      {/* Stage Pipeline */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Construction Stage Pipeline</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {STAGE_ORDER.map((stage, i) => {
            const done = i < stageIdx;
            const current = i === stageIdx;
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', background: current ? 'rgba(252,110,32,0.06)' : done ? '#F0FDF4' : '#F8FAFC', border: current ? '1px solid rgba(252,110,32,0.3)' : '1px solid transparent' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{done ? '✅' : current ? '🔶' : '⭕'}</span>
                <span style={{ fontSize: '14px', fontWeight: current ? 700 : done ? 500 : 400, color: current ? '#FC6E20' : done ? '#059669' : '#94A3B8' }}>{stage}</span>
                {current && <span style={{ marginLeft: 'auto', background: '#FC6E2015', color: '#FC6E20', padding: '2px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800 }}>CURRENT</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Card */}
      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, color: '#92400E' }}>🛡️ Your Buildogram Point of Contact</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>Buildogram Operations Team</div>
            <div style={{ fontSize: '13px', color: '#78350F', marginTop: '4px' }}>For any project query, change request, or concern — we are your single point of contact.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a href="tel:+919876543210" style={{ padding: '8px 16px', background: '#0F172A', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>📞 Call Us</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: '#22C55E', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Timeline ─────────────────────────────────────────────────── */
function TabTimeline({ projectId }) {
  const milestones = DEMO_MILESTONES.filter(m => m.projectId === projectId && m.customerVisible);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748B' }}>Key milestones tracked and updated by the Buildogram site team.</p>
      {milestones.map(m => (
        <div key={m.id} style={{ background: 'white', borderRadius: '14px', border: `1px solid ${m.status === 'completed' ? '#A7F3D0' : m.status === 'in_progress' ? '#FED7AA' : '#E2E8F0'}`, padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{m.status === 'completed' ? '✅' : m.status === 'in_progress' ? '🔶' : '⭕'}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>{m.title}</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Stage: {m.stage}</div>
                {m.description && <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px', lineHeight: 1.5 }}>{m.description}</div>}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>TARGET</div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{m.targetDate}</div>
              {m.completedDate && <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>✅ Done: {m.completedDate}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Tab: Updates ──────────────────────────────────────────────────── */
function TabUpdates({ projectId }) {
  const updates = DEMO_UPDATES.filter(u => u.projectId === projectId && u.clientVisible);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#64748B' }}>Site updates shared by the Buildogram team from your construction site.</p>
      {updates.map(u => (
        <div key={u.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>📸 {u.title}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{u.date} · {u.postedBy}</div>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{u.content}</p>
        </div>
      ))}
      {updates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
          <div style={{ fontWeight: 600 }}>No site updates yet</div>
          <div style={{ fontSize: '13px', marginTop: '4px' }}>Updates will appear here as your project progresses.</div>
        </div>
      )}
    </div>
  );
}

/* ── Tab: Documents ────────────────────────────────────────────────── */
function TabDocuments({ projectId }) {
  const docs = DEMO_DOCS.filter(d => d.projectId === projectId && d.customerVisible);
  const typeIcon = { plan: '🗺️', structural: '🏗️', report: '📊', default: '📄' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#64748B' }}>Approved plans, drawings, and reports shared with you by Buildogram.</p>
      {docs.map(d => (
        <div key={d.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', background: '#FFF7ED', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{typeIcon[d.type] || typeIcon.default}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{d.name}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Uploaded: {d.uploadedDate}</div>
            </div>
          </div>
          <a href={d.url} style={{ padding: '8px 16px', background: '#EFF6FF', color: '#2563EB', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>⬇ Download</a>
        </div>
      ))}
      {docs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
          <div style={{ fontWeight: 600 }}>No documents shared yet</div>
        </div>
      )}
    </div>
  );
}

/* ── Tab: Payments ─────────────────────────────────────────────────── */
function TabPayments({ projectId }) {
  const payments = DEMO_PAYMENTS.filter(p => p.projectId === projectId);
  const paid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const total = payments.reduce((s, p) => s + p.amount, 0);
  const paidPct = total > 0 ? Math.round((paid / total) * 100) : 0;
  const statusStyle = { paid: ['#DCFCE7','#166534','✅ Paid'], due: ['#FEF9C3','#854D0E','⏰ Due'], upcoming: ['#F1F5F9','#475569','🗓 Upcoming'] };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Summary */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: '16px', padding: '24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Amount Paid</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#10B981' }}>{fmt(paid)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Total Contract</div>
            <div style={{ fontSize: '28px', fontWeight: 900 }}>{fmt(total)}</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
          <div style={{ width: `${paidPct}%`, height: '100%', background: '#10B981', borderRadius: '6px' }} />
        </div>
        <div style={{ marginTop: '8px', fontSize: '13px', color: '#94A3B8' }}>{paidPct}% payment completed</div>
      </div>

      {/* Payment Schedule */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {payments.map(p => {
          const [bg, color, label] = statusStyle[p.status] || statusStyle.upcoming;
          return (
            <div key={p.id} style={{ background: 'white', borderRadius: '14px', border: `1px solid ${bg}`, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{p.milestone}</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Due: {p.dueDate}</div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A' }}>{fmt(p.amount)}</div>
                <span style={{ background: bg, color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '14px 18px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA', fontSize: '13px', color: '#78350F' }}>
        ℹ️ For payment receipts or invoices, please contact the Buildogram team at <strong>support@buildogram.in</strong> or WhatsApp <strong>+91 98765 43210</strong>.
      </div>
    </div>
  );
}

/* ── Tab: Query Box ────────────────────────────────────────────────── */
function TabQueryBox({ projectId }) {
  const [issues, setIssues] = useState(() => {
    if (typeof window === 'undefined') return DEMO_ISSUES.filter(i => i.projectId === projectId && i.customerVisible);
    const stored = localStorage.getItem(`bos_client_issues_${projectId}`);
    return stored ? JSON.parse(stored) : DEMO_ISSUES.filter(i => i.projectId === projectId && i.customerVisible);
  });
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const submitIssue = () => {
    if (!form.title.trim()) return;
    const newIssue = {
      id: 'CI' + Date.now(),
      projectId,
      title: form.title,
      description: form.description,
      raisedBy: 'Customer',
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      customerVisible: true,
    };
    const updated = [newIssue, ...issues];
    setIssues(updated);
    if (typeof window !== 'undefined') localStorage.setItem(`bos_client_issues_${projectId}`, JSON.stringify(updated));
    setForm({ title: '', description: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const statusStyle = { open: ['#EFF6FF','#2563EB','🔵 Open'], resolved: ['#DCFCE7','#166534','✅ Resolved'], in_progress: ['#FEF9C3','#854D0E','🟡 In Progress'] };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {submitted && (
        <div style={{ background: '#DCFCE7', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px 18px', fontWeight: 700, color: '#166534', fontSize: '14px' }}>
          ✅ Your query has been submitted. Buildogram team will respond within 24 hours.
        </div>
      )}

      {/* Submit Form */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700 }}>❓ Raise a Query or Concern</h3>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Subject *</label>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Window size change request, Foundation crack concern…"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Details (optional)</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe your query in detail…"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', outline: 'none' }} />
        </div>
        <button onClick={submitIssue} disabled={!form.title.trim()}
          style={{ padding: '10px 24px', background: form.title.trim() ? 'linear-gradient(135deg,#FFB347,#FC6E20)' : '#E2E8F0', color: form.title.trim() ? 'white' : '#94A3B8', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: form.title.trim() ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
          Submit Query →
        </button>
      </div>

      {/* Existing Issues */}
      {issues.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Your Previous Queries ({issues.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {issues.map(issue => {
              const [bg, color, label] = statusStyle[issue.status] || statusStyle.open;
              return (
                <div key={issue.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{issue.title}</div>
                    <span style={{ background: bg, color, padding: '3px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                  {issue.description && <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{issue.description}</p>}
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Raised: {issue.date} by {issue.raisedBy}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────── */
const TABS = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'timeline', label: '🏁 Timeline' },
  { id: 'updates', label: '📸 Site Updates' },
  { id: 'documents', label: '📁 Documents' },
  { id: 'payments', label: '💰 Payments' },
  { id: 'query', label: '❓ Query Box' },
];

export default function ClientProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = loadProjectById(id);
    setProject(p);
    setLoading(false);
  }, [id]);

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'Inter, sans-serif', color: '#64748B' }}><div style={{ width: '32px', height: '32px', border: '3px solid #E2E8F0', borderTopColor: '#FC6E20', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>;
  if (!project) return (
    <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏗️</div>
      <h2>Project Not Found</h2>
      <Link href="/client/projects" style={{ color: '#FC6E20', fontWeight: 700 }}>← Back to My Projects</Link>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '28px', borderRadius: '20px', color: 'white', marginBottom: '24px' }}>
        <Link href="/client/projects" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>← My Projects</Link>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800 }}>{project.name}</h1>
        <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: '13px' }}>📍 {project.location} &nbsp;·&nbsp; {project.type}</p>
      </div>

      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', fontWeight: tab === t.id ? 700 : 500, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', background: tab === t.id ? '#FC6E20' : 'white', color: tab === t.id ? 'white' : '#64748B', boxShadow: tab === t.id ? '0 2px 8px rgba(252,110,32,0.3)' : '0 1px 4px rgba(0,0,0,0.05)', fontFamily: 'inherit', transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview'   && <TabOverview   project={project} />}
      {tab === 'timeline'   && <TabTimeline   projectId={id} />}
      {tab === 'updates'    && <TabUpdates    projectId={id} />}
      {tab === 'documents'  && <TabDocuments  projectId={id} />}
      {tab === 'payments'   && <TabPayments   projectId={id} />}
      {tab === 'query'      && <TabQueryBox   projectId={id} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
