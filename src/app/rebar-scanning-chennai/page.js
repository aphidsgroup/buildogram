import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Rebar Scanning in Chennai | Cover Meter Test & Concrete Scanning',
  description: 'Locate reinforcement bars, measure concrete cover depth, and estimate rebar diameter before drilling or core cutting. Accurate GPR & Cover Meter testing in Chennai.',
  path: '/rebar-scanning-chennai',
});

const STEPS = [
  { title: '1. Surface Preparation', desc: 'The concrete surface is marked with a reference grid. We ensure the area is clear of external metallic objects that could interfere with the electromagnetic sensors.' },
  { title: '2. Scanning Execution', desc: 'A Cover Meter (Profometer) or Ground Penetrating Radar (GPR) is rolled across the concrete surface to detect the magnetic field variations caused by embedded steel.' },
  { title: '3. Real-time Mapping', desc: 'As the scanner passes over the rebar, the instrument visually plots the location of the main longitudinal bars and the transverse ties (stirrups).' },
  { title: '4. Cover Depth & Diameter Check', desc: 'The scanner accurately measures the thickness of the concrete covering the steel. It also provides an estimation of the rebar diameter (e.g., 16mm or 20mm).' },
  { title: '5. Safe Drilling Marking', desc: 'If the goal is to drill holes for plumbing, core cutting, or retrofitting anchors, we spray-paint "safe zones" on the concrete to avoid hitting any steel.' },
];

const DELIVERABLES = [
  'Rebar Layout Map (Spacing and Orientation)',
  'Concrete Cover Depth Readings',
  'Estimated Rebar Diameters',
  'Safe Drilling/Coring Zones Marked on Site',
  'Structural Detail Verification Report'
];

const FAQS = [
  { question: 'Why is concrete cover depth so important in Chennai?', answer: 'Chennai\'s coastal air contains high levels of chlorides (salt). If the concrete cover over the steel is less than the IS Code requirement (e.g., 40mm for columns), the salt reaches the steel quickly, causing aggressive rusting and concrete spalling.' },
  { question: 'Can you tell me if the builder used the correct amount of steel?', answer: 'Yes. If your structural drawing specifies 16mm rods at 150mm spacing, our scanner can verify if the contractor actually placed them at 150mm spacing or stretched them to 200mm to save money.' },
  { question: 'Is Rebar Scanning required before Core Testing?', answer: 'Absolutely. A core cutting machine uses a diamond drill bit. If you drill blindly and cut through a main load-bearing rebar, you permanently weaken the building. Scanning finds the gaps between the rebars so we can safely extract a concrete core.' },
  { question: 'How deep can the scanner see?', answer: 'A standard electromagnetic Cover Meter is highly accurate up to 100mm-120mm deep. For deeper elements like massive pile caps, we use Ground Penetrating Radar (GPR) which can scan several feet deep.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Rebar Scanning</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Rebar Scanning & Cover Meter Testing in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          See through solid concrete. Whether you need to verify if your builder used the right amount of steel, check your coastal building's concrete cover depth, or find safe spots for plumbing core-cuts, our advanced Rebar Scanners (Profometers) give you an accurate X-ray view of your structure.
        </p>

        <AnswerBlock
          question="Why do plumbers and HVAC technicians need Rebar Scanning?"
          answer="When running new AC ducts or thick plumbing lines through existing slabs or beams, contractors use heavy diamond core cutters. If they accidentally cut through a main reinforcement bar or tension cable, the structural integrity of the entire floor is compromised. We scan the slab first, locate the steel mesh, and draw a 'safe circle' for the plumber to drill through safely."
        />
        
        <ProcessSteps title="How We Scan Concrete" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Structural Verification for Old Buildings</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Lost your structural drawings? If you are planning to renovate or add a floor to a 20-year-old house in Chennai, the first step is reverse-engineering the structure. Our engineers use Rebar Scanning to map out the exact steel skeleton hidden inside your columns and slabs, allowing us to mathematically calculate how much additional weight the building can safely support.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Rebar Scanning in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related NDT Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Core Test Concrete', '/core-test-concrete-chennai'],
              ['Structural Audit', '/structural-audit-chennai'],
              ['UPV Test', '/upv-test-chennai'],
              ['Building Crack Inspection', '/building-crack-inspection-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book a Rebar Scan</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Rebar Scanning in Chennai","path":"/rebar-scanning-chennai"}]} />
    </>
  );
}
