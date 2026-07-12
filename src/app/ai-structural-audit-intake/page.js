import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import StructuralAuditClient from './StructuralAuditClient';

export const metadata = generateSEOMetadata({
  title: 'AI Structural Audit Intake | Prepare Your Building Audit Brief | Buildogram',
  description:
    'Describe your building concerns in plain language. Our AI prepares a structured engineer brief for your structural audit in Chennai. Updated July 2026.',
  path: '/ai-structural-audit-intake',
});

const EXAMPLES = [
  {
    building: '20-year-old G+1, Velachery',
    concern: 'Diagonal cracks above windows, roof leakage, plaster peeling in multiple rooms',
    brief: 'Recommend: Visual inspection + Rebound Hammer Test on beams/columns + UPV Test on slab + Carbonation Depth Test',
    priority: 'HIGH',
    reason: 'Crack pattern suggests differential settlement or active rebar corrosion',
    tests: ['Rebound Hammer', 'UPV Test', 'Carbonation Depth'],
  },
  {
    building: 'New construction G+2, OMR (6 months old)',
    concern: 'Contractor says final inspection passed, but slab has hairline cracks on soffit',
    brief: 'Recommend: Core Cut Test on slab to verify M25 compliance + Rebar cover check (cover meter scan) + Engineer review of pour records',
    priority: 'MEDIUM',
    reason: 'Hairline cracks in new slabs may indicate shrinkage or inadequate curing',
    tests: ['Core Extraction', 'Cover Meter Scan', 'Pour Record Review'],
  },
  {
    building: '35-year-old apartment, T Nagar (ground floor)',
    concern: 'Ground floor column has a vertical crack, owner worried about stability',
    brief: 'Recommend: Schmidt Hammer Test on column + Carbonation Test + Load verification against original structural drawing',
    priority: 'HIGH',
    reason: 'Vertical cracks in columns may indicate shear failure or buckling — restrict area until inspected',
    tests: ['Rebound Hammer', 'Carbonation Test', 'Load Analysis'],
  },
  {
    building: 'Pre-purchase 15-year-old villa, ECR',
    concern: 'Buying a resale villa, want full structural clearance before signing',
    brief: 'Recommend: Comprehensive pre-purchase audit — Visual + Rebound Hammer (all load-bearing) + Rebar Scan (slab soffit) + Moisture mapping',
    priority: 'ROUTINE',
    reason: 'Standard pre-purchase due diligence; ECR coastal salt exposure may affect rebar condition',
    tests: ['Visual Inspection', 'Rebound Hammer', 'Rebar Scanning', 'Moisture Mapping'],
  },
];

const CHECKLIST = [
  'Visual inspection of all load-bearing walls, beams, and columns',
  'Rebound Hammer Test for concrete compressive strength (IS 13311 Part 2)',
  'Ultrasonic Pulse Velocity (UPV) test for internal voids (IS 13311 Part 1)',
  'Rebar scanning — cover depth and corrosion detection',
  'Carbonation depth testing for rebar protection',
  'Crack mapping — width, depth, and pattern classification',
  'Load capacity assessment vs current loading',
  'Remediation recommendations with cost estimates',
];

const FAQS = [
  {
    q: 'Can I get an audit done on a newly built building?',
    a: 'Yes — and it\'s strongly recommended within 6 months of completion. A post-construction audit verifies that what was built matches the structural design. Many quality issues (concrete grade, cover depth, rebar placement) are only detectable at this stage before plaster covers everything.',
  },
  {
    q: 'How long does a structural audit take?',
    a: 'A standard residential audit (G+2) takes 1 working day on-site. The full written report is delivered within 5–7 working days. Commercial or institutional audits may require 2–3 days on-site depending on floor count and area.',
  },
  {
    q: 'Is the audit report accepted for CMDA regularization?',
    a: 'Yes. Buildogram structural audit reports are issued by licensed structural engineers certified under Tamil Nadu norms and are accepted by the Greater Chennai Corporation and CMDA for regularization applications and occupancy certificates.',
  },
  {
    q: 'Can you audit a building built without structural drawings?',
    a: 'Yes. We conduct an "as-built" structural audit where our engineers create a structural drawing from site measurements, then assess structural adequacy against IS 456 and relevant loading codes.',
  },
];

