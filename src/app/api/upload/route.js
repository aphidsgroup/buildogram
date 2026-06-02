import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sql from '@/lib/db';
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
    const category = formData.get('category') || 'general';
    const projectId = formData.get('projectId');
    const visibility = formData.get('visibility') || 'partner_only';

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

    // Save metadata to database (non-blocking if it fails, though we return error if it crashes)
    let documentId = null;
    try {
      const [doc] = await sql`
        INSERT INTO documents (
          project_id, name, doc_type, file_url, uploaded_by, 
          visibility, cloudinary_public_id
        ) VALUES (
          ${projectId || null}, 
          ${file.name || 'uploaded_file'}, 
          ${category}, 
          ${uploadRes.secure_url}, 
          ${user.id}, 
          ${visibility}, 
          ${uploadRes.public_id}
        ) RETURNING id
      `;
      documentId = doc?.id;
    } catch (dbErr) {
      console.warn('[Upload API] Failed to save document metadata to DB:', dbErr.message);
      // We don't fail the upload if DB insert fails, just return the URL so UI can use it
    }

    return NextResponse.json({
      success: true,
      url: uploadRes.secure_url,
      format: uploadRes.format,
      bytes: uploadRes.bytes,
      documentId: documentId
    });
  } catch (e) {
    console.error('[Upload API]', e.message);
    return NextResponse.json({ success: false, message: 'Upload failed: ' + e.message }, { status: 500 });
  }
}
