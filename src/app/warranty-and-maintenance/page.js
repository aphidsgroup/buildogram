'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useState } from 'react';
import Link from 'next/link';

export default function WarrantyAndMaintenance() {
  const [activeAmc, setActiveAmc] = useState('premium');
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs default

  const banks = [
    { name: 'State Bank of India', rate: '8.40% p.a.', type: 'Govt Partner', logo: '🏛️' },
    { name: 'HDFC Bank', rate: '8.50% p.a.', type: 'Private Lead', logo: '🏢' },
    { name: 'ICICI Bank', rate: '8.45% p.a.', type: 'Private Partner', logo: '🏦' },
    { name: 'LIC Housing Finance', rate: '8.55% p.a.', type: 'Housing Lead', logo: '🛡️' }
  ];

  const loanSteps = [
    { num: '01', title: 'Plan & BOQ Sign-Off', desc: 'Our team generates a capped Bill of Quantities (BOQ) conforming to GCC/CMDA building norms, which is preferred by banks for technical clearance.' },
    { num: '02', title: 'Liaison Submission', desc: 'We compile all Patta, Chitta, structural engineering blueprints, and plan permission files. We coordinate directly with the bank’s legal and technical inspectors.' },
    { num: '03', title: 'Milestone Disbursal', desc: 'Rather than lump-sum advances, funds are directly disbursed to the secure escrow account in alignment with our verified structural casting milestones.' }
  ];

  const amcPackages = {
    classic: {
      name: 'Classic Care Package',
      price: '₹14,999',
      billing: 'per year',
      tagline: 'Standard Home Security',
      checks: [
        '1 Comprehensive Structural & Visual Health Audit',
        'Annual Plumbing Pressure & Drainage Flow Check',
        'Electrical Safety & Earth Resistance Audits',
        'Single Water-Tank & Overhead Sump Sanitization',
        'Emergency Plumbing Callout Support (2 per year)'
      ]
    },
    premium: {
      name: 'Premium Shield Package',
      price: '₹24,999',
      billing: 'per year',
      tagline: 'Best Selling Home Protection',
      checks: [
        '2 Comprehensive Structural Audits with Moisture Scanning',
        'Thermal Camera Inspections for concealed wall dampness',
        'Bi-Annual Plumbing & Drainage line hydro-sweeps',
        'Electrical Load and Short-Circuit Risk Audits',
        '2 Water-Tank & Sump Sanitizations per year',
        'Anti-Termite and General Pest Control sweeps',
        '24/7 Priority Emergency Plumbing & Electrical Callout (4 per year)'
      ]
    },
    royal: {
      name: 'Royal Asset Protection',
      price: '₹39,999',
      billing: 'per year',
      tagline: 'Elite Luxury Care & CaaS',
      checks: [
        '4 Comprehensive Structural Inspections per year',
        'Acoustic leak scans & Roof/Terrace waterproofing audits',
        'Full Water-Tank, Sump & Borewell Pump maintenance',
        'Thermal Electrical Panel load scans (flir technology)',
        'Quarterly Anti-Termite & General Pest Control sweeps',
        'Annual Professional Deep Home Cleaning services',
        'Unlimited Priority Emergency Civil/Plumbing/MEP Callout support',
        'Dedicated Personal Home Asset Manager'
      ]
    }
  };

  const calculateEmi = (principal) => {
    // Standard EMI formula: [P x R x (1+R)^N]/[((1+R)^N)-1]
    // Assume 8.5% interest rate p.a. (0.708% per month) for 20 years (240 months)
    const p = principal;
    const r = 8.5 / 12 / 100;
    const n = 240;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  return ( <>
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Post-Handover Care & Trust</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Warranty Documentation, Home Loan Support & Lifetime Maintenance</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Structural warranty is provided by your execution partner and documented in your Property Passport. We add bank loan coordination and premium AMC care plans to protect your investment long after handover.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Book Free Consultation</a>
            <a href="/cost-estimator" className="btn btn-lg btn-outline-light">Estimate Build Cost</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* POST-HANDOVER SHIELD CARDS */}
        <div className="grid-3 mb-8 animate-fade-in">
          <div className="card text-center" style={{ borderTop: '6px solid var(--primary)', padding: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
            <h3 style={{ fontSize: '20px', color: 'var(--primary-dark)', marginBottom: '8px' }}>Partner Structural Warranty</h3>
            <p className="text-muted text-xs mb-4" style={{ lineHeight: '1.6' }}>
              Structural warranty covering RCC columns, foundations, beams and slab integrity is provided by your appointed execution partner and recorded in your Property Passport. Buildogram coordinates and documents this warranty — it does not independently underwrite it.
            </p>
            <span className="badge badge-blue">Documented in Property Passport</span>
          </div>

          <div className="card text-center" style={{ borderTop: '6px solid var(--accent)', padding: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💧</div>
            <h3 style={{ fontSize: '20px', color: 'var(--primary-dark)', marginBottom: '8px' }}>1-Year Systems Warranty</h3>
            <p className="text-muted text-xs mb-4" style={{ lineHeight: '1.6' }}>
              Covered under the execution partner&apos;s workmanship warranty: concealed pipelines, waterproofing, sanitary fittings, tiling and electrical switches for 12 months from handover. Terms governed by the signed execution contract.
            </p>
            <span className="badge badge-orange">Partner-Backed Coverage</span>
          </div>

          <div className="card text-center" style={{ borderTop: '6px solid var(--primary-light)', padding: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏡</div>
            <h3 style={{ fontSize: '20px', color: 'var(--primary-dark)', marginBottom: '8px' }}>Property Management CaaS</h3>
            <p className="text-muted text-xs mb-4" style={{ lineHeight: '1.6' }}>
              Taking inspiration from Brixline's asset care model, our Annual Maintenance Contracts keep your home in mint engineering condition. We execute plumbing pressure flushes and thermal leakage scans.
            </p>
            <span className="badge badge-green">Preventative Health Scans</span>
          </div>
        </div>

        {/* SECTION 1: FINANCING ASSISTANCE */}
        <section className="section" style={{ background: 'var(--bg-card2)', borderRadius: '20px', padding: '60px 40px', marginBottom: '48px' }}>
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: '48px' }}>
            <div>
              <div className="tag mb-4">Mortgage & Financing</div>
              <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', marginBottom: '16px' }}>Capped Home Loan Liaison Support</h2>
              <p className="text-muted mb-4" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                We partner with India's top retail mortgage banks. Because we provide capped, itemized **BOQ (Bill of Quantities)** and strictly code-compliant CMDA blueprints, our files are cleared quickly through bank legal and technical evaluation pipelines.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                {loanSteps.map(step => (
                  <div key={step.num} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0, fontFamily: 'Outfit' }}>
                      {step.num}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', color: 'var(--primary-dark)' }}>{step.title}</h4>
                      <p className="text-muted text-xs" style={{ marginTop: '4px' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE EMI CALCULATOR */}
            <div className="card" style={{ background: 'white', padding: '36px', boxShadow: 'var(--shadow-premium)' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--primary-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🧮 Loan EMI Pre-Qualifier
              </h3>
              <p className="text-muted text-xs mb-6">Estimate your monthly mortgage repayment using standard interest averages (8.5% p.a. for 20 years).</p>

              <div className="input-group mb-6">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>Requested Loan Amount</span>
                  <span className="text-primary" style={{ fontWeight: '700' }}>₹{(loanAmount / 100000).toFixed(0)} Lakhs</span>
                </div>
                <input 
                  type="range" 
                  min="2000000" 
                  max="15000000" 
                  step="200000" 
                  value={loanAmount} 
                  onChange={e => setLoanAmount(Number(e.target.value))} 
                />
                <div className="flex-between text-muted text-xs" style={{ marginTop: '-4px' }}>
                  <span>20 Lakhs</span>
                  <span>1.5 Crore</span>
                </div>
              </div>

              <div className="flex-between mb-6" style={{ background: 'rgba(15,118,110,0.05)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div>
                  <span className="text-muted text-xs" style={{ display: 'block' }}>Monthly EMI Repayment</span>
                  <strong style={{ fontSize: '26px', color: 'var(--primary)', fontFamily: 'Outfit' }}>₹{calculateEmi(loanAmount).toLocaleString('en-IN')}</strong>
                  <span className="text-muted" style={{ fontSize: '10px' }}> / month for 20 years</span>
                </div>
                <span className="badge badge-blue">8.5% p.a. Est</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <h4 className="text-muted text-xs mb-4">Our Direct Bank Panel Partners:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {banks.map(bank => (
                    <div key={bank.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--bg-card2)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '20px' }}>{bank.logo}</span>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '600', display: 'block', color: 'var(--primary-dark)' }}>{bank.name}</span>
                        <span className="text-muted" style={{ fontSize: '10px' }}>Rates from {bank.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE 10-YEAR STRUCTURAL GUARANTEE */}
        <section className="section">
          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-premium)' }}>
              {/* Mock Structural Warranty Certificate */}
              <div style={{ background: 'var(--gradient-dark)', color: 'white', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '380px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '30px', top: '30px', border: '2px solid rgba(255,255,255,0.2)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', opacity: 0.3 }}>
                  🛡️
                </div>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px' }}>
                  <span className="badge badge-orange" style={{ marginBottom: '10px' }}>OFFICIAL CERTIFICATE</span>
                  <h3 style={{ fontSize: '22px', color: 'white', fontFamily: 'Outfit' }}>Buildogram Legal Structural Shield</h3>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Registered IS-Code Compliant Guarantee</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                  <p>✓ **RCC Frame Integration**: Concrete casting load limits conforming strictly to IS 456 standards.</p>
                  <p>✓ **Rebar Steel Guarantee**: TMT structural reinforcement sizing conforming strictly to IS 1786 specifications.</p>
                  <p>✓ **Foundation Settlement Defenses**: Capped pile footings/rafts verified via Soil SBC laboratory testing.</p>
                </div>
                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '20px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '10px', display: 'block', color: 'rgba(255,255,255,0.5)' }}>DESIGNED & STAMPED BY</span>
                    <strong style={{ fontSize: '12px', color: 'white' }}>Dr. S. K. Vignesh, PhD (IIT-M)</strong>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>10-Yr Legally Capped</span>
                </div>
              </div>
            </div>

            <div>
              <div className="tag mb-4">Certified Quality</div>
              <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', marginBottom: '16px' }}>Why We Issue a Stamp-Bound 10-Year Structural Guarantee</h2>
              <p className="text-muted mb-4" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                Unorganized contractors rarely take structural accountability. If columns buckle or slabs crack, they vanish. Buildogram provides a legally binding, stamp-bound warranty card signed by our PhD structural head.
              </p>
              <p className="text-muted mb-6" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                Because we mandate concrete compression cube checks in third-party labs, check steel tie spacing, and ensure 50mm salt cover-blocks for coastal zones (ECR/OMR), we have absolute confidence in our structural integrity.
              </p>
              <div className="flex gap-4">
                <Link href="/projects" className="btn btn-primary">See Completed Projects</Link>
                <Link href="/contact" className="btn btn-outline">Book Free Structural Call</Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE AMC PACKAGES */}
        <section className="section" style={{ background: 'var(--bg-card2)', borderRadius: '20px', padding: '60px 40px', marginBottom: '48px' }}>
          <div className="text-center mb-8">
            <div className="tag mb-4">Lifetime Home Care</div>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)' }}>Annual Maintenance Contracts (AMC)</h2>
            <p className="text-muted mt-4" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '14px' }}>
              Your house needs preventative checkups just like a luxury car. Our specialized engineers scan your plumbing, test earth lines, and perform waterproofing flushes to maintain prime asset value.
            </p>

            {/* Toggle buttons */}
            <div className="flex-center mt-6" style={{ gap: '12px' }}>
              {['classic', 'premium', 'royal'].map(pkg => (
                <button
                  key={pkg}
                  onClick={() => setActiveAmc(pkg)}
                  className="btn"
                  style={{
                    background: activeAmc === pkg ? 'var(--primary)' : 'white',
                    color: activeAmc === pkg ? 'white' : 'var(--text-muted)',
                    boxShadow: 'var(--shadow)',
                    border: activeAmc === pkg ? 'none' : '1px solid var(--border)',
                    padding: '10px 20px',
                    fontSize: '13px',
                    borderRadius: '8px'
                  }}
                >
                  {pkg === 'classic' ? 'Classic Care' : pkg === 'premium' ? 'Premium Shield' : 'Royal Asset'}
                </button>
              ))}
            </div>
          </div>

          {/* AMC Card Content */}
          <div className="card animate-fade-in" style={{ background: 'white', padding: '40px', borderLeft: '6px solid var(--primary)', maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex-between mb-6 flex-wrap gap-2">
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '4px' }}>{amcPackages[activeAmc].name}</h3>
                <span className="text-primary font-semibold text-xs">{amcPackages[activeAmc].tagline}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'Outfit' }}>{amcPackages[activeAmc].price}</span>
                <span className="text-muted" style={{ fontSize: '12px', display: 'block' }}>{amcPackages[activeAmc].billing}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <h4 className="mb-4" style={{ fontSize: '13px', color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Includes Care Schedule:</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {amcPackages[activeAmc].checks.map((chk, i) => (
                  <li key={i} style={{ fontSize: '13px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                    <span className="text-muted">{chk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-end">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Enquire About AMC Care Plan
              </Link>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="card text-center mb-8" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Lock In an Engineer-Led Build Strategy</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
            Book a free session to clear your land approvals, SBC queries, and lock bank mortgage estimations.
          </p>
          <div className="flex-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>Book Free Consultation</Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>Estimate Build Cost</Link>
          </div>
        </div>
      </div>
    </>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Plan & BOQ Sign-Off","path":"/warranty-and-maintenance"}]} />
    </>
  );
}
