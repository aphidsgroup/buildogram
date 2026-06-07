import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Prevent Prisma from exhausting connection limits in dev
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req) {
  try {
    const data = await req.json();

    const newApp = await prisma.partner_applications.create({
      data: {
        business_name: data.business_name,
        contact_person: data.contact_person,
        phone: data.phone,
        email: data.email,
        category: data.category,
        service_areas: JSON.stringify(data.service_areas || []),
        years_experience: data.years_experience ? parseInt(data.years_experience) : null,
        services_offered: JSON.stringify(data.services_offered || []),
        project_types: JSON.stringify(data.project_types || []),
        website: data.website || null,
        gst_number: data.gst_number || null,
        registration_number: data.registration_number || null,
        license_number: data.license_number || null,
        portfolio_links: JSON.stringify(data.portfolio_links || []),
        profile_summary: data.profile_summary || null,
        consent_given: data.consent_given === true,
        status: 'new'
      }
    });

    return NextResponse.json({ success: true, data: newApp });
  } catch (error) {
    console.error('Error submitting partner application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application.' },
      { status: 500 }
    );
  }
}
