import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const item = await prisma.content_calendar_items.findUnique({
      where: { id: (await params).id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching content calendar item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await requirePermission('manage_content');
  try {
    const body = await request.json();
    
    if (body.target_keywords && Array.isArray(body.target_keywords)) {
       // ok
    } else if (body.target_keywords && typeof body.target_keywords === 'string') {
       body.target_keywords = body.target_keywords.split(',').map(s => s.trim());
    }

    if (body.internal_links && Array.isArray(body.internal_links)) {
      // ok
    } else if (body.internal_links && typeof body.internal_links === 'string') {
      body.internal_links = body.internal_links.split(',').map(s => s.trim());
    }

    if (body.planned_date) {
      body.planned_date = new Date(body.planned_date);
    }
    
    // Prevent updating id
    delete body.id;
    delete body.created_at;

    const updatedItem = await prisma.content_calendar_items.update({
      where: { id: (await params).id },
      data: {
        ...body,
        updated_at: new Date()
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating content calendar item:', error);
    return NextResponse.json({ error: 'Failed to update item', details: 'Request failed' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await requirePermission('manage_content');
  try {
    await prisma.content_calendar_items.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content calendar item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
