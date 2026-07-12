import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  
  const { id: propertyId } = await params;

  try {
    // Check access
    const [property] = await sql`SELECT owner_user_id FROM properties WHERE id = ${propertyId}`;
    if (!property) return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });

    const isOps = ['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role);
    const isOwner = property.owner_user_id === u.id;

    if (!isOps && !isOwner) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    let documents;
    if (isOps) {
      documents = await sql`
        SELECT * FROM passport_documents
        WHERE property_id = ${propertyId}
        ORDER BY created_at DESC
      `;
    } else {
      documents = await sql`
        SELECT * FROM passport_documents
        WHERE property_id = ${propertyId} AND visibility = 'client_visible'
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json({ success: true, documents });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  
  const { id: propertyId } = await params;

  try {
    const b = await req.json();
    if (!b.section_key || !b.file_name || !b.file_url) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [doc] = await sql`
      INSERT INTO passport_documents (
        property_id, section_key, file_name, file_url, file_type, file_size, visibility, uploaded_by
      ) VALUES (
        ${propertyId}, ${b.section_key}, ${b.file_name}, ${b.file_url}, 
        ${b.file_type || null}, ${b.file_size || null}, ${b.visibility || 'ops_only'}, ${u.id}
      )
      RETURNING *
    `;

    // Auto-update the boolean flag to true since a document was uploaded
    await sql`
      UPDATE properties SET
        ${sql(b.section_key)} = true,
        updated_at = NOW()
      WHERE id = ${propertyId}
    `;

    return NextResponse.json({ success: true, document: doc });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
