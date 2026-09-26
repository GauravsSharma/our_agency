'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, X, ShieldCheck, Cpu, Database, Layers } from 'lucide-react';
import { CASE_STUDIES } from '../data/studioData';
import { CaseStudy } from '../types';

export const WorkArchive: React.FC = () => {
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  // Lock body scroll and pause Lenis when modal is open
  useEffect(() => {
    if (activeModalStudy) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
    };
  }, [activeModalStudy]);

  return (
    <section id="work" className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Section Header Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c04a26]">[ 03 ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666460]">
            MODULE 03 // PRODUCTION REPO
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460]">
          PRODUCTION-GRADE ARCHITECTURES
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] uppercase leading-none">
              SELECTED WORK<br />
              ARCHIVE
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#666460] max-w-md font-normal leading-relaxed">
            Production applications engineered for active complex operational and e-commerce
            bottlenecks. Hand-coded from zero with verified performance criteria.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between border border-[#e5e2dc] bg-[#faf9f6] hover:bg-[#ffffff] transition-all duration-300 relative"
            >
              {/* Card Header Zone */}
              <div className="p-5 border-b border-[#e5e2dc] flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-wider">
                <span
                  className={`px-2 py-0.5 border ${
                    project.isClient
                      ? 'border-[#c04a26] text-[#c04a26] bg-[#c04a26]/5'
                      : 'border-[#111111] text-[#111111] bg-[#111111]/5'
                  }`}
                >
                  {project.badge}
                </span>
                <span className="text-[#666460] font-medium">{project.number}</span>
              </div>

              {/* Media Window with hover zoom and architectural hairline framing */}
              <div
                onClick={() => setActiveModalStudy(project)}
                className="relative aspect-[16/10] overflow-hidden bg-[#e5e2dc] cursor-pointer"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#111111]/10 group-hover:opacity-0 transition-opacity"></div>
                <div className="absolute bottom-2 right-2 bg-[#111111]/85 text-[#faf9f6] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider backdrop-blur-xs">
                  {project.statusText || 'VIEW REPO'}
                </div>
              </div>

              {/* Content Body Zone */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveModalStudy(project)}
                    className="font-display text-lg sm:text-xl font-normal text-[#111111] uppercase tracking-tight group-hover:text-[#c04a26] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed mt-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags & Footer */}
                <div className="mt-6 pt-4 border-t border-[#e5e2dc]">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-[#e5e2dc] text-[#666460]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalStudy(project)}
                    className="w-full inline-flex items-center justify-between bg-[#111111] hover:bg-[#c04a26] text-[#faf9f6] font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 transition-colors"
                  >
                    <span>{project.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Architectural Modal */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div data-lenis-prevent className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#faf9f6] border border-[#111111] p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#c04a26]">[ {activeModalStudy.number} ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
                  {activeModalStudy.badge}
                </span>
              </div>
              <button
                onClick={() => setActiveModalStudy(null)}
                className="p-1 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#faf9f6] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Hero Image */}
            <div className="aspect-[16/9] w-full overflow-hidden mb-6 border border-[#e5e2dc]">
              <img
                src={activeModalStudy.imageUrl}
                alt={activeModalStudy.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Narrative */}
            <h3 className="font-display text-2xl sm:text-3xl font-light text-[#111111] uppercase tracking-tight mb-2">
              {activeModalStudy.title}
            </h3>
            <p className="font-mono text-xs text-[#c04a26] tracking-wider uppercase mb-4">
              {activeModalStudy.clientSubtitle}
            </p>

            <p className="font-sans text-sm text-[#444748] leading-relaxed mb-6">
              {activeModalStudy.description}
            </p>

            {/* Architectural Metrics */}
            {activeModalStudy.metrics && (
              <div className="grid grid-cols-3 gap-px bg-[#e5e2dc] border border-[#e5e2dc] mb-6">
                {activeModalStudy.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#faf9f6] p-4 text-center">
                    <span className="font-display text-xl sm:text-2xl font-light text-[#111111] block">
                      {metric.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#666460]">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Matrix */}
            <div className="border border-[#e5e2dc] p-4 mb-6 bg-[#f4f3f0]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#666460] block mb-2">
                DEPLOYED INFRASTRUCTURE &amp; STACK:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalStudy.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 bg-[#111111] text-[#faf9f6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e5e2dc]">
              {activeModalStudy.demoUrl && activeModalStudy.demoUrl !== '#' && (
                <a
                  href={activeModalStudy.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-2.5 bg-[#111111] text-[#faf9f6] hover:bg-[#c04a26] transition-colors"
                >
                  <span>LAUNCH DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setActiveModalStudy(null)}
                className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#faf9f6] transition-colors"
              >
                CLOSE SPEC
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
