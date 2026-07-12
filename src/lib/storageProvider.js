import * as demoStorage from './demoStorage';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client only once
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const isDemo = process.env.APP_MODE === 'demo' && process.env.NODE_ENV !== 'production';

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
  if (filters.leadType && filters.leadType !== 'all') where.lead_type = filters.leadType;
  if (filters.status && filters.status !== 'all') where.status = filters.status;
  if (filters.pipelineStage && filters.pipelineStage !== 'all') where.status = filters.pipelineStage;
  if (filters.priority && filters.priority !== 'all') where.priority = filters.priority;

  const leads = await prisma.leads.findMany({
    where,
    orderBy: { created_at: 'desc' },
    include: {
      lead_activities: { orderBy: { created_at: 'asc' } },
    }
  });

  // Map to the same format as demo
  return leads.map(l => ({
    ...l,
    leadType: l.lead_type,
    pipelineStage: l.status,
    assignedTo: l.assigned_to,
    formData: l.metadata || {},
    nextFollowUpDate: l.follow_up_date ? l.follow_up_date.toISOString() : null,
    createdAt: l.created_at?.toISOString() || null,
    updatedAt: l.updated_at?.toISOString() || null,
    activityLog: l.lead_activities.map(a => ({
      ...a,
      action: a.activity_type,
      note: a.description,
      timestamp: a.created_at?.toISOString() || null,
    }))
  }));
}

export async function addLead(leadData) {
  if (isDemo) {
    return demoStorage.addMockLead(leadData);
  }

  // Production Mode: Prisma
  const newLead = await prisma.leads.create({
    data: {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || null,
      city: leadData.city || 'Chennai',
      locality: leadData.locality || leadData.location || null,
      lead_type: leadData.leadType || 'general',
      source: leadData.source || 'Website Form',
      status: 'new',
      priority: determinePriority(leadData.leadType),
      message: leadData.message || leadData.notes || null,
      source_page: leadData.sourcePage || null,
      metadata: leadData.formData || {},
      lead_activities: {
        create: {
          activity_type: 'lead_created',
          title: 'Lead Created',
          description: `Submitted via ${leadData.source || 'Website Form'}`,
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
  const lead = await prisma.leads.findUnique({ where: { id } });
  if (!lead) return null;

  const data = {};
  if (status !== undefined) data.status = status;
  if (priority !== undefined) data.priority = priority;
  if (pipelineStage !== undefined) data.status = pipelineStage;
  if (assignedTo !== undefined) data.assigned_to = assignedTo || null;
  if (nextFollowUpDate !== undefined) data.follow_up_date = nextFollowUpDate ? new Date(nextFollowUpDate) : null;

  const newLogEntries = [];
  if (pipelineStage && pipelineStage !== lead.status) {
    newLogEntries.push({ activity_type: 'stage_updated', title: 'Stage Updated', description: `Moved from ${lead.status} to ${pipelineStage}` });
  }
  if (assignedTo && assignedTo !== lead.assigned_to) {
    newLogEntries.push({ activity_type: 'assigned', title: 'Assigned', description: `Assigned by ${currentUser}` });
  }
  if (nextFollowUpDate && nextFollowUpDate !== (lead.follow_up_date ? lead.follow_up_date.toISOString() : null)) {
    newLogEntries.push({ activity_type: 'follow_up_scheduled', title: 'Follow-up Scheduled', description: `Follow-up set for ${new Date(nextFollowUpDate).toLocaleDateString('en-IN')}` });
  }

  const updatedLead = await prisma.leads.update({
    where: { id },
    data: {
      ...data,
      lead_activities: {
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

  return await prisma.lead_activities.create({
    data: {
      lead_id: id,
      activity_type: String(action || 'note_added').toLowerCase().replace(/\s+/g, '_'),
      title: action || 'Note Added',
      description: note,
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
export const partnerMatches = createProxy('partnerMatch', demoStorage.demoPartnerMatches);
export const proposals = createProxy('proposal', demoStorage.demoProposals);
export const documentAssets = createProxy('documentAsset', demoStorage.demoDocumentAssets);

export { prisma };
