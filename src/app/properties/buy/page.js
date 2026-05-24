import PropertyMarketplaceClient from '../PropertyMarketplaceClient';

export const metadata = {
  title: '360° Verified Resales | Buildogram',
  description: 'Buy premium, verified properties in Chennai with 360° virtual tours.',
};

export default function PropertiesBuyPage() {
  return (
    <>
      <section style={{ background: '#292929', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Verified Resales</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Buy with confidence. Explore properties completely online before you visit.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <PropertyMarketplaceClient initialListingType="buy" />
        </div>
      </section>
    </>
  );
}
