'use client';
/**
 * ContextualWhatsAppWidget
 * Renders the green WhatsApp button inside FloatingActionStack.
 * - Inline SVG icon (no third-party script)
 * - Accessible label includes service name
 * - Message built via src/lib/whatsapp.js
 * - target="_blank" rel="noopener noreferrer"
 * - Never auto-opens WhatsApp
 * - Keyboard operable, visible focus ring, no pulse/bounce
 */

import { useRef } from 'react';
import { BRAND } from '@/lib/brand/positioning';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/conversion/analytics';

export default function ContextualWhatsAppWidget({ context }) {
  const btnRef = useRef(null);

  if (!context?.showWhatsApp) return null;

  const { serviceName, locality, pageType } = context;

  // Build route-aware WhatsApp message
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const messageParts = [];
  if (serviceName) messageParts.push(`I'm interested in ${serviceName}`);
  else if (locality) messageParts.push(`I have a project in ${locality}`);
  else messageParts.push(`I have a construction project`);
  messageParts.push(`in Chennai. Could you help me review my options?`);
  if (pageUrl) messageParts.push(`Page: ${pageUrl}`);
  const message = `Hi Buildogram, ${messageParts.join(' ')}`;

  const href = getWhatsAppLink(BRAND.phone, message);

  // Accessible label
  const ariaLabel = serviceName
    ? `Enquire on WhatsApp about ${serviceName}`
    : locality
    ? `Enquire on WhatsApp about construction in ${locality}`
    : 'Enquire on WhatsApp';

  const handleClick = () => {
    trackWhatsAppClick(context, { placement: 'floating' });
    // Mark session so tooltip suppresses
    try {
      sessionStorage.setItem('bg_wa_clicked', '1');
    } catch (_) {}
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={handleClick}
      style={{
        display         : 'flex',
        alignItems      : 'center',
        justifyContent  : 'center',
        width           : '52px',
        height          : '52px',
        borderRadius    : '50%',
        background      : '#25D366',
        boxShadow       : '0 4px 20px rgba(37,211,102,0.40)',
        color           : 'white',
        textDecoration  : 'none',
        pointerEvents   : 'auto',
        flexShrink      : 0,
        transition      : 'transform 0.2s ease, box-shadow 0.2s ease',
        outline         : 'none',
        // No pulse/bounce
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.55)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.40)';
      }}
      onFocus={e => {
        // Visible focus ring for keyboard users
        e.currentTarget.style.outline = '3px solid #25D366';
        e.currentTarget.style.outlineOffset = '3px';
      }}
      onBlur={e => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      {/* WhatsApp inline SVG */}
      <svg
        width="26" height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 2C7.477 2 3 6.477 3 12c0 1.89.527 3.655 1.44 5.163L3 23l5.993-1.408A10.932 10.932 0 0013 22c5.523 0 10-4.477 10-10S18.523 2 13 2zm-3.5 6.5c.25 0 .524.005.735.01.232.006.489.013.735.573.286.659.915 2.232.994 2.395.08.162.13.352.025.568-.104.215-.156.35-.311.539-.155.188-.326.42-.465.564-.155.157-.317.328-.136.643.18.315.8 1.32 1.717 2.138 1.178 1.05 2.172 1.375 2.487 1.53.315.157.5.13.685-.079.186-.208.791-.924.999-1.24.208-.315.418-.26.703-.156.286.104 1.817.857 2.13 1.013.312.156.52.234.598.364.078.13.078.754-.182 1.482-.26.728-1.533 1.432-2.08 1.483-.546.052-1.057.234-3.562-.743C9.1 18.33 7 15.3 6.847 15.092c-.155-.208-1.27-1.69-1.27-3.224 0-1.532.803-2.284 1.088-2.596.286-.312.624-.39.833-.39z"
          fill="white"
        />
      </svg>
    </a>
  );
}
