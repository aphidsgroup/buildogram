import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '@/lib/storageProvider';
import { requirePermission } from '@/lib/auth/permissions';

const generateTempPassword = () => {
  return crypto.randomBytes(6).toString('hex');
};

export async function POST(req, { params }) {
  try {
    const adminUser = await requirePermission('manage_users');

    const userId = params.id;

    const tempPassword = generateTempPassword();
    const hash = await bcrypt.hash(tempPassword, 10);

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        password_hash: hash,
        must_change_password: true
      },
      select: {
        id: true,
        email: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      tempPassword,
      message: 'Password reset successfully'
    });

  } catch (error) {
    if (error.message.startsWith('Forbidden') || error.message === 'Unauthorized') return NextResponse.json({ error: error.message }, { status: 403 });
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
