import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sql from '@/lib/db';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole, isPartnerRole, ROLES } from '@/lib/roles';

cloudinary.config({
  secure: true
});

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request) {
  const user = await getActiveUserFromRequest(request);
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
    if (!ALLOWED_MIME_TYPES.has(file.type) || file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, message: 'Unsupported file type or size' }, { status: 400 });
    }
    if (projectId && !UUID_PATTERN.test(String(projectId))) {
      return NextResponse.json({ success: false, message: 'Invalid project identifier' }, { status: 400 });
    }
    if (!projectId && !isOpsRole(user.role)) {
      return NextResponse.json({ success: false, message: 'A project is required' }, { status: 400 });
    }

    if (projectId) {
      const [project] = await sql`
        SELECT client_id, linked_partner_id FROM projects WHERE id = ${projectId} LIMIT 1
      `;
      const canAccess = project && (
        isOpsRole(user.role) ||
        (user.role === ROLES.CLIENT_USER && project.client_id === user.id) ||
        (isPartnerRole(user.role) && user.partner_id && project.linked_partner_id === user.partner_id)
      );
      if (!canAccess) {
        return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
      }
    }

    const safeFileName = String(file.name || 'document')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .slice(0, 180);

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
          project_id, name, type, file_url, uploaded_by,
          is_shared_with_client, public_id
        ) VALUES (
          ${projectId || null}, 
          ${safeFileName},
          ${category}, 
          ${uploadRes.secure_url}, 
          ${user.id}, 
          ${visibility === 'client_visible'},
          ${uploadRes.public_id}
        ) RETURNING id
      `;
      documentId = doc?.id;
    } catch (dbErr) {
      console.error('[Upload API] Failed to save document metadata:', dbErr?.name || 'database_error');
      await cloudinary.uploader.destroy(uploadRes.public_id, { resource_type: uploadRes.resource_type })
        .catch(() => undefined);
      return NextResponse.json({ success: false, message: 'Upload could not be recorded' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: uploadRes.secure_url,
      format: uploadRes.format,
      bytes: uploadRes.bytes,
      documentId: documentId
    });
  } catch (e) {
    console.error('[Upload API]', e?.name || 'unknown_error');
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
