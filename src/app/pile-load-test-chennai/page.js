import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Pile Load Test in Chennai | Static Load Capacity Testing',
  description: 'Initial and Routine Pile Load Testing in Chennai. Prove the ultimate bearing capacity of your foundation piles with certified kentledge static load testing.',
  path: '/pile-load-test-chennai',
});

const STEPS = [
  { title: '1. Test Pile Casting', desc: 'A specific pile is cast and allowed to cure fully (typically 28 days for full strength) before testing can commence.' },
  { title: '2. Kentledge Assembly', desc: 'We build a massive platform over the test pile and load it with dead weights (kentledge)—usually concrete blocks or sandbags—equivalent to 1.5 to 2.5 times the pile\'s designed safe load.' },
  { title: '3. Hydraulic Jack Setup', desc: 'A hydraulic jack and calibrated load cells are placed between the pile head and the kentledge platform. Dial gauges are fixed to measure settlement.' },
  { title: '4. Incremental Loading', desc: 'Load is applied in increments (e.g., 20% of safe load at a time). The settlement (sinking) of the pile is recorded at each stage over a period of 24-48 hours.' },
  { title: '5. Load-Settlement Graph', desc: 'The data is plotted into a graph. If the pile rebounds sufficiently when the load is removed, and the total settlement is within IS Code limits, the pile passes.' },
];

const DELIVERABLES = [
  'Certified Load-Settlement Graph',
  'Ultimate Bearing Capacity Report',
  'Elastic Rebound Analysis',
  'IS:2911 Compliance Certificate',
  'Foundation Safety Endorsement'
];

const FAQS = [
  { question: 'What is the difference between an Initial and a Routine Pile Load Test?', answer: 'An Initial Test is done on a sacrificial test pile before the main construction begins, loaded up to 2.5 times the safe load to find the ultimate breaking point. A Routine Test is done on a working pile (one that will be part of the building) loaded up to 1.5 times the safe load.' },
  { question: 'Is Static Load testing legally required in Chennai?', answer: 'For large commercial buildings, high-rises, and government projects, IS:2911 code mandates pile load testing. CMDA structural engineers will require the test reports before issuing completion certificates.' },
  { question: 'Can I do a Dynamic Load Test instead?', answer: 'Dynamic testing is much faster and cheaper as it uses a dropped weight and sensors instead of building a massive kentledge platform. However, IS Codes usually require at least one Static Load Test for initial calibration; Dynamic tests can be used for the remaining routine tests.' },
  { question: 'How long does a Static Load Test take?', answer: 'Building the kentledge platform takes 2-3 days. The actual loading and observation period takes 24 to 48 hours continuously, followed by unloading.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Pile Foundation</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Pile Load Test</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Static Pile Load Testing in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Prove your foundation can handle the weight. Before you build a 10-story apartment on marshy Chennai soil, a Static Pile Load Test physically demonstrates that your concrete piles will not sink under the immense pressure of the building.
        </p>

        <AnswerBlock
          question="Why do engineers insist on a Kentledge Static Load Test?"
          answer="Soil reports give a theoretical Safe Bearing Capacity. Piling execution is prone to human error. A Static Load Test bridges the gap between theory and reality. By stacking hundreds of tons of concrete blocks over the pile and pressing down with a hydraulic jack, we physically prove—without a shadow of a doubt—that the pile can support the building."
        />
        
        <ProcessSteps title="Kentledge Load Test Procedure" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Pull-Out and Lateral Testing</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            In addition to vertical compression testing, tall structures (like chimneys or telecom towers) and retaining walls experience severe wind loads and soil pressure in Chennai. We also conduct <strong>Pull-Out (Uplift) Tests</strong> to ensure the pile isn't ripped out of the ground by wind, and <strong>Lateral Load Tests</strong> to ensure it doesn't bend sideways.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Pile Load Test in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Piling Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Dynamic Pile Load Test', '/dynamic-pile-load-test-chennai'],
              ['Pile Integrity Test', '/pile-integrity-test-chennai'],
              ['Bored Cast-In-Situ', '/bored-cast-in-situ-piles-chennai'],
              ['DMC Piling', '/dmc-piling-contractors-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Book a Load Test</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Pile Load Test in Chennai","path":"/pile-load-test-chennai"}]} />
    </>
  );
}
