'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteLayoutClient({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // restore smooth scroll if needed, though it's set in CSS
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);
  }, [pathname]);
  
  // Do not show public header/footer on internal dashboards or login page
  const isDashboard = pathname?.startsWith('/client') || 
                      pathname?.startsWith('/ops') || 
                      pathname?.startsWith('/partner/') || pathname === '/partner' ||
                      pathname?.startsWith('/login');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main style={{ paddingTop: !isDashboard ? '72px' : '0' }}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
