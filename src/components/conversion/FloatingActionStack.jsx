'use client';
/**
 * FloatingActionStack
 * Single fixed container owning the WhatsApp button, ConversionTooltip,
 * and BackToTop button. One zIndex = 9999, no competing positions.
 *
 * Desktop: right 24px, bottom 24px. WhatsApp bottom, BackToTop 16px above.
 * Mobile:  right 14px, bottom max(16px, env(safe-area-inset-bottom)).
 *          + 60px offset when .bottom-nav-mobile is present.
 */

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import BackToTopButton from '@/components/BackToTop';
import ContextualWhatsAppWidget from '@/components/conversion/ContextualWhatsAppWidget';
import ConversionTooltip from '@/components/conversion/ConversionTooltip';
import { getConversionContext } from '@/lib/conversion/context';

export default function FloatingActionStack() {
  const pathname = usePathname();
  const [hasBottomNav, setHasBottomNav] = useState(false);
  const context = useMemo(() => getConversionContext(pathname), [pathname]);

  // Detect bottom nav presence (mobile client portals)
  useEffect(() => {
    const check = () => {
      const el = document.querySelector('.bottom-nav-mobile');
      if (!el) { setHasBottomNav(false); return; }
      const style = window.getComputedStyle(el);
      setHasBottomNav(style.display !== 'none');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [pathname]);

  if (!context.showWhatsApp) return null;

  // Bottom offset: base 24px desktop / 16px mobile + 60px when bottom nav present
  const bottomNavOffset = hasBottomNav ? 60 : 0;

  return (
    <>
      {/* Fixed stack container */}
      <div
        aria-label="Quick actions"
        style={{
          position  : 'fixed',
          right     : 'clamp(14px, 2vw, 24px)',
          bottom    : `calc(max(16px, env(safe-area-inset-bottom, 16px)) + ${bottomNavOffset}px)`,
          zIndex    : 9999,
          display   : 'flex',
          flexDirection : 'column',
          alignItems: 'flex-end',
          gap       : '16px',
          pointerEvents : 'none', // children set their own pointer-events
        }}
      >
        {/* BackToTop sits above WhatsApp */}
        <BackToTopButton />

        {/* WhatsApp button + tooltip */}
        <ContextualWhatsAppWidget context={context} />
      </div>

      {/* Tooltip renders as fixed overlay -- zero CLS */}
      {/* key={pathname}: a route change remounts the tooltip, which resets its
          visibility, mounted flag and timers without a setState-in-effect. */}
      <ConversionTooltip key={pathname} context={context} />
    </>
  );
}
