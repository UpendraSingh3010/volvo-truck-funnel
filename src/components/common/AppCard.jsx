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
      className={`bg-white p-6 sm:p-7 flex flex-col justify-between h-full cursor-pointer border-t-[3px] transition-all duration-200 shadow-sm hover:shadow-md ${
        isSelected
          ? 'border-[#0F2B46] shadow-md ring-1 ring-[#0F2B46]/20 -translate-y-1'
          : isHovered
          ? 'border-[#0F2B46] -translate-y-0.5'
          : 'border-transparent'
      } ${className}`}
    >
      <div>
        <div className="w-6 h-6 mb-4 text-[#0F2B46]">
          {icon || (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          )}
        </div>
        <h3 className="text-base sm:text-lg text-[#0F2B46] font-medium leading-snug mb-2">
          {title}
        </h3>
        <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F2F4F6] flex items-center justify-between text-xs">
        <span
          className={`uppercase tracking-wider font-semibold ${
            isSelected ? 'text-[#0F2B46]' : 'text-[#6B7280]'
          }`}
        >
          {isSelected ? '✓ Selected' : 'Select'}
        </span>
        <span className="text-[#0F2B46] text-xs">→</span>
      </div>
    </div>
  );
}
