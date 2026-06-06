import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Pile Integrity Test in Chennai | Low Strain NDT for Piles',
  description: 'Fast, NABL-accredited Pile Integrity Testing (PIT) in Chennai. We detect cracks, necking, and bulging in concrete piles using low-strain sonic echo testing.',
  path: '/pile-integrity-test-chennai',
});

const STEPS = [
  { title: '1. Pile Head Preparation', desc: 'The top surface of the concrete pile is chipped to expose hard, sound concrete. It is then ground perfectly flat to ensure good sensor contact.' },
  { title: '2. Sensor Attachment', desc: 'A highly sensitive accelerometer is firmly attached to the prepared pile head using a temporary adhesive or wax.' },
  { title: '3. Sonic Hammer Impact', desc: 'A trained engineer strikes the pile head with a specialized hand-held sonic hammer, generating a low-strain stress wave that travels down the pile shaft.' },
  { title: '4. Wave Reflection Analysis', desc: 'The stress wave reflects off the toe (bottom) of the pile, as well as any defects (cracks, necking) along the way. The accelerometer records these returning echoes.' },
  { title: '5. Software Interpretation', desc: 'The recorded signals (reflectograms) are analyzed in advanced software to determine the pile length and identify the exact depth and severity of any structural defects.' },
];

const DELIVERABLES = [
  'Pile Integrity Reflectogram Graphs',
  'Defect Depth & Severity Report (Necking/Bulging)',
  'Estimated Pile Length Verification',
  'IS:14893 Compliance Certificate',
  'Engineer\'s Acceptance/Rejection Recommendation'
];

const FAQS = [
  { question: 'Why is Pile Integrity Testing mandatory in Chennai?', answer: 'Unlike columns, piles are cast underground where you cannot see them. If the soil collapses during pouring, or if the concrete mixes with groundwater, the pile will have a massive gap (necking) in the middle. PIT is the only way to "see" if the underground concrete column is solid before you build a heavy apartment on it.' },
  { question: 'Can PIT measure the load capacity of the pile?', answer: 'No. Pile Integrity Testing (PIT) only checks the physical continuous shape and quality of the concrete. It does not tell you how much weight the pile can hold. For weight capacity, you must perform a Static Pile Load Test.' },
  { question: 'How many piles should be tested?', answer: 'According to IS codes, for critical structures, 100% of the piles should undergo PIT. Because the test is fast and inexpensive, testing every pile is the industry standard to guarantee zero foundation failures.' },
  { question: 'What happens if a pile fails the Integrity Test?', answer: 'If a major defect (like a severe neck or complete break) is found, the pile is rejected. The structural engineer will usually require you to drill a new replacement pile adjacent to the failed one, and redesign the pile cap to accommodate the shift.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Pile Foundation</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Pile Integrity Test</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Pile Integrity Testing (PIT) in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Look deep underground without digging. When you pour concrete into a deep pile hole, you must verify that it formed a solid, continuous column. Our low-strain sonic echo tests detect hidden cracks, soil inclusions, and bulging in your piles with pinpoint accuracy.
        </p>

        <AnswerBlock
          question="What is 'Necking' and why is it dangerous?"
          answer="Necking occurs when wet soil or groundwater washes away the wet concrete while the pile is being cast. This leaves a narrow, weak 'neck' in the middle of an otherwise thick pile. When the building's weight is eventually applied, this weak neck will snap, causing catastrophic foundation settlement. PIT detects necking immediately so the pile can be rejected before construction continues."
        />
        
        <ProcessSteps title="How Sonic Echo Testing Works" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Fast & Non-Destructive</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Unlike Static Load testing which takes days to set up, Pile Integrity Testing is incredibly fast. A single trained engineer can test up to 50 to 100 piles in a single day across a large apartment site in Chennai, providing rapid assurance to your structural consultant without delaying your project timeline.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Pile Integrity Test in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Piling Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Pile Load Test', '/pile-load-test-chennai'],
              ['Bored Cast-In-Situ', '/bored-cast-in-situ-piles-chennai'],
              ['DMC Piling Contractors', '/dmc-piling-contractors-chennai'],
              ['Dynamic Pile Load Test', '/dynamic-pile-load-test-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Book an Integrity Test</Link>
        </div>
      </div>
    </main>
  );
}
