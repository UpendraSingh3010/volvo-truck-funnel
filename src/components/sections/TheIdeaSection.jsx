import React from 'react';
import Container from '../layout/Container';
import { ideaData } from '../../data/landingContent';
import section2Img from '../../assets/images/section 2 img.png';

export default function TheIdeaSection() {
  // Bespoke, minimal Scandinavian thin-line icons for the three outcome tiles
  const tileIcons = [
    // Tile 1: MORE PER TRIP (Connected multi-trailer freight symbol)
    <svg key="tile-1" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="10" width="11" height="10" rx="1" />
      <rect x="18" y="10" width="11" height="10" rx="1" />
      <line x1="14" y1="15" x2="18" y2="15" strokeWidth="2" />
      <circle cx="6" cy="22" r="1.5" />
      <circle cx="11" cy="22" r="1.5" />
      <circle cx="21" cy="22" r="1.5" />
      <circle cx="26" cy="22" r="1.5" />
    </svg>,

    // Tile 2: LOWER COST PER TONNE (Down-trending cost curve)
    <svg key="tile-2" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8l10 10 5-5 9 9" />
      <polyline points="20 22 28 22 28 14" />
    </svg>,

    // Tile 3: FEWER TRUCKS, LOWER EMISSIONS (Decarbonisation leaf & airflow)
    <svg key="tile-3" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 26c0-10.5 8.5-19 19-19 0 10.5-8.5 19-19 19z" />
      <path d="M6 26l11-11" />
    </svg>,
  ];

  return (
    <section className="relative w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center bg-[#0F2B46] text-white border-b border-[#1C4E80] py-12 md:py-0 overflow-hidden select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={section2Img}
          alt="Volvo Road Train Innovation & Fleet Logistics"
          className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
        />
        {/* Directional gradient: protects text contrast on left while keeping trucks & sunset visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071726]/80 via-[#0F2B46]/45 to-[#0F2B46]/35" />
        {/* Subtle top & bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2B46]/75 via-transparent to-[#0F2B46]/80" />
      </div>

      <Container className="w-full">
        {/* Section Headline & Intro Line */}
        <div className="relative z-10 max-w-[720px] mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-white mb-3 sm:mb-4">
            {ideaData.headline}
          </h2>
          <p className="text-[#CBD5E1] text-base sm:text-lg md:text-[19px] leading-relaxed font-normal max-w-[700px]">
            {ideaData.intro}
          </p>
        </div>

        {/* Three Outcome Tiles */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ideaData.points.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
            >
              {/* Card: flat dark navy, subtle border, single lift on hover */}
              <div className="h-full w-full bg-[#0B1E32]/80 border border-white/15 group-hover:border-white/35 transition-all duration-250 ease-out group-hover:-translate-y-1.5 p-7 md:p-8 flex flex-col justify-start">
                {/* Static top accent line */}
                <div className="w-8 h-[2px] bg-[#38BDF8]/60 mb-6" />

                {/* Icon */}
                <div className="w-9 h-9 mb-5 text-[#7DD3FC] group-hover:text-white transition-colors duration-200">
                  {tileIcons[i]}
                </div>

                {/* Tile Label */}
                <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-3 text-white/80 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Tile Description */}
                <p className="text-[#94A3B8] text-[15px] leading-relaxed group-hover:text-[#CBD5E1] transition-colors duration-200">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
