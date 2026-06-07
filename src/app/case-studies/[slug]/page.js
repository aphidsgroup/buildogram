import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  let caseStudy = null;
  try {
    caseStudy = await prisma.case_studies.findUnique({
      where: { slug: params.slug }
    });
  } catch (err) {
    console.error('generateMetadata error:', err);
  }

  if (!caseStudy) return {};

  return generateSEOMetadata({
    title: caseStudy.seo_title || `${caseStudy.title} | Buildogram Case Study`,
    description: caseStudy.seo_description || `Read about how Buildogram solved ${caseStudy.starting_problem} in ${caseStudy.location_area}.`,
    path: `/case-studies/${caseStudy.slug}`
  });
}

export default async function CaseStudyDetailPage({ params }) {
  const currentPath = `/case-studies${params.slug}`.replace('//', '/');
  const relatedLinks = getContextualLinks('case_study', currentPath);

  let caseStudy = null;
  try {
    caseStudy = await prisma.case_studies.findUnique({
      where: { slug: params.slug }
    });
  } catch (err) {
    console.error('Failed to fetch case study during build:', err);
  }

  if (!caseStudy || caseStudy.status !== 'published') {
    notFound();
  }

  // Generate Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.seo_description || caseStudy.starting_problem,
    author: {
      '@type': 'Organization',
      name: 'Buildogram',
      url: 'https://www.buildogram.in'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Buildogram',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.buildogram.in/logo.png'
      }
    },
    datePublished: caseStudy.created_at,
    dateModified: caseStudy.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.buildogram.in/case-studies/${caseStudy.slug}`
    }
  };

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
          { name: caseStudy.title, path: `/case-studies/${caseStudy.slug}` }
        ]} 
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#F8FAFC' }}>
        <div className="sectionInner" style={{ maxWidth: '900px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <Link href="/case-studies" style={{ color: '#FC6E20', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
              &larr; Back to Case Studies
            </Link>
          </div>

          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', background: '#FFF7ED', color: '#FC6E20', padding: '6px 16px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', marginBottom: '24px' }}>
              {caseStudy.category}
            </div>
            
            <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#0F172A', marginBottom: '24px', lineHeight: 1.2 }}>
              {caseStudy.title}
            </h1>
            
            <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '24px 0', marginBottom: '40px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Location</p>
                <p style={{ fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>{caseStudy.location_area || 'Chennai'}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Property Type</p>
                <p style={{ fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>{caseStudy.property_type || 'Residential'}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Timeline</p>
                <p style={{ fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>{caseStudy.timeline || 'N/A'}</p>
              </div>
            </div>

            {/* Media Gallery (If exists) */}
            {caseStudy.media && caseStudy.media.length > 0 && (
              <div style={{ marginBottom: '48px', position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <Image src={caseStudy.media[0].url} alt={caseStudy.media[0].caption || caseStudy.title} fill style={{ borderRadius: '16px', border: '1px solid #E2E8F0', objectFit: 'cover' }} priority />
                {caseStudy.media[0].caption && (
                  <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '12px', fontStyle: 'italic', position: 'absolute', bottom: '-30px', width: '100%' }}>{caseStudy.media[0].caption}</p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#F1F5F9', color: '#475569', borderRadius: '8px', fontSize: '16px' }}>1</span>
                  The Problem
                </h2>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#334155' }}>{caseStudy.starting_problem}</p>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#F1F5F9', color: '#475569', borderRadius: '8px', fontSize: '16px' }}>2</span>
                  Scope of Work & Process
                </h2>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#334155', marginBottom: '16px' }}>{caseStudy.scope_of_work}</p>
                <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #3B82F6' }}>
                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#0F172A', margin: 0 }}>{caseStudy.process}</p>
                </div>
              </section>

              {caseStudy.observations && (
                <section>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#F1F5F9', color: '#475569', borderRadius: '8px', fontSize: '16px' }}>3</span>
                    Key Observations
                  </h2>
                  <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#334155' }}>{caseStudy.observations}</p>
                </section>
              )}

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#F1F5F9', color: '#475569', borderRadius: '8px', fontSize: '16px' }}>4</span>
                  The Outcome
                </h2>
                <div style={{ background: '#ECFDF5', padding: '24px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#065F46', margin: 0, lineHeight: 1.6 }}>{caseStudy.outcome}</p>
                </div>
              </section>

            </div>

            <div style={{ marginTop: '64px', borderTop: '1px solid #E2E8F0', paddingTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {(caseStudy.tools_used?.length > 0 || caseStudy.materials_used?.length > 0) && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Technical Specs</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {caseStudy.tools_used?.map(t => (
                      <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '15px' }}>
                        <span style={{ color: '#FC6E20' }}>▹</span> {t}
                      </li>
                    ))}
                    {caseStudy.materials_used?.map(m => (
                      <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '15px' }}>
                        <span style={{ color: '#FC6E20' }}>▹</span> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy.proof_records?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Proof Records Generated</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {caseStudy.proof_records.map(r => (
                      <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '15px' }}>
                        <span style={{ color: '#10B981' }}>✓</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', background: '#0F172A', padding: '48px', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Need help with a similar project?</h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Our engineers are ready to assist you. Contact us for a technical consultation.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            </div>
          </div>

        </div>
      </main>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="case_study" currentPath={currentPath} />
</>
  );
}
