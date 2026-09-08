import React, { useState, useEffect, useRef } from 'react';
import Container from '../layout/Container';
import { sustainabilityData } from '../../data/landingContent';

// Standard Single-Trailer Truck SVG Icon (styled for dark blue card)
function StandardTruckSvg({ className = '' }) {
  return (
    <svg width="66" height="28" viewBox="0 0 68 28" fill="none" className={className}>
      {/* Trailer Box */}
      <rect x="2" y="3" width="38" height="17" rx="1.5" stroke="#94A3B8" strokeWidth="1.5" fill="#143452" />
      <line x1="14" y1="3" x2="14" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="26" y1="3" x2="26" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      
      {/* Coupling link */}
      <line x1="40" y1="16" x2="44" y2="16" stroke="#94A3B8" strokeWidth="2.5" />
      
      {/* Cab Body */}
      <path d="M44 7h10l6 6v7h-16V7z" stroke="#CBD5E1" strokeWidth="1.5" fill="#1A426A" />
      {/* Cab Window */}
      <path d="M50 9h4l3 4H50v-4z" fill="#93C5FD" opacity="0.4" />
      {/* Exhaust pipe */}
      <line x1="46" y1="2" x2="46" y2="7" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Wheels */}
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

// Volvo Road Train SVG (styled with crisp white & luminous blue for dark blue card)
function RoadTrainSvg({ className = '' }) {
  return (
    <svg width="134" height="28" viewBox="0 0 134 28" fill="none" className={className}>
      {/* Rear Trailer (Trailer 2) */}
      <rect x="2" y="3" width="36" height="17" rx="1.5" stroke="#60A5FA" strokeWidth="1.5" fill="#153A60" />
      <line x1="14" y1="3" x2="14" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="26" y1="3" x2="26" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      
      {/* Dolly Interlink */}
      <line x1="38" y1="16" x2="44" y2="16" stroke="#60A5FA" strokeWidth="2.5" />
      <circle cx="41" cy="21" r="2.5" stroke="#60A5FA" strokeWidth="1.5" fill="#0B1E32" />
      
      {/* Front Trailer (Trailer 1) */}
      <rect x="44" y="3" width="38" height="17" rx="1.5" stroke="#60A5FA" strokeWidth="1.5" fill="#153A60" />
      <line x1="56" y1="3" x2="56" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="68" y1="3" x2="68" y2="20" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      
      {/* Fifth wheel coupling */}
      <line x1="82" y1="16" x2="88" y2="16" stroke="#60A5FA" strokeWidth="2.5" />
      
      {/* Volvo FH Prime Mover Cab */}
      <path d="M88 5h12l7 7v8h-19V5z" stroke="#FFFFFF" strokeWidth="1.5" fill="#1D4E80" />
      {/* Windshield */}
      <path d="M96 7h4l4 5H96v-5z" fill="#38BDF8" opacity="0.85" />
      {/* Volvo Aerodynamic Deflector */}
      <path d="M88 5c0-2 4-3 10-3v3H88z" fill="#FFFFFF" opacity="0.9" />
      {/* Stack */}
      <line x1="90" y1="1" x2="90" y2="5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Wheels */}
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
      className="relative w-full min-h-screen md:min-h-0 md:py-28 py-16 flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FB] to-[#EBF2F8] border-b border-[#E2E8F0] overflow-hidden select-none"
    >
      {/* ─── Gentle Ambient Halo Behind Center ─────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] lg:w-[1050px] h-[400px] sm:h-[500px] pointer-events-none blur-3xl opacity-75"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.12) 0%, rgba(16,185,129,0.08) 45%, transparent 75%)',
        }}
      />

      <Container className="relative z-10 flex flex-col items-center">
        {/* ─── Narrative Header ────────────────────────────────────────── */}
        <div className="max-w-[780px] mx-auto px-4 mb-8 sm:mb-10 md:mb-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F2B46]/5 border border-[#0F2B46]/10 text-[#0F2B46] text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Decarbonisation By Design</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-4 sm:mb-5">
            {sustainabilityData.headline}
          </h2>
          <p className="text-[#556980] text-base sm:text-lg md:text-[18px] leading-relaxed font-normal">
            {sustainabilityData.body}
          </p>
        </div>

        {/* ─── Unified Elevated Frame Containing Both Panels ───────────── */}
        <div className="relative w-full max-w-[960px] mx-auto">
          {/* Subtle luminous aura hugging the frame */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-400/20 via-emerald-400/15 to-sky-400/20 blur-xl opacity-70 pointer-events-none" />

          {/* Elevated Architectural Enclosure */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(15,43,70,0.08),0_2px_6px_rgba(0,0,0,0.03)] p-4 sm:p-6 md:p-8">
            
            {/* Frame Top Telemetry Bar */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-slate-200/80 text-left">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                  Corridor Emissions Benchmark · Transport Audit
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10.5px] font-mono uppercase text-slate-400 tracking-wider">
                Baseline Fleet vs Road Train
              </span>
            </div>

            {/* Comparison Grid with Centered VS Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-stretch relative">
              
              {/* Horizontal linking bridge line (desktop) */}
              <div className="hidden md:block absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-sky-400/25 to-transparent pointer-events-none z-10" />

              {/* ── LEFT BOX: Old Way (Neutral Industrial Slate/Navy) ── */}
              <div
                className="relative group cursor-pointer transition-all duration-700 ease-out"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateX(0)' : 'translateX(-28px)',
                }}
              >
                {/* Subtle soft blue glow behind the box on hover */}
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

                {/* Unified Card Container with Subdued Hover Gradient */}
                <div className="relative h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.025] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] text-left">
                  {/* Soft inner ambient top sheen on hover */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top blue accent line */}
                  <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between w-full mb-3 pb-2.5 border-b border-[#1C4E80]/70">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#CBD5E1] group-hover:text-white transition-colors duration-300">
                        Old Way: 3 Standard Trucks
                      </span>
                      <span className="text-[10px] font-semibold text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded border border-rose-800/40">
                        Higher Emissions
                      </span>
                    </div>

                    {/* 3 Trucks driving in from left with staggered delays */}
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
                          <div>
                            <StandardTruckSvg />
                          </div>
                          {/* Animated rising smoke plume */}
                          <div className="flex items-center gap-1.5 pl-2">
                            <span className="text-[10px] text-slate-400 font-mono">CO₂</span>
                            <div className={`plume-animate-${idx + 1}`}>
                              <SmokePlumeSvg color="#94A3B8" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] w-full border-t border-[#1C4E80]/70 font-medium transition-colors duration-300">
                    3 Engines · 3 Drivers · 3× Road Footprint
                  </div>
                </div>
              </div>

              {/* ── Central Glowing VS Badge ── */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#0A1F36] border-2 border-sky-400 text-white font-bold text-xs items-center justify-center shadow-[0_0_24px_rgba(56,189,248,0.5),0_4px_12px_rgba(0,0,0,0.3)]">
                VS
              </div>

              {/* Mobile VS separator pill */}
              <div className="flex md:hidden items-center justify-center my-[-8px] z-20">
                <span className="px-3 py-1 rounded-full bg-[#0A1F36] border border-sky-400 text-white font-bold text-[11px] shadow-[0_0_16px_rgba(56,189,248,0.4)]">
                  VS
                </span>
              </div>

              {/* ── RIGHT BOX: Road Train (Greener, High-Efficiency Navy/Sky) ── */}
              <div
                className="relative group cursor-pointer transition-all duration-700 ease-out"
                style={{
                  transitionDelay: '350ms',
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateX(0)' : 'translateX(28px)',
                }}
              >
                {/* Subtle soft blue glow behind the box on hover */}
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

                {/* Unified Card Container with Subdued Hover Gradient */}
                <div className="relative h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.025] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] text-left">
                  {/* Soft inner ambient top sheen on hover */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top blue accent line */}
                  <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between w-full mb-3 pb-2.5 border-b border-[#1C4E80]/70">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-[#BAE6FD] transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
                        Road Train: 1 Combination
                      </span>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/85 px-2.5 py-0.5 rounded border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.35)]">
                        −30% to −40% CO₂
                      </span>
                    </div>

                    {/* 1 Road Train with 1 clean reduced plume */}
                    <div className="flex items-center justify-between w-full py-5 sm:py-6">
                      <div>
                        <RoadTrainSvg />
                      </div>
                      {/* Clean smaller luminous plume */}
                      <div className="flex items-center gap-1.5 pl-2">
                        <span className="text-[10px] text-emerald-300 font-bold font-mono drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">
                          −38%
                        </span>
                        <div className="plume-clean">
                          <SmokePlumeSvg color="#34D399" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 text-[11px] text-[#CBD5E1] group-hover:text-white font-medium w-full border-t border-[#1C4E80]/70 flex items-center justify-between transition-colors duration-300">
                    <span>1 Volvo Prime Mover · 1 Driver</span>
                    <span className="text-emerald-300 font-semibold drop-shadow-[0_0_6px_rgba(52,211,153,0.5)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Scope 1 & 3 Compliant
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


