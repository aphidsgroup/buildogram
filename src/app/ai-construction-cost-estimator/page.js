import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CostEstimatorClient from './CostEstimatorClient';

// --- SEO Metadata ---
export const metadata = generateSEOMetadata({
  title: 'AI Construction Cost Estimator Chennai | Preliminary Cost Planning | Buildogram',
  description:
    'Get a free AI-powered preliminary construction cost estimate for your Chennai home or commercial project. Based on ₹200Cr+ of completed Chennai builds. Updated July 2026.',
  path: '/ai-construction-cost-estimator',
});

// --- Example Estimate Data ---
const EXAMPLE_ESTIMATES = [
  {
    type: 'Ground Floor Individual House',
    plotSize: '1,200 sqft',
    spec: 'Standard',
    specColor: '#16A34A',
    specBg: '#DCFCE7',
    range: '₹18.5L - ₹23.2L',
    ratePerSqft: '₹1,540 - ₹1,930/sqft',
  },
  {
    type: 'G+1 Duplex House',
    plotSize: '2,400 sqft',
    spec: 'Standard',
    specColor: '#16A34A',
    specBg: '#DCFCE7',
    range: '₹42L - ₹52L',
    ratePerSqft: '₹1,750 - ₹2,166/sqft',
  },
  {
    type: 'G+1 Duplex House',
    plotSize: '2,400 sqft',
    spec: 'Premium',
    specColor: '#9333EA',
    specBg: '#F3E8FF',
    range: '₹58L - ₹72L',
    ratePerSqft: '₹2,416 - ₹3,000/sqft',
  },
  {
    type: 'G+2 Villa',
    plotSize: '4,500 sqft',
    spec: 'Premium',
    specColor: '#9333EA',
    specBg: '#F3E8FF',
    range: '₹1.2Cr - ₹1.5Cr',
    ratePerSqft: '₹2,666 - ₹3,333/sqft',
  },
  {
    type: 'Commercial Shop Room',
    plotSize: '800 sqft',
    spec: 'Basic',
    specColor: '#D97706',
    specBg: '#FEF3C7',
    range: '₹10.5L - ₹13L',
    ratePerSqft: '₹1,312 - ₹1,625/sqft',
  },
];

// --- How It Works Steps ---
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Enter Your Project Details',
    description:
      'Input your plot size (sqft), number of floors, locality in Chennai, and specification level (Basic / Standard / Premium).',
  },
  {
    step: '02',
    title: 'AI Cross-References 1,200+ Builds',
    description:
      'Our AI workflow instantly cross-references your inputs against a database of 1,200+ completed Chennai residential and commercial construction projects.',
  },
  {
    step: '03',
    title: 'Location and Soil Adjustments Applied',
    description:
      'Rate ranges are dynamically adjusted for your specific locality, soil condition (soft clay, sandy loam, hard rock), and current Chennai market rates as of July 2026.',
  },
  {
    step: '04',
    title: 'Download and Consult an Engineer',
    description:
      'Download your preliminary estimate PDF and book a consultation with a Buildogram structural engineer to move from estimate to a detailed, bindingly-priced BOQ.',
  },
];

// --- FAQ Data ---
const FAQS = [
  {
    question: 'How accurate is the AI estimate?',
    answer:
      'Within plus/minus 10-15% of actual project cost for standard spec builds in Chennai. Accuracy improves significantly when you provide accurate plot dimensions, floor count, and locality details.',
  },
  {
    question: 'Does it account for soil type?',
    answer:
      'Yes. Our AI adjusts foundation cost assumptions for Chennai\'s varied soil conditions -- soft clay in Velachery/Tambaram, sandy loam in ECR/OMR, and hard rock in parts of Anna Nagar and Adyar.',
  },
  {
    question: 'Can I use this for a commercial building?',
    answer:
      'Yes. Select Commercial under construction type and the AI applies commercial-grade specifications including 9-inch pillars, heavier slab loads, and commercial finishing norms.',
  },
  {
    question: 'Does this include interior design costs?',
    answer:
      'No. The estimate covers civil structural work only -- foundation, structural frame, brick/block work, plastering, and basic finishes. Interior design, furniture, and modular kitchen are excluded.',
  },
  {
    question: 'How is this different from a BOQ?',
    answer:
      'This is a preliminary range estimate for early-stage budget planning. A detailed Bill of Quantities (BOQ) from Buildogram engineers goes item-by-item with material brand specifications and is bindingly priced before contract signing.',
  },
];

