'use client';
import { useState, useEffect } from 'react';
import { StatusBadge, SectionHeader, Modal, FormField, SearchBar, EmptyState } from '../_shared/components';
import { DEMO_LEADS, LEAD_STATUSES } from '../_shared/demoData';
import { getAllLeads } from '@/lib/leadStore';

const PROJECT_TYPES = ['Residential', 'Villa', 'Interior', 'Commercial', 'Renovation', 'Solar', 'Elevator', 'Waterproofing'];
const SOURCES = ['Buildogram', 'WhatsApp', 'Referral', 'Google', 'Facebook', 'Direct'];

const BLANK = { customerName: '', phone: '', email: '', requirement: '', location: '', budgetRange: '', projectType: 'Residential', source: 'Buildogram', status: 'New', followUpDate: '', notes: '' };

function generateId() { return 'L' + Date.now().toString().slice(-6); }

export default function LeadsCRM() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_leads');
    const internalLeads = stored ? JSON.parse(stored) : DEMO_LEADS;
    // Merge public enquiries from shared leadStore (submitted via partner profile page)
    const publicLeads = getAllLeads().map(l => ({
      id: l.id,
      customerName: l.customerName,
      phone: l.phone,
      email: l.email || '',
      requirement: l.requirement || '',
      location: l.location || '',
      budgetRange: l.budgetRange || '',
      projectType: l.category || 'General',
      source: '🌐 Partner Profile',
      status: l.status || 'New',
      followUpDate: l.followUpDate || '',
      notes: l.notes || (l.message ? `Message: ${l.message}` : ''),
      createdAt: l.createdAt || '',
      isPublicEnquiry: true,
    }));
    // Merge: avoid duplicates by ID
    const existingIds = new Set(internalLeads.map(l => l.id));
    const merged = [...internalLeads, ...publicLeads.filter(l => !existingIds.has(l.id))];
    setLeads(merged);
  }, []);

  const save = (arr) => { setLeads(arr); localStorage.setItem('bos_leads', JSON.stringify(arr)); };

  const openAdd = () => { setForm(BLANK); setEditingLead(null); setModalOpen(true); };
  const openEdit = (l) => { setForm({ ...l }); setEditingLead(l.id); setModalOpen(true); };

  const handleSubmit = () => {
    if (!form.customerName || !form.phone) return alert('Customer Name and Phone are required');
    if (editingLead) {
      save(leads.map(l => l.id === editingLead ? { ...form, id: editingLead } : l));
    } else {
      save([{ ...form, id: generateId(), createdAt: new Date().toISOString().slice(0, 10) }, ...leads]);
    }
    setModalOpen(false);
  };

  const deleteLead = (id) => { if (confirm('Delete this lead?')) save(leads.filter(l => l.id !== id)); };

  const convertToProject = (l) => {
    const stored = localStorage.getItem('bos_projects');
    const projects = stored ? JSON.parse(stored) : [];
    const newP = { id: 'P' + Date.now().toString().slice(-6), name: `${l.requirement} – ${l.customerName}`, client: l.customerName, location: l.location, type: l.projectType, startDate: new Date().toISOString().slice(0, 10), targetDate: '', stage: 'Agreement', progress: 0, budget: 0, status: 'Planning' };
    localStorage.setItem('bos_projects', JSON.stringify([...projects, newP]));
    showToast(`✅ Lead converted! Project "${newP.name}" created.`);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.customerName.toLowerCase().includes(search.toLowerCase()) || l.location?.toLowerCase().includes(search.toLowerCase()) || l.requirement?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 2000, background: '#10B981', color: 'white', padding: '14px 20px', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', animation: 'fadeIn 0.3s' }}>
          {toast}
        </div>
      )}

      <SectionHeader icon="🎯" title="Lead & Sales CRM" desc="Manage your enquiries and track your pipeline"
        action={<button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>+ Add Lead</button>}
      />

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search leads..." />
        <select className="input" style={{ maxWidth: '180px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filtered.length} lead{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <EmptyState icon="🎯" title="No leads found" desc="Add your first lead or adjust your search filters." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Lead</button>} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
                {['Customer', 'Phone', 'Requirement', 'Location', 'Budget', 'Type', 'Source', 'Status', 'Follow-up', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{l.customerName}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{l.phone}</td>
                  <td style={{ padding: '12px 14px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.requirement}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{l.location}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{l.budgetRange}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{l.projectType}</td>
                  <td style={{ padding: '12px 14px' }}>{l.source}</td>
                  <td style={{ padding: '12px 14px' }}><StatusBadge status={l.status} /></td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{l.followUpDate || '—'}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button title="Edit" onClick={() => openEdit(l)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                      <button title="Convert to Project" onClick={() => convertToProject(l)} style={{ background: 'none', border: '1px solid #10B98133', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}>🚀</button>
                      <button title="Delete" onClick={() => deleteLead(l.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingLead ? 'Edit Lead' : 'Add New Lead'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editingLead ? 'Update' : 'Add Lead'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Customer Name" required><input className="input" value={form.customerName} onChange={f('customerName')} placeholder="Full name" /></FormField>
          <FormField label="Phone" required><input className="input" type="tel" value={form.phone} onChange={f('phone')} placeholder="Mobile number" /></FormField>
          <FormField label="Email"><input className="input" type="email" value={form.email} onChange={f('email')} placeholder="Email address" /></FormField>
          <FormField label="Location"><input className="input" value={form.location} onChange={f('location')} placeholder="Area, City" /></FormField>
          <FormField label="Requirement"><input className="input" value={form.requirement} onChange={f('requirement')} placeholder="e.g. G+2 Residential Home" /></FormField>
          <FormField label="Budget Range"><input className="input" value={form.budgetRange} onChange={f('budgetRange')} placeholder="e.g. ₹50-80L" /></FormField>
          <FormField label="Project Type"><select className="input" value={form.projectType} onChange={f('projectType')}>{PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}</select></FormField>
          <FormField label="Lead Source"><select className="input" value={form.source} onChange={f('source')}>{SOURCES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Follow-up Date"><input className="input" type="date" value={form.followUpDate} onChange={f('followUpDate')} /></FormField>
        </div>
        <FormField label="Notes"><textarea className="input" rows={3} value={form.notes} onChange={f('notes')} placeholder="Any additional notes..." style={{ resize: 'vertical' }} /></FormField>
      </Modal>

      <style dangerouslySetInnerHTML={{__html:`@media(max-width:700px){table{font-size:12px}}`}} />
    </div>
  );
}
