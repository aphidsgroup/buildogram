// Buildogram Partner OS — Shared Demo Data
// All modules import from this file. Backed by localStorage for persistence.

export const LEAD_STATUSES = ['New', 'Contacted', 'Site Visit', 'Quotation Sent', 'Negotiation', 'Won', 'Lost'];
export const PROJECT_STAGES = ['Lead', 'Design', 'BOQ', 'Agreement', 'Approval', 'Site Mobilization', 'Foundation', 'Structure', 'Masonry', 'MEP', 'Plastering', 'Flooring', 'Painting', 'Finishing', 'Handover', 'Maintenance'];
export const BOQ_CATEGORIES = ['Civil Work', 'Foundation', 'RCC', 'Blockwork', 'Plastering', 'Flooring', 'Electrical', 'Plumbing', 'Painting', 'Doors & Windows', 'Interior Work', 'Waterproofing', 'Solar', 'Elevator', 'Home Automation', 'External Works', 'Finishing', 'Custom Items'];
export const MATERIAL_STATUSES = ['Requested', 'Approved', 'Ordered', 'Delivered', 'Used', 'Cancelled'];
export const DOC_TYPES = ['Agreement', 'Quotation', 'BOQ', '2D Plan', '3D Render', 'Structural Drawing', 'Electrical Drawing', 'Plumbing Drawing', 'Invoice', 'Receipt', 'Warranty', 'Completion Certificate'];
export const DOC_STATUSES = ['Draft', 'Sent to Client', 'Viewed', 'Approved', 'Rejected', 'Revision Requested'];

export const PACKAGE_RATES = {
  basic:    { rate: 1750, label: 'Basic',    desc: 'Vizag TMT Steel, Ramco Cement, standard vitrified tiles' },
  standard: { rate: 2200, label: 'Standard', desc: 'Tata Tiscon Steel, UltraTech Cement, Havells, Jaquar' },
  premium:  { rate: 2800, label: 'Premium',  desc: 'SAIL Steel, Ultratech PPC, Kohler, Italian marble' },
  luxury:   { rate: 3500, label: 'Luxury',   desc: 'Tata CRS Steel, Kohler smart, Italian marble, home automation' },
};

