import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import AppCard from '../common/AppCard';
import { applicationsData } from '../../data/landingContent';

export default function WhoItsForSection({ onSelectApplication, onCtaClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Minimalist stroke icons for each industry
  const appIcons = [
    // Long-haul logistics & 3PL
    <svg key="icon-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="14" height="11" rx="1" />
      <path d="M16 9h4l2 3v4h-6V9z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>,

    // Mining & minerals
    <svg key="icon-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
    </svg>,

    // Cement & steel
    <svg key="icon-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="11" width="18" height="6" rx="1" />
      <path d="M6 19h12" />
    </svg>,

    // Ports & industrial logistics
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

  // Metric box: Option A — left accent scaleX sweep + subtle bg lift
  const metricBox = 'relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 bg-[#0B1E32] border border-[#1C4E80]/50 group/metric hover:bg-[#0F2B46] hover:-translate-y-1 transition-all duration-250 ease-out cursor-default';

  return (
    <section className="relative w-full py-20 md:py-28 bg-white border-b border-[#E0E0E0] select-none">
      <Container className="w-full">

        {/* ─── Top Row: Headline & Status Badge ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-[600px]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#1C4E80] font-semibold mb-3">
              Commercial Application Models
            </p>
            <h2 className="text-3xl md:text-[42px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-3">
              {applicationsData.headline}
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              {applicationsData.intro}
            </p>
          </div>

          {/* Flat status badge — no glow */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0F2B46] border border-[#1C4E80]/60 self-start md:self-end">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#BAE6FD] font-semibold">
              4 Application Models
            </span>
          </div>
        </div>

        {/* ─── 4 Application Selector Cards ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

        {/* ─── Selected Industry Detail Panel ─── */}
        {currentSelection?.subCopy && (
          <div className="mb-10">
            {/* Main Panel — Option A: left accent sweep + bg shift */}
            <div className="relative overflow-hidden p-6 sm:p-7 md:p-8 bg-[#0F2B46] border border-[#1C4E80]/60 hover:bg-[#112840] hover:border-[#1C4E80]/80 transition-all duration-300 ease-out group/panel">
              {/* Left accent sweep */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover/panel:scale-x-100 transition-transform duration-350 ease-out" />

              {/* Panel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span className="text-xs font-mono uppercase tracking-widest font-semibold text-[#7DD3FC]">
                    {currentSelection.industry} Corridor Blueprint · Specification
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Configured for Volvo Multi-Trailer Combinations
                </span>
              </div>

              {/* 4 Metric Sub-boxes — flat, no glow, no gradient */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                {/* Box 1: Corridor Route */}
                <div className={metricBox}>
                  {/* Left accent sweep */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-300 ease-out" />
                  <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/70 group-hover/metric:text-[#7DD3FC] transition-colors duration-200 mb-3">
                    Corridor Route
                  </span>
                  <span className="text-sm font-medium text-white/80 group-hover/metric:text-white transition-colors duration-200 leading-snug">
                    {currentSelection.subCopy.routeExample}
                  </span>
                </div>

                {/* Box 2: Key Savings */}
                <div className={metricBox}>
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-300 ease-out" />
                  <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/70 group-hover/metric:text-[#7DD3FC] transition-colors duration-200 mb-3">
                    Key Savings Metric
                  </span>
                  <span className="text-sm font-bold text-[#38BDF8] leading-snug">
                    {currentSelection.subCopy.keySavings}
                  </span>
                </div>

                {/* Box 3: Typical Fleet */}
                <div className={metricBox}>
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-300 ease-out" />
                  <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/70 group-hover/metric:text-[#7DD3FC] transition-colors duration-200 mb-3">
                    Typical Fleet Profile
                  </span>
                  <span className="text-sm font-medium text-white/80 group-hover/metric:text-white transition-colors duration-200 leading-snug">
                    {currentSelection.subCopy.typicalFleet}
                  </span>
                </div>

                {/* Box 4: Operational Impact */}
                <div className={metricBox}>
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-300 ease-out" />
                  <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#7DD3FC]/70 group-hover/metric:text-[#7DD3FC] transition-colors duration-200 mb-3">
                    Operational Impact
                  </span>
                  <span className="text-sm font-medium text-white/80 group-hover/metric:text-white transition-colors duration-200 leading-snug">
                    {currentSelection.subCopy.impact}
                  </span>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>Corridor Simulation Status</span>
                <span className="text-[#38BDF8] font-semibold">Active Operational Model</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── CTA ─── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            onClick={handleCtaAction}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0F2B46] hover:bg-[#163859] text-white font-semibold text-sm border border-[#1C4E80]/60 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{dynamicCtaText}</span>
          </button>
          <span className="text-xs font-mono text-[#94A3B8]">
            Custom corridor route calculation available on assessment submission.
          </span>
        </div>

      </Container>
    </section>
  );
}
