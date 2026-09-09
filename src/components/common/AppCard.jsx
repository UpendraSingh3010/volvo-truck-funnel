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
      className={`cursor-pointer group ${className}`}
    >
      <div
        className={`relative h-full px-5 py-6 sm:px-6 sm:py-7 border flex flex-col justify-between overflow-hidden
          transition-all duration-250 ease-out
          group-hover:-translate-y-1.5
          ${isSelected
            ? 'bg-[#112840] border-l-[#38BDF8] border-[#1C4E80]/60 border-l-[2px]'
            : 'bg-[#0F2B46] border-[#1C4E80]/60 group-hover:bg-[#112840]'
          }`}
      >
        {/* Left accent line — scaleX sweep on hover, always visible when selected */}
        {!isSelected && (
          <div
            className="absolute left-0 top-0 h-full w-[2px] bg-[#38BDF8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          />
        )}

        {/* Short static top mark */}
        <div className={`h-[1.5px] w-6 mb-6 transition-colors duration-200 ${isSelected ? 'bg-[#38BDF8]' : 'bg-[#38BDF8]/35 group-hover:bg-[#38BDF8]/70'}`} />

        {/* Icon */}
        <div
          className={`w-9 h-9 mb-4 flex items-center justify-center border transition-colors duration-200 ${
            isSelected
              ? 'text-[#38BDF8] border-[#38BDF8]/50 bg-[#0B2034]'
              : 'text-[#7DD3FC] border-[#1C4E80] bg-[#0B2034] group-hover:border-[#1C4E80]/80 group-hover:text-white'
          }`}
        >
          {icon || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          )}
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3
            className={`text-[15px] font-medium leading-snug mb-2 transition-colors duration-200 ${
              isSelected ? 'text-white' : 'text-white/75 group-hover:text-white'
            }`}
          >
            {title}
          </h3>
          <p className="text-[#94A3B8] text-xs sm:text-[13px] leading-relaxed group-hover:text-[#CBD5E1] transition-colors duration-200">
            {desc}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                isSelected ? 'bg-[#38BDF8]' : 'bg-slate-600 group-hover:bg-[#38BDF8]/60'
              }`}
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                isSelected ? 'text-[#38BDF8]' : 'text-[#64748B] group-hover:text-[#7DD3FC]'
              }`}
            >
              {isSelected ? 'Active' : 'Select'}
            </span>
          </div>
          <span
            className={`font-mono text-xs transition-all duration-200 ${
              isSelected ? 'text-[#38BDF8]' : 'text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-0.5'
            }`}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}
