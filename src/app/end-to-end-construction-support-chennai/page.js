import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'End-to-End Construction Support in Chennai | Buildogram',
  description: 'Complete construction support from soil test to handover in Chennai. BOQ, structural design, site supervision, material sourcing, contractor management and Property Passport.',
  path: '/end-to-end-construction-support-chennai',
});

const phases = [
  { num: '01', title: 'Pre-Construction', desc: 'Soil SBC test coordination, CMDA/DTCP approval guidance, architectural design brief, site measurement.' },
  { num: '02', title: 'BOQ & Budgeting', desc: 'Itemised Bill of Quantities with per-unit rates benchmarked against current Chennai market prices.' },
  { num: '03', title: 'Contractor Vetting', desc: 'Background checks, past project site visits, financial capacity assessment, reference calls.' },
  { num: '04', title: 'Construction Execution', desc: 'Milestone-based payment schedule tied to verified progress. No advance payments without sign-off.' },
  { num: '05', title: 'Site Supervision', desc: 'Daily photo reports, material delivery checks, concrete cube tests, rebar inspection before casting.' },
  { num: '06', title: 'Material Sourcing', desc: 'Cement, TMT steel, M-sand and RMC procured directly from verified suppliers at benchmarked rates.' },
  { num: '07', title: 'Handover & Property Passport', desc: 'Snag list inspection, as-built drawings, test certificates, warranties — bound as your permanent Property Passport.' },
];

const faqs = [
  { q: 'What exactly is included in end-to-end construction support?', a: 'Everything from the first soil test through to the final key handover: pre-construction planning, BOQ review, contractor selection and vetting, site supervision throughout construction, material quality checks, and permanent project documentation (Property Passport). You deal with one point of contact — Buildogram coordinates everything else.' },
  { q: 'How is Buildogram different from a construction contractor?', a: 'Buildogram is an engineering review and coordination service — not the executing contractor. We provide technical oversight, independent quality checks, and owner-side representation. The actual construction is done by verified partner contractors. This means you get independent accountability that a contractor cannot provide for their own work.' },
  { q: 'Do you take responsibility for construction delays?', a: 'Buildogram manages the milestone schedule and flags delays with documented evidence. Our contracts with partner contractors include milestone-linked payment clauses. While we cannot guarantee dates beyond our control (monsoon, material supply), our supervision model ensures delays are caught early and documented.' },
  { q: 'What happens if there is a cost overrun?', a: 'Our itemised, capped BOQ model means variations must be documented and approved by you before extra work proceeds. We track actual vs. budgeted costs at every milestone and give you a running cost report. Unilateral contractor overruns without documented change orders are not accepted.' },
  { q: 'How do I monitor my project if I am an NRI or living elsewhere?', a: 'Every project gets a client portal with daily photo updates, milestone sign-off requests, and a live cost tracker. You approve milestone payments digitally before funds are released. Our site engineers are your eyes on the ground.' },
  { q: 'What is the Property Passport?', a: 'A permanent physical and digital record of your building — containing all approved drawings, structural design calculations, material test certificates (cement, TMT steel, concrete cube tests), warranty documents from vendors, and the final as-built plan. It is invaluable for future renovations, resale, bank valuations, and insurance claims.' },
  { q: 'How long does a typical G+1 house construction take in Chennai?', a: 'A well-managed G+1 house (1,800–2,400 sqft built-up) typically takes 14–18 months from foundation to handover. This includes 2–3 months for pre-construction (approvals, design, BOQ finalisation) and 12–15 months of actual construction, weather permitting. Buildogram\'s milestone tracking keeps projects within this range.' },
];

