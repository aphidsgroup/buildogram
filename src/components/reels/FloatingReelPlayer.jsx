'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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

export default function FloatingReelPlayer() {
  const pathname = usePathname();
  const [reel, setReel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check session storage first
    if (typeof window !== 'undefined' && sessionStorage.getItem('buildogram_reel_closed') === 'true') {
      setIsClosed(true);
      setLoading(false);
      return;
    }

    if (isHiddenRoute) {
      setLoading(false);
      return;
    }

    const fetchReel = async () => {
      try {
        const res = await fetch('/api/reels/active');
        const json = await res.json();
        if (json.success && json.data) {
          setReel(json.data);
          setIsMuted(json.data.start_muted ?? false);
        }
      } catch (error) {
        console.error('Failed to fetch active reel', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReel();
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
    if (iframeRef.current && !vimeoPlayerRef.current) {
      vimeoPlayerRef.current = new Player(iframeRef.current);
    }
  }, [loading, reel]);

  if (isHiddenRoute || isClosed || (!loading && !reel)) return null;

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
  };

  const containerStyle = styles.visible;

  const renderPlayer = () => {
    if (reel.provider === 'vimeo' || (reel.video_url && reel.video_url.includes('vimeo.com'))) {
      const videoId = reel.video_url.split('/').pop();
      const iframeSrc = `https://player.vimeo.com/video/${videoId}?transparent=1&badge=0&autopause=0&autoplay=1&loop=1&muted=${isMuted ? 1 : 0}&controls=0&playsinline=1`;
      return (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={reel.title || "Buildogram Reel"}
          onLoad={() => setPlayerReady(true)}
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
        onReady={() => setPlayerReady(true)}
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
      {!loading && reel && (
        <div className={styles.videoWrapper}>
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
            
            <button className={styles.centerBtn} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            {reel.cta_label && reel.cta_url && (
              <a href={reel.cta_url} className={styles.ctaBtn} onClick={(e) => e.stopPropagation()}>
                {reel.cta_label}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
