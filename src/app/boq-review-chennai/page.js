import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema, generateServiceSchema } from '@/lib/seo/schema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import EngineerCredibility from '@/components/seo/EngineerCredibility';

export const metadata = generateSEOMetadata({
  title: 'BOQ Review & Audit in Chennai | Contractor Quote Check | Buildogram',
  description: 'Get your contractor BOQ reviewed by structural engineers in Chennai. Line-by-line verification, rate benchmarking, material quantity check and savings report.',
  path: '/boq-review-chennai',
});

const faqSchema = generateFAQSchema([
  { question: 'What exactly is a BOQ audit?', answer: 'A BOQ (Bill of Quantities) audit is a line-by-line engineering review of your contractor\'s quotation. Every item is checked: the quantity is verified against your drawings, and the rate is benchmarked against current market prices for Chennai.' },
  { question: 'How long does the BOQ review take?', answer: 'Standard turnaround is 3 working days from when we receive the BOQ and drawings. For BOQs with more than 100 line items, allow 5 working days.' },
  { question: 'What format should I send my BOQ in?', answer: 'We accept any format — Excel, PDF, Word, or even a handwritten contractor estimate scanned as a photo. Drawings can be sent as PDF, DWG, or photos of physical prints.' },
  { question: 'Can you review a contractor quote if I don\'t have structural drawings?', answer: 'Yes. For projects where drawings are not yet finalised, we perform a quantity estimate review — checking whether the quantities in the BOQ are realistic for your project type and floor area.' },
  { question: 'What if my contractor disagrees with the review findings?', answer: 'Our review is an independent engineering opinion backed by current market data and quantity take-offs from drawings. We provide the calculation basis and market data reference for any disputed item. We can also join a three-way call with your contractor to explain findings.' },
  { question: 'How much money can I realistically save from a BOQ review?', answer: 'In our experience across Chennai residential projects, average overquoting above verified market rates is 18–25%. On a ₹1Cr project, that is ₹18–25 lakhs in potential savings. Our observed average saving is ₹3.2 lakhs per project.' },
  { question: 'Do you also review construction contracts and agreements?', answer: 'Yes, as an add-on to BOQ review. We check whether the contract has milestone-linked payment terms, defect liability period, arbitration clause, and whether materials are specified with brand/grade rather than generic terms.' },
]);

const serviceSchema = generateServiceSchema({
  name: 'BOQ Review and Audit Chennai',
  description: 'Line-by-line contractor BOQ review by structural engineers — quantity verification, rate benchmarking against Chennai market prices, and negotiation brief.',
  url: '/boq-review-chennai',
  category: 'Engineering Review',
});

const faqs = [
  { q: 'What exactly is a BOQ audit?', a: 'A BOQ (Bill of Quantities) audit is a line-by-line engineering review of your contractor\'s quotation. Every item is checked: the quantity is verified against your drawings, and the rate is benchmarked against current market prices for Chennai. You receive a marked-up document showing which items are overpriced, which quantities are inflated, and which specifications are vague enough to allow material substitution.' },
  { q: 'How long does the BOQ review take?', a: 'Standard turnaround is 3 working days from when we receive the BOQ and drawings. For BOQs with more than 100 line items or when drawings need to be generated from site measurements, allow 5 working days. We will confirm the exact timeline when you submit.' },
  { q: 'What format should I send my BOQ in?', a: 'We accept any format — Excel, PDF, Word, or even a handwritten contractor estimate scanned as a photo. If your contractor provided a lump-sum quote with no breakdown, we can help you request an itemised version and review that. Drawings can be sent as PDF, DWG, or photos of physical prints.' },
  { q: 'Can you review a contractor quote if I don\'t have structural drawings?', a: 'Yes. For projects where drawings are not yet finalised, we perform a quantity estimate review — checking whether the quantities in the BOQ are realistic for your project type and floor area. For a full rate + quantity check, drawings are ideal, but we can work with floor plan sketches and site measurements.' },
  { q: 'What if my contractor disagrees with the review findings?', a: 'Our review is an independent engineering opinion backed by current market data and quantity take-offs from drawings. If a contractor disputes a finding, we provide the calculation basis and market data reference. Most rate disputes are resolved through negotiation using our benchmark data. We can also join a three-way call with your contractor to explain findings.' },
  { q: 'How much money can I realistically save from a BOQ review?', a: 'In our experience across Chennai residential projects, the average overquoting above verified market rates is 18–25%. On a ₹1Cr project, that is ₹18–25 lakhs in potential savings. Our service fee is a fraction of this. The ₹3.2 lakh average saving figure we cite is our observed average across completed reviews.' },
  { q: 'Do you also review construction contracts and agreements?', a: 'Yes, as an add-on to BOQ review. We check whether the contract has milestone-linked payment terms, defect liability period, arbitration clause, and whether materials are specified with brand/grade rather than generic terms. Contract review is priced separately from BOQ review.' },
];

