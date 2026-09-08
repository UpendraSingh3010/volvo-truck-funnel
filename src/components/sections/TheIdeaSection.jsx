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
      {/* Background Image with softened, lighter overlay so the photo is clearly visible */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={section2Img}
          alt="Volvo Road Train Innovation & Fleet Logistics"
          className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
        />
        {/* Soft directional gradient: protects text contrast on left while keeping trucks & sunset visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071726]/80 via-[#0F2B46]/45 to-[#0F2B46]/35" />
        {/* Subtle top & bottom vignette to merge seamlessly into neighboring sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2B46]/75 via-transparent to-[#0F2B46]/80" />
      </div>

      <Container className="w-full">
        {/* Section Headline & Intro Line */}
        <div className="relative z-10 max-w-[720px] mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-white mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {ideaData.headline}
          </h2>
          <p className="text-[#CBD5E1] text-base sm:text-lg md:text-[19px] leading-relaxed font-normal max-w-[700px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {ideaData.intro}
          </p>
        </div>

        {/* Three Outcome Tiles in a 3-column row with ambient glow behind and enhanced hover dynamics */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {ideaData.points.map((item, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
            >
              {/* Subtle soft blue glow behind the box on hover */}
              <div 
                className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none" 
              />

              {/* Blue Box with Subdued Hover Gradient, Scale & Lift */}
              <div className="relative h-full w-full rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border border-[#1C4E80]/70 group-hover:border-[#38BDF8] transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:scale-[1.03] shadow-[0_6px_20px_rgba(15,43,70,0.18)] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] p-6 sm:p-7 md:p-8 flex flex-col justify-start overflow-hidden">
                {/* Soft inner ambient top sheen on hover */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top blue accent line */}
                <div className="absolute top-0 left-0 w-8 h-[2.5px] bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8] transition-all duration-300" />

                {/* Minimalist Stroke Icon with radiant glow on hover */}
                <div className="w-10 h-10 mb-5 text-sky-300 transition-all duration-400 transform group-hover:scale-110 group-hover:text-[#BAE6FD] group-hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.75)]">
                  {tileIcons[i]}
                </div>

                {/* Tile Label */}
                <h3 className="text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold mb-3 text-white transition-colors duration-300 group-hover:text-[#BAE6FD]">
                  {item.title}
                </h3>

                {/* Tile Description */}
                <p className="text-[#CBD5E1] text-sm sm:text-[15px] md:text-base leading-relaxed transition-colors duration-300 group-hover:text-white">
                  {item.desc}
                </p>

                {/* Bottom neon accent beam on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-50 group-hover:scale-x-100" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


