/**
 * WhatsApp Notification Utility
 * Provides safe phone normalization, link generation, and template formatting.
 */

/**
 * Normalizes an Indian phone number to standard format with country code.
 * Example: "9876543210" -> "919876543210"
 * Example: "+91 98765 43210" -> "919876543210"
 */
export function normalizePhone(phone) {
  if (!phone) return null;
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length > 10 && digits.startsWith('91')) {
    return digits;
  }
  if (digits.length > 10 && digits.startsWith('0')) {
    return '91' + digits.substring(1);
  }
  return digits; // Fallback
}

/**
 * Generates a wa.me URL for click-to-send functionality.
 */
export function getWhatsAppLink(phone, message) {
  const cleanPhone = normalizePhone(phone);
  if (!cleanPhone) return null;
  
  const encodedMessage = encodeURIComponent(message || '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Safely renders a WhatsApp template string using lead context.
 * Only safe variables are mapped to prevent exposing internal data.
 */
export function renderTemplate(templateBody, lead) {
  if (!templateBody || !lead) return templateBody || '';

  const m = lead.metadata || {};
  const context = {
    name: lead.name ? lead.name.split(' ')[0] : 'there',
    full_name: lead.name || '',
    lead_type: (lead.lead_type || '').replace('_', ' '),
    location: lead.locality || lead.city || 'your area',
    business_name: m.business_name || 'your business',
    issue_category: m.issue_category ? m.issue_category.replace('_', ' ') : 'maintenance',
    material_items: m.materials_required || 'materials',
    status: lead.status || '',
    portal_link: `https://app.buildogram.com/client/dashboard` // Safe generic fallback
  };

  return templateBody.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match, key) => {
    return context[key] !== undefined ? context[key] : '';
  });
}