const catches = [
  { item: 'Cement specification', issue: 'Contractor quotes "cement" — allows them to use PPC (₹30/bag cheaper) instead of the specified OPC 53.', saving: '₹30/bag × 800 bags = ₹24,000' },
  { item: 'TMT steel', issue: '"TMT bars" instead of "Fe500D TMT steel" — enables using lower grade or non-ISI steel.', saving: '₹2,000-5,000/MT difference' },
  { item: 'Concrete grade', issue: 'BOQ says "M20 concrete" but allows site mixing instead of RMC — inconsistent strength.', saving: 'Quality risk, not just cost' },
  { item: 'Brick wall thickness', issue: '9-inch (230mm) specified in drawings but contractor quotes 4.5-inch (115mm) partition walls throughout.', saving: '₹45/sqft difference on wall area' },
  { item: 'Flooring quantity', issue: 'Contractor quotes floor area but includes wall area in the sqft figure — inflating quantity 15-20%.', saving: 'Avg ₹12,000 overcharge found' },
  { item: 'Lump sum items', issue: '"Electrical work — lump sum ₹3.5L" with no point list. Allows reduction of points after signing.', saving: 'Need itemised point list minimum' },
];

export default function BOQReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>BOQ AUDIT</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            BOQ Review & Audit in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            Don't sign a contractor quote without an independent review. Our structural engineers check every line — quantities against drawings, rates against current market prices.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Upload Your BOQ for Review</a>
            <a href="/contractor-quote-review-chennai" style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}>Contractor Quote Check →</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['₹3.2L', 'Avg Saving Per Project'], ['18–25%', 'Typical Overquote Rate'], ['3 Days', 'Standard Turnaround'], ['94%', 'Clients Who Renegotiate After Review']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* The problem */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            The BOQ Problem in Chennai
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            73% of Chennai homeowners accept a contractor's Bill of Quantities without any independent verification. Most don't know what quantities their project should require, don't know current material market rates, and can't identify when a specification is deliberately vague enough to allow material substitution.
          </p>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            The result: overquoting of 18–25% above verified market rates is standard practice, not exceptional. On a ₹80 lakh project, that is ₹14–20 lakhs left on the table at signing.
          </p>
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '10px', padding: '20px 24px' }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#856404' }}>⚠ A contractor cannot review their own quote independently. Only an engineer with no stake in the project can give you an honest audit.</p>
          </div>
        </section>

        {/* What we check */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            What a Buildogram BOQ Review Includes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📐', title: 'Quantity Take-Off Verification', desc: 'Every quantity is derived from your drawings. Concrete volume, steel weight, brickwork area, flooring area — all checked against actual drawing dimensions.' },
              { icon: '💰', title: 'Rate Benchmarking', desc: 'All rates are compared against current Chennai market: cement ₹380–410/bag, TMT steel ₹65,000–72,000/MT, M-sand ₹35–45/cft, RMC M25 ₹5,200–5,800/m³.' },
              { icon: '📋', title: 'Specification Audit', desc: 'Every line is checked for specificity. Vague specs like "cement" or "TMT bars" without grade/brand are flagged as substitution risks.' },
              { icon: '🔍', title: 'Margin Analysis', desc: 'We identify where contractor margins exceed industry norms and separate genuine cost items from inflated overhead allocation.' },
              { icon: '📝', title: 'Contract Compliance', desc: 'We check whether the BOQ matches any specification schedule or scope of work document attached to the contract.' },
              { icon: '💬', title: 'Negotiation Brief', desc: 'You receive a prioritised list of recommended negotiation points — which items to push back on, what to accept, and the market basis for each ask.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we catch */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Common Issues We Catch
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>BOQ Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Issue Found</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                {catches.map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.item}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{row.issue}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 600 }}>{row.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deliverables & Pricing */}
        <section style={{ marginBottom: '56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '28px', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>What You Receive</h2>
            <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: 2, fontSize: '15px' }}>
              <li>Marked-up BOQ PDF with per-line comments</li>
              <li>Benchmarked rate sheet (current Chennai market)</li>
              <li>Prioritised negotiation brief</li>
              <li>True cost estimate vs. quoted cost</li>
              <li>Specification risk flags</li>
              <li>45-minute video walkthrough call</li>
            </ul>
          </div>
          <div style={{ background: 'linear-gradient(135deg, var(--secondary), #1a2a3a)', borderRadius: '16px', padding: '28px', color: 'white' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Pricing</h2>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>₹4,999</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px' }}>for up to 50 BOQ line items</p>
            <ul style={{ paddingLeft: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: 2, fontSize: '14px' }}>
              <li>50–100 items: ₹7,999</li>
              <li>100+ items: Custom quote</li>
              <li>Contract review add-on: ₹2,999</li>
              <li>Turnaround: 3 working days</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '28px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map(faq => (
              <details key={faq.q} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px 20px' }}>
                <summary style={{ fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', fontSize: '15px' }}>{faq.q}</summary>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '15px', marginTop: '12px', marginBottom: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* E-E-A-T Trust Block */}
        <EngineerCredibility service="BOQ Review" />

        {/* Related */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Related Services</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[['/contractor-quote-review-chennai', 'Contractor Quote Review'], ['/construction-cost-estimation-chennai', 'Cost Estimation'], ['/end-to-end-construction-support-chennai', 'End-to-End Support'], ['/structural-plan-review-chennai', 'Structural Plan Review']].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Don't Sign Without a Review</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 28px' }}>Upload your contractor's BOQ and we'll tell you within 3 days exactly what it should cost.</p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>Submit Your BOQ →</a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'BOQ Review Chennai', url: 'https://www.buildogram.in/boq-review-chennai' },
      ]} />
    </>
  );
}
