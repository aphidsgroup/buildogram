import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'UPV Test in Chennai | Ultrasonic Pulse Velocity for Concrete',
  description: 'NABL-accredited UPV testing in Chennai. We use Ultrasonic Pulse Velocity to detect internal cracks, honeycombing, and concrete homogeneity without damaging structures.',
  path: '/upv-test-chennai',
});

const STEPS = [
  { title: '1. Grid Preparation', desc: 'The concrete surface (columns/beams) is cleaned, and a measurement grid is marked. Grease or acoustic couplant is applied for signal transmission.' },
  { title: '2. Transducer Placement', desc: 'We place the transmitter and receiver on opposite sides (Direct), adjacent sides (Semi-Direct), or the same face (Indirect) depending on site accessibility.' },
  { title: '3. Pulse Transmission', desc: 'An ultrasonic pulse is sent through the concrete. The instrument measures the exact time taken for the wave to travel through the material.' },
  { title: '4. Velocity Calculation', desc: 'Velocity is calculated (Distance / Time). A velocity above 4.5 km/s indicates excellent concrete; below 3.0 km/s indicates poor or cracked concrete.' },
  { title: '5. Data Interpretation', desc: 'Our structural engineers correlate UPV data with Rebound Hammer readings to generate a comprehensive 3D internal health map of the member.' },
];

const DELIVERABLES = [
  'Ultrasonic Pulse Velocity Report',
  'Internal Void & Honeycomb Detection Map',
  'Concrete Homogeneity Assessment',
  'Crack Depth Estimation',
  'Combined NDT Graph (UPV + Rebound Hammer)'
];

const FAQS = [
  { question: 'What does a UPV Test tell you that a Rebound Hammer cannot?', answer: 'A Rebound Hammer only tests the outer 30mm surface hardness. UPV sends sound waves completely through the concrete, detecting internal voids, honeycombing, and deep cracks that are invisible from the outside.' },
  { question: 'How do you detect honeycombing using UPV?', answer: 'Sound waves travel faster through solid matter. If the pulse velocity drops suddenly in a specific section of a column, it means the sound had to travel around pockets of air (honeycombing).' },
  { question: 'Can UPV test estimate the exact compressive strength?', answer: 'UPV measures concrete quality and uniformity, not direct compressive strength. However, when correlated with Core Testing and Rebound Hammer data (SONREB method), it provides a highly accurate strength estimation.' },
  { question: 'Does UPV damage the building?', answer: 'No, it is a completely Non-Destructive Test (NDT). We only use a washable acoustic gel on the surface to ensure the sensors connect properly with the concrete.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>UPV Test</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Ultrasonic Pulse Velocity (UPV) Test in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Look inside your concrete without breaking it. Whether you suspect poor compaction by your builder or want to check the integrity of a 30-year-old structure in Chennai, our UPV testing detects internal flaws, voids, and crack depths with pinpoint ultrasonic accuracy.
        </p>

        <AnswerBlock
          question="Why is UPV critical for Chennai's coastal buildings?"
          answer="Poor concrete compaction leaves tiny internal air pockets (honeycombing). In Chennai's humid, salt-rich environment, these air pockets allow moisture and chlorides to easily penetrate deep into the column, rusting the internal steel much faster. UPV identifies these porous zones so they can be pressure-grouted before corrosion starts."
        />
        
        <ProcessSteps title="UPV Testing Procedure" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Crack Depth Measurement</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            If you see a visible crack on your slab or beam, the most important question is: <em>How deep does it go?</em> A surface crack is harmless, but a structural crack that reaches the reinforcement steel is dangerous. By placing UPV transducers on either side of the crack, we mathematically calculate its exact depth.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="UPV Test in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related NDT Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Structural Audit', '/structural-audit-chennai'],
              ['Rebound Hammer Test', '/rebound-hammer-test-chennai'],
              ['Core Test Concrete', '/core-test-concrete-chennai'],
              ['Rebar Scanning', '/rebar-scanning-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book a UPV Test Today</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"UPV Test in Chennai","path":"/upv-test-chennai"}]} />
    </>
  );
}
