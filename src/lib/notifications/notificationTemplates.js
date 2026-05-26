/**
 * Notification Templates for Buildogram (Phase 7 - Launch Readiness)
 * 
 * These templates are designed to be used across Email, WhatsApp, and internal Ops Slack/Dashboards.
 * They keep the communication standard and professional.
 */

export const NOTIFICATION_TEMPLATES = {
  // -------------------------
  // 1. Ops & Admin Alerts
  // -------------------------
  ADMIN_NEW_LEAD: {
    type: 'internal_alert',
    subject: '🚨 New Lead Received on Buildogram',
    body: (data) => `New lead received from ${data.source || 'Website'}.
Name: ${data.name}
Phone: ${data.phone}
Requirement: ${data.leadType}
Location: ${data.location || 'N/A'}

Review this lead in the Ops Dashboard Pipeline.`
  },

  ADMIN_PARTNER_REGISTRATION: {
    type: 'internal_alert',
    subject: '🤝 New Partner Registration',
    body: (data) => `A new partner has applied to join Buildogram.
Company: ${data.companyName}
Type: ${data.partnerType}
Contact: ${data.name} / ${data.phone}
Experience: ${data.experience || 'Not specified'}

Please verify their details before approving.`
  },

  // -------------------------
  // 2. Client Confirmations
  // -------------------------
  CLIENT_CONSTRUCTION_ENQUIRY: {
    type: 'client_confirmation',
    subject: 'Welcome to Buildogram! Your Construction Journey begins.',
    body: (data) => `Hi ${data.name},

Thank you for reaching out to Buildogram. We have received your construction enquiry for ${data.location}.

Our engineering team is reviewing your requirement. We believe in building with clarity, so our first step will be understanding your scope without any pressure to commit.

We will call you shortly on ${data.phone}.

Regards,
Buildogram Engineering Team`
  },

  CLIENT_BOQ_REVIEW: {
    type: 'client_confirmation',
    subject: 'Buildogram BOQ & Plan Review Request',
    body: (data) => `Hi ${data.name},

Thank you for requesting a BOQ and Plan Review. 
Having clarity on scope and quantities before execution is the best decision a homeowner can make.

One of our project engineers will contact you soon to collect your existing drawings/quotes for review.

Regards,
Buildogram Engineering Team`
  },

  CLIENT_MATERIAL_QUOTE: {
    type: 'client_confirmation',
    subject: 'Buildogram Material Request Confirmation',
    body: (data) => `Hi ${data.name},

We have received your request for ${data.materialType}.
We are currently routing this to our verified supplier network to get you the most transparent and competitive rate.

We will share the quotes with you shortly.

Regards,
Buildogram Procurement Team`
  },

  // -------------------------
  // 3. Partner Notifications
  // -------------------------
  PARTNER_REGISTRATION_CONFIRM: {
    type: 'partner_confirmation',
    subject: 'Buildogram Partner Application Received',
    body: (data) => `Hi ${data.name},

Thank you for applying to join the Buildogram Verified Partner Network as a ${data.partnerType}.

To maintain the quality of our ecosystem, every profile undergoes an engineering review. Our team will contact you shortly to verify your past projects, credentials, and service areas.

Regards,
Buildogram Partner Management`
  },

  // -------------------------
  // 4. Workflow Notifications
  // -------------------------
  PROPOSAL_SHARED: {
    type: 'workflow_alert',
    subject: 'Your Buildogram Proposal is Ready',
    body: (data) => `Hi ${data.name},

Your customized construction proposal is ready for review.
You can view, download, or print the document directly from your Client Dashboard.

Access it here: [Dashboard Link]

Let us know if you have any questions.`
  }
};

/**
 * Helper to compile a template safely.
 */
export function compileTemplate(templateKey, data) {
  const template = NOTIFICATION_TEMPLATES[templateKey];
  if (!template) {
    console.error(`Template not found: ${templateKey}`);
    return null;
  }
  return {
    subject: template.subject,
    body: template.body(data || {})
  };
}
