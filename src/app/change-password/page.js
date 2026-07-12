'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ currentPassword: '', password: '', confirmPassword: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      
      setSuccess(true);
      
      // Navigate to the appropriate dashboard
      setTimeout(() => {
        const role = data.user.role;
        if (['super_admin', 'ops_admin', 'ops_pm', 'ops_finance', 'ops_engineer', 'ops_content'].includes(role)) router.push('/ops/dashboard');
        else if (['partner_admin', 'partner_user'].includes(role)) router.push('/partner/dashboard');
        else if (['supplier_admin', 'supplier_user'].includes(role)) router.push('/supplier/dashboard');
        else router.push('/client/dashboard');
      }, 1000);
      
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-muted)' }}>
      <AnimatedSection style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Change Your Password</h1>
        <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px' }}>
          For security reasons, you must change your temporary password before accessing the platform.
        </p>
        
        {success ? (
          <div style={{ padding: '16px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#15803d', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            Password updated successfully. Redirecting...
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label>Current Password</label>
              <input
                className="input"
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                onChange={e => set('currentPassword', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input 
                className="input" 
                type="password" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={e => set('password', e.target.value)} 
                required 
                minLength={12}
                autoComplete="new-password"
              />
            </div>
            
            <div className="input-group">
              <label>Confirm New Password</label>
              <input 
                className="input" 
                type="password" 
                placeholder="••••••••" 
                value={form.confirmPassword} 
                onChange={e => set('confirmPassword', e.target.value)} 
                required 
                minLength={12}
                autoComplete="new-password"
              />
            </div>
            
            {error && <div style={{ color: 'var(--danger)', fontSize: '14px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px' }}>{error}</div>}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={loading}>
              {loading ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        )}
      </AnimatedSection>
    </div>
  );
}
