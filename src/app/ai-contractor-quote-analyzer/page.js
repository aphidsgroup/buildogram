import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';
import QuoteAnalyzerClient from './QuoteAnalyzerClient';

export const metadata = generateSEOMetadata({
  title: 'AI Contractor Quote Analyzer | Detect Hidden Costs Before You Sign | Buildogram',
  description:
    'Upload your contractor quote. AI flags payment risks, missing scope, and hidden costs. Trained on 2,400+ Chennai construction contracts. Updated July 2026.',
  path: '/ai-contractor-quote-analyzer',
});

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const EXAMPLES = [
  {
    id: 1,
    project: '₹48L for G+1 in Perambur',
    redFlag: 'Foundation type not specified',
    risk:
      'Contractor can switch from pile to spread footing, saving them ₹3L at your expense — while delivering a structurally inferior foundation.',
    severity: 'HIGH',
  },
  {
    id: 2,
    project: '₹12.5L renovation, T Nagar',
    redFlag: '"Waterproofing: as required" with no quantity',
    risk:
      'Open-ended clause — expect ₹1.5–2L extra demand mid-project. "As required" is the most abused phrase in Chennai renovation quotes.',
    severity: 'HIGH',
  },
  {
    id: 3,
    project: '₹85L commercial, Guindy',
    redFlag: 'Payment: 40% advance on signing',
    risk:
      'High advance creates contractor dependency; industry standard is 10–15% mobilization. You lose all negotiation leverage once payment is made.',
    severity: 'MEDIUM',
  },
  {
    id: 4,
    project: '₹35L villa plot, ECR',
    redFlag: 'Compound wall excluded; "negotiable later"',
    risk:
      'Most ECR plots need 50–80 RM compound wall: ₹2.5–4L excluded from quoted scope. "Later" always costs more.',
    severity: 'MEDIUM',
  },
  {
    id: 5,
    project: '₹1.2Cr G+2, Sholinganallur',
    redFlag: 'Interior work described as "standard finish"',
    risk:
      'No tile brand, no paint grade, no fixture spec — this is a blank check for contractor upgrades billed as extras.',
    severity: 'HIGH',
  },
];

const RED_FLAGS = [
  {
    icon: '🏷️',
    title: 'Unspecified Material Brands',
    detail:
      'Quotes that say "ISI-grade tiles" or "branded paint" without naming the brand allow substitution to the cheapest option available.',
  },
  {
    icon: '💰',
    title: 'High Mobilization Advance (>20%)',
    detail:
      'An advance above 20% of project value before a single brick is laid significantly weakens your position if quality issues arise.',
  },
  {
    icon: '📝',
    title: '"As Required" Scope Items',
    detail:
      'Any scope item described as "as required," "if needed," or "based on site conditions" is an open billing invitation.',
  },
  {
    icon: '🏗️',
    title: 'Missing Compound Wall / Sump / OHT',
    detail:
      'These three elements are commonly excluded from base quotes and collectively add ₹3–6L to final project cost.',
  },
  {
    icon: '⏱️',
    title: 'No Penalty Clause for Delays',
    detail:
      'Without a defined liquidated damages clause, contractors have zero financial incentive to complete your project on schedule.',
  },
  {
    icon: '📅',
    title: 'Vague Payment Milestone Triggers',
    detail:
      '"On completion of first floor slab" — what does completion mean? Without measurable milestones, payment disputes are guaranteed.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Paste or Upload Your Quote',
    detail:
      'Accepts raw text, PDF, or Word documents. Our AI handles scanned PDFs via OCR, so even handwritten quotes can be analyzed.',
  },
  {
    step: '02',
    title: 'AI Parses Terms, Scope & Specs',
    detail:
      'The model identifies payment structure, included vs excluded scope, material specifications, and milestone definitions.',
  },
  {
    step: '03',
    title: 'Red Flags Ranked by Financial Risk',
    detail:
      'Each identified issue is categorized as High / Medium / Low risk with a plain-language explanation and estimated financial exposure.',
  },
  {
    step: '04',
    title: 'Download Risk Report',
    detail:
      'Export a structured PDF risk report to use as a negotiation tool before you sign any agreement with the contractor.',
  },
];

