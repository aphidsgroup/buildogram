/**
 * Generic analytics service for event tracking.
 * Supports GA/GTM and Meta Pixel placeholders.
 */
import { sanitizeAnalyticsParams } from './conversion/analytics';

export function trackEvent(eventName, data = {}) {
  const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo' || process.env.NODE_ENV === 'development';
  const safeData = sanitizeAnalyticsParams(data);
  
  if (isDemo || !process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    console.log(`[Analytics - Mock] ${eventName}`, safeData);
    return;
  }

  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) window.gtag('event', eventName, safeData);
    
    // Meta Pixel
    if (window.fbq) window.fbq('trackCustom', eventName, safeData);
  }
}

export function trackPageView(url) {
  const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo' || process.env.NODE_ENV === 'development';
  
  if (isDemo || !process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    return;
  }

  if (typeof window !== 'undefined') {
    const pagePath = typeof url === 'string' ? url.split(/[?#]/, 1)[0] : '/';
    if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, { page_path: pagePath });
    }
    if (window.fbq) window.fbq('track', 'PageView');
  }
}
