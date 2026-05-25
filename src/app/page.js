'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

/* ─── Component ──────────────────────────────────────────── */

export default function Home() {
  const router = useRouter();
  const [searchCategory, setSearchCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleMarketplaceSearch = (e) => {
    e.preventDefault();
    if (searchCategory === 'Buy/Sell Property') {
      window.open('https://www.realproprealty.com', '_blank');
      return;
    }
    if (searchCategory === 'Rent/Lease Property') {
      window.open('https://toletboardchennai.in', '_blank');
      return;
    }
    if (searchCategory === 'Material Supplier') {
      router.push('/materials');
      return;
    }
    if (searchCategory === 'Become Partner') {
      router.push('/partners/register');
      return;
    }
    if (searchCategory === 'BOQ Review') {
      router.push('/boq-audit');
      return;
    }

    // Default to partner directory
    let url = '/partners/directory';
    const params = new URLSearchParams();
    if (searchCategory) params.append('category', searchCategory);
    if (searchQuery) params.append('q', searchQuery);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    router.push(url);
  };

  return (
    <div className={styles.page}>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroAmbient} />
        <div className={styles.heroLine} />

        <div className={`container ${styles.heroContainer}`}>
          {/* Left Text / Action Panel */}
          <div className={`${styles.heroText} ${styles.mobileCenter}`}>
            {/* Headline */}
            <h1 style={{ color: 'white', fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 1.05, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
              One Marketplace for <br />
              <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Construction & Property</span>
            </h1>

            {/* Sub */}
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '640px' }}>
              Search verified builders, architects, material suppliers, property portals, maintenance vendors, and BOQ support through Buildogram.
            </p>

            {/* Marketplace Action Panel */}
            <div className={styles.actionPanel} style={{ textAlign: 'left' }}>
              <div className={styles.actionPanelTitle}>What do you need today?</div>
              <form onSubmit={handleMarketplaceSearch}>
                <div className={styles.actionGrid}>
                  <input 
                    type="text" 
                    className={styles.actionInput} 
                    placeholder="Search builder, cement, property..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <select 
                    className={styles.actionInput}
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Builder">Home Construction</option>
                    <option value="Architect">Architect</option>
                    <option value="Interior Designer">Interior Designer</option>
                    <option value="Material Supplier">Material Supplier</option>
                    <option value="Solar">Solar</option>
                    <option value="Home Automation">Home Automation</option>
                    <option value="Elevators">Elevators</option>
                    <option value="Waterproofing">Waterproofing</option>
                    <option value="Buy/Sell Property">Buy/Sell Property</option>
                    <option value="Rent/Lease Property">Rent/Lease Property</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="BOQ Review">BOQ Review</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px', fontSize: '15px' }}>Find Options</button>
                  <Link href="/contact" className="btn btn-outline" style={{ flex: 1, padding: '14px', fontSize: '15px', justifyContent: 'center' }}>Request Quote</Link>
                </div>
              </form>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <Link href="/partners/directory?category=Builder" className={styles.quickChip}>Find Builder</Link>
              <Link href="/partners/directory?category=Architect" className={styles.quickChip}>Find Architect</Link>
              <Link href="/materials" className={styles.quickChip}>Request Material Quote</Link>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className={styles.quickChip}>Buy/Sell Property</a>
              <Link href="/partners/register" className={styles.quickChip}>Join as Partner</Link>
            </div>
          </div>

          {/* Right Visual (Marketplace Dashboard Cards) */}
          <div className={styles.heroVisual}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '420px', marginLeft: 'auto' }}>
              
              <div className={styles.dashboardCardDark}>
                <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Verified Categories</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white' }}>Builders</span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white' }}>Architects</span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white' }}>Suppliers</span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white' }}>Solar</span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white' }}>Waterproofing</span>
                </div>
              </div>

              <div className={styles.dashboardCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>Material Quotes</div>
                  <span style={{ background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Active</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748B' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🧱 Cement</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⛓️ Steel</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⏳ Sand</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⚡ Electrical</span>
                </div>
              </div>

              <div className={styles.dashboardCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>Property Portals</div>
                  <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Integrated</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ border: '1px solid #E2E8F0', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>Buy / Sell</div>
                  <div style={{ border: '1px solid #E2E8F0', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>Rent / Lease</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── INTENT STRIP ── */}
      <section className={styles.intentStrip}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>Start with what you need</h2>
          </div>
          <div className={styles.intentGrid}>
            <Link href="/partners/directory?category=Builder" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏗️</div>
              I want to build a home
            </Link>
            <Link href="/partners/directory?category=Architect" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📐</div>
              I need an architect/designer
            </Link>
            <Link href="/materials" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧱</div>
              I want material prices
            </Link>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏠</div>
              I want to buy/sell property
            </a>
            <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔑</div>
              I want to rent/lease property
            </a>
            <Link href="/partners/register" className={styles.intentCard}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤝</div>
              I want to become a partner
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ MARKETPLACE OVERVIEW ══════════════════ */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="tag">Marketplace Overview</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '20px', color: '#292929' }}>
              One Ecosystem.<br />Endless Opportunities.
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '18px', lineHeight: 1.7 }}>
              Buildogram brings together the people, services, records, and opportunities involved in property ownership — from construction and materials to listings, maintenance, and project showcases.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOR PROPERTY OWNERS ══════════════════ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>For Property Owners</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: '12px', color: '#292929' }}>Plan, Build, and Manage Everything</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginTop: '12px', maxWidth: '600px' }}>
              Plan construction, compare BOQs, request materials, list properties with 360° tours, maintain property records, and manage everything through Buildogram.
            </p>
          </div>
          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              { icon: '🏗️', title: 'Build Your Home', href: '/construction' },
              { icon: '📊', title: 'Review BOQ & Plans', href: '/boq-audit' },
              { icon: '🧱', title: 'Source Materials', href: '/materials' },
              { icon: '🛂', title: 'Create Property Passport', href: '/property-passport' },
              { icon: '🏡', title: 'Buy/Sell Properties', href: 'https://www.realproprealty.com' },
              { icon: '🔧', title: 'Maintain Property', href: '/maintenance' },
            ].map(s => (
              <Link key={s.title} href={s.href} 
                target={s.href.startsWith('http') ? '_blank' : undefined} 
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined} 
                style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ height: '100%', padding: '24px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '18px', color: '#292929', marginBottom: '8px' }}>{s.title}</h3>
                  <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOR PROFESSIONALS ══════════════════ */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>For Builders, Contractors & Architects</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: '12px', color: '#292929' }}>Showcase Work & Find Opportunities</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginTop: '12px', maxWidth: '600px' }}>
              Showcase your work, build your verified profile, receive opportunities, collaborate on content, and connect with Buildogram’s property and material ecosystem.
            </p>
          </div>
          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              { icon: '✅', title: 'Create Verified Profile', href: '/partners' },
              { icon: '📸', title: 'Showcase Projects', href: '/partners/directory' },
              { icon: '🎯', title: 'Receive Opportunities', href: '/partners' },
              { icon: '🎥', title: 'Collaborate on Reels', href: '/partners' },
              { icon: '🤝', title: 'Connect with Material Network', href: '/materials' },
            ].map(s => (
              <Link key={s.title} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ height: '100%', padding: '24px', background: 'white' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '18px', color: '#292929', marginBottom: '8px' }}>{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PROPERTY PORTALS ══════════════════ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>For Property Seekers</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', marginTop: '12px', color: '#292929' }}>Property Portals Powered by Buildogram</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
              Explore dedicated property platforms connected to the Buildogram ecosystem — RealPropRealty for buy/sell properties and ToLetBoardChennai for rent/lease properties.
            </p>
          </div>
          <div className="grid-2" style={{ gap: '24px' }}>
            
            <div className="card" style={{ padding: '40px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🏢</div>
              <h3 style={{ fontSize: '24px', color: '#292929', marginBottom: '16px' }}>Buy/Sell Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                Explore properties for buying and selling through RealPropRealty with a dedicated property-first experience.
              </p>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Visit RealPropRealty <span>↗</span>
              </a>
            </div>

            <div className="card" style={{ padding: '40px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🔑</div>
              <h3 style={{ fontSize: '24px', color: '#292929', marginBottom: '16px' }}>Rent/Lease Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                Find rental and lease property opportunities through ToLetBoardChennai with a focused rental-first experience.
              </p>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Visit ToLetBoardChennai <span>↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ INFRASTRUCTURE LAYER ══════════════════ */}
      <section className="section" style={{ background: 'var(--secondary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag" style={{ background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', border: '1px solid rgba(252, 110, 32, 0.28)' }}>Marketplace Support</span>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '24px' }}>
              Clarity & Records<br />Across the Ecosystem
            </h2>
          </div>
          
          <div className="grid-3" style={{ gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛂</div>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>Property Passport</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>
                Every property needs a record. Buildogram Property Passport helps organize BOQ records, documents, materials, maintenance, quality proof, and listing readiness.
              </p>
              <Link href="/property-passport" style={{ display: 'inline-block', marginTop: '20px', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>BOQ & Cost Clarity</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>
                Decision support before construction. Understand what is included, what is unclear, and what questions to ask before you finalize a contractor.
              </p>
              <Link href="/boq-audit" style={{ display: 'inline-block', marginTop: '20px', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔧</div>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>Property Maintenance</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>
                After-construction and after-listing support. Connect with reliable maintenance vendors for repairs, AMC, and long-term upkeep.
              </p>
              <Link href="/maintenance" style={{ display: 'inline-block', marginTop: '20px', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="section" style={{ background: 'var(--gradient-orange)', color: '#1A1A1A', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '20px', fontWeight: 800 }}>Join the Construction & Property Marketplace</h2>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 500, color: 'rgba(0,0,0,0.7)' }}>
            Find construction support, verified partners, material suppliers, 360° property listings, and digital property records — all in one platform.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ background: '#1A1A1A', color: 'white' }}>Buy/Sell Properties</a>
            <Link href="/partners" className="btn btn-lg" style={{ background: 'white', color: '#1A1A1A', border: 'none' }}>Join as Partner</Link>
            <Link href="/materials" className="btn btn-lg" style={{ background: 'white', color: '#1A1A1A', border: 'none' }}>Request Material Quote</Link>
            <Link href="/contact" className="btn btn-lg" style={{ background: 'transparent', color: '#1A1A1A', border: '2px solid rgba(0,0,0,0.2)' }}>Start Construction Consultation</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
