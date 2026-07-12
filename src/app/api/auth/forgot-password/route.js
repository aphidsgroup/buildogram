import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import crypto from 'crypto';
import { sendEmail } from '@/lib/notifications/emailService';
import { checkRateLimit } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

const GENERIC_MESSAGE = 'If an account exists, a reset link was sent';

export async function POST(request) {
  const rateLimit = checkRateLimit(request, { namespace: 'forgot-password', limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } },
    );
  }

  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    const [user] = await sql`
      SELECT id FROM users WHERE email = ${normalizedEmail} AND is_active = true LIMIT 1
    `;
    if (!user) return NextResponse.json({ success: true, message: GENERIC_MESSAGE });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await sql.begin(async (transaction) => {
      await transaction`UPDATE password_resets SET used = true WHERE user_id = ${user.id} AND used = false`;
      await transaction`
        INSERT INTO password_resets (user_id, token, expires_at)
        VALUES (${user.id}, ${tokenHash}, ${expiresAt.toISOString()})
      `;
    });

    const resetUrl = new URL('/reset-password', process.env.NEXT_PUBLIC_SITE_URL);
    resetUrl.searchParams.set('token', rawToken);
    await sendEmail({
      to: normalizedEmail,
      subject: 'Reset your Buildogram password',
      body: `Use this link within one hour to reset your Buildogram password: ${resetUrl.toString()}`,
    });

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error('[Forgot Password]', error?.name || 'unknown_error');
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
