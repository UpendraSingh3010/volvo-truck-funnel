import React, { useState, useEffect, useRef } from 'react';
import Container from '../layout/Container';
import { proofData } from '../../data/landingContent';

// ─── useCountUp hook ─────────────────────────────────────────────────────────
// Animates 0 → target with an ease-out cubic curve via requestAnimationFrame.
function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let rafId;
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(eased * target);
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, duration]);

  return count;
}

// ─── Letter Reveal component ─────────────────────────────────────────────────
function LetterReveal({ text, triggered, baseDelay = 0 }) {
  return (
    <span aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-all duration-300"
          style={{
            opacity: triggered ? 1 : 0,
            transform: triggered ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: triggered ? `${baseDelay + i * 55}ms` : '0ms',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function TheProofSection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef(null);

  // Trigger animations when the section reaches 25% visibility
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stats count up values
  const countKm = useCountUp(30, 1800, triggered);
  const countYears = useCountUp(1.5, 1800, triggered);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-24 flex flex-col justify-center bg-[#F8FAFC] text-[#0F2B46] border-b border-[#E2E8F0] overflow-hidden select-none"
    >
      {/* Subtle soft-blue ambient depth behind cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 50% at 50% 25%, rgba(28, 78, 128, 0.05), transparent 75%)',
        }}
      />

      <Container className="relative z-10 w-full">

        {/* ─── TOP ROW: Headline (Left) & Operational Telemetry Badge (Right) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
          <div className="max-w-[720px]">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-[#0F2B46]">
              {proofData.headline}
            </h2>
          </div>

          {/* Right: Verification Status Badge with Blue Background & Hover Glow */}
          <div className="relative group cursor-pointer self-start md:self-end">
            {/* Luminous blue glow behind badge on hover */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-400/35 via-blue-600/30 to-cyan-400/35 blur-md opacity-0 group-hover:opacity-100 group-hover:blur-lg transition-all duration-400 pointer-events-none" />

            <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-[3px] bg-[#0F2B46] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] shadow-[0_4px_16px_rgba(15,43,70,0.18)] group-hover:shadow-[0_10px_25px_rgba(15,43,70,0.35),0_0_15px_rgba(56,189,248,0.25)] transition-all duration-300 transform group-hover:-translate-y-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#BAE6FD] group-hover:text-white transition-colors font-semibold">
                COMMERCIAL HIGHWAY RECORD · AUDITED
              </span>
            </div>
          </div>
        </div>

        {/* ─── MIDDLE ROW: 4 Blue Boxes with Subtle Ambient Hover Sheen ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8 sm:mb-10">

          {/* Card 1: 30 LAKH+ KM */}
          <div className="relative group cursor-pointer">
            {/* Subtle soft blue glow behind the box on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            {/* Blue Box with Subdued Hover Gradient */}
            <div className="relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.03] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="flex flex-col justify-between h-full pt-2">
                <div>
                  <div className="min-h-[56px] flex items-baseline flex-nowrap whitespace-nowrap gap-1.5 sm:gap-2">
                    <span className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] font-light leading-none tracking-tight text-white group-hover:text-[#BAE6FD] transition-colors duration-300">
                      {Math.floor(countKm)}
                    </span>
                    <span className="text-xs sm:text-sm lg:text-sm xl:text-base font-semibold text-[#94A3B8] group-hover:text-[#7DD3FC] transition-colors duration-300 whitespace-nowrap shrink-0">
                      LAKH+ KM
                    </span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-[#CBD5E1] uppercase tracking-wider font-medium group-hover:text-white group-hover:tracking-[0.14em] transition-all duration-300 mt-4 leading-relaxed">
                  {proofData.stats[0].label}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: ZERO ACCIDENTS (Single Line) */}
          <div className="relative group cursor-pointer">
            {/* Subtle soft blue glow behind the box on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            {/* Blue Box with Subdued Hover Gradient */}
            <div className="relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.03] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="flex flex-col justify-between h-full pt-2">
                <div>
                  <div className="min-h-[56px] flex items-baseline flex-nowrap whitespace-nowrap gap-1.5 sm:gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[36px] font-light leading-none tracking-tight text-white group-hover:text-[#BAE6FD] transition-colors duration-300">
                      <LetterReveal text="ZERO" triggered={triggered} baseDelay={180} />
                    </span>
                    <span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-semibold text-[#94A3B8] group-hover:text-[#7DD3FC] transition-colors duration-300 whitespace-nowrap shrink-0">
                      ACCIDENTS
                    </span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-[#CBD5E1] uppercase tracking-wider font-medium group-hover:text-white group-hover:tracking-[0.14em] transition-all duration-300 mt-4 leading-relaxed">
                  {proofData.stats[1].label}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: ~25–30 UNITS (Single Line) */}
          <div className="relative group cursor-pointer">
            {/* Subtle soft blue glow behind the box on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            {/* Blue Box with Subdued Hover Gradient */}
            <div className="relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.03] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="flex flex-col justify-between h-full pt-2">
                <div>
                  <div className="min-h-[56px] flex items-baseline flex-nowrap whitespace-nowrap gap-1.5 sm:gap-2">
                    <span
                      className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[36px] font-light leading-none tracking-tight text-white group-hover:text-[#BAE6FD] transition-colors duration-300"
                      style={{
                        opacity: triggered ? 1 : 0,
                        transform: triggered ? 'translateY(0)' : 'translateY(12px)',
                        transition: 'all 500ms ease 300ms',
                      }}
                    >
                      ~25–30
                    </span>
                    <span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-semibold text-[#94A3B8] group-hover:text-[#7DD3FC] transition-colors duration-300 whitespace-nowrap shrink-0">
                      UNITS
                    </span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-[#CBD5E1] uppercase tracking-wider font-medium group-hover:text-white group-hover:tracking-[0.14em] transition-all duration-300 mt-4 leading-relaxed">
                  {proofData.stats[2].label}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: 1.5 YEARS AND COUNTING */}
          <div className="relative group cursor-pointer">
            {/* Subtle soft blue glow behind the box on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            {/* Blue Box with Subdued Hover Gradient */}
            <div className="relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.03] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="flex flex-col justify-between h-full pt-2">
                <div>
                  <div className="min-h-[56px] flex items-baseline flex-nowrap whitespace-nowrap gap-1.5 sm:gap-2">
                    <span className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] font-light leading-none tracking-tight text-white group-hover:text-[#BAE6FD] transition-colors duration-300">
                      {countYears.toFixed(1)}
                    </span>
                    <span className="text-xs sm:text-sm lg:text-sm xl:text-base font-semibold text-[#94A3B8] group-hover:text-[#7DD3FC] transition-colors duration-300 whitespace-nowrap shrink-0">
                      YEARS
                    </span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-[#CBD5E1] uppercase tracking-wider font-medium group-hover:text-white group-hover:tracking-[0.14em] transition-all duration-300 mt-4 leading-relaxed">
                  {proofData.stats[3].label}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM ROW: Blue Quote Block (Left) & Blue Proof Benchmark Summary (Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* Left: Elevated Blue Quote Panel (Placeholder) with Subtle Hover Bloom */}
          <div className="lg:col-span-8 relative group cursor-pointer">
            {/* Subtle soft blue glow behind quote panel on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.015] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            <div className="relative h-full p-6 sm:p-7 md:p-8 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.015] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] flex flex-col justify-between overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-12 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="relative z-10">
                <blockquote className="text-base sm:text-lg md:text-[19px] font-light italic leading-relaxed text-[#F8FAFC] group-hover:text-white transition-colors duration-300 mb-4">
                  "{proofData.quote.text}"
                </blockquote>

                <cite className="text-xs sm:text-sm text-[#38BDF8] group-hover:text-[#7DD3FC] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] not-italic font-semibold tracking-wide block transition-all duration-300">
                  — {proofData.quote.author}
                </cite>
              </div>

              <p className="relative z-10 text-[11px] font-mono text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors duration-300 mt-4 pt-3 border-t border-white/10">
                {proofData.disclaimer}
              </p>
            </div>
          </div>

          {/* Right: Operational Blue Proof Benchmark Summary with Subtle Hover Bloom */}
          <div className="lg:col-span-4 relative group cursor-pointer">
            {/* Subtle soft blue glow behind benchmark panel on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.015] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            <div className="relative h-full p-6 sm:p-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.015] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] flex flex-col justify-between overflow-hidden">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7DD3FC] group-hover:text-white transition-colors duration-300 font-semibold">
                    OPERATIONAL BENCHMARK
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#163859] group-hover:bg-[#1E4974] text-sky-200 group-hover:text-white border border-sky-400/30 group-hover:border-sky-400 transition-all duration-300 font-medium group-hover:shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                    VERIFIED
                  </span>
                </div>

                {/* Metric 1: Corridor Reliability */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#CBD5E1] group-hover:text-white transition-colors duration-300">Fleet Uptime Factor</span>
                    <span className="font-mono text-[#38BDF8] group-hover:text-[#7DD3FC] font-bold transition-colors duration-300">99.4%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1C4E80] to-[#38BDF8] group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: triggered ? '99.4%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Metric 2: Freight Payload Lift */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#CBD5E1] group-hover:text-white transition-colors duration-300">Freight Payload Lift</span>
                    <span className="font-mono text-[#38BDF8] group-hover:text-[#7DD3FC] font-bold transition-colors duration-300">+85% vs Std</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1C4E80] to-[#7DD3FC] group-hover:shadow-[0_0_8px_rgba(125,211,252,0.8)] rounded-full transition-all duration-1000 ease-out delay-200"
                      style={{ width: triggered ? '85%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Metric 3: Carbon Footprint Delta */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#CBD5E1] group-hover:text-white transition-colors duration-300">Corridor Carbon Cut</span>
                    <span className="font-mono text-emerald-400 group-hover:text-emerald-300 font-bold transition-colors duration-300">-30% T-km</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-700 to-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] rounded-full transition-all duration-1000 ease-out delay-300"
                      style={{ width: triggered ? '70%' : '0%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors duration-300">
                <span>Audited Corridor Runs</span>
                <span className="text-white font-semibold">Indian Highway Network</span>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
