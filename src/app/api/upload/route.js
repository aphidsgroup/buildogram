import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getUserFromRequest } from '@/lib/auth';

cloudinary.config({
  secure: true
});

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64 buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const b64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${b64}`;

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: `buildogram/${user.role}/${user.id}`,
      resource_type: 'auto',
    });

    return NextResponse.json({
      success: true,
      url: uploadRes.secure_url,
      format: uploadRes.format,
      bytes: uploadRes.bytes
    });
  } catch (e) {
    console.error('[Upload API]', e.message);
    return NextResponse.json({ success: false, message: 'Upload failed: ' + e.message }, { status: 500 });
  }
}
