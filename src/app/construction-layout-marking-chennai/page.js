import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Construction Layout Marking in Chennai | Total Station Setting Out',
  description: 'Precision construction layout and column center line marking in Chennai. We use Total Stations to ensure your building is erected exactly according to the architect\'s plan.',
  path: '/construction-layout-marking-chennai',
});

const STEPS = [
  { title: '1. CAD Upload', desc: 'We take the final structural centerline drawing (AutoCAD file) from your architect and digitally upload it into our Total Station instrument.' },
  { title: '2. Boundary Alignment', desc: 'On site, we calibrate the Total Station with the property\'s exact boundary corners to establish the true orientation of the building.' },
  { title: '3. Centerline Marking', desc: 'Using lasers, the Total Station mathematically guides our surveyor to the exact X and Y coordinate of every column, footing, and retaining wall.' },
  { title: '4. Physical Staking', desc: 'We drive steel pegs or paint the center points physically on the ground or on the newly laid PCC (Plain Cement Concrete) bed.' },
  { title: '5. Handover to Contractor', desc: 'We verify all diagonal measurements and hand over the marked site to the masonry or piling contractor for excavation/drilling.' },
];

const DELIVERABLES = [
  'Column Centerline Marking on Ground/PCC',
  'Pile Point Marking (if applicable)',
  'Excavation Trench Marking',
  'Diagonal Verification Check',
  'Architectural Setback Verification'
];

const FAQS = [
  { question: 'Why can\'t my mason or contractor do the layout marking?', answer: 'Traditional masons use thread (nool) and measuring tapes to mark columns. Tapes stretch, and forming perfect 90-degree angles over large distances is impossible manually. This often results in skewed columns and rooms that aren\'t perfectly square, which ruins tile alignment later.' },
  { question: 'At what stages do I need Layout Marking?', answer: 'Usually twice. First, to mark the excavation trenches on the bare earth. Second, after the PCC (concrete bed) is laid in the pits, to mark the exact center point for the column steel cage to be placed.' },
  { question: 'What happens if a column is marked in the wrong place?', answer: 'If a column is offset by even 2 inches, the structural load doesn\'t transfer straight down to the foundation. Your structural engineer will have to issue a dangerous "eccentric footing" redesign, or you will have an ugly column bulging out of your living room wall.' },
  { question: 'How much does Layout Marking cost?', answer: 'For a standard independent house in Chennai, Total Station layout marking is highly affordable, usually ranging from ₹3,000 to ₹5,000 per visit.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Layout Marking</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Construction Layout Marking in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Don't let manual errors ruin your architect's design. The most critical day on your construction site is Day 1: Marking the columns. We use advanced Total Station lasers to transfer your digital AutoCAD centerline drawing directly onto the physical ground with millimeter perfection.
        </p>

        <AnswerBlock
          question="What is the CMDA Setback Violation risk?"
          answer="The Chennai Metropolitan Development Authority (CMDA) enforces strict setbacks (empty space between your building and the boundary wall). If your mason marks the building manually and accidentally shifts it 6 inches towards the boundary, you violate CMDA rules. This can result in building plan rejection, hefty fines, or demolition notices. Total Station marking guarantees your building stays exactly within the legal footprint."
        />
        
        <ProcessSteps title="Our Setting-Out Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Pile Point Marking</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            If your project requires a Pile Foundation (common in coastal Chennai), layout marking is even more critical. Piling rigs are massive and imprecise. We use the Total Station to mark the exact center of every pile to ensure the rig drills exactly where the structural engineer intended.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Construction Layout Marking in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Total Station Survey', '/total-station-survey-chennai'],
              ['Pile Point Marking', '/pile-point-marking-chennai'],
              ['Topographic Survey', '/topographic-survey-chennai'],
              ['Land Survey', '/land-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book Layout Marking</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Construction Layout Marking in Chennai","path":"/construction-layout-marking-chennai"}]} />
    </>
  );
}
