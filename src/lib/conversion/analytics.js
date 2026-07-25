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
 * Internal: fire a gtag event safely, stripping any PII keys.
 */
function fireEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  // Strip any PII that might have crept in
  const safeParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (!PII_KEYS.has(k)) {
      safeParams[k] = v;
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`[conversion/analytics] Stripped PII key "${k}" from event "${eventName}"`);
    }
  }

  window.gtag('event', eventName, safeParams);
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
 * trackGenerateLead — fires ONLY after server returns success === true.
 * Never call this on click or before server confirmation.
 */
export function trackGenerateLead(context, { placement = 'inline', leadId } = {}) {
  fireEvent('generate_lead', {
    page_type: context?.pageType,
    service_key: context?.serviceKey,
    service_name: context?.serviceName,
    locality: context?.locality,
    cta_placement: placement,
    form_question_key: context?.contextualQuestion?.key,
    // leadId is an internal DB ID, not PII — safe to log
    cta_version: leadId ? String(leadId).substring(0, 8) : undefined,
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
