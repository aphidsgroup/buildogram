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
import { CONVERSION_COMPLETE_EVENT } from '@/lib/conversion/tooltip-lifecycle.mjs';

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
    window.dispatchEvent(new Event(CONVERSION_COMPLETE_EVENT));
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
        width="28" height="28"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
