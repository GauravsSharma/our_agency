'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenBrief: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, onOpenBrief }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format as IST / New Delhi time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setCurrentTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf9f6]/95 backdrop-blur-md transition-all duration-300">
      {/* Top Architectural Telemetry Bar */}
      <div className="border-b border-[#e5e2dc] bg-[#faf9f6] text-[10px] sm:text-[11px] font-mono tracking-widest text-[#666460] px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="text-[#c04a26] text-xs">■</span>
          <span className="hidden sm:inline">OCT. 2024 |</span>
          <span>AGRA // REMOTE</span>
          <span className="text-[#111111] font-semibold">— {currentTime || '10:27:34 AM'} —</span>
          <span className="hidden md:inline">DIGITAL ATELIER</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c04a26] animate-pulse"></span>
          <span className="text-[#111111] font-medium">SYS. STATUS // 02/02 PARTNERS ENGAGED</span>
        </div>
      </div>

      {/* Main Studio Navigation Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Studio Brandmark */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="group flex items-baseline gap-2 text-xl sm:text-2xl font-bold tracking-tight font-display text-[#111111]"
          >
            <span>KAELITH STUDIO</span>
            <span className="text-xs font-mono font-normal text-[#c04a26] tracking-widest hidden lg:inline">
              • AVAILABLE Q4/Q1 // AGRA // REMOTE
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] tracking-widest uppercase text-[#444748]">
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#111111] after:transition-all"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className="hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#111111] after:transition-all"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('estimator')}
            className="hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#111111] after:transition-all"
          >
            Estimator
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#111111] after:transition-all"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#111111] after:transition-all"
          >
            Contact
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCalculator}
            className="group relative hidden sm:inline-flex items-center gap-2 bg-[#111111] text-[#faf9f6] hover:bg-[#c04a26] text-[11px] font-mono tracking-widest uppercase px-5 py-2.5 transition-colors border border-[#111111]"
          >
            <span>CALCULATE PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Quick Terminal Button for interactive debug/specs */}
          <button
            onClick={() => scrollToSection('estimator')}
            aria-label="Calculator shortcut"
            className="sm:hidden p-2 text-[#111111] border border-[#e5e2dc] bg-[#faf9f6] hover:bg-[#111111] hover:text-[#faf9f6] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] border border-[#e5e2dc] bg-transparent"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e2dc] bg-[#faf9f6] p-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="font-mono text-xs text-[#c04a26] tracking-widest mb-2">
            [ NAVIGATION INDEX ]
          </div>
          <div className="flex flex-col space-y-3 font-mono text-sm uppercase tracking-wider text-[#111111]">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 border-b border-[#e5e2dc]/50 flex justify-between items-center"
            >
              <span>01 // SERVICES LEDGER</span>
              <span className="text-xs text-[#666460]">5 TIERS</span>
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-left py-2 border-b border-[#e5e2dc]/50 flex justify-between items-center"
            >
              <span>02 // SELECTED WORK ARCHIVE</span>
              <span className="text-xs text-[#666460]">3 REPOS</span>
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="text-left py-2 border-b border-[#e5e2dc]/50 flex justify-between items-center"
            >
              <span>03 // SCOPE ESTIMATOR</span>
              <span className="text-xs text-[#c04a26] font-bold">REAL-TIME</span>
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="text-left py-2 border-b border-[#e5e2dc]/50 flex justify-between items-center"
            >
              <span>04 // FOUNDING ENGINEERS</span>
              <span className="text-xs text-[#666460]">AGRA, IN</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 border-b border-[#e5e2dc]/50 flex justify-between items-center"
            >
              <span>05 // START A PROJECT</span>
              <span className="text-xs text-[#666460]">24H RESPONSE</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full text-center bg-[#111111] text-[#faf9f6] py-3 text-xs font-mono tracking-widest uppercase font-bold"
            >
              LAUNCH INTERACTIVE ESTIMATOR ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
