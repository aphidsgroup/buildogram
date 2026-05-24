const fs = require('fs');
const path = require('path');

const modules = [
  { path: 'leads', name: 'Lead & Sales CRM', icon: '🎯', desc: 'Manage your incoming Buildogram leads, customer enquiries, and conversions.' },
  { path: 'pre-construction', name: 'Pre-Construction Planner', icon: '📐', desc: 'Manage feasibility checklists, approvals, plot details, and initial budgets.' },
  { path: 'projects', name: 'Project Control Center', icon: '🏗️', desc: 'Track ongoing projects, milestones, WBS, and schedules.' },
  { path: 'boq-studio', name: 'Buildogram BOQ Studio', icon: '💰', desc: 'Create advanced category-wise BOQs, calculate material quantities, and estimate profits.' },
  { path: 'budget', name: 'Budget & Cost Control', icon: '📉', desc: 'Track approved budgets vs actual expenses and monitor cost overruns.' },
  { path: 'design', name: 'Design Management', icon: '🎨', desc: 'Upload 2D drawings, 3D renders, moodboards, and manage client design approvals.' },
  { path: 'site-logbook', name: 'Site Logbook', icon: '📓', desc: 'Record daily site updates, weather, labour count, and progress photos.' },
  { path: 'progress', name: 'Progress Tracker', icon: '📈', desc: 'Monitor planned vs actual production quantities and track delays.' },
  { path: 'materials', name: 'Material Flow', icon: '🧱', desc: 'Track site material requests, stock levels, and shortage alerts.' },
  { path: 'procurement', name: 'Procurement Desk', icon: '🛒', desc: 'Manage purchase orders, vendor quotations, and goods received notes.' },
  { path: 'vendors', name: 'Vendor Hub', icon: '🤝', desc: 'Manage subcontractors, vendor compliance, and work orders.' },
  { path: 'crew', name: 'Crew Manager', icon: '👷', desc: 'Track labour attendance, daily wages, and estimate payroll costs.' },
  { path: 'equipment', name: 'Asset Tracker', icon: '🚜', desc: 'Log equipment usage, rental costs, and breakdown status.' },
  { path: 'quality', name: 'Quality Check Vault', icon: '✅', desc: 'Conduct stage-wise inspections and approve quality checklists.' },
  { path: 'issues', name: 'Issue Tracker', icon: '🚩', desc: 'Flag site blockers, track resolution due dates, and monitor delay impacts.' },
  { path: 'client-room', name: 'Client Room', icon: '💬', desc: 'Communicate with your clients, share progress, and request approvals.' },
  { path: 'documents', name: 'Document Locker', icon: '📁', desc: 'Store agreements, drawings, completion certificates, and warranties.' },
  { path: 'finance', name: 'Finance Tracker', icon: '💸', desc: 'Track payment schedules, project P&L, and vendor payments.' },
  { path: 'invoices', name: 'Invoice Manager', icon: '🧾', desc: 'Upload bills, manage petty cash, and track site-wise expenses.' },
  { path: 'maintenance', name: 'Maintenance Tracker', icon: '🔧', desc: 'Manage AMC schedules, warranty tracking, and service tickets.' },
  { path: 'reports', name: 'Smart MIS Reports', icon: '📑', desc: 'Generate and export automated PDF/Excel progress and variance reports.' },
  { path: 'ai-assistant', name: 'Buildogram AI Assistant', icon: '🤖', desc: 'Ask AI to analyze BOQ variance, detect delay risks, or draft client updates.' }
];

const template = (name, icon, desc) => `'use client';
import Link from 'next/link';

export default function ${name.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>${icon}</span> ${name}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>${desc}</p>
      </div>

      <div className="card" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>${icon}</div>
        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--primary-dark)' }}>No data available yet</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          You haven't added any records to the ${name} module yet. Start by creating your first entry to populate this dashboard.
        </p>
        <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>+</span> Add New Record
        </button>
      </div>
    </div>
  );
}
`;

modules.forEach(mod => {
  const dir = path.join(__dirname, '../src/app/partner', mod.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.js'), template(mod.name, mod.icon, mod.desc));
  console.log('Generated:', mod.path);
});

console.log('All modules generated successfully!');
