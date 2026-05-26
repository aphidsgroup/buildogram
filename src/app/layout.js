import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';

export const metadata = {
  title: 'Buildogram | Engineer-Led Home Construction & Property Ecosystem in Chennai',
  description: 'Buildogram helps homeowners and plot owners plan, build, source materials, verify site progress, connect with trusted construction partners, and manage property records through an engineer-led ecosystem.',
  keywords: ['engineer-led construction', 'construction companion', 'property ecosystem', 'buildogram', 'chennai', 'BOQ review', 'property passport', 'verified builders', 'material sourcing'],
  openGraph: {
    title: 'Buildogram | Engineer-Led Home Construction & Property Ecosystem',
    description: 'Buildogram helps homeowners plan, build, source materials, verify site progress, connect with trusted construction partners, and manage property records through an engineer-led ecosystem.',
    url: 'https://buildogram.in',
    siteName: 'Buildogram',
    images: [{ url: 'https://buildogram.in/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildogram | Engineer-Led Home Construction & Property Ecosystem',
    description: 'Buildogram helps homeowners plan, build, source materials, verify site progress, connect with trusted partners, and manage property records.',
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
      </body>
    </html>
  );
}
