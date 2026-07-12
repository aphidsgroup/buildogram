import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/apiAuth';
import { prisma as db } from '@/lib/storageProvider';
import { getCreditBalance } from '@/lib/ai-floor-plan/credits';

export async function GET(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;

    const balance = await getCreditBalance(user.id, user.partner_id);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Credit API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
