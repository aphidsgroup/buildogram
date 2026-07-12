import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';
import SurveyRequirementClient from './SurveyRequirementClient';

export const metadata = generateSEOMetadata({
  title: 'AI Survey Requirement Builder | Know Your Land Survey Needs | Buildogram',
  description:
    'Answer 5 questions and our AI tells you exactly which land survey you need for your Chennai plot — DGPS, Drone, Topographic or Layout Marking. Updated July 2026.',
  path: '/ai-survey-requirement-builder',
});

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const EXAMPLES = [
  {
    id: 'ex-1',
    tag: 'Residential Plot',
    project: '2,400 sqft residential plot, OMR, flat land',
    output: [
      { label: 'Survey Type', value: 'DGPS Topographic Survey' },
      { label: 'Deliverables', value: 'Contour map (0.5m interval), boundary markers, area certificate, Google-overlay KML' },
      { label: 'Equipment', value: 'RTK GNSS receiver, total station' },
      { label: 'Est. Duration', value: '1 day' },
    ],
  },
  {
    id: 'ex-2',
    tag: 'Villa Layout',
    project: '5-acre agricultural land for villa layout, ECR',
    output: [
      { label: 'Survey Type', value: 'DGPS + Drone Survey' },
      { label: 'Deliverables', value: 'Orthorectified aerial map, volumetric analysis, boundary demarcation, subdivision layout overlay' },
      { label: 'Equipment', value: 'DJI Phantom 4 RTK, GNSS base station' },
      { label: 'Duration', value: '2 days' },
    ],
  },
  {
    id: 'ex-3',
    tag: 'Due Diligence',
    project: 'Purchase due diligence, plot in Tambaram',
    output: [
      { label: 'Survey Type', value: 'Land Survey + Boundary Verification' },
      { label: 'Deliverables', value: 'FMB sketch overlay, encroachment check, corner pillar placement, area reconciliation report' },
      { label: 'Equipment', value: 'Total station, FMB reference sheets' },
      { label: 'Duration', value: '4-6 hours' },
    ],
  },
  {
    id: 'ex-4',
    tag: 'Foundation Layout',
    project: 'Borewell / pile point marking, G+1 house in Anna Nagar',
    output: [
      { label: 'Survey Type', value: 'Structural Layout Marking' },
      { label: 'Deliverables', value: 'Column grid marking on ground, pile location marking per structural drawing, setback verification' },
      { label: 'Equipment', value: 'Total station, structural drawing overlay' },
      { label: 'Duration', value: '4 hours' },
    ],
  },
  {
    id: 'ex-5',
    tag: 'Industrial Site',
    project: '15-acre industrial site, Kanchipuram',
    output: [
      { label: 'Survey Type', value: 'DGPS + Drone + Topographic' },
      { label: 'Deliverables', value: 'DTM model, contour map, cut-fill analysis, access road alignment, area breakdown by zone' },
      { label: 'Equipment', value: 'Drone with LiDAR + GNSS base, total station' },
      { label: 'Duration', value: '3-4 days' },
    ],
  },
];

const SURVEY_TYPES = [
  { icon: '📡', name: 'DGPS Survey', desc: 'High-accuracy boundary mapping using RTK satellite receivers anchored to national geodetic reference points (±2–5 cm accuracy).' },
  { icon: '🚁', name: 'Drone Survey', desc: 'Aerial mapping using UAVs for large plots, topographic analysis, volumetric computation, and orthorectified aerial imagery.' },
  { icon: '📐', name: 'Topographic Survey', desc: 'Contour maps at defined intervals for site planning, drainage design, and cut-fill earthwork estimation.' },
  { icon: '🗺️', name: 'Land Survey', desc: 'Boundary verification with FMB sketch overlay, encroachment checks, and corner pillar placement for ownership clarity.' },
  { icon: '🏗️', name: 'Pile Point Marking', desc: 'Foundation point layout transferred directly from structural drawings onto the plot using total station equipment.' },
  { icon: '📏', name: 'Construction Layout Marking', desc: 'Column grid stakeout on site aligned with approved architectural plans — essential before slab or excavation begins.' },
  { icon: '🔩', name: 'Soil Investigation', desc: 'Bore log analysis and Safe Bearing Capacity (SBC) value testing to inform foundation design decisions.' },
  { icon: '🌋', name: 'Volume Survey', desc: 'Cut-fill calculation for earthwork planning, pricing, and contractor billing verification on large sites.' },
];

