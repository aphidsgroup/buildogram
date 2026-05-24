import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    // Fetch user hash from db
    const [dbUser] = await sql`SELECT password_hash FROM users WHERE id=${user.id}`;
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare
    const isValid = await bcrypt.compare(oldPassword, dbUser.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect old password' }, { status: 400 });
    }

    // Hash new
    const hash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password_hash=${hash}, updated_at=NOW() WHERE id=${user.id}`;

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (e) {
    console.error('[change-password]', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
