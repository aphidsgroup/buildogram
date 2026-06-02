// Buildogram — Canonical Model Definitions
// All field shapes are defined here. Services use these as reference.
// In demo mode, these are plain JS objects. In DB mode, map to ORM schemas.

/* ── USER & ROLES ──────────────────────────────────────────────────────── */

export const ROLES = {
  ops_admin:    'ops_admin',      // Full Buildogram admin
  ops_manager:  'ops_manager',    // Ops team member
  ops_viewer:   'ops_viewer',     // Read-only ops
  partner:      'partner',        // Builder / architect / contractor etc.
  supplier:     'supplier',       // Material supplier
  customer:     'customer',       // End homeowner / property buyer
};

export const PARTNER_TYPES = [
  'builder', 'contractor', 'architect', 'civil_engineer',
  'interior_designer', 'material_supplier', 'property_partner',
  'plumber', 'electrician', 'waterproofing', 'painter', 'other',
];

/** @typedef {{ id: string, email: string, name: string, phone: string, role: string, partnerType?: string, approvalStatus?: string, planType?: string, createdAt: string }} User */
export const UserModel = {
  id: '',
  email: '',
  name: '',
  phone: '',
  role: ROLES.customer,
  partnerType: null,
  approvalStatus: 'pending',    // pending | approved | rejected | suspended
  planType: 'free',             // free | pro | enterprise
  createdAt: '',
  updatedAt: '',
};

/* ── PARTNER ───────────────────────────────────────────────────────────── */
export const PartnerModel = {
  id: '',
  userId: '',
  companyName: '',
  ownerName: '',
  email: '',
  phone: '',
  partnerType: 'builder',
  city: '',
  location: '',
  experience: '',
  specialisation: [],
  approvalStatus: 'pending',    // pending | approved | rejected | suspended
  verificationStatus: 'unverified', // unverified | verified | featured
  planType: 'free',
  publicProfileSlug: null,
  referralCode: null,
  createdAt: '',
  updatedAt: '',
};

/* ── CUSTOMER ──────────────────────────────────────────────────────────── */
export const CustomerModel = {
  id: '',
  userId: '',
  name: '',
  email: '',
  phone: '',
  city: '',
  locality: '',
  createdAt: '',
};

/* ── LEAD ──────────────────────────────────────────────────────────────── */
export const LEAD_STATUSES = [
  'new', 'contacted', 'qualified', 'proposal', 'won', 'lost',
];

export const LEAD_TYPES = [
  'construction', 'boq_audit', 'plan_review', 'material_quote',
  'partner_application', 'property_listing', 'property_inquiry',
  'property_passport', 'maintenance', 'rental_listing', 'general',
];

export const LeadModel = {
  id: '',
  name: '',
  phone: '',
  email: '',
  city: '',
  locality: '',
  leadType: 'construction',
  status: 'new',
  source: '',
  sourcePage: '',
  message: '',
  assignedPartnerId: null,
  assignedPartnerUserId: null,
  followUpDate: null,
  internalNotes: '',
  partnerNotes: '',
  propertyId: null,
  metadata: {},
  createdAt: '',
  updatedAt: '',
};

/* ── PROJECT ───────────────────────────────────────────────────────────── */
export const PROJECT_SOURCE_TYPES = ['buildogram_assigned', 'partner_private'];
export const PROJECT_VISIBILITY = [
  'private',              // Only partner sees it
  'shared_with_customer', // Partner + customer
  'shared_with_buildogram',// Partner + ops
  'shared_with_both',     // Everyone
];

export const ProjectModel = {
  id: '',
  name: '',
  clientName: '',
  clientId: null,
  partnerId: '',
  sourceLeadId: null,
  sourceType: 'partner_private',  // buildogram_assigned | partner_private
  visibility: 'private',
  location: '',
  city: '',
  projectType: 'Residential',
  status: 'Planning',       // Planning | Active | On Hold | Completed | Cancelled
  stage: 'Foundation',
  progress: 0,              // 0–100
  budget: 0,
  startDate: null,
  targetDate: null,
  completedDate: null,
  description: '',
  createdAt: '',
  updatedAt: '',
};

