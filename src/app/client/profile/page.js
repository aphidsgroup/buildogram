'use client';
import { useEffect, useState } from 'react';

export default function ClientProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    alternate_phone: '',
    preferred_channel: 'whatsapp'
  });

  useEffect(() => {
    fetch('/api/client/profile')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.profile) {
          setProfile(d.profile);
          const meta = d.profile.metadata || {};
          setFormData({
            name: d.profile.name || '',
            phone: d.profile.phone || '',
            email: d.profile.email || '',
            city: meta.city || '',
            alternate_phone: meta.alternate_phone || '',
            preferred_channel: meta.preferred_channel || 'whatsapp'
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/client/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Profile updated successfully!');
      } else {
        showToast(data.error || 'Failed to update profile', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div className="pb-20" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header mb-8">
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>My Profile</h1>
        <p className="text-muted mt-2">Manage your personal information and communication preferences.</p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSave}>
          <div className="grid-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input type="text" className="input" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" className="input bg-slate-50 text-slate-500" value={formData.email} disabled title="Email cannot be changed directly" />
            </div>
          </div>

          <div className="grid-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Primary Phone</label>
              <input type="text" className="input" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Alternate Phone (Optional)</label>
              <input type="text" className="input" value={formData.alternate_phone} onChange={e => setFormData(p => ({ ...p, alternate_phone: e.target.value }))} />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">City / Location</label>
            <input type="text" className="input" value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))} />
          </div>

          <div className="flex justify-end pt-6" style={{ borderTop: '1px solid #e2e8f0' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile Updates'}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 20px',
          borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ fontWeight: 700, fontSize: '14px' }}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
