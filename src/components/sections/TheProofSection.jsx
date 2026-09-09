import React, { useState, useEffect, useRef } from 'react';
import Container from '../layout/Container';
import { proofData } from '../../data/landingContent';

// ─── useCountUp hook ─────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let rafId;
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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

  const countKm = useCountUp(30, 1800, triggered);
  const countYears = useCountUp(1.5, 1800, triggered);

  // Shared stat card classes — Option A hover: left scaleX sweep + bg shift
  const cardBase = 'relative overflow-hidden h-full px-6 py-7 bg-[#0F2B46] border border-[#1C4E80]/60 transition-all duration-250 ease-out group-hover:bg-[#112840] group-hover:-translate-y-1';
  const panelBase = 'relative overflow-hidden h-full p-7 md:p-8 bg-[#0F2B46] border border-[#1C4E80]/60 transition-all duration-250 ease-out group-hover:bg-[#112840] group-hover:-translate-y-1';
  // Left accent sweep div — reused inside every card
  const accentSweep = <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-[#F5F5F5] border-b border-[#E0E0E0] select-none"
    >
      <Container className="w-full">

        {/* ─── TOP ROW: Headline (Left) & Status Badge (Right) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-[600px]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#1C4E80] font-semibold mb-3">
              Commercial Highway Record
            </p>
            <h2 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-[#0F2B46]">
              {proofData.headline}
            </h2>
          </div>

          {/* Clean flat badge — no glow */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0F2B46] border border-[#1C4E80]/60 self-start md:self-end">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#BAE6FD] font-semibold">
              Audited · Verified
            </span>
          </div>
        </div>

        {/* ─── STAT CARDS ROW: 4 flat dark navy cards ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

          {/* Card 1: 30 LAKH+ KM */}
          <div className="group cursor-default">
            <div className={cardBase}>
              {accentSweep}
              <div className="w-6 h-[2px] bg-[#38BDF8]/50 mb-6" />
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[42px] font-light leading-none tracking-tight text-white">
                  {Math.floor(countKm)}
                </span>
                <span className="text-sm font-semibold text-[#7DD3FC] whitespace-nowrap">
                  LAKH+ KM
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] uppercase tracking-wider font-medium leading-relaxed transition-colors duration-200">
                {proofData.stats[0].label}
              </div>
            </div>
          </div>

          {/* Card 2: ZERO ACCIDENTS */}
          <div className="group cursor-default">
            <div className={cardBase}>
              {accentSweep}
              <div className="w-6 h-[2px] bg-[#38BDF8]/50 mb-6" />
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[42px] font-light leading-none tracking-tight text-white">
                  <LetterReveal text="ZERO" triggered={triggered} baseDelay={180} />
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] uppercase tracking-wider font-medium leading-relaxed transition-colors duration-200">
                {proofData.stats[1].label}
              </div>
            </div>
          </div>

          {/* Card 3: ~25–30 UNITS */}
          <div className="group cursor-default">
            <div className={cardBase}>
              {accentSweep}
              <div className="w-6 h-[2px] bg-[#38BDF8]/50 mb-6" />
              <div
                className="flex items-baseline gap-2 mb-4"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 500ms ease 300ms',
                }}
              >
                <span className="text-[42px] font-light leading-none tracking-tight text-white">
                  ~25–30
                </span>
                <span className="text-sm font-semibold text-[#7DD3FC] whitespace-nowrap">
                  UNITS
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] uppercase tracking-wider font-medium leading-relaxed transition-colors duration-200">
                {proofData.stats[2].label}
              </div>
            </div>
          </div>

          {/* Card 4: 1.5 YEARS */}
          <div className="group cursor-default">
            <div className={cardBase}>
              {accentSweep}
              <div className="w-6 h-[2px] bg-[#38BDF8]/50 mb-6" />
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[42px] font-light leading-none tracking-tight text-white">
                  {countYears.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-[#7DD3FC] whitespace-nowrap">
                  YEARS
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] group-hover:text-[#CBD5E1] uppercase tracking-wider font-medium leading-relaxed transition-colors duration-200">
                {proofData.stats[3].label}
              </div>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM ROW: Quote (Left) & Benchmark Panel (Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Quote Panel */}
          <div className="lg:col-span-8 group cursor-default">
            <div className={panelBase + ' flex flex-col justify-between'}>
              {accentSweep}
              <div>
                <div className="w-6 h-[2px] bg-[#38BDF8]/50 mb-6" />
                <blockquote className="text-lg md:text-[19px] font-light italic leading-relaxed text-[#F0F4F8] mb-4">
                  "{proofData.quote.text}"
                </blockquote>
                <cite className="text-sm text-[#7DD3FC] not-italic font-semibold tracking-wide block">
                  — {proofData.quote.author}
                </cite>
              </div>
              <p className="text-[11px] font-mono text-[#64748B] mt-6 pt-4 border-t border-white/10">
                {proofData.disclaimer}
              </p>
            </div>
          </div>

          {/* Benchmark Panel */}
          <div className="lg:col-span-4 group cursor-default">
            <div className={panelBase + ' flex flex-col justify-between'}>
              {accentSweep}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-6 h-[2px] bg-[#38BDF8]/50" />
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#163859] text-sky-200 border border-sky-400/30 font-medium uppercase tracking-wider">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#7DD3FC] font-semibold mb-5">
                  Operational Benchmark
                </p>

                {/* Metric 1 */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2 font-medium">
                    <span className="text-[#CBD5E1]">Fleet Uptime Factor</span>
                    <span className="font-mono text-[#38BDF8] font-bold">99.4%</span>
                  </div>
                  <div className="w-full h-[3px] bg-[#1C4E80]/40">
                    <div
                      className="h-full bg-[#38BDF8] transition-all duration-1000 ease-out"
                      style={{ width: triggered ? '99.4%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2 font-medium">
                    <span className="text-[#CBD5E1]">Freight Payload Lift</span>
                    <span className="font-mono text-[#38BDF8] font-bold">+85% vs Std</span>
                  </div>
                  <div className="w-full h-[3px] bg-[#1C4E80]/40">
                    <div
                      className="h-full bg-[#7DD3FC] transition-all duration-1000 ease-out delay-200"
                      style={{ width: triggered ? '85%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-2 font-medium">
                    <span className="text-[#CBD5E1]">Corridor Carbon Cut</span>
                    <span className="font-mono text-emerald-400 font-bold">−30% T-km</span>
                  </div>
                  <div className="w-full h-[3px] bg-[#1C4E80]/40">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-1000 ease-out delay-300"
                      style={{ width: triggered ? '70%' : '0%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
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
