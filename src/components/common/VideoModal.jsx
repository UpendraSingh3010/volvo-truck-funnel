import React, { useEffect, useRef } from 'react';

export default function VideoModal({
  isOpen,
  onClose,
  title = "Volvo Road Train — Moving More. With Less.",
  videoSrc,
  audioSrc,
}) {
  const modalVideoRef = useRef(null);
  const modalAudioRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Start playback when modal opens
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = 0;
        modalVideoRef.current.play().catch(() => {});
      }
      if (modalAudioRef.current) {
        modalAudioRef.current.currentTime = 0;
        modalAudioRef.current.play().catch(() => {});
      }
    } else {
      if (modalVideoRef.current) modalVideoRef.current.pause();
      if (modalAudioRef.current) modalAudioRef.current.pause();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVideoPlay = () => {
    if (modalAudioRef.current && modalVideoRef.current) {
      modalAudioRef.current.currentTime = modalVideoRef.current.currentTime;
      modalAudioRef.current.play().catch(() => {});
    }
  };

  const handleVideoPause = () => {
    if (modalAudioRef.current) {
      modalAudioRef.current.pause();
    }
  };

  const handleVideoSeek = () => {
    if (modalAudioRef.current && modalVideoRef.current) {
      modalAudioRef.current.currentTime = modalVideoRef.current.currentTime;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0F2B46] border border-white/20 shadow-2xl rounded-[2px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 text-white bg-[#0B2034]">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-sm text-[#F2F4F6]">VOLVO FILM</span>
            <span className="text-white/40">|</span>
            <span className="text-sm font-medium truncate max-w-md">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 text-xl font-bold cursor-pointer"
            aria-label="Close film"
          >
            ✕
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {videoSrc ? (
            <>
              <video
                ref={modalVideoRef}
                src={videoSrc}
                controls
                autoPlay
                playsInline
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onSeeked={handleVideoSeek}
                className="w-full h-full object-contain"
              />
              {audioSrc && (
                <audio
                  ref={modalAudioRef}
                  src={audioSrc}
                />
              )}
            </>
          ) : (
            <div className="text-white/40 text-sm">Video source not available</div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#0B2034] text-xs text-white/60 flex items-center justify-between">
          <span>Official Volvo Trucks India Documentary Film</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-[#0F2B46] text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-[#F2F4F6] transition-colors cursor-pointer"
          >
            Close Film
          </button>
        </div>
      </div>
    </div>
  );
}
