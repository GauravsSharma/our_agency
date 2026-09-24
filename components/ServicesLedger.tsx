'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/studioData';
import { ServiceItem } from '../types';

interface ServicesLedgerProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesLedger: React.FC<ServicesLedgerProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Section Header Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c04a26]">[ 02 ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666460]">
            MODULE 02 // CAPABILITIES
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460]">
          GUARANTEED FIXED DELIVERABLES, ZERO HIDDEN AGENCY RETAINERS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] uppercase leading-none">
              FIXED ENGAGEMENT<br />
              PRICING
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#666460] max-w-md font-normal leading-relaxed">
            Transparent fixed-cost architecture for high-performance codebases. You receive
            exact pricing, unambiguous milestones, and production code ownership.
          </p>
        </div>

        {/* Ledger Table Rows */}
        <div className="border-t border-[#e5e2dc] divide-y divide-[#e5e2dc]">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`transition-colors duration-200 ${
                  isExpanded ? 'bg-[#ffffff]' : 'hover:bg-[#f4f3f0]'
                }`}
              >
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="cursor-pointer py-6 sm:py-8 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                >
                  {/* Number & Service Title */}
                  <div className="md:col-span-4 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#c04a26] shrink-0 font-medium">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-normal text-[#111111] uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <div className="font-mono text-xs font-semibold text-[#c04a26] mt-1.5 md:hidden">
                        {service.startingPrice}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="font-sans text-sm sm:text-[15px] text-[#444748] leading-relaxed">
                      {service.description}
                    </p>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {service.stackTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#e5e2dc] bg-[#faf9f6] text-[#444748]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-2 md:pt-0">
                    <div className="hidden md:block font-mono text-sm font-semibold tracking-wider text-[#111111]">
                      {service.startingPrice}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectService(service);
                        }}
                        className="inline-flex items-center gap-1 bg-[#111111] hover:bg-[#c04a26] text-[#faf9f6] font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 transition-colors"
                      >
                        <span>ESTIMATE</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        aria-label="Expand deliverables"
                        className="p-1.5 text-[#666460] hover:text-[#111111] border border-[#e5e2dc] bg-[#faf9f6]"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Deliverables Ledger */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 bg-[#f9f8f5] border-t border-[#e5e2dc]/60">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                      <div className="md:col-span-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#c04a26] block mb-2">
                          [ SCOPE SPECIFICATIONS &amp; DELIVERABLES ]
                        </span>
                        <p className="font-sans text-xs text-[#666460] leading-relaxed">
                          All deliverables are production-tested, signed off by Gaurav Sharma &amp;
                          Akbar Khan, and deployed with automated pipelines.
                        </p>
                      </div>

                      <div className="md:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#c04a26] mt-0.5 shrink-0" />
                              <span className="font-sans text-xs text-[#111111]">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#e5e2dc] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#666460]">IP &amp; CODEBASE REPOSITORY:</span>
                          <span className="text-[#111111] font-semibold">100% CLIENT OWNED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
