import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const caseStudy = await prisma.case_studies.findUnique({
      where: { id }
    });

    if (!caseStudy) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, caseStudy });
  } catch (error) {
    console.error('[Case Studies GET by ID Error]:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const data = await req.json();

    const updatedCaseStudy = await prisma.case_studies.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      }
    });

    return NextResponse.json({ success: true, caseStudy: updatedCaseStudy });
  } catch (error) {
    console.error('[Case Studies PATCH Error]:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    await prisma.case_studies.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Case Studies DELETE Error]:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
