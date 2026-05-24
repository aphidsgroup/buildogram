'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Hub', path: '/client/dashboard', icon: '🏠' },
    { name: 'Passport', path: '/client/passport', icon: '📁' },
    { name: 'Invoices', path: '/client/invoices', icon: '🧾' },
    { name: 'Requests', path: '/client/requests', icon: '📋' }
  ];

  return (
    <div className="bottom-nav-mobile">
      {navItems.map(item => {
        const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
        return (
          <Link href={item.path} key={item.path} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            <div className="bottom-nav-icon">{item.icon}</div>
            <div className="bottom-nav-text">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
