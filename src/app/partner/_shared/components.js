'use client';

// ─── STATUS BADGE ───────────────────────────────────────────────────
const STATUS_COLORS = {
  // Lead statuses
  New: '#3B82F6', Contacted: '#8B5CF6', 'Site Visit': '#F59E0B',
  'Quotation Sent': '#6366F1', Negotiation: '#EC4899', Won: '#10B981', Lost: '#EF4444',
  // Project
  Active: '#10B981', Planning: '#F59E0B', Completed: '#6366F1', 'On Hold': '#EF4444',
  // Material
  Requested: '#3B82F6', Approved: '#10B981', Ordered: '#8B5CF6',
  Delivered: '#0EA5E9', Used: '#64748B', Cancelled: '#EF4444',
  // Document
  Draft: '#64748B', 'Sent to Client': '#3B82F6', Viewed: '#8B5CF6',
  Rejected: '#EF4444', 'Revision Requested': '#F59E0B',
  // Generic
  High: '#EF4444', Medium: '#F59E0B', Low: '#10B981',
  Pending: '#F59E0B', 'In Progress': '#3B82F6', Resolved: '#10B981',
};

export function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#64748B';
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 600, letterSpacing: '0.03em',
      background: color + '18', color, border: `1px solid ${color}44`,
      whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  );
}

// ─── METRIC CARD ───────────────────────────────────────────────────
export function MetricCard({ icon, label, value, sub, color = '#FC6E20', onClick }) {
  return (
    <div
      onClick={onClick}
      className="card"
      style={{
        padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center',
        gap: '16px', cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => onClick && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => onClick && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{
        fontSize: '22px', background: `${color}15`, width: '52px', height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px',
        flexShrink: 0, border: `1px solid ${color}20`
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── SECTION HEADER ─────────────────────────────────────────────────
export function SectionHeader({ icon, title, desc, action }) {
  return (
    <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
      <div>
        <h1 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{icon}</span>{title}
        </h1>
        {desc && <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── EMPTY STATE ────────────────────────────────────────────────────
export function EmptyState({ icon = '📭', title, desc, action }) {
  return (
    <div className="card" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '16px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.6, fontSize: '15px' }}>{desc}</p>
      {action}
    </div>
  );
}

// ─── MODAL ──────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card" style={{ borderRadius: '20px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflow: 'auto', padding: '0' }}>
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1 }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '24px 28px' }}>{children}</div>
        {footer && <div style={{ padding: '16px 28px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── FORM INPUT ─────────────────────────────────────────────────────
export function FormField({ label, required, children }) {
  return (
    <div className="input-group" style={{ marginBottom: '16px' }}>
      <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

// ─── SEARCH BAR ─────────────────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>🔍</span>
      <input
        className="input"
        style={{ paddingLeft: '36px', maxWidth: '280px' }}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
