import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });

    const [user] = await sql`SELECT id, name FROM users WHERE email = ${email} AND is_active = true LIMIT 1`;
    if (!user) {
      // Return success even if not found to prevent email enumeration
      return NextResponse.json({ success: true, message: 'If an account exists, a reset link was sent' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await sql`
      INSERT INTO password_resets (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
    `;

    // In a real app, send an email here using SendGrid/AWS SES
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log(`[PASSWORD RESET] Link for ${email}: ${resetUrl}`);

    import('@/lib/notifications/notifyPartner').then(m => {
      m.notifyPartner({ email, contact_person: user.name }, {
        type: 'password_reset',
        message: `Click here to reset your password: ${resetUrl}`
      });
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'If an account exists, a reset link was sent' });
  } catch (e) {
    console.error('[Forgot Password]', e.message);
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
