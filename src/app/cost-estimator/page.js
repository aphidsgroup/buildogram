'use client';
import { useState } from 'react';
import Link from 'next/link';

const fmt = n => '₹' + (n >= 10000000 ? (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? (n / 100000).toFixed(1) + 'L' : n.toLocaleString('en-IN'));

export default function CostEstimator() {
  const [form, setForm] = useState({
    built_up_area_sqft: '',
    spec_level: 'standard', // mapped from "Construction type: Basic/Standard/Premium/Luxury"
    construction_type: 'residential', // mapped from "Project type"
    floors: 'G+1',
    city: 'Chennai',
    name: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateEstimate = async (e) => {
    e.preventDefault();
    if (!form.built_up_area_sqft || !form.phone || !form.name) {
      alert("Please fill out Name, Phone, and Area to calculate.");
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/ai/cost-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // send mapped data so the API understands
        body: JSON.stringify({ ...form, plot_area_sqft: form.built_up_area_sqft })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.estimate);
      } else {
        alert('Failed to generate estimate. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section style={{ padding: '60px 0 72px', background: 'var(--secondary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div className="tag mb-4" style={{ background: 'rgba(255,163,100,0.1)', border: '1px solid rgba(252,110,32,0.3)', color: '#FFB347' }}>Cost Calculator</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px' }}>Construction Cost Estimator</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, margin: '0 auto' }}>
            Get an approximate idea of your construction cost based on area, quality level, and project type. This is an estimate; final cost depends on BOQ, design, and site condition.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 20px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: '32px', alignItems: 'start' }} className="cost-estimator-grid">
            
            {/* FORM CARD */}
            <form onSubmit={generateEstimate} className="card" style={{ padding: '32px', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Project Details</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="responsive-grid">
                <div className="input-group">
                  <label>Built-up Area (sq.ft)</label>
                  <input type="number" required className="input" placeholder="e.g. 1500" value={form.built_up_area_sqft} onChange={e => setForm({ ...form, built_up_area_sqft: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Construction Quality</label>
                  <select className="input" value={form.spec_level} onChange={e => setForm({ ...form, spec_level: e.target.value })}>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="responsive-grid">
                <div className="input-group">
                  <label>Project Type</label>
                  <select className="input" value={form.construction_type} onChange={e => setForm({ ...form, construction_type: e.target.value })}>
                    <option value="residential">New Home Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="interior">Interior Work</option>
                    <option value="commercial">Commercial Construction</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Number of Floors</label>
                  <select className="input" value={form.floors} onChange={e => setForm({ ...form, floors: e.target.value })}>
                    <option value="G">Ground Only</option>
                    <option value="G+1">G + 1</option>
                    <option value="G+2">G + 2</option>
                    <option value="G+3">G + 3</option>
                  </select>
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label>Location / City</label>
                <input className="input" placeholder="e.g. Chennai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }} className="responsive-grid">
                <div className="input-group">
                  <label>Name</label>
                  <input required className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input required type="tel" className="input" placeholder="Your phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                {loading ? 'Calculating...' : 'Calculate Cost'}
              </button>
            </form>

            {/* RESULT CARD */}
            <div className="card" style={{ padding: '32px', borderRadius: '24px', background: result ? 'linear-gradient(135deg, rgba(255,163,100,0.05), rgba(252,110,32,0.02))' : '#fff', border: result ? '1px solid rgba(252,110,32,0.2)' : '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Estimated Cost</h2>
              
              {!result ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📊</div>
                  <p>Fill out the form and click calculate to see your estimated construction cost.</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Approximate Total Range</div>
                    <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.2 }}>
                      {fmt(result.min)} - {fmt(result.max)}
                    </div>
                  </div>
                  
                  <div style={{ padding: '16px', background: 'white', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Base Cost per sq.ft</span>
                      <span style={{ fontWeight: 600 }}>{fmt(result.cost_per_sqft || 2100)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Quality Tier</span>
                      <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{form.spec_level}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Approval & Buffer</span>
                      <span style={{ fontWeight: 600 }}>Included</span>
                    </div>
                  </div>

                  <Link href="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    Request Detailed BOQ
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* DISCLAIMER */}
          <div style={{ marginTop: '48px', padding: '24px', background: 'white', borderRadius: '16px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> This estimator provides only an approximate cost. Actual cost may vary based on soil condition, structural design, material brands, labor availability, local body approvals, finishing level, and current market rates.
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .cost-estimator-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </>
  );
}
