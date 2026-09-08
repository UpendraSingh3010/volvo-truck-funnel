import React from 'react';

export default function AppCard({
  title,
  desc,
  isSelected = false,
  isHovered = false,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  icon,
  index = 0,
  className = '',
}) {
  const metricNum = `0${index + 1}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Subtle soft blue glow behind the box ONLY blooming on hover */}
      <div
        className="absolute -inset-1.5 sm:-inset-2 rounded-xl bg-gradient-to-br from-sky-400/18 via-blue-600/12 to-cyan-400/15 blur-md sm:blur-lg opacity-0 group-hover:opacity-60 group-hover:scale-[1.02] group-hover:blur-xl transition-all duration-500 pointer-events-none"
      />

      {/* Blue Box with Subdued gradient on hover */}
      <div
        className={`relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[4px] bg-[#0F2B46] group-hover:bg-gradient-to-br group-hover:from-[#113252] group-hover:via-[#0F2B46] group-hover:to-[#0C243B] border transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between transform group-hover:-translate-y-2 group-hover:scale-[1.035] group-hover:shadow-[0_16px_32px_rgba(15,43,70,0.25),0_0_15px_rgba(56,189,248,0.12)] ${isSelected
            ? 'border-[#38BDF8] shadow-[0_6px_20px_rgba(15,43,70,0.25)]'
            : 'border-[#1C4E80]/70 group-hover:border-[#38BDF8] shadow-[0_6px_20px_rgba(15,43,70,0.18)]'
          }`}
      >
        {/* Soft inner ambient top sheen on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        {/* Top blue accent line */}
        <div
          className={`absolute top-0 left-0 h-[2.5px] transition-all duration-300 ${isSelected
              ? 'w-full bg-[#38BDF8]'
              : 'w-8 bg-[#38BDF8]/50 group-hover:w-full group-hover:bg-[#38BDF8]'
            }`}
        />

        {/* Top Tag & Metric Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded-[3px] bg-[#0B2034] border border-[#1C4E80] flex items-center justify-center text-[#38BDF8] group-hover:border-[#38BDF8] group-hover:shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-all">
            {icon || (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            )}
          </div>

        </div>

        {/* Narrative Info */}
        <div className="flex-1">
          <h3
            className={`text-base sm:text-[17px] font-medium leading-snug mb-2 transition-colors duration-300 ${isSelected ? 'text-[#BAE6FD]' : 'text-white group-hover:text-[#BAE6FD]'
              }`}
          >
            {title}
          </h3>
          <p className="text-[#CBD5E1] text-xs sm:text-[13px] leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Bottom Selection Indicator */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected
                  ? 'bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                  : 'bg-slate-500 group-hover:bg-[#38BDF8]'
                }`}
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${isSelected
                  ? 'text-[#38BDF8]'
                  : 'text-[#94A3B8] group-hover:text-white'
                }`}
            >
              {isSelected ? 'Active Model' : 'Select'}
            </span>
          </div>
          <span
            className={`font-mono text-xs transition-transform duration-200 ${isSelected
                ? 'translate-x-0.5 text-[#38BDF8] font-bold'
                : 'text-slate-400 group-hover:text-white group-hover:translate-x-0.5'
              }`}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}
