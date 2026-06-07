import { NextResponse } from 'next/server';
import { prisma } from '@/lib/storageProvider';
import { requirePermission } from '@/lib/auth/permissions';

export async function PATCH(req, { params }) {
  try {
    const adminUser = await requirePermission('manage_users');

    const userId = params.id;
    const data = await req.json();
    
    // Ensure we don't allow password updates here. That has its own endpoint.
    const { password_hash, must_change_password, id, ...safeData } = data;

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: safeData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    if (error.message.startsWith('Forbidden') || error.message === 'Unauthorized') return NextResponse.json({ error: error.message }, { status: 403 });
    console.error("Update User Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const adminUser = await requirePermission('manage_users');

    const userId = params.id;
    
    // Don't let an admin delete themselves
    if (adminUser.id === userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Instead of hard delete, usually we just deactivate
    // But if requested, hard delete:
    await prisma.users.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.message.startsWith('Forbidden') || error.message === 'Unauthorized') return NextResponse.json({ error: error.message }, { status: 403 });
    console.error("Delete User Error:", error);
    // If foreign key constraint fails, return a friendly message
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'Cannot delete user because they have associated records. Please deactivate them instead.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
