'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player/lazy';
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
  const [isClosed, setIsClosed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const controlTimeoutRef = useRef(null);

  // Only show on the homepage
  const isHiddenRoute = pathname !== '/';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHiddenRoute) return;

    async function fetchReel() {
      try {
        const res = await fetch('/api/reels/active');
        const json = await res.json();
        if (json.success && json.data) {
          setReel(json.data);
          // Try to respect the database setting
          setIsMuted(json.data.start_muted ?? false);
        }
      } catch (err) {
        console.error('Failed to fetch active reel:', err);
      } finally {
        setLoading(false);
      }
    }
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

  if (isHiddenRoute || isClosed || (!loading && !reel)) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    setIsClosed(true);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  const handleTap = () => {
    setShowControls(true);
  };

  // We hide the entire container visually until player is ready to prevent the black flash
  const containerStyle = playerReady ? styles.visible : styles.hidden;

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobile : styles.desktop} ${containerStyle}`} onClick={handleTap}>
      {!loading && reel && (
        <div className={styles.videoWrapper}>
          <ReactPlayer 
            url={reel.video_url}
            playing={true}
            muted={isMuted}
            loop={true}
            width="100%"
            height="100%"
            playsinline={true}
            onReady={() => setPlayerReady(true)}
            style={{ position: 'absolute', top: 0, left: 0 }}
            config={{
              youtube: { playerVars: { controls: 0, modestbranding: 1, rel: 0, fs: 0 } },
              vimeo: { playerOptions: { controls: false, byline: false, portrait: false, title: false } }
            }}
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
