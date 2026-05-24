'use client';
import Link from 'next/link';

export default function ProjectControlCenterPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>🏗️</span> Project Control Center
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Track ongoing projects, milestones, WBS, and schedules.</p>
      </div>

      <div className="card" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏗️</div>
        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--primary-dark)' }}>No data available yet</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          You haven't added any records to the Project Control Center module yet. Start by creating your first entry to populate this dashboard.
        </p>
        <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>+</span> Add New Record
        </button>
      </div>
    </div>
  );
}
