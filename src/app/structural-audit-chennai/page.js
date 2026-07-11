import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export const metadata = generateSEOMetadata({
  title: 'Structural Audit Services in Chennai | NDT & Health Monitoring',
  description: 'Get your building inspected by certified structural engineers in Chennai. We conduct thorough structural audits using Non-Destructive Testing (NDT) to check for cracks, corrosion, and safety.',
  path: '/structural-audit-chennai',
});

const STEPS = [
  { title: '1. Visual Inspection', desc: 'Our senior structural engineers perform a thorough visual survey of the building, mapping out visible cracks, dampness, and spalling concrete.' },
  { title: '2. NDT Planning', desc: 'Based on the visual data, we identify critical columns, beams, and slabs that require Non-Destructive Testing (NDT) for deeper analysis.' },
  { title: '3. Core Testing (NDT)', desc: 'We execute Rebound Hammer tests, Ultrasonic Pulse Velocity (UPV), and Rebar Scanning to assess concrete strength and internal corrosion without damaging the structure.' },
  { title: '4. Structural Analysis', desc: 'The data collected from the site is fed into software like STAAD.Pro or ETABS to check if the current structure can handle its intended load safely.' },
  { title: '5. Repair & Retrofitting Report', desc: 'We deliver a comprehensive audit report detailing the health of the building, life expectancy, and specific retrofitting recommendations (like jacketing or carbon wrapping).' },
];

const DELIVERABLES = [
  'Detailed Structural Health Report',
  'Crack Mapping & Photographic Evidence',
  'NDT Test Results (UPV, Rebound, Half-Cell)',
  'Load Carrying Capacity Assessment',
  'Retrofitting / Repair BOQ',
  'Structural Stability Certificate'
];

const FAQS = [
  { question: 'When should I get a structural audit for my building in Chennai?', answer: 'You should get an audit if the building is over 15 years old, if you are planning to add an extra floor, if you notice deep cracks or exposed rusting steel, or before buying an older property.' },
  { question: 'What is a Structural Stability Certificate?', answer: 'It is a legal document signed by a licensed structural engineer stating that the building is safe for occupation. It is often required by the Chennai Corporation for schools, hospitals, and commercial buildings.' },
  { question: 'Will the testing damage my house?', answer: 'No. We primarily use Non-Destructive Testing (NDT) methods like Rebound Hammer and Ultrasound, which test the strength of the concrete without breaking it.' },
  { question: 'How much does a structural audit cost in Chennai?', answer: 'Costs depend on the building\'s square footage and the number of NDT tests required. A basic visual inspection for a residential house starts around ₹10,000, while full NDT audits for apartments or commercial buildings are quoted per sq.ft.' },
];

export default function Page() {
  const currentPath = '/structural-audit-chennai';
  const relatedLinks = getContextualLinks('audit', currentPath);

  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Structural Audit</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Certified Structural Audit Services in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Don't ignore the warning signs. Whether you're dealing with extensive wall cracks, roof leaks causing rebar corrosion, or planning to add a new floor to a 20-year-old house, Buildogram provides comprehensive structural audits using advanced Non-Destructive Testing (NDT). 
        </p>

        <AnswerBlock
          question="Why are Chennai buildings highly prone to structural damage?"
          answer="Chennai's coastal environment creates high chloride and moisture exposure in the air. This causes severe corrosion of the TMT steel inside the concrete (rebar rusting). As the steel rusts, it expands, cracking the surrounding concrete (spalling). Regular structural audits identify this hidden cancer before the column or roof collapses."
        />
        
        <ProcessSteps title="Our Audit Methodology" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Planning to Add a Floor?</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Never add a new floor to an existing building without checking the foundation and columns first. Our engineers will scan your existing columns, calculate their current load-bearing capacity, and tell you definitively if they can support the weight of an additional floor. If not, we provide retrofitting designs to strengthen them.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Structural Audit Services in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Rebound Hammer Test', '/rebound-hammer-test-chennai'],
              ['UPV Test', '/upv-test-chennai'],
              ['Rebar Scanning', '/rebar-scanning-chennai'],
              ['Residential Audit', '/residential-structural-audit-chennai'],
              ['Commercial Audit', '/commercial-structural-audit-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book a Structural Audit</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Structural Audit Services in Chennai","path":"/structural-audit-chennai"}]} />
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="audit" currentPath={currentPath} />
</>
  );
}
