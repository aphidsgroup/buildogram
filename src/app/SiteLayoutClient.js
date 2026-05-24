'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteLayoutClient({ children }) {
  const pathname = usePathname();
  
  // Do not show public header/footer on internal dashboards or login page
  const isDashboard = pathname?.startsWith('/client') || 
                      pathname?.startsWith('/ops') || 
                      pathname?.startsWith('/partner') || 
                      pathname?.startsWith('/login');

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
