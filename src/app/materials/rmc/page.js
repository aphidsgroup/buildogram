import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'RMC (Ready Mix Concrete) in Chennai | Concrete Suppliers',
  description: 'Verified RMC (Ready Mix Concrete) suppliers in Chennai. High-grade M20 to M50 concrete delivered via transit mixers with verified slump and compressive strength.',
  path: '/materials/rmc',
});

const STEPS = [
  { title: '1. Mix Design Approval', desc: 'Before ordering, we verify the RMC plant\'s Mix Design document to ensure the correct ratio of cement, aggregates, water, and admixtures for your required grade (e.g., M25).' },
  { title: '2. Transit Time Monitoring', desc: 'Concrete starts setting once mixed. We ensure the transit mixer travels from the RMC plant to your Chennai site within the critical 90-120 minute window.' },
  { title: '3. On-Site Slump Test', desc: 'As soon as the truck arrives, we perform a Slump Cone test to check the workability. If the concrete is too dry or too watery (often due to drivers illegally adding water), we reject the load.' },
  { title: '4. Concrete Cube Casting', desc: 'During pouring, we cast 150mm concrete cubes. These are cured and crushed in an NABL lab at 7 days and 28 days to legally prove the concrete achieved its designed strength.' },
];

const DELIVERABLES = [
  'Mix Design Approval Report',
  'Transit Time & Batch Ticket Verification',
  'On-Site Slump Test Results',
  '7-Day & 28-Day Cube Test Certificates',
  'Continuous Pouring Management'
];

const FAQS = [
  { question: 'Why use RMC instead of mixing concrete on-site (Site Mix)?', answer: 'Manual site mixing is inconsistent. Laborers often guess the sand/cement ratio and add too much water to make it easier to shovel, destroying the strength. RMC is mixed in a computerized batching plant, ensuring molecular-level accuracy and guaranteed strength.' },
  { question: 'Is RMC more expensive than site mixing?', answer: 'RMC is slightly more expensive per cubic meter, but it eliminates cement wastage, sand theft, and saves massive amounts of labor time. For large slabs, RMC is actually cheaper and infinitely safer.' },
  { question: 'What is a Boom Pumper?', answer: 'If your site is in a narrow street where the massive RMC truck cannot reach the pouring area, we use a Boom Pump—a separate truck with a long robotic arm (pipe) that pumps the concrete over walls and directly onto your roof slab.' },
  { question: 'Why do contractors add water to the RMC truck?', answer: 'Thick, high-strength concrete is difficult to spread and level. Lazy contractors often ask the truck driver to add water to make it flow like soup. This is disastrous. Adding water dilutes the cement paste and severely reduces the final strength. Our engineers strictly forbid unauthorized water addition.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Ready Mix Concrete (RMC)</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Ready Mix Concrete (RMC) in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Guaranteed strength, delivered to your door. For large roof slabs and deep pile foundations, manual mixing is too slow and risky. We supply verified, computerized RMC from top-tier batching plants in Chennai, backed by rigorous on-site testing.
        </p>

        <AnswerBlock
          question="What happens if the RMC truck gets stuck in Chennai traffic?"
          answer="Concrete has an initial setting time. If a truck gets stuck in OMR or Guindy traffic for 3 hours, the concrete will begin to set inside the rotating drum. Pumping partially set concrete creates a weak, porous slab (cold joints). Buildogram engineers calculate transit times carefully, use retarding admixtures if necessary, and will ruthlessly reject any expired batch."
        />
        
        <ProcessSteps title="RMC Quality Assurance" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Continuous Pouring & Cold Joints</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            A roof slab must be poured monolithically (as a single solid piece). If RMC trucks are delayed and the first half of the slab dries before the second half is poured, a dangerous 'cold joint' forms—a perfect pathway for rainwater leaks. We manage the supply chain to ensure trucks arrive back-to-back for a flawless, continuous pour.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="RMC Suppliers in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Cement', '/materials/cement'],
              ['TMT Steel', '/materials/tmt-steel'],
              ['M-Sand & P-Sand', '/materials/msand-psand'],
              ['Waterproofing', '/materials/waterproofing'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get RMC Pricing</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"RMC (Ready Mix Concrete) in Chennai","path":"/materials/rmc"}]} />
    </>
  );
}