// --- Page Component ---
export default function AiConstructionCostEstimatorPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{
          background: 'var(--secondary)',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '100px',
          paddingBottom: '80px',
        }}
      >
        {/* Animated dot grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(252,110,32,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        {/* Orange radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(252,110,32,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="sectionInner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '13px', marginBottom: '32px' }}
          >
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <Link href="/ai-tools" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>AI Tools</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>AI Construction Cost Estimator</span>
          </nav>

          {/* AI badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(252,110,32,0.12)',
              border: '1px solid rgba(252,110,32,0.3)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(252,110,32,0.7)',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              AI-Engineered Workflow
            </span>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            AI Construction{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FC6E20 0%, #FF9A56 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Cost Estimator
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Updated: July 2026 | AI-Engineered Workflows
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}
          >
            Get a data-calibrated construction cost estimate for your Chennai project &mdash;
            powered by our AI-engineered workflow trained on{' '}
            <strong style={{ color: '#FFFFFF' }}>
              ₹200+ crore worth of completed Chennai residential and commercial construction projects.
            </strong>
          </p>

          {/* Stat badges */}
          <div
            style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}
          >
            {[
              { label: '₹200Cr+ Projects Analyzed', icon: 'CHART' },
              { label: '1,200+ Chennai Builds', icon: 'BUILD' },
            ].map(({ label, icon }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  padding: '12px 22px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE TOOL SECTION */}
      <section style={{ background: '#F8FAFC', paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '100px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Free Tool
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              Generate Your Estimate Instantly
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              Enter your project details below and our AI will produce a calibrated cost range in seconds.
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
            }}
          >
            <CostEstimatorClient />
          </div>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section style={{ background: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '100px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Real Data
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              Example Estimates (AI-Generated)
            </h2>
            <p
              style={{ fontSize: '16px', color: '#64748B', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Representative output ranges based on Chennai projects completed in 2024-2026.
              Rates may vary by locality and market conditions.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {EXAMPLE_ESTIMATES.map((ex, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Orange accent stripe */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--primary), #FF9A56)',
                    borderRadius: '16px 16px 0 0',
                  }}
                />

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    marginBottom: '16px',
                    lineHeight: 1.3,
                    paddingTop: '4px',
                  }}
                >
                  {ex.type}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: '#F1F5F9',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    {ex.plotSize}
                  </span>
                  <span
                    style={{
                      background: ex.specBg,
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: ex.specColor,
                    }}
                  >
                    {ex.spec}
                  </span>
                </div>

                <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '20px' }} />

                <div style={{ marginBottom: '10px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#94A3B8',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Estimated Range
                  </p>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                    {ex.range}
                  </p>
                </div>

                <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                  {ex.ratePerSqft}
                </p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94A3B8', marginTop: '28px' }}>
            * All estimates are advisory. Actual costs vary by site conditions, contractor, and material procurement.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        style={{
          background: 'var(--secondary)',
          paddingTop: '80px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        <div className="sectionInner" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(252,110,32,0.12)',
                border: '1px solid rgba(252,110,32,0.3)',
                borderRadius: '100px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Process
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              How It Works
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto' }}>
              From project details to a calibrated cost range in under 30 seconds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div
                key={step}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '32px 28px',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 900,
                    color: 'rgba(252,110,32,0.15)',
                    lineHeight: 1,
                    marginBottom: '16px',
                    fontFamily: 'monospace',
                  }}
                >
                  {step}
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '4px',
                    background: 'var(--primary)',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER CALLOUT */}
      <section style={{ background: '#FFFBF7', paddingTop: '56px', paddingBottom: '0' }}>
        <div className="sectionInner">
          <div
            role="note"
            aria-label="Important disclaimer"
            style={{
              border: '1.5px solid var(--primary)',
              borderRadius: '16px',
              padding: '28px 32px',
              background: '#FFF7ED',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '18px',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                background: 'rgba(252,110,32,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              !
            </div>
            <div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Important Disclaimer
              </p>
              <p style={{ fontSize: '15px', color: '#78350F', lineHeight: 1.65, maxWidth: '780px' }}>
                AI estimates are advisory and based on Chennai market data as of July 2026. Cost ranges reflect
                typical project benchmarks and{' '}
                <strong>do not constitute a contractor quote or contract.</strong>{' '}
                Always verify with a qualified structural engineer and obtain at least three contractor
                quotations before signing any construction contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: '#FFFBF7', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '100px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: 'var(--secondary)',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '480px', margin: '0 auto' }}>
              Everything you need to know about AI cost estimation for Chennai construction projects.
            </p>
          </div>

          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {FAQS.map(({ question, answer }, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '28px 32px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '26px',
                      height: '26px',
                      background: 'var(--primary)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1,
                    }}
                  >
                    Q
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.4 }}>
                    {question}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '26px',
                      height: '26px',
                      background: '#F1F5F9',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#64748B',
                      lineHeight: 1,
                    }}
                  >
                    A
                  </span>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65 }}>
                    {answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          background: 'var(--secondary)',
          paddingTop: '80px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(252,110,32,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div className="sectionInner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            Need a Detailed BOQ Instead?
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '560px',
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            A preliminary estimate gives you a ballpark figure. A full Bill of Quantities (BOQ) from
            Buildogram engineers goes line-by-line with material brands, quantities, and bindingly priced
            rates -- so you can sign contracts with confidence.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link
              href="/boq-calculator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(252,110,32,0.4)',
              }}
            >
              Generate a Detailed BOQ
            </Link>

            <Link
              href="/ai-tools"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Explore All AI Tools
            </Link>
          </div>

          <div
            style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px' }}
          >
            {['Free to Use', 'No Sign-Up Required', 'Chennai Market Data', 'Updated July 2026'].map((item) => (
              <span key={item} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB SCHEMA */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI Construction Cost Estimator Chennai', path: '/ai-construction-cost-estimator' },
        ]}
      />
    </>
  );
}