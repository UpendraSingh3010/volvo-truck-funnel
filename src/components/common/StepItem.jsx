import React from 'react';

export default function StepItem({
  num,
  title,
  desc,
  imageSrc,
  imageAlt,
  isVisible = false,
  isLast = false,
  isReversed = false,
  className = '',
}) {
  return (
    <div
      className={`relative py-14 md:py-20 overflow-hidden ${!isLast ? 'border-b border-slate-200' : ''
        } ${className}`}
    >
      {/* ── Background Giant Numeral Watermark ─────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-[#0F2B46] leading-none"
          style={{ fontSize: 'clamp(140px, 18vw, 220px)', opacity: 0.025 }}
        >
          {num}
        </span>
      </div>

      {/* ── Content Grid (Alternating Narrative & Image Block) ──────────── */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center">

        {/* Narrative Text Block */}
        <div
          className={`flex flex-col ${isReversed
              ? 'order-1 md:order-2 md:pl-4 lg:pl-8'
              : 'order-1 md:order-1 md:pr-4 lg:pr-8'
            }`}
        >
          {/* Industrial Phase Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-slate-100 border border-slate-200 text-[11px] font-mono text-[#1C4E80] font-semibold tracking-wider uppercase mb-3.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C4E80] animate-pulse" />
            <span>PHASE {num} - {title} </span>
          </div>

          {/* Step Heading */}
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] text-[#0F2B46] font-medium mb-3.5 leading-snug tracking-tight">
            {title}
          </h3>

          {/* Step Description */}
          <p className="text-[#475569] text-base sm:text-[17px] leading-relaxed max-w-[480px]">
            {desc}
          </p>
        </div>

        {/* Framed Image Block with Industrial Polish & Hover Dynamics */}
        <div
          className={`w-full group ${isReversed ? 'order-2 md:order-1' : 'order-2 md:order-2'
            }`}
          style={{
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0.2,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          }}
        >
          <div className="relative rounded-[6px] overflow-hidden border border-slate-200 bg-[#F8FAFC] shadow-[0_4px_20px_rgba(15,43,70,0.06)] hover:shadow-[0_20px_45px_rgba(15,43,70,0.14)] hover:border-[#1C4E80]/50 transition-all duration-500">
            {/* Top Telemetry Header Bar */}
            <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200/90 flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-[#0F2B46] font-semibold uppercase tracking-wider">
                  SYSTEM VALIDATION - {title}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                VERIFIED
              </span>
            </div>

            {/* Main Image Container with Smooth Zoom */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6B7280] text-sm p-6 text-center font-mono">
                  Operational Diagram: {title}
                </div>
              )}

              {/* Subtle hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
