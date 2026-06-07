import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get('channel');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where = {};
    if (channel) where.channel = channel;
    if (status) where.status = status;
    if (category) where.category = category;

    const items = await prisma.content_calendar_items.findMany({
      where,
      orderBy: { planned_date: 'asc' },
      take: limit,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching content calendar items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request) {
  await requirePermission('manage_content');
  try {
    const body = await request.json();
    
    // Auto-generate a slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
    }

    // Handle JSON arrays
    if (body.target_keywords && Array.isArray(body.target_keywords)) {
       // Prisma json works fine with arrays
    } else if (body.target_keywords && typeof body.target_keywords === 'string') {
       body.target_keywords = body.target_keywords.split(',').map(s => s.trim());
    }

    if (body.internal_links && Array.isArray(body.internal_links)) {
      // fine
    } else if (body.internal_links && typeof body.internal_links === 'string') {
      body.internal_links = body.internal_links.split(',').map(s => s.trim());
    }

    // Convert date string if present
    if (body.planned_date) {
      body.planned_date = new Date(body.planned_date);
    }

    const newItem = await prisma.content_calendar_items.create({
      data: body,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating content calendar item:', error);
    return NextResponse.json({ error: 'Failed to create item', details: error.message }, { status: 500 });
  }
}
