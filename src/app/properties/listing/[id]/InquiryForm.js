'use client';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAttributionPayload } from '@/lib/analytics/attribution';

function InquiryFormInner({ listing }) {
  const searchParams = useSearchParams();
  const refPartnerId = searchParams.get('ref');

  const [form, setForm] = useState({ name: '', phone: '', email: '', inquiry_type: 'tenant', preferred_visit_time: '', message: '' });
  const [status, setStatus] = useState('idle');

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const isRent = listing.metadata?.listing_type === 'rent' || listing.metadata?.listing_type === 'lease';

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const metadata = {
      source_listing_lead_id: listing.id,
      listing_type: listing.metadata?.listing_type,
      property_location: listing.locality || listing.city,
      expected_price_or_rent: listing.metadata?.expected_price,
      inquiry_type: form.inquiry_type,
      preferred_visit_time: form.preferred_visit_time,
      inquiry_status: 'new'
    };

    if (refPartnerId) {
      metadata.public_referral_code = refPartnerId;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: listing.city,
          locality: listing.locality,
          message: form.message,
          lead_type: 'property_inquiry',
          source_page: `/properties/listing/${listing.id}`,
          attribution: getAttributionPayload(),
          metadata
        }),
      });
      const d = await res.json();
      if (d.success) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const label = t => <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>{t}</label>;

  if (status === 'success') {
    return (
      <div className="card text-center" style={{ padding: '32px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎉</div>
        <h3 style={{ fontSize: '20px', color: '#166534', marginBottom: '8px' }}>Inquiry Sent!</h3>
        <p style={{ color: '#15803d', fontSize: '14px', lineHeight: 1.5 }}>
          Our team will contact you shortly to coordinate your visit or next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '32px', background: 'white' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Interested? Inquire Now</h3>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px', lineHeight: 1.5 }}>
        Zero brokerage. Fill out the form below to schedule an in-person visit or proceed with paperwork.
      </p>
      
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>{label('Your Name *')}<input required className="input bg-slate-50" value={form.name} onChange={set('name')} /></div>
        <div>{label('Phone Number *')}<input required className="input bg-slate-50" value={form.phone} onChange={set('phone')} /></div>
        <div>{label('Email Address')}<input type="email" className="input bg-slate-50" value={form.email} onChange={set('email')} /></div>
        
        <div>
          {label('I am a... *')}
          <select className="input bg-slate-50" value={form.inquiry_type} onChange={set('inquiry_type')}>
            {isRent ? (
              <>
                <option value="tenant">Tenant</option>
                <option value="company">Company (Corporate Lease)</option>
              </>
            ) : (
              <>
                <option value="buyer">Buyer</option>
                <option value="investor">Investor</option>
              </>
            )}
            <option value="agent">Real Estate Agent</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>{label('Preferred Visit Time')}<input className="input bg-slate-50" placeholder="e.g. Tomorrow 10 AM" value={form.preferred_visit_time} onChange={set('preferred_visit_time')} /></div>
        <div>{label('Message / Questions')}<textarea className="input bg-slate-50" rows={2} value={form.message} onChange={set('message')} /></div>

        {status === 'error' && <div style={{ color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>Error submitting inquiry. Please try again.</div>}
        
        <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
          {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}

export default function InquiryForm({ listing }) {
  return (
    <Suspense fallback={<div className="card text-center py-8">Loading form...</div>}>
      <InquiryFormInner listing={listing} />
    </Suspense>
  );
}
