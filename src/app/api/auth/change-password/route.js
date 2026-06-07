import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/storageProvider';
import { getUserFromRequest, signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password, confirmPassword } = await req.json();

    if (!password || password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match or are empty' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.users.update({
      where: { id: userPayload.id },
      data: {
        password_hash: hash,
        must_change_password: false
      }
    });

    // Sign a new token with must_change_password set to false
    const token = await signToken({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      must_change_password: false
    });

    const res = NextResponse.json({ success: true, user: updatedUser });
    res.cookies.set('buildogram_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
    
    return res;
  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
