'use client';
/**
 * ContextualEnquiryForm
 * Exactly 3 visible fields: Name . Phone (type=tel) . contextual question.
 * Privacy line linking real policy. Specific submit labels. No "Submit".
 * Posts to existing /api/leads. Fires generate_lead only after server success.
 * Honeypot + min completion time + duplicate-submit guard.
 */

import { useState, useRef, useId, useEffect } from 'react';
import Link from 'next/link';
import { getAttributionPayload } from '@/lib/analytics/attribution';
import { CONVERSION_COMPLETE_EVENT } from '@/lib/conversion/tooltip-lifecycle.mjs';
import {
  isCreatedLeadResponse,
  isDuplicateLeadResponse,
} from '@/lib/leads/submission-contract.mjs';
import {
  trackLeadFormView,
  trackLeadFormStart,
  trackLeadFormValidationError,
  trackGenerateLead,
  trackLeadFormFailure,
} from '@/lib/conversion/analytics';

// Session key to suppress tooltip after form submit
const SESSION_KEY_FORM = 'bg_form_submitted';

export default function ContextualEnquiryForm({
  context,
  placement = 'inline',
  onSuccess,
}) {
  const formId   = useId();
  const formRef  = useRef(null);
  const startRef = useRef(null); // timestamp when form first becomes interactive
  const [hasStarted, setHasStarted]   = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [duplicate, setDuplicate]     = useState(false);
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState(null);

  const {
    formHeading,
    formDescription,
    contextualQuestion,
    submitLabel,
    pageType,
    serviceKey,
    serviceName,
    locality,
  } = context || {};

  // Track form view on mount
  useEffect(() => {
    trackLeadFormView(context, { placement });
    startRef.current = Date.now();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -- Validation -------------------------------------------------------------
  function validateField(name, value) {
    if (name === 'name') {
      if (!value?.trim()) return 'Please enter your name.';
    }
    if (name === 'phone') {
      const digits = (value || '').replace(/\D/g, '');
      if (!digits) return 'Please enter your WhatsApp number.';
      if (digits.length < 10) return 'Please enter a valid 10-digit mobile number.';
    }
    if (name === 'contextual') {
      if (!value?.trim()) return 'Please select an option.';
    }
    return null;
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const err = validateField(name, value);
    if (err) {
      trackLeadFormValidationError(context, { fieldName: name });
      setErrors(prev => ({ ...prev, [name]: err }));
    } else {
      setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  function handleFocus() {
    if (!hasStarted) {
      setHasStarted(true);
      trackLeadFormStart(context, { placement });
    }
  }

  // -- Submit -----------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting || submitted) return;

    const data = new FormData(formRef.current);
    const name      = data.get('name')?.trim() || '';
    const phone     = data.get('phone')?.trim() || '';
    const contextual = data.get('contextual')?.trim() || '';
    const honeypot  = data.get('website') || ''; // must be empty

    // Validate all fields
    const newErrors = {};
    const nameErr = validateField('name', name);
    const phoneErr = validateField('phone', phone);
    const ctxErr  = validateField('contextual', contextual);
    if (nameErr)  newErrors.name = nameErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (ctxErr)   newErrors.contextual = ctxErr;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first error field
      const firstErrorName = ['name', 'phone', 'contextual'].find(k => newErrors[k]);
      if (firstErrorName) {
        formRef.current?.querySelector(`[name="${firstErrorName}"]`)?.focus();
      }
      return;
    }

    // Honeypot check (client-side fast path)
    if (honeypot) return;

    // Minimum completion time (2s)
    const elapsed = Date.now() - (startRef.current || Date.now());
    if (elapsed < 2000) {
      setServerError('Please review your details and try again in a moment.');
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      const attribution = getAttributionPayload();
      const payload = {
        name,
        phone,
        notes: contextual,
        leadType: serviceKey || pageType || 'general',
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        source: 'CONTEXTUAL_INLINE_FORM',
        attribution,
        // Context metadata (server also validates these server-side)
        formQuestion: contextualQuestion?.key,
        ctaPlacement: placement,
        ctaVersion: 'v1',
      };

      const res = await fetch('/api/leads', {
        method  : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body    : JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && isCreatedLeadResponse(json)) {
        setSubmitted(true);
        // Fire generate_lead only for a newly persisted lead.
        trackGenerateLead(context, { placement, leadId: json.id });
        // Suppress tooltip for this session
        try { sessionStorage.setItem(SESSION_KEY_FORM, '1'); } catch (_) {}
        window.dispatchEvent(new Event(CONVERSION_COMPLETE_EVENT));
        onSuccess?.();
      } else if (res.ok && isDuplicateLeadResponse(json)) {
        setDuplicate(true);
        // The earlier persisted request already represents the conversion.
        // Suppress further prompting without emitting another conversion event.
        try { sessionStorage.setItem(SESSION_KEY_FORM, '1'); } catch (_) {}
      } else {
        setServerError('Something went wrong. Please try again or contact us on WhatsApp.');
        trackLeadFormFailure(context, { errorCode: String(res.status) });
      }
    } catch {
      setServerError('Something went wrong. Please try again or contact us on WhatsApp.');
      trackLeadFormFailure(context, { errorCode: 'network' });
    } finally {
      setSubmitting(false);
    }
  }

  if (duplicate) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          background: 'rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-primary, #0c1428)',
        }}
      >
        We already received this enquiry. Our team will use the earlier request.
      </div>
    );
  }

  // -- Success state ----------------------------------------------------------
  if (submitted) {
    return (
      <div
        role="alert"
        aria-live="polite"
        style={{
          background    : 'rgba(37,211,102,0.08)',
          border        : '1px solid rgba(37,211,102,0.25)',
          borderRadius  : '12px',
          padding       : '24px',
          textAlign     : 'center',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" style={{ margin: '0 auto 12px' }}>
          <circle cx="20" cy="20" r="20" fill="rgba(37,211,102,0.15)" />
          <path d="M12 20l6 6 10-12" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary, #0c1428)' }}>
          Enquiry Received
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
          Thank you. Buildogram has received your enquiry and will contact you about this request.
        </p>
      </div>
    );
  }

  // -- Form -------------------------------------------------------------------
  const fieldStyle = {
    width         : '100%',
    padding       : '12px 14px',
    fontSize      : '16px', // Prevents iOS zoom
    borderRadius  : '8px',
    border        : '1.5px solid var(--border, #e2e8f0)',
    background    : 'var(--bg-card2, #f8fafc)',
    color         : 'var(--text-primary, #0c1428)',
    outline       : 'none',
    minHeight     : '44px', // Touch target
    boxSizing     : 'border-box',
    display       : 'block',
    transition    : 'border-color 0.2s ease',
  };

  const labelStyle = {
    display       : 'block',
    fontSize      : '13px',
    fontWeight    : 600,
    marginBottom  : '6px',
    color         : 'var(--text-primary, #0c1428)',
  };

  const errorStyle = {
    color         : '#e53e3e',
    fontSize      : '12px',
    marginTop     : '4px',
    display       : 'block',
  };

  return (
    <div
      style={{
        background    : 'var(--bg-card2, #f8fafc)',
        border        : '1.5px solid var(--border, #e2e8f0)',
        borderRadius  : '16px',
        padding       : '28px 24px',
      }}
    >
      {formHeading && (
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', marginTop: 0, color: 'var(--text-primary, #0c1428)' }}>
          {formHeading}
        </h3>
      )}
      {formDescription && (
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', marginTop: 0 }}>
          {formDescription}
        </p>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-label={formHeading || 'Enquiry form'}
      >
        {/* Honeypot -- hidden from real users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        />

        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor={`${formId}-name`} style={labelStyle}>
            Your name <span aria-hidden="true" style={{ color: '#e53e3e' }}>*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            aria-invalid={!!errors.name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              ...fieldStyle,
              borderColor: errors.name ? '#e53e3e' : 'var(--border, #e2e8f0)',
            }}
          />
          {errors.name && (
            <span id={`${formId}-name-err`} role="alert" style={errorStyle}>{errors.name}</span>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor={`${formId}-phone`} style={labelStyle}>
            WhatsApp / mobile number <span aria-hidden="true" style={{ color: '#e53e3e' }}>*</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-required="true"
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            aria-invalid={!!errors.phone}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              ...fieldStyle,
              borderColor: errors.phone ? '#e53e3e' : 'var(--border, #e2e8f0)',
            }}
          />
          {errors.phone && (
            <span id={`${formId}-phone-err`} role="alert" style={errorStyle}>{errors.phone}</span>
          )}
        </div>

        {/* Contextual question */}
        {contextualQuestion && (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor={`${formId}-contextual`} style={labelStyle}>
              {contextualQuestion.label} <span aria-hidden="true" style={{ color: '#e53e3e' }}>*</span>
            </label>
            {contextualQuestion.type === 'select' ? (
              <select
                id={`${formId}-contextual`}
                name="contextual"
                required
                aria-required="true"
                aria-describedby={errors.contextual ? `${formId}-contextual-err` : undefined}
                aria-invalid={!!errors.contextual}
                onFocus={handleFocus}
                onBlur={handleBlur}
                defaultValue=""
                style={{
                  ...fieldStyle,
                  borderColor: errors.contextual ? '#e53e3e' : 'var(--border, #e2e8f0)',
                  appearance: 'auto',
                }}
              >
                <option value="" disabled>Select an option</option>
                {contextualQuestion.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                id={`${formId}-contextual`}
                type="text"
                name="contextual"
                required
                aria-required="true"
                aria-describedby={errors.contextual ? `${formId}-contextual-err` : undefined}
                aria-invalid={!!errors.contextual}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...fieldStyle,
                  borderColor: errors.contextual ? '#e53e3e' : 'var(--border, #e2e8f0)',
                }}
              />
            )}
            {errors.contextual && (
              <span id={`${formId}-contextual-err`} role="alert" style={errorStyle}>{errors.contextual}</span>
            )}
          </div>
        )}

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            style={{
              background    : 'rgba(229,62,62,0.08)',
              border        : '1px solid rgba(229,62,62,0.3)',
              borderRadius  : '8px',
              padding       : '10px 12px',
              fontSize      : '13px',
              color         : '#e53e3e',
              marginBottom  : '16px',
            }}
          >
            {serverError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width         : '100%',
            padding       : '13px 20px',
            fontSize      : '15px',
            fontWeight    : 600,
            borderRadius  : '8px',
            border        : 'none',
            background    : submitting ? 'rgba(252,110,32,0.5)' : 'var(--primary, #FC6E20)',
            color         : 'white',
            cursor        : submitting ? 'not-allowed' : 'pointer',
            minHeight     : '44px',
            transition    : 'background 0.2s ease, opacity 0.2s ease',
          }}
        >
          {submitting ? 'Sending' : (submitLabel || 'Request a callback')}
        </button>

        {/* Privacy line */}
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', marginBottom: 0, lineHeight: 1.5 }}>
          By submitting, you agree that Buildogram may contact you about this enquiry.{' '}
          <Link href="/privacy-policy" style={{ color: 'var(--primary, #FC6E20)', textDecoration: 'underline' }}>
            See our Privacy Policy.
          </Link>
        </p>
      </form>
    </div>
  );
}
