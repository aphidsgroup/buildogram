import * as demoStorage from './demoStorage';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client only once
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const isDemo = process.env.APP_MODE === 'demo' || !process.env.DATABASE_URL;

export async function getLeads(filters = {}) {
  if (isDemo) {
    let leads = demoStorage.getMockLeads();
    if (filters.leadType && filters.leadType !== 'all') leads = leads.filter(l => l.leadType === filters.leadType);
    if (filters.status && filters.status !== 'all') leads = leads.filter(l => l.status === filters.status);
    if (filters.pipelineStage && filters.pipelineStage !== 'all') leads = leads.filter(l => l.pipelineStage === filters.pipelineStage);
    if (filters.priority && filters.priority !== 'all') leads = leads.filter(l => l.priority === filters.priority);
    return leads;
  }

  // Production Mode: Prisma
  const where = {};
  if (filters.leadType && filters.leadType !== 'all') where.leadType = filters.leadType;
  if (filters.status && filters.status !== 'all') where.status = filters.status;
  if (filters.pipelineStage && filters.pipelineStage !== 'all') where.pipelineStage = filters.pipelineStage;
  if (filters.priority && filters.priority !== 'all') where.priority = filters.priority;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      activityLog: { orderBy: { timestamp: 'asc' } },
      followUps: { orderBy: { followUpDate: 'asc' } }
    }
  });

  // Map to the same format as demo
  return leads.map(l => ({
    ...l,
    formData: l.formData ? JSON.parse(l.formData) : {},
    nextFollowUpDate: l.nextFollowUpDate ? l.nextFollowUpDate.toISOString() : null,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
    activityLog: l.activityLog.map(a => ({
      ...a,
      timestamp: a.timestamp.toISOString()
    }))
  }));
}

export async function addLead(leadData) {
  if (isDemo) {
    return demoStorage.addMockLead(leadData);
  }

  // Production Mode: Prisma
  const { formData, ...rest } = leadData;
  const newLead = await prisma.lead.create({
    data: {
      ...rest,
      formData: formData ? JSON.stringify(formData) : null,
      pipelineStage: 'New',
      status: 'New',
      priority: determinePriority(leadData.leadType),
      activityLog: {
        create: {
          action: 'Lead Created',
          note: `Submitted via ${leadData.source || 'Website Form'}`,
          user: 'System'
        }
      }
    }
  });
  return newLead;
}

export async function updateLead(id, updates, currentUser = 'System') {
  if (isDemo) {
    return demoStorage.updateMockLead(id, updates, currentUser);
  }

  // Production Mode: Prisma
  const { pipelineStage, status, priority, assignedTo, nextFollowUpDate } = updates;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return null;

  const data = {};
  if (status !== undefined) data.status = status;
  if (priority !== undefined) data.priority = priority;
  if (pipelineStage !== undefined) {
    data.pipelineStage = pipelineStage;
    if (['Converted', 'Won'].includes(pipelineStage)) data.status = 'Won';
    if (['Lost'].includes(pipelineStage)) data.status = 'Lost';
  }
  if (assignedTo !== undefined) data.assignedTo = assignedTo;
  if (nextFollowUpDate !== undefined) data.nextFollowUpDate = nextFollowUpDate ? new Date(nextFollowUpDate) : null;

  const newLogEntries = [];
  if (pipelineStage && pipelineStage !== lead.pipelineStage) {
    newLogEntries.push({ action: 'Stage Updated', note: `Moved from ${lead.pipelineStage} to ${pipelineStage}`, user: currentUser });
  }
  if (assignedTo && assignedTo !== lead.assignedTo) {
    newLogEntries.push({ action: 'Assigned', note: `Assigned to ${assignedTo}`, user: currentUser });
  }
  if (nextFollowUpDate && nextFollowUpDate !== (lead.nextFollowUpDate ? lead.nextFollowUpDate.toISOString() : null)) {
    newLogEntries.push({ action: 'Follow-up Scheduled', note: `Follow-up set for ${new Date(nextFollowUpDate).toLocaleDateString('en-IN')}`, user: currentUser });
  }

  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      ...data,
      activityLog: {
        create: newLogEntries
      }
    }
  });

  return updatedLead;
}

export async function addLeadActivity(id, action, note, user = 'System') {
  if (isDemo) {
    return demoStorage.addLeadActivity(id, action, note, user);
  }

  return await prisma.activityLog.create({
    data: {
      leadId: id,
      action,
      note,
      user
    }
  });
}

function determinePriority(type) {
  if (['construction', 'boq_audit', 'material_quote'].includes(type)) return 'High';
  if (['partner_application', 'property_listing', 'rental_listing', 'resale_listing', 'property_support'].includes(type)) return 'Medium';
  return 'Low';
}

// Phase 5: Operations Workflow Providers

// Generic Proxy Generator for standard CRUD
const createProxy = (modelName, demoCrud) => ({
  getAll: async (filters = {}) => {
    if (isDemo) return demoCrud.getAll(filters);
    return await prisma[modelName].findMany({ where: filters, orderBy: { createdAt: 'desc' } });
  },
  create: async (data) => {
    if (isDemo) return demoCrud.create(data);
    return await prisma[modelName].create({ data });
  },
  update: async (id, data) => {
    if (isDemo) return demoCrud.update(id, data);
    return await prisma[modelName].update({ where: { id }, data });
  }
});

export const projectRequirements = createProxy('projectRequirement', demoStorage.demoRequirements);
export const boqReviews = createProxy('boqReview', demoStorage.demoBoqReviews);
export const materialQuoteRequests = createProxy('materialQuoteRequest', demoStorage.demoMaterialQuotes);
export const supplierQuotes = createProxy('supplierQuote', demoStorage.demoSupplierQuotes);
export const partnerMatches = createProxy('partnerMatch', demoStorage.demoPartnerMatches);
export const proposals = createProxy('proposal', demoStorage.demoProposals);
export const proposalLineItems = createProxy('proposalLineItem', demoStorage.demoProposalLineItems);
export const documentAssets = createProxy('documentAsset', demoStorage.demoDocumentAssets);
export const systemAuditLogs = createProxy('systemAuditLog', demoStorage.demoSystemAuditLogs);

export { prisma };
