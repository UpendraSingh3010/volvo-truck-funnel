import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import VideoModal from '../common/VideoModal';

import heroVideo from '../../assets/videos/volvo_road_train_final2.mp4';

export default function HeroSection({ onExploreAssessment }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showChevron, setShowChevron] = useState(true);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Open Film Modal: pause background video so playback/audio don't collide
  const handleOpenFilm = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsVideoOpen(true);
  }, []);

  // Close Film Modal: resume background video smoothly
  const handleCloseFilm = useCallback(() => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  // Ensure video starts playing from start (currentTime = 0), is muted, and handles mobile autoplay policy
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay deferred or restricted:", err);
            setIsPlaying(false);
          });
      }
    };

    tryPlay();

    // Mobile touch-start unlock: resumes video if mobile browser initially held it
    const handleFirstTouch = () => {
      if (video.paused && !isVideoOpen) {
        tryPlay();
      }
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch, { passive: true });

    // Handle tab focus / app backgrounding
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused && !isVideoOpen) {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Remote trigger from mobile navbar hamburger menu
    const handleRemoteOpen = () => handleOpenFilm();
    window.addEventListener('open-film-modal', handleRemoteOpen);

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('open-film-modal', handleRemoteOpen);
    };
  }, [isVideoOpen, handleOpenFilm]);

  // Hide scroll chevron after user scrolls 50 px
  useEffect(() => {
    const onScroll = () => setShowChevron(window.scrollY < 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Primary Button: Smooth scroll to Assessment section or navigate to assessment route
  const handleAssessmentClick = () => {
    const el = document.getElementById('assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreAssessment) {
      onExploreAssessment();
    } else {
      navigate('/assessment');
    }
  };

  // Video time update to move circular progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  // Play / Pause toggle
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Soundtrack audio toggle: unmuting/muting native audio of the video
  const toggleHeroAudio = () => {
    if (!videoRef.current) return;

    if (isAudioPlaying) {
      videoRef.current.muted = true;
      setIsAudioPlaying(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((e) => {
        console.warn("Audio playback error:", e);
      });
    }
  };

  // Circular progress calculations (Radius = 20, Circumference ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <section className="relative h-[100dvh] max-h-[100dvh] w-full bg-[#0F2B46] flex flex-col justify-end pb-8 sm:pb-12 md:pb-14 pt-[72px] overflow-hidden select-none">
        {/* Full-bleed hero film - Autoplaying, muted, loop with baked-in video text */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover object-center"
          />

          {/* Minimal soft bottom vignette so video text and graphics stay crisp while grounding buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/75 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Action CTA Buttons */}
        <Container className="relative z-10 pb-4 sm:pb-6">
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-5 w-full sm:w-auto max-w-[700px]">
            {/* Primary Button */}
            <button
              onClick={handleAssessmentClick}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 py-3 sm:px-8 sm:py-4 bg-white hover:bg-slate-100 text-[#0F2B46] font-semibold text-xs sm:text-base rounded-[3px] shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-center"
            >
              <span className="hidden sm:inline">See if Road Train fits your operation</span>
              <span className="sm:hidden">Assess Route</span>
              <span className="text-sm sm:text-xl leading-none">→</span>
            </button>

            {/* Secondary Button: Watch the film */}
            <button
              type="button"
              onClick={handleOpenFilm}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 py-3 sm:px-7 sm:py-4 bg-[#0F2B46]/80 hover:bg-[#0F2B46]/95 text-white font-medium text-xs sm:text-base rounded-[3px] backdrop-blur-md border border-white/30 hover:border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-center"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-sky-400 shrink-0 sm:w-[18px] sm:h-[18px]">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Watch Film</span>
            </button>
          </div>
        </Container>

        {/* Scroll indicator chevron — bottom-centre, hidden on small mobile to save space */}
        <div
          className="hidden md:block scroll-chevron absolute bottom-7 left-1/2 z-20 pointer-events-none"
          style={{ opacity: showChevron ? 1 : 0 }}
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.60)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Media Controls in Bottom Right: Circular Play/Pause bar + Small Soundtrack Icon */}
        <div className="absolute bottom-4 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-3">
          {/* Circular Play/Pause Button with Video Progress Bar */}
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              {/* Background Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="2.5"
              />
              {/* Progress Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-100 ease-linear"
              />
            </svg>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause video" : "Play video"}
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
            >
              {isPlaying ? (
                // Pause Icon
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[14px] sm:h-[14px]">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                // Play Icon
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 sm:w-[14px] sm:h-[14px]">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

          {/* Small Soundtrack Icon Only Button */}
          <button
            onClick={toggleHeroAudio}
            aria-label={isAudioPlaying ? "Mute soundtrack" : "Unmute soundtrack"}
            title={isAudioPlaying ? "Mute soundtrack" : "Play soundtrack"}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
          >
            {isAudioPlaying ? (
              // Speaker with sound waves icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              // Speaker with slash / mute icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Interactive Film Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={handleCloseFilm}
        videoSrc={heroVideo}
      />
    </>
  );
}
