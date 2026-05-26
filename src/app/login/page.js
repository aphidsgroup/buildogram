'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      const role = data.user.role;
      if (['ops_admin', 'ops_pm', 'ops_engineer'].includes(role)) router.push('/ops/dashboard');
      else if (['partner', 'partner_contractor', 'partner_supplier'].includes(role)) router.push('/partner/dashboard');
      else router.push('/client/dashboard');
    } catch (e) { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.card}>
        <Link href="/" className={styles.logo}><span style={{ color: 'var(--primary)' }}>⬡</span> Buildogram</Link>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'login' ? styles.active : ''}`} onClick={() => setTab('login')}>Sign In</button>
          <button className={`${styles.tab} ${tab === 'register' ? styles.active : ''}`} onClick={() => setTab('register')}>Register</button>
        </div>
        <form onSubmit={submit} className={styles.form}>
          {tab === 'register' && (
            <div className="input-group">
              <label>Full Name</label>
              <input className="input" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>Email Address</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
          </div>
          {tab === 'register' && (
            <div className="input-group">
              <label>Phone Number</label>
              <input className="input" type="tel" placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>Password</label>
            <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} required />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>
        <p className="text-muted text-sm text-center mt-4">
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} style={{ color: 'var(--primary)', background: 'none', textDecoration: 'underline', fontSize: '13px' }}>
            {tab === 'login' ? 'Register' : 'Sign in'}
          </button>
        </p>
        <div className={styles.demoBox}>
          <p className="text-xs text-muted font-semibold mb-2">Demo Credentials (password: password123)</p>
          <p className="text-xs text-muted">Admin: admin@buildogram.in</p>
          <p className="text-xs text-muted">Partner: partner@buildogram.in</p>
          <p className="text-xs text-muted">Client: client@buildogram.in</p>
        </div>
      </div>
    </div>
  );
}
