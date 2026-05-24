import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';

export const metadata = {
  title: 'Buildogram | The Construction & Property Marketplace',
  description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',
  keywords: ['construction marketplace', 'property marketplace', 'buildogram', 'chennai', 'property passport'],
  openGraph: {
    title: 'Buildogram | The Construction & Property Marketplace',
    description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',
    url: 'https://buildogram.in',
    siteName: 'Buildogram',
    images: [
      {
        url: 'https://buildogram.in/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildogram | The Construction & Property Marketplace',
    description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#CCFF00',
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
  description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',
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
      </body>
    </html>
  );
}
