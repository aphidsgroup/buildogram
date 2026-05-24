'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState('pre');

  const stages = {
    pre: {
      title: 'Phase 1: Design & Approval (Transparency Groundwork)',
      tagline: 'Locking specifications, calculating soil bearing capacities, and designing for structural safety.',
      icon: '📐',
      steps: [
        {
          num: '01',
          name: 'Plot Audit & Soil Testing',
          desc: 'We mandate a Soil Bearing Capacity (SBC) test on your plot before designing. This determines whether you need a conventional footing, raft footing, or deep piles, preventing slab cracking years down the line.'
        },
        {
          num: '02',
          name: 'Architectural & 3D Drafting',
          desc: 'Our design team maps your vision to CMDA/DTCP norms, providing customized 2D layout plans and photorealistic 3D elevations. We configure layouts for natural ventilation, coastal sun heat deflection, and Vaastu.'
        },
        {
          num: '03',
          name: 'Granular BOQ Sizing',
          desc: 'We generate an itemized Bill of Quantities (BOQ) with clear unit quantities and exact material brands (e.g. Tata Steel vs local steel, UltraTech cement vs generic). This is signed into a legally capped fixed-price contract.'
        }
      ],
      checks: ['Mandatory Soil SBC lab testing reports', '100% CMDA & DTCP code-compliance checks', 'Locked material specs sheet signed per page']
    },
    active: {
      title: 'Phase 2: Active Construction & 500+ QC Checks',
      tagline: 'Tech-enabled progress tracking, certified quality checks, and milestone-linked payment flow.',
      icon: '🏗️',
      steps: [
        {
          num: '04',
          name: 'Foundation & Plinth Engineering',
          desc: 'Excavations are dug to soil audit specifications. We raise the plinth level based on local historical flood averages (crucial in Velachery / OMR areas) and pour M25 structural grade foundation concrete.'
        },
        {
          num: '05',
          name: 'Framing, Masonry & Slab Casting',
          desc: 'Rebar frame structural layouts are signed off by our structural engineer before every slab casting. We enforce CRS (Corrosion Resistant) steel with proper cover-blocks to defend reinforcement against coastal air salinity.'
        },
        {
          num: '06',
          name: 'Daily Logs & QC Portal Updates',
          desc: 'Site engineers post photos, material delivery slips, concrete slump tests, worker attendance, and weather parameters to your Client Portal daily. CCTV cameras capture active site progress.'
        }
      ],
      checks: ['Concrete cube laboratory compression tests', 'Steel reinforcement tying spacing and diameter checks', 'Plumbing pipeline hydrostatic pressure leak checks']
    },
    handover: {
      title: 'Phase 3: Quality Clearance & Handover',
      tagline: 'Final finishes checks, leakage testing, warranty activations, and stamp-bound structural guarantees.',
      icon: '🔑',
      steps: [
        {
          num: '07',
          name: 'Finishing & Services Checklists',
          desc: 'Tiles are inspected for hollow spots, electric circuits undergo insulation resistance tests, and sanitary plumbing lines undergo flow and blockage tests.'
        },
        {
          num: '08',
          name: 'Waterproofing Salinity Shielding',
          desc: 'Wet areas (bathrooms, balconies, terrace) are pond-tested for 48 hours to confirm zero dampness leakage. We apply anti-fungal external paints with a 10-year protection matrix.'
        },
        {
          num: '09',
          name: 'Warranty Handover & Document Kit',
          desc: 'Keys are handed over alongside a comprehensive document folder: structural blueprints, plumbing maps, municipal clearances, and a stamp-bound legal 10-year structural warranty.'
        }
      ],
      checks: ['48-hour bathroom/terrace ponding leak tests', 'Electrical earth-resistance structural safety checks', 'Handover of all raw material lab test receipts']
    }
  };

  const paymentSteps = [
    { label: 'Booking & Signoff', pct: '10%', desc: 'Sign BOQ-true capped contract. Soil testing, architectural and structural designs commence.' },
    { label: 'Foundation & Plinth Complete', pct: '15%', desc: 'Excavation completed, SBC footing cast, and plinth raised to anti-flood height. Approved by structural engineer.' },
    { label: 'Brickwork & Concrete Slabs', pct: '40%', desc: 'Divided into floor-wise casting milestones (G slab, G+1 slab). Paid ONLY after rebar tie checks are signed.' },
    { label: 'Plastering, MEP & Concealed Lines', pct: '20%', desc: 'Wall plastering, concealed electrical wiring channels, and leak-proof CPVC lines completed.' },
    { label: 'Finishing, Tiling & Painting', pct: '10%', desc: 'Kajaria tiling, internal Asian Paints coating, sanitary fixtures install, and leak testing completed.' },
    { label: 'Keys Handover & Clearance', pct: '5%', desc: 'Final walkthrough, ponding tests approved, and structural warranty activated.' }
  ];

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>How It Works</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Radical Engineering Transparency — 9 Verified Stages</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>We replace traditional contractor guesswork with PhD-reviewed structural designs, milestone-linked payments, and 500+ certified quality checks across 3 construction phases.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Start Your Project</a>
            <a href="/specifications" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>View Specifications</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* INTERACTIVE STAGES SWITCHER */}
        <div className="flex-center mb-8 animate-fade-in" style={{ gap: '12px' }}>
          {[
            { id: 'pre', label: 'Phase 1: Design & Approvals', icon: '📐' },
            { id: 'active', label: 'Phase 2: Build & QC Checks', icon: '🏗️' },
            { id: 'handover', label: 'Phase 3: Handover & Warranties', icon: '🔑' }
          ].map(stg => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id)}
              className="btn"
              style={{
                background: activeStage === stg.id ? 'var(--primary)' : 'var(--bg-card)',
                color: activeStage === stg.id ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow)',
                border: activeStage === stg.id ? 'none' : '1px solid var(--border)',
                padding: '12px 24px',
                borderRadius: '8px'
              }}
            >
              <span style={{ marginRight: '8px' }}>{stg.icon}</span>{stg.label}
            </button>
          ))}
        </div>

        {/* STAGES DESCRIPTION GRID */}
        <div className="grid-2 mb-8 animate-fade-in" style={{ alignItems: 'flex-start', gap: '32px' }}>
          {/* Steps Detail */}
          <div>
            <div className="card" style={{ padding: '36px', borderLeft: '6px solid var(--primary)' }}>
              <h2 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                {stages[activeStage].title}
              </h2>
              <p className="text-primary font-semibold text-xs mb-6">{stages[activeStage].tagline}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {stages[activeStage].steps.map(s => (
                  <div key={s.num} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(15,118,110,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0, fontFamily: 'Outfit' }}>
                      {s.num}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>{s.name}</h4>
                      <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QC Checks Highlight */}
          <div className="card" style={{ background: 'var(--bg-card2)', padding: '36px' }}>
            <h3 className="mb-6" style={{ fontSize: '18px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔬 Quality Audits in This Phase:
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stages[activeStage].checks.map((chk, i) => (
                <li key={i} className="flex gap-3" style={{ fontSize: '14px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'var(--text)', fontWeight: '500' }}>{chk}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <p className="text-muted text-xs mb-4">
                All concrete mixing slump parameters, steel tension alignments, and lab receipts are stored inside your interactive client portal.
              </p>
              <Link href="/login" className="btn btn-outline btn-sm">
                Preview Client Dashboard Demo
              </Link>
            </div>
          </div>
        </div>

        {/* PAYMENT FLOW TIMELINE */}
        <section className="section" style={{ background: 'var(--bg-card2)', borderRadius: '20px', padding: '60px 40px', marginBottom: '48px' }}>
          <div className="text-center mb-8">
            <div className="tag mb-4">Capped Spending</div>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)' }}>Milestone-Linked Escrow Payments</h2>
            <p className="text-muted mt-4" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '14px' }}>
              No lump-sum advances. Your construction funds stay safe and are released strictly based on structural milestones. Overruns are paid by us.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px', margin: '0 auto' }}>
            {paymentSteps.map((pay, i) => (
              <div key={pay.label} className="card" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '16px 24px', background: 'var(--bg-card)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)', minWidth: '40px' }}>{pay.pct}</div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: 'var(--primary-dark)' }}>{i + 1}. {pay.label}</h4>
                    <p className="text-muted text-xs">{pay.desc}</p>
                  </div>
                </div>
                <span className="badge badge-blue">Verified Stage</span>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="card text-center mb-8" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Check building materials & package options</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
            Compare specifications and structural brands in detail before making a decision.
          </p>
          <div className="flex-center gap-4">
            <Link href="/specifications" className="btn btn-primary" style={{ background: 'var(--accent)' }}>Compare Material Brands</Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>Calculate My Cost</Link>
          </div>
        </div>
      </div>
    </>
  );
}
