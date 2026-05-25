'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// DUMMY DATA FROM PROTOTYPE
const categories = [
  {id:"architects", label:"Architects", p:"14+ verified firms for design and planning.", proof:"120+ projects"},
  {id:"builders", label:"Builders", p:"Turnkey execution with escrow safety.", proof:"38 active sites"},
  {id:"contractors", label:"Contractors", p:"Specialized execution for civil, MEP, solar.", proof:"Covering TN"},
  {id:"materials", label:"Material Network", p:"Direct from distributors for bulk rates.", proof:"4 major brands"}
];

const partners = [
  {id:"p1", name:"Horizon Builders", type:"Turnkey Builder", stat:"4 sites active", loc:"OMR, Chennai"},
  {id:"p2", name:"Studio Archi", type:"Architectural Design", stat:"12 designs done", loc:"Anna Nagar"},
  {id:"p3", name:"Steel Traders", type:"Primary Material", stat:"TMT & Cement", loc:"Ambattur"}
];

const projects = [
  {id:"pj1", name:"Villa 4BHK", stage:"Structure (70%)", loc:"ECR", partner:"Horizon Builders"},
  {id:"pj2", name:"Commercial Plaza", stage:"Finishing", loc:"Velachery", partner:"Raju Constructions"}
];

const materials = [
  {id:"m1", name:"UltraTech Cement", type:"PPC 50kg", route:"Direct Supply", diff:"-8% vs retail"},
  {id:"m2", name:"Tata Tiscon", type:"500D TMT", route:"Distributor", diff:"-5.5% vs retail"}
];

function Metric({ label, value }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.trim()) {
      router.push(`/partners/directory?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <section className={styles.homeHero}>
          <div>
            <span className={styles.eyebrow}>Construction ecosystem marketplace</span>
            <h1>Find materials, verified professionals, project proof and property tours in one Buildogram network.</h1>
            <p>Built for Chennai and Tamil Nadu buyers who need trusted construction discovery, not a generic brochure site.</p>
            <form onSubmit={handleSearch} className={styles.searchPanel}>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search cement, TMT, builders, architects, 360° tours..."/>
              <button type="submit" className="btn btn-primary">Search marketplace</button>
            </form>
            <div className={styles.quick}>
              <Link href="/materials"><button type="button">Find materials</button></Link>
              <Link href="/partners/directory"><button type="button">Find contractors</button></Link>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer"><button type="button">Explore property tours</button></a>
            </div>
          </div>
          <div className={styles.heroBoard}>
            <Metric label="Verified ecosystem" value="Site-proofed" />
            <Metric label="Material route" value="Supplier-led" />
            <Metric label="Property bridge" value="360° tours" />
            <Metric label="Execution trust" value="Verified routing" />
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.blockHead}>
            <h2>Marketplace Ecosystem</h2>
            <p>Direct routes to verified execution, supply, and spatial planning.</p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map(c => (
              <button key={c.id} onClick={() => router.push(`/partners/directory?category=${c.id}`)}>
                <b>{c.label}</b>
                <span>{c.p}</span>
                <em>{c.proof}</em>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Directory Core</span>
            <h2>Verified Partners</h2>
            <p>Search contractors and architects who have passed site-proof verification.</p>
          </div>
          <div className={`${styles.cards} ${styles.three}`}>
            {partners.map(p => (
              <article className={styles.partnerCard} key={p.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.1rem' }}>
                <div className={styles.cardTop}>
                  <span>{p.type}</span>
                  <strong>Verified</strong>
                </div>
                <h3>{p.name}</h3>
                <p>{p.loc}</p>
                <div className={styles.tags}>
                  <span>{p.stat}</span>
                </div>
                <div className={styles.cardFooter}>
                  <Link href={`/partners/directory?q=${p.name}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>View profile</Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link href="/partners/directory" className="btn btn-outline">Explore full directory</Link>
          </div>
        </section>

        <section className={styles.rateBoard}>
          <div>
            <span className={styles.eyebrow}>Material Routes</span>
            <h2>Rate Advantage</h2>
            <p>We connect your BOQ directly to distributors and primary stockists in Chennai, bypassing sub-retail markups.</p>
            <div style={{ marginTop: '24px' }}>
              <Link href="/materials" className="btn btn-primary">Request bulk quote</Link>
            </div>
          </div>
          <div className={styles.table}>
            {materials.map(m => (
              <div className={styles.row} key={m.id}>
                <div>
                  <b>{m.name}</b><br/>
                  <span>{m.type}</span>
                </div>
                <div>
                  <em>{m.route}</em><br/>
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>{m.diff}</span>
                </div>
                <Link href="/materials" className="btn btn-outline">Quote</Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Execution Proof</span>
            <h2>Project Showcase</h2>
            <p>Live tracking of sites built by the Buildogram partner network.</p>
          </div>
          <div className={`${styles.cards} ${styles.two}`}>
            {projects.map(p => (
              <article key={p.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.1rem' }}>
                <div className={styles.visual}>Site Progress View</div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--secondary)' }}>{p.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{p.loc} • By {p.partner}</p>
                <div className={styles.tags} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'var(--bg)', padding: '4px 10px', borderRadius: '100px', fontSize: '12px', color: 'var(--text-muted)' }}>{p.stage}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.portalPanel}>
          <div className={styles.tour}>360&deg;</div>
          <div>
            <span className={styles.eyebrow}>Property Bridge</span>
            <h2>Property Portals</h2>
            <p>Connected to RealProp Realty and Toletboard Chennai for immediate buying, selling, or leasing with 360&deg; tour verification.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center' }}>Buy/Sell Properties</a>
            <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>Rent/Lease Properties</a>
          </div>
        </section>

        <section className={styles.lead}>
          <h2>Ready to run Buildogram as an operating network?</h2>
          <p>Join as a verified partner to access leads, or sign in to manage your construction BOQ.</p>
          <div>
            <Link href="/partners/register" className="btn btn-primary">Join as Partner</Link>
            <Link href="/login" className="btn btn-outline-light">Login to OS</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
