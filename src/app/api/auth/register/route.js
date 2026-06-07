import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  return NextResponse.json(
    { error: 'Public registration is disabled. Accounts are created by Buildogram administrators.' },
    { status: 403 }
  );
}
