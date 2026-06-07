import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Engineering Proof & Field Updates | Buildogram',
  description: 'Real field updates, structural audits, construction progress, and material quality checks from Buildogram engineers in Chennai.',
};

export default async function ProofFeedPage() {
  const prisma = new PrismaClient();
  let proofs = [];

  try {
    proofs = await prisma.proof_assets.findMany({
      where: {
        approved_for_website: true,
        privacy_status: {
          not: 'private'
        }
      },
      orderBy: { created_at: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching proofs:', err);
  }

  return (
    <>
      <section className="hero" style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>📍 Field Evidence</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px' }}>
            Engineering Proof & Field Updates
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '600px', lineHeight: 1.7 }}>
            Real construction milestones, material quality checks, and structural audits executed by Buildogram engineers across Chennai.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#F8FAFC' }}>
        <div className="container">
          {proofs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: '18px', color: '#64748B' }}>No field updates available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '24px' }}>
              {proofs.map(proof => (
                <Link key={proof.id} href={`/proof/${proof.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card card-hover" style={{ height: '100%', background: 'white', border: '1px solid #E2E8F0', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '24px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{proof.category.replace('_', ' ')}</span>
                        <span style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px' }}>📍 {proof.area || 'Chennai'}</span>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', lineHeight: 1.4 }}>{proof.title}</h3>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '0' }}>{proof.description}</p>
                    </div>
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #F1F5F9', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#0F172A', fontWeight: 600 }}>View full report</span>
                      <span style={{ color: 'var(--primary)' }}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
