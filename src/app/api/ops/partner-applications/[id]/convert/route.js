import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function POST(req, { params }) {
  await requirePermission('manage_partners');
  try {
    const { id } = await params;
    const { verification_status } = await req.json(); // e.g. 'reviewed' or 'verified'
    
    // 1. Fetch application
    const app = await prisma.partner_applications.findUnique({ where: { id } });
    if (!app) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    if (app.status === 'converted') return NextResponse.json({ success: false, error: 'Already converted' }, { status: 400 });

    let slug = generateSlug(app.business_name);
    // Ensure slug is unique
    let exists = await prisma.partners.findUnique({ where: { slug } });
    let counter = 1;
    while (exists) {
      slug = `${generateSlug(app.business_name)}-${counter}`;
      exists = await prisma.partners.findUnique({ where: { slug } });
      counter++;
    }

    // Parse JSON fields safely
    const parseSafe = (str) => {
      try { return JSON.parse(str || '[]'); } catch { return []; }
    };

    // 2. Create partner record
    const partner = await prisma.partners.create({
      data: {
        slug,
        company_name: app.business_name,
        partner_type: app.category.toLowerCase().replace(/\s+/g, '_'), // Rough mapping
        short_description: app.profile_summary,
        contact_person: app.contact_person,
        phone: app.phone,
        email: app.email,
        website: app.website,
        years_experience: app.years_experience,
        service_areas: parseSafe(app.service_areas),
        services: parseSafe(app.services_offered),
        project_types: parseSafe(app.project_types),
        verification_status: verification_status || 'reviewed',
        public_profile_enabled: false, // Must be manually published
        active: false
      }
    });

    // 3. Update application status
    await prisma.partner_applications.update({
      where: { id },
      data: { status: 'converted' }
    });

    // 4. Generate Welcome Pack
    const welcomePack = `Welcome to the Buildogram Partner Ecosystem, ${app.contact_person}!

Your application for ${app.business_name} has been approved and your Partner Profile has been drafted.

NEXT STEPS:
1. Log in to your Partner OS to update your profile details and logo.
2. We will begin routing leads in your service areas (${parseSafe(app.service_areas).join(', ')}).
3. Start uploading Project Proofs and Case Studies to improve your SEO ranking in the directory.

IMPORTANT: Your public profile is currently drafted. Please review it in the Partner OS before we publish it to the live directory.

Welcome aboard,
Buildogram Ops Team`;

    return NextResponse.json({ 
      success: true, 
      data: { partner, welcomePack } 
    });

  } catch (error) {
    console.error('Error converting application:', error);
    return NextResponse.json({ success: false, error: 'Failed to convert' }, { status: 500 });
  }
}
