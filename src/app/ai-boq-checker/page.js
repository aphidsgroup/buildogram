import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BOQCheckerClient from './BOQCheckerClient';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = generateSEOMetadata({
  title: 'AI BOQ Checker | Detect Missing Items & Inflated Rates | Buildogram Chennai',
  description:
    'Upload your contractor BOQ and let Buildogram AI detect missing items, inflated rates, and vague specs. Trained on 10,000+ Chennai projects. Updated July 2026.',
  path: '/ai-boq-checker',
});

// ─── Data ──────────────────────────────────────────────────────────────────────
const EXAMPLE_FINDINGS = [
  {
    case: 'OMR Client',
    finding: 'Anti-termite treatment omitted from BOQ entirely',
    impact: '₹45,000 charged as "extra work" mid-build',
    status: 'Caught by AI',
    icon: '🐜',
  },
  {
    case: 'Anna Nagar Villa',
    finding: 'Cement brand not specified — allowed substitution from 53-grade to 43-grade',
    impact: '₹82,000 quality downgrade risk',
    status: 'Caught by AI',
    icon: '🧱',
  },
  {
    case: 'Velachery G+1',
    finding: 'Compound wall excluded from BOQ scope entirely',
    impact: '₹2.74L demanded as "extra" at finishing stage',
    status: 'Caught by AI',
    icon: '🏗️',
  },
  {
    case: 'Tambaram Renovation',
    finding: 'Steel TMT grade listed as "standard" — no IS standard cited',
    impact: '₹1.2L substitution risk on structural steel',
    status: 'Caught by AI',
    icon: '⚙️',
  },
  {
    case: 'Adyar Commercial',
    finding: 'Terrace waterproofing scope written as "as required" — no measurable quantity',
    impact: '₹95,000 open-ended / blank cheque clause',
    status: 'Caught by AI',
    icon: '💧',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Upload Your BOQ',
    desc: "Submit your contractor's Bill of Quantities as a PDF, Excel file, or a clear photo of a physical quote. All formats accepted.",
  },
  {
    step: '02',
    title: 'AI Extraction',
    desc: 'The AI extracts every line item, unit, quantity, and rate — normalising them into standard construction phases: Earthwork, Foundation, Superstructure, and Finishing.',
  },
  {
    step: '03',
    title: 'Cross-Reference Database',
    desc: 'Each line item is cross-referenced against our database of 10,000+ Chennai projects, flagging rates above market benchmarks.',
  },
  {
    step: '04',
    title: 'Detect Anomalies',
    desc: 'Missing items, vague specifications ("standard tiles", "as required"), unbounded rates, and undefined material grades are automatically red-flagged.',
  },
  {
    step: '05',
    title: 'Engineer-Reviewed Report',
    desc: "A senior civil or structural engineer reviews the AI's output and adds professional judgment before your negotiation playbook is delivered.",
  },
];

const DELIVERABLES = [
  {
    icon: '📋',
    title: 'Missing Item Report',
    desc: 'Everything not in your BOQ that will inevitably appear as a costly "extra" mid-project.',
  },
  {
    icon: '📊',
    title: 'Rate Variance Sheet',
    desc: 'Every line item priced above current Chennai wholesale benchmarks, with the exact variance amount.',
  },
  {
    icon: '🎯',
    title: 'Specification Clarity Score',
    desc: 'A 0–100 score measuring how clearly your BOQ defines materials, brands, grades, and quantities.',
  },
  {
    icon: '⚠️',
    title: 'Hidden Cost Vulnerability Report',
    desc: 'Clauses and omissions that expose you to uncontrolled cost escalation — identified before you sign.',
  },
  {
    icon: '🤝',
    title: 'Negotiation Playbook',
    desc: 'Specific ask-backs: what to demand be added, what to push back on pricing, and what language to insist on in the contract.',
  },
];

