import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-[#0F2B46] text-white py-12 border-t border-[#1C4E80]">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-2xl tracking-[0.1em] hover:opacity-80 transition-opacity">
            VOLVO
          </Link>
          <span className="hidden md:inline text-white/30">|</span>
          <div className="text-[13px] text-[#F2F4F6] uppercase tracking-widest font-medium">
            Volvo Trucks. Driving Progress.
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm text-[#F2F4F6]/70">
          <Link to="/" className="hover:text-white transition-colors">
            Overview
          </Link>
          <Link to="/catalog" className="hover:text-white transition-colors">
            Catalog
          </Link>
          <Link to="/assessment" className="hover:text-white transition-colors">
            Assessment
          </Link>
          <span className="text-xs text-white/40">
            © {new Date().getFullYear()} Volvo Trucks India
          </span>
        </div>
      </Container>
    </footer>
  );
}
