import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
export default function SupplierProductsPage() {
  return ( <>
    <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Product Catalogue</h1>
      <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
        This module is coming soon. You will be able to manage your material catalogue and pricing here.
      </p>
    </div>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Supplier","path":"/supplier"},{"name":"Products","path":"/supplier/products"}]} />
    </>
  );
}