const FAQS = [
  {
    q: 'Why do contractors omit items from BOQs?',
    a: "Some contractors deliberately exclude items like basement filling, sump, waterproofing, or compound wall to make their initial quote look cheaper. When these items arise during construction, they charge premium \"extra rates\" with no prior agreement — sometimes at 2–3× market rate, since you're already mid-build with no alternative.",
  },
  {
    q: 'Does the AI know current Chennai material rates?',
    a: "Yes. The engine is calibrated against Buildogram's material procurement database reflecting current Chennai wholesale rates for steel, cement, sand, fly-ash brick, and finishing materials — updated July 2026.",
  },
  {
    q: 'What BOQ formats do you accept?',
    a: 'PDF, Excel (.xlsx, .csv), and clear JPG/PNG photos of physical contractor quotes. Our AI can read tabular data from all common contractor quote formats used across Chennai.',
  },
  {
    q: 'Is the AI decision final?',
    a: 'No. Every report is reviewed by a senior civil or structural engineer before delivery. The AI handles extraction and pattern-matching at scale; humans make the final professional judgment and sign off on all findings.',
  },
  {
    q: 'How long does it take?',
    a: 'Preliminary AI analysis runs in under 2 minutes. The full engineer-reviewed report with your negotiation playbook is delivered within 24 working hours.',
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AIBOQCheckerPage() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          background: 'var(--secondary)',
          paddingTop: '100px',
          paddingBottom: '72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(252,110,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(252,110,32,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />
        <div className="sectionInner" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/ai-tools" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>AI Tools</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)' }}>AI BOQ Checker</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(252,110,32,0.15)', color: 'var(--primary)', border: '1px solid rgba(252,110,32,0.35)', borderRadius: '100px', padding: '4px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              AI-Powered Audit
            </span>
            <span style={{ background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '100px', padding: '4px 14px', fontSize: '12px', fontWeight: 700 }}>
              ✓ Engineer Reviewed
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: '20px',
              maxWidth: '760px',
            }}
          >
            AI BOQ Checker
            <br />
            <span style={{ background: 'linear-gradient(90deg, var(--primary), #FF9A5C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Stop Getting Overcharged
            </span>
          </h1>

          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Updated: July 2026 | AI-Engineered Workflows
          </p>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '44px' }}>
            Your contractor gave you a Bill of Quantities. Our AI — trained on{' '}
            <strong style={{ color: '#FFFFFF' }}>10,000+ Chennai construction quotes</strong> —
            reviews it line-by-line for missing items, inflated rates, and vague specifications
            that contractors use to quietly overcharge you mid-project.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { value: '₹4.2 Cr', label: 'Recovered for clients' },
              { value: '10,000+', label: 'BOQs analyzed' },
              { value: '< 2 min', label: 'Preliminary AI analysis' },
              { value: '24 hrs', label: 'Full reviewed report' },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 24px', minWidth: '130px' }}>
                <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section style={{ background: '#F8FAFC', paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '10px' }}>
              Upload Your BOQ — Get an Instant Audit
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              PDF, Excel, or a photo of your contractor quote. Our AI reads every format.
            </p>
          </div>
          <BOQCheckerClient />
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section style={{ background: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(252,110,32,0.08)', color: 'var(--primary)', border: '1px solid rgba(252,110,32,0.2)', borderRadius: '100px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Real-World Findings
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '12px' }}>
              What Our AI Detected
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '560px', margin: '0 auto' }}>
              Five real findings from recent Chennai client BOQs — each would have cost the client dearly without a pre-audit.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {EXAMPLE_FINDINGS.map(({ case: caseName, finding, impact, status, icon }) => (
              <div
                key={caseName}
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #EF4444, var(--primary))' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{caseName}</span>
                  </div>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '100px', padding: '3px 10px', fontSize: '11px', fontWeight: 700 }}>{status}</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--secondary)', lineHeight: 1.5, marginBottom: '16px' }}>{finding}</p>
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>🔴</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#DC2626' }}>{impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--secondary)', paddingTop: '80px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle at center, rgba(252,110,32,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="sectionInner" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', color: 'var(--primary)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '100px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              The Process
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              How the AI Audit Works
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
              Five precise steps from raw contractor quote to your negotiation arsenal.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {HOW_IT_WORKS.map(({ step, title, desc }, idx) => (
              <div key={step} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '24px', alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(252,110,32,0.12)', border: '2px solid rgba(252,110,32,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, color: 'var(--primary)', flexShrink: 0 }}>
                    {step}
                  </div>
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div style={{ width: '2px', height: '48px', background: 'linear-gradient(to bottom, rgba(252,110,32,0.4), rgba(252,110,32,0.05))' }} />
                  )}
                </div>
                <div style={{ paddingTop: '12px', paddingBottom: '36px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: '#F8FAFC', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(252,110,32,0.08)', color: 'var(--primary)', border: '1px solid rgba(252,110,32,0.2)', borderRadius: '100px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Deliverables
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '12px' }}>
              What You Get in Your Report
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              Five targeted deliverables that transform your raw BOQ into a negotiation weapon.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {DELIVERABLES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(252,110,32,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(252,110,32,0.08)', color: 'var(--primary)', border: '1px solid rgba(252,110,32,0.2)', borderRadius: '100px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              FAQs
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--secondary)' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '28px 32px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px', lineHeight: 1.4 }}>{q}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #E8560A 100%)', paddingTop: '72px', paddingBottom: '72px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="sectionInner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Stop Signing Blank Cheques
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px' }}>
            Got a Contractor Quote?
            <br />
            Upload It Now.
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Our AI reviews your BOQ in under 2 minutes. Engineer-backed report in 24 hours.
            Know exactly what to negotiate before you sign.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact?type=boq-check"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', color: 'var(--primary)', fontWeight: 800, fontSize: '16px', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            >
              Upload My BOQ →
            </Link>
            <Link
              href="/ai-construction-cost-estimator"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Try Cost Estimator
            </Link>
          </div>
          <div style={{ marginTop: '40px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ No credit card required', '✓ Secure upload', '✓ Engineer-reviewed output'].map((item) => (
              <span key={item} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB SCHEMA */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI BOQ Checker', path: '/ai-boq-checker' },
        ]}
      />
    </>
  );
}