/* ── PROJECT MILESTONE ─────────────────────────────────────────────────── */
export const MILESTONE_STATUSES = [
  'not_started', 'in_progress', 'completed', 'delayed', 'on_hold',
];

export const MilestoneModel = {
  id: '',
  projectId: '',
  name: '',
  description: '',
  stage: '',
  plannedStart: null,
  plannedEnd: null,
  actualStart: null,
  actualEnd: null,
  status: 'not_started',
  paymentPct: 0,
  customerVisible: true,
  createdAt: '',
};

/* ── SITE UPDATE ───────────────────────────────────────────────────────── */
export const SITE_UPDATE_VISIBILITY = [
  'internal_only', 'customer_visible', 'buildogram_visible', 'both',
];

export const SiteUpdateModel = {
  id: '',
  projectId: '',
  date: '',
  workDone: '',
  labourCount: 0,
  materialsReceived: '',
  issues: '',
  tomorrowPlan: '',
  photos: [],               // Array of FileModel references
  visibility: 'internal_only',
  postedBy: '',
  createdAt: '',
};

/* ── MATERIAL REQUEST ──────────────────────────────────────────────────── */
export const MATERIAL_REQUEST_STATUSES = [
  'draft', 'sent_to_buildogram', 'quotation_pending',
  'quoted', 'approved', 'ordered', 'dispatched', 'delivered', 'cancelled',
];

export const MaterialRequestModel = {
  id: '',
  projectId: '',
  partnerId: '',
  materialName: '',
  quantity: '',
  unit: '',
  requiredDate: null,
  urgency: 'medium',        // low | medium | high
  notes: '',
  status: 'draft',
  assignedSupplierId: null,
  approvedQuoteId: null,
  createdAt: '',
  updatedAt: '',
};

export const MaterialRequestItemModel = {
  id: '',
  requestId: '',
  materialName: '',
  quantity: '',
  unit: '',
  specifications: '',
};

/* ── SUPPLIER & QUOTATION ──────────────────────────────────────────────── */
export const SupplierModel = {
  id: '',
  partnerId: null,          // If supplier is also a partner
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  city: '',
  materialTypes: [],
  approvalStatus: 'pending',
  createdAt: '',
};

export const QUOTATION_STATUSES = ['submitted', 'selected', 'rejected', 'expired'];

export const SupplierQuotationModel = {
  id: '',
  requestId: '',
  supplierId: '',
  supplierName: '',
  unitRate: 0,
  total: 0,
  deliveryDays: 0,
  validTill: null,
  notes: '',
  status: 'submitted',
  selected: false,
  submittedAt: '',
};

/* ── DOCUMENT ──────────────────────────────────────────────────────────── */
export const DOCUMENT_VISIBILITY = [
  'internal_only', 'customer_visible', 'buildogram_visible', 'partner_visible',
];

export const DOC_TYPES = [
  'agreement', 'quotation', 'boq', '2d_plan', '3d_render',
  'structural_drawing', 'electrical_drawing', 'plumbing_drawing',
  'invoice', 'receipt', 'warranty', 'completion_certificate',
  'site_photo', 'inspection_report', 'handover_doc', 'other',
];

export const ProjectDocumentModel = {
  id: '',
  projectId: '',
  name: '',
  docType: 'other',
  fileUrl: null,
  fileName: '',
  fileSize: null,
  mimeType: '',
  version: '1.0',
  status: 'draft',          // draft | sent_to_client | approved | rejected
  visibility: 'internal_only',
  uploadedBy: '',
  uploadedAt: '',
  linkedMilestoneId: null,
};

