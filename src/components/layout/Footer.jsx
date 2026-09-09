import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from './Container';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Smooth scroll handler for anchor targets
  const handleScrollTo = (elementId) => {
    if (location.pathname === '/' || location.pathname === '') {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('1800-425-7070');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <footer className="relative w-full bg-[#071727] text-white border-t border-[#1C4E80]/80 overflow-hidden select-none">
      {/* Top subtle cyan specular accent beam */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent pointer-events-none" />

      {/* ─── MAIN FOOTER CONTENT GRID: Brand + 3 Structured Columns ─── */}
      <div className="py-14 sm:py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-start">

            {/* Column 1 (Span 4): Brand Identity & Mission Descriptor */}
            <div className="lg:col-span-4 flex flex-col">
              {/* Volvo Iron Mark Emblem + Wordmark */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-9 h-9 rounded bg-[#163859] border border-sky-400/40 flex items-center justify-center text-white shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="15" cy="17" r="10" />
                    <line x1="22" y1="10" x2="28" y2="4" strokeWidth="2.5" />
                    <polyline points="23,4 28,4 28,9" strokeWidth="2.5" strokeLinecap="square" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl tracking-[0.12em] text-white leading-none">
                    VOLVO
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#7DD3FC] uppercase mt-1">
                    Volvo Trucks India
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <div className="text-xs font-semibold uppercase tracking-widest text-[#BAE6FD] mb-3">
                Volvo Trucks. Driving Progress.
              </div>

              {/* Descriptor */}
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mb-6 max-w-sm font-normal">
                Pioneering high-capacity multi-trailer Road Train transport systems for India's national logistics corridors. Homologated to double commercial payload, cut fleet carbon by 35%+, and maximize uptime.
              </p>

              {/* Highway Compliance Badge */}
              <div className="flex items-center gap-2.5 px-3 py-2 bg-[#0A1F33] border border-[#1C4E80]/70 w-fit text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Indian Highway Corridor Homologation</span>
              </div>

              {/* Site Credits */}
              <div className="mt-5 flex items-center gap-2.5 px-3 py-2 border border-white/15 w-fit bg-white/[0.03]">
                <a
                  href="https://fabulousmedia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FabulousMedia"
                  className="flex items-center justify-center bg-white p-[4px] opacity-55 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >
                  <img
                    src="https://play.fabulousmedia.in/sitecredit/images/fabulousmedia.svg"
                    alt="FabulousMedia"
                    className="h-[10px] md:h-[12px] w-auto block"
                  />
                </a>

                <div className="w-[1px] h-[12px] bg-white/20" />

                <a
                  href="https://gocommercially.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GoCommercially"
                  className="flex items-center justify-center bg-white p-[4px] opacity-55 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >
                  <img
                    src="https://play.fabulousmedia.in/sitecredit/images/gocommercially.svg"
                    alt="GoCommercially"
                    className="h-[10px] md:h-[12px] w-auto block"
                  />
                </a>
              </div>
            </div>

            {/* Column 2 (Span 3): Solution Categories */}
            <div className="lg:col-span-3 flex flex-col">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7DD3FC] mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-[2px] bg-[#38BDF8]" />
                <span>Corridor Solutions</span>
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-[13px]">
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Express Logistics & E-Commerce</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Mining & Heavy Minerals Bulk</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Cement & Clinker Supply Lines</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Steel Coil & Plate Haulage</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Port-to-ICD High-Cube Containers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Multi-Trailer Vehicle Homologations</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 (Span 2): System Platform & Architecture */}
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7DD3FC] mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-[2px] bg-[#38BDF8]" />
                <span>Architecture</span>
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-[13px]">
                <li>
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Road Train Concept</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Fleet Catalog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/assessment"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Productivity Model</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('assessment-section')}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer text-left"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Corridor Feasibility</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>Safety Telemetry</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity font-bold">›</span>
                    <span>ESG & Decarbonisation</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 (Span 3): 3S Hub Network, Uptime & Contact */}
            <div className="lg:col-span-3 flex flex-col">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7DD3FC] mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-[2px] bg-[#38BDF8]" />
                <span>Advisory & 3S Hubs</span>
              </h3>

              <div className="flex flex-col gap-3 text-xs text-slate-300">
                <div
                  onClick={handleCopyPhone}
                  title="Click to copy hotline number"
                  className="p-3 rounded-[4px] bg-[#0A1F33] hover:bg-[#0D263E] border border-[#1C4E80]/60 hover:border-[#38BDF8]/50 transition-all duration-200 cursor-pointer group select-none"
                >
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Emergency Corridor Response</span>
                    <span className="text-[10px] text-sky-300 font-sans font-medium">
                      {copiedPhone ? '✓ Copied' : 'Click to copy'}
                    </span>
                  </div>
                  <div className="font-semibold text-white text-sm flex items-center justify-between">
                    <span>Volvo Action Service</span>
                    <span className="inline-flex items-center gap-1.5 text-[#38BDF8] font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      24/7 Live
                    </span>
                  </div>
                  <div className="text-[#7DD3FC] font-mono text-xs mt-1">
                    1800-425-7070 (Toll-Free)
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-[12.5px] text-slate-400">
                  <div className="flex items-start gap-2">
                    <span className="text-[#38BDF8] font-mono">▸</span>
                    <span>National Corridor Hubs: Delhi-NCR, Mumbai, Chennai, Kolkata, Ahmedabad, Bangalore</span>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <span className="text-[#38BDF8] font-mono">▸</span>
                    <span>VE Commercial Vehicles Ltd., Yelahanka, Bangalore 560064</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleScrollTo('assessment-section')}
                  className="mt-2 w-full py-2.5 px-3 bg-[#0F2B46] hover:bg-[#163859] border border-[#1C4E80]/60 hover:border-white/20 text-[#BAE6FD] hover:text-white font-medium text-xs text-center transition-all duration-200 cursor-pointer"
                >
                  Book Technical Consultation →
                </button>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* ─── 3. BOTTOM ROW: Legal, Disclaimers & Regulatory Compliance ─── */}
      <div className="border-t border-white/10 bg-[#040E18] py-5 sm:py-6 text-slate-400 text-xs">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Volvo Trucks India · VE Commercial Vehicles Ltd.
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-slate-400 text-[11.5px]">
              All commercial trademarks belong to AB Volvo.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11.5px]">
            <Link to="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              MoRTH Regulatory Framework
            </Link>
            <span className="text-slate-400 font-mono text-[10.5px]">
              AIS-113 Compliant
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
