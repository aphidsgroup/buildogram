import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  try {
    const configs = await sql`SELECT * FROM cost_config ORDER BY city, spec_level`;
    return NextResponse.json({ configs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== 'ops_admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    
    const { id, rate_per_sqft_min, rate_per_sqft_max } = await req.json();
    const config = await sql`
      UPDATE cost_config 
      SET rate_per_sqft_min = ${rate_per_sqft_min}, rate_per_sqft_max = ${rate_per_sqft_max}, updated_at = NOW()
      WHERE id = ${id} RETURNING *
    `;
    return NextResponse.json({ config: config[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
