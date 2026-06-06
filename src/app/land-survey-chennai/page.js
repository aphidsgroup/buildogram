import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Land Surveyors in Chennai | DGPS, Total Station & FMB Sketch',
  description: 'Hire licensed land surveyors in Chennai for accurate boundary marking, FMB sketch matching, and topographic surveys. Advanced DGPS and Total Station equipment used.',
  path: '/land-survey-chennai',
});

const STEPS = [
  { title: '1. FMB & Document Review', desc: 'We cross-verify your sale deed, patta, and government FMB (Field Measurement Book) sketch to establish the legal boundaries of your property.' },
  { title: '2. Equipment Setup (DGPS/Total Station)', desc: 'Depending on the plot size and urban density, we deploy millimeter-accurate Total Station equipment or DGPS rovers to establish ground control points.' },
  { title: '3. Boundary & Topo Measurement', desc: 'Our licensed surveyors physically mark the corner points, measure diagonals, and capture elevation data if a topographic survey is requested.' },
  { title: '4. FMB Superimposition', desc: 'We digitally overlay the physical measurements onto the government FMB sketch to identify encroachments or dimensional mismatches.' },
  { title: '5. CAD Delivery & Marking', desc: 'You receive precise AutoCAD (.dwg) and PDF drawings. We can also permanently fix boundary stones on-site.' },
];

const DELIVERABLES = [
  'Superimposed CAD Drawing (Physical vs FMB)',
  'Precise Area Calculation (Sq.ft & Cents)',
  'Diagonal Measurements for Architects',
  'Boundary Stone Fixing (Optional)',
  'High-Resolution Topographic Contour Map (If opted)',
  'Surveyor Certification Report'
];

const FAQS = [
  { question: 'Why can’t I just use a measuring tape instead of a surveyor?', answer: 'Measuring tapes stretch and cannot accurately measure angles or diagonals on irregularly shaped plots. This leads to incorrect area calculations, risking FSI (Floor Space Index) violations and CMDA approval rejection.' },
  { question: 'What is an FMB Sketch and why is it important in Chennai?', answer: 'The Field Measurement Book (FMB) sketch is a government record maintained by the Tahsildar office. We superimpose your physical plot dimensions over the FMB sketch to prove legal ownership dimensions before you build or buy.' },
  { question: 'Do I need a land survey before buying a plot?', answer: 'Absolutely. A pre-purchase boundary survey ensures you aren’t buying encroached land or a plot that is physically smaller than what is stated in the sale deed.' },
  { question: 'What is the difference between Total Station and DGPS?', answer: 'Total Station uses a laser to measure distances from a single point, ideal for smaller residential plots in dense Chennai areas. DGPS uses satellite signals for massive tracts of land or agricultural plots where line-of-sight is impossible.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Land Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Precision Land Surveying in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Resolve boundary disputes, match your physical plot with the FMB sketch, and get accurate topographic data for architectural planning. Whether you're buying a plot in OMR or building an apartment in Anna Nagar, our licensed surveyors use advanced DGPS and Total Station technology to secure your legal boundaries.
        </p>

        <AnswerBlock
          question="When do you absolutely need a Land Survey?"
          answer="You need a professional survey when: 1) Buying a new plot to ensure the physical dimensions match the sale deed. 2) Before architectural planning to provide exact coordinates and diagonals. 3) To resolve encroachment disputes with neighbors. 4) For CMDA or DTCP plan approval submissions."
        />
        
        <ProcessSteps title="Our Survey Methodology" steps={STEPS} />
        
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Survey Deliverables</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {DELIVERABLES.map(d => (
              <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#374151', lineHeight: 1.5 }}>
                <span style={{ color: '#10B981', fontWeight: 700, marginTop: '2px' }}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '40px 0', padding: '32px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '16px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Common Mistake: Skipping Construction Layout Marking</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Many property owners get a boundary survey but let their local mason mark the column centerlines using threads and tapes. This often results in skewed columns, forcing the architect to alter room dimensions. We provide <strong>Total Station Layout Marking</strong> to digitally transfer your architect's AutoCAD centerline drawing directly onto the physical site before earthwork excavation begins.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Land Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Total Station Survey', '/total-station-survey-chennai'],
              ['DGPS Survey', '/dgps-survey-chennai'],
              ['Contour Survey', '/contour-survey-chennai'],
              ['Construction Layout Marking', '/construction-layout-marking-chennai'],
              ['Soil Testing', '/soil-testing-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Surveyor Today</Link>
        </div>
      </div>
    </main>
  );
}