const priorityColors = {
  HIGH: { bg: '#FEF2F2', border: '#FECACA', text: '#DC2626', badge: '#DC2626' },
  MEDIUM: { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706', badge: '#D97706' },
  ROUTINE: { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A', badge: '#16A34A' },
};

export default function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--secondary)',
          padding: '80px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '480px',
            height: '480px',
            background: 'radial-gradient(circle, rgba(252,110,32,0.15) 0%, transparent 65%)',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/ai-tools" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>AI Tools</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'white' }}>AI Structural Audit Intake</span>
          </nav>

          <span
            style={{
              display: 'inline-block',
              background: 'rgba(252,110,32,0.15)',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              borderRadius: '100px',
              border: '1px solid rgba(252,110,32,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '20px',
            }}
          >
            AI-Engineered Workflow · Updated July 2026
          </span>

          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '720px',
            }}
          >
            AI Structural{' '}
            <span style={{ color: 'var(--primary)' }}>Audit Intake</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '18px',
              lineHeight: 1.75,
              maxWidth: '620px',
              marginBottom: '28px',
            }}
          >
            Concerned about cracks, tilting, or aging structural elements? Describe your building
            in plain language — our AI prepares a structured engineer brief so your structural
            audit is focused and comprehensive from day one.
          </p>

          {/* Emergency warning */}
          <div
            style={{
              background: 'rgba(220,38,38,0.18)',
              border: '1px solid rgba(220,38,38,0.4)',
              borderRadius: '12px',
              padding: '14px 20px',
              marginBottom: '28px',
              maxWidth: '620px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🚨</span>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
              <strong>Emergency:</strong> If your building has visible major distress — wide cracks,
              tilting walls, or collapsed structural elements — do not use this tool.{' '}
              <Link href="/contact" style={{ color: '#FCA5A5', fontWeight: 700 }}>
                Call us immediately →
              </Link>
            </p>
          </div>

          {/* Stat badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { icon: '🏛️', text: '320+ audits facilitated' },
              { icon: '✅', text: 'Licensed structural engineers only' },
              { icon: '📋', text: 'CMDA-accepted reports' },
            ].map((s) => (
              <span
                key={s.text}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                }}
              >
                {s.icon} {s.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOL SECTION ── */}
      <section style={{ background: '#F8FAFC', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '10px' }}>
              Describe Your Building & Concerns
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              Answer the intake questions below. Our AI prepares a structured audit brief — reviewed by a Buildogram structural engineer before contact.
            </p>
          </div>
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '10px',
              padding: '14px 20px',
              marginBottom: '28px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              maxWidth: '760px',
              margin: '0 auto 28px',
            }}
          >
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '13px', color: '#78350F', lineHeight: 1.6 }}>
              AI outputs are advisory. Every audit brief is reviewed by a licensed structural engineer before being acted upon.
            </p>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid #E2E8F0',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <StructuralAuditClient />
          </div>
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FFF7ED',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 16px',
                borderRadius: '100px',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Real Examples
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: 'var(--secondary)' }}>
              Example Audit Briefs Our AI Prepared
            </h2>
            <p style={{ color: '#64748B', maxWidth: '520px', margin: '12px auto 0', lineHeight: 1.7 }}>
              These are real-style examples showing how the AI translates plain-language concerns into structured engineer briefs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {EXAMPLES.map((ex, i) => {
              const colors = priorityColors[ex.priority];
              return (
                <div
                  key={i}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      background: 'var(--secondary)',
                      padding: '18px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                        Building
                      </p>
                      <p style={{ color: 'white', fontWeight: 700, fontSize: '14px', margin: 0 }}>{ex.building}</p>
                    </div>
                    <span
                      style={{
                        background: colors.badge,
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '100px',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {ex.priority}
                    </span>
                  </div>

                  <div style={{ padding: '20px' }}>
                    {/* Concern */}
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>Owner's Concern</p>
                      <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                        "{ex.concern}"
                      </p>
                    </div>

                    {/* AI Brief */}
                    <div
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '10px',
                        padding: '14px',
                        marginBottom: '14px',
                      }}
                    >
                      <p style={{ fontSize: '11px', fontWeight: 700, color: colors.text, textTransform: 'uppercase', marginBottom: '8px' }}>
                        ⚡ AI-Generated Engineer Brief
                      </p>
                      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: 0 }}>{ex.brief}</p>
                    </div>

                    {/* Why */}
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px', lineHeight: 1.5 }}>
                      <strong>Reason:</strong> {ex.reason}
                    </p>

                    {/* Test tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {ex.tests.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: '#F1F5F9',
                            color: '#475569',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: '100px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS AFTER ── */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            What Happens After You Submit the Intake
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { step: '01', title: 'AI Prepares Brief', desc: 'Your inputs are structured into a technical audit brief with recommended tests and priority level.' },
              { step: '02', title: 'Engineer Reviews', desc: 'A licensed structural engineer reviews the AI brief, adds professional context, and contacts you within 24 hours.' },
              { step: '03', title: 'Site Visit Scheduled', desc: 'We schedule the site visit at your convenience with the appropriate testing equipment.' },
              { step: '04', title: 'Report Delivered', desc: 'Full written audit report with findings, photos, and remediation recommendations within 5–7 working days.' },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(252,110,32,0.15)',
                    border: '2px solid rgba(252,110,32,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '16px',
                    fontWeight: 900,
                    color: 'var(--primary)',
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT AUDITS COVER ── */}
      <section style={{ background: '#F8FAFC', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '36px', textAlign: 'center' }}>
            What Our Structural Audits Cover
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {CHECKLIST.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#DCFCE7',
                    color: '#16A34A',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'white', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '36px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#F8FAFC', borderRadius: '14px', padding: '24px', border: '1px solid #E2E8F0', borderLeft: '4px solid var(--primary)' }}>
                <p style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px', fontSize: '15px', margin: '0 0 10px' }}>
                  Q: {faq.q}
                </p>
                <p style={{ color: '#374151', lineHeight: 1.75, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FC6E20 0%, #e85d12 100%)',
          padding: '64px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Ready for a Structural Audit?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            Use the intake tool above, or contact our team directly to schedule a Buildogram structural audit.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/structural-audit-chennai"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#FC6E20',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '15px',
              }}
            >
              View Structural Audit Services →
            </Link>
            <Link
              href="/contact?type=audit"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '15px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Talk to an Engineer
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI Structural Audit Intake', path: '/ai-structural-audit-intake' },
        ]}
      />
    </>
  );
}
