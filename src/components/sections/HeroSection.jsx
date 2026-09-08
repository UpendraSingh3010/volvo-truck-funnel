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

  // Ensure video starts playing from start (currentTime = 0) and is muted when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay was prevented by browser policy:", err);
            setIsPlaying(false);
          });
      }
    }
  }, []);

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
        <Container className="relative z-10 pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 max-w-[700px]">
            {/* Primary Button */}
            <button
              onClick={handleAssessmentClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-white hover:bg-slate-100 text-[#0F2B46] font-semibold text-sm sm:text-base rounded-[3px] shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>See if Road Train fits your operation</span>
              <span className="text-xl leading-none">→</span>
            </button>

            {/* Secondary Button: Watch the film */}
            <button
              type="button"
              onClick={handleOpenFilm}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 bg-[#0F2B46]/75 hover:bg-[#0F2B46]/95 text-white font-medium text-sm sm:text-base rounded-[3px] backdrop-blur-md border border-white/30 hover:border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-sky-400">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Watch the film</span>
            </button>
          </div>
        </Container>

        {/* Scroll indicator chevron — bottom-centre, fades out after 50 px scroll */}
        <div
          className="scroll-chevron absolute bottom-7 left-1/2 z-20 pointer-events-none"
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
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          {/* Circular Play/Pause Button with Video Progress Bar */}
          <div className="relative w-12 h-12 flex items-center justify-center">
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
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
            >
              {isPlaying ? (
                // Pause Icon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                // Play Icon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
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
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
          >
            {isAudioPlaying ? (
              // Speaker with sound waves icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              // Speaker with slash / mute icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
