import { PrismaClient } from '@prisma/client';
import { compareQuotes } from '@/lib/materials/quoteComparison';
import Link from 'next/link';
import Image from 'next/image';
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const metadata = {
  title: 'Your Material Quotes | Buildogram',
  robots: { index: false, follow: false }
};

export default async function QuoteSummaryPage({ params }) {
  const { token } = await params;

  const quoteRequest = await prisma.material_quote_requests.findUnique({
    where: { summary_token: token },
    include: {
      supplier_quote_responses: {
        where: { status: { in: ['submitted', 'shortlisted'] } },
        include: { partners: { select: { company_name: true } } }
      }
    }
  });

  if (!quoteRequest) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <h2>Quote Not Found</h2>
        <p>The link may be invalid or expired.</p>
      </div>
    );
  }

  const { recommendedQuoteId, recommendationNote, analysis } = compareQuotes(quoteRequest.supplier_quote_responses);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '1px solid #E2E8F0', paddingBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>Material Quote Comparison</h1>
            <p style={{ color: '#64748B', margin: 0 }}>Prepared for <strong>{quoteRequest.customer_name}</strong> • Project: <strong>{quoteRequest.project_area || quoteRequest.delivery_location}</strong></p>
          </div>
          <Image src="/logo.png" alt="Buildogram" width={150} height={40} style={{ height: '40px', width: 'auto', opacity: 0.8 }} />
        </div>

        {analysis.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', background: '#F1F5F9', borderRadius: '12px' }}>
            We are currently gathering quotes from verified suppliers. Please check back shortly.
          </div>
        ) : (
          <>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#9A3412', margin: '0 0 8px 0' }}>Buildogram Recommendation</h3>
              <p style={{ color: '#C2410C', margin: 0 }}>{recommendationNote}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${analysis.length}, 1fr)`, gap: '24px' }}>
              {analysis.map((a, i) => (
                <div key={a.quoteId} style={{ border: a.quoteId === recommendedQuoteId ? '2px solid #FC6E20' : '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', position: 'relative', background: 'white' }}>
                  {a.quoteId === recommendedQuoteId && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#FC6E20', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>
                      Best Fit
                    </div>
                  )}
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0', textAlign: 'center' }}>Supplier {i + 1}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Brand</span>
                      <strong style={{ color: '#0F172A' }}>{a.brand || '-'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Spec</span>
                      <strong style={{ color: '#0F172A' }}>{a.rawQuote.grade_spec || '-'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Qty</span>
                      <strong style={{ color: '#0F172A' }}>{a.rawQuote.quantity || '-'} {a.rawQuote.unit || ''}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Transport</span>
                      <strong style={{ color: '#0F172A' }}>₹{a.transport}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>GST Included?</span>
                      <strong style={{ color: '#0F172A' }}>{a.isGstIncluded ? 'Yes' : 'No'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Timeline</span>
                      <strong style={{ color: '#0F172A' }}>{a.timeline || '-'}</strong>
                    </div>
                    
                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', marginTop: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Total Landed Cost</div>
                      <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>₹{a.totalLandedCost.toLocaleString()}</div>
                      {!a.isGstIncluded && <div style={{ fontSize: '11px', color: '#EF4444' }}>(Calculated with 18% GST)</div>}
                    </div>

                    {a.missingWarnings.length > 0 && (
                      <div style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px', padding: '8px', background: '#FEF2F2', borderRadius: '6px' }}>
                        <strong>Warnings:</strong>
                        <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                          {a.missingWarnings.map(w => <li key={w}>{w}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button style={{ padding: '16px 32px', background: '#FC6E20', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(252, 110, 32, 0.4)' }}>
                Accept Recommended Quote
              </button>
              <Link href="/contact" style={{ padding: '16px 32px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', textDecoration: 'none' }}>
                Talk to Buildogram
              </Link>
            </div>
          </>
        )}
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
        <p>This quote comparison is securely generated by Buildogram and is valid for 7 days.</p>
        <p>All transactions are protected and managed through your Property Passport.</p>
      </div>
    </div>
  );
}
