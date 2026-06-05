import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';
import PWARegister from '@/components/PWARegister';

export const metadata = {
  metadataBase: new URL('https://www.buildogram.in'),
  title: 'Buildogram | Engineer-Led Construction Support Chennai | Structural Audit, BOQ Review, Steel Construction',
  description: 'Buildogram is an engineer-led construction support platform for property owners in Chennai — structural audit, BOQ review, contractor quote audit, steel construction, PEB buildings, site supervision, and property handover documentation.',
  keywords: [
    'Home construction company Chennai',
    'Structural audit Chennai',
    'BOQ review Chennai',
    'Steel construction Chennai',
    'PEB building contractors Chennai',
    'Construction project management Chennai',
    'Site supervision Chennai',
    'Verified builders and contractors Chennai',
    'Construction material sourcing Chennai',
    'Property Passport',
    'Buildogram'
  ],
  icons: {
    icon: [{ url: '/logo-icon.png', type: 'image/png' }],
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/logo-icon.png',
  },
  openGraph: {
    title: 'Buildogram | Engineer-Led Construction Support in Chennai',
    description: 'Structural audits, BOQ review, steel construction, site supervision, and property handover documentation — engineer-led and owner-first.',
    url: 'https://www.buildogram.in/',
    siteName: 'Buildogram',
    images: [{ url: 'https://www.buildogram.in/og-image.jpg', width: 1200, height: 630, alt: 'Buildogram — Construction · Property · Materials' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildogram | Engineer-Led Construction Support',
    description: 'Structural audits, BOQ review, steel construction, site supervision — engineer-led and owner-first.',
    images: ['https://www.buildogram.in/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
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
