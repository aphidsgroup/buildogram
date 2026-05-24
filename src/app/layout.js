import './globals.css';

export const metadata = {
  title: 'Buildogram | India’s Property Transparency Platform',
  description: 'Build your dream home in Chennai with PhD-grade structural engineering, 100% transparent BOQ pricing, and a digital Property Passport. Construction with proof, not promises.',
  keywords: ['home construction chennai', 'transparent builders', 'boq audit', 'structural engineering chennai', 'property passport', 'buildogram'],
  openGraph: {
    title: 'Buildogram | India’s Property Transparency Platform',
    description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',
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
    title: 'Buildogram | India’s Property Transparency Platform',
    description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/globe.svg" />
      </head>
      <body className="w-full overflow-x-hidden">
        {children}
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
      </body>
    </html>
  );
}
