import React from 'react';
import Container from '../layout/Container';
import { sustainabilityData } from '../../data/landingContent';

export default function SustainabilitySection() {
  return (
    <section className="w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center items-center text-center bg-white border-b border-[#E5E7EB] py-12 md:py-0 overflow-hidden select-none">
      <Container className="flex flex-col items-center">
        {/* Short, confident narrow column */}
        <div className="max-w-[760px] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-6 sm:mb-8">
            {sustainabilityData.headline}
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg md:text-[20px] leading-relaxed font-normal">
            {sustainabilityData.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