/* ── FILE UPLOAD METADATA ──────────────────────────────────────────────── */
export const FileModel = {
  id: '',
  fileName: '',
  fileType: '',             // MIME type
  fileUrl: '',
  fileSize: null,
  uploadedBy: '',
  uploadedAt: '',
  visibility: 'internal_only',
  linkedProjectId: null,
  linkedUpdateId: null,
  linkedDocId: null,
  linkedQuoteId: null,
  linkedInvoiceId: null,
  provider: 'cloudinary',   // cloudinary | s3 | local
  externalId: null,         // Cloudinary public_id etc.
};

/* ── PAYMENT ───────────────────────────────────────────────────────────── */
export const PAYMENT_STATUSES = ['Pending', 'Paid', 'Overdue', 'Cancelled', 'Partial'];

export const ProjectPaymentModel = {
  id: '',
  projectId: '',
  milestone: '',
  amount: 0,
  dueDate: null,
  paidDate: null,
  status: 'Pending',
  notes: '',
  invoiceId: null,
  createdAt: '',
};

/* ── EXPENSE ───────────────────────────────────────────────────────────── */
export const EXPENSE_CATEGORIES = [
  'Labour', 'Material', 'Transport', 'Tools', 'Equipment',
  'Site Expense', 'Miscellaneous',
];

export const ProjectExpenseModel = {
  id: '',
  projectId: '',
  category: 'Labour',
  amount: 0,
  date: '',
  paidTo: '',
  notes: '',
  receiptFileId: null,
  createdAt: '',
};

/* ── ISSUE ─────────────────────────────────────────────────────────────── */
export const ISSUE_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
export const ISSUE_STATUSES   = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const ProjectIssueModel = {
  id: '',
  projectId: '',
  title: '',
  description: '',
  raisedBy: '',
  priority: 'Medium',
  status: 'Open',
  dueDate: null,
  resolutionNote: '',
  customerVisible: false,
  createdAt: '',
  resolvedAt: null,
};

/* ── ACTIVITY LOG ──────────────────────────────────────────────────────── */
export const ACTIVITY_TYPES = [
  'milestone', 'site_update', 'material', 'finance',
  'issue', 'document', 'lead', 'status_change', 'note', 'system',
];

export const ActivityLogModel = {
  id: '',
  projectId: null,
  leadId: null,
  type: 'system',
  icon: '📋',
  title: '',
  detail: '',
  actor: '',
  actorId: null,
  timestamp: '',
};

/* ── NOTIFICATION ──────────────────────────────────────────────────────── */
export const NOTIFICATION_EVENTS = [
  'lead_assigned', 'lead_converted', 'project_created',
  'site_update_added', 'material_request_created', 'supplier_assigned',
  'quote_submitted', 'quote_approved', 'issue_raised', 'payment_updated',
  'milestone_completed', 'document_uploaded', 'partner_approved',
];

export const NotificationModel = {
  id: '',
  recipientId: '',
  recipientRole: '',
  event: '',
  title: '',
  body: '',
  linkUrl: null,
  read: false,
  createdAt: '',
};

/* ── SUBSCRIPTION LIMITS ───────────────────────────────────────────────── */
export const PLAN_LIMITS = {
  free: {
    projects: 2,
    materialRequests: 20,
    documents: 25,
    teamMembers: 3,
    storageGB: 1,
  },
  pro: {
    projects: 25,
    materialRequests: 200,
    documents: 500,
    teamMembers: 10,
    storageGB: 20,
  },
  enterprise: {
    projects: Infinity,
    materialRequests: Infinity,
    documents: Infinity,
    teamMembers: Infinity,
    storageGB: 100,
  },
};

export const SubscriptionLimitModel = {
  partnerId: '',
  planType: 'free',
  limits: PLAN_LIMITS.free,
  usage: {
    projects: 0,
    materialRequests: 0,
    documents: 0,
    teamMembers: 1,
    storageGB: 0,
  },
};
