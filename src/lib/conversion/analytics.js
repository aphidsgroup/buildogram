/**
 * src/lib/conversion/analytics.js
 * Thin GA4 wrapper for conversion events.
 * NEVER sends PII (name, phone, email, message text, address).
 * All events fire only after server confirmation where applicable.
 */

const ALLOWED_PARAM_KEYS = new Set([
  'page_type', 'service_key', 'service_name', 'locality',
  'cta_placement', 'cta_version', 'form_question_key',
  'traffic_source_category', 'landing_page_type',
]);

const PII_KEYS = new Set(['name', 'phone', 'email', 'message', 'address', 'full_name']);

/**
 * Keep only explicitly approved context fields. Unknown keys are dropped so a
 * caller cannot accidentally forward form values or other identifiers to GA4.
 */
export function sanitizeAnalyticsParams(params = {}) {
  const safeParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (
      ALLOWED_PARAM_KEYS.has(k) &&
      v != null &&
      ['string', 'number', 'boolean'].includes(typeof v)
    ) {
      safeParams[k] = typeof v === 'string' ? v.slice(0, 100) : v;
    } else if (PII_KEYS.has(k) && process.env.NODE_ENV === 'development') {
      console.warn(`[conversion/analytics] Stripped PII key "${k}"`);
    }
  }
  return safeParams;
}

/**
 * Internal: fire a gtag event safely through the strict parameter allowlist.
 */
function fireEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, sanitizeAnalyticsParams(params));
}

// ── Widget events ─────────────────────────────────────────────────────────────

export function trackWhatsAppView(context) {
  fireEvent('whatsapp_widget_view', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    service_name: context?.serviceName,
    locality: context?.locality,
  });
}

export function trackTooltipShown(context) {
  fireEvent('whatsapp_tooltip_shown', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    locality: context?.locality,
  });
}

export function trackTooltipClosed(context, { autoOrManual = 'manual' } = {}) {
  fireEvent('whatsapp_tooltip_closed', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    cta_version: autoOrManual,
  });
}

/**
 * trackWhatsAppClick — fires on user-initiated click only.
 * Never auto-fires.
 */
export function trackWhatsAppClick(context, { placement = 'floating' } = {}) {
  fireEvent('whatsapp_click', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    service_name: context?.serviceName,
    locality: context?.locality,
    cta_placement: placement,
  });
}

// ── Form events ───────────────────────────────────────────────────────────────

export function trackLeadFormView(context, { placement = 'inline' } = {}) {
  fireEvent('lead_form_view', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    service_name: context?.serviceName,
    locality: context?.locality,
    cta_placement: placement,
    form_question_key: context?.contextualQuestion?.key,
  });
}

export function trackLeadFormStart(context, { placement = 'inline' } = {}) {
  fireEvent('lead_form_start', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    cta_placement: placement,
  });
}

export function trackLeadFormValidationError(context, { fieldName } = {}) {
  fireEvent('lead_form_validation_error', {
    page_type: context?.pageType,
    // fieldName is safe — it's a form field name like "phone", not a value
    cta_version: fieldName,
  });
}

/**
 * trackGenerateLead — call only after a newly persisted lead is confirmed.
 * Duplicate or browser-only success states must never call this function.
 */
export function trackGenerateLead(context, { placement = 'inline' } = {}) {
  fireEvent('generate_lead', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    service_name: context?.serviceName,
    locality: context?.locality,
    cta_placement: placement,
    form_question_key: context?.contextualQuestion?.key,
  });
}

export function trackLeadFormFailure(context, { errorCode } = {}) {
  fireEvent('lead_form_failure', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    cta_version: errorCode,
  });
}

export function trackPhoneClick(context, { placement = 'header' } = {}) {
  fireEvent('phone_click', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    cta_placement: placement,
  });
}
