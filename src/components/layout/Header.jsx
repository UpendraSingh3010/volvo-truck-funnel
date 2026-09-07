import React from 'react';
import Container from './Container';

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAssessment = () => {
    const el = document.getElementById('assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 bg-white/95 backdrop-blur-sm z-50 h-[72px] flex items-center border-b border-[#E5E7EB]">
      <Container className="flex items-center justify-between">
        {/* Minimal Volvo Wordmark Top-Left — No Clutter */}
        <button
          onClick={scrollToTop}
          className="font-bold text-2xl tracking-[0.1em] text-[#0F2B46] hover:opacity-80 transition-opacity cursor-pointer text-left"
          aria-label="Volvo - Back to top"
        >
          VOLVO
        </button>

        {/* Single subtle Assessment CTA Button */}
        <button
          onClick={scrollToAssessment}
          className="bg-[#0F2B46] text-white px-5 py-2.5 text-sm font-medium rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
        >
          <span>Assessment</span>
          <span>→</span>
        </button>
      </Container>
    </header>
  );
}
