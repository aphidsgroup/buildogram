import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Elevator & Lift Contractors in Chennai | Home Lift Installation | Buildogram',
  description: 'Find verified elevator and home lift installation contractors in Chennai. CMRS-compliant shaft design, PESO certification, and annual maintenance contracts.',
  path: '/partners/elevators',
});

const TYPES = [
  { icon: '🏠', name: 'Home Lifts (Residential)', brands: 'KONE · Otis · Schindler · Stannah', desc: 'Hydraulic and traction home lifts. Load capacity: 3–6 persons. Speed: 0.6–1.0 m/s. Machine Room Less (MRL) options available.', capacity: '250–450 kg' },
  { icon: '🏢', name: 'Passenger Elevators', brands: 'KONE · Otis · ThyssenKrupp', desc: 'Commercial and apartment buildings. Load capacity: 8–26 persons. Speeds up to 1.75 m/s. Gearless traction motors.', capacity: '630–1,600 kg' },
  { icon: '📦', name: 'Goods & Freight Lifts', brands: 'Mitsubishi · Custom fabrication', desc: 'Industrial, warehouse, and retail goods movement. Heavy-duty fabricated cabs and doors. Capacity up to 5,000 kg.', capacity: '1,000–5,000 kg' },
  { icon: '♿', name: 'Accessibility Lifts', brands: 'Terry · Savaria · Local fabricators', desc: 'Platform lifts and stairlifts for differently-abled users. Low speed, low-pit options. Designed for homes and public buildings.', capacity: '200–300 kg' },
];

const CRITERIA = [
  { icon: '📜', title: 'CMRS Approval Experience', desc: 'Tamil Nadu Chief Inspector of Lifts (CMRS) approvals require technical drawings, load calculations, and inspection by a licensed lift engineer. Our partners have handled CMRS filings in Chennai.' },
  { icon: '🏅', title: 'Manufacturer Authorization', desc: 'Authorized installation partner for the brands they install. Unauthorized installations void manufacturer warranties and may fail CMRS inspection.' },
  { icon: '🔧', title: 'AMC (Annual Maintenance)', desc: 'Provide Annual Maintenance Contracts with defined visit schedules, emergency breakdown response times, and parts availability commitments.' },
  { icon: '⚡', title: 'ARD (Automatic Rescue Device)', desc: 'All elevators must have ARD installed per NBC 2016 — automatically lowers the elevator to the nearest floor during power failure and opens doors.' },
];

const SHAFT_NOTES = [
  'Minimum shaft size for a standard 4-person home lift: 1500 × 1600mm (interior platform) with 100mm clearance all sides',
  'Pit depth: typically 600–900mm (MRL) to 1200–1500mm (conventional traction)',
  'Overhead clearance: minimum 2800mm from top landing floor to shaft ceiling',
  'CMDA building plan must show shaft dimensions and structural beam details at each floor',
  'Structural engineer must verify shaft walls can carry the elevator guide rail loads',
];

export default function ElevatorsPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Elevator Partners</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Elevator & Lift Installers in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>CMRS-compliant, manufacturer-authorized elevator installers in Chennai — for home lifts, passenger elevators, and goods lifts with AMC coverage.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=elevator-quote" className="btn btn-primary btn-lg">Get Elevator Quote</Link>
            <Link href="/join-as-partner" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Join as Partner</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Elevator Types in Our Network</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {TYPES.map(t => (
              <div key={t.name} className="card">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{t.name}</h3>
                      <span style={{ fontSize: '11px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>{t.capacity}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginBottom: '4px' }}>{t.brands}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Partner Verification Criteria</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CRITERIA.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.12)', borderRadius: 'var(--radius-lg)', padding: '32px 36px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Shaft Design Notes for New Construction</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>If you are planning an elevator in a new build, discuss shaft dimensions with your structural engineer and architect at the design stage — retrofitting a shaft later is expensive and often structurally disruptive.</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SHAFT_NOTES.map(note => (
              <li key={note} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', listStyle: 'none' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>→</span>{note}
              </li>
            ))}
          </ul>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🛗</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Get Elevator Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Share your shaft dimensions and building type — we get you 2–3 verified quotes from authorized installers.</p>
            <Link href="/contact?type=elevator-quote" className="btn btn-primary">Get Quote</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔧</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Elevator Contractor?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Join our verified partner network and receive pre-qualified elevator installation leads in Chennai.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Elevators', path: '/partners/elevators' }]} />
    </>
  );
}
