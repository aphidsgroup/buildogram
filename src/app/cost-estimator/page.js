'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../Navbar';
import styles from './page.module.css';

const fmt = n => '₹' + (n >= 10000000 ? (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? (n / 100000).toFixed(1) + 'L' : n.toLocaleString('en-IN'));

export default function CostEstimator() {
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState({
    city: 'Chennai',
    locality: '',
    plot_area_sqft: 1200,
    built_up_area_sqft: '',
    floors: 'G+1',
    construction_type: 'residential',
    spec_level: 'standard',
    basement_required: 'no',
    lift_required: 'no',
    parking_required: 'no',
    interior_scope: 'no',
    expected_start: '',
    message: ''
  });
  
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const specLabels = { basic: 'Classic (Basic)', standard: 'Premium (Best Seller)', luxury: 'Royal (Luxury Spec)' };
  
  const specDesc = { 
    basic: '₹1,750/sqft · Vizag TMT Steel, Ramco Cement, standard vitrified tiling.', 
    standard: '₹2,200/sqft · Tata Tiscon Steel, UltraTech Cement, Havells cables, Jaquar.', 
    luxury: '₹3,500/sqft · Tata CRS anti-corrosive Steel, Kohler fixtures, Italian marble, smart home prep.' 
  };

  const generateEstimate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/ai/cost-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...lead })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.estimate);
        setActiveStep(4);
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
    <div className={styles.page}>
      <Navbar />

      <div className="container animate-fade-in" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
        {/* PROGRESS STEPPER */}
        <div style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
          <div className={styles.stepper}>
            <div className={styles.stepperLine} />
            <div 
              className={styles.stepperLineActive} 
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '33%' : activeStep === 3 ? '66%' : '100%' }} 
            />
            
            <div className={`${styles.stepDot} ${activeStep >= 1 ? styles.stepDotActive : ''} ${activeStep > 1 ? styles.stepDotDone : ''}`}>
              {activeStep > 1 ? '✓' : '1'}
            </div>
            <div className={`${styles.stepDot} ${activeStep >= 2 ? styles.stepDotActive : ''} ${activeStep > 2 ? styles.stepDotDone : ''}`}>
              {activeStep > 2 ? '✓' : '2'}
            </div>
            <div className={`${styles.stepDot} ${activeStep >= 3 ? styles.stepDotActive : ''} ${activeStep > 3 ? styles.stepDotDone : ''}`}>
              {activeStep > 3 ? '✓' : '3'}
            </div>
            <div className={`${styles.stepDot} ${activeStep >= 4 ? styles.stepDotActive : ''}`}>
              4
            </div>
          </div>
          <div className="flex-between text-muted text-xs" style={{ padding: '0 20px', marginTop: '-10px' }}>
            <span className={activeStep === 1 ? 'text-primary font-semibold' : ''}>Plot</span>
            <span className={activeStep === 2 ? 'text-primary font-semibold' : ''}>Specs</span>
            <span className={activeStep === 3 ? 'text-primary font-semibold' : ''}>Details</span>
            <span className={activeStep === 4 ? 'text-primary font-semibold' : ''}>Estimate</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="tag mb-4">Precision Costing</div>
          <h1 style={{ fontSize: '38px', color: 'var(--primary-dark)' }}>AI Cost Estimator</h1>
          <p className="text-muted mt-2" style={{ fontSize: '15px' }}>
            Get an instant construction cost analysis based on CMDA rules and latest market indexes.
          </p>
        </div>

        <div className={styles.layout}>
          {/* STEP 1: PLOT DETAILS */}
          {activeStep === 1 && (
            <div className="card">
              <h2 className="mb-6" style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>Step 1: Plot & Layout Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="grid-2">
                  <div className="input-group">
                    <label>City</label>
                    <select className="input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                      <option>Chennai</option>
                      <option>Coimbatore</option>
                      <option>Madurai</option>
                      <option>Trichy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Locality / Area</label>
                    <input className="input" placeholder="e.g. Velachery, OMR" value={form.locality} onChange={e => setForm({ ...form, locality: e.target.value })} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label>Plot Area (sq.ft)</label>
                    <input type="number" className="input" placeholder="1200" value={form.plot_area_sqft} onChange={e => setForm({ ...form, plot_area_sqft: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <label>Built-up Area (sq.ft) - Optional</label>
                    <input type="number" className="input" placeholder="Leave empty for auto-calculate" value={form.built_up_area_sqft} onChange={e => setForm({ ...form, built_up_area_sqft: e.target.value })} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label>Construction Type</label>
                    <select className="input" value={form.construction_type} onChange={e => setForm({ ...form, construction_type: e.target.value })}>
                      <option value="residential">Residential Home</option>
                      <option value="villa">Luxury Villa</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="renovation">Renovation</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Floors</label>
                    <select className="input" value={form.floors} onChange={e => setForm({ ...form, floors: e.target.value })}>
                      <option value="G">Ground Only</option>
                      <option value="G+1">G + 1 Floor</option>
                      <option value="G+2">G + 2 Floors</option>
                      <option value="G+3">G + 3 Floors</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={() => setActiveStep(2)} className="btn btn-primary">Proceed to Specifications →</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIFICATIONS */}
          {activeStep === 2 && (
            <div className="card">
              <h2 className="mb-4" style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>Step 2: Specifications & Add-ons</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Material Package</label>
                  <div className={styles.specGrid}>
                    {['basic', 'standard', 'luxury'].map(s => (
                      <button 
                        type="button" 
                        key={s} 
                        onClick={() => setForm({ ...form, spec_level: s })}
                        className={`${styles.specCard} ${form.spec_level === s ? styles.specActive : ''}`}
                      >
                        <strong>{specLabels[s]}</strong>
                        <span>{specDesc[s]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '16px' }}>
                  <div className="input-group">
                    <label>Parking Area Included?</label>
                    <select className="input" value={form.parking_required} onChange={e => setForm({ ...form, parking_required: e.target.value })}>
                      <option value="no">No</option><option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Basement Structure?</label>
                    <select className="input" value={form.basement_required} onChange={e => setForm({ ...form, basement_required: e.target.value })}>
                      <option value="no">No</option><option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Lift / Elevator Required?</label>
                    <select className="input" value={form.lift_required} onChange={e => setForm({ ...form, lift_required: e.target.value })}>
                      <option value="no">No</option><option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Include Interiors in Estimate?</label>
                    <select className="input" value={form.interior_scope} onChange={e => setForm({ ...form, interior_scope: e.target.value })}>
                      <option value="no">No (Bare Shell)</option><option value="yes">Yes (Turnkey)</option>
                    </select>
                  </div>
                </div>

                <div className="flex-between mt-4">
                  <button onClick={() => setActiveStep(1)} className="btn btn-ghost">← Back</button>
                  <button onClick={() => setActiveStep(3)} className="btn btn-primary">Proceed to Contact Info →</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT INFO */}
          {activeStep === 3 && (
            <div className="card">
              <h2 className="mb-4" style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>Step 3: Just a final touch</h2>
              <p className="text-muted text-sm mb-6">Where should we send this detailed estimate?</p>

              <form onSubmit={generateEstimate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="input-group">
                  <label>Your Name *</label>
                  <input className="input" required value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} />
                </div>
                <div className="grid-2">
                  <div className="input-group">
                    <label>Mobile Number *</label>
                    <input className="input" type="tel" required value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input className="input" type="email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Expected Start Timeline</label>
                  <select className="input" value={form.expected_start} onChange={e => setForm({ ...form, expected_start: e.target.value })}>
                    <option value="">Select...</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-3_months">In 1-3 Months</option>
                    <option value="3-6_months">In 3-6 Months</option>
                    <option value="just_researching">Just Researching</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Any specific requirements? (Optional)</label>
                  <textarea className="input" rows={2} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <div className="flex-between mt-4">
                  <button type="button" onClick={() => setActiveStep(2)} className="btn btn-ghost">← Back</button>
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Analyzing data...' : 'Generate Official Estimate →'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: AI RESULTS */}
          {activeStep === 4 && result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ borderTop: '4px solid #0f172a' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Your Preliminary Estimate</h2>
                <p className="text-muted text-sm mb-6">Based on current market rates and material indices.</p>

                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Estimated Range</div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a' }}>
                    {fmt(result.estimated_min)} <span style={{ color: '#cbd5e1', fontWeight: 400 }}>to</span> {fmt(result.estimated_max)}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px' }}>🛠️ Major Cost Drivers</h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                      {result.major_cost_drivers.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px' }}>📋 Assumptions Made</h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                      {result.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>

                {result.missing_inputs?.length > 0 && (
                  <div style={{ marginBottom: '24px', background: '#fffbeb', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#b45309', marginBottom: '8px' }}>⚠️ Data Needed For Final Quote:</div>
                    <div style={{ fontSize: '13px', color: '#92400e' }}>{result.missing_inputs.join(' • ')}</div>
                  </div>
                )}

                <div style={{ padding: '16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>
                  <strong>Disclaimer:</strong> This is an approximate educational estimate based on the information provided. It is not a final quotation.
                </div>
              </div>

              <div className="card text-center" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h3 style={{ fontSize: '18px', color: '#166534', marginBottom: '8px' }}>Next Step: {result.recommended_next_step}</h3>
                <p className="text-muted text-sm mb-6" style={{ color: '#15803d' }}>
                  Our structural engineers will analyze your exact plot limits, soil condition, and CMDA layout rules to produce a vetted Bill of Quantities.
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ background: '#166534' }}>
                  Book Free Engineering Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: '32px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
          <strong>Legal Disclaimer:</strong> This cost estimator provides an approximate educational estimate, not a final quotation. Pricing is subject to site inspection, final architectural plans, and current material rates.
        </div>
      </div>
    </div>
  );
}
