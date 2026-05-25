'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState('Chennai, TN');

  const categories = [
    { title: "Materials", desc: "Direct from verified manufacturers & distributors.", cta: "Request quotes" },
    { title: "Builders", desc: "Verified builders with active project proofs.", cta: "Find builders" },
    { title: "Contractors", desc: "Specialists in RCC, finishing, and MEP.", cta: "Hire contractors" },
    { title: "Architects", desc: "Top-rated design and structural experts.", cta: "View portfolios" }
  ];

  const partners = [
    { name: "Apex Construction", type: "Builder", proof: "3 Active Sites", tags: ["Turnkey", "Residential"] },
    { name: "StructCore Eng", type: "Structural", proof: "Verified License", tags: ["RCC", "Design"] },
    { name: "Prime Steels", type: "Supplier", proof: "Direct Distributor", tags: ["TMT", "Cement"] },
    { name: "Urban Space", type: "Architect", proof: "15+ Completed", tags: ["Villas", "Commercial"] }
  ];

  const materials = [
    { name: "TMT Steel 550D", retail: "Request Quotes", network: "Compare Suppliers" },
    { name: "OPC 53 Grade Cement", retail: "Request Quotes", network: "Compare Suppliers" },
    { name: "M-Sand (Plastering)", retail: "Request Quotes", network: "Compare Suppliers" }
  ];

  const projects = [
    { title: "Skyline Villa", stage: "Superstructure", location: "ECR, Chennai", tags: ["Live Tracking", "Quality Audit"] },
    { title: "TechPark Phase 2", stage: "Finishing", location: "OMR, Chennai", tags: ["BOQ Verified", "Commercial"] }
  ];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/partners/directory?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(loc)}`);
    }
  };

  return (
    <main className="marketplacePage">
      
      {/* 1. Full-Bleed Hero Section */}
      <section className={styles.homeHeroBg}>
        <div className="sectionInnerWide">
          <div className={styles.homeHero}>
            <div className={styles.heroLeft}>
              <span className={styles.eyebrow}>The Construction Ecosystem</span>
              <h1>Build your vision.<br />We connect the rest.</h1>
              <p>Find materials, verified professionals, project proof and property tours in one unified platform.</p>
              
              <form className={styles.heroSearchPanel} onSubmit={handleHeroSearch}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  placeholder="What do you need?" 
                />
                <select value={loc} onChange={e => setLoc(e.target.value)}>
                  <option value="Chennai, TN">Chennai, TN</option>
                  <option value="Coimbatore, TN">Coimbatore, TN</option>
                </select>
                <button type="submit" className="btn btn-primary">Search</button>
              </form>

              <div className={styles.quick}>
                <Link href="/materials">Find Material Rates</Link>
                <Link href="/partners/directory?q=architect">Architects</Link>
                <Link href="/partners/directory?q=builder">Builders</Link>
                <Link href="/projects">View Projects</Link>
              </div>
            </div>

            <div className={styles.heroBoard}>
              <div className={styles.metric}>
                <span>Verified Partners</span>
                <b>Active Network</b>
              </div>
              <div className={styles.metric}>
                <span>Material Quotes</span>
                <b>Direct Network</b>
              </div>
              <div className={styles.metric}>
                <span>Active Projects</span>
                <b>Tracking Live</b>
              </div>
              <div className={styles.metric}>
                <span>360° Tours</span>
                <b>Property Bridge</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Grid Section */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Marketplace Discovery</span>
            <h2>Explore the network</h2>
            <p>Access direct distributors and verified professionals for your construction lifecycle.</p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((c, i) => (
              <Link href="/partners/directory" key={i} className={styles.categoryCard}>
                <b>{c.title}</b>
                <span>{c.desc}</span>
                <em>{c.cta} →</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Verified Partners */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Verified Network</span>
            <h2>Hire with confidence</h2>
            <p>Every partner on Buildogram is verified for credentials, past projects, and ongoing quality.</p>
          </div>
          <div className={`${styles.cards} ${styles.four}`}>
            {partners.map((p, i) => (
              <div key={i} className={styles.partnerCard}>
                <div className={styles.cardTop}>
                  <span>{p.type}</span>
                  <strong>Verified</strong>
                </div>
                <h3>{p.name}</h3>
                <span className={styles.proof}>🛡 {p.proof}</span>
                <div className={styles.tags}>
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className={styles.cardFooter}>
                  <Link href="/partners/directory" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>View Profile</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Materials Rate Advantage */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInnerWide">
          <div className={styles.rateBoard}>
            <div className={styles.blockHead} style={{ marginBottom: 0 }}>
              <span className={styles.eyebrow}>Direct Procurement</span>
              <h2>Material Rate Advantage</h2>
              <p>Skip the retail margin. Get direct network quotes from our verified distributors and manufacturers.</p>
              <br/>
              <Link href="/materials" className="btn btn-primary">Request Current Rates</Link>
            </div>
            <div className={styles.table}>
              {materials.map((m, i) => (
                <div key={i} className={styles.row}>
                  <b>{m.name}</b>
                  <span>{m.retail}</span>
                  <em><strong>{m.network}</strong></em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Project Showcase */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Project Proof</span>
            <h2>Live site tracking</h2>
            <p>See exactly how our builders are performing right now.</p>
          </div>
          <div className={`${styles.cards} ${styles.two}`}>
            {projects.map((p, i) => (
              <div key={i} className={styles.projectCard}>
                <div className={styles.cardTop}>
                  <span>{p.stage}</span>
                  <strong>Live Tracking</strong>
                </div>
                <h3>{p.title}</h3>
                <p>📍 {p.location}</p>
                <div className={styles.tags}>
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Property Portals */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Property Bridge</span>
            <h2>Find your next property</h2>
            <p>Looking for land to build on, or a place to rent? Access our connected 360° property portals.</p>
          </div>
          <div className={styles.portalPanel}>
            <div className={styles.portalCard}>
              <div className={styles.tour}>360°<br/>Virtual Tour</div>
              <h3>RealProp Realty</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '15px' }}>Premium real estate buying and selling platform with immersive virtual tours.</p>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Explore RealProp</a>
            </div>
            <div className={styles.portalCard}>
              <div className={styles.tour}>To-Let<br/>Verified</div>
              <h3>ToLet Board Chennai</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '15px' }}>Verified rental properties and lease management across Chennai.</p>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Find Rentals</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="fullBleedSection" style={{ padding: '6rem 1rem' }}>
        <div className="sectionInner">
          <div className={styles.lead}>
            <h2>Join the construction ecosystem.</h2>
            <p>Whether you are building your dream home, supplying materials, or executing projects, Buildogram is your operating system.</p>
            <div className={styles.quick} style={{ justifyContent: 'center' }}>
              <Link href="/login" className="btn" style={{ background: 'white', color: 'var(--secondary)' }}>Open Dashboard</Link>
              <Link href="/partners/directory" className="btn btn-outline-light">Find Partners</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
