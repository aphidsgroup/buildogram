import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
export const metadata = generateSEOMetadata({
title: 'Offline | Buildogram',
  description: 'You are currently offline.',
  path: '/offline',
});

export default function OfflinePage() {
  return ( <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px', fontFamily: 'Inter, sans-serif', textAlign: 'center', backgroundColor: '#F9FAFB' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#FC6E20', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <span style={{ color: 'white', fontSize: '40px', fontWeight: 900 }}>B</span>
      </div>
      <h1 style={{ fontSize: '24px', color: '#0F172A', marginBottom: '12px' }}>You are offline</h1>
      <p style={{ color: '#64748B', maxWidth: '300px', marginBottom: '32px', lineHeight: '1.5' }}>
        Buildogram requires an active internet connection to securely load dashboard data. Please reconnect to continue.
      </p>
      <a 
        href="/"
        style={{ padding: '12px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '16px', cursor: 'pointer', textDecoration: 'none' }}
      >
        Try Again
      </a>
    </div>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Offline","path":"/offline"}]} />
    </>
  );
}
