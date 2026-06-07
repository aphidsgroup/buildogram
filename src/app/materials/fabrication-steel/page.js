import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Fabrication Steel in Chennai | PEB & Structural Sections',
  description: 'Heavy fabrication steel in Chennai. We supply tested I-beams, H-beams, channels, and angles for industrial sheds, PEB buildings, and commercial roofing.',
  path: '/materials/fabrication-steel',
});

const STEPS = [
  { title: '1. Material Specification', desc: 'Structural steel isn\'t just iron. We verify the grade (e.g., IS 2062 Grade A/B/C) to ensure it has the correct tensile strength and ductility required by your structural design.' },
  { title: '2. Dimensional Tolerance Check', desc: 'We inspect the thickness of the flanges and webs. Many unbranded suppliers sell "under-weight" sections that are thinner than specified, dangerously reducing the load capacity.' },
  { title: '3. Mill Test Certificate (MTC)', desc: 'Every batch of steel must come with an MTC from the manufacturer (like SAIL, Tata, or Jindal), legally proving its chemical composition and physical strength.' },
  { title: '4. Anti-Corrosion Treatment', desc: 'Bare steel rusts instantly. We ensure all fabrication steel is properly shot-blasted and coated with red oxide primer or hot-dip galvanized before leaving the yard.' },
];

const DELIVERABLES = [
  'Material Takeoff & BOQ Generation',
  'Verified Supply of Beams, Columns & Plates',
  'Mill Test Certificates (MTC)',
  'Weight Verification at Bridge',
  'Anti-Corrosion Primer Application'
];

const FAQS = [
  { question: 'What is the difference between TMT Steel and Fabrication Steel?', answer: 'TMT (Thermo-Mechanically Treated) steel refers to the ribbed bars buried inside concrete columns to give them tensile strength. Fabrication Steel refers to exposed structural shapes (I-beams, C-channels, plates) used to build metal frameworks, factory sheds, and PEB (Pre-Engineered Buildings).' },
  { question: 'Why does my industrial shed rust so fast in Chennai?', answer: 'Chennai\'s coastal air is highly corrosive due to salt and humidity. If the steel isn\'t thoroughly cleaned (shot-blasted) to remove mill scale before painting, the paint will flake off in months. For coastal areas, we strongly recommend Hot-Dip Galvanizing or heavy-duty Epoxy coatings instead of basic red oxide primer.' },
  { question: 'What does "IS 2062" mean?', answer: 'IS 2062 is the Indian Standard for general structural steel. It ensures the steel has a minimum yield stress (usually 250 MPa). If you buy cheaper, non-standard steel, it might snap instead of bending under heavy wind or crane loads.' },
  { question: 'Can I use fabrication steel to add a floor to my house?', answer: 'Yes! Structural steel is much lighter than concrete. If your old building\'s foundation is weak, adding a lightweight steel-framed floor (covered with cement fiber boards) is a very common, safe, and fast solution.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Fabrication Steel</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Fabrication & Structural Steel in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          The backbone of industrial and fast-track construction. Whether you are building a massive warehouse in Sriperumbudur or a lightweight roof structure in Adyar, we supply certified, full-weight structural steel beams and plates that guarantee safety and longevity.
        </p>

        <AnswerBlock
          question="The 'Under-Weight' Steel Scam"
          answer="A massive issue in the local steel market is 'rolling tolerance abuse'. A supplier will quote a very low price for a 150mm I-Beam, but deliver a beam where the steel is 1mm thinner than the IS standard. Over 10 tons of steel, they steal lakhs of rupees from you, and your building's load capacity is dangerously compromised. We weigh and measure every batch with digital calipers to prevent this."
        />
        
        <ProcessSteps title="Structural Steel Procurement" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Perfect for PEB (Pre-Engineered Buildings)</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Modern factories and warehouses are built using PEB technology. We supply the raw high-tensile plates that are cut and welded into custom tapered columns and rafters. With certified steel, your PEB structure can easily achieve massive clear spans (over 30 meters) without internal columns.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Fabrication Steel Suppliers in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['TMT Steel', '/materials/tmt-steel'],
              ['Cement', '/materials/cement'],
              ['Bricks & AAC Blocks', '/materials/bricks-aac-blocks'],
              ['Waterproofing', '/materials/waterproofing'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get Steel Material Pricing</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Fabrication Steel in Chennai","path":"/materials/fabrication-steel"}]} />
    </>
  );
}