const FAQS = [
  {
    q: 'Do I need a survey before applying for CMDA plan approval?',
    a: 'Yes. CMDA requires a site plan prepared from a licensed surveyor\'s measurements for any building plan approval. Without this, your application will be rejected at document verification.',
  },
  {
    q: 'What is the difference between DGPS and a regular survey?',
    a: 'A regular survey uses a total station (local reference), while DGPS uses satellite signals (RTK GNSS) anchored to national geodetic reference points. DGPS is more accurate (±2–5 cm) and produces deliverables with geographic coordinates usable in GIS systems.',
  },
  {
    q: 'Can your team mark pile locations directly from the structural drawing?',
    a: 'Yes. Our survey team can translate the column/pile grid from your structural drawing onto the actual plot using total station layout marking. This is essential before excavation or piling work begins.',
  },
  {
    q: 'Do you provide the FMB sketch along with the survey report?',
    a: 'Yes. We include the government-issued FMB (Field Measurement Book) sketch overlay in all boundary verification surveys.',
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <main style={{ paddingTop: '0', paddingBottom: '80px' }}>

        {/* ── HERO ── */}
        <section
          style={{
            background: 'var(--secondary)',
            padding: '80px 24px 64px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(252,110,32,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: '-60px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(252,110,32,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <nav style={{ marginBottom: '24px', fontSize: '13px' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'rgba(255,255,255,0.35)', margin: '0 8px' }}>›</span>
              <Link href="/ai-tools" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>AI Tools</Link>
              <span style={{ color: 'rgba(255,255,255,0.35)', margin: '0 8px' }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>AI Survey Requirement Builder</span>
            </nav>

            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(252,110,32,0.15)',
                  border: '1px solid rgba(252,110,32,0.4)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '5px 14px',
                  borderRadius: '100px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <span>⚡</span> AI-Powered Tool
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              AI Survey{' '}
              <span style={{ color: 'var(--primary)' }}>Requirement Builder</span>
            </h1>

            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Updated: July 2026 | AI-Engineered Workflows
            </p>

            <p
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.75,
                maxWidth: '660px',
                margin: '0 auto 36px',
              }}
            >
              Not sure what type of land survey you need — DGPS, Drone, or Topographic? Answer 5
              questions about your plot and project. Our AI tells you exactly which survey types are
              required, what deliverables to ask for, and what equipment your surveyor must bring.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { icon: '📡', label: '8 survey types supported' },
                { icon: '🗺️', label: '180+ plots surveyed' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '100px',
                    padding: '8px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI TOOL ── */}
        <section style={{ background: '#F8FAFC', padding: '64px 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '12px',
                padding: '14px 20px',
                marginBottom: '32px',
              }}
            >
              <span style={{ fontSize: '18px', marginTop: '1px' }}>ℹ️</span>
              <p style={{ fontSize: '14px', color: '#92400E', margin: 0, lineHeight: 1.6 }}>
                <strong>Advisory notice:</strong> AI-generated outputs are based on established
                survey frameworks and Chennai site conditions. Review with a licensed surveyor
                before procurement.
              </p>
            </div>

            <SurveyRequirementClient />
          </div>
        </section>

        {/* ── EXAMPLES ── */}
        <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(252,110,32,0.1)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '100px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Real Outputs
              </span>
              <h2
                style={{
                  fontSize: 'clamp(22px, 4vw, 34px)',
                  fontWeight: 800,
                  color: 'var(--secondary)',
                  margin: '0 auto 12px',
                  letterSpacing: '-0.02em',
                }}
              >
                AI-Generated Survey Briefs{' '}
                <span style={{ color: 'var(--primary)' }}>(Real Examples)</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text)', maxWidth: '560px', margin: '0 auto' }}>
                Actual outputs produced by the AI engine for real project scenarios in Chennai and Tamil Nadu.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {EXAMPLES.map((ex) => (
                <div
                  key={ex.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      background: 'var(--secondary)',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(252,110,32,0.2)',
                        color: 'var(--primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '100px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ex.tag}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '6px',
                      }}
                    >
                      Project Input
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--secondary)', margin: 0, fontWeight: 600 }}>
                      {ex.project}
                    </p>
                  </div>

                  <div style={{ padding: '16px 20px', flex: 1 }}>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>⚡</span> AI Output
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {ex.output.map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#64748B',
                              minWidth: '100px',
                              paddingTop: '2px',
                              flexShrink: 0,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {label}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: 500, lineHeight: 1.5 }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SURVEY TYPES EXPLAINED ── */}
        <section style={{ background: 'var(--secondary)', padding: '72px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(252,110,32,0.15)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '100px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Reference Guide
              </span>
              <h2
                style={{
                  fontSize: 'clamp(22px, 4vw, 34px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 auto 12px',
                  letterSpacing: '-0.02em',
                }}
              >
                Survey Types <span style={{ color: 'var(--primary)' }}>Explained</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' }}>
                Eight distinct survey methodologies used in Chennai residential, commercial, and industrial construction projects.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {SURVEY_TYPES.map(({ icon, name, desc }) => (
                <div
                  key={name}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '12px', lineHeight: 1 }}>{icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    {name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: '#F8FAFC', padding: '72px 24px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(252,110,32,0.1)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '100px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                FAQ
              </span>
              <h2
                style={{
                  fontSize: 'clamp(22px, 4vw, 32px)',
                  fontWeight: 800,
                  color: 'var(--secondary)',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {FAQS.map(({ q, a }, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    padding: '24px 28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px' }}>
                    <span
                      style={{
                        background: 'rgba(252,110,32,0.12)',
                        color: 'var(--primary)',
                        fontSize: '12px',
                        fontWeight: 800,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      Q
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0, lineHeight: 1.4 }}>
                      {q}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span
                      style={{
                        background: '#DCFCE7',
                        color: '#16A34A',
                        fontSize: '12px',
                        fontWeight: 800,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      A
                    </span>
                    <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>
                      {a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #FC6E20 0%, #e85d12 100%)',
            padding: '64px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚁</div>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 34px)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '14px',
                letterSpacing: '-0.02em',
              }}
            >
              Need a Survey Team on Site?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto 36px',
              }}
            >
              Our DGPS and drone survey teams operate across Chennai, ECR, OMR, and Kanchipuram.
              Reach out for a same-week site visit and deliverable timeline.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <Link
                href="/land-survey-chennai"
                style={{
                  display: 'inline-block',
                  background: '#FFFFFF',
                  color: '#FC6E20',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '14px 32px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                Land Survey Chennai
              </Link>
              <Link
                href="/dgps-survey-chennai"
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '14px 32px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.4)',
                }}
              >
                DGPS Survey Chennai
              </Link>
            </div>
          </div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section style={{ background: '#FFFFFF', padding: '48px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              More AI Tools
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
              {[
                ['All AI Tools', '/ai-tools'],
                ['AI Cost Estimator', '/ai-construction-cost-estimator'],
                ['AI BOQ Checker', '/ai-boq-checker'],
                ['AI Quote Analyzer', '/ai-contractor-quote-analyzer'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'inline-block',
                    padding: '9px 20px',
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '100px',
                    color: 'var(--secondary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── BREADCRUMB SCHEMA ── */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI Survey Requirement Builder', path: '/ai-survey-requirement-builder' },
        ]}
      />
    </>
  );
}