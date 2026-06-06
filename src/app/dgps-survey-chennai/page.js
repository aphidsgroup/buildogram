import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'DGPS Survey in Chennai | Satellite-Guided Land Measurement',
  description: 'High-accuracy DGPS surveying in Chennai for large land parcels, CMDA approval coords, and agricultural plots. Fast, satellite-based boundary marking.',
  path: '/dgps-survey-chennai',
});

const STEPS = [
  { title: '1. Base Station Setup', desc: 'We install a DGPS Base Station on a known, fixed coordinate point. This base communicates with satellites to calculate precise error-correction data.' },
  { title: '2. Rover Deployment', desc: 'Our surveyors walk the perimeter and interior of the land using a DGPS Rover. The rover receives real-time corrections from the base station via radio link.' },
  { title: '3. Real-Time Kinematic (RTK) Measurement', desc: 'As the rover is placed on boundary corners, it records X, Y, and Z coordinates with sub-centimeter accuracy instantly.' },
  { title: '4. FMB Superimposition', desc: 'The global coordinate data is overlaid onto the local government FMB (Field Measurement Book) sketch to verify legal boundaries.' },
  { title: '5. Data Export', desc: 'Coordinates are exported in formats required by CMDA/DTCP or imported directly into AutoCAD for drawing generation.' },
];

const DELIVERABLES = [
  'Global Coordinate Data File (CSV/Excel)',
  'AutoCAD Boundary Drawing (.dwg)',
  'FMB Superimposition Report',
  'Area Statement in Acres/Hectares',
  'Google Earth KML Overlay File'
];

const FAQS = [
  { question: 'What is the difference between DGPS and Total Station?', answer: 'Total Station uses lasers and requires a clear line-of-sight between the instrument and the target, making it perfect for dense urban areas. DGPS uses GPS satellites. It works over massive distances (like a 50-acre farm) and through thick bushes, but struggles inside cities surrounded by tall buildings.' },
  { question: 'Why does CMDA require DGPS coordinates?', answer: 'For large developments, CMDA and RERA require absolute global coordinates (Latitude/Longitude) to officially register the exact location of the project on the government\'s master map, ensuring it does not overlap with water bodies or reserve forests.' },
  { question: 'How accurate is DGPS?', answer: 'Standard GPS on your phone is accurate to about 3-5 meters. Differential GPS (DGPS) uses a stationary base to correct atmospheric errors, achieving sub-centimeter (millimeter-level) accuracy.' },
  { question: 'Can you survey a forest or heavily vegetated land?', answer: 'Yes. Unlike a Total Station which requires chopping down bushes to see the target, a DGPS rover only needs a clear view of the sky to communicate with satellites, making it ideal for overgrown plots.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>DGPS Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>DGPS Survey Services in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Measure massive land parcels in hours, not days. If you are developing a large layout in the outskirts of Chennai, surveying agricultural land, or submitting coordinate data for CMDA approval, our Differential GPS (DGPS) surveys provide the global accuracy you need.
        </p>

        <AnswerBlock
          question="When is DGPS the only option?"
          answer="If you are buying a 10-acre parcel in Kanchipuram or Tiruvallur, the land is likely covered in thick shrubs and lacks clear boundary markers. A traditional surveyor would spend a week cutting bushes just to get a line of sight. DGPS ignores the bushes, talks directly to satellites, and maps the exact boundary in a single day, saving you massive amounts of time and labor costs."
        />
        
        <ProcessSteps title="How DGPS (RTK) Works" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>CMDA / DTCP Compliance</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Modern planning permissions in Tamil Nadu require your land coordinates to be integrated into the state's GIS master plan. We export DGPS point data in the exact formats required by the Town and Country Planning department, ensuring your layout approval process is not delayed by technical rejections.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="DGPS Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Total Station Survey', '/total-station-survey-chennai'],
              ['Drone Survey', '/drone-survey-chennai'],
              ['Land Survey', '/land-survey-chennai'],
              ['Topographic Survey', '/topographic-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a DGPS Survey</Link>
        </div>
      </div>
    </main>
  );
}
