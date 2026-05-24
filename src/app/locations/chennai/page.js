import Link from 'next/link';

export const metadata = {
  title: 'Top Construction Company in Chennai | Buildogram',
  description: 'Looking for the best home builders in Chennai? Buildogram offers PhD-grade structural engineering, transparent BOQ pricing, and 100% verified material tracking.',
  keywords: ['home construction chennai', 'builders in chennai', 'house construction cost chennai', 'best construction company chennai', 'turnkey contractors chennai', 'buildogram chennai'],
};

export default function ChennaiLocationPage() {
  return (
    <>
            <div className="page" style={{ paddingTop: '40px', minHeight: '100vh', background: '#f8fafc' }}>
        
        {/* HERO */}
        <section style={{ background: 'var(--primary-dark)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
              <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chennai's Leading Engineers</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
              Building <span style={{ color: '#FFDA01' }}>Chennai</span> with Proof,<br /> Not Promises.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.7, marginBottom: '32px' }}>
              Whether you're building in OMR, ECR, Anna Nagar, or Tambaram, our PhD-led structural team ensures your home withstands coastal salinity, clay soil profiles, and monsoon flooding.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">Book Free Chennai Site Visit</Link>
          </div>
        </section>

        {/* CONTENT */}
        <section className="container" style={{ padding: '64px 20px' }}>
          <div className="grid-2" style={{ gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', marginBottom: '24px' }}>Why Build in Chennai with Buildogram?</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '8px' }}>1. Coastal Soil Engineering</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>Chennai's ECR and OMR regions have high salinity and sandy soil profiles. We design deep pile foundations and use Tata CRS (Anti-Corrosion) steel to ensure a 50+ year lifespan.</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '8px' }}>2. CMDA & GCC Compliance</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>We handle all local planning permissions, ensuring your FSI (Floor Space Index) matches the latest Greater Chennai Corporation rules without illegal deviations.</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '8px' }}>3. Transparent Broadway Material Rates</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>We source materials directly from primary dealers in Broadway and Mannady, passing the wholesale cost savings directly to you through our open-book BOQ system.</p>
              </div>
            </div>
            
            <div className="card" style={{ padding: '40px', background: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '16px' }}>Current Chennai Build Rates (2025)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Classic Spec</span>
                  <span style={{ color: 'var(--primary)' }}>₹1,750 / sq.ft</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Premium Spec</span>
                  <span style={{ color: 'var(--primary)' }}>₹2,200 / sq.ft</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Royal Spec</span>
                  <span style={{ color: 'var(--primary)' }}>₹2,850 / sq.ft</span>
                </li>
              </ul>
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Link href="/cost-estimator" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Calculate Exact Cost</Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEIGHBORHOODS */}
        <section style={{ background: 'white', padding: '64px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', marginBottom: '40px' }}>Areas We Serve in Chennai</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
              {['OMR', 'ECR', 'Anna Nagar', 'Velachery', 'Tambaram', 'Porur', 'Guindy', 'Adyar', 'Madipakkam', 'Medavakkam', 'Navalur', 'Sholinganallur', 'Pallikaranai', 'Guduvanchery'].map(area => (
                <span key={area} style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
