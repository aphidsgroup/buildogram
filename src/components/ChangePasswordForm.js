'use client';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return setStatus('error:New passwords do not match');
    }
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: form.oldPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');
      setStatus('success:Password updated successfully!');
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus('error:' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', background: 'white' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Change Password</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="input-group">
          <label>Current Password</label>
          <input type="password" required className="input" value={form.oldPassword} onChange={e => setForm({...form, oldPassword: e.target.value})} />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input type="password" required className="input" minLength="6" value={form.newPassword} onChange={e => setForm({...form, newPassword: e.target.value})} />
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input type="password" required className="input" minLength="6" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center' }}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
        {status && (
          <div style={{ padding: '12px', borderRadius: '8px', fontSize: '14px', background: status.startsWith('success') ? '#ecfdf5' : '#fef2f2', color: status.startsWith('success') ? '#065f46' : '#991b1b' }}>
            {status.split(':')[1]}
          </div>
        )}
      </form>
    </div>
  );
}
