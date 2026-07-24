'use client';
import { useEffect, useState } from 'react';

export default function ClientNotificationsPage() {
  const [prefs, setPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/api/client/notifications')
      .then(r => r.json())
      .then(d => {
        if (d.success) setPrefs(d.preferences);
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
      const res = await fetch('/api/client/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Notification preferences saved successfully!');
        setPrefs(data.preferences);
      } else {
        showToast(data.error || 'Failed to save preferences', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  if (!prefs) return <div className="text-center p-10 text-red-500">Failed to load preferences.</div>;

  return (
    <div className="pb-20" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header mb-8">
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>Notification Settings</h1>
        <p className="text-muted mt-2">Manage how and when Buildogram communicates with you.</p>
      </div>

      <div className="card p-8 mb-8" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '24px' }}>ℹ️</div>
          <div>
            <div style={{ fontWeight: 700, color: '#334155', marginBottom: '4px' }}>How this works</div>
            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              These preferences help Buildogram understand how you want to receive updates. 
              <strong> Automatic notifications are not enabled yet.</strong> Our team will manually 
              respect these preferences when reaching out to you.
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSave}>
          <h3 className="font-bold text-lg mb-6 pb-2" style={{ borderBottom: '1px solid #e2e8f0' }}>Communication Channel</h3>
          <div className="grid-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Channel</label>
              <select className="input" value={prefs.preferred_channel} onChange={e => setPrefs(p => ({ ...p, preferred_channel: e.target.value }))}>
                <option value="whatsapp">WhatsApp (Recommended)</option>
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-6 pb-2" style={{ borderBottom: '1px solid #e2e8f0' }}>Quiet Hours</h3>
          <p className="text-sm text-slate-500 mb-4">During these hours, non-urgent updates will be delayed.</p>
          <div className="grid-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
              <input type="time" className="input" value={prefs.quiet_hours_start} onChange={e => setPrefs(p => ({ ...p, quiet_hours_start: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">End Time</label>
              <input type="time" className="input" value={prefs.quiet_hours_end} onChange={e => setPrefs(p => ({ ...p, quiet_hours_end: e.target.value }))} />
            </div>
          </div>

          <h3 className="font-bold text-lg mb-6 pb-2" style={{ borderBottom: '1px solid #e2e8f0' }}>Category Preferences</h3>
          <div className="flex flex-col gap-4 mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={prefs.receive_request_updates} onChange={e => setPrefs(p => ({ ...p, receive_request_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">Request & Quote Updates</div>
                <div className="text-xs text-slate-500">Updates regarding your ongoing inquiries and material quotes.</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={prefs.receive_passport_updates} onChange={e => setPrefs(p => ({ ...p, receive_passport_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">Property Passport Updates</div>
                <div className="text-xs text-slate-500">Alerts when new documents or milestones are added to your passport.</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={prefs.receive_boq_report_updates} onChange={e => setPrefs(p => ({ ...p, receive_boq_report_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">BOQ Audit Reports</div>
                <div className="text-xs text-slate-500">Notifications when your plan reviews or cost audits are ready.</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={prefs.receive_maintenance_updates} onChange={e => setPrefs(p => ({ ...p, receive_maintenance_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">Maintenance & Support</div>
                <div className="text-xs text-slate-500">Updates on your active maintenance and service tickets.</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={prefs.receive_property_listing_updates} onChange={e => setPrefs(p => ({ ...p, receive_property_listing_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">Property Listing Alerts</div>
                <div className="text-xs text-slate-500">Updates regarding properties you have listed with us.</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-4 pt-4" style={{ borderTop: '1px dashed #e2e8f0' }}>
              <input type="checkbox" checked={prefs.receive_marketing_updates} onChange={e => setPrefs(p => ({ ...p, receive_marketing_updates: e.target.checked }))} style={{ width: '20px', height: '20px' }} />
              <div>
                <div className="font-bold text-sm text-slate-800">Marketing & Offers</div>
                <div className="text-xs text-slate-500">Receive promotional offers, newsletters, and partner discounts.</div>
              </div>
            </label>
          </div>

          <div className="flex justify-end pt-6" style={{ borderTop: '1px solid #e2e8f0' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Preferences'}
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
