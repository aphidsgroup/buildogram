import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'M-Sand & P-Sand in Chennai | River Sand Alternatives',
  description: 'High-quality M-Sand for concrete and P-Sand for plastering in Chennai. Silt-free, properly washed manufactured sand for strong, crack-free construction.',
  path: '/materials/msand-psand',
});

const STEPS = [
  { title: '1. Silt Content Testing', desc: 'Silt makes concrete weak. We conduct on-site jar tests to ensure the silt content in the M-Sand is strictly below the IS Code permissible limit of 3%.' },
  { title: '2. Particle Size Gradation', desc: 'M-Sand must have a specific mix of coarse and fine particles to minimize voids in concrete. We verify the sieve analysis reports from the crusher.' },
  { title: '3. Flakiness Index Check', desc: 'If the sand particles are too flat or flaky, they reduce concrete workability. We ensure the sand is cubical, having been shaped correctly in a VSI (Vertical Shaft Impactor) crusher.' },
  { title: '4. Delivery Verification', desc: 'We verify the weighbridge (tare) receipts to ensure you are receiving the exact tonnage you paid for, preventing common delivery fraud.' },
];

const DELIVERABLES = [
  'Silt Content Field Test Results',
  'Gradation Verification (Zone II / III)',
  'Weighbridge Ticket Verification',
  'Cost vs Tonnage Optimization',
  'Crusher Source Approval'
];

const FAQS = [
  { question: 'What is the difference between M-Sand and P-Sand?', answer: 'M-Sand (Manufactured Sand) has slightly coarser particles (up to 4.75mm) and is used for structural concrete (slabs, columns) and brickwork. P-Sand (Plastering Sand) is finely sieved (usually below 2.36mm) and is used specifically for wall plastering to achieve a smooth finish.' },
  { question: 'Is River Sand better than M-Sand?', answer: 'No. Legally sourced River Sand is practically unavailable in Chennai. The illegal river sand sold is often mixed with filter sand or sea sand, containing dangerous chlorides that rust your steel. High-quality, washed M-Sand from an approved VSI crusher is scientifically stronger and safer for concrete than unverified river sand.' },
  { question: 'Why is my plastering cracking even after using P-Sand?', answer: 'If P-Sand is not properly "washed" at the crusher, it contains excessive micro-dust. This dust absorbs water, causing the plaster to shrink and crack as it dries. You must always insist on single or double-washed P-Sand.' },
  { question: 'How is it measured in Chennai?', answer: 'M-Sand and P-Sand are typically sold in "Units" (1 Unit = 100 cubic feet) or directly by Tonnage. A standard 6-wheel lorry carries around 2 to 2.5 Units.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>M-Sand & P-Sand</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>M-Sand & P-Sand in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          The foundation of your concrete and plastering. In Chennai, the quality of Manufactured Sand (M-Sand) varies wildly. Using unwashed, dust-filled sand will ruin your concrete strength and cause severe wall cracks. We help you procure IS-compliant, VSI-crushed, and properly washed sand.
        </p>

        <AnswerBlock
          question="The Dangers of 'Filter Sand'"
          answer="A common scam in Chennai is selling 'Filter Sand' (soil that has been washed and sieved) as cheap River Sand or mixing it with M-Sand. Filter sand has zero structural strength and contains organic matter that rots inside your concrete. Buildogram engineers strictly prohibit filter sand on all our supervised sites."
        />
        
        <ProcessSteps title="Quality Verification Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>VSI vs Jaw Crusher Sand</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Never buy M-Sand produced by a Jaw Crusher. It creates elongated, needle-like particles that lock together poorly and require excess cement to bind. Quality M-Sand is produced by a Vertical Shaft Impactor (VSI), which creates smooth, cubical particles that mimic the natural shape of river sand, providing excellent workability and strength.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="M-Sand and P-Sand in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Cement', '/materials/cement'],
              ['TMT Steel', '/materials/tmt-steel'],
              ['Bricks & AAC Blocks', '/materials/bricks-aac-blocks'],
              ['RMC', '/materials/rmc'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get M-Sand Pricing</Link>
        </div>
      </div>
    </main>
  );
}
