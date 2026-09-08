import React, { useRef, useState, useEffect } from 'react';
import Container from '../layout/Container';
import StepItem from '../common/StepItem';
import { howItWorksData } from '../../data/landingContent';

import img1 from '../../assets/images/1.avif';
import img2 from '../../assets/images/2.avif';
import img3 from '../../assets/images/3.webp';
import img4 from '../../assets/images/4.webp';

// ─── Volvo Road Train Prime Mover Vector Marker (Hero Focal Point) ───────────
function VolvoTruckMarker() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" className="filter drop-shadow-md">
      {/* Heavy Duty Steer Tires */}
      <rect x="4" y="27" width="6" height="15" rx="2" fill="#071524" stroke="#38BDF8" strokeWidth="1" />
      <rect x="38" y="27" width="6" height="15" rx="2" fill="#071524" stroke="#38BDF8" strokeWidth="1" />

      {/* Aerodynamic Cab Outer Frame */}
      <path
        d="M10 11C10 8 13 5.5 16 5.5H32C35 5.5 38 8 38 11V37C38 38.5 36.8 39.5 35.5 39.5H12.5C11.2 39.5 10 38.5 10 37V11Z"
        fill="#0F2B46"
        stroke="#38BDF8"
        strokeWidth="1.6"
      />

      {/* Globetrotter Aero Roof / Visor with Integrated Amber Clearance Lights */}
      <path d="M13 5.5H35L36.5 10H11.5L13 5.5Z" fill="#163C62" stroke="#7DD3FC" strokeWidth="0.8" />
      <circle cx="20" cy="7.5" r="1" fill="#FBBF24" />
      <circle cx="24" cy="7.5" r="1" fill="#FBBF24" />
      <circle cx="28" cy="7.5" r="1" fill="#FBBF24" />

      {/* Windscreen with Panoramic Blue Tint */}
      <path d="M13.5 12H34.5L33.5 21H14.5L13.5 12Z" fill="#061625" stroke="#38BDF8" strokeWidth="1" />
      {/* Glass Light Reflection Beam */}
      <path d="M16 13.5L23 13.5L19.5 19.5L15 19.5Z" fill="#38BDF8" fillOpacity="0.3" />

      {/* Aerodynamic Stalk Side Mirrors */}
      <rect x="6" y="13" width="3.5" height="8" rx="1" fill="#163C62" stroke="#38BDF8" strokeWidth="0.9" />
      <line x1="9.5" y1="16" x2="12" y2="16" stroke="#38BDF8" strokeWidth="1.2" />
      <rect x="38.5" y="13" width="3.5" height="8" rx="1" fill="#163C62" stroke="#38BDF8" strokeWidth="0.9" />
      <line x1="36" y1="16" x2="38.5" y2="16" stroke="#38BDF8" strokeWidth="1.2" />

      {/* Volvo Horizontal Slatted Grille */}
      <rect x="15" y="23.5" width="18" height="7.5" rx="1.2" fill="#071524" stroke="#1C4E80" strokeWidth="1" />
      <line x1="16" y1="26" x2="32" y2="26" stroke="#1C4E80" strokeWidth="0.7" />
      <line x1="16" y1="28.5" x2="32" y2="28.5" stroke="#1C4E80" strokeWidth="0.7" />

      {/* Signature Diagonal Volvo Sash & Iron Mark */}
      <line x1="17" y1="30" x2="31" y2="24.5" stroke="#7DD3FC" strokeWidth="1.4" />
      <circle cx="24" cy="27.2" r="2.2" fill="#0F2B46" stroke="#7DD3FC" strokeWidth="1.1" />

      {/* Distinct V-Shaped LED Daytime Running Lights (DRL) */}
      <path d="M12 24.5L14.5 29H12.5V24.5Z" fill="#38BDF8" />
      <path d="M36 24.5L33.5 29H35.5V24.5Z" fill="#38BDF8" />

      {/* Heavy Steel Protective Front Bumper */}
      <rect x="10" y="32.5" width="28" height="6.5" rx="1.5" fill="#113355" stroke="#38BDF8" strokeWidth="1.2" />
      <rect x="18" y="34.5" width="12" height="2.5" rx="0.5" fill="#071524" />
      <circle cx="13.5" cy="35.5" r="1.2" fill="#FFFFFF" />
      <circle cx="34.5" cy="35.5" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export default function HowItWorksSection() {
  const stepImages = [img1, img2, img3, img4];
  const stepsContainerRef = useRef(null);
  const stepRefs = useRef([]);

  // Set of step indices currently visible in the viewport
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  // Scroll progress (0 to 100%) through the steps container
  const [progressPercent, setProgressPercent] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isRafRunningRef = useRef(false);

  // ── Track continuous scroll progress down the route lane with smooth physics ───
  useEffect(() => {
    const updateTarget = () => {
      const firstStep = stepRefs.current[0];
      const lastStep = stepRefs.current[stepRefs.current.length - 1];

      if (!firstStep || !lastStep) {
        if (!stepsContainerRef.current) return;
        const rect = stepsContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startOffset = windowHeight * 0.48;
        const totalScrollable = rect.height - windowHeight * 0.28;
        const currentScroll = startOffset - rect.top;
        const pct = Math.max(0, Math.min(100, (currentScroll / Math.max(1, totalScrollable)) * 100));
        targetProgressRef.current = pct;
      } else {
        const firstRect = firstStep.getBoundingClientRect();
        const lastRect = lastStep.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.48;

        const startY = firstRect.top + firstRect.height * 0.25;
        const endY = lastRect.top + lastRect.height * 0.75;
        const totalDistance = endY - startY;
        const scrolled = viewportCenter - startY;

        const pct = Math.max(0, Math.min(100, (scrolled / Math.max(1, totalDistance)) * 100));
        targetProgressRef.current = pct;
      }

      // Kick off silky smooth frame-by-frame interpolation loop
      if (!isRafRunningRef.current) {
        isRafRunningRef.current = true;
        requestAnimationFrame(smoothGlide);
      }
    };

    const smoothGlide = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      // Damped spring / lerp motion until target reached
      if (Math.abs(diff) > 0.05) {
        currentProgressRef.current += diff * 0.12;
        setProgressPercent(currentProgressRef.current);
        requestAnimationFrame(smoothGlide);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setProgressPercent(targetProgressRef.current);
        isRafRunningRef.current = false;
      }
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      isRafRunningRef.current = false;
    };
  }, []);

  // ── Per-step IntersectionObserver — triggers step reveal animations ────────
  useEffect(() => {
    const observers = stepRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setVisibleSteps((prev) => {
            const next = new Set(prev);
            entry.isIntersecting ? next.add(i) : next.delete(i);
            return next;
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Milestone station percentages
  const stationPercentages = [0, 33.33, 66.66, 100];

  return (
    <section className="relative w-full bg-white border-b border-[#E2E8F0] overflow-hidden select-none">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="pt-16 md:pt-24 pb-8 md:pb-12 border-b border-slate-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-[720px]">

              <h2 className="text-3xl sm:text-4xl md:text-[46px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight">
                {howItWorksData.headline}
              </h2>
            </div>

            {/* Operational Corridor Telemetry Badge */}
            <div className="relative group cursor-pointer self-start md:self-end">
              {/* Subtle soft blue glow behind badge on hover */}
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md opacity-0 group-hover:opacity-60 group-hover:blur-md transition-all duration-400 pointer-events-none" />

              <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-[3px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] shadow-[0_4px_16px_rgba(15,43,70,0.18)] group-hover:shadow-[0_10px_20px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] transition-all duration-300 transform group-hover:-translate-y-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
                </span>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#BAE6FD] group-hover:text-white transition-colors font-semibold">
                  ACTIVE TRANSPORT ROUTE · 4 PHASES
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main Content: Transport Route Timeline + Alternating Steps ─── */}
      <Container>
        <div
          ref={stepsContainerRef}
          className="relative lg:pl-28 pb-20 pt-8 md:pt-12"
        >
          {/* ═════════════════════════════════════════════════════════════════
              VERTICAL ROUTE LANE WITH HERO TRUCK INDICATOR (Desktop lg+)
             ═════════════════════════════════════════════════════════════════ */}
          <div
            className="absolute left-0 top-16 bottom-20 hidden lg:block w-20"
            aria-hidden="true"
          >
            <div className="relative h-full w-full flex justify-center">

              {/* Highway Asphalt Road Track */}
              <div className="relative w-12 h-full bg-[#F1F5F9] border-x border-slate-300/80 rounded-sm flex justify-center overflow-hidden shadow-inner">
                {/* Dashed Center Highway Divider Line */}
                <div className="w-0.5 h-full border-r-2 border-dashed border-slate-300/90" />

                {/* Active Dynamic Blue Route Lane Fill (Above Truck) */}
                <div
                  className="absolute top-0 w-2 bg-gradient-to-b from-[#0F2B46] via-[#1C4E80] to-[#38BDF8] shadow-[0_0_14px_rgba(56,189,248,0.85)] rounded-b-sm will-change-[height]"
                  style={{ height: `${progressPercent}%` }}
                />
              </div>

              {/* 4 Route Waypoint Stations at 0%, 33.3%, 66.6%, 100% */}
              {stationPercentages.map((dotPct, i) => {
                const isReached = progressPercent >= dotPct - 1.5;
                const stationNum = `0${i + 1}`;
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
                    style={{
                      left: '50%',
                      top: `${dotPct}%`,
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-400 ${isReached
                          ? 'bg-[#0F2B46] border-2 border-[#38BDF8] text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.55)] scale-110'
                          : 'bg-white border-2 border-slate-300 text-slate-400 shadow-sm'
                        }`}
                      title={`Milestone Station ${stationNum}`}
                    >
                      {stationNum}
                    </div>
                  </div>
                );
              })}

              {/* ═════════════════════════════════════════════════════════════
                  HERO TRUCK TRANSPORT INDICATOR (64px Focal Point)
                 ═════════════════════════════════════════════════════════════ */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 will-change-[top]"
                style={{
                  left: '50%',
                  top: `${progressPercent}%`,
                }}
              >
                {/* Downward Highway Headlights Beam */}
                <div
                  className="absolute top-[85%] left-1/2 -translate-x-1/2 w-16 h-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0.12) 65%, transparent 100%)',
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                    filter: 'blur(1px)',
                  }}
                />

                {/* Truck Capsule Housing (64px × 64px) */}
                <div
                  className="relative w-16 h-16 rounded-2xl bg-[#0F2B46] border-2 border-[#38BDF8] shadow-[0_12px_30px_rgba(15,43,70,0.45),0_0_24px_rgba(56,189,248,0.4)] flex items-center justify-center cursor-default transform hover:scale-105 transition-transform"
                  title="Volvo Road Train En Route"
                >
                  {/* Outer Pulsing Transport Ring */}
                  <div className="absolute -inset-1 rounded-2xl border border-[#38BDF8]/40 animate-ping pointer-events-none opacity-40" />

                  {/* Top "LIVE" Mini Status Badge */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-[#0B2034] border border-[#38BDF8]/70 rounded text-[8px] font-mono text-[#7DD3FC] font-bold tracking-widest uppercase flex items-center gap-1 shadow-sm select-none">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    ROUTE
                  </div>

                  {/* High-Impact Volvo Prime Mover Truck SVG Icon */}
                  <VolvoTruckMarker />
                </div>
              </div>

            </div>
          </div>

          {/* ── Alternating Steps Content List ──────────────────────────── */}
          {howItWorksData.steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => (stepRefs.current[i] = el)}
            >
              <StepItem
                num={step.num}
                title={step.title}
                desc={step.desc}
                imageSrc={stepImages[i]}
                imageAlt={`Volvo Road Train Engineering: ${step.title}`}
                isVisible={visibleSteps.has(i)}
                isLast={i === howItWorksData.steps.length - 1}
                isReversed={i % 2 !== 0}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
