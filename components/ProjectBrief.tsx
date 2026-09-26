'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, Shield, MessageSquare, Mail, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScopeState } from './ScopeEstimator';
import { ADDONS, ARCHETYPES } from '../data/studioData';

interface ProjectBriefProps {
  scopeState: ScopeState;
  customScopeNotes: string;
  setCustomScopeNotes: (notes: string) => void;
}

export const ProjectBrief: React.FC<ProjectBriefProps> = ({
  scopeState,
  customScopeNotes,
  setCustomScopeNotes,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classification, setClassification] = useState('Landing Page System');
  const [budgetRange, setBudgetRange] = useState('₹5,000 — ₹10,000 INR');
  const [ndaChecked, setNdaChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const WHATSAPP_NUMBER = '917417124246';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedTicket = `GA-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setSubmitted(true);

      // Build WhatsApp message with all form details
      const message = [
        `🚀 *NEW PROJECT BRIEF — ${generatedTicket}*`,
        ``,
        `*Name / Organization:* ${name}`,
        `*Email:* ${email}`,
        `*Classification:* ${classification}`,
        `*Investment Allocation:* ${budgetRange}`,
        `*NDA Compliant:* ${ndaChecked ? 'Yes ✅' : 'No'}`,
        ``,
        `*Scope Specification:*`,
        customScopeNotes || '(No scope notes provided)',
        ``,
        `— Submitted via G&A Studio Website`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Trigger celebratory confetti for real client feedback
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#c04a26', '#111111', '#8c8984'],
      });
    }, 900);
  };

  return (
    <section id="contact" className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Section Header Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c04a26]">[ 06 ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666460]">
            MODULE 06 // INITIATE TRANSMISSION
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460]">
          DIRECT SCOPE INTAKE // 24-HOUR RESPONSE POLICY
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Coordinates & Policies (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] uppercase leading-none mb-6">
                START A<br />
                PROJECT
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444748] leading-relaxed">
                Send us your initial specifications or current application baseline. We review
                technical viability within 24 hours and issue an itemized project trajectory with
                fixed delivery dates.
              </p>
            </div>

            {/* Communication Policy Banner */}
            <div className="border border-[#e5e2dc] bg-[#f4f3f0] p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#c04a26] block mb-2 font-semibold">
                COMMUNICATION POLICY
              </span>
              <p className="font-sans text-xs text-[#444748] leading-relaxed">
                Guaranteed response within 24 business hours. You receive a structured scoping
                deck and calendar link for an architectural review call.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="border-t border-[#e5e2dc] pt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#e5e2dc]/60">
                <span className="text-[#666460]">GAURAV EMAIL:</span>
                <a
                  href="mailto:gauravsharma16072001@gmail.com"
                  className="text-[#111111] hover:text-[#c04a26] font-semibold"
                >
                  gauravsharma16072001@gmail.com
                </a>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dc]/60">
                <span className="text-[#666460]">AKBAR EMAIL:</span>
                <a
                  href="mailto:akbarkh7417@gmail.com"
                  className="text-[#111111] hover:text-[#c04a26] font-semibold"
                >
                  akbarkh7417@gmail.com
                </a>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dc]/60">
                <span className="text-[#666460]">STUDIO PRESENCE:</span>
                <span className="text-[#111111]">TAJNAGRI PHASE 1, AGRA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dc]/60">
                <span className="text-[#666460]">TIMEZONE:</span>
                <span className="text-[#111111]">INDIA STANDARD TIME (UTC +5:30)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dc]/60">
                <span className="text-[#666460]">AVAILABILITY:</span>
                <span className="text-[#c04a26] font-semibold">
                  2024/2025 [SLOTS OPEN Q4/Q1]
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-[#111111] bg-[#111111] text-[#faf9f6] p-8 sm:p-10 text-center animate-in fade-in duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#c04a26] text-white mb-6">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#8c8984] mb-2">
                  TRANSMISSION ACKNOWLEDGED // TICKET: {ticketId}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#faf9f6] uppercase tracking-tight mb-4">
                  BRIEF LOGGED SUCCESSFULLY
                </h3>
                <p className="font-sans text-sm text-[#8c8984] max-w-md mx-auto leading-relaxed mb-6">
                  Gaurav Sharma &amp; Akbar Khan will personally audit your technical requirements
                  and reply within 24 hours with an architectural timeline and proposal.
                </p>
                <div className="pt-4 border-t border-[#262626] flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs uppercase tracking-widest px-6 py-2.5 bg-[#faf9f6] text-[#111111] hover:bg-[#c04a26] hover:text-[#ffffff] transition-colors"
                  >
                    SUBMIT ANOTHER BRIEF
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-[#e5e2dc] bg-[#ffffff] p-6 sm:p-8 space-y-6"
              >
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666460] mb-2">
                      YOUR NAME / ORGANIZATION *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adrian Vance, Praxis Ltd."
                      className="w-full bg-[#faf9f6] border-b border-[#e5e2dc] focus:border-[#111111] px-3 py-2.5 text-sm text-[#111111] font-sans outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666460] mb-2">
                      DIRECT EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. adrian@praxis.io"
                      className="w-full bg-[#faf9f6] border-b border-[#e5e2dc] focus:border-[#111111] px-3 py-2.5 text-sm text-[#111111] font-sans outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Classification & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666460] mb-2">
                      CLASSIFICATION
                    </label>
                    <select
                      value={classification}
                      onChange={(e) => setClassification(e.target.value)}
                      className="w-full bg-[#faf9f6] border-b border-[#e5e2dc] focus:border-[#111111] px-3 py-2.5 text-sm text-[#111111] font-sans outline-none cursor-pointer"
                    >
                      <option value="Landing Page System">Landing Page System</option>
                      <option value="Business & Portfolio Site">Business &amp; Portfolio Site</option>
                      <option value="E-Commerce Storefront">E-Commerce Storefront</option>
                      <option value="Web App / SaaS Dashboard">Web App / SaaS Dashboard</option>
                      <option value="Redesign, Audit & Retainer">
                     Redesign, Audit & Retainer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666460] mb-2">
                      INVESTMENT ALLOCATION
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-[#faf9f6] border-b border-[#e5e2dc] focus:border-[#111111] px-3 py-2.5 text-sm text-[#111111] font-sans outline-none cursor-pointer"
                    >
                      <option value="₹5,000 — ₹10,000 INR">₹5,000 — ₹10,000 INR</option>
                      <option value="₹10,000 — ₹20,000 INR">₹10,000 — ₹20,000 INR</option>
                      <option value="₹20,000 — ₹40,000 INR">₹20,000 — ₹40,000 INR</option>
                      <option value="₹40,000+ INR">₹40,000+ INR</option>
                    </select>
                  </div>
                </div>

                {/* Scope Specification Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#666460]">
                      SCOPE SPECIFICATION / PROJECT OVERVIEW
                    </label>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#c04a26]">
                      IN SYNC WITH ESTIMATOR
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={customScopeNotes}
                    onChange={(e) => setCustomScopeNotes(e.target.value)}
                    placeholder="Describe your product architecture, user flows, reference designs, or timeline goals..."
                    className="w-full bg-[#faf9f6] border border-[#e5e2dc] p-3 text-xs sm:text-sm font-mono text-[#111111] leading-relaxed outline-none focus:border-[#111111]"
                  ></textarea>
                </div>

                {/* NDA and IP protection checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <label
                    onClick={() => setNdaChecked(!ndaChecked)}
                    className="flex items-center gap-2 cursor-pointer font-mono text-[11px] text-[#444748]"
                  >
                    <div
                      className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                        ndaChecked
                          ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                          : 'border-[#c4c7c7] bg-[#faf9f6]'
                      }`}
                    >
                      {ndaChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>NDA &amp; IP PROTECTION COMPLIANT BY DEFAULT</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#c04a26] text-[#faf9f6] font-mono text-xs uppercase tracking-widest py-4 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING BRIEF DATA...</span>
                  ) : (
                    <>
                      <span>TRANSMIT PROJECT BRIEF</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct communication channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <a
                href="mailto:gauravsharma16072001@gmail.com"
                className="border border-[#e5e2dc] bg-[#faf9f6] hover:bg-[#ffffff] p-3.5 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-[#c04a26] shrink-0" />
                  <span className="font-mono text-xs text-[#111111] truncate">gauravsharma16072001@gmail.com</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666460] group-hover:text-[#111111] shrink-0 ml-2">
                  GAURAV ↗
                </span>
              </a>

              <a
                href="mailto:akbarkh7417@gmail.com"
                className="border border-[#e5e2dc] bg-[#faf9f6] hover:bg-[#ffffff] p-3.5 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-[#c04a26] shrink-0" />
                  <span className="font-mono text-xs text-[#111111] truncate">akbarkh7417@gmail.com</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666460] group-hover:text-[#111111] shrink-0 ml-2">
                  AKBAR ↗
                </span>
              </a>

              <a
                href="https://wa.me/917417124246"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#e5e2dc] bg-[#faf9f6] hover:bg-[#ffffff] p-3.5 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#c04a26]" />
                  <span className="font-mono text-xs text-[#111111]">WhatsApp Direct Line</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666460] group-hover:text-[#111111]">
                  QUICK CHAT ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
