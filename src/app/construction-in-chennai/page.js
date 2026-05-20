'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../Navbar';

export default function ChennaiConstruction() {
  const [activeTab, setActiveTab] = useState('soils');

  const soilPockets = [
    {
      area: 'Velachery, Madipakkam, Pallikaranai',
      type: 'Clayey Black Cotton Soil (High Swelling)',
      foundation: 'Raft Foundation / Pile Footing',
      risk: 'Severe waterlogging and clay shrinkage which causes conventional shallow foundations to settle unevenly, resulting in structural cracks.',
      mitigation: 'We mandate a Soil Bearing Capacity (SBC) test, raise the plinth beam to a minimum of 4.5 feet above road level to prevent flooding, and reinforce column ties.'
    },
    {
      area: 'ECR, OMR, Besant Nagar, Neelankarai',
      type: 'Sandy Coastal Soil (Low Clay, High Salinity)',
      foundation: 'Pile Foundation / Conventional Footing with Salt Shielding',
      risk: 'Low bearing capacity of surface sands and high corrosion rates from marine air salinity.',
      mitigation: 'We reinforce with Tata CRS (Corrosion Resistant) steel, increase concrete cover-blocks to 50mm, and apply specialized crystalline waterproofing additives in concrete.'
    },
    {
      area: 'Anna Nagar, Ambattur, Guindy',
      type: 'Hard Red Soil / Rocky Strata (High Bearing)',
      foundation: 'Conventional Column Footing / Isolated Footing',
      risk: 'Excavation hardness is high, but the soil has excellent structural load limits.',
      mitigation: 'Ideal bearing soil. Conventional footings are highly stable, allowing significant civil cost savings which can be re-allocated to high-end finishes.'
    }
  ];

  const approvalsSteps = [
    { step: '01', title: 'CMDA / DTCP Land Classification Clearance', agency: 'Chennai Metropolitan Development Authority', desc: 'Confirm that your plot is classified in the Residential Zone. Requires Patta, Chitta, Adangal, and parent document clearances.' },
    { step: '02', title: 'GCC / Municipal Building Permit', agency: 'Greater Chennai Corporation / Local Municipality', desc: 'Submission of architectural floor plans, key plans, and structural drawing sets signed by a licensed surveyor and structural engineer.' },
    { step: '03', title: 'Metro Water & Sewerage Liaison', agency: 'CMWSSB (Metropolitan Water Board)', desc: 'Obtaining plumbing water connection approvals and sewer disposal design clearances (crucial for zero septic overflow limits).' },
    { step: '04', title: 'TANGEDCO Permanent EB Connection', agency: 'Tamil Nadu Electricity Board', desc: 'Applying for temporary construction power connection, followed by permanent single/three-phase residential meters upon completion.' }
  ];

  const salinityDefenses = [
    { title: 'CRS (Corrosion Resistant) TMT Bars', desc: 'Tata Tiscon CRS or JSW Neosteel CRS steel contains added copper, chromium, and phosphorus, resisting oxidation in salty ECR/OMR winds.' },
    { title: 'Enhanced Structural Cover Blocks', desc: 'Standard buildings use 25mm concrete cover blocks. Buildogram coastal projects use 40-50mm machine-cast concrete cover blocks to shield steel frames.' },
    { title: 'Anti-Carbonation Coatings', desc: 'We shield external plastering with specialized acrylic weather-shield primer coatings (Asian Paints Apex Protek) preventing salty humidity from penetrating masonry.' }
  ];

  return (
    <>
      <Navbar />
      <div className="page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* HEADER */}
        <div className="page-header text-center animate-fade-in" style={{ border: 'none', marginBottom: '40px' }}>
          <div className="tag mb-4">Local Chennai Expertise</div>
          <h1 style={{ fontSize: '44px', color: 'var(--primary-dark)' }}>Home Construction in Chennai</h1>
          <p className="text-muted mt-4" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '17px' }}>
            Chennai has unique construction challenges—varying from the clayey waterlogged pockets of Velachery to the sandy, highly saline winds of ECR. We engineer specifically for Chennai’s local geographics.
          </p>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex-center mb-8 animate-fade-in" style={{ gap: '10px' }}>
          {[
            { id: 'soils', label: '🌱 Chennai Soil & Foundations Guide' },
            { id: 'approvals', label: '📋 CMDA / DTCP Approvals Roadmap' },
            { id: 'salinity', label: '🌊 Coastal Salinity & Anti-Corrosion Specs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn"
              style={{
                background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow)',
                border: activeTab === tab.id ? 'none' : '1px solid var(--border)',
                padding: '10px 20px',
                fontSize: '13px',
                borderRadius: '8px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="mb-8 animate-fade-in">
          
          {/* SOILS & FOUNDATIONS */}
          {activeTab === 'soils' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {soilPockets.map(soil => (
                <div key={soil.area} className="card" style={{ borderLeft: '6px solid var(--primary)', padding: '36px' }}>
                  <div className="flex-between mb-4 flex-wrap gap-2">
                    <h3 style={{ fontSize: '20px', color: 'var(--primary-dark)' }}>📍 {soil.area}</h3>
                    <span className="badge badge-blue">{soil.type}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                    <div><strong>🏗️ Recommended Foundation:</strong> <span className="text-primary font-semibold">{soil.foundation}</span></div>
                    <div><strong>⚠️ Major Regional Risk:</strong> <span className="text-muted">{soil.risk}</span></div>
                    <div style={{ background: 'rgba(15,118,110,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '8px' }}>
                      <strong>🔬 Buildogram Structural Mitigation:</strong> <span className="text-muted">{soil.mitigation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* APPROVALS ROADMAP */}
          {activeTab === 'approvals' && (
            <div className="card" style={{ padding: '36px' }}>
              <h2 className="mb-6" style={{ fontSize: '22px', color: 'var(--primary-dark)' }}>CMDA & DTCP Approval Roadmap</h2>
              <p className="text-muted text-xs mb-6">
                Our in-house liaison assistance handles document preparation conforming strictly to CMDA code compliance limits (such as FSI limits and setback requirements).
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {approvalsSteps.map(step => (
                  <div key={step.step} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontFamily: 'Outfit' }}>
                      {step.step}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', color: 'var(--primary-dark)', marginBottom: '2px' }}>{step.title}</h4>
                      <span style={{ fontSize: '11px', color: 'var(--accent-hover)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Governing Body: {step.agency}</span>
                      <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SALINITY DEFENSE */}
          {activeTab === 'salinity' && (
            <div className="grid-3">
              {salinityDefenses.map(defense => (
                <div key={defense.title} className="card card-hover" style={{ background: 'white' }}>
                  <div style={{ fontSize: '36px', marginBottom: '16px' }}>🌊</div>
                  <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '10px' }}>{defense.title}</h3>
                  <p className="text-muted text-xs" style={{ lineHeight: '1.7' }}>{defense.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* PRICE ESTIMATOR LINK CARD */}
        <div className="card text-center mb-8" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Check localized cost estimates for your Chennai plot</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
            Get an instant cost assessment mapping plinth variables, Spec Levels, and built-up layouts conforming to Chennai municipal FSI limits.
          </p>
          <div className="flex-center gap-4">
            <Link href="/cost-estimator" className="btn btn-primary" style={{ background: 'var(--accent)' }}>Open Cost Estimator</Link>
            <Link href="/specifications" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>Compare Material Specifications</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
