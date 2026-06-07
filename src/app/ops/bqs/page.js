'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BqsDashboard() {
  const [inspections, setInspections] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    project_area: '',
    project_type: 'residential',
    stage: 'foundation',
    template_id: '',
    assigned_engineer: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [insRes, tplRes] = await Promise.all([
        fetch('/api/ops/bqs/inspections'),
        fetch('/api/ops/bqs/templates')
      ]);
      const insData = await insRes.json();
      const tplData = await tplRes.json();
      
      if (insData.success) setInspections(insData.inspections || []);
      if (tplData.success) setTemplates(tplData.templates || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/ops/bqs/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setFormData({ ...formData, project_name: '', project_area: '' });
        fetchData();
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert('Failed to create inspection');
    }
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Buildogram Quality System (BQS)</h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>Manage stage-wise quality checklists and inspections.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ background: '#2563EB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
          + New Inspection
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Total Inspections</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>{inspections.length}</div>
        </div>
        <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Active Templates</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>{templates.length}</div>
        </div>
        <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Reworks Required</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#DC2626', marginTop: '8px' }}>
            {inspections.filter(i => i.status === 'rework_required').length}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading...</div>
      ) : (
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px' }}>Project</th>
                <th style={{ padding: '16px' }}>Stage</th>
                <th style={{ padding: '16px' }}>Checklist Status</th>
                <th style={{ padding: '16px' }}>Date</th>
                <th style={{ padding: '16px' }}>Status</th>
                <th style={{ padding: '16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>No inspections found.</td></tr>
              ) : inspections.map(ins => (
                <tr key={ins.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{ins.project_name || 'Untitled Project'}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{ins.project_area} • {ins.project_type}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', textTransform: 'capitalize' }}>
                      {ins.stage}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{ins._count?.results || 0} Checkpoints</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>
                    {new Date(ins.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase',
                      background: ins.status === 'completed' || ins.status === 'closed' ? '#D1FAE5' : ins.status === 'rework_required' ? '#FEE2E2' : '#FEF3C7',
                      color: ins.status === 'completed' || ins.status === 'closed' ? '#065F46' : ins.status === 'rework_required' ? '#991B1B' : '#92400E'
                    }}>
                      {ins.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Link href={`/ops/bqs/inspections/${ins.id}`}>
                      <button style={{ background: '#F1F5F9', color: '#2563EB', border: '1px solid #BFDBFE', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Execute Checklist
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', color: '#0F172A' }}>Schedule BQS Inspection</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Project Name</label>
                <input required value={formData.project_name} onChange={e => setFormData({...formData, project_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. Skyline Villa" />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Project Type</label>
                  <select value={formData.project_type} onChange={e => setFormData({...formData, project_type: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="piling">Piling</option>
                    <option value="structural_audit">Structural Audit</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Construction Stage</label>
                  <select value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                    <option value="planning">Planning / Pre-construction</option>
                    <option value="foundation">Foundation / Piling</option>
                    <option value="structure">RCC Structure</option>
                    <option value="masonry">Masonry</option>
                    <option value="mep">MEP (Plumbing/Electrical)</option>
                    <option value="waterproofing">Waterproofing</option>
                    <option value="finishing">Finishing / Painting</option>
                    <option value="handover">Handover</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>BQS Checklist Template (Auto-populates items)</label>
                <select required value={formData.template_id} onChange={e => setFormData({...formData, template_id: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  <option value="">-- Select Template --</option>
                  {templates.map(tpl => (
                    <option key={tpl.id} value={tpl.id}>{tpl.template_name} ({tpl._count?.items} checks)</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#2563EB', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Schedule Inspection</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
