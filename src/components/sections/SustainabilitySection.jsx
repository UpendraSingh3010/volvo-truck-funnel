import React, { useState, useEffect, useRef } from 'react';
import Container from '../layout/Container';
import { sustainabilityData } from '../../data/landingContent';

// Standard Single-Trailer Truck SVG Icon
function StandardTruckSvg({ className = '' }) {
  return (
    <svg width="66" height="28" viewBox="0 0 68 28" fill="none" className={className}>
      <rect x="2" y="3" width="38" height="17" rx="1.5" stroke="#94A3B8" strokeWidth="1.5" fill="#143452" />
      <line x1="14" y1="3" x2="14" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="26" y1="3" x2="26" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="40" y1="16" x2="44" y2="16" stroke="#94A3B8" strokeWidth="2.5" />
      <path d="M44 7h10l6 6v7h-16V7z" stroke="#CBD5E1" strokeWidth="1.5" fill="#1A426A" />
      <path d="M50 9h4l3 4H50v-4z" fill="#93C5FD" opacity="0.4" />
      <line x1="46" y1="2" x2="46" y2="7" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="21" r="3" stroke="#CBD5E1" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="18" cy="21" r="3" stroke="#CBD5E1" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="56" cy="21" r="3" stroke="#CBD5E1" strokeWidth="1.5" fill="#0B1E32" />
    </svg>
  );
}

// Smoke Plume SVG
function SmokePlumeSvg({ color = '#94A3B8', className = '' }) {
  return (
    <svg width="20" height="16" viewBox="0 0 24 20" fill={color} className={className}>
      <path d="M4 14a3 3 0 0 1 4.5-2.6A4 4 0 0 1 15 10a3.5 3.5 0 0 1 5 3.2A2.8 2.8 0 0 1 18 16H5a3 3 0 0 1-1-2z" opacity="0.85" />
    </svg>
  );
}

// Volvo Road Train SVG
function RoadTrainSvg({ className = '' }) {
  return (
    <svg width="134" height="28" viewBox="0 0 134 28" fill="none" className={className}>
      <rect x="2" y="3" width="36" height="17" rx="1.5" stroke="#60A5FA" strokeWidth="1.5" fill="#153A60" />
      <line x1="14" y1="3" x2="14" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="26" y1="3" x2="26" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="38" y1="16" x2="44" y2="16" stroke="#60A5FA" strokeWidth="2.5" />
      <circle cx="41" cy="21" r="2.5" stroke="#60A5FA" strokeWidth="1.5" fill="#0B1E32" />
      <rect x="44" y="3" width="38" height="17" rx="1.5" stroke="#60A5FA" strokeWidth="1.5" fill="#153A60" />
      <line x1="56" y1="3" x2="56" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="68" y1="3" x2="68" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="82" y1="16" x2="88" y2="16" stroke="#60A5FA" strokeWidth="2.5" />
      <path d="M88 5h12l7 7v8h-19V5z" stroke="#FFFFFF" strokeWidth="1.5" fill="#1D4E80" />
      <path d="M96 7h4l4 5H96v-5z" fill="#38BDF8" opacity="0.85" />
      <path d="M88 5c0-2 4-3 10-3v3H88z" fill="#FFFFFF" opacity="0.9" />
      <line x1="90" y1="1" x2="90" y2="5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="16" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="50" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="58" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="94" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
      <circle cx="102" cy="21" r="3" stroke="#FFFFFF" strokeWidth="1.5" fill="#0B1E32" />
    </svg>
  );
}

