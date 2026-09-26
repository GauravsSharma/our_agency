'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full border-t border-[#e5e2dc] bg-[#faf9f6] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Studio Brand and Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-display text-2xl font-bold tracking-tight text-[#111111]">
              KAELITH STUDIO
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#666460] leading-relaxed max-w-sm">
              Architectural digital design and engineering atelier crafting monolithic
              experiences for discerning brands globally.
            </p>

            <div className="pt-2 font-mono text-[11px] text-[#666460] space-y-1">
              <div>
                CURRENT OCCUPANCY:{' '}
                <span className="text-[#c04a26] font-semibold">50% [1 ACTIVE SLOT]</span>
              </div>
              <div>© {new Date().getFullYear()} KAELITH STUDIO. ALL RIGHTS RESERVED.</div>
            </div>
          </div>

          {/* Navigation Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
            {/* Index */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111111] font-semibold block mb-4">
                [ INDEX ]
              </span>
              <ul className="space-y-2.5 text-[#666460]">
                <li>
                  <button
                    onClick={() => scrollTo('services')}
                    className="hover:text-[#111111] transition-colors"
                  >
                    SERVICES
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('work')}
                    className="hover:text-[#111111] transition-colors"
                  >
                    SELECTED WORK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('estimator')}
                    className="hover:text-[#111111] transition-colors"
                  >
                    SCOPE ESTIMATOR
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('team')}
                    className="hover:text-[#111111] transition-colors"
                  >
                    ARCHITECTURE &amp; TEAM
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="hover:text-[#111111] transition-colors"
                  >
                    ENQUIRIES
                  </button>
                </li>
              </ul>
            </div>

            {/* Dispatch */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111111] font-semibold block mb-4">
                [ DISPATCH ]
              </span>
              <div className="space-y-2 text-[#666460] leading-relaxed text-[11px]">
                <a
                  href="mailto:gauravsharma16072001@gmail.com"
                  className="block text-[#111111] hover:text-[#c04a26]"
                >
                  gauravsharma16072001@gmail.com
                </a>
                <a
                  href="mailto:akbarkh7417@gmail.com"
                  className="block text-[#111111] hover:text-[#c04a26]"
                >
                  akbarkh7417@gmail.com
                </a>
                <div>TAJNAGRI PHASE 1</div>
                <div>AGRA, INDIA — IN</div>
                <div>GMT +5:30</div>
              </div>
            </div>

            {/* Channels */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111111] font-semibold block mb-4">
                [ CHANNELS ]
              </span>
              <ul className="space-y-2 text-[#666460]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111111] inline-flex items-center gap-1"
                  >
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111111] inline-flex items-center gap-1"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917417124246"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111111] inline-flex items-center gap-1"
                  >
                    <span>WHATSAPP</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111111] inline-flex items-center gap-1"
                  >
                    <span>X / TWITTER</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hairline sub-footer */}
        <div className="mt-12 pt-6 border-t border-[#e5e2dc] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#666460]">
          <div>AGRA // REMOTE DIGITAL ATELIER</div>
          <div className="flex items-center gap-4">
            <span>REV: 2.4.0</span>
            <span className="text-[#c04a26]">■ ALL SYSTEMS VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
