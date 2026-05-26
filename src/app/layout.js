import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';

export const metadata = {
  title: 'Buildogram | Engineer-Led Home Construction & Property Ecosystem in Chennai',
  description: 'Engineer-led home construction companion in Chennai. We help owners with BOQ reviews, construction project management, finding verified builders and contractors, construction material sourcing, and maintaining a digital Property Passport.',
  keywords: [
    'Engineer-led home construction Chennai',
    'BOQ review Chennai',
    'Construction project management Chennai',
    'Verified builders and contractors Chennai',
    'Construction material sourcing Chennai',
    'Property Passport',
    'Buildogram'
  ],
  openGraph: {
    title: 'Buildogram | Engineer-Led Home Construction & Property Ecosystem',
    description: 'Engineer-led home construction companion in Chennai. Plan, build, source materials, verify site progress, and manage your Property Passport.',
    url: 'https://buildogram.in',
    siteName: 'Buildogram',
    images: [{ url: 'https://buildogram.in/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildogram | Engineer-Led Construction Companion',
    description: 'Engineer-led guidance for home construction in Chennai. Verified builders, BOQ reviews, material sourcing, and Property Passport.',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Buildogram',
  url: 'https://buildogram.in',
  logo: 'https://buildogram.in/globe.svg',
  description: 'Buildogram is an engineer-led construction companion and property ecosystem helping owners plan, build, source materials, track site progress, and maintain digital property records.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/globe.svg" />
      </head>
      <body>
        <SiteLayoutClient>
          {children}
        </SiteLayoutClient>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        
        {/* Analytics Placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
