import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import closingBg from '../../assets/images/trucks-hero-2.avif';
import { closingCtaData } from '../../data/landingContent';

export default function ClosingCTASection({ onTalkExpert }) {
  const navigate = useNavigate();
  const [showDealerModal, setShowDealerModal] = useState(false);

  const handleTalkExpert = () => {
    if (onTalkExpert) {
      onTalkExpert();
    } else {
      navigate('/assessment');
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-32 flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* ─── Full-bleed background image with Ken Burns effect (Clear & Cinematic) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={closingBg}
          alt="Volvo Road Train disappearing down the highway corridor"
          className="w-full h-full object-cover object-center ken-burns-animate"
        />
        {/* Very light edge-vignette only — keeping photography fully visible and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.35) 100%)',
          }}
        />
      </div>

      {/* ─── Floating Translucent Glassmorphism Content Card ────────────── */}
      <Container className="relative z-10 text-center flex flex-col items-center px-4">
        <div className="relative w-full max-w-[880px] mx-auto">
          {/* Ambient luminous rim bloom */}
          <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-400/20 via-blue-500/15 to-sky-400/20 blur-lg opacity-60 pointer-events-none" />

          {/* Elevated Glass Enclosure — provides 100% crisp contrast for content while surrounding image stays open */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#091E33]/75 backdrop-blur-xl border border-white/20 sm:border-white/25 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.12)] p-6 sm:p-9 md:p-12 text-center flex flex-col items-center">
            
            {/* Executive Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-[#E0F2FE]">STRATEGIC FREIGHT ADVISORY · VOLVO TRUCKS INDIA</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white font-medium leading-[1.2] tracking-tight mb-4 sm:mb-5 max-w-[820px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              {closingCtaData.headline}
            </h2>

            {/* Subline */}
            <p className="text-[#CBD5E1] text-base sm:text-lg md:text-[19px] leading-relaxed mb-6 sm:mb-8 max-w-[640px] font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {closingCtaData.subline}
            </p>

            {/* ─── Trust & Value Signals Micro-Labels ─────────────────── */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-7 sm:mb-9 text-xs sm:text-[12.5px] text-sky-200/90 font-mono">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-400/25 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>No obligation</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-400/25 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom corridor analysis</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-400/25 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Indicative payback & CO₂ model</span>
              </div>
            </div>

            {/* ─── Action Hierarchy CTAs ──────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-[540px]">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleTalkExpert}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-[3px] bg-white text-[#0F2B46] font-semibold text-base shadow-[0_4px_20px_rgba(255,255,255,0.25),0_0_25px_rgba(56,189,248,0.25)] hover:bg-[#F0F7FF] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4),0_0_35px_rgba(56,189,248,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer select-none group"
              >
                <span>{closingCtaData.primaryButtonText}</span>
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => setShowDealerModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-[3px] bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/40 text-white font-medium text-sm sm:text-base backdrop-blur-md shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer select-none"
              >
                <svg className="w-4 h-4 text-sky-300 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{closingCtaData.secondaryButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* ─── Dealer Network Interactive Modal ───────────────────────────── */}
      {showDealerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300"
          onClick={() => setShowDealerModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#0B2540] border border-sky-400/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.25)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowDealerModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Volvo Trucks Network India</h3>
                <p className="text-xs text-slate-400 font-mono">200+ TOUCHPOINTS & DEDICATED ROAD TRAIN 3S HUBS</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Volvo Trucks maintains 200+ authorized sales, service, and genuine parts facilities strategically positioned along key national logistics corridors, including Golden Quadrilateral, Delhi–Mumbai Expressway, and major mineral/cement circuits.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="relative group/card p-3 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 shadow-sm hover:shadow-[0_10px_20px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] overflow-hidden cursor-default">
                <div className="text-sky-400 font-bold mb-0.5 group-hover/card:text-white transition-colors">24/7 Roadside Uptime</div>
                <div className="text-slate-300">Volvo Action Service (VAS) emergency response</div>
              </div>
              <div className="relative group/card p-3 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 shadow-sm hover:shadow-[0_10px_20px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] overflow-hidden cursor-default">
                <div className="text-sky-400 font-bold mb-0.5 group-hover/card:text-white transition-colors">Corridor Certified</div>
                <div className="text-slate-300">High-capacity bays equipped for multi-trailer combos</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDealerModal(false);
                  handleTalkExpert();
                }}
                className="w-full py-3 px-4 rounded-[3px] bg-sky-400 hover:bg-sky-300 text-[#0B2540] font-semibold text-sm transition-all duration-200 text-center"
              >
                Request Corridor Assessment →
              </button>
              <button
                type="button"
                onClick={() => setShowDealerModal(false)}
                className="w-full py-3 px-4 rounded-[3px] bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all duration-200 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