export default function EndToEndConstructionPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>CONSTRUCTION SUPPORT</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            End-to-End Construction Support in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            One point of engineering accountability — from the first soil test to your final Property Passport. No coordination gaps. No surprises.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Get a Free Consultation</a>
            <a href="/quality-system" style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}>Our Quality System →</a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['500+', 'Projects Supported'], ['₹2.1Cr', 'Average Project Value'], ['18%', 'Avg Cost Savings vs Market'], ['7', 'Construction Phases Covered']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* What it means */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            What End-to-End Construction Support Means
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            Most Chennai construction projects fail not because of bad materials or incompetent contractors — they fail because of coordination gaps. The architect draws one thing, the structural engineer designs another, the contractor builds a third, and the owner has no engineering-qualified person checking whether these three are aligned.
          </p>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            Buildogram's end-to-end support eliminates that gap. We become your technical representative at every stage — from the day you test the soil to the day you receive your Property Passport with every certificate, drawing, and warranty permanently bound together.
          </p>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px' }}>
            Buildogram is not the contractor. We are the engineering oversight layer between you and the contractor — giving you independent accountability that a contractor cannot provide for their own work.
          </p>
        </section>

        {/* 7 phases */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '28px' }}>
            The 7 Phases of Buildogram Support
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {phases.map((phase, i) => (
              <div key={phase.num} style={{ display: 'flex', gap: '24px', paddingBottom: '28px', borderLeft: i < phases.length - 1 ? '2px solid rgba(252,110,32,0.25)' : 'none', marginLeft: '20px', paddingLeft: '32px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-14px', top: '0', width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>{phase.num}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{phase.title}</h3>
                  <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who needs this */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Who Needs End-to-End Construction Support
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { title: 'NRIs Building Remotely', desc: 'You are in the US, UK, or Singapore. You cannot visit the site every week. Our daily reports and portal updates let you approve milestones and payments from anywhere.' },
              { title: 'First-Time Builders', desc: 'You have never built before and don\'t know what a fair BOQ looks like, which columns need to be what size, or when to test your concrete. We do.' },
              { title: 'Busy Professionals', desc: 'You have a demanding career. You cannot spend weekends checking whether your contractor used the right steel. We check it for you.' },
              { title: 'Those Burned Before', desc: 'A previous project went over budget or over time with a direct contractor. Our milestone-gated payment model prevents that pattern from repeating.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>{card.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chennai specifics */}
        <section style={{ marginBottom: '56px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Chennai-Specific Construction Knowledge
          </h2>
          <ul style={{ color: '#555', lineHeight: 2, fontSize: '15px', paddingLeft: '20px' }}>
            <li><strong>CMDA vs DTCP jurisdiction</strong> — determines approval route, setbacks, and permissible FSI for your plot.</li>
            <li><strong>Corporation vs Panchayat limits</strong> — different tax structures, completion certificate requirements, and connection procedures.</li>
            <li><strong>OMR/ECR soil conditions</strong> — filled land near the coast may need pile foundations instead of isolated footings.</li>
            <li><strong>Coastal corrosion protection</strong> — within 5 km of the coast, structural steel needs hot-dip galvanising or epoxy coating; RCC needs minimum 40mm cover with corrosion-inhibiting admixtures.</li>
            <li><strong>Monsoon planning</strong> — Chennai's northeast monsoon (Oct–Dec) impacts concrete curing. Our schedule accounts for weather windows.</li>
            <li><strong>Material sourcing</strong> — verified cement depots, TMT steel stockists, and M-sand quarries with test certificates in Chennai and surrounding districts.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '28px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(faq => (
              <details key={faq.q} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '18px 20px' }}>
                <summary style={{ fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', fontSize: '15px' }}>{faq.q}</summary>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '15px', marginTop: '12px', marginBottom: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related services */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Related Services</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              ['/home-construction-chennai', 'Home Construction Chennai'],
              ['/site-supervision-chennai', 'Site Supervision'],
              ['/boq-review-chennai', 'BOQ Review'],
              ['/structural-plan-review-chennai', 'Structural Plan Review'],
              ['/property-passport', 'Property Passport'],
            ].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Start Your Construction Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
            Book a free 30-minute consultation. We'll review your plot, scope, and budget and tell you exactly what's realistic.
          </p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
            Book Free Consultation →
          </a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'End-to-End Construction Support Chennai', url: 'https://www.buildogram.in/end-to-end-construction-support-chennai' },
      ]} />
    </>
  );
}
