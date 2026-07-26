'use client';
/**
 * ConversionTooltip
 * Fixed overlay -- NEVER inserted into document flow -> zero CLS.
 * Appears 5s after route load, auto-dismisses 6-8s, close button.
 * Session rules: max 1/route/session, max 3/session, suppressed after WA click or form submit.
 * role="status" (not assertive -- this is a marketing prompt, not a status message).
 * Respects prefers-reduced-motion.
 */

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { trackTooltipShown, trackTooltipClosed } from '@/lib/conversion/analytics';
import {
  CONVERSION_COMPLETE_EVENT,
  createTooltipLifecycle,
  getReducedMotionSnapshot,
  getServerReducedMotionSnapshot,
  subscribeReducedMotion,
} from '@/lib/conversion/tooltip-lifecycle.mjs';

export default function ConversionTooltip({ context }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lifecycleRef = useRef(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  const dismiss = useCallback((reason = 'manual') => {
    lifecycleRef.current?.dismiss(reason);
  }, []);

  useEffect(() => {
    if (!context?.showWhatsApp) return;

    const lifecycle = createTooltipLifecycle({
      storage: window.sessionStorage,
      pathname,
      onShow: () => {
        setMounted(true);
        setVisible(true);
        trackTooltipShown(context);
      },
      onDismiss: (reason) => {
        setVisible(false);
        trackTooltipClosed(context, { autoOrManual: reason });
      },
    });
    const suppress = () => lifecycle.suppress();

    lifecycleRef.current = lifecycle;
    lifecycle.start();
    window.addEventListener(CONVERSION_COMPLETE_EVENT, suppress);
    return () => {
      window.removeEventListener(CONVERSION_COMPLETE_EVENT, suppress);
      lifecycle.cleanup();
      if (lifecycleRef.current === lifecycle) lifecycleRef.current = null;
    };
  }, [pathname, context]);

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
        &times;
      </button>

      {/* Message */}
      <p style={{ margin: 0, paddingRight: '16px' }}>
        {label}
      </p>
    </div>
  );
}
