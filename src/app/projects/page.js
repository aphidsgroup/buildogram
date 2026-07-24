'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useState } from 'react';
import Link from 'next/link';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProjectTab, setActiveProjectTab] = useState({}); // project_id -> tab ('photo', 'specs', 'blueprint')
  const [vrStatus, setVrStatus] = useState('idle'); // idle | loading | ready

  const projects = [
    {
      id: 1,
      title: 'Ocean-Safe Villa',
      location: 'ECR, Neelankarai',
      sqft: '4,200',
      duration: '12 Months',
      type: 'Premium',
      category: 'coastal',
      concreteGrade: 'M25 Coastal Design Mix',
      steelBrand: 'Tata Tiscon CRS (Corrosion Resistant)',
      cementBrand: 'UltraTech Premium',
      waterproofing: 'Silicone anti-carbonation coatings (3 coats)',
      quote: "Buildogram solved the ECR rebar corrosion issue completely. Their PhD founder explained sand footings and CRS steel coverage blocks in our first meeting. Outstanding quality.",
      clientName: "Mr. Rajendran, NRI Homeowner",
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      blueprintImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Contemporary Duplex',
      location: 'Shanthi Colony, Anna Nagar',
      sqft: '3,100',
      duration: '10 Months',
      type: 'Premium',
      category: 'duplex',
      concreteGrade: 'M20 structural mix',
      steelBrand: 'Tata Tiscon Fe550D',
      cementBrand: 'Ramco Supergrade',
      waterproofing: '2-coat brushable damp-proof membrane',
      quote: "No per-sqft guess games. The itemized BOQ was locked at the contract stage. Every bag of UltraTech cement and foot of Finolex wire was tracked live on my client portal. Built exactly to budget.",
      clientName: "Dr. Anjali Sen, Pediatrician",
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      blueprintImg: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Raft Footing Apartment',
      location: 'Velachery Bypass',
      sqft: '6,500',
      duration: '14 Months',
      type: 'Standard',
      category: 'apartment',
      concreteGrade: 'M25 high-bearing mix',
      steelBrand: 'Vizag TMT Steel Fe550',
      cementBrand: 'Dalmia DSP Cement',
      waterproofing: 'Crystalline deep plaster additives + Plinth raised 4.5ft against local flooding limits',
      quote: "Our plot is in a clay-heavy pocket of Velachery that gets waterlogged. Buildogram did soil SBC testing and mandated a custom high-plinth raft foundation. They saved our house from future dampness.",
      clientName: "Mr. Karthik K., Bank Manager",
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      blueprintImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Modern Classic Villa',
      location: 'Camp Road, Tambaram',
      sqft: '2,400',
      duration: '8 Months',
      type: 'Classic',
      category: 'villa',
      concreteGrade: 'M20 standard mix',
      steelBrand: 'Vizag TMT Steel',
      cementBrand: 'Coromandel Cement',
      waterproofing: 'Standard 2-coat bathroom polyurethane coatings',
      quote: "Solid, durable construction at an unbeatable price. The team did concrete slump checks and rebar alignment audits at every step. Truly professional civil engineers.",
      clientName: "Mrs. Meenakshi, Retired Teacher",
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      blueprintImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleTabChange = (pId, tab) => {
    setActiveProjectTab(prev => ({ ...prev, [pId]: tab }));
  };

  const getActiveTab = (pId) => activeProjectTab[pId] || 'photo';

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const startVrDemo = () => {
    setVrStatus('loading');
    setTimeout(() => {
      setVrStatus('ready');
    }, 1500);
  };

  return ( <>
    <div className="marketplacePage">
      {/* HERO */}
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="sectionInnerWide" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Completed Portfolio</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px', fontFamily: '"Space Grotesk", sans-serif' }}>Engineer-Verified Homes — Built with Proof</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px' }}>
            We don't just hand over keys — we hand over concrete compression test records, lab-certified material reports, and 10-year structural warranties.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Request Site Audit Visit</a>
            <a href="/cost-estimator" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '16px' }}>Estimate Build Cost</a>
          </div>
        </div>
      </section>

      <section className="fullBleedSection" style={{ padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide">

          {/* MOCK VR BLUEPRINT VIEWPORT */}
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', marginBottom: '64px' }}>
            <div style={{ background: 'var(--secondary)', color: 'white', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <span style={{ display: 'inline-flex', padding: '4px 12px', background: 'rgba(252, 110, 32, 0.1)', color: 'var(--primary)', borderRadius: '999px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Buildogram Tech-Studio</span>
                <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '8px', fontFamily: '"Space Grotesk", sans-serif' }}>Virtual VR 3D Structural Walkthrough</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                  Interact with our mock structural framing models. See how we lay steel reinforcements, beam alignments, and pile footings.
                </p>
              </div>
              {vrStatus === 'idle' && <button onClick={startVrDemo} className="btn btn-primary" style={{ padding: '14px 24px' }}>Initialize 3D VR Viewport</button>}
              {vrStatus === 'loading' && <button className="btn btn-primary" disabled style={{ padding: '14px 24px', opacity: 0.7 }}>Loading Blueprints...</button>}
              {vrStatus === 'ready' && <button onClick={() => setVrStatus('idle')} className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '14px 24px' }}>Close Interactive Simulator</button>}
            </div>

            {vrStatus === 'loading' && (
              <div style={{ height: '400px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Mapping soil bearings and frame loads...</span>
              </div>
            )}

            {vrStatus === 'ready' && (
              <div style={{ height: '500px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '24px', zIndex: 10, position: 'relative' }}>
                  <div style={{ border: '2px dashed var(--primary)', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '600px', background: 'rgba(15, 23, 42, 0.9)' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
                    <h4 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>Interactive 3D Framework Model Activated</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
                      Rotate column alignments, trigger M25 concrete flow metrics, and toggle coastal salinity CRS steel jackets to simulate real-world durability tests.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                      <button onClick={() => alert("Simulating 7.5 Richter earthquake... Frame load absorbs force correctly. SBC check approved!")} className="btn btn-primary">Simulate Seismic Load</button>
                      <button onClick={() => alert("Simulating 30-year ECR saline wind corrosion... Standard rebar corrodes. CRS rebar locks out corrosion. Plaster shield activated!")} className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Simulate Coastal Winds</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY TABS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'villa', label: '🏡 Modern Villas' },
              { id: 'duplex', label: '🏢 Contemporary Duplexes' },
              { id: 'coastal', label: '🌊 Coastal ECR Shielded' },
              { id: 'apartment', label: '🏢 Small Apartments' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'var(--primary)' : 'white',
                  color: activeCategory === cat.id ? 'white' : 'var(--secondary)',
                  border: `1px solid ${activeCategory === cat.id ? 'var(--primary)' : 'var(--border)'}`,
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(252, 110, 32, 0.2)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* DENSE PROJECTS LIST */}
          <div style={{ display: 'grid', gap: '40px', marginBottom: '80px' }}>
            {filteredProjects.map(p => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.5fr)', background: 'white', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
                
                {/* Media Container with internal tabs */}
                <div style={{ position: 'relative', height: '100%', minHeight: '400px', borderRight: '1px solid var(--border)' }}>
                  {getActiveTab(p.id) === 'photo' && (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  )}
                  {getActiveTab(p.id) === 'blueprint' && (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.blueprintImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'hue-rotate(140deg) brightness(0.8)' }} />
                  )}
                  {getActiveTab(p.id) === 'specs' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--secondary)', color: 'white', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ color: 'white', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '16px', marginBottom: '24px', fontSize: '20px' }}>
                        🧬 Engineering Specs:
                      </h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', listStyle: 'none', padding: 0 }}>
                        <li><strong>🏗️ Concrete Mix:</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.concreteGrade}</span></li>
                        <li><strong>⛓️ Steel reinforcement:</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.steelBrand}</span></li>
                        <li><strong>⛰️ Cement Grade:</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.cementBrand}</span></li>
                        <li><strong>🌊 Waterproofing:</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.waterproofing}</span></li>
                      </ul>
                    </div>
                  )}

                  {/* Tab switches overlay */}
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', gap: '8px', zIndex: 10 }}>
                    {[
                      { id: 'photo', label: 'Completed Photo' },
                      { id: 'specs', label: 'Structural Specs' },
                      { id: 'blueprint', label: 'Architectural Blueprint' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(p.id, tab.id)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          background: getActiveTab(p.id) === tab.id ? 'var(--primary)' : 'rgba(15, 23, 42, 0.8)',
                          color: 'white',
                          backdropFilter: 'blur(8px)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Container */}
                <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>📍 {p.location}</span>
                      <span style={{ padding: '4px 12px', background: 'rgba(0,0,0,0.05)', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>{p.type} Package</span>
                    </div>
                    <h2 style={{ fontSize: '32px', color: 'var(--secondary)', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>{p.title}</h2>
                    <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
                      <span><strong>📐 Total Area:</strong> {p.sqft} sq.ft</span>
                      <span><strong>⏱️ Project Duration:</strong> {p.duration}</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                      <p style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        "{p.quote}"
                      </p>
                      <h4 style={{ fontSize: '15px', color: 'var(--secondary)', fontWeight: 600 }}>— {p.clientName}</h4>
                    </div>
                  </div>

                  <div style={{ marginTop: '40px' }}>
                    <Link href={`/cost-estimator?sqft=${p.sqft.replace(',','')}`} className="btn btn-outline" style={{ display: 'inline-block' }}>
                      Estimate Similar Build Cost
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* CALL TO ACTION */}
          <div style={{ padding: '64px', background: 'var(--secondary)', color: 'white', borderRadius: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(252, 110, 32, 0.15) 0%, transparent 60%)' }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: '36px', color: 'white', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>Want to inspect our active construction sites?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '700px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                We arrange physical site audits across Chennai so you can see concrete cube slump testing and rebar CRS steel placements live.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <Link href="/contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Request Site Audit Visit</Link>
                <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '16px 32px', fontSize: '16px' }}>Estimate Build Cost</Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Ocean-Safe Villa","path":"/projects"}]} />
    </>
  );
}
