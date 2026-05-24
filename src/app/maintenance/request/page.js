'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ISSUE_CATEGORIES = [
  { id: 'plumbing', label: 'Plumbing & Leakage' },
  { id: 'electrical', label: 'Electrical & Wiring' },
  { id: 'waterproofing', label: 'Waterproofing' },
  { id: 'painting', label: 'Painting & Touch-ups' },
  { id: 'civil_repair', label: 'Civil & Structural Repair' },
  { id: 'carpentry', label: 'Carpentry & Woodwork' },
  { id: 'cleaning', label: 'Deep Cleaning' },
  { id: 'other', label: 'Other Issue' }
];

const URGENCIES = [
  { id: 'emergency', label: '🚨 Emergency (Immediate)' },
  { id: 'high', label: 'High (Within 24 Hours)' },
  { id: 'medium', label: 'Medium (Within 3 Days)' },
  { id: 'low', label: 'Low (Within a Week)' }
];

function MaintenanceRequestFormInner() {
  const searchParams = useSearchParams();
  const refPartnerId = searchParams.get('ref');

  const [form, setForm] = useState({ 
    name: '', phone: '', email: '', 
    property_location: '', issue_category: 'plumbing', urgency: 'medium',
    preferred_visit_time: '', message: '' 
  });
  const [status, setStatus] = useState('idle');

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    
    const metadata = {
      property_location: form.property_location,
      issue_category: form.issue_category,
      urgency: form.urgency,
      preferred_visit_time: form.preferred_visit_time,
      maintenance_status: 'requested',
      passport_link_status: 'not_linked'
    };

    if (refPartnerId) {
      metadata.public_referral_code = refPartnerId;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          city: 'Chennai', locality: form.property_location,
          message: form.message,
          lead_type: 'maintenance',
          source_page: '/maintenance/request',
          source: 'website',
          metadata: metadata,
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="card text-center max-w-md w-full p-10" style={{ background: 'white', borderRadius: '24px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔧</div>
        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Request Received</h3>
        <p style={{ color: '#475569', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
          Our maintenance operations team will review your request and contact you shortly to confirm the vendor assignment.
        </p>
        <Link href="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Return Home
        </Link>
      </div>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const label = t => <label style={{ color: '#475569', fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</label>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ── Header ── */}
      <div style={{ background: 'var(--secondary)', color: 'white', padding: '60px 20px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
          <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Maintenance</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
          Request Maintenance
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          Get professional, verified vendors to fix issues at your property. Records will be saved to your Property Passport.
        </p>
      </div>

      {/* ── Form ── */}
      <div className="container mx-auto max-w-2xl px-4" style={{ marginTop: '-40px' }}>
        <div className="card" style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="grid-2" style={{ gap: '16px' }}>
              <div>{label('Contact Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }} /></div>
              <div>{label('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }} /></div>
            </div>
            
            <div>{label('Property Location / Full Address *')}
              <textarea required className="input" rows={2} placeholder="Building name, street, area, city..." value={form.property_location} onChange={set('property_location')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }} />
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />

            <div className="grid-2" style={{ gap: '16px' }}>
              <div>
                {label('Issue Category *')}
                <select required className="input" value={form.issue_category} onChange={set('issue_category')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  {ISSUE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                {label('Urgency *')}
                <select required className="input" value={form.urgency} onChange={set('urgency')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  {URGENCIES.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>

            <div>{label('Issue Description *')}
              <textarea required className="input" rows={4} placeholder="Please describe the issue in detail..." value={form.message} onChange={set('message')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }} />
            </div>

            <div>{label('Preferred Visit Date & Time')}
              <input type="text" className="input" placeholder="e.g. Tomorrow morning, Weekend..." value={form.preferred_visit_time} onChange={set('preferred_visit_time')} style={{ background: '#f8fafc', borderColor: '#e2e8f0' }} />
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-4" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px' }}>
              {status === 'loading' ? 'Submitting…' : '🔧 Submit Request'}
            </button>
            
            {status === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MaintenanceRequestForm() {
  return (
    <Suspense fallback={<div className="flex-center min-h-screen">Loading...</div>}>
      <MaintenanceRequestFormInner />
    </Suspense>
  );
}
