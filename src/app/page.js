'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/* ─── Component ──────────────────────────────────────────── */

export default function Home() {
  return (
    <div className={styles.page}>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroAmbient} />
        <div className={styles.heroLine} />

        <div className={`container ${styles.heroContent} ${styles.mobileCenter}`}>
          <div>
            {/* Pill badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.25)', borderRadius: '999px', padding: '8px 20px', marginBottom: '32px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CCFF00', display: 'inline-block', boxShadow: '0 0 8px #CCFF00' }} />
              <span style={{ color: '#CCFF00', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Buildogram</span>
            </div>

            {/* Headline */}
            <h1 style={{ color: 'white', fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 1.05, marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
              The Construction &<br />
              <span style={{ color: '#CCFF00' }}>Property Marketplace</span>
            </h1>

            {/* Tagline */}
            <p style={{ fontFamily: 'DM Serif Text, serif', fontStyle: 'italic', color: '#BBA07A', fontSize: 'clamp(20px, 2.5vw, 26px)', marginBottom: '24px' }}>
              Showcase. Connect. Build.
            </p>

            {/* Sub */}
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '680px' }}>
              A platform where property owners, builders, contractors, suppliers, and real estate professionals connect through project showcases, verified partners, 360° property listings, material support, BOQ clarity, Property Passport records, and maintenance services.
            </p>

            {/* CTA row */}
            <div className={styles.btnRow}>
              <Link href="/about" className="btn btn-primary btn-lg">Explore Buildogram</Link>
              <Link href="/partners" className="btn btn-lg btn-outline" style={{ border: '2px solid rgba(255,255,255,0.3) !important', color: 'white !important' }}>Join the Marketplace</Link>
            </div>
            
            <div className={styles.btnRow} style={{ marginTop: '16px' }}>
               <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'rgba(255,255,255,0.7)' }}>Buy/Sell Properties →</a>
               <Link href="/materials" className="btn" style={{ color: 'rgba(255,255,255,0.7)' }}>Request Material Quote →</Link>
            </div>
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
            <span className="tag" style={{ background: 'rgba(204,255,0,0.12)', color: '#CCFF00', border: '1px solid rgba(204,255,0,0.2)' }}>Marketplace Support</span>
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
              <Link href="/property-passport" style={{ display: 'inline-block', marginTop: '20px', color: '#CCFF00', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>BOQ & Cost Clarity</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>
                Decision support before construction. Understand what is included, what is unclear, and what questions to ask before you finalize a contractor.
              </p>
              <Link href="/boq-audit" style={{ display: 'inline-block', marginTop: '20px', color: '#CCFF00', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔧</div>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>Property Maintenance</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6 }}>
                After-construction and after-listing support. Connect with reliable maintenance vendors for repairs, AMC, and long-term upkeep.
              </p>
              <Link href="/maintenance" style={{ display: 'inline-block', marginTop: '20px', color: '#CCFF00', fontWeight: 600, textDecoration: 'none' }}>Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="section" style={{ background: '#CCFF00', color: '#1A1A1A', textAlign: 'center' }}>
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
