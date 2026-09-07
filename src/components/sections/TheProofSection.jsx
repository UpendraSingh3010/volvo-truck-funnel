import React from 'react';
import Container from '../layout/Container';
import { proofData } from '../../data/landingContent';

export default function TheProofSection() {
  // Helper to elegantly format stat numbers and units
  const renderStatValue = (stat) => {
    if (stat === '30 LAKH+ KM') {
      return (
        <div className="flex items-baseline flex-wrap gap-1.5">
          <span className="text-3xl sm:text-4xl lg:text-[44px] font-light leading-none tracking-tight text-white">
            30 LAKH+
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-normal text-[#94A3B8]">
            KM
          </span>
        </div>
      );
    }
    if (stat === '1.5 YEARS') {
      return (
        <div className="flex items-baseline flex-wrap gap-1.5">
          <span className="text-3xl sm:text-4xl lg:text-[44px] font-light leading-none tracking-tight text-white">
            1.5
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-normal text-[#94A3B8]">
            YEARS
          </span>
        </div>
      );
    }
    return (
      <div className="text-3xl sm:text-4xl lg:text-[44px] font-light leading-none tracking-tight text-white">
        {stat}
      </div>
    );
  };

  return (
    <section className="w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center bg-[#0F2B46] text-white border-b border-[#1C4E80] py-12 md:py-0 overflow-x-hidden select-none">
      <Container className="w-full">
        {/* Section Headline */}
        <div className="max-w-[700px] mb-8 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-white">
            {proofData.headline}
          </h2>
        </div>

        {/* Four Stats in a Balanced 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-14 border-b border-[#1C4E80]/60 pb-10 sm:pb-12">
          {proofData.stats.map((item, i) => (
            <div key={i} className="flex flex-col min-w-0">
              <div className="min-h-[48px] flex items-center">
                {renderStatValue(item.stat)}
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#CBD5E1] uppercase tracking-widest font-medium mt-3 leading-relaxed">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pull-quote (Customer) & Microcopy */}
        <div className="max-w-[760px] mx-auto text-center px-4">
          <blockquote className="text-base sm:text-lg md:text-[20px] font-light italic leading-relaxed text-[#F1F5F9] mb-3 sm:mb-4">
            "{proofData.quote.text}"
          </blockquote>
          <cite className="text-xs sm:text-sm text-[#94A3B8] not-italic block mb-6 sm:mb-8 font-medium">
            — {proofData.quote.author}
          </cite>

          <p className="text-[11px] sm:text-[12px] text-[#64748B]">
            {proofData.disclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}
