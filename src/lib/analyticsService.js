/**
 * Generic analytics service for event tracking.
 * Supports GA/GTM and Meta Pixel placeholders.
 */
export function trackEvent(eventName, data = {}) {
  const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo' || process.env.NODE_ENV === 'development';
  
  if (isDemo || !process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    console.log(`[Analytics - Mock] ${eventName}`, data);
    return;
  }

  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) window.gtag('event', eventName, data);
    
    // Meta Pixel
    if (window.fbq) window.fbq('trackCustom', eventName, data);
  }
}

export function trackPageView(url) {
  const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo' || process.env.NODE_ENV === 'development';
  
  if (isDemo || !process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    return;
  }

  if (typeof window !== 'undefined') {
    if (window.gtag) window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    if (window.fbq) window.fbq('track', 'PageView');
  }
}
