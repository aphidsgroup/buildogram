'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

const Plus = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const Trash2 = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const CheckCircle = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const Video = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg>
);
const PlayCircle = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
);

export default function ReelsAdmin() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    provider: 'direct',
    active: false,
    autoplay: true,
    start_muted: true,
    cta_label: '',
    cta_url: ''
  });

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const res = await fetch('/api/ops/reels', { credentials: 'include' });
      const json = await res.json();
      if (json.success) {
        setReels(json.data);
      } else {
        setErrorMsg(json.error);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Auto-detect provider if direct is selected by default but it's youtube/vimeo
      let finalProvider = formData.provider;
      const urlLower = formData.video_url.toLowerCase();
      if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) finalProvider = 'youtube';
      else if (urlLower.includes('vimeo.com')) finalProvider = 'vimeo';
      else if (urlLower.includes('instagram.com')) finalProvider = 'instagram';
      else if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) finalProvider = 'facebook';

      const payload = { ...formData, provider: finalProvider };

      const res = await fetch('/api/ops/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        setFormData({
          title: '', video_url: '', provider: 'direct', active: false, autoplay: true, start_muted: true, cta_label: '', cta_url: ''
        });
        await fetchReels();
      } else {
        alert(json.error);
      }
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  const toggleActive = async (id, currentActive) => {
    try {
      const res = await fetch(`/api/ops/reels/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive })
      });
      const json = await res.json();
      if (json.success) {
        await fetchReels();
      } else {
        alert(json.error);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this reel?')) return;
    try {
      const res = await fetch(`/api/ops/reels/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchReels();
      } else {
        alert(json.error);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading && reels.length === 0) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <AnimatedSection style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Video size={32} color="var(--primary)" /> Reels Manager
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage the floating vertical video reels shown on the public site.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} style={{ marginRight: '8px' }} /> Add Reel
        </button>
      </AnimatedSection>

      {errorMsg && <div className="alert alert-danger" style={{ marginBottom: '24px' }}>{errorMsg}</div>}

      <AnimatedSection delay={0.1}>
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Title & Details</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Provider</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>CTA</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reels.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No reels created yet. Click "Add Reel" to get started.
                  </td>
                </tr>
              ) : reels.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <button 
                      onClick={() => toggleActive(r.id, r.active)}
                      style={{ 
                        background: r.active ? '#dcfce7' : '#f1f5f9', 
                        color: r.active ? '#166534' : '#64748b',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '100px',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {r.active && <CheckCircle size={14} />}
                      {r.active ? 'Active' : 'Set Active'}
                    </button>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{r.title}</div>
                    <a href={r.video_url} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <PlayCircle size={14} /> View Source
                    </a>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <Badge variant="default" style={{ textTransform: 'capitalize' }}>{r.provider}</Badge>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {r.cta_label ? (
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{r.cta_label}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.cta_url}</div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>None</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(r.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                      title="Delete Reel"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* CREATE MODAL */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 700 }}>Add New Reel</h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Internal Title</label>
                <input 
                  type="text" 
                  className="input" 
                  style={{ width: '100%' }}
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  required 
                  placeholder="e.g. Summer Promo Reel"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Video URL</label>
                <input 
                  type="url" 
                  className="input" 
                  style={{ width: '100%' }}
                  value={formData.video_url} 
                  onChange={e => setFormData({...formData, video_url: e.target.value})} 
                  required 
                  placeholder="https://youtube.com/shorts/... or .mp4 link"
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Supports YouTube, Vimeo, direct .mp4/.mov links.</p>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>CTA Label (Optional)</label>
                  <input 
                    type="text" 
                    className="input" 
                    style={{ width: '100%' }}
                    value={formData.cta_label} 
                    onChange={e => setFormData({...formData, cta_label: e.target.value})} 
                    placeholder="e.g. Book Consultation"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>CTA URL (Optional)</label>
                  <input 
                    type="text" 
                    className="input" 
                    style={{ width: '100%' }}
                    value={formData.cta_url} 
                    onChange={e => setFormData({...formData, cta_url: e.target.value})} 
                    placeholder="e.g. /contact"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <input 
                  type="checkbox" 
                  id="setActive"
                  checked={formData.active} 
                  onChange={e => setFormData({...formData, active: e.target.checked})} 
                />
                <label htmlFor="setActive" style={{ fontSize: '14px', fontWeight: 600 }}>Set as currently active reel</label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Reel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
