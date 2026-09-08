import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import AppCard from '../common/AppCard';
import { applicationsData } from '../../data/landingContent';

export default function WhoItsForSection({ onSelectApplication, onCtaClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Minimalist stroke icons for each industry in electric cyan
  const appIcons = [
    // Long-haul logistics & 3PL (High-speed multi-trailer route)
    <svg key="icon-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="14" height="11" rx="1" />
      <path d="M16 9h4l2 3v4h-6V9z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>,

    // Mining & minerals (Heavy excavation & overburden bucket)
    <svg key="icon-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
    </svg>,

    // Cement & steel (Industrial bulk beams & structure)
    <svg key="icon-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="11" width="18" height="6" rx="1" />
      <path d="M6 19h12" />
    </svg>,

    // Ports & industrial logistics (Port container crane & maritime terminal)
    <svg key="icon-3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20h16" />
      <path d="M12 4v12" />
      <path d="M8 8l4-4 4 4" />
      <rect x="6" y="14" width="12" height="6" rx="1" />
    </svg>,
  ];

  const handleCardSelect = (index, card) => {
    setSelectedIndex(index);
    onSelectApplication?.(card);
  };

  const currentSelection = applicationsData.cards[selectedIndex];

  const handleCtaAction = () => {
    const activeCard = currentSelection;
    if (onCtaClick) {
      onCtaClick(activeCard);
    } else {
      navigate(`/assessment?app=${activeCard.id}`);
    }
  };

  const dynamicCtaText = currentSelection?.industry
    ? `See ${currentSelection.industry} numbers →`
    : applicationsData.ctaText;

  return (
    <section className="relative w-full min-h-screen md:min-h-0 py-16 md:py-24 flex flex-col justify-center bg-[#F8FAFC] text-[#0F2B46] border-b border-[#E2E8F0] select-none overflow-hidden">
      {/* Subtle soft-blue ambient depth behind cards (Matches Proof Section) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 50% at 50% 25%, rgba(28, 78, 128, 0.05), transparent 75%)',
        }}
      />

      <Container className="relative z-10 w-full">
        {/* ─── Top Row: Section Headline & Status Badge (Matches Proof Section) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
          <div className="max-w-[720px]">

            <h2 className="text-3xl sm:text-4xl md:text-[42px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-3">
              {applicationsData.headline}
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              {applicationsData.intro}
            </p>
          </div>

          {/* Right: Operational Status Badge with Blue Background & Hover Glow */}
          <div className="relative group cursor-pointer self-start md:self-end">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-400/35 via-blue-600/30 to-cyan-400/35 blur-md opacity-0 group-hover:opacity-100 group-hover:blur-lg transition-all duration-400 pointer-events-none" />

            <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-[3px] bg-[#0F2B46] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] shadow-[0_4px_16px_rgba(15,43,70,0.18)] group-hover:shadow-[0_10px_25px_rgba(15,43,70,0.35),0_0_15px_rgba(56,189,248,0.25)] transition-all duration-300 transform group-hover:-translate-y-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#BAE6FD] group-hover:text-white transition-colors font-semibold">
                COMMERCIAL CORRIDORS · 4 APPLICATION MODELS
              </span>
            </div>
          </div>
        </div>

        {/* ─── Middle Row: 4 Blue Application Selector Cards (Matches Proof Section) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {applicationsData.cards.map((card, i) => (
            <AppCard
              key={card.id}
              index={i}
              title={card.title}
              desc={card.desc}
              icon={appIcons[i]}
              isHovered={hoveredCard === i}
              isSelected={selectedIndex === i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onSelect={() => handleCardSelect(i, card)}
            />
          ))}
        </div>

        {/* ─── Bottom Row: Blue Selected Profile Panel with Hover Scale & Subdued Background Gradient ─── */}
        {currentSelection?.subCopy && (
          <div className="mb-8 sm:mb-10 relative group cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.015]">
            {/* Subtle soft blue glow behind details panel on hover */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.015] group-hover:blur-xl transition-all duration-500 pointer-events-none" />

            {/* Main Panel Box with Subdued Background Gradient */}
            <div className="relative h-full p-6 sm:p-7 md:p-8 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] overflow-hidden flex flex-col justify-between">
              {/* Soft inner ambient top sheen on hover */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top blue accent line */}
              <div className="absolute top-0 left-0 w-12 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

              <div className="relative z-10">
                {/* Panel Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2 select-none">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#7DD3FC] group-hover:text-white transition-colors duration-300">
                      {currentSelection.industry} CORRIDOR BLUEPRINT · SPECIFICATION
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors duration-300">
                    CONFIGURED FOR VOLVO MULTI-TRAILER COMBINATIONS
                  </span>
                </div>

                {/* 4-Column Compact Metric Grid with Subdued Hover Gradient & Font Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {/* Box 1: Corridor Route */}
                  <div className="group/metric relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(15,43,70,0.18)] hover:shadow-[0_12px_24px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] cursor-pointer">
                    {/* Soft inner ambient top sheen on hover */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Top blue accent line */}
                    <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#38BDF8]/40 group-hover/metric:w-full group-hover/metric:bg-[#38BDF8] transition-all duration-300" />

                    <span className="relative z-10 text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/75 group-hover/metric:text-[#38BDF8] transition-colors duration-300 mb-2">
                      CORRIDOR ROUTE
                    </span>
                    <span className="relative z-10 text-sm font-medium text-white group-hover/metric:text-[#BAE6FD] group-hover/metric:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-colors duration-300 leading-snug">
                      {currentSelection.subCopy.routeExample}
                    </span>
                  </div>

                  {/* Box 2: Key Savings Stat */}
                  <div className="group/metric relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(15,43,70,0.18)] hover:shadow-[0_12px_24px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] cursor-pointer">
                    {/* Soft inner ambient top sheen on hover */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Top blue accent line */}
                    <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#38BDF8]/40 group-hover/metric:w-full group-hover/metric:bg-[#38BDF8] transition-all duration-300" />

                    <span className="relative z-10 text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/75 group-hover/metric:text-[#38BDF8] transition-colors duration-300 mb-2">
                      KEY SAVINGS METRIC
                    </span>
                    <span className="relative z-10 text-sm font-bold text-[#38BDF8] group-hover/metric:text-[#7DD3FC] group-hover/metric:drop-shadow-[0_0_14px_rgba(56,189,248,0.85)] transition-all duration-300 leading-snug">
                      {currentSelection.subCopy.keySavings}
                    </span>
                  </div>

                  {/* Box 3: Typical Fleet */}
                  <div className="group/metric relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(15,43,70,0.18)] hover:shadow-[0_12px_24px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] cursor-pointer">
                    {/* Soft inner ambient top sheen on hover */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Top blue accent line */}
                    <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#38BDF8]/40 group-hover/metric:w-full group-hover/metric:bg-[#38BDF8] transition-all duration-300" />

                    <span className="relative z-10 text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/75 group-hover/metric:text-[#38BDF8] transition-colors duration-300 mb-2">
                      TYPICAL FLEET PROFILE
                    </span>
                    <span className="relative z-10 text-sm font-medium text-white group-hover/metric:text-[#BAE6FD] group-hover/metric:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-colors duration-300 leading-snug">
                      {currentSelection.subCopy.typicalFleet}
                    </span>
                  </div>

                  {/* Box 4: Operational Impact */}
                  <div className="group/metric relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 rounded-[4px] bg-[#0F2B46] hover:bg-gradient-to-br hover:from-[#113252] hover:via-[#0F2B46] hover:to-[#0C243B] border border-[#1C4E80]/70 hover:border-[#38BDF8] transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(15,43,70,0.18)] hover:shadow-[0_12px_24px_rgba(15,43,70,0.25),0_0_12px_rgba(56,189,248,0.12)] cursor-pointer">
                    {/* Soft inner ambient top sheen on hover */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Top blue accent line */}
                    <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#38BDF8]/40 group-hover/metric:w-full group-hover/metric:bg-[#38BDF8] transition-all duration-300" />

                    <span className="relative z-10 text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/75 group-hover/metric:text-[#38BDF8] transition-colors duration-300 mb-2">
                      OPERATIONAL IMPACT
                    </span>
                    <span className="relative z-10 text-sm font-medium text-white group-hover/metric:text-[#BAE6FD] group-hover/metric:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-colors duration-300 leading-snug">
                      {currentSelection.subCopy.impact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>Corridor Simulation Status</span>
                <span className="text-[#38BDF8] font-semibold">Active Operational Model</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Dynamic CTA Button Area ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            onClick={handleCtaAction}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F2B46] hover:bg-[#163859] text-white font-semibold text-sm sm:text-base rounded-[3px] shadow-[0_4px_16px_rgba(15,43,70,0.25)] hover:shadow-[0_8px_24px_rgba(15,43,70,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{dynamicCtaText}</span>
          </button>
          <span className="text-xs font-mono text-[#64748B]">
            Custom corridor route calculation available on assessment submission.
          </span>
        </div>
      </Container>
    </section>
  );
}
