import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'AI-Engineered Construction Tools | BOQ Checker, Cost Estimator & More | Buildogram',
  description: 'Buildogram AI-engineered tools help you estimate construction costs, check BOQs, analyze contractor quotes, plan materials, and prepare audit intakes — all powered by AI-driven workflows calibrated on Chennai construction data.',
  path: '/ai-tools',
});

const AI_TOOLS = [
  {
    icon: '₹',
    title: 'AI Construction Cost Estimator',
    desc: 'Get an AI-engineered preliminary construction cost estimate based on your plot size, floors, location, and specification level.',
    href: '/ai-construction-cost-estimator',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['Free', 'Instant', 'Chennai Calibrated'],
  },
  {
    icon: '📋',
    title: 'AI BOQ Checker',
    desc: 'Upload or describe your BOQ and let our AI-engineered checker identify missing items, vague specifications, and rate anomalies before you sign.',
    href: '/ai-boq-checker',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['PDF / Excel', 'Instant Analysis', 'Engineer Reviewed'],
  },
  {
    icon: '🔍',
    title: 'AI Contractor Quote Analyzer',
    desc: 'Paste your contractor quote and get an AI-driven breakdown of hidden costs, exclusions, and red flags before you sign the contract.',
    href: '/ai-contractor-quote-analyzer',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['Risk Detection', 'Payment Clause Analysis'],
  },
  {
    icon: '🧱',
    title: 'AI Material Requirement Estimator',
    desc: 'Estimate cement bags, steel MT, brick count, sand, and other material quantities for your project using AI-engineered calculation workflows.',
    href: '/ai-material-estimator',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['85+ Materials', 'IS Code Based', 'Procurement Ready'],
  },
  {
    icon: '🏛️',
    title: 'AI Structural Audit Intake',
    desc: 'Describe your building and concerns — our AI prepares a structured engineer brief for your structural audit, so the inspection is focused from day one.',
    href: '/ai-structural-audit-intake',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['320+ Audits', 'Licensed Engineers', 'CMDA Compliant'],
  },
  {
    icon: '📐',
    title: 'AI Survey Requirement Builder',
    desc: 'Not sure which survey you need — DGPS, Drone, or Topographic? Answer 5 questions and get an exact survey scope with deliverables list.',
    href: '/ai-survey-requirement-builder',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['8 Survey Types', 'Deliverables List', 'Equipment Spec'],
  },
  {
    icon: '🔩',
    title: 'AI Soil Test Requirement Builder',
    desc: 'Describe your site and building type to get an AI-engineered soil investigation scope — test types, borehole count, and report requirements.',
    href: '/ai-soil-test-requirement-builder',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['IS 1892 Based', 'SBC Certified'],
  },
  {
    icon: '🏗️',
    title: 'AI Pile Foundation BOQ Checker',
    desc: 'Check pile foundation BOQs for completeness — pile type, depth, load capacity, and mobilisation costs — using AI-engineered review.',
    href: '/ai-pile-foundation-boq-checker',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['Bored / Micro / DMC', 'Mobilisation Audit'],
  },
  {
    icon: '🏠',
    title: 'AI Property Passport Assistant',
    desc: 'Prepare your property documentation checklist using our AI-engineered assistant — drawings, warranties, material records, and maintenance logs.',
    href: '/ai-property-passport-assistant',
    badge: 'Live',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tags: ['Document Ready', 'Resale Optimized'],
  },
  {
    icon: '🧮',
    title: 'AI BOQ Calculator',
    desc: 'Generate a full engineer-checked Bill of Quantities for your residential project — 44 line items, COCENA Dec 2025 rates, per-floor breakdown, and margin analysis.',
    href: '/boq-calculator',
    badge: 'Beta',
    badgeColor: '#7C3AED',
    badgeBg: '#EDE9FE',
    tags: ['44 Line Items', 'PDF Export', 'Margin Analysis'],
  },
];

const STATS = [
  { value: '₹200Cr+', label: 'Construction Data' },
  { value: '10,000+', label: 'BOQs Analyzed' },
  { value: '1,200+', label: 'Chennai Projects' },
  { value: 'July 2026', label: 'Rates Updated' },
];

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
        {/* Decorative dots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Orange glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(252,110,32,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(252,110,32,0.15)',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              borderRadius: '100px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '20px',
              border: '1px solid rgba(252,110,32,0.3)',
            }}
          >
            AI-Engineered Workflows · Updated July 2026
          </span>

          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '760px',
              margin: '0 auto 20px',
            }}
          >
            AI-Engineered{' '}
            <span style={{ color: 'var(--primary)' }}>Construction Tools</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '18px',
              lineHeight: 1.7,
              maxWidth: '620px',
              margin: '0 auto 36px',
            }}
          >
            Evidence-backed AI tools designed for Chennai property owners, builders, and
            contractors. Built on real construction data — not generic AI responses.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px 32px',
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary)' }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main
        className="page"
        style={{ paddingTop: '64px', paddingBottom: '80px', background: '#F8FAFC' }}
      >
        <div className="container">

          {/* Tools Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '24px',
              marginBottom: '72px',
            }}
          >
            {AI_TOOLS.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '36px',
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      background: '#FFF7ED',
                      borderRadius: '14px',
                    }}
                  >
                    {tool.icon}
                  </span>
                  {tool.badge && (
                    <span
                      style={{
                        background: tool.badgeBg,
                        color: tool.badgeColor,
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '100px',
                      }}
                    >
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    color: 'var(--secondary)',
                    marginBottom: '10px',
                    lineHeight: 1.4,
                  }}
                >
                  {tool.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748B',
                    lineHeight: 1.65,
                    margin: '0 0 18px',
                    flex: 1,
                  }}
                >
                  {tool.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '100px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                  Use Tool →
                </span>
              </Link>
            ))}
          </div>

          {/* AI Disclaimer */}
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '14px',
              padding: '20px 28px',
              marginBottom: '48px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#78350F', lineHeight: 1.7 }}>
              <strong>AI Tools Disclaimer:</strong> All outputs are AI-generated and advisory in
              nature. They are based on Chennai construction market data calibrated as of July 2026.
              Always verify with a licensed structural engineer before making financial commitments
              or construction decisions. Buildogram engineers are available for follow-up
              consultations on any AI-generated output.
            </p>
          </div>

          {/* CTA Block */}
          <div
            style={{
              background: 'var(--secondary)',
              borderRadius: '20px',
              padding: '52px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.12) 0%, transparent 60%)',
              }}
            />
            <div style={{ position: 'relative' }}>
              <h2
                style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px' }}
              >
                AI Tools Give You Direction.{' '}
                <span style={{ color: 'var(--primary)' }}>Our Engineers Give You Certainty.</span>
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '28px',
                  maxWidth: '500px',
                  margin: '0 auto 28px',
                  fontSize: '16px',
                  lineHeight: 1.7,
                }}
              >
                Connect with a Buildogram structural engineer for a project-specific review,
                engineer-stamped BOQ, or on-site consultation.
              </p>
              <Link href="/contact?type=ai" className="btn btn-primary btn-lg">
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI-Engineered Construction Tools', path: '/ai-tools' },
        ]}
      />
    </>
  );
}
