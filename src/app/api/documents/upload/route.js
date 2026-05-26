import { NextResponse } from 'next/server';
import { documentAssets } from '@/lib/storageProvider';
import { uploadFile } from '@/lib/fileStorageProvider';
import { logAudit } from '@/lib/auditService';
import { sendNotification } from '@/lib/notifications/notificationService';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const leadId = formData.get('leadId');
    const documentType = formData.get('documentType');
    const uploadedByUserId = formData.get('uploadedByUserId') || 'System';
    const visibility = formData.get('visibility') || 'ops_only';

    if (!file || !leadId || !documentType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to storage
    const storageResult = await uploadFile(buffer, file.name);

    // Save metadata
    const docData = {
      leadId,
      documentType,
      fileName: file.name,
      originalName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      fileUrl: storageResult.url,
      storageKey: storageResult.storageKey,
      visibility,
      status: 'uploaded',
      uploadedByUserId
    };

    const newDoc = await documentAssets.create(docData);

    await logAudit('Document Uploaded', 'DocumentAsset', newDoc.id, { fileName: file.name, documentType }, uploadedByUserId, req);
    await sendNotification('Document Uploaded', { leadId, documentType, fileName: file.name });

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
