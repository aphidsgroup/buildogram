const globalForRateLimit = globalThis;
const buckets = globalForRateLimit.buildogramRateLimitBuckets || new Map();
if (process.env.NODE_ENV !== 'production') {
  globalForRateLimit.buildogramRateLimitBuckets = buckets;
}

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(request, { namespace, limit, windowMs }) {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  current.count += 1;
  if (current.count > limit) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  return { allowed: true, retryAfter: 0 };
}
