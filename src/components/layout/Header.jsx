import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Container from './Container';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll listener for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const scrollToAssessment = () => {
    handleNavigateToSection('assessment-section');
  };

  const isHomeActive = location.pathname === '/' || location.pathname === '';
  const isCatalogActive = location.pathname === '/catalog';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[72px] bg-[#0B1E32]/95 backdrop-blur-md border-b border-[#1E3A5F]/70 transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-[#1E3A5F]/90 bg-[#081726]/98'
            : 'shadow-[0_2px_12px_rgba(0,0,0,0.18)]'
        }`}
      >
        <Container className="h-full flex items-center justify-between">
          {/* ─── 1. LEFT-ALIGNED: Volvo-Style Brand Mark ─── */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none select-none"
              aria-label="Volvo Trucks India - Return to Home"
            >
              {/* Volvo Authentic Iron Mark Emblem */}
              <div className="text-white transition-transform duration-300 group-hover:scale-105">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="transition-colors duration-300"
                >
                  {/* Iron Mark Circle */}
                  <circle cx="15" cy="17" r="9.5" stroke="currentColor" strokeWidth="2.2" />
                  {/* 45-degree Spear Shaft */}
                  <line x1="21.5" y1="10.5" x2="27.5" y2="4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  {/* Arrowhead */}
                  <path d="M21.5 4.5H27.5V10.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Brand Wordmark */}
              <div className="flex flex-col">
                <span className="text-[19px] sm:text-[21px] font-bold tracking-[0.24em] text-white leading-none">
                  VOLVO
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.32em] text-[#7DD3FC] uppercase font-semibold mt-1">
                  TRUCKS
                </span>
              </div>
            </Link>

            {/* Subtle Divider & Industrial Sub-Tag on Wide Displays */}
            <div className="hidden xl:flex items-center ml-5 pl-5 border-l border-white/15 h-7">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                High-Capacity Corridors
              </span>
            </div>
          </div>

          {/* ─── 2. CENTERED: Clean Corporate Navigation Links ─── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {/* Overview / Home */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className={`text-[13px] font-medium tracking-[0.06em] transition-colors duration-200 relative py-2 select-none ${
                isHomeActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Overview</span>
              {isHomeActive && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#38BDF8] rounded-full" />
              )}
            </Link>

            {/* Fleet Catalog */}
            <Link
              to="/catalog"
              className={`text-[13px] font-medium tracking-[0.06em] transition-colors duration-200 relative py-2 select-none ${
                isCatalogActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Fleet Catalog</span>
              {isCatalogActive && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#38BDF8] rounded-full" />
              )}
            </Link>

            {/* Technology & Safety */}
            <button
              type="button"
              onClick={() => handleNavigateToSection('how-it-works')}
              className="text-[13px] font-medium tracking-[0.06em] text-slate-300 hover:text-white transition-colors duration-200 py-2 cursor-pointer select-none"
            >
              Engineering & Safety
            </button>
          </nav>

          {/* ─── 3. RIGHT-ALIGNED: Primary CTA & Mobile Controls ─── */}
          <div className="flex items-center gap-3">
            {/* Desktop Primary CTA Button */}
            <button
              onClick={scrollToAssessment}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-white text-[#0B1E32] font-semibold text-[13px] tracking-wide shadow-sm hover:bg-[#F0F4F8] hover:shadow-[0_4px_16px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none group"
            >
              <span>Assess Corridor</span>
              <span className="text-sm font-bold transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>

            {/* Mobile Compact CTA */}
            <button
              onClick={scrollToAssessment}
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-white text-[#0B1E32] font-semibold text-xs tracking-wide shadow-sm active:scale-95 transition-transform cursor-pointer select-none"
            >
              <span>Assess</span>
              <span className="text-xs">→</span>
            </button>

            {/* Minimalist Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-[2px] flex flex-col items-center justify-center gap-1.5 text-white hover:bg-white/10 focus:outline-none transition-colors cursor-pointer select-none"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span
                className={`w-5 h-[1.8px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.8px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* ─── Mobile Slide-Down Navigation Drawer ─── */}
      <div
        className={`fixed inset-x-0 top-[72px] bottom-0 bg-[#071727]/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-6 md:hidden border-t border-[#1E3A5F]/70 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#7DD3FC] border-b border-white/10 pb-2 mb-2">
            Volvo Freight Navigation
          </div>

          <nav className="flex flex-col gap-1 text-[15px] font-medium">
            <Link
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-white hover:text-[#38BDF8] py-3 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span>Overview</span>
              <span className="text-xs font-mono text-[#38BDF8]">01</span>
            </Link>

            <Link
              to="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-3 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span>Fleet Catalog</span>
              <span className="text-xs font-mono text-[#38BDF8]">02</span>
            </Link>

            <button
              type="button"
              onClick={() => handleNavigateToSection('how-it-works')}
              className="text-slate-300 hover:text-white py-3 flex items-center justify-between border-b border-white/5 transition-colors text-left cursor-pointer"
            >
              <span>Engineering & Safety</span>
              <span className="text-xs font-mono text-[#38BDF8]">03</span>
            </button>
          </nav>
        </div>

        {/* Mobile Drawer Bottom Actions */}
        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={scrollToAssessment}
            className="w-full py-3.5 rounded-[2px] bg-white text-[#0B1E32] font-semibold text-sm text-center shadow-lg active:scale-98 transition-transform cursor-pointer"
          >
            Start Corridor Assessment →
          </button>

          <a
            href="tel:18004257070"
            className="w-full py-2.5 rounded-[2px] bg-[#0A1F33] border border-[#1E3A5F]/80 text-[#7DD3FC] text-xs font-mono text-center flex items-center justify-center gap-2"
          >
            <span>24/7 Action Service: 1800-425-7070</span>
          </a>
        </div>
      </div>
    </>
  );
}
