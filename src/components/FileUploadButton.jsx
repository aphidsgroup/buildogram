/**
 * FileUploadButton — Buildogram Phase F
 * ─────────────────────────────────────────────────────────────────────────
 * Reusable file upload component. Uploads via /api/upload (Cloudinary).
 * Falls back to placeholder record if API fails.
 *
 * Props:
 *  label          {string}   Button label text
 *  accept         {string}   HTML accept attribute (e.g. "image/*,.pdf")
 *  category       {string}   File category from FILE_CATEGORIES
 *  projectId      {string}   Linked project ID (optional)
 *  visibility     {string}   'internal_only' | 'customer_visible' | 'both'
 *  onUploadComplete {fn}     Called with FileModel record on success
 *  disabled       {bool}     Disable the button
 *  multiple       {bool}     Allow multiple files
 *  compact        {bool}     Compact styling
 *
 * Usage:
 *  <FileUploadButton
 *    label="Upload Site Photo"
 *    accept="image/*"
 *    category="site_photo"
 *    projectId="P001"
 *    visibility="customer_visible"
 *    onUploadComplete={(file) => console.log(file.fileUrl)}
 *  />
 */

'use client';
import { useState, useRef } from 'react';
import { FILE_CATEGORIES, uploadFile } from '@/lib/services/fileService';

export default function FileUploadButton({
  label     = 'Upload File',
  accept,
  category  = 'other',
  projectId = null,
  visibility = 'internal_only',
  onUploadComplete,
  disabled  = false,
  multiple  = false,
  compact   = false,
}) {
  const [state, setState] = useState('idle'); // idle | uploading | success | error
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const catInfo = FILE_CATEGORIES[category] || FILE_CATEGORIES.other;
  const acceptAttr = accept || catInfo.accept;

  const handleClick = () => {
    if (disabled || state === 'uploading') return;
    inputRef.current?.click();
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setState('uploading');
    const results = [];

    for (const file of files) {
      setFileName(file.name);
      try {
        const record = await uploadFile(file, { category, projectId, visibility });
        results.push(record);
      } catch (err) {
        console.warn('[FileUploadButton] Upload failed:', err.message);
        setState('error');
        setTimeout(() => setState('idle'), 3000);
        return;
      }
    }

    setState('success');
    if (onUploadComplete) {
      results.forEach(r => onUploadComplete(r));
    }
    setTimeout(() => { setState('idle'); setFileName(null); }, 3000);

    // Reset input so same file can be re-uploaded
    if (inputRef.current) inputRef.current.value = '';
  };

  const colors = {
    idle:      { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' },
    uploading: { bg: '#FFF7ED', text: '#EA580C', border: '#FED7AA' },
    success:   { bg: '#F0FDF4', text: '#16A34A', border: '#86EFAC' },
    error:     { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
  };

  const c = colors[state];

  const icons = {
    idle:      catInfo.icon || '📎',
    uploading: '⏳',
    success:   '✅',
    error:     '❌',
  };

  const labels = {
    idle:      label,
    uploading: `Uploading${fileName ? ` ${fileName.slice(0, 20)}...` : '...'}`,
    success:   `Uploaded${fileName ? `: ${fileName.slice(0, 20)}` : '!'}`,
    error:     'Upload failed — try again',
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleFiles}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || state === 'uploading'}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            compact ? '6px' : '8px',
          padding:        compact ? '6px 12px' : '10px 18px',
          background:     c.bg,
          color:          c.text,
          border:         `1px solid ${c.border}`,
          borderRadius:   '10px',
          fontSize:       compact ? '12px' : '14px',
          fontWeight:     600,
          cursor:         disabled || state === 'uploading' ? 'not-allowed' : 'pointer',
          transition:     'all 0.2s',
          opacity:        disabled ? 0.6 : 1,
          whiteSpace:     'nowrap',
        }}
      >
        <span>{icons[state]}</span>
        <span>{labels[state]}</span>
      </button>
    </>
  );
}
