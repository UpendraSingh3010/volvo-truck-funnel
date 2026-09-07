import React from 'react';

export default function StatCard({ stat, label, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="text-[64px] md:text-[80px] lg:text-[96px] font-light leading-none tracking-tight text-white select-none">
        {stat}
      </div>
      <div className="text-[13px] text-[#F2F4F6] uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}
