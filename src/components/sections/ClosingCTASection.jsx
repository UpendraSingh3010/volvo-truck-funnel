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
    <section className="relative w-full py-24 md:py-36 flex flex-col items-center justify-center bg-black overflow-hidden select-none">

      {/* ─── Full-bleed cinematic background — Ken Burns kept ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={closingBg}
          alt="Volvo Road Train disappearing down the highway corridor"
          className="w-full h-full object-cover object-center ken-burns-animate"
        />
        {/* Clean directional vignette — no radial halo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40 pointer-events-none" />
      </div>

      {/* ─── Content — no glassmorphism card, direct text over image ─── */}
      <Container className="relative z-10 text-center flex flex-col items-center px-4">
        <div className="w-full max-w-[760px] mx-auto flex flex-col items-center">

          {/* Flat eyebrow — no pill, no backdrop-blur badge */}
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/55 font-semibold mb-5">
            Strategic Freight Advisory · Volvo Trucks India
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] text-white font-medium leading-[1.15] tracking-tight mb-4 max-w-[720px]">
            {closingCtaData.headline}
          </h2>

          {/* Subline */}
          <p className="text-white/65 text-base md:text-[18px] leading-relaxed mb-8 max-w-[560px] font-normal">
            {closingCtaData.subline}
          </p>

          {/* Trust signals — clean plain text, no badge frames */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-[12px] text-white/50 font-mono">
            {['No obligation', 'Custom corridor analysis', 'Indicative payback & CO₂ model'].map((label, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-[#38BDF8] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[480px]">
            {/* Primary — solid white, clean */}
            <button
              type="button"
              onClick={handleTalkExpert}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0F2B46] font-semibold text-sm hover:bg-[#F0F4F8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              {closingCtaData.primaryButtonText}
            </button>

            {/* Secondary — ghost border on white/25 */}
            <button
              type="button"
              onClick={() => setShowDealerModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-transparent border border-white/30 text-white font-medium text-sm hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {closingCtaData.secondaryButtonText}
            </button>
          </div>

        </div>
      </Container>

      {/* ─── Dealer Network Modal — cleaned ─── */}
      {showDealerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowDealerModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0B2540] border border-[#1C4E80]/60 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowDealerModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#0F2B46] border border-[#1C4E80]/60 flex items-center justify-center text-[#38BDF8]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Volvo Trucks Network India</h3>
                <p className="text-[11px] text-[#64748B] font-mono uppercase tracking-wider">200+ Touchpoints & Road Train 3S Hubs</p>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
              Volvo Trucks maintains 200+ authorized sales, service, and genuine parts facilities strategically positioned along key national logistics corridors, including Golden Quadrilateral, Delhi–Mumbai Expressway, and major mineral/cement circuits.
            </p>

            {/* Info cards — Option A hover */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { title: '24/7 Roadside Uptime', desc: 'Volvo Action Service (VAS) emergency response' },
                { title: 'Corridor Certified', desc: 'High-capacity bays equipped for multi-trailer combos' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group/card p-3 bg-[#0F2B46] border border-[#1C4E80]/50 group-hover:bg-[#112840] hover:bg-[#112840] hover:-translate-y-0.5 transition-all duration-200 cursor-default text-xs"
                >
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group/card:hover:scale-x-100 hover:scale-x-100 transition-transform duration-250" />
                  <div className="text-[#7DD3FC] font-semibold mb-1">{card.title}</div>
                  <div className="text-[#94A3B8]">{card.desc}</div>
                </div>
              ))}
            </div>

            {/* Modal CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => { setShowDealerModal(false); handleTalkExpert(); }}
                className="w-full py-3 px-4 bg-white text-[#0B2540] font-semibold text-sm hover:bg-[#F0F4F8] transition-colors duration-200 text-center cursor-pointer"
              >
                Request Corridor Assessment →
              </button>
              <button
                type="button"
                onClick={() => setShowDealerModal(false)}
                className="w-full py-3 px-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-colors duration-200 text-center cursor-pointer"
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
