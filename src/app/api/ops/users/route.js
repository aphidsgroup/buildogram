import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '@/lib/storageProvider';
import { requirePermission } from '@/lib/auth/permissions';

const generateTempPassword = () => {
  return crypto.randomBytes(6).toString('hex'); // 12 characters hex
};

export async function GET(req) {
  try {
    const user = await requirePermission('manage_users');

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get('role');

    const where = {};
    if (roleFilter) where.role = roleFilter;

    const usersList = await prisma.users.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        is_active: true,
        created_at: true,
        partner_id: true,
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ users: usersList });
  } catch (error) {
    if (error.message.startsWith('Forbidden') || error.message === 'Unauthorized') return NextResponse.json({ error: 'Internal server error' }, { status: 403 });
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const adminUser = await requirePermission('manage_users');

    const data = await req.json();
    const { name, email, phone, role, partner_id } = data;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const tempPassword = generateTempPassword();
    const hash = await bcrypt.hash(tempPassword, 10);

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        phone: phone || null,
        role,
        password_hash: hash,
        must_change_password: true,
        is_active: true,
        partner_id: partner_id || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    // Important: We return tempPassword here so the admin can securely copy and share it
    return NextResponse.json({ 
      success: true, 
      user: newUser, 
      tempPassword 
    });

  } catch (error) {
    if (error.message.startsWith('Forbidden') || error.message === 'Unauthorized') return NextResponse.json({ error: 'Internal server error' }, { status: 403 });
    console.error("Create User Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
