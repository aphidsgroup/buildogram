import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAdmin, ok, fail } from '@/lib/apiAuth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// ── Demo partner seed data ────────────────────────────────────────────────
const DEMO_PARTNERS = [
  {
    slug: 'demo-builder',
    company_name: 'Buildcraft Constructions',
    category: 'Builder',
    short_description: 'Premium residential and villa construction specialists in Chennai with 15+ years of experience.',
    full_description: 'Buildcraft Constructions has been delivering quality homes across Chennai since 2008. We specialize in residential construction, G+1 to G+3 homes, villa construction, and turnkey projects. Our team of engineers, supervisors, and skilled workers ensures every project is completed on time, within budget, and to the highest structural standards.\n\nWe are RERA-registered and work with top material brands like Tata Tiscon, UltraTech Cement, Jaquar, and Havells Electrical.',
    logo_url: 'https://ui-avatars.com/api/?name=Buildcraft&background=FC6E20&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    location: 'Anna Nagar, Chennai',
    service_areas: 'Chennai, Kanchipuram, Chengalpattu',
    years_experience: 15,
    contact_person: 'Ramesh Babu',
    phone: '9876543210',
    email: 'info@buildcraftconstructions.in',
    whatsapp: '+919876543210',
    website: 'https://buildcraftconstructions.in',
    services: ['Residential Construction', 'Villa Construction', 'Turnkey Projects', 'Home Renovation'],
    specializations: ['G+1 to G+3 Homes', 'Earthquake-Resistant Design', 'Vastu-Compliant'],
    certifications: ['RERA Registered', 'CREDAI Member', 'ISO 9001:2015'],
    brands_handled: ['Tata Tiscon', 'UltraTech Cement', 'Havells', 'Jaquar'],
    project_types: ['Residential', 'Villa', 'Commercial', 'Renovation'],
    approval_status: 'Approved',
    active: true,
    featured: true,
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'G+2 Home – Velachery' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', alt: 'Villa – ECR Chennai' },
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', alt: 'Townhouse – Tambaram' },
    ],
    videos: [{ title: 'Villa Construction Timelapse', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', video_type: 'youtube' }],
    portfolio: [
      { title: 'Rajesh Kumar Villa', location: 'Velachery, Chennai', description: '3,200 sqft G+2 villa with modern architecture and Italian marble flooring.', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', completion_year: 2024 },
      { title: 'ECR Weekend Home', location: 'ECR, Chennai', description: '2,800 sqft beach-facing residence with vastu compliance.', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', completion_year: 2023 },
    ],
  },
  {
    slug: 'demo-architect',
    company_name: 'Studio Forma Architects',
    category: 'Architect',
    short_description: 'Award-winning architectural design firm specializing in sustainable modern homes and commercial spaces.',
    full_description: 'Studio Forma Architects is a Chennai-based design studio with a portfolio spanning residential, commercial, and institutional projects. Founded in 2010, the firm has won multiple awards for sustainable architecture.\n\nWe offer complete architectural services from concept design to construction documents, 3D visualization, and project coordination.',
    logo_url: 'https://ui-avatars.com/api/?name=Studio+Forma&background=6366F1&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    location: 'Nungambakkam, Chennai',
    service_areas: 'Chennai, Bengaluru, Hyderabad',
    years_experience: 14,
    contact_person: 'Priya Raghavan',
    phone: '9123456789',
    email: 'hello@studioforma.in',
    whatsapp: '+919123456789',
    website: 'https://studioforma.in',
    services: ['Architectural Design', 'Interior Architecture', '3D Visualization', 'Project Management'],
    specializations: ['Sustainable Architecture', 'Tropical Design', 'Heritage Restoration'],
    certifications: ['Council of Architecture Registered', 'IGBC Green Associate'],
    brands_handled: ['AutoCAD', 'Revit', 'SketchUp', 'V-Ray'],
    project_types: ['Residential', 'Commercial', 'Institutional'],
    approval_status: 'Approved',
    active: true,
    featured: true,
    gallery: [
      { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', alt: 'Modern Villa Design' },
      { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', alt: 'Commercial Building' },
    ],
    videos: [],
    portfolio: [
      { title: 'The Courtyard House', location: 'Boat Club Road, Chennai', description: '4,500 sqft contemporary courtyard home with passive cooling and solar integration.', image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', completion_year: 2024 },
    ],
  },
  {
    slug: 'demo-interior-designer',
    company_name: 'Aura Interior Studio',
    category: 'Interior Designer',
    short_description: 'Luxury interior design studio transforming living spaces with bespoke furniture, lighting, and finishes.',
    full_description: 'Aura Interior Studio brings over 12 years of expertise in creating breathtaking interior spaces for homes, offices, and hospitality venues. Our design philosophy blends contemporary aesthetics with Indian sensibilities.',
    logo_url: 'https://ui-avatars.com/api/?name=Aura+Studio&background=DB2777&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    location: 'Adyar, Chennai',
    service_areas: 'Chennai, Coimbatore, Madurai',
    years_experience: 12,
    contact_person: 'Divya Krishnaswamy',
    phone: '9988776655',
    email: 'studio@auraid.in',
    whatsapp: '+919988776655',
    website: 'https://auraid.in',
    services: ['Residential Interior Design', 'Modular Kitchen', 'False Ceiling', 'Wardrobe Design', 'Office Interiors'],
    specializations: ['Luxury Interiors', 'Scandinavian Design', 'Transitional Style'],
    certifications: ['Interior Design Association Member', 'Godrej Interio Certified'],
    brands_handled: ['Hafele', 'Hettich', 'Merino', 'Greenlam', 'Kohler'],
    project_types: ['Residential', 'Office', 'Retail'],
    approval_status: 'Approved',
    active: true,
    featured: false,
    gallery: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', alt: 'Living Room Design' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', alt: 'Modular Kitchen' },
    ],
    videos: [],
    portfolio: [
      { title: 'OMR Apartment – 3BHK', location: 'OMR, Chennai', description: 'Complete 3BHK transformation with Scandinavian-inspired interiors and modular kitchen.', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', completion_year: 2025 },
    ],
  },
  {
    slug: 'demo-material-supplier',
    company_name: 'BuildMart Direct',
    category: 'Material Supplier',
    short_description: 'Direct-to-site construction material supply at wholesale prices — cement, steel, bricks, tiles, and more.',
    full_description: 'BuildMart Direct is Chennai\'s leading construction material distributor, supplying projects across Tamil Nadu since 2005. We work directly with manufacturers to provide genuine materials at wholesale rates.',
    logo_url: 'https://ui-avatars.com/api/?name=BuildMart&background=D97706&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    location: 'Ambattur, Chennai',
    service_areas: 'Greater Chennai, Kanchipuram, Tiruvallur',
    years_experience: 19,
    contact_person: 'Suresh Kannan',
    phone: '9654321098',
    email: 'sales@buildmartdirect.in',
    whatsapp: '+919654321098',
    website: 'https://buildmartdirect.in',
    services: ['Cement Supply', 'Steel TMT Bars', 'Sand & Aggregate', 'Bricks & Blocks', 'Tiles & Flooring'],
    specializations: ['Bulk Orders', 'Site Delivery', 'Credit Terms', 'Best Rate Guarantee'],
    certifications: ['ISO 9001 Certified', 'UltraTech Authorized Distributor', 'Tata Tiscon Authorized'],
    brands_handled: ['UltraTech Cement', 'Ramco Cement', 'Tata Tiscon', 'Kajaria'],
    project_types: ['Residential', 'Commercial', 'Government'],
    approval_status: 'Approved',
    active: true,
    featured: false,
    gallery: [{ url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', alt: 'Warehouse' }],
    videos: [],
    portfolio: [{ title: 'Supplied Materials for 500+ Projects', location: 'Greater Chennai', description: 'Ongoing supply partner since 2005.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', completion_year: 2025 }],
  },
  {
    slug: 'demo-home-automation',
    company_name: 'SmartLive Systems',
    category: 'Home Automation',
    short_description: 'Next-gen smart home systems for lighting, security, HVAC, and entertainment — fully app-controlled.',
    full_description: 'SmartLive Systems designs and installs comprehensive home automation solutions using best-in-class hardware from Lutron, Legrand, and Hager, paired with our proprietary SmartLive app.',
    logo_url: 'https://ui-avatars.com/api/?name=SmartLive&background=0EA5E9&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80',
    location: 'Velachery, Chennai',
    service_areas: 'Chennai, Coimbatore, Hyderabad',
    years_experience: 8,
    contact_person: 'Akash Menon',
    phone: '9765432109',
    email: 'hello@smartlivesystems.in',
    whatsapp: '+919765432109',
    website: 'https://smartlivesystems.in',
    services: ['Lighting Automation', 'Security & CCTV', 'Smart Locks', 'HVAC Control', 'Voice Control'],
    specializations: ['Luxury Villa Automation', 'App-based Control', 'KNX Systems'],
    certifications: ['Lutron Certified Installer', 'KNX Partner', 'Legrand Certified'],
    brands_handled: ['Lutron', 'Legrand', 'Hager', 'Hikvision', 'Sonos'],
    project_types: ['Residential', 'Villa', 'Hospitality'],
    approval_status: 'Approved',
    active: true,
    featured: true,
    gallery: [{ url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80', alt: 'Smart Living Room' }],
    videos: [{ title: 'SmartLive App Demo', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', video_type: 'youtube' }],
    portfolio: [{ title: 'ECR Beach Villa Automation', location: 'ECR, Chennai', description: '4,200 sqft villa with full lighting automation, biometric locks, 32-camera CCTV.', image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80', completion_year: 2024 }],
  },
  {
    slug: 'demo-solar',
    company_name: 'SunBridge Energy Solutions',
    category: 'Solar',
    short_description: 'MNRE-empanelled solar panel installation for homes and offices — zero-subsidy process, 10-year warranty.',
    full_description: 'SunBridge Energy Solutions is Tamil Nadu\'s fastest-growing solar EPC company, having installed over 800 systems since 2016. We are MNRE-empanelled and Tamil Nadu DISCOM-registered.',
    logo_url: 'https://ui-avatars.com/api/?name=SunBridge&background=F59E0B&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
    location: 'Porur, Chennai',
    service_areas: 'Tamil Nadu, Andhra Pradesh, Karnataka',
    years_experience: 9,
    contact_person: 'Vijay Sundar',
    phone: '9543210987',
    email: 'energy@sunbridgesolar.in',
    whatsapp: '+919543210987',
    website: 'https://sunbridgesolar.in',
    services: ['Rooftop Solar Installation', 'On-Grid Systems', 'Off-Grid Systems', 'Net Metering', 'AMC & Monitoring'],
    specializations: ['Residential Solar', '3kW to 100kW Systems', 'Subsidy Processing'],
    certifications: ['MNRE Empanelled', 'TANGEDCO Registered', 'ISO 9001:2015'],
    brands_handled: ['Waaree Solar Panels', 'Adani Solar', 'SMA Inverters', 'Growatt'],
    project_types: ['Residential', 'Commercial', 'Industrial'],
    approval_status: 'Approved',
    active: true,
    featured: true,
    gallery: [{ url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', alt: 'Solar Installation' }],
    videos: [{ title: 'Solar Installation Process', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', video_type: 'youtube' }],
    portfolio: [{ title: '5kW System – Tambaram', location: 'Tambaram, Chennai', description: '5kW on-grid system saving ₹3,600/month.', image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', completion_year: 2024 }],
  },
  {
    slug: 'demo-elevator',
    company_name: 'ElevoLift India',
    category: 'Elevators',
    short_description: 'Residential and commercial elevator solutions — home lifts, hydraulic lifts, and MRL elevators.',
    full_description: 'ElevoLift India has been designing and installing safe, stylish, and low-maintenance elevators since 2011. All installations are BIS-certified with IS 14665 safety standards.',
    logo_url: 'https://ui-avatars.com/api/?name=ElevoLift&background=64748B&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=1200&q=80',
    location: 'Guindy, Chennai',
    service_areas: 'Chennai, Coimbatore, Trichy, Madurai',
    years_experience: 13,
    contact_person: 'Karthik Shankar',
    phone: '9432109876',
    email: 'sales@elevolift.in',
    whatsapp: '+919432109876',
    website: 'https://elevolift.in',
    services: ['Home Elevator Installation', 'Hydraulic Lifts', 'MRL Traction Elevators', 'Elevator AMC'],
    specializations: ['Residential Home Lifts', 'Panoramic Glass Elevators', 'Low-Pit Solutions'],
    certifications: ['BIS Certified IS 14665', 'CMDA Approved'],
    brands_handled: ['ThyssenKrupp Components', 'KONE Drives', 'Siemens Controls'],
    project_types: ['Residential', 'Commercial', 'Hospital'],
    approval_status: 'Approved',
    active: true,
    featured: false,
    gallery: [{ url: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=600&q=80', alt: 'Panoramic Elevator' }],
    videos: [],
    portfolio: [{ title: 'Panoramic Home Lift – Boat Club', location: 'Boat Club Road, Chennai', description: 'Glass panoramic home lift for 4-floor villa.', image_url: 'https://images.unsplash.com/photo-1517638851339-a711e8b015c3?w=600&q=80', completion_year: 2024 }],
  },
  {
    slug: 'demo-waterproofing',
    company_name: 'AquaShield Waterproofing',
    category: 'Waterproofing',
    short_description: '100% leak-proof waterproofing for terraces, basements, bathrooms — 10-year warranty.',
    full_description: 'AquaShield Waterproofing has protected over 1,200 structures across Tamil Nadu since 2009 using chemical waterproofing systems from Dr. Fixit, BASF MasterSeal, and Sika.',
    logo_url: 'https://ui-avatars.com/api/?name=AquaShield&background=0891B2&color=fff&size=128&bold=true',
    cover_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    location: 'Poonamallee, Chennai',
    service_areas: 'Tamil Nadu, Puducherry',
    years_experience: 16,
    contact_person: 'Murugan Selvam',
    phone: '9321098765',
    email: 'protect@aquashieldindia.in',
    whatsapp: '+919321098765',
    website: 'https://aquashieldindia.in',
    services: ['Terrace Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing', 'Injection Grouting'],
    specializations: ['Crystalline Waterproofing', 'Polyurea Coatings', 'Expansion Joint Treatment'],
    certifications: ['Dr. Fixit Certified Applicator', 'Sika Certified Partner', 'BASF MasterSeal Approved'],
    brands_handled: ['Dr. Fixit', 'Sika', 'BASF MasterSeal', 'Fosroc'],
    project_types: ['Residential', 'Commercial', 'Industrial'],
    approval_status: 'Approved',
    active: true,
    featured: false,
    gallery: [{ url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', alt: 'Terrace Waterproofing' }],
    videos: [],
    portfolio: [{ title: 'Terrace Waterproofing – 8000 sqft', location: 'Anna Nagar, Chennai', description: 'Complete terrace waterproofing for 16-unit apartment complex.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', completion_year: 2024 }],
  },
];

export async function GET(request) {
  const { user, error } = requireAdmin(request);
  if (error) return error;

  try {
    const passwordHash = await bcrypt.hash('Demo@2026', 10);
    const results = [];

    for (const p of DEMO_PARTNERS) {
      // Upsert partner (insert or skip if slug exists)
      const existing = await sql`SELECT id FROM partners WHERE slug = ${p.slug}`;
      let partnerId;

      if (existing.length > 0) {
        partnerId = existing[0].id;
        results.push({ slug: p.slug, action: 'skipped (already exists)', id: partnerId });
      } else {
        const [inserted] = await sql`
          INSERT INTO partners (
            slug, company_name, category, short_description, full_description,
            logo_url, cover_url, location, service_areas, years_experience,
            contact_person, phone, email, whatsapp, website,
            services, specializations, certifications, brands_handled, project_types,
            approval_status, active, featured
          ) VALUES (
            ${p.slug}, ${p.company_name}, ${p.category},
            ${p.short_description}, ${p.full_description},
            ${p.logo_url}, ${p.cover_url}, ${p.location}, ${p.service_areas},
            ${p.years_experience}, ${p.contact_person}, ${p.phone}, ${p.email},
            ${p.whatsapp}, ${p.website},
            ${p.services}, ${p.specializations}, ${p.certifications},
            ${p.brands_handled}, ${p.project_types},
            ${p.approval_status}, ${p.active}, ${p.featured}
          )
          RETURNING id
        `;
        partnerId = inserted.id;

        // Gallery
        for (const img of p.gallery) {
          await sql`INSERT INTO partner_gallery (partner_id, url, alt) VALUES (${partnerId}, ${img.url}, ${img.alt})`;
        }
        // Videos
        for (const vid of p.videos) {
          await sql`INSERT INTO partner_videos (partner_id, title, url, video_type) VALUES (${partnerId}, ${vid.title}, ${vid.url}, ${vid.video_type})`;
        }
        // Portfolio
        for (const proj of p.portfolio) {
          await sql`INSERT INTO partner_portfolio (partner_id, title, location, description, image_url, completion_year) VALUES (${partnerId}, ${proj.title}, ${proj.location}, ${proj.description}, ${proj.image_url}, ${proj.completion_year})`;
        }

        results.push({ slug: p.slug, action: 'inserted', id: partnerId });
      }

      // Create partner user (email: slug@buildogram.in)
      const partnerEmail = `${p.slug}@buildogram.in`;
      const existingUser = await sql`SELECT id FROM users WHERE email = ${partnerEmail}`;
      if (existingUser.length === 0) {
        await sql`
          INSERT INTO users (name, email, password_hash, role, partner_id, is_active)
          VALUES (${p.contact_person}, ${partnerEmail}, ${passwordHash}, 'partner', ${partnerId}, true)
        `;
        results.push({ user: partnerEmail, action: 'user created' });
      } else {
        // Update partner_id link if missing
        await sql`UPDATE users SET partner_id = ${partnerId} WHERE email = ${partnerEmail}`;
        results.push({ user: partnerEmail, action: 'user already exists — partner_id updated' });
      }
    }

    // Seed ops admin if not exists
    const adminEmail = 'admin@buildogram.in';
    const adminExists = await sql`SELECT id FROM users WHERE email = ${adminEmail}`;
    if (adminExists.length === 0) {
      await sql`INSERT INTO users (name, email, password_hash, role, is_active) VALUES ('Buildogram Admin', ${adminEmail}, ${passwordHash}, 'ops_admin', true)`;
      results.push({ user: adminEmail, action: 'admin user created' });
    } else {
      results.push({ user: adminEmail, action: 'admin already exists' });
    }

    return ok({
      message: 'Seed complete!',
      note: 'Demo password for all accounts: Demo@2026',
      results,
      partnerLogins: DEMO_PARTNERS.map(p => ({ email: `${p.slug}@buildogram.in`, password: 'Demo@2026', company: p.company_name })),
      adminLogin: { email: adminEmail, password: 'Demo@2026' },
    });

  } catch (e) {
    console.error('[seed-partners]', e);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
