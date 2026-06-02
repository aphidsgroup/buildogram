/**
 * fileService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * File upload readiness layer.
 * Cloudinary is already configured via CLOUDINARY_* env vars.
 * This service handles upload metadata, Cloudinary integration,
 * and fallback demo mode.
 *
 * File categories supported:
 * - Site photos
 * - BOQ files
 * - Drawings (2D/3D/Structural/Electrical/Plumbing)
 * - Quotations
 * - Invoices / Receipts
 * - Inspection reports
 * - Handover docs
 * - Profile photos
 */

import { lsGet, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';

const LS_KEY = 'bos_files';

export const FILE_CATEGORIES = {
  site_photo:        { label: 'Site Photo',        icon: '📸', accept: 'image/*' },
  boq:               { label: 'BOQ',               icon: '📊', accept: '.pdf,.xlsx,.xls,.csv' },
  drawing_2d:        { label: '2D Plan',           icon: '📐', accept: '.pdf,.dwg,.png,.jpg' },
  drawing_3d:        { label: '3D Render',         icon: '🏗️', accept: '.pdf,.png,.jpg,.jpeg' },
  structural:        { label: 'Structural Drawing',icon: '🔩', accept: '.pdf,.dwg' },
  electrical:        { label: 'Electrical Drawing',icon: '⚡', accept: '.pdf,.dwg' },
  plumbing:          { label: 'Plumbing Drawing',  icon: '🚿', accept: '.pdf,.dwg' },
  quotation:         { label: 'Quotation',         icon: '📋', accept: '.pdf,.xlsx' },
  invoice:           { label: 'Invoice',           icon: '🧾', accept: '.pdf,.jpg,.jpeg' },
  receipt:           { label: 'Receipt',           icon: '🏧', accept: '.pdf,.jpg,.jpeg' },
  inspection_report: { label: 'Inspection Report', icon: '🔍', accept: '.pdf,.docx' },
  handover_doc:      { label: 'Handover Doc',      icon: '🔑', accept: '.pdf' },
  agreement:         { label: 'Agreement',         icon: '📜', accept: '.pdf,.docx' },
  warranty:          { label: 'Warranty',          icon: '✅', accept: '.pdf' },
  other:             { label: 'Other',             icon: '📎', accept: '*' },
};

/**
 * Upload a file to Cloudinary via the existing /api/upload route.
 * Falls back to metadata-only record in demo mode.
 *
 * @param {File} file — browser File object
 * @param {{ category: string, projectId?: string, visibility?: string, uploadedBy?: string }} meta
 * @returns {Promise<object>} FileModel record
 */
export async function uploadFile(file, meta = {}) {
  const record = {
    id:          genId('FILE'),
    fileName:    file.name,
    fileType:    file.type,
    fileSize:    file.size,
    category:    meta.category || 'other',
    fileUrl:     null,
    externalId:  null,
    uploadedBy:  meta.uploadedBy || 'partner',
    uploadedAt:  new Date().toISOString(),
    visibility:  meta.visibility || 'internal_only',
    linkedProjectId: meta.projectId || null,
    provider:    'cloudinary',
  };

  if (!isDemoMode()) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', meta.category || 'other');
      formData.append('projectId', meta.projectId || '');
      formData.append('visibility', meta.visibility || 'internal_only');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data?.url) {
        record.fileUrl  = data.url;
        record.externalId = data.publicId || data.public_id;
        _saveFileRecord(record);
        return record;
      }
    } catch (err) {
      console.warn('[fileService] Upload failed, saving placeholder:', err.message);
    }
  }

  // Demo / fallback: create a placeholder record without real upload
  record.fileUrl = '#placeholder';
  _saveFileRecord(record);
  return record;
}

/**
 * Get all file records for a project.
 * @param {string} projectId
 */
export async function getProjectFiles(projectId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/documents?projectId=${projectId}`);
    if (data?.documents) return data.documents;
  }
  return (lsGet(LS_KEY) || []).filter(f => f.linkedProjectId === projectId);
}

/**
 * Delete a file record (and optionally from Cloudinary via API).
 * @param {string} fileId
 */
export async function deleteFile(fileId) {
  if (!isDemoMode()) {
    await apiFetch(`/api/documents/${fileId}`, { method: 'DELETE' }).catch(() => {});
  }
  const all = lsGet(LS_KEY) || [];
  lsSet(LS_KEY, all.filter(f => f.id !== fileId));
}

/**
 * Get Cloudinary upload config for direct unsigned uploads (if needed).
 * Uses NEXT_PUBLIC_CLOUDINARY_* env vars.
 */
export function getCloudinaryConfig() {
  return {
    cloudName:    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dautrievu',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'buildogram_uploads',
    uploadUrl:    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dautrievu'}/upload`,
  };
}

function _saveFileRecord(record) {
  const all = lsGet(LS_KEY) || [];
  lsSet(LS_KEY, [record, ...all]);
}
