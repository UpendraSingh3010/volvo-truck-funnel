import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import defaultVideo from '../../assets/videos/volvo_road_train_final2.mp4';

export default function VideoModal({
  isOpen,
  onClose,
  title = "Volvo Road Train — Moving More. With Less.",
  videoSrc,
}) {
  const modalVideoRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Fallback to assets video if videoSrc is undefined
  const resolvedSrc = videoSrc || defaultVideo;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current?.();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Attempt immediate play
      if (modalVideoRef.current) {
        modalVideoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser blocks unmuted autoplay, mute and play
            if (modalVideoRef.current) {
              modalVideoRef.current.muted = true;
              setIsMuted(true);
              modalVideoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                  setIsPlaying(false);
                });
            }
          });
      }
    } else {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
      }
      setIsPlaying(false);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleManualPlay = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            setIsMuted(true);
            modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      const nextMuted = !modalVideoRef.current.muted;
      modalVideoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8 transition-opacity duration-300"
      style={{ zIndex: 99999 }}
      onClick={() => onCloseRef.current?.()}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0F2B46] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(56,189,248,0.25)] rounded-[4px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-white/10 text-white bg-[#0B2034] select-none">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-xs sm:text-sm text-[#F2F4F6]">VOLVO FILM</span>
            <span className="text-white/40">|</span>
            <span className="text-xs sm:text-sm font-medium truncate max-w-[220px] sm:max-w-md text-slate-200">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isMuted && (
              <button
                type="button"
                onClick={toggleMute}
                className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer mr-2"
                title="Click to unmute video"
              >
                <span>🔇 Unmute</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onCloseRef.current?.()}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer"
              aria-label="Close film"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={modalVideoRef}
            src={resolvedSrc}
            controls
            autoPlay
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onCanPlay={handleManualPlay}
            className="w-full h-full object-contain"
          />

          {/* Big Center Play Overlay Button if paused */}
          {!isPlaying && (
            <div
              onClick={handleManualPlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 hover:bg-black/55 transition-colors cursor-pointer group select-none"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#0F2B46] shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center transform group-hover:scale-110 transition-transform mb-3">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-[#0F2B46]">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase bg-black/60 px-3.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                Click to Play Film
              </span>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 sm:px-5 sm:py-3 bg-[#0B2034] text-xs text-white/60 flex items-center justify-between border-t border-white/10 select-none">
          <span className="truncate mr-3">Official Volvo Trucks India Documentary Film</span>
          <button
            type="button"
            onClick={() => onCloseRef.current?.()}
            className="px-4 py-1.5 bg-white text-[#0F2B46] text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-[#F2F4F6] transition-colors cursor-pointer shrink-0"
          >
            Close Film
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
