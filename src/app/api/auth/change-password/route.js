import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/storageProvider';
import { setAuthCookie, signToken } from '@/lib/auth';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { normalizeRole } from '@/lib/roles';

export async function POST(req) {
  try {
    const sessionUser = await getActiveUserFromRequest(req);
    if (!sessionUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { currentPassword, password, confirmPassword } = await req.json();
    if (!password || password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match or are empty' }, { status: 400 });
    }
    if (password.length < 12) {
      return NextResponse.json({ error: 'Password must be at least 12 characters long' }, { status: 400 });
    }

    const currentUser = await prisma.users.findUnique({ where: { id: sessionUser.id } });
    if (!currentUser || !currentPassword || !(await bcrypt.compare(currentPassword, currentUser.password_hash))) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

    const hash = await bcrypt.hash(password, 12);
    const updatedUser = await prisma.users.update({
      where: { id: sessionUser.id },
      data: { password_hash: hash, must_change_password: false },
    });
    const safeUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: normalizeRole(updatedUser.role),
      partner_id: updatedUser.partner_id || null,
      must_change_password: false,
    };
    const token = await signToken(safeUser);
    return setAuthCookie(NextResponse.json({ success: true, user: safeUser }), token);
  } catch (error) {
    console.error('Change password failed:', error?.name || 'unknown_error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
