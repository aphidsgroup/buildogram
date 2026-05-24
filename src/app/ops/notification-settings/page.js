'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/Navbar';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    automation_mode: 'manual_approval',
    whatsapp_enabled: false,
    email_enabled: false,
    max_messages_per_hour: 100,
    max_messages_per_user_per_day: 5,
    respect_quiet_hours: true,
    respect_user_preferences: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/ops/notification-settings').then(r => r.json()).then(d => {
      if (d.settings) setSettings(d.settings);
      setLoading(false);
    });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/ops/notification-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    setSaving(false);
    alert('Settings saved successfully!');
  };

  if (loading) return <div className="p-12 text-center"><div className="spinner" /></div>;

  return (
    <div className="bg-gray">
      <Navbar role="ops_admin" />
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Notification Automation Settings</h1>
        <p className="text-muted mb-6">Control global rate limits, quiet hours, and automation triggers.</p>

        <form onSubmit={save} className="card shadow-sm">
          <div className="mb-6">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Global Automation Mode</label>
            <select 
              className="input w-full" 
              value={settings.automation_mode} 
              onChange={e => setSettings({...settings, automation_mode: e.target.value})}
            >
              <option value="disabled">Disabled (No notifications sent or queued)</option>
              <option value="queue_only">Queue Only (Drafts created, no sending)</option>
              <option value="manual_approval">Manual Approval (Default - Ops must approve queue)</option>
              <option value="auto_send_low_risk">Auto-Send Low Risk (Sends invoices/receipts automatically)</option>
            </select>
            {settings.automation_mode === 'auto_send_low_risk' && (
              <div className="mt-2 p-3" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', fontSize: '13px' }}>
                ⚠️ <strong>Warning:</strong> The system will autonomously send WhatsApp messages to clients for payment receipts and invoices. Ensure your templates are approved.
              </div>
            )}
          </div>

          <div className="mb-6 grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>WhatsApp Integration</label>
              <label className="flex gap-2" style={{ alignItems: 'center' }}>
                <input type="checkbox" checked={settings.whatsapp_enabled} onChange={e => setSettings({...settings, whatsapp_enabled: e.target.checked})} />
                Enable WhatsApp Cloud API
              </label>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email Integration</label>
              <label className="flex gap-2" style={{ alignItems: 'center' }}>
                <input type="checkbox" checked={settings.email_enabled} onChange={e => setSettings({...settings, email_enabled: e.target.checked})} />
                Enable Email Sending
              </label>
            </div>
          </div>

          <div className="mb-6 grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Global Max Messages / Hour</label>
              <input type="number" className="input w-full" value={settings.max_messages_per_hour} onChange={e => setSettings({...settings, max_messages_per_hour: parseInt(e.target.value)})} />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Max Messages / User / Day</label>
              <input type="number" className="input w-full" value={settings.max_messages_per_user_per_day} onChange={e => setSettings({...settings, max_messages_per_user_per_day: parseInt(e.target.value)})} />
            </div>
          </div>

          <div className="mb-8 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Client Protection Rules</h3>
            <label className="flex gap-2 mb-3" style={{ alignItems: 'center' }}>
              <input type="checkbox" checked={settings.respect_quiet_hours} onChange={e => setSettings({...settings, respect_quiet_hours: e.target.checked})} />
              <span><strong>Respect Quiet Hours</strong> (Downgrade to manual approval between 9 PM and 8 AM)</span>
            </label>
            <label className="flex gap-2" style={{ alignItems: 'center' }}>
              <input type="checkbox" checked={settings.respect_user_preferences} onChange={e => setSettings({...settings, respect_user_preferences: e.target.checked})} />
              <span><strong>Respect User Preferences</strong> (Do not send if client opted out of the category)</span>
            </label>
          </div>

          <button type="submit" disabled={saving} className="btn btn-primary w-full">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
