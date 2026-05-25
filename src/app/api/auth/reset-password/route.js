import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();
    if (!token || !newPassword) {
      return NextResponse.json({ success: false, message: 'Token and new password required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Find valid token
    const [reset] = await sql`
      SELECT r.id, r.user_id, r.expires_at, u.email 
      FROM password_resets r
      JOIN users u ON r.user_id = u.id
      WHERE r.token = ${token} AND r.used = false AND r.expires_at > NOW()
      LIMIT 1
    `;

    if (!reset) {
      return NextResponse.json({ success: false, message: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 10);

    // Update password and mark token as used
    await sql.begin(async (sql) => {
      await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${reset.user_id}`;
      await sql`UPDATE password_resets SET used = true WHERE id = ${reset.id}`;
    });

    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (e) {
    console.error('[Reset Password]', e.message);
    return NextResponse.json({ success: false, message: 'Failed to reset password' }, { status: 500 });
  }
}
