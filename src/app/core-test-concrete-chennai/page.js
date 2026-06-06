import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Concrete Core Testing in Chennai | NABL Accredited NDT',
  description: 'Legally verify your concrete strength with NABL-accredited Core Testing in Chennai. We extract concrete cylinder samples and crush them in our lab for exact compressive strength data.',
  path: '/core-test-concrete-chennai',
});

const STEPS = [
  { title: '1. Rebar Scanning (Pre-Coring)', desc: 'Before drilling, our engineers use a cover meter to scan the concrete. We locate the reinforcement steel to ensure the core drill bit does not cut any load-bearing rebars.' },
  { title: '2. Diamond Core Extraction', desc: 'Using a water-cooled diamond-tipped core drilling machine, we extract a solid cylindrical sample of concrete (usually 75mm or 100mm diameter) from the structure.' },
  { title: '3. Core Preparation', desc: 'The extracted core is taken to our NABL-accredited laboratory. The ends are trimmed flat and capped with sulfur or high-strength gypsum to ensure uniform load distribution during testing.' },
  { title: '4. Compression Testing', desc: 'The core is placed in a calibrated Universal Testing Machine (UTM) and crushed to failure. The exact load at which the concrete breaks is recorded.' },
  { title: '5. Equivalent Cube Strength Report', desc: 'Using IS 516 standards, we apply correction factors (for length/diameter ratio and drilling direction) to calculate the equivalent 28-day cube compressive strength.' },
];

const DELIVERABLES = [
  'NABL-Accredited Core Test Report',
  'Equivalent Cube Compressive Strength (N/mm²)',
  'Density and Moisture Analysis of Core',
  'Photographic Evidence of Extraction & Crushing',
  'Engineer\'s Structural Safety Endorsement'
];

const FAQS = [
  { question: 'Why choose a Core Test over a Rebound Hammer test?', answer: 'Rebound Hammer only tests the outer surface hardness. A Core Test is a partially destructive test that extracts actual concrete from deep inside the structure and physically crushes it in a lab. It provides the most accurate, legally accepted proof of concrete strength.' },
  { question: 'Will drilling a hole weaken my building?', answer: 'No. The core diameter is typically small (75mm-100mm). More importantly, we always perform Rebar Scanning first to avoid cutting the steel reinforcement. Once the core is extracted, the hole is immediately packed with non-shrink, high-strength epoxy grout.' },
  { question: 'What happens if my Core Test fails the M20/M25 requirement?', answer: 'If the core strength is significantly lower than the designed grade, our structural engineers will perform a load analysis. If the member is unsafe, we will provide retrofitting solutions (like column jacketing or carbon fiber wrapping) to strengthen the structure.' },
  { question: 'How much does Core Testing cost in Chennai?', answer: 'Costs involve site mobilization, drilling, and NABL lab crushing. It generally ranges from ₹4,000 to ₹7,000 per core, depending on the location and number of cores required.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Core Test</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Concrete Core Testing Services in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Get the ultimate proof of concrete quality. When non-destructive tests (like Rebound Hammer) show doubtful results, or when standard test cubes fail, Core Testing is the only legally binding way to prove the true compressive strength of your in-situ concrete structure in Chennai.
        </p>

        <AnswerBlock
          question="When is Core Testing mandatory?"
          answer="Core Testing is required by IS Codes when: 1) The 28-day concrete test cubes fail in the lab. 2) There is a dispute between the client and contractor regarding concrete quality. 3) You are assessing an old, undocumented building for a major renovation or adding a new floor."
        />
        
        <ProcessSteps title="Our Core Extraction & Testing Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>The Core Extraction Rule</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Never let a contractor drill a core from your building without scanning it first. Cutting through a main column rebar reduces its load capacity drastically. Buildogram engineers strictly mandate <strong>Rebar Scanning</strong> before any core cutting machine is activated on site, ensuring 100% structural safety.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Core Test Concrete in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related NDT Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Rebar Scanning', '/rebar-scanning-chennai'],
              ['UPV Test', '/upv-test-chennai'],
              ['Structural Audit', '/structural-audit-chennai'],
              ['Rebound Hammer Test', '/rebound-hammer-test-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book a Core Test</Link>
        </div>
      </div>
    </main>
  );
}
