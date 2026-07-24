import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAdmin, ok } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requireAdmin(request);
  if (error) return error;

  try {
    const stats = {
      users: 0,
      projects: 0,
      materials: 0,
      quotes: 0,
      updates: 0,
      blockers: []
    };

    try {
      const [u] = await sql`SELECT COUNT(*) as c FROM users WHERE email LIKE '%@pilot.buildogram.in'`;
      stats.users = Number(u.c);
      
      const [p] = await sql`SELECT COUNT(*) as c FROM projects WHERE source_type = 'pilot_seed'`;
      stats.projects = Number(p.c);
      
      const [m] = await sql`SELECT COUNT(*) as c FROM material_requests WHERE source_type = 'pilot_seed'`;
      stats.materials = Number(m.c);
      
      const [q] = await sql`SELECT COUNT(*) as c FROM material_quotes WHERE source_type = 'pilot_seed'`;
      stats.quotes = Number(q.c);
      
      const [up] = await sql`SELECT COUNT(*) as c FROM site_updates WHERE source_type = 'pilot_seed'`;
      stats.updates = Number(up.c);

      if (stats.users < 8) stats.blockers.push('Not enough pilot users seeded (Need 8+)');
      if (stats.projects < 2) stats.blockers.push('Pilot projects missing (Need 2+)');
      if (stats.materials < 5) stats.blockers.push('Material requests missing (Need 5+)');

    } catch (e) {
      stats.blockers.push('DB connection failed: ' + e.message);
    }

    return ok({ stats });

  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
