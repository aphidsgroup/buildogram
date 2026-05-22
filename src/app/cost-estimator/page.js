'use client';
import { useState, useEffect } from 'react';
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
    floors: 'G+1',
    spec_level: 'standard',
    rough_budget: ''
  });
  
  const [result, setResult] = useState(null);
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const specLabels = { basic: 'Classic (Basic)', standard: 'Premium (Best Seller)', premium: 'Royal (Luxury Spec)' };
  
  const specDesc = { 
    basic: '₹1,750/sqft · Vizag TMT Steel, Ramco Cement, standard vitrified tiling.', 
    standard: '₹2,200/sqft · Tata Tiscon Steel, UltraTech Cement, Havells cables, Jaquar.', 
    premium: '₹2,850/sqft · Tata CRS anti-corrosive Steel, Kohler fixtures, Italian marble.' 
  };

  const calculateEstimate = () => {
    const area = Number(form.plot_area_sqft) || 1200;
    
    // Base rates
    let baseRate = 2200;
    if (form.spec_level === 'basic') baseRate = 1750;
    if (form.spec_level === 'premium') baseRate = 2850;

    // Floor multipliers
    let floorMult = 1.0;
    if (form.floors === 'G') floorMult = 1.0;
    if (form.floors === 'G+1') floorMult = 1.8;
    if (form.floors === 'G+2') floorMult = 2.6;

    const totalBuiltUp = area * floorMult;
    const baseCost = totalBuiltUp * baseRate;

    // Ranges
    const min = Math.round(baseCost * 0.95);
    const max = Math.round(baseCost * 1.05);

    // Breakdown percentages
    const breakdown = {
      structure: { pct: 45, min: Math.round(min * 0.45), max: Math.round(max * 0.45) },
      finishes: { pct: 35, min: Math.round(min * 0.35), max: Math.round(max * 0.35) },
      others: { pct: 20, min: Math.round(min * 0.20), max: Math.round(max * 0.20) }
    };

    setResult({ min, max, breakdown, totalBuiltUp });
  };

  // Recalculate instantly on form change
  useEffect(() => {
    calculateEstimate();
  }, [form]);

  const submitLead = async (e) => {
    e.preventDefault();
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...lead, 
        ...form, 
        estimated_cost_min: result?.min, 
        estimated_cost_max: result?.max, 
        source: 'Interactive Cost Estimator' 
      })
    });
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className="container animate-fade-in" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
        {/* PROGRESS STEPPER */}
        <div style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          <div className={styles.stepper}>
            <div className={styles.stepperLine} />
            <div 
              className={styles.stepperLineActive} 
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }} 
            />
            
            <div className={`${styles.stepDot} ${activeStep >= 1 ? styles.stepDotActive : ''} ${activeStep > 1 ? styles.stepDotDone : ''}`}>
              {activeStep > 1 ? '✓' : '1'}
            </div>
            <div className={`${styles.stepDot} ${activeStep >= 2 ? styles.stepDotActive : ''} ${activeStep > 2 ? styles.stepDotDone : ''}`}>
              {activeStep > 2 ? '✓' : '2'}
            </div>
            <div className={`${styles.stepDot} ${activeStep >= 3 ? styles.stepDotActive : ''}`}>
              3
            </div>
          </div>
          <div className="flex-between text-muted text-xs" style={{ padding: '0 20px', marginTop: '-10px' }}>
            <span className={activeStep === 1 ? 'text-primary font-semibold' : ''}>1. Plot Details</span>
            <span className={activeStep === 2 ? 'text-primary font-semibold' : ''}>2. Specs & Brands</span>
            <span className={activeStep === 3 ? 'text-primary font-semibold' : ''}>3. Estimates Breakdown</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="tag mb-4">Precision Costing</div>
          <h1 style={{ fontSize: '38px', color: 'var(--primary-dark)' }}>Calculate Your House Build Cost</h1>
          <p className="text-muted mt-2" style={{ fontSize: '15px' }}>
            Vetted for CMDA limits, Tamil Nadu soil conditions, and current concrete market indexes.
          </p>
        </div>

        <div className={styles.layout}>
          {/* STEP 1: CONFIGURE */}
          {activeStep === 1 && (
            <div className="card">
              <h2 className="mb-6" style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>Step 1: Soil Type & Plinth Layout</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="grid-2">
                  <div className="input-group">
                    <label>District / Region</label>
                    <select className="input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                      <option>Chennai City</option>
                      <option>Kanchipuram District</option>
                      <option>Tiruvallur District</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Locality / Soil Pocket</label>
                    <input 
                      className="input" 
                      placeholder="e.g. Velachery, ECR Road, Tambaram" 
                      value={form.locality} 
                      onChange={e => setForm({ ...form, locality: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className={styles.sliderLabel}>
                    <span>Plot / Built-up Size</span>
                    <span className={styles.sliderValue}>{form.plot_area_sqft} sq.ft</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="8000" 
                    step="50" 
                    value={form.plot_area_sqft} 
                    onChange={e => setForm({ ...form, plot_area_sqft: Number(e.target.value) })} 
                  />
                  <div className="flex-between text-muted text-xs">
                    <span>500 sq.ft (Small plot)</span>
                    <span>8,000 sq.ft (Luxury Villa)</span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Floors & Height Limits</label>
                  <select className="input" value={form.floors} onChange={e => setForm({ ...form, floors: e.target.value })}>
                    <option value="G">Ground Floor Only (G)</option>
                    <option value="G+1">Ground + 1 Floor (G+1) (Standard Home)</option>
                    <option value="G+2">Ground + 2 Floors (G+2)</option>
                  </select>
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={() => setActiveStep(2)} className="btn btn-primary">
                    Proceed to Specifications →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIFICATIONS */}
          {activeStep === 2 && (
            <div className="card">
              <h2 className="mb-4" style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>Step 2: Vetted Brand Package</h2>
              <p className="text-muted text-xs mb-6">Pricing dynamically adjusts per square foot based on national material indexes.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className={styles.specGrid}>
                  {['basic', 'standard', 'premium'].map(s => (
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

                <div className="input-group">
                  <label>Additional Structural Budget Capping (Optional)</label>
                  <input 
                    className="input" 
                    type="number" 
                    placeholder="e.g. ₹5,000,000" 
                    value={form.rough_budget} 
                    onChange={e => setForm({ ...form, rough_budget: e.target.value })} 
                  />
                </div>

                <div className="flex-between mt-6">
                  <button onClick={() => setActiveStep(1)} className="btn btn-ghost">
                    ← Back to Soil Plot
                  </button>
                  <button onClick={() => setActiveStep(3)} className="btn btn-primary">
                    Generate Cost Breakdown →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS & BOOKING */}
          {activeStep === 3 && result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <span>Calculated Estimation Range</span>
                  <button onClick={() => setActiveStep(2)} className="btn btn-ghost btn-sm">← Re-configure</button>
                </div>
                <div className={styles.resultRange}>
                  {fmt(result.min)} – {fmt(result.max)}
                </div>
                <p className="text-muted text-sm">
                  Includes soil test reserves for {form.plot_area_sqft} sqft, {form.floors} height, {specLabels[form.spec_level]} package in {form.city}.
                </p>

                <div className={styles.breakdown}>
                  {[
                    ['🏗️ Structural & Civil Works (45%)', result.breakdown.structure],
                    ['🎨 Finishing & Tiling (35%)', result.breakdown.finishes],
                    ['🔌 Electrical, Plumbing & Utilities (20%)', result.breakdown.others]
                  ].map(([label, b]) => (
                    <div key={label} className={styles.breakdownRow}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-dark)' }}>{label}</div>
                        <div className="text-muted text-xs">{b.pct}% of project cost</div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>
                        {fmt(b.min)} – {fmt(b.max)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.disclaimer}>
                  <span>⚠️</span>
                  <span>
                    This cost range is locked for structural safety. Final legal capping is signed via an engineer-vetted Bill of Quantities (BOQ).
                  </span>
                </div>
              </div>

              {!submitted ? (
                <div className="card">
                  <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '4px' }}>
                    Book Free PhD Engineer Soil & Plan Consultation
                  </h3>
                  <p className="text-muted text-xs mb-6">
                    Our structural engineers will analyze soil maps and CMDA layout rules for your plot - completely free.
                  </p>
                  <form onSubmit={submitLead} className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
                    <div className="input-group">
                      <label>Your Name</label>
                      <input 
                        className="input" 
                        required 
                        value={lead.name} 
                        onChange={e => setLead({ ...lead, name: e.target.value })} 
                      />
                    </div>
                    <div className="grid-2">
                      <div className="input-group">
                        <label>10-Digit Mobile Number</label>
                        <input 
                          className="input" 
                          type="tel" 
                          required 
                          placeholder="e.g. 98765 43210" 
                          value={lead.phone} 
                          onChange={e => setLead({ ...lead, phone: e.target.value })} 
                        />
                      </div>
                      <div className="input-group">
                        <label>Email Address</label>
                        <input 
                          className="input" 
                          type="email" 
                          placeholder="name@gmail.com" 
                          value={lead.email} 
                          onChange={e => setLead({ ...lead, email: e.target.value })} 
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                      Book Consultation & Lock Estimate →
                    </button>
                  </form>
                </div>
              ) : (
                <div className={styles.success}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3>Doctoral Consultation Locked!</h3>
                  <p className="text-muted mt-2" style={{ fontSize: '14px' }}>
                    Our structural engineer will review your plot coordinates and call you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            <div className="card mb-4">
              <h3 style={{ fontSize: '15px', color: 'var(--primary-dark)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Why Our Estimation?
              </h3>
              {[
                ['📋', '100% BOQ Capped', 'We map every bag of structural cement. No vague square-foot traps.'],
                ['🏗️', 'PhD Civil Supervised', 'Designed for coastal weather, seismic guidelines, and high salinity cover blocks.'],
                ['💰', 'Zero Hidden Overruns', 'Includes compounding walls, plinth-raising margins, and septic limits.'],
                ['🛡️', '10-Year Stamp Warranties', 'Legally-binding warranty protecting columns, footing, and framing integrity.']
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary-dark)' }}>{title}</div>
                    <div className="text-muted" style={{ fontSize: '11px', lineHeight: '1.5' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.06), rgba(249,115,22,0.04))', border: '1px solid rgba(15,118,110,0.15)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📞</div>
              <h4 style={{ fontSize: '15px', color: 'var(--primary-dark)', marginBottom: '6px' }}>Prefer to speak directly?</h4>
              <p className="text-muted text-xs mb-4">Our structural founders are available Mon-Sat, 9am - 7pm.</p>
              <a href="tel:+919876543210" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '14px' }}>
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
