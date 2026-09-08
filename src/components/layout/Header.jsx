import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Container from './Container';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Switch header style when scrolled past the top (e.g. 40px)
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/' || location.pathname === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToAssessment = () => {
    if (location.pathname === '/' || location.pathname === '') {
      const el = document.getElementById('assessment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('assessment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F2B46]/95 backdrop-blur-md border-b border-[#1C4E80]/60 shadow-lg shadow-[#071626]/20'
          : 'bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] shadow-none'
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Enhanced Volvo Logo: Authentic Iron Mark + Wordmark */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
          aria-label="Volvo Trucks - Return to Home"
        >
          {/* Volvo Iron Mark Emblem */}
          <div
            className={`transition-all duration-300 transform group-hover:scale-105 ${
              isScrolled ? 'text-white' : 'text-[#0F2B46]'
            }`}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              className="transition-colors duration-300"
            >
              {/* Iron Mark Circle */}
              <circle cx="15" cy="17" r="10" stroke="currentColor" strokeWidth="2.4" />
              {/* 45-degree Spear Shaft */}
              <line x1="22" y1="10" x2="28" y2="4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              {/* Arrowhead */}
              <path d="M22 4H28V10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Volvo Brand Wordmark & Tag */}
          <div className="flex flex-col">
            <span
              className={`font-bold text-xl sm:text-2xl tracking-[0.2em] leading-none transition-colors duration-300 ${
                isScrolled
                  ? 'text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                  : 'text-[#0F2B46]'
              }`}
            >
              VOLVO
            </span>
            <span
              className={`text-[9px] tracking-[0.28em] uppercase font-semibold mt-0.5 transition-colors duration-300 ${
                isScrolled ? 'text-[#CBD5E1]' : 'text-[#1C4E80]'
              }`}
            >
              TRUCKS
            </span>
          </div>
        </Link>

        {/* Dynamic Assessment CTA Button */}
        <button
          onClick={scrollToAssessment}
          className={`px-5 py-2.5 text-sm font-medium rounded-[2px] transition-all duration-300 cursor-pointer flex items-center gap-2 group ${
            isScrolled
              ? 'bg-white text-[#0F2B46] font-semibold hover:bg-[#F2F4F6] shadow-md'
              : 'bg-[#0F2B46] text-white hover:bg-[#1C4E80] shadow-sm'
          }`}
        >
          <span>Assessment</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </Container>
    </header>
  );
}

