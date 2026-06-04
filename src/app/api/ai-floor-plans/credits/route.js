import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/apiAuth';
import { getCreditBalance } from '@/lib/ai-floor-plan/credits';

export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const balance = await getCreditBalance(auth.user.id, auth.user.partner_id);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Credit API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
