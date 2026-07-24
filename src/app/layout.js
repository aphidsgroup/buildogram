import './globals.css';
import SiteLayoutClient from './SiteLayoutClient';
import PWARegister from '@/components/PWARegister';
import AttributionTracker from '@/components/analytics/AttributionTracker';
import FloatingReelPlayerClientWrapper from '@/components/reels/FloatingReelPlayerClientWrapper';
import { Space_Grotesk, Be_Vietnam_Pro, DM_Serif_Text } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const beVietnamPro = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'], variable: '--font-vietnam', display: 'swap' });
const dmSerifText = DM_Serif_Text({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-dm-serif', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://www.buildogram.in'),
  title: 'Buildogram | Engineer-Led Construction Support Chennai',
  description: 'Engineer-led structural audit, BOQ review, site supervision and construction intelligence for property owners in Chennai.',
  // keywords: removed — Google ignores <meta name="keywords"> since 2009. Zero SEO value.
  // (Phase 2 fix: seo-audit skill + manual audit both identified this as clutter)
  icons: {
    icon: [
      { url: '/favicon.ico',              sizes: 'any',    type: 'image/x-icon' },
      { url: '/icons/icon-16x16.png',     sizes: '16x16',  type: 'image/png' },
      { url: '/icons/icon-32x32.png',     sizes: '32x32',  type: 'image/png' },
      { url: '/icons/icon-48x48.png',     sizes: '48x48',  type: 'image/png' },
      { url: '/icons/icon-96x96.png',     sizes: '96x96',  type: 'image/png' },
      { url: '/icons/icon-192x192.png',   sizes: '192x192',type: 'image/png' },
      { url: '/icons/icon-512x512.png',   sizes: '512x512',type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
  // alternates.canonical: REMOVED from root layout (Phase 2 fix).
  // Setting canonical: '/' here caused any page without generateSEOMetadata() to inherit
  // the homepage canonical, effectively telling Google all such pages are duplicates of '/'.
  // Canonical is now set exclusively per-page via generateSEOMetadata().
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
  // Phase 2 fix: removed userScalable:false and maximumScale:1
  // Reason: violates WCAG 2.1 SC 1.4.4 — prevents users from zooming for accessibility
  // seomator audit flagged a11y-zoom-disabled as critical on ALL 30 crawled pages
  viewportFit: 'cover',
};

import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema } from '@/lib/seo/schema';

const orgSchema = generateOrganizationSchema();
const localBusinessSchema = generateLocalBusinessSchema();
const webSiteSchema = generateWebSiteSchema();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Phase 5 perf: preconnect to critical third-party origins */}
        {/* Belt-and-suspenders alongside next.config.mjs Link response headers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ui-avatars.com" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${spaceGrotesk.variable} ${beVietnamPro.variable} ${dmSerifText.variable}`} suppressHydrationWarning>
        {/* Accessibility: Skip to main content */}
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <PWARegister />
        <AttributionTracker />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        
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
        <FloatingReelPlayerClientWrapper />
      </body>
    </html>
  );
}
