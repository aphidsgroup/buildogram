'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ListYourPropertyPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refPartnerId = searchParams.get('ref');
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    city: 'Chennai', locality: '',
    listing_type: 'rent', property_type: 'apartment',
    price: '', size: '', furnishing: 'semi-furnished', availability: 'immediate',
    tour_required: 'no', tour_url_or_iframe: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    // Extract iframe src if user pasted full iframe code
    let embedUrl = form.tour_url_or_iframe.trim();
    if (embedUrl.includes('<iframe') && embedUrl.includes('src=')) {
      const match = embedUrl.match(/src=["'](.*?)["']/);
      if (match && match[1]) embedUrl = match[1];
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          locality: form.locality,
          lead_type: 'property_listing',
          source_page: '/properties/list-your-property',
          message: form.message,
          metadata: {
            listing_type: form.listing_type,
            property_type: form.property_type,
            expected_price: form.price,
            property_size_sqft: form.size,
            furnishing_status: form.furnishing,
            availability: form.availability,
            tour_provider: embedUrl ? 'teleportme' : null,
            tour_required: form.tour_required === 'yes',
            tour_status: embedUrl ? 'available' : (form.tour_required === 'yes' ? 'pending' : 'not_required'),
            tour_embed_url: embedUrl || null,
            public_status: 'draft',
            public_referral_code: refPartnerId || null
          }
        }),
      });
      const d = await res.json();
      if (d.success) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
    setSubmitting(false);
  };

  const lbl = t => <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{t}</label>;

  if (status === 'success') {
    return (
      <>
        <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
          <div className="container" style={{ position: 'relative' }}>
            <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15 }}>List Your Property</h1>
          </div>
        </section>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '560px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '12px' }}>Listing Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
            Thank you. Our team will review your property details and contact you shortly to activate your verified listing.
          </p>
          <Link href="/" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Return Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>List Your Property</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            List Your Property on Buildogram — Zero Brokerage, Verified Buyers
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7 }}>
            Reach verified tenants and buyers. Add a 360° virtual tour to get 3x more enquiries.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px', maxWidth: '760px' }}>

        <form onSubmit={submit} className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Owner Details */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>1. Contact Details</h3>
            <div className="grid-2" style={{ gap: '16px' }}>
              <div>{lbl('Owner Name *')}<input required className="input" placeholder="Your full name" value={form.name} onChange={set('name')} /></div>
              <div>{lbl('Phone Number *')}<input required className="input" placeholder="10-digit number" value={form.phone} onChange={set('phone')} /></div>
            </div>
            <div style={{ marginTop: '16px' }}>{lbl('Email Address')}<input type="email" className="input" placeholder="owner@email.com" value={form.email} onChange={set('email')} /></div>
          </div>

          {/* Property Details */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>2. Property Information</h3>
            <div className="grid-2" style={{ gap: '16px' }}>
              <div>{lbl('City')}
                <select className="input" value={form.city} onChange={set('city')}>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>{lbl('Locality *')}<input required className="input" placeholder="e.g. Anna Nagar, Porur" value={form.locality} onChange={set('locality')} /></div>
            </div>

            <div className="grid-2" style={{ gap: '16px', marginTop: '16px' }}>
              <div>{lbl('Listing Type')}
                <select className="input" value={form.listing_type} onChange={set('listing_type')}>
                  <option value="rent">Rent</option>
                  <option value="resale">Resale</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
              <div>{lbl('Property Type')}
                <select className="input" value={form.property_type} onChange={set('property_type')}>
                  <option value="apartment">Apartment</option>
                  <option value="independent_house">Independent House</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '16px', marginTop: '16px' }}>
              <div>{lbl('Expected Rent/Price *')}<input required type="number" className="input" placeholder="₹ amount" value={form.price} onChange={set('price')} /></div>
              <div>{lbl('Property Size (sqft) *')}<input required type="number" className="input" placeholder="e.g. 1200" value={form.size} onChange={set('size')} /></div>
            </div>

            <div className="grid-2" style={{ gap: '16px', marginTop: '16px' }}>
              <div>{lbl('Furnishing')}
                <select className="input" value={form.furnishing} onChange={set('furnishing')}>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="fully-furnished">Fully Furnished</option>
                </select>
              </div>
              <div>{lbl('Availability')}
                <select className="input" value={form.availability} onChange={set('availability')}>
                  <option value="immediate">Immediate</option>
                  <option value="within_15_days">Within 15 days</option>
                  <option value="within_30_days">Within 30 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* 360 Tour */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>3. 360° Virtual Tour</h3>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>📸</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>TeleportMe Integration</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>If you already have a TeleportMe tour, paste the link or iframe below.</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>{lbl('TeleportMe URL or Iframe Code (Optional)')}
              <input className="input" placeholder="https://teleportme.com/tour/... or <iframe src=...>" value={form.tour_url_or_iframe} onChange={set('tour_url_or_iframe')} />
            </div>

            {!form.tour_url_or_iframe && (
              <div>{lbl('Do you need us to shoot a 360° tour?')}
                <select className="input" value={form.tour_required} onChange={set('tour_required')}>
                  <option value="no">No, I will provide photos later</option>
                  <option value="yes">Yes, please arrange a 360° shoot</option>
                </select>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>4. Additional Details</h3>
            <div>{lbl('Any specific requirements or message?')}
              <textarea className="input" rows={3} placeholder="Tell us more about the property..." value={form.message} onChange={set('message')} />
            </div>
          </div>

          {status === 'error' && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Something went wrong. Please try again or contact support.
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ justifyContent: 'center', marginTop: '8px' }}>
            {submitting ? 'Submitting Listing...' : 'Submit Property Listing'}
          </button>
          <div style={{ marginTop: '16px', padding: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b', fontSize: '12px', lineHeight: 1.5 }}>
            <strong>Disclaimer:</strong> Buildogram only connects buyers and sellers. We do not participate in negotiations or offer real estate brokerage guarantees.
          </div>
        </form>
      </div>
    </>
  );
}

export default function ListYourPropertyPage() {
  return (
    <Suspense fallback={<div className="flex-center min-h-screen">Loading...</div>}>
      <ListYourPropertyPageInner />
    </Suspense>
  );
}
