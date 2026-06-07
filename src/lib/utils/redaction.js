/**
 * Utility for redacting Personally Identifiable Information (PII) from data exports.
 */

const REDACTED_EMAIL = '***@***.com';
const REDACTED_PHONE = '******1234';
const REDACTED_NAME = '*** ***';

function maskEmail(email) {
  if (!email || typeof email !== 'string') return email;
  const [localPart, domain] = email.split('@');
  if (!domain) return REDACTED_EMAIL;
  return `${localPart[0]}***@${domain}`;
}

function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return phone;
  // Keep last 4 digits
  const last4 = phone.slice(-4);
  return `******${last4}`;
}

function maskName(name) {
  if (!name || typeof name !== 'string') return name;
  const parts = name.split(' ');
  return parts.map(p => p[0] + '***').join(' ');
}

/**
 * Recursively applies redaction to an object or array based on known PII keys.
 * @param {any} data 
 * @param {string} userRole 
 * @returns {any} redacted data
 */
export function redactPII(data, userRole) {
  // If user is admin, do not redact
  if (['super_admin', 'ops_admin'].includes(userRole)) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => redactPII(item, userRole));
  }

  // Handle objects
  if (data !== null && typeof data === 'object') {
    const redactedObject = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      
      if (lowerKey.includes('email')) {
        redactedObject[key] = maskEmail(value);
      } else if (lowerKey.includes('phone') || lowerKey.includes('mobile')) {
        redactedObject[key] = maskPhone(value);
      } else if (lowerKey === 'name' || lowerKey.includes('customer_name') || lowerKey.includes('client_name')) {
        // We redact full names
        redactedObject[key] = maskName(value);
      } else if (typeof value === 'object') {
        redactedObject[key] = redactPII(value, userRole);
      } else {
        redactedObject[key] = value;
      }
    }
    return redactedObject;
  }

  // Primitives
  return data;
}
