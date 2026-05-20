import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'buildogram';
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(buffer, folder);
    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
