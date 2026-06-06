import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'AI BOQ Checker for Construction | Prevent Hidden Costs',
  description: 'Upload your builder\'s Bill of Quantities (BOQ). Our AI instantly detects missing line items, overpriced materials, and vague specifications before you sign the contract.',
  path: '/ai-boq-checker',
});

const STEPS = [
  { title: '1. Upload your BOQ', desc: 'Take a photo of your contractor\'s quote or upload the PDF/Excel file directly into our secure AI portal.' },
  { title: '2. AI Extraction & Normalization', desc: 'The AI extracts every single line item, quantity, and rate, mapping them to standard construction phases (Earthwork, Foundation, Superstructure, Finishing).' },
  { title: '3. Red Flag Detection', desc: 'The engine cross-references the quote against our database of 10,000+ completed Chennai projects to flag inflated rates or suspiciously missing items.' },
  { title: '4. Specification Check', desc: 'It checks if vague terms are used (e.g., "Standard Tiles" instead of "Vitrified Tiles ₹60/sqft") to prevent bait-and-switch tactics.' },
  { title: '5. Human Engineer Review', desc: 'A senior civil engineer reviews the AI\'s findings and adds a professional summary before sending you the final audit report.' },
];

const DELIVERABLES = [
  'Missing Item Alert (e.g., Anti-termite treatment omitted)',
  'Rate Variance Analysis (Overpriced/Underpriced items)',
  'Specification Clarity Score',
  'Hidden Cost Vulnerability Report',
  'Negotiation Playbook for the Client'
];

const FAQS = [
  { question: 'Why do contractors hide items in a BOQ?', answer: 'Some contractors deliberately omit essential items (like basement filling, sump construction, or waterproofing) to artificially lower the bottom-line price and win the bid. They then charge you exorbitant "extra rates" mid-project.' },
  { question: 'Does the AI know current Chennai material rates?', answer: 'Yes. The AI is integrated with Buildogram\'s live material procurement dashboard, meaning it checks the quoted steel and cement rates against today\'s actual wholesale prices in Chennai.' },
  { question: 'What format should my BOQ be in?', answer: 'We accept PDF, Excel (.xlsx, .csv), and clear photos (.jpg, .png) of physical quotes.' },
  { question: 'Is the AI completely autonomous?', answer: 'No. Construction is highly contextual. The AI does the heavy lifting of data extraction and variance analysis, but every final report is vetted by a human structural engineer before delivery.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/ai-tools" style={{ color: '#FC6E20' }}>AI Tools</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>AI BOQ Checker</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>AI BOQ Checker & Contractor Quote Analyzer</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Don't sign a construction contract blind. Upload your builder's Bill of Quantities (BOQ) or construction agreement. Our AI—trained on thousands of Chennai construction projects—will instantly highlight missing items, vague brand specifications, and overpriced line items.
        </p>

        <AnswerBlock
          question="What is the biggest trap in Construction Quotes?"
          answer="The biggest trap is the 'Vague Specification'. A contractor will quote ₹2,000/sq.ft and write 'Tiles included'. Mid-project, they will tell you their budget only allows for ₹30/sq.ft tiles, forcing you to pay out of pocket if you want ₹80/sq.ft premium tiles. Our AI immediately red-flags any specification that does not have a hard brand or price limit attached to it."
        />
        
        <ProcessSteps title="How the AI Audit Works" steps={STEPS} />
        
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>What the AI Flags</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {DELIVERABLES.map(d => (
              <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#374151', lineHeight: 1.5 }}>
                <span style={{ color: '#10B981', fontWeight: 700, marginTop: '2px' }}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '40px 0', padding: '32px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '16px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Compare Multiple Quotes</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Got quotes from 3 different builders? Contractor A might group 'Electrical & Plumbing' into one lump sum, while Contractor B itemizes every wire. The AI normalizes these drastically different formats into a single, side-by-side comparison table so you can actually compare apples to apples.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="AI Construction BOQ Checker" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Explore Other AI Tools</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Construction Cost Estimator', '/ai-construction-cost-estimator'],
              ['Material Estimator', '/ai-material-estimator'],
              ['Property Passport Assistant', '/ai-property-passport-assistant'],
              ['Survey Requirement Builder', '/ai-survey-requirement-builder'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=ai" className="btn btn-primary btn-lg">Upload Your BOQ Now</Link>
        </div>
      </div>
    </main>
  );
}
