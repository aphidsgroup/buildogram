'use client';
import { useState, useEffect } from 'react';

const STATUS_COLORS = {
  new: '#3B82F6', contacted: '#F59E0B', converted: '#10B981', closed: '#6B7280', lost: '#EF4444'
};

export default function MaterialLeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/ops/material-leads')
      .then(r => r.json())
      .then(d => { setLeads(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Materials Leads</h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>Enquiries from material pages and request quote forms</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#374151' }}>
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#64748B', padding: '60px' }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748B', padding: '60px', background: '#F8FAFC', borderRadius: '12px' }}>No material leads yet.</div>
      ) : (
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Name', 'Phone', 'Material', 'Brand', 'Quantity', 'Locality', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>{lead.name}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{lead.phone}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{lead.material || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{lead.brand || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{lead.quantity ? `${lead.quantity} ${lead.unit || ''}` : '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{lead.locality || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: STATUS_COLORS[lead.status] + '20', color: STATUS_COLORS[lead.status] || '#6B7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'capitalize' }}>
                      {lead.status || 'new'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748B', fontSize: '13px' }}>{lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
