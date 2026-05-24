'use client';
import { useEffect, useState } from 'react';
import { roleCan } from '@/lib/permissions';

export default function WhatsAppTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
      loadTemplates();
    });
  }, []);

  const loadTemplates = () => {
    setLoading(true);
    fetch('/api/ops/whatsapp/templates?all=true')
      .then(r => r.json())
      .then(d => {
        if (d.success) setTemplates(d.templates);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleEdit = (t) => {
    setEditing(t);
    setFormData({
      template_name: t.template_name,
      category: t.category,
      channel_type: t.channel_type,
      message_body: t.message_body,
      is_active: t.is_active,
      requires_meta_approval: t.requires_meta_approval,
      meta_template_name: t.meta_template_name || ''
    });
    setModalOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/ops/whatsapp/templates/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setModalOpen(false);
        loadTemplates();
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  if (!user || !roleCan(user.role, 'manage_whatsapp_templates')) {
    return <div className="text-center p-10 text-red-500">Access Denied: You do not have permission to manage WhatsApp Templates.</div>;
  }

  return (
    <div className="pb-20">
      <div className="page-header flex-between mb-8">
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>WhatsApp Templates</h1>
          <p className="text-muted mt-2">Manage message templates for WhatsApp API and manual wa.me links.</p>
        </div>
      </div>

      <div className="card p-0">
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>
              <th className="p-4 font-semibold">Name / Key</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Message Preview</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-center">Meta Approved</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9', background: t.is_active ? 'white' : '#fafafa' }}>
                <td className="p-4">
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{t.template_name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{t.template_key}</div>
                </td>
                <td className="p-4 text-sm text-slate-600">{t.category}</td>
                <td className="p-4 text-sm text-slate-600" style={{ maxWidth: '300px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.message_body}</div>
                </td>
                <td className="p-4 text-center">
                  <span className={`badge ${t.is_active ? 'badge-green' : 'badge-gray'}`}>{t.is_active ? 'Active' : 'Inactive'}</span>
                </td>
                <td className="p-4 text-center">
                  {t.requires_meta_approval ? (
                     <span className="badge badge-yellow" title={t.meta_template_name}>Requires Meta</span>
                  ) : (
                     <span className="badge badge-blue">Any</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(t)} className="btn btn-ghost btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Edit Template</h3>
            
            <form onSubmit={save}>
              <div style={{ marginBottom: '16px' }}>
                <label className="block text-xs font-bold text-slate-600 mb-1">Template Name</label>
                <input type="text" className="input" value={formData.template_name} onChange={e => setFormData(p => ({ ...p, template_name: e.target.value }))} required />
              </div>
              
              <div className="grid-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                  <input type="text" className="input" value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Channel Type</label>
                  <select className="input" value={formData.channel_type} onChange={e => setFormData(p => ({ ...p, channel_type: e.target.value }))}>
                    <option value="both">Both</option>
                    <option value="manual_wa">Manual WA Only</option>
                    <option value="cloud_api">Cloud API Only</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="block text-xs font-bold text-slate-600 mb-1">Message Body</label>
                <textarea className="input" rows={6} value={formData.message_body} onChange={e => setFormData(p => ({ ...p, message_body: e.target.value }))} required />
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Supports variables: {'{{name}}'}, {'{{lead_type}}'}, {'{{location}}'}, {'{{business_name}}'}, {'{{issue_category}}'}, {'{{material_items}}'}, {'{{status}}'}, {'{{portal_link}}'}</div>
              </div>

              <div className="grid-2 gap-4 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData(p => ({ ...p, is_active: e.target.checked }))} style={{ width: '18px', height: '18px' }} />
                    Template is Active
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer mb-2">
                    <input type="checkbox" checked={formData.requires_meta_approval} onChange={e => setFormData(p => ({ ...p, requires_meta_approval: e.target.checked }))} style={{ width: '18px', height: '18px' }} />
                    Requires Meta Approval
                  </label>
                  {formData.requires_meta_approval && (
                    <input type="text" className="input" placeholder="Meta Template Name" value={formData.meta_template_name} onChange={e => setFormData(p => ({ ...p, meta_template_name: e.target.value }))} />
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Template'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
