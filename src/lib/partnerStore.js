// /src/lib/partnerStore.js
// Shared partner data utility — client-side only (localStorage + demo fallback)
// Used by: Public Directory, Public Profile, Ops Admin, Partner OS Profile

export const PARTNER_CATEGORIES = [
  'Builder', 'Architect', 'Interior Designer', 'Material Supplier',
  'Home Automation', 'Solar', 'Elevators', 'Waterproofing',
];

export const APPROVAL_STATUSES = ['pending_review', 'verified', 'rejected', 'suspended'];

// ─── Full Demo Partner Dataset ─────────────────────────────────────────────
export const DEMO_PARTNERS_FULL = [
  {
    id: 'P-001',
    slug: 'demo-builder',
    companyName: 'Buildcraft Constructions',
    category: 'Builder',
    shortDescription: 'Premium residential and villa construction specialists in Chennai with 15+ years of experience.',
    fullDescription: `Buildcraft Constructions has been delivering quality homes across Chennai since 2008. We specialize in residential construction, G+1 to G+3 homes, villa construction, and turnkey projects. Our team of engineers, supervisors, and skilled workers ensures every project is completed on time, within budget, and to the highest structural standards.\n\nWe are RERA-registered and work with top material brands like Tata Tiscon, UltraTech Cement, Jaquar, and Havells Electrical.`,
    logoUrl: 'https://ui-avatars.com/api/?name=Buildcraft&background=FC6E20&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    location: 'Anna Nagar, Chennai',
    serviceAreas: 'Chennai, Kanchipuram, Chengalpattu',
    yearsExperience: 15,
    contactPerson: 'Ramesh Babu',
    phone: '9876543210',
    email: 'info@buildcraftconstructions.in',
    whatsapp: '+919876543210',
    website: 'https://buildogram.in/partners/demo-builder',
    services: ['Residential Construction', 'Villa Construction', 'Turnkey Projects', 'Home Renovation', 'Commercial Buildings'],
    specializations: ['G+1 to G+3 Homes', 'Earthquake-Resistant Design', 'Vastu-Compliant Construction'],
    projectTypes: ['Residential', 'Villa', 'Commercial', 'Renovation'],
    certifications: ['RERA Registered', 'CREDAI Member', 'ISO 9001:2015'],
    brands: ['Tata Tiscon', 'UltraTech Cement', 'Havells', 'Jaquar', 'Asian Paints'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'G+2 Home – Velachery' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', alt: 'Villa – ECR Chennai' },
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', alt: 'Townhouse – Tambaram' },
      { url: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=80', alt: 'Site Progress' },
    ],
    videoGallery: [
      { title: 'Villa Construction Timelapse', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', type: 'youtube' },
      { title: 'Site Walkthrough – Velachery Project', url: 'https://youtu.be/example', type: 'youtube' },
    ],
    portfolio: [
      { title: 'Rajesh Kumar Villa', location: 'Velachery, Chennai', description: '3,200 sqft G+2 villa with modern architecture, Italian marble flooring, and smart home integration.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', completionYear: 2024 },
      { title: 'ECR Weekend Home', location: 'ECR, Chennai', description: '2,800 sqft beach-facing residence with vastu compliance and sustainable construction practices.', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', completionYear: 2023 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15',
    updatedAt: '2026-05-01',
  },
  {
    id: 'P-002',
    slug: 'demo-architect',
    companyName: 'Studio Forma Architects',
    category: 'Architect',
    shortDescription: 'Award-winning architectural design firm specializing in sustainable modern homes and commercial spaces.',
    fullDescription: `Studio Forma Architects is a Chennai-based design studio with a portfolio spanning residential, commercial, and institutional projects. Founded in 2010, the firm has won multiple awards for sustainable architecture and innovative design.\n\nWe offer complete architectural services from concept design to construction documents, 3D visualization, and project coordination. Our designs balance aesthetics, functionality, vastu principles, and sustainability.`,
    logoUrl: 'https://ui-avatars.com/api/?name=Studio+Forma&background=6366F1&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    location: 'Nungambakkam, Chennai',
    serviceAreas: 'Chennai, Bengaluru, Hyderabad',
    yearsExperience: 14,
    contactPerson: 'Priya Raghavan',
    phone: '9123456789',
    email: 'hello@studioforma.in',
    whatsapp: '+919123456789',
    website: 'https://buildogram.in/partners/demo-architect',
    services: ['Architectural Design', 'Interior Architecture', '3D Visualization', 'Project Management', 'Vastu Consultation'],
    specializations: ['Sustainable Architecture', 'Tropical Design', 'Heritage Restoration'],
    projectTypes: ['Residential', 'Commercial', 'Institutional', 'Mixed Use'],
    certifications: ['Council of Architecture Registered', 'IGBC Green Associate', 'GRIHA Evaluator'],
    brands: ['AutoCAD', 'Revit', 'SketchUp', 'V-Ray'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', alt: 'Modern Villa Design' },
      { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', alt: 'Commercial Building' },
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', alt: 'Interior Architecture' },
    ],
    videoGallery: [
      { title: 'Portfolio Showcase 2024', url: 'https://youtu.be/example2', type: 'youtube' },
    ],
    portfolio: [
      { title: 'The Courtyard House', location: 'Boat Club Road, Chennai', description: 'A 4,500 sqft contemporary courtyard home with passive cooling, solar integration, and a central water garden.', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', completionYear: 2024 },
      { title: 'Nungambakkam Office Complex', location: 'Nungambakkam, Chennai', description: '12,000 sqft commercial campus with naturally ventilated workspaces and IGBC Gold rating.', imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', completionYear: 2023 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-02-01',
    updatedAt: '2026-05-02',
  },
  {
    id: 'P-003',
    slug: 'demo-interior-designer',
    companyName: 'Aura Interior Studio',
    category: 'Interior Designer',
    shortDescription: 'Luxury interior design studio transforming living spaces with bespoke furniture, lighting, and finishes.',
    fullDescription: `Aura Interior Studio brings over 12 years of expertise in creating breathtaking interior spaces for homes, offices, and hospitality venues across Chennai. Our design philosophy blends contemporary aesthetics with Indian sensibilities to create spaces that are both beautiful and functional.\n\nWe handle everything from initial concept to final handover — including modular kitchens, custom wardrobes, false ceilings, lighting design, soft furnishings, and project management.`,
    logoUrl: 'https://ui-avatars.com/api/?name=Aura+Studio&background=DB2777&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    location: 'Adyar, Chennai',
    serviceAreas: 'Chennai, Coimbatore, Madurai',
    yearsExperience: 12,
    contactPerson: 'Divya Krishnaswamy',
    phone: '9988776655',
    email: 'studio@auraid.in',
    whatsapp: '+919988776655',
    website: 'https://buildogram.in/partners/demo-interior-designer',
    services: ['Residential Interior Design', 'Modular Kitchen', 'False Ceiling', 'Wardrobe Design', 'Office Interiors', 'Lighting Design'],
    specializations: ['Luxury Interiors', 'Scandinavian Design', 'Transitional Style', 'Budget-Friendly Makeovers'],
    projectTypes: ['Residential', 'Office', 'Retail', 'Hospitality'],
    certifications: ['Interior Design Association Member', 'Godrej Interio Certified', 'Hettich Certified Installer'],
    brands: ['Hafele', 'Hettich', 'Merino', 'Greenlam', 'Kohler', 'Crompton'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', alt: 'Living Room Design' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', alt: 'Modular Kitchen' },
      { url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80', alt: 'Master Bedroom' },
      { url: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=600&q=80', alt: 'Kids Room' },
    ],
    videoGallery: [
      { title: 'Apartment Makeover – OMR', url: 'https://youtu.be/example3', type: 'youtube' },
    ],
    portfolio: [
      { title: 'OMR Apartment – 3BHK', location: 'OMR, Chennai', description: 'Complete 3BHK transformation with Scandinavian-inspired interiors, modular kitchen, and custom wardrobes in oak finish.', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', completionYear: 2025 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-03-10',
    updatedAt: '2026-05-03',
  },
  {
    id: 'P-004',
    slug: 'demo-material-supplier',
    companyName: 'BuildMart Direct',
    category: 'Material Supplier',
    shortDescription: 'Direct-to-site construction material supply at wholesale prices — cement, steel, bricks, tiles, and more.',
    fullDescription: `BuildMart Direct is Chennai's leading construction material distributor, supplying projects across Tamil Nadu since 2005. We work directly with manufacturers like UltraTech, Tata Tiscon, Ramco, and Cera to provide genuine materials at wholesale rates.\n\nOur fleet of 20+ delivery vehicles ensures timely delivery to your construction site. We offer credit terms for verified contractors and builders.`,
    logoUrl: 'https://ui-avatars.com/api/?name=BuildMart&background=D97706&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    location: 'Ambattur, Chennai',
    serviceAreas: 'Greater Chennai, Kanchipuram, Tiruvallur',
    yearsExperience: 19,
    contactPerson: 'Suresh Kannan',
    phone: '9654321098',
    email: 'sales@buildmartdirect.in',
    whatsapp: '+919654321098',
    website: 'https://buildogram.in/partners/demo-material-supplier',
    services: ['Cement Supply', 'Steel (TMT Bars)', 'Sand & Aggregate', 'Bricks & Blocks', 'Tiles & Flooring', 'Plumbing Materials', 'Electrical Materials'],
    specializations: ['Bulk Orders', 'Site Delivery', 'Credit Terms', 'Best Rate Guarantee'],
    projectTypes: ['Residential', 'Commercial', 'Government Projects', 'Large Scale'],
    certifications: ['ISO 9001 Certified Dealer', 'UltraTech Authorized Distributor', 'Tata Tiscon Authorized Dealer'],
    brands: ['UltraTech Cement', 'Ramco Cement', 'Tata Tiscon', 'Vizag Steel', 'Cera', 'Jaquar', 'Kajaria'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', alt: 'Warehouse' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Material Stock' },
    ],
    videoGallery: [],
    portfolio: [
      { title: 'Supplied Materials for 500+ Projects', location: 'Greater Chennai', description: 'Ongoing material supply partner for residential and commercial construction projects across Chennai since 2005.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', completionYear: 2025 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-04-01',
    updatedAt: '2026-05-04',
  },
  {
    id: 'P-005',
    slug: 'demo-home-automation',
    companyName: 'SmartLive Systems',
    category: 'Home Automation',
    shortDescription: 'Next-gen smart home systems for lighting, security, HVAC, and entertainment — fully app-controlled.',
    fullDescription: `SmartLive Systems designs and installs comprehensive home automation solutions that transform ordinary homes into intelligent living spaces. We use best-in-class hardware from Lutron, Legrand, and Hager, paired with our proprietary SmartLive app.\n\nFrom single-room setups to whole-home automation, we handle design, installation, programming, and 24/7 AMC support.`,
    logoUrl: 'https://ui-avatars.com/api/?name=SmartLive&background=0EA5E9&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80',
    location: 'Velachery, Chennai',
    serviceAreas: 'Chennai, Coimbatore, Hyderabad',
    yearsExperience: 8,
    contactPerson: 'Akash Menon',
    phone: '9765432109',
    email: 'hello@smartlivesystems.in',
    whatsapp: '+919765432109',
    website: 'https://buildogram.in/partners/demo-home-automation',
    services: ['Lighting Automation', 'Security & CCTV', 'Smart Locks', 'HVAC Control', 'Home Theatre', 'Voice Control (Alexa/Google)', 'Energy Monitoring'],
    specializations: ['Luxury Villa Automation', 'App-based Control', 'KNX Systems', 'Retrofit Solutions'],
    projectTypes: ['Residential', 'Villa', 'Hospitality', 'Commercial'],
    certifications: ['Lutron Certified Installer', 'KNX Partner', 'Legrand Certified'],
    brands: ['Lutron', 'Legrand', 'Hager', 'Hikvision', 'Sonos', 'Honeywell'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80', alt: 'Smart Living Room' },
      { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80', alt: 'Control Panel' },
    ],
    videoGallery: [
      { title: 'SmartLive App Demo', url: 'https://youtu.be/example5', type: 'youtube' },
    ],
    portfolio: [
      { title: 'ECR Beach Villa Automation', location: 'ECR, Chennai', description: '4,200 sqft villa with full lighting automation, biometric locks, 32-camera CCTV, home theatre, and smart HVAC.', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80', completionYear: 2024 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-05-01',
    updatedAt: '2026-05-05',
  },
  {
    id: 'P-006',
    slug: 'demo-solar',
    companyName: 'SunBridge Energy Solutions',
    category: 'Solar',
    shortDescription: 'MNRE-empanelled solar panel installation for homes and offices — zero-subsidy process, 10-year warranty.',
    fullDescription: `SunBridge Energy Solutions is Tamil Nadu's fastest-growing solar EPC company, having installed over 800 systems since 2016. We are MNRE-empanelled and Tamil Nadu DISCOM-registered, enabling hassle-free net metering and subsidy processing.\n\nWe use only Tier-1 solar panels (Waaree, Adani, REC) and inverters (SMA, Growatt, Fronius) to ensure maximum power generation and durability.`,
    logoUrl: 'https://ui-avatars.com/api/?name=SunBridge&background=F59E0B&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
    location: 'Porur, Chennai',
    serviceAreas: 'Tamil Nadu, Andhra Pradesh, Karnataka',
    yearsExperience: 9,
    contactPerson: 'Vijay Sundar',
    phone: '9543210987',
    email: 'energy@sunbridgesolar.in',
    whatsapp: '+919543210987',
    website: 'https://buildogram.in/partners/demo-solar',
    services: ['Rooftop Solar Installation', 'On-Grid Systems', 'Off-Grid Systems', 'Hybrid Systems', 'Net Metering', 'MNRE Subsidy Processing', 'AMC & Monitoring'],
    specializations: ['Residential Solar', '3kW to 100kW Systems', 'Subsidy Processing', 'IoT Monitoring'],
    projectTypes: ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
    certifications: ['MNRE Empanelled', 'TANGEDCO Registered', 'ISO 9001:2015', 'BIS Certified Products'],
    brands: ['Waaree Solar Panels', 'Adani Solar', 'SMA Inverters', 'Growatt', 'Luminous'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', alt: 'Solar Installation' },
      { url: 'https://images.unsplash.com/photo-1545209463-4caa87dfc5f5?w=600&q=80', alt: '10kW Rooftop System' },
    ],
    videoGallery: [
      { title: 'Solar Installation Process', url: 'https://youtu.be/example6', type: 'youtube' },
    ],
    portfolio: [
      { title: '5kW Residential System – Tambaram', location: 'Tambaram, Chennai', description: '5kW on-grid solar system generating 600 units/month, saving ₹3,600/month on electricity bills.', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', completionYear: 2024 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-06-01',
    updatedAt: '2026-05-06',
  },
  {
    id: 'P-007',
    slug: 'demo-elevator',
    companyName: 'ElevoLift India',
    category: 'Elevators',
    shortDescription: 'Residential and commercial elevator solutions — home lifts, hydraulic lifts, and MRL elevators for 2 to 20 floors.',
    fullDescription: `ElevoLift India has been designing and installing safe, stylish, and low-maintenance elevators since 2011. We specialize in residential home lifts, hydraulic elevators for G+3 buildings, and machine-room-less (MRL) traction lifts for commercial buildings.\n\nAll our installations are BIS-certified and comply with IS 14665 safety standards. We offer 2-year comprehensive warranty and 24/7 breakdown support.`,
    logoUrl: 'https://ui-avatars.com/api/?name=ElevoLift&background=64748B&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=1200&q=80',
    location: 'Guindy, Chennai',
    serviceAreas: 'Chennai, Coimbatore, Trichy, Madurai',
    yearsExperience: 13,
    contactPerson: 'Karthik Shankar',
    phone: '9432109876',
    email: 'sales@evelolift.in',
    whatsapp: '+919432109876',
    website: 'https://buildogram.in/partners/demo-elevator',
    services: ['Home Elevator Installation', 'Hydraulic Lifts', 'MRL Traction Elevators', 'Dumbwaiters', 'Elevator AMC', 'Modernization'],
    specializations: ['Residential Home Lifts', 'Panoramic Glass Elevators', 'Low-Pit Solutions', 'Heritage Building Lifts'],
    projectTypes: ['Residential', 'Commercial', 'Hospital', 'Hotel'],
    certifications: ['BIS Certified (IS 14665)', 'CMDA Approved', 'TÜV SÜD Inspected'],
    brands: ['ThyssenKrupp Components', 'KONE Drives', 'Siemens Controls', 'Wittur Safety Gear'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=600&q=80', alt: 'Panoramic Elevator' },
      { url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80', alt: 'Home Lift' },
    ],
    videoGallery: [],
    portfolio: [
      { title: 'Panoramic Home Lift – Boat Club', location: 'Boat Club Road, Chennai', description: 'Glass panoramic home lift for a 4-floor villa with stainless steel finishes and automatic rescue device.', imageUrl: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=600&q=80', completionYear: 2024 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-07-01',
    updatedAt: '2026-05-07',
  },
  {
    id: 'P-008',
    slug: 'demo-waterproofing',
    companyName: 'AquaShield Waterproofing',
    category: 'Waterproofing',
    shortDescription: '100% leak-proof waterproofing for terraces, basements, bathrooms, and foundations — 10-year warranty.',
    fullDescription: `AquaShield Waterproofing has protected over 1,200 structures across Tamil Nadu since 2009 using the latest chemical waterproofing systems from Dr. Fixit, BASF MasterSeal, and Sika.\n\nWe specialize in terrace waterproofing, basement tanking, swimming pool lining, expansion joint treatments, and injection grouting for existing leakage. All works come with a performance-backed 10-year warranty and free post-installation inspections for the first 2 years.`,
    logoUrl: 'https://ui-avatars.com/api/?name=AquaShield&background=0891B2&color=fff&size=128&bold=true',
    coverUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    location: 'Poonamallee, Chennai',
    serviceAreas: 'Tamil Nadu, Puducherry',
    yearsExperience: 16,
    contactPerson: 'Murugan Selvam',
    phone: '9321098765',
    email: 'protect@aquashieldindia.in',
    whatsapp: '+919321098765',
    website: 'https://buildogram.in/partners/demo-waterproofing',
    services: ['Terrace Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing', 'Swimming Pool Waterproofing', 'Injection Grouting', 'Foundation Waterproofing', 'Water Tank Treatment'],
    specializations: ['Crystalline Waterproofing', 'Polyurea Coatings', 'Expansion Joint Treatment', 'Leakage Diagnosis'],
    projectTypes: ['Residential', 'Commercial', 'Industrial', 'Heritage Structures'],
    certifications: ['Dr. Fixit Certified Applicator', 'Sika Certified Partner', 'BASF MasterSeal Approved'],
    brands: ['Dr. Fixit', 'Sika', 'BASF MasterSeal', 'Fosroc', 'Ardex Endura'],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', alt: 'Terrace Waterproofing' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Basement Treatment' },
    ],
    videoGallery: [
      { title: 'Terrace Waterproofing Process', url: 'https://youtu.be/example8', type: 'youtube' },
    ],
    portfolio: [
      { title: 'Terrace Waterproofing – 8000 sqft Apartment', location: 'Anna Nagar, Chennai', description: 'Complete terrace waterproofing with Dr. Fixit Newcoat system for 16-unit apartment complex with 12-year warranty.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', completionYear: 2024 },
    ],
    approvalStatus: 'Approved',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-08-01',
    updatedAt: '2026-05-08',
  },
];

const STORAGE_KEY = 'bos_all_partners';

// ─── CRUD helpers (client-side only) ──────────────────────────────────────

export function getPartners() {
  if (typeof window === 'undefined') return DEMO_PARTNERS_FULL;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEMO_PARTNERS_FULL;
}

export function getApprovedPartners() {
  return getPartners().filter(p => p.approvalStatus === 'Approved' && p.isActive);
}

export function getPartnerBySlug(slug) {
  return getPartners().find(p => p.slug === slug) || null;
}

export function saveAllPartners(arr) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function updatePartner(slug, data) {
  const all = getPartners();
  const updated = all.map(p => p.slug === slug ? { ...p, ...data, updatedAt: new Date().toISOString().slice(0, 10) } : p);
  saveAllPartners(updated);
  return updated.find(p => p.slug === slug);
}

export function addPartner(partner) {
  const all = getPartners();
  const newPartner = {
    ...partner,
    id: 'P-' + Date.now().toString().slice(-4),
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  saveAllPartners([...all, newPartner]);
  return newPartner;
}

export function deletePartner(slug) {
  const all = getPartners();
  saveAllPartners(all.filter(p => p.slug !== slug));
}

export function calcProfileCompletion(p) {
  const requirements = [
    { key: 'companyName', weight: 8, label: 'Company Name' },
    { key: 'category', weight: 8, label: 'Category' },
    { key: 'logoUrl', weight: 8, label: 'Logo' },
    { key: 'coverUrl', weight: 8, label: 'Cover Image' },
    { key: 'shortDescription', weight: 4, label: 'Short Description' },
    { key: 'fullDescription', weight: 4, label: 'Full Description' },
    { key: 'location', weight: 5, label: 'Location' },
    { key: 'serviceAreas', weight: 5, label: 'Service Areas' },
    { key: 'phone', weight: 5, label: 'Phone Number' },
    { key: 'email', weight: 5, label: 'Email Address' },
    { key: 'whatsapp', weight: 5, label: 'WhatsApp Number' },
    { key: 'services', weight: 10, label: 'Services List' },
    { key: 'galleryImages', weight: 10, label: 'Gallery Images' },
    { key: 'portfolio', weight: 5, label: 'Portfolio Projects' },
    { key: 'certifications', weight: 5, label: 'Certifications' },
    { key: 'brands', weight: 5, label: 'Brands Used' }
  ];

  let score = 0;
  const missing = [];

  requirements.forEach(req => {
    const v = p[req.key];
    const isFilled = v && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== '');
    if (isFilled) {
      score += req.weight;
    } else {
      missing.push(req.label);
    }
  });

  // Ensure max score is 100
  score = Math.min(100, score);

  let suggestions = '';
  if (missing.length > 0) {
    const topMissing = missing.slice(0, 2).join(' and ');
    suggestions = `Your profile is ${score}% complete. Add ${topMissing} to improve visibility.`;
  } else {
    suggestions = 'Your profile is 100% complete! Great job.';
  }

  // To remain backwards compatible with parts of the app expecting just a number,
  // we attach the extra data to a Number object or we just return an object.
  // We'll return an object. Places using this might need updates.
  return { score, missing, suggestions };
}
