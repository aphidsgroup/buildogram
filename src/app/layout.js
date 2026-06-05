import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';
import PWARegister from '@/components/PWARegister';

export const metadata = {
  metadataBase: new URL('https://www.buildogram.in'),
  title: 'Buildogram | Home Construction Company in Chennai | BOQ Review, Builders & Materials',
  description: 'Buildogram helps Chennai property owners plan home construction, review BOQs, compare contractor quotes, source materials, find verified builders, and manage property documents with engineer-led support.',
  keywords: [
    'Home construction company Chennai',
    'Builders in Chennai',
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
    url: 'https://www.buildogram.in',
    siteName: 'Buildogram',
    images: [{ url: 'https://www.buildogram.in/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildogram | Engineer-Led Construction Companion',
    description: 'Engineer-led guidance for home construction in Chennai. Verified builders, BOQ reviews, material sourcing, and Property Passport.',
  },
  manifest: '/manifest.webmanifest',
  applicationName: 'Buildogram',
  appleWebApp: {
    capable: true,
    title: 'Buildogram',
    statusBarStyle: 'default',
  },
};

export const viewport = {
  themeColor: '#FC6E20',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

import { generateOrganizationSchema } from '@/lib/seo/schema';

const orgSchema = generateOrganizationSchema();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body>
        {/* Accessibility: Skip to main content */}
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <PWARegister />
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
