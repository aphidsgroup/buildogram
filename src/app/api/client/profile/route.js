import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [user] = await sql`SELECT id, name, email, phone, avatar_url, metadata FROM users WHERE id = ${u.id}`;
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true, profile: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    
    // Explicitly destructure only allowed fields
    const { name, phone, city, alternate_phone } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    // Retrieve existing metadata to safely merge
    const [existing] = await sql`SELECT metadata FROM users WHERE id = ${u.id}`;
    const oldMeta = existing?.metadata || {};

    const newMeta = {
      ...oldMeta,
      city: city || oldMeta.city,
      alternate_phone: alternate_phone || oldMeta.alternate_phone
    };

    const [user] = await sql`
      UPDATE users SET
        name = ${name},
        phone = COALESCE(${phone}, phone),
        metadata = ${JSON.stringify(newMeta)}::jsonb,
        updated_at = NOW()
      WHERE id = ${u.id}
      RETURNING id, name, email, phone, avatar_url, metadata
    `;

    return NextResponse.json({ success: true, profile: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