const FAQS = [
  {
    question: 'Is this the same as a BOQ check?',
    answer:
      'Different focus. BOQ checking analyzes the quantified items list for missing items and rate anomalies. Quote analysis focuses on contract terms, payment structure, scope exclusions, and legal clause risks. Both are complementary — many clients use both tools together.',
  },
  {
    question: 'Can I use this for renovation quotes?',
    answer:
      'Absolutely. Renovation quotes are especially prone to scope ambiguity — for example, "demolish and redo bathroom" — does that include plumbing, waterproofing, and tile, or just tiles? Our AI is specifically trained on Chennai renovation contracts to catch these patterns.',
  },
  {
    question: 'Do you share quotes with third parties?',
    answer:
      "No. All documents uploaded are processed by Buildogram's AI and deleted after analysis. We do not share your data with contractors, vendors, or third parties. Your quote contents are never used for model training without explicit consent.",
  },
  {
    question: 'What happens after I get the risk report?',
    answer:
      'You can either use it to negotiate directly with your contractor, or request a Buildogram engineer to facilitate a structured negotiation meeting. Our team has facilitated 400+ contractor negotiations across Chennai and surrounding areas.',
  },
];

const SEVERITY_STYLES = {
  HIGH: {
    badge: { background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' },
    label: 'HIGH RISK',
    borderColor: '#DC2626',
  },
  MEDIUM: {
    badge: { background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' },
    label: 'MEDIUM RISK',
    borderColor: '#D97706',
  },
  LOW: {
    badge: { background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' },
    label: 'LOW RISK',
    borderColor: '#16A34A',
  },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────── */}
      <section
        style={{
          background: 'var(--secondary)',
          paddingTop: '100px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(252,110,32,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(252,110,32,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        <div
          className="sectionInner"
          style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}
        >
          {/* breadcrumb */}
          <nav style={{ marginBottom: '24px', fontSize: '13px', color: '#94A3B8' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/ai-tools" style={{ color: '#94A3B8', textDecoration: 'none' }}>
              AI Tools
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>AI Contractor Quote Analyzer</span>
          </nav>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <span
              style={{
                background: 'rgba(252,110,32,0.15)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(252,110,32,0.3)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              AI-Engineered Workflow
            </span>
            <span
              style={{
                background: 'rgba(16,185,129,0.12)',
                color: '#10B981',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(16,185,129,0.25)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Free to Use
            </span>
          </div>

          {/* heading */}
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              color: '#F8FAFC',
              lineHeight: 1.1,
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            AI Contractor{' '}
            <span style={{ color: 'var(--primary)' }}>Quote Analyzer</span>
          </h1>

          {/* subtitle */}
          <p
            style={{
              fontSize: '13px',
              color: '#64748B',
              fontWeight: 600,
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Updated: July 2026 | AI-Engineered Workflows
          </p>

          {/* description */}
          <p
            style={{
              fontSize: '18px',
              color: '#94A3B8',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '680px',
            }}
          >
            Paste or upload your contractor quote. Our AI identifies{' '}
            <strong style={{ color: '#CBD5E1' }}>hidden costs</strong>,{' '}
            <strong style={{ color: '#CBD5E1' }}>exclusions buried in footnotes</strong>,{' '}
            <strong style={{ color: '#CBD5E1' }}>payment clause risks</strong>, and scope ambiguities —
            before you commit to a single rupee.
          </p>

          {/* stat badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {[
              { value: '2,400+', label: 'Quotes Analyzed' },
              { value: 'Avg ₹3.8L', label: 'Saved per Client' },
              { value: '94%', label: 'Flag Accuracy Rate' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: '130px',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. TOOL SECTION ─────────────────────── */}
      <section
        id="tool"
        style={{ background: '#F8FAFC', paddingTop: '72px', paddingBottom: '72px' }}
      >
        <div className="sectionInner" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          {/* section header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
              }}
            >
              Analyze Your Quote Now
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '520px', margin: '0 auto' }}>
              Paste your contractor quote text below. The AI scans for payment risks, scope gaps, and
              contract clause issues in seconds.
            </p>
          </div>

          {/* advisory banner */}
          <div
            style={{
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: '12px',
              padding: '14px 20px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '100px',
                flexShrink: 0,
              }}
            >
              ADVISORY
            </span>
            <span style={{ fontSize: '14px', color: '#92400E', lineHeight: 1.5 }}>
              AI outputs flag likely risk areas. Final contract review should be performed by a qualified
              construction lawyer or Buildogram-certified engineer.
            </span>
          </div>

          {/* client component */}
          <QuoteAnalyzerClient />
        </div>
      </section>

      {/* ── 3. EXAMPLES SECTION ─────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FEF2F2',
                color: '#DC2626',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '100px',
                border: '1px solid #FECACA',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Real Examples
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '14px',
              }}
            >
              Red Flags Our AI Caught
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '560px', margin: '0 auto' }}>
              These are real patterns extracted from Chennai contractor quotes — anonymized for privacy.
              Each one cost clients money before Buildogram&apos;s AI was involved.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {EXAMPLES.map((ex) => {
              const sev = SEVERITY_STYLES[ex.severity];
              return (
                <div
                  key={ex.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderLeft: `4px solid ${sev.borderColor}`,
                    borderRadius: '12px',
                    padding: '24px 28px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '20px',
                    alignItems: 'start',
                  }}
                >
                  {/* step number */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--secondary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {ex.id}
                  </div>

                  <div>
                    {/* project + severity */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)' }}>
                        {ex.project}
                      </span>
                      <span
                        style={{
                          ...sev.badge,
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '100px',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {sev.label}
                      </span>
                    </div>

                    {/* red flag */}
                    <div
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '10px',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>🚩</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#DC2626' }}>
                        {ex.redFlag}
                      </span>
                    </div>

                    {/* risk explanation */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                        <strong style={{ color: 'var(--secondary)' }}>Risk: </strong>
                        {ex.risk}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────── */}
      <section style={{ background: 'var(--secondary)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                color: '#F8FAFC',
                marginBottom: '12px',
              }}
            >
              How It Works
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
              From raw quote to structured risk report in under 60 seconds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: 'rgba(252,110,32,0.25)',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {step.step}
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#F1F5F9',
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMMON RED FLAGS GRID ─────────────── */}
      <section style={{ background: '#F1F5F9', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(252,110,32,0.1)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(252,110,32,0.2)',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              AI Detection Library
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
              }}
            >
              Common Red Flags We Detect
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '500px', margin: '0 auto' }}>
              Our model is trained on over 2,400 real Chennai contractor quotes. These are the most
              financially damaging patterns it has learned to identify.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {RED_FLAGS.map((flag) => (
              <div
                key={flag.title}
                style={{
                  background: '#ffffff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{flag.icon}</div>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  {flag.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.65, margin: 0 }}>
                  {flag.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION ──────────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Answers to the most common questions from clients who have used this tool.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '24px 28px',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 800,
                      fontSize: '18px',
                      lineHeight: 1.2,
                      flexShrink: 0,
                    }}
                  >
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#475569',
                    lineHeight: 1.7,
                    margin: 0,
                    paddingLeft: '28px',
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA SECTION ──────────────────────── */}
      <section
        style={{
          background: 'var(--secondary)',
          paddingTop: '80px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative blob */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(252,110,32,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="sectionInner"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(252,110,32,0.12)',
              border: '1px solid rgba(252,110,32,0.25)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '14px' }}>🛡️</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.05em',
              }}
            >
              PROTECT YOUR PROJECT
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 900,
              color: '#F8FAFC',
              marginBottom: '16px',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Analyze Your Quote{' '}
            <span style={{ color: 'var(--primary)' }}>Free</span>
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: '#94A3B8',
              marginBottom: '36px',
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '0 auto 36px',
            }}
          >
            Don&apos;t sign until you&apos;ve run your contractor quote through Buildogram&apos;s AI. It
            takes less than 60 seconds and could save you lakhs.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="#tool"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Analyze Quote Now →
            </Link>

            <Link
              href="/contact?type=quote-analysis"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.06)',
                color: '#E2E8F0',
                fontWeight: 600,
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Talk to an Engineer
            </Link>
          </div>

          <p style={{ marginTop: '24px', fontSize: '13px', color: '#475569' }}>
            No registration required · No data shared · Instant results
          </p>
        </div>
      </section>

      {/* ── 8. BREADCRUMB SCHEMA ─────────────────── */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI Contractor Quote Analyzer', path: '/ai-contractor-quote-analyzer' },
        ]}
      />
    </>
  );
}
