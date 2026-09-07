import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import Eyebrow from '../common/Eyebrow';
import Button from '../common/Button';
import VideoModal from '../common/VideoModal';
import heroVideo from '../../assets/videos/87838aa2-33d5-45b3-a870-04e685a614ae-stream.mp4';
import heroAudio from '../../assets/videos/032ff2e1-6364-4ee0-8378-b3d5c0a3be83-audio.mp4';

export default function HeroSection({ onExploreAssessment }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Ensure video starts playing from start (currentTime = 0) and is muted when component mounts / hero is viewed
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

  const handleAssessmentClick = () => {
    if (onExploreAssessment) {
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
        if (isAudioPlaying && audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  // Soundtrack audio toggle (small icon only)
  const toggleHeroAudio = () => {
    if (!audioRef.current || !videoRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      // Sync audio time with current video time
      audioRef.current.currentTime = videoRef.current.currentTime % (audioRef.current.duration || 60);
      audioRef.current.play().then(() => {
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
        {/* Full-bleed hero film - Autoplaying, muted, loop */}
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

          {/* Hidden audio element for optional unmuted sync */}
          <audio
            ref={audioRef}
            src={heroAudio}
            loop
          />

          {/* Minimal, soft dark overlay so video remains clearly visible while text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/75 via-black/25 to-black/35 pointer-events-none" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-[780px]">
            {/* Eyebrow */}
            <Eyebrow light={true} className="!mb-2 sm:!mb-3 drop-shadow-sm font-semibold text-[11px] sm:text-[13px]">
              INDIA'S FIRST AND ONLY ROAD TRAIN
            </Eyebrow>

            {/* H1 */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.06] tracking-tight font-medium mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              Moving More.<br />With Less.
            </h1>

            {/* Sub-headline */}
            <p className="text-[#F2F4F6] text-sm sm:text-base md:text-[18px] leading-relaxed max-w-[680px] mb-6 sm:mb-8 font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              One Volvo prime mover. Multiple trailers.{' '}
              <strong className="text-white font-medium underline decoration-white/40 underline-offset-4">
                30 lakh+
              </strong>{' '}
              kilometres on Indian roads — with{' '}
              <strong className="text-white font-medium underline decoration-white/40 underline-offset-4">
                zero
              </strong>{' '}
              accidents. A new way to move India's freight: more tonnes per trip, fewer trucks on the road, lower cost per kilometre.
            </p>

            {/* Primary & Secondary CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Button
                variant="white"
                onClick={handleAssessmentClick}
                className="py-3 px-6 sm:py-3.5 sm:px-8 text-sm sm:text-base shadow-lg"
              >
                See if Road Train fits your operation →
              </Button>
              <Button
                variant="linkWhite"
                onClick={() => setIsVideoOpen(true)}
                className="text-sm sm:text-base drop-shadow-md hover:underline cursor-pointer"
              >
                Watch the film ▸
              </Button>
            </div>
          </div>
        </Container>

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
        onClose={() => setIsVideoOpen(false)}
        videoSrc={heroVideo}
        audioSrc={heroAudio}
      />
    </>
  );
}