export default function SustainabilitySection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-[#F5F5F5] border-b border-[#E0E0E0] select-none"
    >
      <Container className="flex flex-col items-center text-center">

        {/* ─── Section Header ─── */}
        <div className="max-w-[680px] mx-auto mb-12 md:mb-16">
          {/* Flat eyebrow — no pill badge */}
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#1C4E80] font-semibold mb-4">
            Decarbonisation by Design
          </p>
          <h2 className="text-3xl md:text-[42px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-4">
            {sustainabilityData.headline}
          </h2>
          <p className="text-[#556980] text-base md:text-[18px] leading-relaxed">
            {sustainabilityData.body}
          </p>
        </div>

        {/* ─── Comparison Frame ─── */}
        <div className="w-full max-w-[960px] mx-auto">

          {/* Clean white frame — no backdrop blur, no aura */}
          <div className="bg-white border border-[#E0E0E0] shadow-[0_4px_24px_rgba(15,43,70,0.06)] p-5 sm:p-7 md:p-8">

            {/* Frame Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E0E0E0] text-left">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                  Corridor Emissions Benchmark · Transport Audit
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10.5px] font-mono uppercase text-[#94A3B8] tracking-wider">
                Baseline Fleet vs Road Train
              </span>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch relative">

              {/* Desktop VS divider — clean thin line, no gradient */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#E0E0E0] -translate-x-1/2 z-10" />

              {/* ── LEFT CARD: Old Way ── */}
              <div
                className="relative group cursor-default overflow-hidden transition-all duration-700 ease-out"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateX(0)' : 'translateX(-28px)',
                }}
              >
                {/* Option A: left accent scaleX sweep on hover */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20" />

                <div className="h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 bg-[#0F2B46] group-hover:bg-[#112840] border border-[#1C4E80]/60 transition-all duration-300 ease-out group-hover:-translate-y-1 text-left">

                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C4E80]/50">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#CBD5E1] group-hover:text-white transition-colors duration-200">
                      Old Way: 3 Standard Trucks
                    </span>
                    <span className="text-[10px] font-semibold text-rose-300 bg-rose-950/60 px-2.5 py-0.5 border border-rose-800/40">
                      Higher Emissions
                    </span>
                  </div>

                  {/* 3 Trucks — staggered slide-in */}
                  <div className="flex flex-col gap-2.5 w-full py-1.5">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between transition-all duration-700 ease-out"
                        style={{
                          transitionDelay: `${idx * 130}ms`,
                          transform: triggered ? 'translateX(0)' : 'translateX(-30px)',
                          opacity: triggered ? 1 : 0,
                        }}
                      >
                        <StandardTruckSvg />
                        <div className="flex items-center gap-1.5 pl-2">
                          <span className="text-[10px] text-slate-400 font-mono">CO₂</span>
                          <div className={`plume-animate-${idx + 1}`}>
                            <SmokePlumeSvg color="#94A3B8" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="mt-4 pt-3 text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] border-t border-[#1C4E80]/50 font-medium transition-colors duration-200">
                    3 Engines · 3 Drivers · 3× Road Footprint
                  </div>
                </div>
              </div>

              {/* ── VS Badge (desktop center) ── */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white border border-[#E0E0E0] text-[#0F2B46] font-bold text-[11px] items-center justify-center shadow-sm">
                VS
              </div>

              {/* Mobile VS separator */}
              <div className="flex md:hidden items-center justify-center my-[-8px] z-20">
                <span className="px-3 py-1 bg-white border border-[#E0E0E0] text-[#0F2B46] font-bold text-[11px] shadow-sm">
                  VS
                </span>
              </div>

              {/* ── RIGHT CARD: Road Train ── */}
              <div
                className="relative group cursor-default overflow-hidden transition-all duration-700 ease-out"
                style={{
                  transitionDelay: '350ms',
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateX(0)' : 'translateX(28px)',
                }}
              >
                {/* Option A: left accent scaleX sweep on hover */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20" />

                <div className="h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 bg-[#0F2B46] group-hover:bg-[#112840] border border-[#1C4E80]/60 transition-all duration-300 ease-out group-hover:-translate-y-1 text-left">

                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C4E80]/50">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                      Road Train: 1 Combination
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 border border-emerald-700/50">
                      −30% to −40% CO₂
                    </span>
                  </div>

                  {/* Road Train SVG */}
                  <div className="flex items-center justify-between w-full py-5 sm:py-6">
                    <RoadTrainSvg />
                    <div className="flex items-center gap-1.5 pl-2">
                      <span className="text-[10px] text-emerald-300 font-bold font-mono">
                        −38%
                      </span>
                      <div className="plume-clean">
                        <SmokePlumeSvg color="#34D399" />
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="mt-4 pt-3 text-[11px] text-[#CBD5E1] group-hover:text-white border-t border-[#1C4E80]/50 font-medium flex items-center justify-between transition-colors duration-200">
                    <span>1 Volvo Prime Mover · 1 Driver</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Scope 1 &amp; 3 Compliant
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
