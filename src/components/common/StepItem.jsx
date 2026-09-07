import React from 'react';

export default function StepItem({
  num,
  title,
  desc,
  reverse = false,
  imageSrc,
  imageAlt,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
        reverse ? 'md:flex-row-reverse' : ''
      } ${className}`}
    >
      {/* Clean still image */}
      <div className="w-full md:w-1/2 aspect-[4/3] bg-[#F2F4F6] overflow-hidden border border-[#E5E7EB] rounded-[2px] shadow-sm group">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#6B7280] text-sm p-6 text-center">
            Image for {title}
          </div>
        )}
      </div>

      {/* Narrative block */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="text-[64px] md:text-[80px] font-light text-[#E5E7EB] leading-none mb-6 select-none">
          {num}
        </div>
        <h3 className="text-2xl md:text-[28px] text-[#0F2B46] font-medium mb-4 leading-snug">
          {title}
        </h3>
        <p className="text-[#6B7280] text-base md:text-lg leading-relaxed max-w-[480px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
