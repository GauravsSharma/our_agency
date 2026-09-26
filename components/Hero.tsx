'use client';

import React from 'react';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToEstimator: () => void;
  onScrollToWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToEstimator, onScrollToWork }) => {
  return (
    <section className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Container with architectural grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Main Headline & Narrative (7 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Mono meta tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-[#c04a26] inline-block"></span>
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#666460]">
                  MODERN DIGITAL ATELIER // EST. 2024 // AGRA
                </span>
              </div>

              {/* Chiseled Display Typography */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-light leading-[0.94] tracking-[-0.035em] text-[#111111] uppercase mb-8">
                FAST, MODERN WEBSITES
                AT FAIR FIXED PRICES.
              </h1>

              {/* Editorial Description */}
              <p className="font-sans text-lg sm:text-xl text-[#444748] font-normal leading-relaxed max-w-2xl mb-10">
                A boutique two-person engineering studio crafting high-performance digital
                products, bespoke web applications, and editorial online storefronts without
                agency bloat or intermediate friction.
              </p>
            </div>

            {/* Action Buttons matching the mockup */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onScrollToEstimator}
                className="group inline-flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#c04a26] text-[#faf9f6] font-mono text-xs uppercase tracking-widest px-7 py-4 transition-all duration-200 border border-[#111111]"
              >
                <span>CALCULATE PROJECT COST</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onScrollToWork}
                className="group inline-flex items-center justify-center gap-3 bg-transparent hover:bg-[#111111] text-[#111111] hover:text-[#faf9f6] font-mono text-xs uppercase tracking-widest px-7 py-4 transition-all duration-200 border border-[#111111]"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Metric Matrix Grid (4 or 5 cols on desktop) */}
          <div className="lg:col-span-4 w-full">
            <div className="grid grid-cols-2 gap-px bg-[#e5e2dc] border border-[#e5e2dc]">
              {/* Metric 1 */}
              <div className="bg-[#faf9f6] p-6 sm:p-7 flex flex-col justify-between hover:bg-[#ffffff] transition-colors group">
                <span className="font-display text-4xl sm:text-5xl font-light text-[#111111] group-hover:text-[#c04a26] transition-colors">
                  02
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460] mt-4 leading-snug">
                  PARTNERS WRITING CODE
                </span>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#faf9f6] p-6 sm:p-7 flex flex-col justify-between hover:bg-[#ffffff] transition-colors group">
                <span className="font-display text-4xl sm:text-5xl font-light text-[#111111] group-hover:text-[#c04a26] transition-colors">
                  00%
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460] mt-4 leading-snug">
                  AGENCY BLOATWARE
                </span>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#faf9f6] p-6 sm:p-7 flex flex-col justify-between hover:bg-[#ffffff] transition-colors group">
                <span className="font-display text-4xl sm:text-5xl font-light text-[#111111] group-hover:text-[#c04a26] transition-colors">
                  100%
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460] mt-4 leading-snug">
                  AUTHORED CODEBASE
                </span>
              </div>

              {/* Metric 4 */}
              <div className="bg-[#faf9f6] p-6 sm:p-7 flex flex-col justify-between hover:bg-[#ffffff] transition-colors group">
                <span className="font-display text-4xl sm:text-5xl font-light text-[#111111] group-hover:text-[#c04a26] transition-colors">
                  98+
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460] mt-4 leading-snug">
                  AVG LIGHTHOUSE SCORE
                </span>
              </div>
            </div>

            {/* Bottom ledger descriptor */}
            <div className="mt-3 px-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#666460]">
              <span>LEDGER: FIXED CAPACITY</span>
              <span className="text-[#c04a26]">• ZERO SUBCONTRACTORS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
