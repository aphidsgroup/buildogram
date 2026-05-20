'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../Navbar';

export default function Specifications() {
  const [activeTab, setActiveTab] = useState('all');

  const packages = [
    {
      name: 'Classic Package',
      tagline: 'Functional & Cost-Effective',
      price: '₹1,750',
      badge: 'Basic',
      badgeClass: 'badge-gray',
      desc: 'Perfect for rental houses, investment properties, and budget-conscious homeowners looking for engineering stability without luxury costs.',
      features: [
        { cat: 'structural', label: 'Steel (TMT)', value: 'Vizag Steel / Sail Fe550' },
        { cat: 'structural', label: 'Cement', value: 'Ramco / Coromandel / Dalmia' },
        { cat: 'structural', label: 'Fine Sand / M-Sand', value: 'Double washed M-Sand (Plastering & Masonry)' },
        { cat: 'structural', label: 'Aggregates', value: '20mm & 40mm crushed blue metal granite' },
        { cat: 'finishes', label: 'Flooring (Living/Bed)', value: 'Double charged vitrified tiles (₹50/sq.ft) - Cera/Orient' },
        { cat: 'finishes', label: 'Painting (Internal)', value: '2 coats putty + 1 coat primer + 2 coats Asian Paints Tractor Emulsion' },
        { cat: 'finishes', label: 'Painting (External)', value: '1 coat primer + 2 coats weather-proof Asian Paints Ace' },
        { cat: 'mep', label: 'Electrical Wires', value: 'Finolex / Kundan (FR Cables)' },
        { cat: 'mep', label: 'Switches & Plates', value: 'Anchor Penta / ROMA modular switches' },
        { cat: 'mep', label: 'Plumbing Pipes', value: 'Ashirvad CPVC & Supreme PVC pipes' },
        { cat: 'mep', label: 'Sanitary & CP Fittings', value: 'Cera / Parryware standard range' },
        { cat: 'structural', label: 'Concrete Grade', value: 'M20 structural mix with mechanical vibrators' }
      ]
    },
    {
      name: 'Premium Package',
      tagline: 'Best Selling & Brand Trusted',
      price: '₹2,200',
      badge: 'Most Popular',
      badgeClass: 'badge-blue',
      desc: 'Our flagship package engineered for modern families. Standardizes premium national brands and features an robust 10-year structural guarantee.',
      features: [
        { cat: 'structural', label: 'Steel (TMT)', value: 'Tata Tiscon / JSW Neo Fe550D' },
        { cat: 'structural', label: 'Cement', value: 'UltraTech / Ramco Supergrade' },
        { cat: 'structural', label: 'Fine Sand / M-Sand', value: 'Double washed high-grade M-Sand & P-Sand' },
        { cat: 'structural', label: 'Aggregates', value: '12mm, 20mm, 40mm clean angular blue metal' },
        { cat: 'finishes', label: 'Flooring (Living/Bed)', value: 'Premium digital vitrified tiles (₹80/sq.ft) - Kajaria/Somany' },
        { cat: 'finishes', label: 'Painting (Internal)', value: '2 coats Birla putty + 1 coat primer + 2 coats Asian Paints Premium Emulsion' },
        { cat: 'finishes', label: 'Painting (External)', value: '1 coat silicone primer + 2 coats weather-shield Asian Paints Apex Ultima' },
        { cat: 'mep', label: 'Electrical Wires', value: 'Havells / Finolex (FRLSH Low Smoke)' },
        { cat: 'mep', label: 'Switches & Plates', value: 'Legrand Lyncus / Crabtree premium modular' },
        { cat: 'mep', label: 'Plumbing Pipes', value: 'Astral FlowGuard CPVC & Supreme PVC' },
        { cat: 'mep', label: 'Sanitary & CP Fittings', value: 'Jaquar / Hindware elite series' },
        { cat: 'structural', label: 'Concrete Grade', value: 'M25 design mix (strictly measured with cube testing)' }
      ]
    },
    {
      name: 'Royal Package',
      tagline: 'Luxury Custom Masterpiece',
      price: '₹2,850',
      badge: 'Luxury Spec',
      badgeClass: 'badge-orange',
      desc: 'Zero-compromise high-end construction. Custom architectural detailing, luxury Italian-inspired finishes, and global premium utilities.',
      features: [
        { cat: 'structural', label: 'Steel (TMT)', value: 'Tata Tiscon Super-shield CRS (Corrosion Resistant)' },
        { cat: 'structural', label: 'Cement', value: 'UltraTech Premium / ACC Gold' },
        { cat: 'structural', label: 'Fine Sand / M-Sand', value: 'Premium river sand substitute / ultra-washed structural sands' },
        { cat: 'structural', label: 'Aggregates', value: 'Granite aggregates conforming strictly to IS 383' },
        { cat: 'finishes', label: 'Flooring (Living/Bed)', value: 'Imported Italian Marble / Large Slab GVT Tiles (₹150/sq.ft)' },
        { cat: 'finishes', label: 'Painting (Internal)', value: '3 coats putty + 1 coat acrylic primer + 2 coats Asian Paints Royale Luxury Emulsion' },
        { cat: 'finishes', label: 'Painting (External)', value: 'Anti-carbonation primer + 2 coats Asian Paints Apex Royale Protek (10-yr warranty)' },
        { cat: 'mep', label: 'Electrical Wires', value: 'Polycab / Finolex (FRLS-H, extra heavy gauge)' },
        { cat: 'mep', label: 'Switches & Plates', value: 'Legrand Arteor / Schneider Zencelo flat-switch series' },
        { cat: 'mep', label: 'Plumbing Pipes', value: 'Astral CPVC / Supreme plumbing + acoustic drainage silent pipes' },
        { cat: 'mep', label: 'Sanitary & CP Fittings', value: 'Kohler / Grohe / Toto luxury range' },
        { cat: 'structural', label: 'Concrete Grade', value: 'M25/M30 high-durability mix with waterproofing admixtures' }
      ]
    }
  ];

  const inClusions = [
    { title: 'Architectural Plans', desc: 'Detailed 2D floor plans, 3D front elevations, interior furniture layouts, and 3D architectural mockups.' },
    { title: 'Structural Designs', desc: 'PhD-reviewed structural blueprints, column layouts, reinforcement detailing, footing calculations, and slab designs.' },
    { title: 'Site Inspection & Supervision', desc: 'Daily logs, weekly PM visits, and structural engineer checks at casting, steel tying, and foundation levels.' },
    { title: 'Government Liaison Assistance', desc: 'Compilation and formatting of architectural drawings conforming strictly to CMDA, DTCP, or GCC guidelines.' },
    { title: 'Warranties & Handover', desc: '10-year structural warranty card, 1-year leakage warranty, and all material test reports (concrete cube & steel strength).' }
  ];

  const exClusions = [
    { title: 'Government Fees', desc: 'CMDA/GCC license approval fees, plan submission charges, and building tax are paid directly by the client.' },
    { title: 'Site Utilities', desc: 'Temporary electricity connection, construction water supply, and sand/gravel clearing from neighboring plots.' },
    { title: 'Extra Civil Works', desc: 'Compound wall beyond standard lengths, modular kitchen carpentry, safety grills, and high-capacity borewell drilling.' }
  ];

  const filterFeatures = (features, category) => {
    if (category === 'all') return features;
    return features.filter(f => f.cat === category);
  };

  return (
    <>
      <Navbar />
      <div className="page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div className="page-header text-center animate-fade-in" style={{ border: 'none', marginBottom: '40px' }}>
          <div className="tag mb-4">Material Specifications</div>
          <h1 style={{ fontSize: '44px', color: 'var(--primary-dark)' }}>Transparent Material Packages</h1>
          <p className="text-muted mt-4" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '17px' }}>
            We do not compromise. Choose from our engineer-vetted, transparent material packages. Every brand, concrete grade, and rebar standard is locked in writing before kickoff.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex-center mb-8 animate-fade-in" style={{ gap: '10px' }}>
          {[
            { id: 'all', label: 'All Specifications' },
            { id: 'structural', label: '🏗️ Structural & Civil' },
            { id: 'finishes', label: '🎨 Finishes & Interiors' },
            { id: 'mep', label: '🔌 Electrical & Plumbing' }
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
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PACKAGE CARDS GRID */}
        <div className="grid-3 mb-8 animate-fade-in">
          {packages.map(p => (
            <div key={p.name} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex-between mb-4">
                <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
                  {p.price}<span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--text-muted)' }}>/sq.ft</span>
                </span>
              </div>
              <h2 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '8px' }}>{p.name}</h2>
              <p className="text-primary font-semibold text-xs mb-4" style={{ letterSpacing: '0.5px' }}>{p.tagline}</p>
              <p className="text-muted text-sm mb-6" style={{ minHeight: '60px', lineHeight: '1.6' }}>{p.desc}</p>
              
              <div style={{ flex: 1, borderTop: '1px dashed var(--border)', paddingTop: '20px' }}>
                <h4 className="mb-4" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-dark)' }}>Inclusions Detail:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filterFeatures(p.features, activeTab).map(f => (
                    <li key={f.label} style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <strong style={{ color: 'var(--text)', fontWeight: '600', maxWidth: '140px' }}>{f.label}:</strong>
                      <span className="text-muted text-right" style={{ textAlign: 'right' }}>{f.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link href={`/cost-estimator?spec=${p.badge.toLowerCase()}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Estimate With This Package
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* INCLUSIONS & EXCLUSIONS SECTIONS */}
        <div className="grid-2 mt-8 animate-fade-in" style={{ gap: '32px' }}>
          {/* INCLUSIONS */}
          <div className="card" style={{ background: 'rgba(15, 118, 110, 0.02)', borderColor: 'rgba(15, 118, 110, 0.15)' }}>
            <h3 className="mb-6" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
              <span>✅</span> Standard Inclusions In All Packages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {inClusions.map(inc => (
                <div key={inc.title}>
                  <h4 style={{ fontSize: '15px', color: 'var(--primary-dark)', marginBottom: '4px' }}>{inc.title}</h4>
                  <p className="text-muted text-sm">{inc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EXCLUSIONS */}
          <div className="card" style={{ background: 'rgba(249, 115, 22, 0.02)', borderColor: 'rgba(249, 115, 22, 0.15)' }}>
            <h3 className="mb-6" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-hover)' }}>
              <span>⚠️</span> Project Exclusions (Clear Transparency)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {exClusions.map(exc => (
                <div key={exc.title}>
                  <h4 style={{ fontSize: '15px', color: 'var(--primary-dark)', marginBottom: '4px' }}>{exc.title}</h4>
                  <p className="text-muted text-sm">{exc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="card text-center mt-8 animate-fade-in" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Confused about concrete grades or rebar salinity protection?</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto 24px' }}>
            Our founders (PhD Civil & Structural Engineers) are available for a detailed technical discussion on code compliance for your plot.
          </p>
          <div className="flex-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
              Book Structural Meeting
            </Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>
              Calculate Build Cost
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
