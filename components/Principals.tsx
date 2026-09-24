'use client';

import React from 'react';
import { ArrowUpRight, Github, Linkedin, Terminal, Code2 } from 'lucide-react';
import { FOUNDERS } from '../data/studioData';

export const Principals: React.FC = () => {
  return (
    <section id="team" className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Section Header Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c04a26]">[ 05 ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666460]">
            MODULE 05 // PRINCIPALS
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460]">
          ENGINEERS ONLY // DIRECT ACCESSIBILITY
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] uppercase leading-none">
              ENGINEERS<br />
              ONLY
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#666460] max-w-md font-normal leading-relaxed">
            Zero account executives or agency middlemen. When you collaborate with G&amp;A
            Studio, you speak and scope directly with the software engineers writing your
            production codebase.
          </p>
        </div>

        {/* Two Founder Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {FOUNDERS.map((founder, index) => (
            <div
              key={index}
              className="border border-[#e5e2dc] bg-[#faf9f6] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#ffffff] transition-all duration-300 group"
            >
              <div>
                {/* Header status bar */}
                <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-3 mb-6 font-mono text-[10px] sm:text-xs">
                  <span className="text-[#c04a26] uppercase font-semibold">
                    {founder.role}
                  </span>
                  <span className="text-[#666460] font-mono">{founder.location}</span>
                </div>

                {/* Founder Photo & Name Row */}
                <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                  {/* Portrait with high-contrast monochrome aesthetic */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 border border-[#111111] overflow-hidden bg-[#e5e2dc]">
                    <img
                      src={founder.avatarUrl}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-[#111111] uppercase tracking-tight group-hover:text-[#c04a26] transition-colors">
                      {founder.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed mt-2.5">
                      {founder.bio}
                    </p>
                  </div>
                </div>

                {/* Core Technical Competencies */}
                <div className="mt-4 pt-4 border-t border-[#e5e2dc]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#666460] block mb-2.5">
                    CORE TECHNICAL COMPETENCIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.competencies.map((comp, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#e5e2dc] text-[#111111] bg-[#faf9f6]"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social / Verified Links */}
              <div className="mt-8 pt-4 border-t border-[#e5e2dc] flex items-center gap-4 font-mono text-xs">
                <a
                  href={founder.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#c04a26] transition-colors uppercase tracking-wider"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <span className="text-[#e5e2dc]">•</span>

                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#c04a26] transition-colors uppercase tracking-wider"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
