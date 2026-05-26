// DEMO MODE STORAGE - REPLACE WITH DB LATER

if (!global.mockLeads) {
  global.mockLeads = [
    {
      id: 'demo-lead-1',
      leadType: 'construction',
      name: 'Ravi Kumar',
      phone: '9876543210',
      email: 'ravi@example.com',
      location: 'OMR, Chennai',
      priority: 'High',
      status: 'New',
      pipelineStage: 'New',
      source: 'Website Form',
      assignedTo: null,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      nextFollowUpDate: null,
      notes: 'Planning to build a 2400 sqft villa.',
      activityLog: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          action: 'Lead Created',
          note: 'Submitted via Home Construction form',
          user: 'System'
        }
      ],
      formData: {
        plotSize: '2400 sqft',
        constructionType: 'Villa',
        budget: '1.2 Cr',
        startDate: 'Next month'
      }
    }
  ];
}

export function getMockLeads() {
  return global.mockLeads;
}

export function addMockLead(leadData) {
  const newId = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const newLead = {
    id: newId,
    createdAt: timestamp,
    updatedAt: timestamp,
    status: 'New',
    pipelineStage: 'New',
    nextFollowUpDate: null,
    priority: determinePriority(leadData.leadType),
    activityLog: [
      {
        id: crypto.randomUUID(),
        timestamp: timestamp,
        action: 'Lead Created',
        note: `Submitted via ${leadData.source || 'Website Form'}`,
        user: 'System'
      }
    ],
    ...leadData
  };
  global.mockLeads.unshift(newLead);
  return newLead;
}

export function updateMockLead(id, updates, currentUser = 'System') {
  const leadIndex = global.mockLeads.findIndex(l => l.id === id);
  if (leadIndex !== -1) {
    const lead = global.mockLeads[leadIndex];
    const timestamp = new Date().toISOString();
    
    // Auto-log important changes
    const newLogEntries = [];
    if (updates.pipelineStage && updates.pipelineStage !== lead.pipelineStage) {
      newLogEntries.push({
        id: crypto.randomUUID(),
        timestamp,
        action: 'Stage Updated',
        note: `Moved from ${lead.pipelineStage} to ${updates.pipelineStage}`,
        user: currentUser
      });
      
      // Auto-update standard status if converted/lost
      if (['Converted', 'Won'].includes(updates.pipelineStage)) updates.status = 'Won';
      if (['Lost'].includes(updates.pipelineStage)) updates.status = 'Lost';
    }
    
    if (updates.assignedTo && updates.assignedTo !== lead.assignedTo) {
      newLogEntries.push({
        id: crypto.randomUUID(),
        timestamp,
        action: 'Assigned',
        note: `Assigned to ${updates.assignedTo}`,
        user: currentUser
      });
    }

    if (updates.nextFollowUpDate && updates.nextFollowUpDate !== lead.nextFollowUpDate) {
      newLogEntries.push({
        id: crypto.randomUUID(),
        timestamp,
        action: 'Follow-up Scheduled',
        note: `Follow-up set for ${new Date(updates.nextFollowUpDate).toLocaleDateString('en-IN')}`,
        user: currentUser
      });
    }

    global.mockLeads[leadIndex] = {
      ...lead,
      ...updates,
      activityLog: [...(lead.activityLog || []), ...newLogEntries],
      updatedAt: timestamp
    };
    return global.mockLeads[leadIndex];
  }
  return null;
}

export function addLeadActivity(id, action, note, user = 'System') {
  const leadIndex = global.mockLeads.findIndex(l => l.id === id);
  if (leadIndex !== -1) {
    const timestamp = new Date().toISOString();
    const newActivity = {
      id: crypto.randomUUID(),
      timestamp,
      action,
      note,
      user
    };
    global.mockLeads[leadIndex].activityLog.push(newActivity);
    global.mockLeads[leadIndex].updatedAt = timestamp;
    return newActivity;
  }
  return null;
}

function determinePriority(type) {
  if (['construction', 'boq_audit', 'material_quote'].includes(type)) return 'High';
  if (['partner_application', 'property_listing', 'rental_listing', 'resale_listing', 'property_support'].includes(type)) return 'Medium';
  return 'Low';
}

// Phase 5: Operations Workflow Demo Data

if (!global.mockProjectRequirements) global.mockProjectRequirements = [];
if (!global.mockBoqReviews) global.mockBoqReviews = [];
if (!global.mockMaterialQuoteRequests) global.mockMaterialQuoteRequests = [];
if (!global.mockSupplierQuotes) global.mockSupplierQuotes = [];
if (!global.mockPartnerMatches) global.mockPartnerMatches = [];
if (!global.mockProposals) global.mockProposals = [];
if (!global.mockProposalLineItems) global.mockProposalLineItems = [];
if (!global.mockDocumentAssets) global.mockDocumentAssets = [];
if (!global.mockSystemAuditLogs) global.mockSystemAuditLogs = [];

// Generic mock CRUD generator
const createMockCrud = (globalArrayName) => {
  return {
    getAll: (filters = {}) => {
      let data = global[globalArrayName];
      for (const key in filters) {
        data = data.filter(item => item[key] === filters[key]);
      }
      return data;
    },
    create: (data) => {
      const newItem = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data };
      global[globalArrayName].push(newItem);
      return newItem;
    },
    update: (id, updates) => {
      const index = global[globalArrayName].findIndex(i => i.id === id);
      if (index !== -1) {
        global[globalArrayName][index] = { ...global[globalArrayName][index], ...updates, updatedAt: new Date().toISOString() };
        return global[globalArrayName][index];
      }
      return null;
    }
  };
};

export const demoRequirements = createMockCrud('mockProjectRequirements');
export const demoBoqReviews = createMockCrud('mockBoqReviews');
export const demoMaterialQuotes = createMockCrud('mockMaterialQuoteRequests');
export const demoSupplierQuotes = createMockCrud('mockSupplierQuotes');
export const demoPartnerMatches = createMockCrud('mockPartnerMatches');
export const demoProposals = createMockCrud('mockProposals');
export const demoProposalLineItems = createMockCrud('mockProposalLineItems');
export const demoDocumentAssets = createMockCrud('mockDocumentAssets');
export const demoSystemAuditLogs = createMockCrud('mockSystemAuditLogs');