export const DEMO_LEADS = [
  { id: 'L001', customerName: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@email.com', requirement: 'G+2 Residential Home', location: 'Velachery, Chennai', budgetRange: '₹60-80L', projectType: 'Residential', source: 'Buildogram', status: 'Site Visit', followUpDate: '2026-05-28', notes: 'Client wants 3BHK with parking.', createdAt: '2026-05-10' },
  { id: 'L002', customerName: 'Priya Nair', phone: '9123456789', email: 'priya@email.com', requirement: 'Interior Design – 2BHK', location: 'OMR, Chennai', budgetRange: '₹12-18L', projectType: 'Interior', source: 'WhatsApp', status: 'Quotation Sent', followUpDate: '2026-05-26', notes: 'Wants modular kitchen and master bedroom.', createdAt: '2026-05-12' },
  { id: 'L003', customerName: 'Santhosh Rajan', phone: '9988776655', email: 'santhosh@biz.com', requirement: 'Villa Construction', location: 'ECR, Chennai', budgetRange: '₹1.5-2Cr', projectType: 'Villa', source: 'Referral', status: 'Negotiation', followUpDate: '2026-05-30', notes: 'Needs phased construction plan.', createdAt: '2026-05-15' },
  { id: 'L004', customerName: 'Deepa Menon', phone: '9654321098', email: 'deepa@email.com', requirement: 'Solar Panel Installation', location: 'Tambaram, Chennai', budgetRange: '₹3-5L', projectType: 'Solar', source: 'Google', status: 'New', followUpDate: '2026-05-27', notes: '3kW system for residential.', createdAt: '2026-05-20' },
  { id: 'L005', customerName: 'Arun Sharma', phone: '9765432109', email: 'arun@email.com', requirement: 'Home Renovation', location: 'Porur, Chennai', budgetRange: '₹25-35L', projectType: 'Renovation', source: 'Buildogram', status: 'Won', followUpDate: '2026-05-25', notes: 'Kitchen, bathrooms and painting only.', createdAt: '2026-05-05' },
];

export const DEMO_PROJECTS = [
  { id: 'P001', name: 'Rajesh Kumar Villa – Velachery', client: 'Rajesh Kumar', location: 'Velachery, Chennai', type: 'Residential', startDate: '2026-04-01', targetDate: '2026-12-31', stage: 'Structure', progress: 35, budget: 7500000, status: 'Active' },
  { id: 'P002', name: 'Priya Interior – OMR', client: 'Priya Nair', location: 'OMR, Chennai', type: 'Interior', startDate: '2026-05-01', targetDate: '2026-07-31', stage: 'Flooring', progress: 60, budget: 1500000, status: 'Active' },
  { id: 'P003', name: 'ECR Villa – Santhosh', client: 'Santhosh Rajan', location: 'ECR, Chennai', type: 'Villa', startDate: '2026-06-01', targetDate: '2027-06-30', stage: 'Agreement', progress: 5, budget: 18000000, status: 'Planning' },
  { id: 'P004', name: 'Arun Renovation – Porur', client: 'Arun Sharma', location: 'Porur, Chennai', type: 'Renovation', startDate: '2026-03-01', targetDate: '2026-06-30', stage: 'Painting', progress: 80, budget: 3200000, status: 'Active' },
];

export const DEMO_BOQ_ITEMS = [
  { id: 'B001', category: 'Foundation', item: 'PCC M10 Grade Concrete', qty: 45, unit: 'm³', materialCost: 4500, labourCost: 800, equipmentCost: 200, wastage: 5, margin: 12, gst: 18 },
  { id: 'B002', category: 'RCC', item: 'RCC M25 Grade Columns', qty: 120, unit: 'm³', materialCost: 6800, labourCost: 1200, equipmentCost: 400, wastage: 3, margin: 12, gst: 18 },
  { id: 'B003', category: 'Blockwork', item: 'AAC Block Masonry', qty: 850, unit: 'm²', materialCost: 320, labourCost: 180, equipmentCost: 20, wastage: 8, margin: 10, gst: 18 },
  { id: 'B004', category: 'Plastering', item: 'External Cement Plaster 20mm', qty: 1200, unit: 'm²', materialCost: 180, labourCost: 120, equipmentCost: 10, wastage: 7, margin: 10, gst: 18 },
  { id: 'B005', category: 'Flooring', item: 'Vitrified Tile 800x800mm', qty: 600, unit: 'm²', materialCost: 850, labourCost: 250, equipmentCost: 30, wastage: 10, margin: 15, gst: 18 },
];

export const DEMO_LOGBOOK = [
  { id: 'LOG001', date: '2026-05-24', project: 'P001', workDone: 'Ground floor column casting completed. 8 columns poured with M25 grade concrete.', labourCount: 24, materialsReceived: 'Cement 50 bags, Steel 1.2 MT', issues: 'Concrete pump delay – 2 hours lost', tomorrowPlan: 'Start first floor slab shuttering.', clientVisible: true, createdAt: '2026-05-24' },
  { id: 'LOG002', date: '2026-05-23', project: 'P002', workDone: 'Master bedroom flooring completed. Living room tiles started.', labourCount: 10, materialsReceived: 'Vitrified tiles 200 sqft received', issues: 'None', tomorrowPlan: 'Complete living room flooring, start bathroom waterproofing.', clientVisible: true, createdAt: '2026-05-23' },
];

export const DEMO_MATERIALS = [
  { id: 'M001', project: 'P001', material: 'UltraTech Cement OPC 53', qty: 200, unit: 'Bags', requiredDate: '2026-05-28', priority: 'High', status: 'Approved', vendorQuote: 'Pending', bestRateRequest: true },
  { id: 'M002', project: 'P001', material: 'Tata Tiscon TMT 16mm', qty: 2, unit: 'MT', requiredDate: '2026-05-30', priority: 'High', status: 'Ordered', vendorQuote: 'Received', bestRateRequest: false },
  { id: 'M003', project: 'P002', material: 'Jaquar Wall Mixer Fitting', qty: 4, unit: 'Nos', requiredDate: '2026-06-05', priority: 'Medium', status: 'Requested', vendorQuote: 'Pending', bestRateRequest: true },
];

export const DEMO_DOCUMENTS = [
  { id: 'D001', name: 'Construction Agreement – Rajesh Kumar', project: 'P001', type: 'Agreement', fileUrl: '#', status: 'Approved', version: '1.0', uploadedAt: '2026-04-01' },
  { id: 'D002', name: 'BOQ – ECR Villa', project: 'P003', type: 'BOQ', fileUrl: '#', status: 'Sent to Client', version: '2.1', uploadedAt: '2026-05-15' },
  { id: 'D003', name: 'Ground Floor 2D Plan', project: 'P001', type: '2D Plan', fileUrl: '#', status: 'Approved', version: '3.0', uploadedAt: '2026-04-10' },
];

export const DEMO_PROFILE = {
  companyName: 'Buildogram Partner Firm',
  category: 'Builder',
  description: 'A professional construction firm specializing in residential and commercial projects in Chennai.',
  services: 'Home Construction, Villa Construction, Renovation, Interior Design',
  serviceAreas: 'Chennai, Coimbatore, Madurai',
  contactPerson: '',
  phone: '',
  email: '',
  whatsapp: '',
  website: '',
  logoUrl: '',
  coverUrl: '',
  certifications: '',
  brands: '',
};

// ─── NEW: Milestones ────────────────────────────────────────────────
export const MILESTONE_STATUSES = ['not_started', 'in_progress', 'completed', 'delayed', 'on_hold'];
export const DEFAULT_RESIDENTIAL_MILESTONES = [
  'Site Visit', 'Soil Test', 'Design Finalization', 'Approval', 'Excavation',
  'Foundation', 'Plinth', 'Columns', 'Roof Slab', 'Brickwork',
  'Plumbing Rough-In', 'Electrical Rough-In', 'Plastering', 'Flooring',
  'Painting', 'Fixtures', 'Final Inspection', 'Handover'
];

export const DEMO_MILESTONES = [
  { id: 'MS001', projectId: 'P001', name: 'Foundation', plannedStart: '2026-04-01', plannedEnd: '2026-04-15', actualStart: '2026-04-01', actualEnd: '2026-04-18', status: 'completed', paymentPct: 20, notes: 'Completed with minor 3-day delay due to rain.', customerVisible: true },
  { id: 'MS002', projectId: 'P001', name: 'Plinth', plannedStart: '2026-04-19', plannedEnd: '2026-04-30', actualStart: '2026-04-19', actualEnd: '2026-05-02', status: 'completed', paymentPct: 10, notes: '', customerVisible: true },
  { id: 'MS003', projectId: 'P001', name: 'Columns & Roof Slab', plannedStart: '2026-05-03', plannedEnd: '2026-06-15', actualStart: '2026-05-03', actualEnd: null, status: 'in_progress', paymentPct: 25, notes: 'Ground floor columns done. First floor slab in progress.', customerVisible: true },
  { id: 'MS004', projectId: 'P001', name: 'Brickwork', plannedStart: '2026-06-16', plannedEnd: '2026-07-31', actualStart: null, actualEnd: null, status: 'not_started', paymentPct: 15, notes: '', customerVisible: true },
  { id: 'MS005', projectId: 'P002', name: 'Material Selection', plannedStart: '2026-05-01', plannedEnd: '2026-05-10', actualStart: '2026-05-01', actualEnd: '2026-05-09', status: 'completed', paymentPct: 30, notes: 'All tiles and fixtures selected.', customerVisible: true },
  { id: 'MS006', projectId: 'P002', name: 'Flooring', plannedStart: '2026-05-10', plannedEnd: '2026-06-15', actualStart: '2026-05-11', actualEnd: null, status: 'in_progress', paymentPct: 40, notes: '', customerVisible: true },
];

// ─── NEW: Issues / Snag List ────────────────────────────────────────
export const ISSUE_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
export const ISSUE_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const DEMO_ISSUES = [
  { id: 'IS001', projectId: 'P001', title: 'Concrete pump breakdown', description: 'Pump broke down mid-pour on 24th May. Lost 2 hours. Managed with manual labour.', raisedBy: 'Site Supervisor', priority: 'High', status: 'Resolved', dueDate: '2026-05-25', resolutionNote: 'Pump replaced. Work resumed by noon.', customerVisible: false, createdAt: '2026-05-24' },
  { id: 'IS002', projectId: 'P001', title: 'Steel delivery delayed', description: 'Tata Tiscon 16mm delivery expected 30th May. Supplier delayed to 3rd June.', raisedBy: 'Partner', priority: 'High', status: 'Open', dueDate: '2026-06-03', resolutionNote: '', customerVisible: false, createdAt: '2026-05-28' },
  { id: 'IS003', projectId: 'P002', title: 'Tile shade mismatch in bathroom', description: 'Batch 2 of tiles has slightly different shade. Client noticed it.', raisedBy: 'Client', priority: 'Medium', status: 'In Progress', dueDate: '2026-06-08', resolutionNote: '', customerVisible: true, createdAt: '2026-05-30' },
];

// ─── NEW: Payments ──────────────────────────────────────────────────
export const PAYMENT_STATUSES = ['Pending', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'];

export const DEMO_PAYMENTS = [
  { id: 'PAY001', projectId: 'P001', milestone: 'Foundation', amount: 1500000, dueDate: '2026-04-20', paidDate: '2026-04-22', status: 'Paid', notes: 'Paid via bank transfer.' },
  { id: 'PAY002', projectId: 'P001', milestone: 'Plinth', amount: 750000, dueDate: '2026-05-05', paidDate: '2026-05-08', status: 'Paid', notes: '' },
  { id: 'PAY003', projectId: 'P001', milestone: 'Columns & Roof Slab', amount: 1875000, dueDate: '2026-06-20', paidDate: null, status: 'Pending', notes: 'Due after slab completion.' },
  { id: 'PAY004', projectId: 'P002', milestone: 'Material Selection', amount: 450000, dueDate: '2026-05-12', paidDate: '2026-05-13', status: 'Paid', notes: '' },
  { id: 'PAY005', projectId: 'P002', milestone: 'Flooring', amount: 600000, dueDate: '2026-06-18', paidDate: null, status: 'Pending', notes: '' },
];

// ─── NEW: Expenses ──────────────────────────────────────────────────
export const EXPENSE_CATEGORIES = ['Labour', 'Material', 'Transport', 'Tools', 'Equipment', 'Site Expense', 'Miscellaneous'];

export const DEMO_EXPENSES = [
  { id: 'EXP001', projectId: 'P001', category: 'Labour', amount: 85000, date: '2026-05-24', paidTo: 'Kumar Construction Crew', notes: 'Weekly wages for 24 workers.' },
  { id: 'EXP002', projectId: 'P001', category: 'Material', amount: 42000, date: '2026-05-23', paidTo: 'Sri Sai Cements', notes: '200 bags UltraTech OPC 53.' },
  { id: 'EXP003', projectId: 'P001', category: 'Transport', amount: 8500, date: '2026-05-22', paidTo: 'Raja Lorry Service', notes: 'Steel delivery charges.' },
  { id: 'EXP004', projectId: 'P002', category: 'Material', amount: 68000, date: '2026-05-20', paidTo: 'Tile World Anna Nagar', notes: 'Vitrified tiles 600 sqft.' },
];

