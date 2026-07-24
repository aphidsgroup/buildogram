import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Bricks & AAC Blocks in Chennai | Fly Ash & Red Bricks',
  description: 'Compare Red Bricks, Fly Ash Bricks, and AAC Blocks in Chennai. Choose the right wall material for thermal insulation, load-bearing, and cost efficiency.',
  path: '/materials/bricks-aac-blocks',
});

const STEPS = [
  { title: '1. Material Selection', desc: 'We help you choose between AAC Blocks (for high-rises to reduce dead load), Fly Ash Bricks (for cost-efficiency), and Red Bricks (for load-bearing walls or exposed aesthetics).' },
  { title: '2. Compressive Strength Check', desc: 'Random samples are taken from the delivered batch. We check if they meet the required compressive strength (e.g., minimum 3.5 N/mm² for standard bricks).' },
  { title: '3. Water Absorption Test', desc: 'A brick is weighed dry, soaked in water for 24 hours, and weighed again. High water absorption (above 20%) means the brick is weak and will cause dampness inside the house.' },
  { title: '4. Efflorescence Test', desc: 'We check for white salt deposits on the brick surface. High efflorescence indicates poor clay/ash quality and will ruin your wall paint later.' },
];

const DELIVERABLES = [
  'Material Comparison & BOQ Estimation',
  'Water Absorption Field Test',
  'Compressive Strength Verification',
  'Efflorescence Clearance',
  'Supplier Quality Assurance'
];

const FAQS = [
  { question: 'Why are AAC Blocks so popular for apartments in Chennai?', answer: 'Autoclaved Aerated Concrete (AAC) blocks are extremely lightweight. When building a 10-story apartment, using AAC blocks instead of heavy red bricks drastically reduces the "dead load" of the building, allowing the structural engineer to use less steel in the columns, saving huge costs.' },
  { question: 'Do AAC blocks make the house cooler?', answer: 'Yes. AAC blocks contain millions of tiny air bubbles which act as thermal insulation. They prevent Chennai\'s scorching summer heat from entering the house much better than dense concrete or red bricks.' },
  { question: 'Can I use Fly Ash bricks for a load-bearing house?', answer: 'Yes, high-quality, fully cured Fly Ash bricks have excellent compressive strength and uniform shape, making them suitable for load-bearing structures. However, you must ensure they are properly cured at the factory, otherwise they crumble.' },
  { question: 'Why do my red brick walls have white patches?', answer: 'That is called Efflorescence. It happens when the clay used to make the red brick contained excess soluble salts. When the wall gets wet, the salts dissolve and migrate to the surface, pushing the paint off. Testing bricks for efflorescence before buying is critical.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Bricks & AAC Blocks</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Bricks & AAC Blocks in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Choose the right walls for your climate and structure. From traditional chamber-burnt red bricks to modern, thermally insulated AAC blocks, we help you source the highest quality masonry materials that prevent dampness and reduce structural load.
        </p>

        <AnswerBlock
          question="Should you plaster AAC Blocks with regular mortar?"
          answer="No. Because AAC blocks are perfectly uniform, they don't need a thick 1-inch cement plaster. Instead, you should use specialized block-jointing adhesives (chemicals) to bind them, and a thin-coat gypsum plaster or putty directly over the blocks for the interior. Using thick cement plaster defeats the cost-saving purpose of AAC blocks."
        />
        
        <ProcessSteps title="Brick Quality Testing" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>The Red Brick Crisis</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Getting 'First Class' red bricks in Chennai is increasingly difficult due to topsoil mining bans. Much of the supply is under-burnt (yellowish, crumbles easily) or over-burnt (black, brittle). If you prefer the aesthetics or thermal mass of red brick, our engineers physically inspect the brick kilns to select only the perfectly fired, ringing-sound red bricks.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Bricks and AAC Blocks in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Cement', '/materials/cement'],
              ['M-Sand & P-Sand', '/materials/msand-psand'],
              ['TMT Steel', '/materials/tmt-steel'],
              ['RMC', '/materials/rmc'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get Block Pricing</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Bricks & AAC Blocks in Chennai","path":"/materials/bricks-aac-blocks"}]} />
    </>
  );
}
