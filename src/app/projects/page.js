'use client';
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

  return (
    <>
            <div className="page" style={{ paddingTop: '40px', minHeight: '100vh' }}>
      <div className="container">
        {/* HEADER */}
        <div className="page-header text-center animate-fade-in" style={{ border: 'none', marginBottom: '40px' }}>
          <div className="tag mb-4">Completed Portfolio</div>
          <h1 style={{ fontSize: '44px', color: 'var(--primary-dark)' }}>Engineer-Verified Homes</h1>
          <p className="text-muted mt-4" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '17px' }}>
            We do not just hand over keys; we hand over comprehensive laboratory reports, concrete compression test records, and legal warranties.
          </p>
        </div>

        {/* MOCK VR BLUEPRINT VIEWPORT - MATCHES BUILDNEXT TECH TRANSITION */}
        <div className="card mb-8 animate-fade-in" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-premium)' }}>
          <div style={{ background: 'var(--gradient-dark)', color: 'white', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-orange mb-2">Buildogram Tech-Studio</span>
              <h3 style={{ fontSize: '20px', color: 'white' }}>Virtual VR 3D Structural Walkthrough</h3>
              <p className="text-muted text-xs" style={{ color: 'rgba(255,255,255,0.7) !important', marginTop: '4px' }}>
                Interact with our mock structural framing models. See how we lay steel reinforcements, beam alignments, and pile footings.
              </p>
            </div>
            {vrStatus === 'idle' && <button onClick={startVrDemo} className="btn btn-primary" style={{ background: 'var(--accent)' }}>Initialize 3D VR Viewport</button>}
            {vrStatus === 'loading' && <button className="btn btn-primary" disabled style={{ background: 'var(--accent)', opacity: 0.7 }}>Loading Blueprints...</button>}
            {vrStatus === 'ready' && <button onClick={() => setVrStatus('idle')} className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Close Interactive Simulator</button>}
          </div>

          {vrStatus === 'loading' && (
            <div style={{ height: '350px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: '12px' }}>
              <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: 'var(--accent)' }} />
              <span style={{ fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Mapping soil bearings and frame loads...</span>
            </div>
          )}

          {vrStatus === 'ready' && (
            <div style={{ height: '380px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
              {/* Fake 3D blueprint drawing */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              <div className="flex-center" style={{ height: '100%', flexDirection: 'column', color: 'white', padding: '24px', zIndex: 10 }}>
                {/* Visual simulator graphics */}
                <div style={{ border: '2px dashed var(--accent)', padding: '24px', borderRadius: '12px', textAlign: 'center', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.9)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎮</div>
                  <h4 className="mb-2" style={{ fontSize: '16px', color: 'white' }}>Interactive 3D Framework Model Activated</h4>
                  <p className="text-muted text-xs mb-4">
                    Rotate column alignments, trigger M25 concrete flow metrics, and toggle coastal salinity CRS steel jackets to simulate real-world durability tests.
                  </p>
                  <div className="flex-center gap-3">
                    <button onClick={() => alert("Simulating 7.5 Richter earthquake... Frame load absorbs force correctly. SBC check approved!")} className="btn btn-primary btn-sm" style={{ background: 'var(--primary)', fontSize: '12px' }}>Simulate Seismic Load</button>
                    <button onClick={() => alert("Simulating 30-year ECR saline wind corrosion... Standard rebar corrodes. CRS rebar locks out corrosion. Plaster shield activated!")} className="btn btn-outline btn-sm" style={{ color: 'white', borderColor: 'var(--accent)', fontSize: '12px' }}>Simulate Coastal Winds</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CATEGORY TABS */}
        <div className="flex-center mb-8 animate-fade-in" style={{ gap: '10px' }}>
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
              className="btn"
              style={{
                background: activeCategory === cat.id ? 'var(--primary)' : 'var(--bg-card)',
                color: activeCategory === cat.id ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow)',
                border: activeCategory === cat.id ? 'none' : '1px solid var(--border)',
                padding: '10px 20px',
                fontSize: '13px',
                borderRadius: '8px'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* DENSE PROJECTS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
          {filteredProjects.map(p => (
            <div key={p.id} className="card animate-fade-in" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '0' }} className="grid-2">
                
                {/* Media Container with internal tabs */}
                <div style={{ position: 'relative', height: '100%', minHeight: '380px' }}>
                  {getActiveTab(p.id) === 'photo' && (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  )}
                  {getActiveTab(p.id) === 'blueprint' && (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.blueprintImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'hue-rotate(140deg) brightness(0.8)' }} />
                  )}
                  {getActiveTab(p.id) === 'specs' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--primary-dark)', color: 'white', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 className="mb-4" style={{ color: 'white', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '12px' }}>
                        🧬 Engineering Specs:
                      </h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                        <li><strong>🏗️ Concrete Mix:</strong> {p.concreteGrade}</li>
                        <li><strong>⛓️ Steel reinforcement:</strong> {p.steelBrand}</li>
                        <li><strong>⛰️ Cement Grade:</strong> {p.cementBrand}</li>
                        <li><strong>🌊 Waterproofing:</strong> {p.waterproofing}</li>
                      </ul>
                    </div>
                  )}

                  {/* Tab switches overlay */}
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
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
                          padding: '6px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: getActiveTab(p.id) === tab.id ? 'var(--primary)' : 'rgba(15, 23, 42, 0.8)',
                          color: 'white',
                          backdropFilter: 'blur(4px)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Container */}
                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex-between mb-3">
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)' }}>📍 {p.location}</span>
                      <span className="badge badge-blue">{p.type} Package</span>
                    </div>
                    <h2 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '8px' }}>{p.title}</h2>
                    <div className="flex gap-4 text-muted text-xs mb-6">
                      <span><strong>📐 Total Area:</strong> {p.sqft} sq.ft</span>
                      <span><strong>⏱️ Project Duration:</strong> {p.duration}</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                      <p style={{ fontStyle: 'italic', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                        "{p.quote}"
                      </p>
                      <h4 className="mt-4" style={{ fontSize: '13px', color: 'var(--primary-dark)' }}>— {p.clientName}</h4>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href={`/cost-estimator?sqft=${p.sqft.replace(',','')}`} className="btn btn-outline btn-sm">
                      Estimate Similar Build Cost
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="card text-center mb-8" style={{ padding: '50px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '30px', color: 'white', marginBottom: '12px' }}>Want to inspect our active construction sites?</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
            We arrange physical site audits across Chennai so you can see concrete cube slump testing and rebar CRS steel placements live.
          </p>
          <div className="flex-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>Request Site Audit Visit</Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>Estimate Build Cost</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
