import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import PartnerJoinForm from './PartnerJoinForm';
import PartnerDirectory from './PartnerDirectory';
import prisma from '@/lib/prisma';
import { safeDbCall } from '@/lib/db/safePrisma';

export const metadata = generateSEOMetadata({
  title: 'Find Top Verified Builders, Contractors & Suppliers in Chennai | Buildogram',
  description: 'Browse Buildogram\'s directory of verified construction partners, builders, architects, material suppliers, and more in Chennai.',
  path: '/partners',
});

// Cache this page for 5 minutes
export const revalidate = 300;

export default async function PartnersPage() {
  const partners = await safeDbCall(() => prisma.partners.findMany({
    where: {
      public_profile_enabled: true
    },
    select: {
      id: true,
      slug: true,
      company_name: true,
      partner_type: true,
      short_description: true,
      logo_url: true,
      service_areas: true,
      services: true,
      years_experience: true,
      project_count: true,
      verification_status: true,
    },
    orderBy: [
      { featured: 'desc' },
      { created_at: 'desc' }
    ]
  }), []);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(252, 110, 32, 0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Verified Construction <br />
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Professionals & Suppliers</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Find trusted builders, architects, material suppliers, and specialized contractors for your next project in Chennai.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#join" className="btn btn-outline-light">Are you a professional? Join Network</Link>
          </div>
        </div>
      </section>

      {/* ── Directory ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <PartnerDirectory partners={partners} />
        </div>
      </section>

      {/* ── Join Form ── */}
      <section id="join" className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="tag">Partner With Us</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginTop: '16px', marginBottom: '16px' }}>Join the Partner Network</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px' }}>Apply now. Get project leads, verified profile, and material benefits.</p>
          </div>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <PartnerJoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
