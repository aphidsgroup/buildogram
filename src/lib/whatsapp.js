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
 * Generates the appropriate default template based on the CRM lead type.
 */
export function generateTemplate(lead) {
  if (!lead || !lead.name) return '';

  const name = lead.name.split(' ')[0]; // First name
  const type = lead.lead_type || 'general';
  const m = lead.metadata || {};

  switch (type) {
    case 'property_listing':
    case 'rental_listing':
    case 'resale_listing':
      const loc = lead.locality || lead.city || 'your area';
      return `Hi ${name}, this is Buildogram. We received your property listing request for ${loc}. Our team will review the details and contact you for the next step.`;
      
    case 'material_quote':
      const mat = m.material_category || 'materials';
      return `Hi ${name}, this is Buildogram. We received your material quote request for ${mat}. Our team will check availability and rates and update you shortly.`;
      
    case 'partner_application':
      const biz = m.business_name || 'your business';
      return `Hi ${name}, this is Buildogram. We received your partner application for ${biz}. Our team will review your profile and guide you on the next step.`;
      
    case 'maintenance':
      const issue = m.issue_category ? m.issue_category.replace('_', ' ') : 'maintenance';
      return `Hi ${name}, this is Buildogram. We received your maintenance request for ${issue}. Our team will review and update you on the next step.`;
      
    case 'construction':
    case 'general':
    default:
      return `Hi ${name}, this is Buildogram. Thank you for contacting us. Our team will review your requirement and get back to you shortly.`;
  }
}
