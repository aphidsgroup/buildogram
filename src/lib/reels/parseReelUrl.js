export function parseReelUrl(url, startMuted = false) {
  let result = {
    provider: 'unknown',
    originalUrl: url,
    embedUrl: null,
    videoId: null,
    isDirectVideo: false,
    canAutoplay: false,
    notes: null
  };

  const mParam = startMuted ? '1' : '0';

  if (!url) return result;

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname;

    // Direct Video
    if (pathname.endsWith('.mp4') || pathname.endsWith('.webm') || pathname.endsWith('.mov')) {
      result.provider = 'direct';
      result.isDirectVideo = true;
      result.canAutoplay = true; // Native video elements can autoplay muted easily
      result.embedUrl = url;
      return result;
    }

    // YouTube
    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      result.provider = 'youtube';
      result.canAutoplay = true;
      let videoId = null;

      if (host.includes('youtu.be')) {
        videoId = pathname.slice(1);
      } else if (pathname.includes('/shorts/')) {
        videoId = pathname.split('/shorts/')[1].split('/')[0];
      } else {
        videoId = parsedUrl.searchParams.get('v');
      }

      if (videoId) {
        result.videoId = videoId;
        // Build the embed URL optimized for a vertical "reels" experience
        // autoplay=1, mute dynamic, loop=1, playlist=videoId (required for loop), playsinline=1
        result.embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${mParam}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;
      }
      return result;
    }

    // Vimeo
    if (host.includes('vimeo.com')) {
      result.provider = 'vimeo';
      result.canAutoplay = true;
      
      const parts = pathname.split('/').filter(Boolean);
      const videoId = parts[0]; 

      if (videoId && /^\d+$/.test(videoId)) {
        result.videoId = videoId;
        result.embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=${mParam}&controls=0`;
      } else {
        result.notes = "Could not strictly extract Vimeo ID from URL.";
      }
      return result;
    }

    // Instagram
    if (host.includes('instagram.com')) {
      result.provider = 'instagram';
      result.canAutoplay = false; // Instagram iframe blocks programmatic unmute/autoplay overlays
      result.notes = "Instagram embeds have strict autoplay/unmute limitations via iframe.";
      
      // Convert to an embed URL
      const cleanUrl = url.split('?')[0];
      const normalizedPath = cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
      result.embedUrl = normalizedPath + 'embed/';
      
      return result;
    }

    // Facebook
    if (host.includes('facebook.com') || host.includes('fb.watch')) {
      result.provider = 'facebook';
      result.canAutoplay = true; // FB plugin can autoplay with &autoplay=1 (muted by default)
      result.notes = "Facebook plugins enforce their own UI constraints.";
      
      result.embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=1&mute=${mParam}`;
      return result;
    }

  } catch (err) {
    result.notes = "Invalid URL format or parser error.";
  }

  return result;
}
