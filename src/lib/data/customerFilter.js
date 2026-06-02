/**
 * Buildogram Customer Data Filter
 * ─────────────────────────────────────────────────────────────────────────
 * Strips all internal/sensitive fields before sending project data
 * to a customer-facing page. Single source of truth for what customers see.
 *
 * Usage:
 *   import { filterProjectForCustomer } from '@/lib/data/customerFilter';
 *   const safeProject = filterProjectForCustomer(project);
 */

/**
 * Strip internal fields from a project object.
 * Customers CANNOT see: expenses, partner margins, internal notes,
 * supplier quotes, private costs, partner internal data.
 *
 * @param {object} project
 * @returns {object} safe project for customer
 */
export function filterProjectForCustomer(project) {
  if (!project) return null;

  // Fields that are always customer-safe
  const safe = {
    id:           project.id,
    name:         project.name,
    clientName:   project.clientName || project.client,
    location:     project.location,
    city:         project.city,
    projectType:  project.projectType || project.type,
    status:       project.status,
    stage:        project.stage || project.currentStage,
    progress:     project.progress ?? 0,
    startDate:    project.startDate,
    targetDate:   project.targetDate || project.targetCompletion,
    budget:       project.budget,         // Contract value — OK to show
    visibility:   project.visibility,
    sourceType:   project.sourceType,
  };

  // NEVER expose these fields to customers
  // (they are stripped by not including them above)
  // - internalNotes, partnerNotes, adminNotes
  // - expenses, expenseBreakdown, partnerMargin
  // - supplierQuotes, rfqData, quotationDetails
  // - partnerId, partnerUserId (internal IDs)
  // - assignedPartnerId (internal assignment)

  return safe;
}

/**
 * Filter a milestone to only include customer-visible data.
 * @param {object} milestone
 * @returns {object|null}
 */
export function filterMilestoneForCustomer(milestone) {
  if (!milestone) return null;
  if (!milestone.customerVisible) return null; // Hard filter

  return {
    id:            milestone.id,
    name:          milestone.name || milestone.title,
    description:   milestone.description,
    stage:         milestone.stage,
    targetDate:    milestone.targetDate || milestone.plannedEnd,
    completedDate: milestone.completedDate || milestone.actualEnd,
    status:        milestone.status,
    paymentPct:    milestone.paymentPct,  // Payment % on completion — OK
  };
}

/**
 * Filter a site update to only include customer-visible entries.
 * @param {object} update
 * @returns {object|null}
 */
export function filterSiteUpdateForCustomer(update) {
  if (!update) return null;
  const visible = update.clientVisible || update.visibility === 'customer_visible' || update.visibility === 'both';
  if (!visible) return null;

  return {
    id:       update.id,
    date:     update.date || update.createdAt,
    title:    update.title || update.workDone?.slice(0, 60),
    content:  update.workDone || update.content,
    photos:   update.photos || [],
    postedBy: update.postedBy || 'Site Team',
  };
  // Strip: labourCount, internal issues, tomorrow plan, materialsReceived
}

/**
 * Filter a document to only include customer-visible ones.
 * @param {object} doc
 * @returns {object|null}
 */
export function filterDocumentForCustomer(doc) {
  if (!doc) return null;
  const visible = doc.customerVisible ||
    doc.visibility === 'customer_visible' ||
    doc.visibility === 'both';
  if (!visible) return null;

  return {
    id:           doc.id,
    name:         doc.name,
    docType:      doc.type || doc.docType,
    uploadedDate: doc.uploadedDate || doc.uploadedAt,
    fileUrl:      doc.url || doc.fileUrl || '#',
    version:      doc.version,
  };
  // Strip: internal BOQ workings, private notes, visibility field itself
}

/**
 * Filter payment to only show milestone name + amount + status.
 * Never show supplier-side cost breakdown or partner margin.
 * @param {object} payment
 * @returns {object}
 */
export function filterPaymentForCustomer(payment) {
  if (!payment) return null;
  return {
    id:        payment.id,
    milestone: payment.milestone,
    amount:    payment.amount,
    dueDate:   payment.dueDate,
    paidDate:  payment.paidDate,
    status:    payment.status,
  };
  // Strip: internal cost breakdown, supplier amounts, partner expenses
}

/**
 * Filter an issue for customer visibility.
 * @param {object} issue
 * @returns {object|null}
 */
export function filterIssueForCustomer(issue) {
  if (!issue) return null;
  if (!issue.customerVisible) return null;

  return {
    id:          issue.id,
    title:       issue.title,
    description: issue.description,
    status:      issue.status,
    date:        issue.createdAt || issue.date,
    raisedBy:    issue.raisedBy,
  };
  // Strip: internal resolution notes, partner internal discussions
}

/**
 * Audit a project object and warn in dev if unsafe fields are present.
 * Use this in development to catch accidental leaks.
 * @param {object} project
 */
export function auditCustomerSafety(project) {
  if (process.env.NODE_ENV !== 'development') return;
  const forbidden = [
    'internalNotes', 'partnerNotes', 'adminNotes',
    'expenses', 'partnerMargin', 'supplierQuotes',
    'assignedPartnerId', 'partnerId',
  ];
  const found = forbidden.filter(f => f in project);
  if (found.length > 0) {
    console.warn('[CustomerFilter] ⚠️ Unsafe fields present in customer data:', found);
  }
}
