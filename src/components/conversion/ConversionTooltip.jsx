'use client';
/**
 * ConversionTooltip
 * Fixed overlay -- NEVER inserted into document flow -> zero CLS.
 * Appears 5s after route load, auto-dismisses 6-8s, close button.
 * Session rules: max 1/route/session, max 3/session, suppressed after WA click or form submit.
 * role="status" (not assertive -- this is a marketing prompt, not a status message).
 * Respects prefers-reduced-motion.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackTooltipShown, trackTooltipClosed } from '@/lib/conversion/analytics';

const SESSION_KEY_TOTAL  = 'bg_tooltip_total';
const SESSION_KEY_ROUTE  = 'bg_tooltip_route_'; // + encoded pathname
const SESSION_KEY_WA     = 'bg_wa_clicked';
const SESSION_KEY_FORM   = 'bg_form_submitted';
const MAX_TOTAL          = 3;
const APPEAR_DELAY_MS    = 5000;
const AUTO_DISMISS_MS    = 7000; // 6-8s range; 7s centre

export default function ConversionTooltip({ context }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const appearTimer = useRef(null);
  const dismissTimer = useRef(null);
  const shownRef = useRef(false);

  // Detect prefers-reduced-motion on client
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  const dismiss = useCallback((reason = 'manual') => {
    setVisible(false);
    trackTooltipClosed(context, { autoOrManual: reason });
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, [context]);

  useEffect(() => {
    // Reset on route change
    setVisible(false);
    shownRef.current = false;
    setMounted(false);
    if (appearTimer.current) clearTimeout(appearTimer.current);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);

    if (!context?.showWhatsApp) return;

    // Check session suppression
    try {
      if (sessionStorage.getItem(SESSION_KEY_WA)) return;
      if (sessionStorage.getItem(SESSION_KEY_FORM)) return;
      const total = parseInt(sessionStorage.getItem(SESSION_KEY_TOTAL) || '0', 10);
      if (total >= MAX_TOTAL) return;
      const routeKey = SESSION_KEY_ROUTE + encodeURIComponent(pathname);
      if (sessionStorage.getItem(routeKey)) return;
    } catch (_) {
      return; // SessionStorage unavailable (private mode etc)
    }

    // Schedule appearance
    appearTimer.current = setTimeout(() => {
      if (shownRef.current) return;
      shownRef.current = true;
      setMounted(true);
      setVisible(true);

      // Record in session
      try {
        const total = parseInt(sessionStorage.getItem(SESSION_KEY_TOTAL) || '0', 10);
        sessionStorage.setItem(SESSION_KEY_TOTAL, String(total + 1));
        sessionStorage.setItem(SESSION_KEY_ROUTE + encodeURIComponent(pathname), '1');
      } catch (_) {}

      trackTooltipShown(context);

      // Auto dismiss
      dismissTimer.current = setTimeout(() => {
        dismiss('auto');
      }, AUTO_DISMISS_MS);
    }, APPEAR_DELAY_MS);

    return () => {
      if (appearTimer.current) clearTimeout(appearTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [pathname, context, dismiss]);

  if (!mounted) return null;
  if (!context?.showWhatsApp) return null;

  const { tooltipMessage, serviceName } = context;
  const label = tooltipMessage || (serviceName
    ? `Discuss ${serviceName} with Buildogram`
    : 'Discuss your construction project with Buildogram.');

  // Position: above the WhatsApp button, right-aligned
  // Right = clamp(14px, 2vw, 24px) + 52px button + 12px gap  76px from right on desktop
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position    : 'fixed',
        bottom      : 'calc(max(16px, env(safe-area-inset-bottom, 16px)) + 52px + 12px + 52px + 12px)',
        right       : 'clamp(14px, 2vw, 24px)',
        zIndex      : 9998, // just below the stack container
        maxWidth    : '220px',
        background  : 'rgba(12, 20, 40, 0.92)',
        backdropFilter : 'blur(16px)',
        WebkitBackdropFilter : 'blur(16px)',
        border      : '1px solid rgba(255,255,255,0.10)',
        borderRadius: '12px',
        padding     : '12px 14px',
        color       : 'white',
        fontSize    : '13px',
        lineHeight  : 1.5,
        boxShadow   : '0 8px 32px rgba(0,0,0,0.35)',
        // Animation
        opacity     : visible ? 1 : 0,
        transform   : visible ? 'translateY(0)' : 'translateY(8px)',
        transition  : reducedMotion
          ? 'none'
          : 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents : visible ? 'auto' : 'none',
      }}
    >
      {/* Close button */}
      <button
        onClick={() => dismiss('manual')}
        aria-label="Close"
        style={{
          position  : 'absolute',
          top       : '6px',
          right     : '8px',
          background: 'none',
          border    : 'none',
          color     : 'rgba(255,255,255,0.55)',
          cursor    : 'pointer',
          fontSize  : '16px',
          lineHeight: 1,
          padding   : '2px 4px',
          borderRadius : '4px',
        }}
      >
        
      </button>

      {/* Message */}
      <p style={{ margin: 0, paddingRight: '16px' }}>
        {label}
      </p>
    </div>
  );
}
