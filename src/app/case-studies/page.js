import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Project Case Studies & Proof | Buildogram',
  description: 'Explore real construction and service case studies by Buildogram. See how we deliver quality, trust, and structural safety across Chennai.',
  path: '/case-studies',
});

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CaseStudiesPage() {
  let caseStudies = [];
  try {
    caseStudies = await prisma.case_studies.findMany({
      where: { status: 'published' },
      orderBy: { created_at: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch case studies during build:', error);
  }

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' }
        ]} 
      />
      
      <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Project Case Studies</h1>
            <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Real construction and service evidence. See how Buildogram solves complex structural problems and ensures top-tier quality for clients.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {caseStudies.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748B', padding: '40px' }}>No case studies published yet.</p>
            ) : (
              caseStudies.map((cs) => (
                <Link href={`/case-studies/${cs.slug}`} key={cs.id} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ height: '200px', background: '#F1F5F9', position: 'relative' }}>
                      {/* Placeholder for media if available, else a standard icon/pattern */}
                      {cs.media && cs.media.length > 0 && cs.media[0].url ? (
                        <Image src={cs.media[0].url} alt={cs.title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E2E8F0', color: '#94A3B8', fontSize: '48px' }}>
                          🏢
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#FC6E20', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>
                        {cs.category}
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '8px', lineHeight: 1.4 }}>{cs.title}</h2>
                      <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📍 {cs.location_area || 'Chennai'}
                      </p>
                      <p style={{ fontSize: '15px', color: '#475569', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {cs.starting_problem}
                      </p>
                      
                      <div style={{ marginTop: '24px', color: '#FC6E20', fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Case Study &rarr;
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
