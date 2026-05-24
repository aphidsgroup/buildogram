import PropertyMarketplaceClient from '../PropertyMarketplaceClient';

export const metadata = {
  title: '360° Verified Rentals | Buildogram',
  description: 'Rent premium, verified homes in Chennai with 360° virtual tours.',
};

export default function PropertiesRentPage() {
  return (
    <>
      <section style={{ background: '#292929', color: 'white', padding: '40px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Verified Rentals</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Browse through 360° tours and find your perfect home without the surprises.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <PropertyMarketplaceClient initialListingType="rent" />
        </div>
      </section>
    </>
  );
}
