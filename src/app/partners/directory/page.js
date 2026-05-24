import DirectoryClient from './DirectoryClient';

export const metadata = {
  title: 'Partner Directory | Buildogram Verified Partners',
  description: 'Find verified builders, architects, interior designers, and material suppliers in Chennai.',
};

export default function PartnerDirectoryPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Verified Partner Directory</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Work with Chennai's most trusted architects, builders, and suppliers.
          </p>
        </div>
      </section>
      
      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <DirectoryClient />
        </div>
      </section>
    </>
  );
}
