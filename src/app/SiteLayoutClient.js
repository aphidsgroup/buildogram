'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// BackToTop removed — now rendered inside FloatingActionStack (src/components/conversion/FloatingActionStack.jsx)

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
      <main>
        {children}
      </main>
      {!isDashboard && <Footer />}
      {/* BackToTop is rendered by FloatingActionStack in root layout */}
    </>
  );
}
