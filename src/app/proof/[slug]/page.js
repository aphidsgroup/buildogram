import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const prisma = new PrismaClient();
  const { slug } = params;
  
  const proof = await prisma.proof_assets.findUnique({
    where: { slug }
  });

  if (!proof || !proof.approved_for_website) {
    return { title: 'Not Found' };
  }

  return {
    title: `${proof.title} in ${proof.area || 'Chennai'} | Buildogram Proof`,
    description: proof.description.substring(0, 160),
    alternates: {
      canonical: `/proof/${proof.slug}`
    }
  };
}

export default async function ProofDetailPage({ params }) {
  const currentPath = `/proof${params.slug}`.replace('//', '/');
  const relatedLinks = getContextualLinks('proof', currentPath);

  const prisma = new PrismaClient();
  const { slug } = params;

  const proof = await prisma.proof_assets.findUnique({
    where: { slug }
  });

  if (!proof || !proof.approved_for_website) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: proof.title,
    description: proof.description,
    author: {
      '@type': 'Organization',
      name: 'Buildogram',
      url: 'https://buildogram.in'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Buildogram',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buildogram.in/logo-icon.png'
      }
    },
    datePublished: proof.created_at,
    dateModified: proof.updated_at
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section style={{ background: '#0F172A', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {proof.category.replace('_', ' ')}
            </span>
            {proof.area && (
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', background: 'rgba(252, 110, 32, 0.1)', border: '1px solid rgba(252, 110, 32, 0.3)', padding: '6px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📍 {proof.area}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '24px' }}>
            {proof.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
            {proof.description}
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {proof.methods_used && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚙️ Methods & Equipment Used
                </h2>
                <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: '8px', color: '#475569', lineHeight: 1.6 }}>
                  {proof.methods_used}
                </div>
              </div>
            )}

            {proof.materials_used && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🧱 Materials Verified
                </h2>
                <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: '8px', color: '#475569', lineHeight: 1.6 }}>
                  {proof.materials_used}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '32px', marginTop: '16px' }}>
              <div style={{ background: 'var(--gradient-dark)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Need engineering support in {proof.area || 'Chennai'}?</h3>
                <p style={{ color: '#CBD5E1', marginBottom: '24px' }}>Buildogram protects property owners with transparent, engineer-led execution.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <Link href={proof.linked_service_url || "/contact"} className="btn btn-primary">
                    Request Service
                  </Link>
                  <Link href="/proof" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                    View All Proof
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="proof" currentPath={currentPath} />
</>
  );
}
