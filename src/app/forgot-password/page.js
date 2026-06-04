'use client';
import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from './page.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setMessage(data.message || 'If an account exists, a reset link was sent.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      
      <AnimatedSection className={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" className={styles.logo}>
            <span style={{ color: 'var(--primary)' }}>⬡</span> Buildogram
          </Link>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your email to receive a password reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/login" style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
              ← Back to Login
            </Link>
          </div>
        </form>
      </AnimatedSection>
    </div>
  );
}
