import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { checkRateLimit } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const rateLimit = checkRateLimit(request, { namespace: 'reset-password', limit: 10, windowMs: 15 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } },
    );
  }

  try {
    const { token, newPassword } = await request.json();
    if (!token || !newPassword) {
      return NextResponse.json({ success: false, message: 'Token and new password required' }, { status: 400 });
    }
    if (newPassword.length < 12) {
      return NextResponse.json({ success: false, message: 'Password must be at least 12 characters' }, { status: 400 });
    }

    const tokenHash = crypto.createHash('sha256').update(String(token)).digest('hex');
    const [reset] = await sql`
      SELECT r.id, r.user_id
      FROM password_resets r
      JOIN users u ON r.user_id = u.id
      WHERE r.token = ${tokenHash} AND r.used = false AND r.expires_at > NOW() AND u.is_active = true
      LIMIT 1
    `;
    if (!reset) {
      return NextResponse.json({ success: false, message: 'Invalid or expired reset token' }, { status: 400 });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await sql.begin(async (transaction) => {
      await transaction`
        UPDATE users SET password_hash = ${hash}, must_change_password = false, updated_at = NOW()
        WHERE id = ${reset.user_id}
      `;
      await transaction`UPDATE password_resets SET used = true WHERE user_id = ${reset.user_id}`;
    });

    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('[Reset Password]', error?.name || 'unknown_error');
    return NextResponse.json({ success: false, message: 'Failed to reset password' }, { status: 500 });
  }
}
