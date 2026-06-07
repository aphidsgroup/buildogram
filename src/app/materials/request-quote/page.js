'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RequestQuoteForm() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBoq = searchParams.get('boq') === 'true';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const payload = {
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      material: fd.get('material_category'),
      quantity: fd.get('quantity'),
      locality: fd.get('delivery_location'),
      message: fd.get('notes'),
      lead_type: 'materials',
      boq_available: initialBoq
    };

    try {
      // Create lead, Ops will convert to quote request
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) setSuccess(true);
      else alert('Failed to submit request.');
    } catch (err) {
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', background: '#ECFDF5', borderRadius: '16px', border: '1px solid #10B981' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '24px', color: '#047857', marginBottom: '16px' }}>Quote Request Received!</h2>
        <p style={{ color: '#065F46', fontSize: '16px', marginBottom: '32px' }}>Our operations team will review your requirements and begin gathering quotes from verified suppliers in your area.</p>
        <Link href="/materials" style={{ display: 'inline-block', background: '#10B981', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Return to Materials</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <div className="grid-2" style={{ gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Name</label>
          <input type="text" name="name" required style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Phone Number</label>
          <input type="tel" name="phone" required style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Email (Optional)</label>
          <input type="email" name="email" style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Delivery Location</label>
          <input type="text" name="delivery_location" required style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Material Category</label>
          <input type="text" name="material_category" defaultValue={initialCategory} required style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Quantity Required (Approx)</label>
          <input type="text" name="quantity" style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px' }} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Notes or Specific Brands / Grades</label>
          <textarea name="notes" rows="3" style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
        </div>
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: '#FC6E20', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Submitting...' : 'Request Competitive Quotes'}
      </button>
    </form>
  );
}

export default function RequestQuotePage() {
  return (
    <main style={{ padding: '80px 24px', backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', textAlign: 'center' }}>Request Material Quotes</h1>
        <p style={{ fontSize: '16px', color: '#64748B', textAlign: 'center', marginBottom: '40px' }}>Our marketplace connects you with verified local suppliers for the best landed cost, including transport and GST.</p>
        
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading form...</div>}>
          <RequestQuoteForm />
        </Suspense>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: 600 }}>
            <span>🔒</span> 100% Data Privacy
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: 600 }}>
            <span>✅</span> Verified Suppliers Only
          </div>
        </div>
      </div>
    </main>
  );
}
