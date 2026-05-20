import './globals.css';

export const metadata = {
  title: 'Buildogram – Engineer-Led Home Construction in Chennai',
  description: 'Build your dream home with complete transparency, BOQ-first pricing, and real-time project tracking. Chennai & Tamil Nadu.',
  keywords: 'home construction Chennai, house construction Chennai, construction company Tamil Nadu, BOQ construction',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
