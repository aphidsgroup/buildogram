'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import Player from '@vimeo/player';
import styles from './FloatingReelPlayer.module.css';

const Volume2 = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);
const VolumeX = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);
const XIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

// Session-storage read, safe on the server. Used as a lazy initialiser so the
// closed state never has to be set from inside an effect.
function closedThisSession() {
  if (typeof window === 'undefined') return false;
  try { return sessionStorage.getItem('buildogram_reel_closed') === 'true'; }
  catch { return false; }
}

export default function FloatingReelPlayer() {
  const pathname = usePathname();
  const [reel, setReel] = useState(null);
  const [loading, setLoading] = useState(() => !closedThisSession());
  const [isClosed, setIsClosed] = useState(closedThisSession);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const controlTimeoutRef = useRef(null);
  const iframeRef = useRef(null);
  const vimeoPlayerRef = useRef(null);

  // Hide on private/admin routes
  const isHiddenRoute = pathname.startsWith('/ops') || 
                        pathname.startsWith('/partner') || 
                        pathname.startsWith('/client') || 
                        pathname.startsWith('/admin') || 
                        pathname.startsWith('/dashboard') || 
                        pathname.startsWith('/login');

  // Viewport width is an external system. useSyncExternalStore subscribes without
  // a synchronous setState in an effect, and its server snapshot (false) keeps
  // hydration consistent.
  const isMobile = useSyncExternalStore(
    (onChange) => {
      window.addEventListener('resize', onChange);
      return () => window.removeEventListener('resize', onChange);
    },
    () => window.innerWidth < 768,
    () => false
  );

  useEffect(() => {
    if (closedThisSession() || isHiddenRoute) return;

    const controller = new AbortController();
    let active = true;

    const fetchReel = async () => {
      try {
        const res = await fetch('/api/reels/active', { signal: controller.signal });
        const json = await res.json();
        if (active && json.success && json.data) {
          setReel(json.data);
          setIsMuted(json.data.start_muted ?? true);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch active reel', error);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchReel();

    return () => {
      active = false;
      controller.abort();
    };
  }, [isHiddenRoute]);

  useEffect(() => {
    if (showControls && !isClosed) {
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current);
      controlTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current);
    };
  }, [showControls, isClosed]);

  useEffect(() => {
    if (isHiddenRoute || isClosed || !iframeRef.current || vimeoPlayerRef.current) return;

    let active = true;
    const player = new Player(iframeRef.current);
    const handleVolumeChange = (data) => {
      if (active) {
        setIsMuted(data.volume === 0);
      }
    };
    const handlePlaying = () => {
      if (active) setPlayerReady(true);
    };

    vimeoPlayerRef.current = player;
    player.getMuted()
      .then((muted) => {
        if (active) setIsMuted(muted);
      })
      .catch(err => console.error("Vimeo API getMuted Error:", err));
    player.on('volumechange', handleVolumeChange);
    player.on('playing', handlePlaying);

    return () => {
      active = false;
      player.off('volumechange', handleVolumeChange);
      player.off('playing', handlePlaying);
      player.destroy().catch(() => {});
      if (vimeoPlayerRef.current === player) vimeoPlayerRef.current = null;
    };
  }, [loading, reel, isClosed, isHiddenRoute]);

  if (isHiddenRoute || isClosed || (!loading && !reel)) return null;

  const containerStyle = styles.visible;

  const handleClose = (e) => {
    e.stopPropagation();
    setIsClosed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('buildogram_reel_closed', 'true');
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    if (vimeoPlayerRef.current) {
      vimeoPlayerRef.current.setVolume(nextMuted ? 0 : 1);
      vimeoPlayerRef.current.setMuted(nextMuted);
    }
  };

  const handleTap = () => {
    setShowControls(true);
    // On first tap anywhere, if the video is muted, unmute it automatically
    if (isMuted) {
      setIsMuted(false);
      if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setVolume(1);
        vimeoPlayerRef.current.setMuted(false);
      }
    }
  };

  const renderPlayer = () => {
    if (reel.provider === 'vimeo' || (reel.video_url && reel.video_url.includes('vimeo.com'))) {
      const videoId = reel.video_url.split('/').pop();
      const iframeSrc = `https://player.vimeo.com/video/${videoId}?transparent=1&badge=0&autopause=0&autoplay=1&loop=1&muted=${isMuted ? 1 : 0}&controls=0&playsinline=1&background=1`;
      return (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={reel.title || "Buildogram Reel"}
          className={styles.videoFrame}
        />
      );
    }
    
    return (
      <ReactPlayer 
        url={reel.video_url}
        playing={true}
        muted={isMuted}
        loop={true}
        width="100%"
        height="100%"
        playsinline={true}
        onStart={() => setPlayerReady(true)}
        onError={(e) => {
          console.error("ReactPlayer Error:", e);
          if (!isMuted) setIsMuted(true);
        }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: { playerVars: { controls: 0, modestbranding: 1, rel: 0, fs: 0 } },
          vimeo: { playerOptions: { controls: false, byline: false, portrait: false, title: false } }
        }}
      />
    );
  };

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobile : styles.desktop} ${containerStyle}`}>
      {/* Skeleton stays visible until playerReady */}
      {!playerReady && <div className={styles.skeleton} />}

      {!loading && reel && (
        <div className={`${styles.videoWrapper} ${playerReady ? styles.videoReady : styles.videoLoading}`}>
          {renderPlayer()}

          <button
            className={styles.tapLayer}
            aria-label="Show reel controls"
            onClick={handleTap}
          />

          {/* Overlays */}
          <div className={`${styles.overlay} ${showControls ? styles.overlayInteractive : styles.overlayHidden}`}>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close reel">
              <XIcon size={14} strokeWidth={3} />
            </button>
            
            <button className={`${styles.centerBtn} ${isMuted ? styles.centerBtnPulse : ''}`} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            {reel.cta_label && reel.cta_url && (
              reel.cta_url.startsWith('/') && !reel.cta_url.startsWith('//') ? (
                <Link href={reel.cta_url} className={styles.ctaBtn} onClick={(e) => e.stopPropagation()}>
                  {reel.cta_label}
                </Link>
              ) : (
                <a href={reel.cta_url} className={styles.ctaBtn} onClick={(e) => e.stopPropagation()}>
                  {reel.cta_label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
