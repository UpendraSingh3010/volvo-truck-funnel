import React from 'react';
import Container from '../layout/Container';
import FeatureCard from '../common/FeatureCard';
import { ideaData } from '../../data/landingContent';

export default function TheIdeaSection() {
  // Bespoke, minimal Scandinavian thin-line icons for the three outcome tiles
  const tileIcons = [
    // Tile 1: MORE PER TRIP (Connected multi-trailer freight symbol)
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="10" width="11" height="10" rx="1" />
      <rect x="18" y="10" width="11" height="10" rx="1" />
      <line x1="14" y1="15" x2="18" y2="15" strokeWidth="2" />
      <circle cx="6" cy="22" r="1.5" />
      <circle cx="11" cy="22" r="1.5" />
      <circle cx="21" cy="22" r="1.5" />
      <circle cx="26" cy="22" r="1.5" />
    </svg>,

    // Tile 2: LOWER COST PER TONNE (Down-trending cost curve)
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8l10 10 5-5 9 9" />
      <polyline points="20 22 28 22 28 14" />
    </svg>,

    // Tile 3: FEWER TRUCKS, LOWER EMISSIONS (Decarbonisation leaf & airflow)
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 26c0-10.5 8.5-19 19-19 0 10.5-8.5 19-19 19z" />
      <path d="M6 26l11-11" />
    </svg>,
  ];

  return (
    <section className="min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center bg-white border-b border-[#E5E7EB] py-12 md:py-0 overflow-hidden select-none">
      <Container>
        {/* Section Headline & Intro Line with generous, calm whitespace */}
        <div className="max-w-[760px] mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-[#0F2B46] font-medium leading-[1.14] tracking-tight mb-4 sm:mb-6">
            {ideaData.headline}
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg md:text-[20px] leading-relaxed font-normal">
            {ideaData.intro}
          </p>
        </div>

        {/* Three Outcome Tiles in a 3-column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14">
          {ideaData.points.map((item, i) => (
            <div key={i} className="flex flex-col group">
              {/* Minimalist Stroke Icon */}
              <div className="w-8 h-8 mb-5 text-[#0F2B46] transition-transform duration-200 group-hover:scale-105">
                {tileIcons[i]}
              </div>

              {/* Tile Label */}
              <h3 className="text-[13px] text-[#0F2B46] uppercase tracking-widest font-semibold mb-3">
                {item.title}
              </h3>

              {/* Tile Description */}
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-[340px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
