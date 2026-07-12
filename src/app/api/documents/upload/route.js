import { NextResponse } from 'next/server';
import { documentAssets } from '@/lib/storageProvider';
import { uploadFile } from '@/lib/fileStorageProvider';
import { logAudit } from '@/lib/auditService';
import { sendNotification } from '@/lib/notifications/notificationService';
import { requireOps } from '@/lib/apiAuth';

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
const ALLOWED_VISIBILITY = new Set(['ops_only', 'partner_only', 'client_visible']);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req) {
  const { user, error: authError } = requireOps(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const leadId = formData.get('leadId');
    const documentType = formData.get('documentType');
    const visibility = formData.get('visibility') || 'ops_only';

    if (!file || !leadId || !documentType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    if (!UUID_PATTERN.test(String(leadId))) {
      return NextResponse.json({ success: false, error: 'Invalid lead identifier' }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.has(file.type) || file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Unsupported file type or size' }, { status: 400 });
    }
    if (!ALLOWED_VISIBILITY.has(String(visibility))) {
      return NextResponse.json({ success: false, error: 'Invalid visibility' }, { status: 400 });
    }

    const safeFileName = String(file.name || 'document')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .slice(0, 180);

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to storage
    const storageResult = await uploadFile(buffer, safeFileName);

    // Save metadata
    const docData = {
      leadId,
      documentType,
      fileName: safeFileName,
      originalName: safeFileName,
      mimeType: file.type,
      fileSize: file.size,
      fileUrl: storageResult.url,
      storageKey: storageResult.storageKey,
      visibility,
      status: 'uploaded',
      uploadedByUserId: user.id,
    };

    const newDoc = await documentAssets.create(docData);

    await logAudit('Document Uploaded', 'DocumentAsset', newDoc.id, { fileName: safeFileName, documentType }, user.id, req);
    await sendNotification('Document Uploaded', { leadId, documentType, fileName: safeFileName });

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
