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
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToAssessment = () => {
    setIsMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 flex items-center transition-all duration-300 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? 'h-[58px] bg-[#0F2B46]/95 backdrop-blur-md border-b border-[#1C4E80]/60 shadow-lg shadow-[#071626]/20'
            : 'h-[72px] bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] shadow-none'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Enhanced Volvo Logo: Authentic Iron Mark + Wordmark */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left focus:outline-none transition-all duration-300"
            aria-label="Volvo Trucks - Return to Home"
          >
            {/* Volvo Iron Mark Emblem */}
            <div
              className={`transition-all duration-300 transform group-hover:scale-105 ${
                isScrolled || isMobileMenuOpen ? 'text-white scale-90 sm:scale-95' : 'text-[#0F2B46] scale-100'
              }`}
            >
              <svg
                width="28"
                height="28"
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
            <div className="flex flex-col transition-all duration-300">
              <span
                className={`font-bold tracking-[0.2em] leading-none transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen
                    ? 'text-lg sm:text-xl text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                    : 'text-xl sm:text-2xl text-[#0F2B46]'
                }`}
              >
                VOLVO
              </span>
              <span
                className={`tracking-[0.28em] uppercase font-semibold transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? 'text-[8px] text-[#CBD5E1] mt-0.5' : 'text-[9px] text-[#1C4E80] mt-0.5'
                }`}
              >
                TRUCKS
              </span>
            </div>
          </Link>

          {/* Right Action Controls: Desktop Button + Mobile Compact CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Compact Assessment Button */}
            <button
              onClick={scrollToAssessment}
              className={`sm:hidden font-medium rounded-[2px] transition-all duration-300 cursor-pointer flex items-center gap-1 group px-2.5 py-1.5 text-xs ${
                isScrolled || isMobileMenuOpen
                  ? 'bg-white text-[#0F2B46] font-semibold hover:bg-[#F2F4F6] shadow-sm'
                  : 'bg-[#0F2B46] text-white hover:bg-[#1C4E80] shadow-sm'
              }`}
            >
              <span>Assess</span>
              <span className="text-[11px] leading-none">→</span>
            </button>

            {/* Desktop Dynamic Assessment CTA Button */}
            <button
              onClick={scrollToAssessment}
              className={`hidden sm:flex font-medium rounded-[2px] transition-all duration-300 cursor-pointer items-center gap-1.5 sm:gap-2 group ${
                isScrolled
                  ? 'px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] bg-white text-[#0F2B46] font-semibold hover:bg-[#F2F4F6] shadow-md hover:-translate-y-0.5'
                  : 'px-5 py-2.5 text-sm bg-[#0F2B46] text-white hover:bg-[#1C4E80] shadow-sm'
              }`}
            >
              <span>Assessment</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`sm:hidden w-9 h-9 rounded-[3px] flex flex-col items-center justify-center gap-1.5 transition-colors focus:outline-none cursor-pointer ${
                isScrolled || isMobileMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#0F2B46] hover:bg-slate-100'
              }`}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? 'bg-white' : 'bg-[#0F2B46]'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? 'bg-white' : 'bg-[#0F2B46]'
                } ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || isMobileMenuOpen ? 'bg-white' : 'bg-[#0F2B46]'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* ─── Mobile Slide-Down Navigation Drawer ───────────────────────── */}
      <div
        className={`fixed inset-x-0 top-[58px] bottom-0 bg-[#071727]/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-6 sm:hidden border-t border-[#1C4E80]/60 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#7DD3FC] border-b border-white/10 pb-2">
            Volvo Road Train Navigation
          </div>

          <nav className="flex flex-col gap-3 text-[15px] font-medium">
            <Link
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-white hover:text-[#38BDF8] py-2 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span>Home</span>
              <span className="text-xs font-mono text-[#38BDF8]">01</span>
            </Link>

            <Link
              to="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-2 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span>Fleet Catalog</span>
              <span className="text-xs font-mono text-[#38BDF8]">02</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToAssessment();
              }}
              className="text-slate-300 hover:text-white py-2 flex items-center justify-between border-b border-white/5 transition-colors text-left cursor-pointer"
            >
              <span>Corridor Feasibility Model</span>
              <span className="text-xs font-mono text-[#38BDF8]">03</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-film-modal'));
              }}
              className="text-slate-300 hover:text-white py-2 flex items-center justify-between border-b border-white/5 transition-colors text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sky-400">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Road Train Film
              </span>
              <span className="text-xs font-mono text-[#38BDF8]">HD</span>
            </button>
          </nav>
        </div>

        {/* Mobile Drawer Bottom Actions */}
        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToAssessment();
            }}
            className="w-full py-3.5 rounded-[3px] bg-white text-[#0F2B46] font-semibold text-sm text-center shadow-lg active:scale-98 transition-transform cursor-pointer"
          >
            Start Corridor Assessment →
          </button>

          <a
            href="tel:18004257070"
            className="w-full py-2.5 rounded-[3px] bg-[#0A1F33] border border-[#1C4E80]/80 text-[#7DD3FC] text-xs font-mono text-center flex items-center justify-center gap-2"
          >
            <span>24/7 Action Service: 1800-425-7070</span>
          </a>
        </div>
      </div>
    </>
  );
}

