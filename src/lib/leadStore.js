// /src/lib/leadStore.js
// Shared enquiry/lead data utility — client-side only (localStorage)
// Used by: Public Partner Profile (create), Partner OS Leads, Ops Admin

export const PUBLIC_LEAD_STATUSES = ['New', 'Assigned', 'Contacted', 'Site Visit', 'Quotation Sent', 'Negotiation', 'Won', 'Lost'];
export const BUDGET_RANGES = ['Under ₹5L', '₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹60L', '₹60L – ₹1Cr', '₹1Cr – ₹2Cr', 'Above ₹2Cr'];

const STORAGE_KEY = 'bos_all_leads';

const DEMO_LEADS = [
  {
    id: 'PL-001',
    partnerSlug: 'demo-builder',
    partnerName: 'Buildcraft Constructions',
    category: 'Builder',
    customerName: 'Aravind Ganesh',
    phone: '9876501234',
    email: 'aravind@email.com',
    requirement: 'G+2 residential home construction',
    location: 'Medavakkam, Chennai',
    budgetRange: '₹60L – ₹1Cr',
    message: 'Looking to build a 2,400 sqft home with 4 BHK. Need complete turnkey service including interior.',
    source: 'Partner Profile',
    status: 'New',
    createdAt: '2026-05-24',
    followUpDate: '',
    notes: '',
  },
  {
    id: 'PL-002',
    partnerSlug: 'demo-solar',
    partnerName: 'SunBridge Energy Solutions',
    category: 'Solar',
    customerName: 'Kavitha Rajan',
    phone: '9765012345',
    email: 'kavitha@gmail.com',
    requirement: '5kW rooftop solar with net metering',
    location: 'Tambaram, Chennai',
    budgetRange: '₹3L – ₹6L',
    message: 'Looking for 5kW system. Want to avail MNRE subsidy.',
    source: 'Partner Profile',
    status: 'Contacted',
    createdAt: '2026-05-23',
    followUpDate: '2026-05-28',
    notes: 'Site visit scheduled.',
  },
];

export function getAllLeads() {
  if (typeof window === 'undefined') return DEMO_LEADS;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEMO_LEADS;
}

export function getLeadsByPartner(slug) {
  return getAllLeads().filter(l => l.partnerSlug === slug);
}

export function createLead(lead) {
  const all = getAllLeads();
  const newLead = {
    ...lead,
    id: 'PL-' + Date.now().toString().slice(-6),
    status: 'New',
    createdAt: new Date().toISOString().slice(0, 10),
    followUpDate: '',
    notes: '',
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newLead, ...all]));
  }
  return newLead;
}

export function updateLeadStatus(id, status) {
  const all = getAllLeads();
  const updated = all.map(l => l.id === id ? { ...l, status } : l);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function updateLead(id, data) {
  const all = getAllLeads();
  const updated = all.map(l => l.id === id ? { ...l, ...data } : l);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
