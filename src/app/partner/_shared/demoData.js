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
