import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import PartnerJoinForm from './PartnerJoinForm';

export const metadata = generateSEOMetadata({
title: 'Join Buildogram Partner Marketplace | Builders, Contractors, Suppliers',
  description: 'Join Buildogram\'s partner ecosystem. Get leads, verified profile, project showcase, and material benefits. Grow your construction business.',
  path: '/partners',
});

const partnerTypes = [
  { icon: '🏗️', type: 'Builders', benefit: 'Showcase projects, get verified, reach property owners who want accountability.' },
  { icon: '👷', type: 'Contractors', benefit: 'Get project leads, material benefits, verified contractor badge and proof records.' },
  { icon: '📐', type: 'Architects', benefit: 'Showcase designs, get client leads, and expand your portfolio.' },
  { icon: '🔧', type: 'Structural Engineers', benefit: 'Get consulting leads, showcase certifications, add value to Buildogram projects.' },
  { icon: '🎨', type: 'Interior Designers', benefit: 'Showcase interiors, get renovation and interior leads.' },
  { icon: '🧱', type: 'Material Suppliers', benefit: 'Sell through Buildogram marketplace, receive quote requests, become verified.' },
  { icon: '🏠', type: 'Real Estate Agents', benefit: 'List properties, get buyer/tenant leads, integrate 360 tours and Passport.' },
  { icon: '🔨', type: 'Maintenance Vendors', benefit: 'Receive maintenance requests, get AMC leads, work with Buildogram customers.' },
];

const benefits = [
  { icon: '🎯', title: 'Quality Leads', desc: 'Get pre-qualified leads from homeowners and property owners in your service area.' },
  { icon: '✅', title: 'Verified Profile', desc: 'Buildogram-verified badge that signals trust to potential customers.' },
  { icon: '💼', title: 'Project Showcase', desc: 'Your best projects featured on the Buildogram platform and website.' },
  { icon: '🧱', title: 'Material Benefits', desc: 'Access our supplier network for better material rates on your projects.' },
];

export default function PartnersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(252, 110, 32, 0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Ecosystem</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Grow your business<br />
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>with Buildogram.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Join Chennai's growing construction and property ecosystem. Get leads, verified profile, project showcase, and material benefits.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#join" className="btn btn-primary btn-lg">Join Partner Network</Link>
            <Link href="/contact" className="btn btn-lg btn-outline-light">Talk to Us First</Link>
          </div>
        </div>
      </section>

      {/* ── Partner Types ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Who Can Partner</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>We work with every property professional</h2>
          </div>
          <div className="grid-4">
            {partnerTypes.map(p => (
              <div key={p.type} className="card card-hover">
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: '#292929' }}>{p.type}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5 }}>{p.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Benefits ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Partner Benefits</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>What you get as a Buildogram Partner</h2>
          </div>
          <div className="grid-3">
            {benefits.map(b => (
              <div key={b.title} style={{ display: 'flex', gap: '16px', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', background: '#F9F9F9' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>{b.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Form ── */}
      <section id="join" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Join the Partner Network</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Apply now. Our team will contact you within 24 hours.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <PartnerJoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
