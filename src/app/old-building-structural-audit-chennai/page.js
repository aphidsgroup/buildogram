import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Old Building Structural Audit in Chennai | Renovation Safety Check',
  description: 'Certified structural health checks for buildings over 20 years old in Chennai. We test load-bearing capacity before you renovate, buy, or add a new floor.',
  path: '/old-building-structural-audit-chennai',
});

const STEPS = [
  { title: '1. Document & History Review', desc: 'We review whatever original architectural drawings you have. If none exist, we digitally map the current layout to establish the structural grid.' },
  { title: '2. Corrosion & Spalling Check', desc: 'Old buildings in Chennai suffer from severe chloride attacks. We check columns and roof slabs for exposed, rusting steel (spalling).' },
  { title: '3. NDT Strength Testing', desc: 'Using UPV and Rebound Hammer equipment, we non-destructively test the compressive strength of the 20+ year old concrete to ensure it hasn\'t degraded.' },
  { title: '4. Load Capacity Analysis', desc: 'Our engineers run software simulations to determine if the existing columns and foundation can safely support the additional weight of a new floor or a heavy roof garden.' },
  { title: '5. Retrofitting Design', desc: 'If the structure is weak, we don\'t just fail it. We provide engineered retrofitting solutions (like column jacketing) to safely upgrade the building\'s load capacity.' },
];

const DELIVERABLES = [
  'Current Structural Health Report',
  'Load-Bearing Capacity Certificate',
  'Renovation / Floor-Addition Feasibility Study',
  'Retrofitting Engineering Designs (if required)',
  'Estimated Remaining Lifespan of Building'
];

const FAQS = [
  { question: 'My house is 25 years old. Can I build a second floor on it?', answer: 'You cannot assume it is safe just because the walls look fine. A 25-year-old foundation was likely only designed for one floor. We must perform an audit, scan the columns, and calculate the current strength before giving the green light.' },
  { question: 'Is it cheaper to demolish and rebuild, or retrofit?', answer: 'It depends on the audit results. Minor column jacketing or carbon wrapping is much cheaper than a full demolition. However, if the foundation has failed or the concrete is completely carbonated, we will advise demolition as the safest and most economical long-term option.' },
  { question: 'We want to remove a wall to make the living room bigger. Is it safe?', answer: 'If your old house has a load-bearing brick structure (no columns), removing a wall will cause the roof to collapse. Our engineers will audit the house to determine which walls are load-bearing and design safe steel-beam support systems if you want an open floor plan.' },
  { question: 'How long does the audit take?', answer: 'The site inspection and NDT scanning usually takes 1-2 days. The engineering analysis and final report generation takes an additional 4-5 working days.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Old Building Audit</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Old Building Structural Audit in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Whether you are buying a 30-year-old independent house in Adyar, or planning to add a new floor to your ancestral home, safety comes first. Our comprehensive structural audits determine the remaining lifespan of old buildings and tell you exactly what retrofitting is required.
        </p>

        <AnswerBlock
          question="What is the biggest threat to old buildings in Chennai?"
          answer="Carbonation and Chloride attack. Chennai's salty, humid air slowly penetrates concrete over decades. Eventually, it reaches the steel reinforcement, causing the rebar to rust, expand, and blow off the concrete cover (spalling). If your old building has exposed rusting steel in the roof slab, a structural audit is urgently required before a collapse occurs."
        />
        
        <ProcessSteps title="Our Assessment Process" steps={STEPS} />
        
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>What You Receive</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {DELIVERABLES.map(d => (
              <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#374151', lineHeight: 1.5 }}>
                <span style={{ color: '#10B981', fontWeight: 700, marginTop: '2px' }}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '40px 0', padding: '32px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '16px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Buying an Old Property?</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Never buy an older apartment or independent house without a structural health check. Sellers often hide deep structural cracks with fresh putty and a new coat of paint. Our engineers use Rebound Hammers and UPV equipment to 'see' the actual concrete strength behind the fresh paint, ensuring you don't buy a liability.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Old Building Structural Audit in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Audit Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Structural Audit', '/structural-audit-chennai'],
              ['Building Crack Inspection', '/building-crack-inspection-chennai'],
              ['Rebar Scanning', '/rebar-scanning-chennai'],
              ['UPV Test', '/upv-test-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book a Building Audit</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Old Building Structural Audit in Chennai","path":"/old-building-structural-audit-chennai"}]} />
    </>
  );
}
