const DEFAULT_DUPLICATE_WINDOW_MS = 60_000;
export const DUPLICATE_LEAD_MESSAGE =
  'We already received this enquiry. Our team will use the earlier request.';

function stableSerialize(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${key}:${stableSerialize(value[key])}`)
      .join(',')}}`;
  }
  return String(value).trim().toLowerCase();
}

export function normalizeLeadPayload(body = {}) {
  return {
    ...body,
    leadType: body.leadType || body.lead_type || 'general',
    sourcePage: body.sourcePage || body.source_page || '',
    notes: body.notes ?? body.message ?? '',
    formData: body.formData || body.metadata || {},
    location: body.location || body.locality || '',
  };
}

export function buildLeadDuplicateKey(body = {}) {
  const lead = normalizeLeadPayload(body);
  const digits = String(lead.phone || '').replace(/\D/g, '');
  const phone = digits.length === 12 && digits.startsWith('91')
    ? digits.slice(2)
    : digits;
  const enquiry = stableSerialize({
    leadType: lead.leadType,
    location: lead.location,
    notes: lead.notes,
    formData: lead.formData,
  });
  return `${phone}|${lead.sourcePage}|${enquiry}`;
}

export function isValidPersistentLeadId(id) {
  if (Number.isInteger(id)) return id > 0;
  return typeof id === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export function isCreatedLeadResponse(payload) {
  return Boolean(
    payload?.success === true
    && payload?.created === true
    && payload?.duplicate === false
    && isValidPersistentLeadId(payload?.id)
  );
}

export function isDuplicateLeadResponse(payload) {
  return Boolean(
    payload?.success === true
    && payload?.created === false
    && payload?.duplicate === true
  );
}

export function classifyLeadSubmission(payload) {
  if (isCreatedLeadResponse(payload)) return 'success';
  if (isDuplicateLeadResponse(payload)) return 'duplicate';
  return 'error';
}

export class LeadSubmissionDeduper {
  constructor({ windowMs = DEFAULT_DUPLICATE_WINDOW_MS, now = () => Date.now() } = {}) {
    this.windowMs = windowMs;
    this.now = now;
    this.recent = new Map();
    this.pending = new Map();
  }

  begin(key) {
    const now = this.now();
    const createdAt = this.recent.get(key);
    if (createdAt && now - createdAt < this.windowMs) return { type: 'duplicate' };
    if (createdAt) this.recent.delete(key);

    const pendingOutcome = this.pending.get(key);
    if (pendingOutcome) return { type: 'pending', outcome: pendingOutcome };

    let settle;
    const outcome = new Promise((resolve) => {
      settle = resolve;
    });
    this.pending.set(key, outcome);

    let finished = false;
    const finish = (result) => {
      if (finished) return;
      finished = true;
      this.pending.delete(key);
      if (result.created) this.recent.set(key, this.now());
      settle(result);
    };

    return {
      type: 'owner',
      complete: (id) => finish({ created: true, id }),
      fail: () => finish({ created: false }),
    };
  }
}
