import React from 'react';

export default function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p
      className={`text-[13px] uppercase tracking-widest font-medium mb-6 ${
        light ? 'text-[#F2F4F6]' : 'text-[#6B7280]'
      } ${className}`}
    >
      {children}
    </p>
  );
}
