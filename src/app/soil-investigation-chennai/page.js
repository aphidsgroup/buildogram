import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Soil Investigation & Testing in Chennai | SBC Report | Buildogram',
  description: 'NABL-accredited soil testing in Chennai. Get accurate Safe Bearing Capacity (SBC) reports, SPT tests, and borehole drilling for safe foundation design.',
  path: '/soil-investigation-chennai',
});

const STEPS = [
  { title: '1. Site Reconnaissance', desc: 'Engineers assess site accessibility for drilling rigs, check for underground utilities, and determine the number of boreholes required based on building footprint.' },
  { title: '2. Borehole Drilling & SPT', desc: 'We drill 10m to 30m deep boreholes using rotary rigs and perform Standard Penetration Tests (SPT) at regular intervals to measure soil resistance.' },
  { title: '3. Undisturbed Sample Collection', desc: 'UDS (Undisturbed Soil) and disturbed samples are collected at various depths and sealed in wax to preserve natural moisture content for lab testing.' },
  { title: '4. NABL Lab Testing', desc: 'Samples undergo sieve analysis, Atterberg limits, direct shear, and unconfined compression tests in our NABL-accredited laboratory.' },
  { title: '5. Geotechnical Report & SBC', desc: 'A senior Geotechnical Engineer provides a comprehensive report recommending the foundation type, depth, and exact Safe Bearing Capacity (SBC).' },
];

const DELIVERABLES = [
  'NABL-Accredited Geotechnical Report',
  'Safe Bearing Capacity (SBC) Values',
  'Foundation Type Recommendation (Shallow vs Pile)',
  'Borehole Logs & Stratigraphy Profile',
  'Groundwater Table Assessment',
  'Settlement Analysis'
];

const FAQS = [
  { question: 'Why is a soil test mandatory before building a house?', answer: 'Without knowing the Safe Bearing Capacity (SBC) of the soil, your structural engineer will either over-design the foundation (wasting lakhs of rupees) or under-design it (risking building collapse and settlement cracks).' },
  { question: 'How many boreholes are needed for a typical 30x40 residential plot?', answer: 'For a standard 30x40 or 30x50 plot (1200 - 1500 sq.ft) planning a G+2 structure, 2 boreholes of 10-15 meter depth are usually sufficient to capture the soil profile.' },
  { question: 'Is soil in Chennai suitable for normal isolated footings?', answer: 'It depends heavily on the zone. Areas like Anna Nagar and T-Nagar usually have good hard soil allowing normal footings. Coastal areas (ECR, OMR) often have loose sandy or clayey soil requiring raft or pile foundations. Only a soil test can confirm.' },
  { question: 'How much does a soil test cost in Chennai?', answer: 'Pricing depends on the depth and number of boreholes. A standard 2-borehole test for a residential plot typically costs between ₹15,000 to ₹25,000, including the NABL lab report.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/soil-investigation-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Soil Investigation</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>NABL-Accredited Soil Investigation in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Don't guess your foundation depth. Get accurate Safe Bearing Capacity (SBC) reports backed by rigorous Standard Penetration Tests (SPT) and laboratory analysis. From tight residential plots in Velachery requiring tripod rigs, to massive commercial developments on OMR needing heavy rotary rigs, we deliver precision geotechnical data.
        </p>

        <AnswerBlock
          question="What happens if you skip the Soil Test?"
          answer="Skipping a ₹20,000 soil test is the most expensive mistake in construction. If your structural engineer assumes an SBC of 15 t/m² but the actual soil only supports 10 t/m², your house will inevitably sink, causing massive diagonal wall cracks. Alternatively, if they assume 15 t/m² but the soil supports 25 t/m², you will unnecessarily waste ₹2-3 Lakhs on oversized steel and concrete footings."
        />
        
        <ProcessSteps title="Our Geotechnical Testing Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Chennai Soil Challenges</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Chennai has highly diverse soil profiles. Southern areas like <strong>Pallikaranai and Velachery</strong> have marshy, highly compressible clay that causes massive settlement issues without pile foundations. Coastal stretches like <strong>ECR and Thiruvanmiyur</strong> have loose marine sand requiring high water-table management. Central zones like <strong>Guindy</strong> often hit hard rock within 3 meters. A standardized foundation drawing simply does not work in Chennai.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Soil Investigation in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Pile Foundation Contractors', '/pile-foundation-contractors-chennai'],
              ['Plate Load Test', '/plate-load-test-chennai'],
              ['Land Survey', '/land-survey-chennai'],
              ['Construction Cost Estimation', '/construction-cost-estimation-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Soil Test Today</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Soil Investigation & Testing in Chennai","path":"/soil-investigation-chennai"}]} />
    </>
  );
}
