'use client';
import { useState, useEffect } from 'react';
import { getAttributionPayload } from '@/lib/analytics/attribution';

const MATERIAL_CATEGORIES = ['Cement', 'Steel / TMT', 'Sand', 'M-Sand', 'Solid Blocks', 'Red Bricks', 'Electricals', 'Plumbing', 'Tiles', 'Paint', 'Doors & Windows', 'RMC', 'Other'];
const CUSTOMER_TYPES = ['Home Owner', 'Contractor', 'Builder', 'Architect', 'Supplier', 'Other'];

export default function MaterialLeadForm() {
  const [refPartnerId, setRefPartnerId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) setRefPartnerId(ref);
    }
  }, []);

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    customer_type: 'Home Owner',
    delivery_location: '',
    required_date: '',
    gst_required: 'No',
    message: '',
    // Material Item
    category: 'Cement',
    brand_preference: '',
    grade_specification: '',
    quantity: '',
    unit: 'Bags'
  });
  
  const [status, setStatus] = useState('idle');

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    
    // Structure metadata properly as requested
    const metadata = {
      customer_type: form.customer_type,
      delivery_location: form.delivery_location,
      required_date: form.required_date,
      gst_required: form.gst_required,
      quote_status: 'requested',
      commission_status: 'pending',
      materials: [{
        category: form.category,
        brand_preference: form.brand_preference,
        grade_specification: form.grade_specification,
        quantity: form.quantity,
        unit: form.unit
      }]
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
          city: 'Unknown', locality: form.delivery_location,
          message: form.message,
          lead_type: 'material_quote',
          source_page: '/materials/request-quote',
          source: 'website',
          attribution: getAttributionPayload(),
          metadata: metadata,
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>📦</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Quote Request Sent!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our material team will share a competitive quote within 24 hours.</p>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const label = t => <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</label>;

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* User Info */}
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Full Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{label('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
        <div>{label('Customer Type')}
          <select className="input" value={form.customer_type} onChange={set('customer_type')}>
            {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }} />

      {/* Material Details */}
      <div>
        <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '12px' }}>Material Requirement</h4>
        <div className="grid-2" style={{ gap: '16px' }}>
          <div>{label('Category *')}
            <select className="input" value={form.category} onChange={set('category')}>
              {MATERIAL_CATEGORIES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>{label('Brand Preference')}<input className="input" placeholder="e.g. UltraTech, Tata Tiscon" value={form.brand_preference} onChange={set('brand_preference')} /></div>
        </div>
      </div>

      <div className="grid-3" style={{ gap: '16px' }}>
        <div>{label('Grade / Spec')}<input className="input" placeholder="e.g. 53 Grade, 12mm" value={form.grade_specification} onChange={set('grade_specification')} /></div>
        <div>{label('Quantity *')}<input required type="number" className="input" placeholder="e.g. 100" value={form.quantity} onChange={set('quantity')} /></div>
        <div>{label('Unit')}
          <select className="input" value={form.unit} onChange={set('unit')}>
            <option>Bags</option><option>Tons</option><option>Sqft</option><option>Cubic Feet</option><option>Pieces</option><option>Meters</option><option>Other</option>
          </select>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }} />

      {/* Logistics Details */}
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Delivery Location *')}<input required className="input" placeholder="Full address or area..." value={form.delivery_location} onChange={set('delivery_location')} /></div>
        <div>{label('Required By')}<input type="date" className="input" value={form.required_date} onChange={set('required_date')} /></div>
      </div>

      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('GST Bill Required?')}
          <select className="input" value={form.gst_required} onChange={set('gst_required')}>
            <option>Yes</option><option>No</option>
          </select>
        </div>
        <div>{label('Additional Notes')}<textarea className="input" rows={1} placeholder="Any specific requirements..." value={form.message} onChange={set('message')} /></div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-2" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '📦 Request Material Quote'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
