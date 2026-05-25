// /src/lib/media/mediaUtils.js

export function isYouTubeUrl(url) {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
}

export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function isInstagramUrl(url) {
  if (!url) return false;
  return /instagram\.com/.test(url);
}

export function isPdfUrl(url) {
  if (!url) return false;
  return url.toLowerCase().endsWith('.pdf');
}

export function isValidImageUrl(url) {
  if (!url) return false;
  // Simple check for image extension or unsplash/ui-avatars (used in our demo)
  const isExt = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
  const isKnownService = /(unsplash\.com|ui-avatars\.com|cloudinary\.com)/i.test(url);
  return isExt || isKnownService || url.startsWith('data:image/');
}

export function getMediaType(url) {
  if (!url) return 'unknown';
  if (isYouTubeUrl(url)) return 'youtube';
  if (isInstagramUrl(url)) return 'instagram';
  if (isPdfUrl(url)) return 'pdf';
  if (isValidImageUrl(url)) return 'image';
  // Default fallback if we can't tell, assume generic link or video
  return 'unknown';
}

export function sanitizeMediaUrl(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    // basic sanitization could happen here (e.g. remove tracking query params)
    return parsed.toString();
  } catch (e) {
    // If it's not a valid URL (like a relative path), return as-is
    return url;
  }
}
