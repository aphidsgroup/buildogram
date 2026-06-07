import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Rebound Hammer Test in Chennai | NDT Concrete Strength Check',
  description: 'Certified Rebound Hammer testing services in Chennai. Instantly measure the compressive strength of existing concrete columns, beams, and slabs without core cutting.',
  path: '/rebound-hammer-test-chennai',
});

const STEPS = [
  { title: '1. Surface Preparation', desc: 'The concrete surface is cleaned and ground smooth using a carborundum stone to ensure the hammer impacts bare concrete, not plaster or paint.' },
  { title: '2. Grid Marking', desc: 'A 300mm x 300mm grid is drawn on the structural member (column, beam, or slab) to ensure impacts are evenly distributed.' },
  { title: '3. Impact Testing', desc: 'Our technicians strike the concrete with the Schmidt Rebound Hammer. We take 9 to 15 readings per grid area to calculate an accurate average rebound number.' },
  { title: '4. Data Calibration', desc: 'The rebound numbers are cross-referenced with calibration charts specific to the hammer\'s impact angle (horizontal, vertically up, or vertically down).' },
  { title: '5. Strength Certification', desc: 'A formal NDT report is issued detailing the estimated compressive strength (e.g., M20, M25) of the tested elements.' },
];

const DELIVERABLES = [
  'Estimated Compressive Strength Report (N/mm²)',
  'Grid-wise Rebound Number Logs',
  'Photographic Evidence of Testing Locations',
  'Correlation with Core Test Data (if applicable)',
  'Engineer\'s Suitability Assessment'
];

const FAQS = [
  { question: 'What exactly does a Rebound Hammer measure?', answer: 'It measures the surface hardness of concrete. When the hammer\'s spring-loaded mass impacts the concrete, it bounces back. Harder, higher-strength concrete results in a higher "rebound number".' },
  { question: 'Can the Rebound Hammer test replace a Core Test?', answer: 'No. The Rebound Hammer is a rapid screening tool for surface hardness. For legally binding or critical structural decisions, it should be correlated with at least one destructive Core Test.' },
  { question: 'Why do you need to remove the paint before testing?', answer: 'The hammer must impact the actual concrete matrix. Plaster, putty, and paint are soft layers that will absorb the impact, resulting in artificially low and inaccurate strength readings.' },
  { question: 'How much does a Rebound Hammer test cost in Chennai?', answer: 'Costs usually range between ₹2,000 to ₹5,000 per visit for a standard residential check, depending on the number of points (columns/beams) being tested.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Rebound Hammer Test</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Rebound Hammer Test in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Suspect your builder used poor quality concrete? Instantly verify the compressive strength of your columns and slabs without drilling holes. The Rebound Hammer (Schmidt Hammer) is the fastest, non-destructive way to check if your concrete meets the M20 or M25 grade promised to you.
        </p>

        <AnswerBlock
          question="When should you request a Rebound Hammer Test?"
          answer="You should request this test if 1) Your concrete cubes failed the 28-day lab test and you need to check the poured slab. 2) You are buying an old building and want a quick assessment of its structural health. 3) You notice honeycombing or severe cracks in newly cast columns."
        />
        
        <ProcessSteps title="Testing Procedure" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Understanding the Limitations</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            While highly effective, the Rebound Hammer only tests the outer 30mm of the concrete. If the surface is carbonated (common in old Chennai buildings exposed to coastal air), it may falsely show higher strength. This is why our engineers often pair the Rebound Hammer with <strong>Ultrasonic Pulse Velocity (UPV)</strong> testing to scan the internal depth of the concrete.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Rebound Hammer Test in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Structural Audit', '/structural-audit-chennai'],
              ['UPV Test', '/upv-test-chennai'],
              ['Core Test for Concrete', '/core-test-concrete-chennai'],
              ['Rebar Scanning', '/rebar-scanning-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book an NDT Test</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Rebound Hammer Test in Chennai","path":"/rebound-hammer-test-chennai"}]} />
    </>
  );
}
