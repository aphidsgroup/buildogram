'use client';
import { useState, useEffect } from 'react';
import { SectionHeader, Modal, FormField, SearchBar, EmptyState, StatusBadge } from '../_shared/components';
import { DEMO_DOCUMENTS, DEMO_PROJECTS, DOC_TYPES, DOC_STATUSES } from '../_shared/demoData';
import FileUpload from '@/components/FileUpload';

const DOC_TYPE_ICONS = {
  'Agreement': '📝', 'Quotation': '📋', 'BOQ': '💰', '2D Plan': '📐',
  '3D Render': '🖼️', 'Structural Drawing': '🏗️', 'Electrical Drawing': '⚡',
  'Plumbing Drawing': '🔧', 'Invoice': '🧾', 'Receipt': '✅',
  'Warranty': '🛡️', 'Completion Certificate': '🏆',
};

const BLANK = { name: '', project: '', type: 'Agreement', fileUrl: '', status: 'Draft', version: '1.0' };

export default function DocumentLocker() {
  const [docs, setDocs] = useState([]);
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partner/documents');
      const data = await res.json();
      if (data.success) {
        const mapped = (data.documents || []).map(d => ({
          id: d.id,
          name: d.documentName,
          project: d.projectId,
          type: d.documentType,
          fileUrl: d.fileUrl,
          status: d.status,
          version: d.version,
          uploadedAt: d.createdAt
        }));
        setDocs(mapped);
        localStorage.setItem('bos_documents', JSON.stringify(mapped));
      } else throw new Error(data.message);
    } catch (e) {
      console.error('API fetch failed, fallback', e);
      const stored = typeof window !== 'undefined' && localStorage.getItem('bos_documents');
      if (stored) setDocs(JSON.parse(stored));
      else setDocs(DEMO_DOCUMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    const storedP = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
    if (storedP) setProjects(JSON.parse(storedP));
  }, []);

  const save = (arr) => { setDocs(arr); localStorage.setItem('bos_documents', JSON.stringify(arr)); };

  const openAdd = () => { setForm(BLANK); setEditId(null); setModalOpen(true); };
  const openEdit = (doc) => { setForm({ ...doc }); setEditId(doc.id); setModalOpen(true); };
  const deleteDoc = (id) => { if (confirm('Delete this document?')) save(docs.filter(d => d.id !== id)); };

  const handleSubmit = async () => {
    if (!form.name) return alert('Document name is required');
    
    let optArr = [];
    if (editId) optArr = docs.map(d => d.id === editId ? { ...form, id: editId } : d);
    else optArr = [{ ...form, id: 'temp_' + Date.now().toString(), uploadedAt: new Date().toISOString().slice(0, 10) }, ...docs];
    save(optArr);
    setModalOpen(false);

    try {
      const url = editId && String(editId).length > 10 ? `/api/partner/documents/${editId}` : '/api/partner/documents';
      const method = editId && String(editId).length > 10 ? 'PUT' : 'POST';
      const payload = {
        documentName: form.name,
        projectId: form.project,
        documentType: form.type,
        fileUrl: form.fileUrl,
        status: form.status,
        version: form.version
      };
      const res = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if ((await res.json()).success) fetchDocs();
    } catch(e) {
      console.error('API save fail', e);
    }
  };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const getProjectName = (id) => { const p = projects.find(p => p.id === id); return p ? p.name : id || '—'; };

  const filtered = docs.filter(d => {
    const ms = !search || d.name.toLowerCase().includes(search.toLowerCase());
    const ft = filterType === 'All' || d.type === filterType;
    const fs = filterStatus === 'All' || d.status === filterStatus;
    return ms && ft && fs;
  });

  return (
    <div>
      <SectionHeader icon="📁" title="Drawing & Document Locker" desc="Store and manage all project documents, drawings, and certificates"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add Document</button>}
      />

      {/* SUMMARY */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { label: 'Total Documents', value: docs.length, color: '#FC6E20' },
          { label: 'Approved', value: docs.filter(d => d.status === 'Approved').length, color: '#10B981' },
          { label: 'Pending Review', value: docs.filter(d => d.status === 'Draft' || d.status === 'Sent to Client').length, color: '#F59E0B' },
          { label: 'Rejected', value: docs.filter(d => d.status === 'Rejected').length, color: '#EF4444' },
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

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents..." />
        <select className="input" style={{ maxWidth: '180px' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="input" style={{ maxWidth: '180px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {DOC_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filtered.length} document{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* DOCUMENT CARDS GRID */}
      {filtered.length === 0 ? (
        <EmptyState icon="📁" title="No documents found" desc="Upload or link your first project document." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Document</button>} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filtered.map(doc => (
            <div key={doc.id} className="card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{DOC_TYPE_ICONS[doc.type] || '📄'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.3, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={doc.name}>{doc.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{doc.type}</div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                🏗️ {getProjectName(doc.project)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StatusBadge status={doc.status} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>v{doc.version}</span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                📅 {doc.uploadedAt || new Date().toISOString().slice(0, 10)}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => { if (!doc.fileUrl || doc.fileUrl === '#') alert('No file linked yet. Edit this document to add a file URL.'); else window.open(doc.fileUrl, '_blank'); }}
                  className="btn btn-outline" style={{ flex: 1, fontSize: '12px', padding: '7px' }}>
                  👁️ View
                </button>
                <button onClick={() => openEdit(doc)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer', fontSize: '13px' }}>✏️</button>
                <button onClick={() => deleteDoc(doc.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer', fontSize: '13px' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Document' : 'Add Document'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update' : 'Save'}</button></>}>
        <FormField label="Document Name" required><input className="input" value={form.name} onChange={f('name')} placeholder="e.g. Construction Agreement – Rajesh Kumar" /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Project">
            <select className="input" value={form.project} onChange={f('project')}>
              <option value="">Select project...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </FormField>
          <FormField label="Document Type">
            <select className="input" value={form.type} onChange={f('type')}>{DOC_TYPES.map(t => <option key={t}>{t}</option>)}</select>
          </FormField>
          <FormField label="Status">
            <select className="input" value={form.status} onChange={f('status')}>{DOC_STATUSES.map(s => <option key={s}>{s}</option>)}</select>
          </FormField>
          <FormField label="Version"><input className="input" value={form.version} onChange={f('version')} placeholder="e.g. 1.0" /></FormField>
        </div>
        <FormField label="File">
          <FileUpload 
            label="Upload Document" 
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onUploadComplete={(url) => setForm(p => ({ ...p, fileUrl: url }))} 
          />
          {form.fileUrl && (
            <div className="mt-2 text-sm text-green-500 break-all">
              File uploaded: <a href={form.fileUrl} target="_blank" rel="noreferrer" className="underline">{form.fileUrl}</a>
            </div>
          )}
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '8px' }}>
            Or provide a manual link:
          </div>
          <input className="input" value={form.fileUrl} onChange={f('fileUrl')} placeholder="https://drive.google.com/..." />
        </FormField>
      </Modal>
    </div>
  );
}
