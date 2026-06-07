import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import Link from 'next/link';
import PartnerApplicationForm from '@/components/partner/PartnerApplicationForm';

export const metadata = generateSEOMetadata({ 
  title: 'Join Buildogram as a Verified Partner | AI Construction Ecosystem', 
  description: 'Join Buildogram’s AI-driven, engineer-led construction and property ecosystem. Builders, architects, engineers, and suppliers apply here.', 
  path: '/join-as-partner' 
});

const STEPS = [
  { title: '1. Apply Online', desc: 'Submit the application form with your business details, portfolio, and service areas.' }, 
  { title: '2. Verification', desc: 'Our Ops team verifies your identity, credentials, portfolio, and past project quality.' }, 
  { title: '3. Profile Creation', desc: 'Once approved, an SEO-optimized public profile is auto-drafted for you.' }, 
  { title: '4. Join Partner OS', desc: 'Access the Partner OS to receive verified leads, manage projects, and showcase proof assets.' }, 
  { title: '5. Grow Your Business', desc: 'Benefit from Buildogram’s marketing engine and lead marketplace.' }
];

const FAQS = [
  { question: 'Who can join the Buildogram Partner Ecosystem?', answer: 'We welcome Builders, Contractors, Architects, Structural Engineers, Surveyors, Soil/NDT Labs, Piling Contractors, Material Suppliers, Fabricators, Interior Designers, and more.' }, 
  { question: 'What is the Partner OS?', answer: 'The Partner OS is our proprietary operating system where verified partners can manage leads, track project progress, collaborate with clients in the Client Room, and build Case Studies.' }, 
  { question: 'How much does it cost?', answer: 'Applying is free. We operate on a lead assignment or commission model depending on the category. Detailed terms are shared upon successful verification.' }, 
  { question: 'Why do you verify partners?', answer: 'Buildogram is an engineer-led platform built on trust. We verify all partners to ensure clients receive high-quality, transparent, and technically sound services.' }
];

export default function JoinAsPartnerPage() { 
  return ( 
    <>
      <main className='page' style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#F8FAFC' }}>
        <div className='sectionInner'>
          
          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
            <Link href='/' style={{ color: '#FC6E20' }}>Home</Link> / 
            <span style={{ color: '#0F172A', fontWeight: 600 }}> Join as a Partner</span>
          </div>

          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#0F172A', marginBottom: '24px', lineHeight: 1.2 }}>
              Join Buildogram’s AI-driven, engineer-led construction ecosystem.
            </h1>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6 }}>
              Scale your business, access high-intent leads, and manage projects effortlessly through our Partner OS. 
              We are looking for top-tier construction professionals, material suppliers, and vendors to join our trusted network.
            </p>
          </div>

          <ProcessSteps title='How Verification Works' steps={STEPS} />

          <div style={{ marginTop: '64px', marginBottom: '64px' }}>
            <PartnerApplicationForm />
          </div>

          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', marginBottom: '64px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', color: '#0F172A' }}>The Partner OS Advantage</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Lead Marketplace</h3>
                <p style={{ color: '#475569' }}>Access verified, high-intent leads matched to your service areas and expertise.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Project Proof & SEO</h3>
                <p style={{ color: '#475569' }}>Showcase your work with Case Studies and Proof Assets that rank high on Google.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Client Room</h3>
                <p style={{ color: '#475569' }}>Collaborate with clients transparently, share documents, and track milestones effortlessly.</p>
              </div>
            </div>
          </div>

          <FAQBlock title='Frequently Asked Questions' faqs={FAQS} />
          
          <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
            <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Useful Links</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                ['Partner Directory', '/partners'],
                ['Case Studies', '/case-studies'],
                ['Proof Assets', '/proof'],
                ['Partner OS Login', '/partner-os']
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>  
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Join as a Partner", path: "/join-as-partner" }
      ]} />
    </>
  ); 
}
