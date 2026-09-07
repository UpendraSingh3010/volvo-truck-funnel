import React from 'react';

export default function FeatureCard({ title, desc, icon, className = '' }) {
  return (
    <div className={`flex flex-col group ${className}`}>
      {/* Icon display */}
      <div className="w-8 h-8 mb-6 text-[#0F2B46] transition-transform duration-200 group-hover:scale-105">
        {icon || (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 16H28M16 4V28" />
          </svg>
        )}
      </div>
      <h3 className="text-[13px] text-[#0F2B46] uppercase tracking-widest font-semibold mb-4">
        {title}
      </h3>
      <p className="text-[#6B7280] text-lg leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
