import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Land Survey in Chennai | Boundary & Plot Survey Services | Buildogram',
  description: 'Buildogram connects you with verified surveyors for land boundary survey, plot measurement, total station survey, and CAD drawings in Chennai. Engineer-led, report-based survey support.',
  path: '/land-survey-chennai',
});

const STEPS = [
  { title: '1. Site Assessment', desc: 'Review of plot documents, previous survey records, and site access conditions before field work begins.' },
  { title: '2. Equipment Setup & Control Points', desc: 'Total station or DGPS equipment is set up. Reference control points are established using known benchmarks.' },
  { title: '3. Field Survey & Measurement', desc: 'Boundary corners are located, measured, and marked. All angular and distance data is recorded in the field.' },
  { title: '4. CAD Processing & Drawing', desc: 'Field data is processed and converted into a scaled CAD survey drawing with coordinates, dimensions, and area calculations.' },
  { title: '5. Report & Deliverable', desc: 'A formal boundary survey report is issued with CAD drawings, coordinates, and plot area certification.' },
];

const DELIVERABLES = [
  'Boundary Survey Report',
  'CAD Drawing (DWG / PDF)',
  'Plot Measurement Certificate',
  'GPS Coordinates of Corners',
  'Site Sketch with Dimensions',
  'Area Calculation Statement',
];

const FAQS = [
  { question: 'What is a land boundary survey?', answer: 'A land boundary survey determines the precise legal boundaries of a plot using instruments like total station or DGPS, and produces a CAD drawing with coordinates and area calculations.' },
  { question: 'How long does a land survey take in Chennai?', answer: 'A typical residential plot survey takes 1–2 days for field work and 1–2 days for CAD processing and report preparation, depending on plot size and complexity.' },
  { question: 'What documents are needed before a land survey?', answer: 'You will need your sale deed, patta, FMB sketch or previous survey sketch, and encumbrance certificate. Our team will review these before field work.' },
  { question: 'Can Buildogram arrange surveyors for plots outside Chennai?', answer: 'Yes. Our verified surveyor network covers major districts in Tamil Nadu. Contact our team to check availability for your specific location.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <a href="/" style={{ color: '#FC6E20' }}>Home</a> / <a href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</a> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Land Survey in Chennai</span>
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Land Survey in Chennai</h1>
        <AnswerBlock
          question="Why do you need a land survey before construction?"
          answer="A land boundary survey establishes the exact legal boundaries of your plot, prevents encroachment disputes, ensures your building layout is within approved limits, and produces the CAD drawings required for plan approval submissions in Chennai."
        />
        <ProcessSteps title="Our Land Survey Process" steps={STEPS} />
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>What You Receive</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {DELIVERABLES.map(d => (
              <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#374151' }}>
                <span style={{ color: '#10B981', fontWeight: 700 }}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>
        <EntitySummary serviceName="Land Survey in Chennai" />
        <LocalIntentBlock />
        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Topographic Survey', '/topographic-survey-chennai'],
              ['DGPS Survey', '/dgps-survey-chennai'],
              ['Construction Layout Marking', '/construction-layout-marking-chennai'],
              ['Soil Testing', '/soil-testing-chennai'],
              ['Drone Survey', '/drone-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Request a Land Survey</Link>
        </div>
      </div>
    </main>
  );
}
