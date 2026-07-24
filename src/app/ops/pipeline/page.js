'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ─── Constants ─────────────────────────────────────────── */
const STATUS_PIPELINE = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const LEAD_TYPE_LABELS = {
  construction:        { label: 'Construction',       color: '#2563eb', bg: '#eff6ff' },
  boq_audit:           { label: 'BOQ Audit',          color: '#7c3aed', bg: '#f5f3ff' },
  plan_review:         { label: 'Plan Review',        color: '#0891b2', bg: '#ecfeff' },
  material_quote:      { label: 'Materials',          color: '#d97706', bg: '#fffbeb' },
  partner_application: { label: 'Partner App',        color: '#16a34a', bg: '#dcfce7' },
  property_inquiry:    { label: 'Property Inquiry',   color: '#db2777', bg: '#fce7f3' },
  rental_listing:      { label: 'Rental',             color: '#475569', bg: '#f1f5f9' },
  property_passport:   { label: 'Property Passport',  color: '#9333ea', bg: '#faf5ff' },
  maintenance:         { label: 'Maintenance',        color: '#ea580c', bg: '#fff7ed' },
  property_listing:    { label: 'Property Listing',   color: '#e11d48', bg: '#fff1f2' },
  general:             { label: 'General',            color: '#64748b', bg: '#f8fafc' },
};

const STATUS_COLORS = {
  new:       { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  contacted: { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  qualified: { color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  proposal:  { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  won:       { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  lost:      { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};

/* ─── Helpers ───────────────────────────────────────────── */
const getWhatsAppLink = (phone, name, status) => {
  const p = phone.replace(/\D/g, '').replace(/^0/, '');
  const finalPhone = p.length === 10 ? `91${p}` : p;
  const msg = `Hi ${name?.split(' ')[0] || 'there'}, this is Buildogram. I wanted to share a quick update regarding your request.`;
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(msg)}`;
};

export default function PipelineDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [draggedLead, setDraggedLead] = useState(null);
  const [toast, setToast] = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const updateStatus = async (leadId, newStatus) => {
    // Optimistic Update
    const originalLeads = [...leads];
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      await fetch(`/api/leads/${leadId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity_type: 'status_change',
          title: 'Pipeline Update',
          description: `Moved to ${newStatus}`
        })
      });
      showToast(`Moved to ${newStatus}`);
    } catch (err) {
      console.error(err);
      setLeads(originalLeads); // Revert on failure
      showToast('Failed to update status');
    }
  };

  const filtered = leads.filter(l => {
    const matchType = typeFilter === 'all' || l.lead_type === typeFilter;
    const matchSearch = l.name?.toLowerCase().includes(search.toLowerCase()) || 
                        l.phone?.includes(search) || 
                        l.city?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const columns = STATUS_PIPELINE.map(status => ({
    status,
    items: filtered.filter(l => (l.status || 'new') === status)
  }));

  const activeLeadsCount = leads.filter(l => l.status !== 'won' && l.status !== 'lost').length;
  const wonThisMonth = leads.filter(l => l.status === 'won' && new Date(l.created_at).getMonth() === new Date().getMonth()).length;

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow the drag ghost to generate before we might style it
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedLead(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== targetStatus) {
      updateStatus(draggedLead.id, targetStatus);
    }
    setDraggedLead(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1e293b', color: 'white', padding: '12px 24px', borderRadius: '8px', zIndex: 9999, fontWeight: 500, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          {toast}
        </div>
      )}

      {/* Header & Filters */}
      <div style={{ padding: '24px', background: 'white', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>Pipeline Board</h1>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Drag and drop leads to update their status.</div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>Active Leads</div>
              <div style={{ fontSize: '20px', color: '#15803d', fontWeight: 800 }}>{activeLeadsCount}</div>
            </div>
            <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', padding: '8px 16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: '#164e63', fontWeight: 700, textTransform: 'uppercase' }}>Won This Month</div>
              <div style={{ fontSize: '20px', color: '#0e7490', fontWeight: 800 }}>{wonThisMonth}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Search leads by name, phone, or city..." 
            className="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <select className="input" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ maxWidth: '200px' }}>
            <option value="all">All Lead Types</option>
            {Object.entries(LEAD_TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div style={{ flex: 1, padding: '24px', overflowX: 'auto', overflowY: 'hidden', display: 'flex', gap: '20px' }}>
        {loading ? (
          <div style={{ padding: '40px', color: '#64748b' }}>Loading pipeline...</div>
        ) : (
          columns.map(col => {
            const cCfg = STATUS_COLORS[col.status];
            return (
              <div 
                key={col.status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.status)}
                style={{ 
                  flexShrink: 0, width: '320px', display: 'flex', flexDirection: 'column', 
                  background: '#f1f5f9', borderRadius: '12px', overflow: 'hidden',
                  border: `1px solid ${cCfg.border}`
                }}
              >
                <div style={{ padding: '16px', background: cCfg.bg, borderBottom: `1px solid ${cCfg.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: cCfg.color, textTransform: 'uppercase' }}>{col.status.replace('_', ' ')}</div>
                  <div style={{ background: 'rgba(255,255,255,0.8)', color: cCfg.color, fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>
                    {col.items.length}
                  </div>
                </div>

                <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.items.map(lead => {
                    const lCfg = LEAD_TYPE_LABELS[lead.lead_type || 'construction'] || LEAD_TYPE_LABELS.general;
                    const isOverdue = lead.follow_up_date && new Date(lead.follow_up_date) < new Date() && lead.status !== 'won' && lead.status !== 'lost';

                    return (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead)}
                        onDragEnd={handleDragEnd}
                        style={{ 
                          background: 'white', padding: '16px', borderRadius: '8px', 
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
                          borderLeft: isOverdue ? '4px solid #ef4444' : '1px solid #e2e8f0',
                          cursor: 'grab', display: 'flex', flexDirection: 'column', gap: '12px',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{lead.name}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{lead.phone} • {lead.city}</div>
                          </div>
                          {isOverdue && (
                            <div style={{ fontSize: '10px', background: '#fef2f2', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              Overdue
                            </div>
                          )}
                        </div>

                        <div>
                          <span style={{ 
                            display: 'inline-flex', padding: '2px 8px', borderRadius: '99px', 
                            fontSize: '10px', fontWeight: 600, color: lCfg.color, background: lCfg.bg 
                          }}>
                            {lCfg.label}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <a 
                            href={`/ops/leads`} // We will redirect them to Ops CRM for full edits
                            className="btn btn-sm btn-ghost" 
                            style={{ flex: 1, border: '1px solid #e2e8f0', fontSize: '11px', textAlign: 'center', textDecoration: 'none' }}
                          >
                            👁️ View 
                          </a>
                          <a 
                            href={getWhatsAppLink(lead.phone, lead.name, lead.status)}
                            target="_blank" rel="noreferrer"
                            className="btn btn-sm btn-ghost" 
                            style={{ flex: 1, border: '1px solid #dcfce7', background: '#f0fdf4', color: '#16a34a', fontSize: '11px', textAlign: 'center', textDecoration: 'none' }}
                          >
                            💬 WhatsApp
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
