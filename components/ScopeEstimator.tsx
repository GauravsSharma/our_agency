'use client';

import React, { useMemo } from 'react';
import { ArrowDown, Check, Info } from 'lucide-react';
import { ADDONS, ARCHETYPES } from '../data/studioData';
import { ProjectArchetype } from '../types';

export interface ScopeState {
  archetypeId: string;
  screens: number;
  selectedAddons: string[];
  designFramework: 'bespoke' | 'standard';
  deliveryVelocity: 'standard' | 'priority';
}

interface ScopeEstimatorProps {
  scopeState: ScopeState;
  onUpdateScope: (updater: (prev: ScopeState) => ScopeState) => void;
  onLockEstimate: () => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  scopeState,
  onUpdateScope,
  onLockEstimate,
}) => {
  const currentArchetype = useMemo(() => {
    return ARCHETYPES.find((a) => a.id === scopeState.archetypeId) || ARCHETYPES[0];
  }, [scopeState.archetypeId]);

  // Pricing formula computation
  const { lowEstimate, highEstimate, durationText, screenCost, addonCost } = useMemo(() => {
    const base = currentArchetype.basePrice;
    const additionalScreens = Math.max(0, scopeState.screens - 1);
    const calculatedScreenCost = additionalScreens * 100;

    let calculatedAddonCost = 0;
    scopeState.selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        calculatedAddonCost += addon.price;
      }
    });

    let rawTotal = base + calculatedScreenCost + calculatedAddonCost;

    // Design framework multiplier
    if (scopeState.designFramework === 'standard') {
      rawTotal *= 0.85;
    }

    // Velocity multiplier
    if (scopeState.deliveryVelocity === 'priority') {
      rawTotal *= 1.35;
    }

    const roundedLow = Math.round(rawTotal / 50) * 50;
    const roundedHigh = Math.round((rawTotal * 1.15) / 50) * 50;

    // Timeline calculation
    let weeks = 2;
    if (currentArchetype.id === 'landing_page') weeks = 1.5;
    else if (currentArchetype.id === 'business_site') weeks = 2.5;
    else if (currentArchetype.id === 'ecommerce_store') weeks = 3.5;
    else if (currentArchetype.id === 'webapp_saas') weeks = 5;

    if (scopeState.screens > 8) weeks += 1;
    if (scopeState.selectedAddons.length > 3) weeks += 1;
    if (scopeState.deliveryVelocity === 'priority') weeks = Math.max(1, weeks * 0.6);

    const minWeeks = Math.floor(weeks);
    const maxWeeks = Math.ceil(weeks + 1);

    return {
      lowEstimate: roundedLow,
      highEstimate: roundedHigh,
      durationText: `${minWeeks} — ${maxWeeks} WEEKS`,
      screenCost: calculatedScreenCost,
      addonCost: calculatedAddonCost,
    };
  }, [currentArchetype, scopeState]);

  const toggleAddon = (addonId: string) => {
    onUpdateScope((prev) => {
      const exists = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
    });
  };

  return (
    <section id="estimator" className="relative w-full border-b border-[#e5e2dc] bg-[#faf9f6]">
      {/* Section Header Bar */}
      <div className="border-b border-[#e5e2dc] px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c04a26]">[ 04 ]</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666460]">
            MODULE 04 // TRANSPARENCY ENGINE
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#666460]">
          INTERACTIVE COMPUTATIONAL PRICING MODEL. CALIBRATE DELIVERABLES IN REAL TIME.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] uppercase leading-none">
            DYNAMIC SCOPE<br />
            CALCULATOR
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Project Archetype */}
            <div>
              <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-2 mb-4 font-mono text-xs tracking-wider uppercase">
                <span className="text-[#111111] font-semibold">01. SELECT ARCHETYPE</span>
                <span className="text-[#c04a26]">BASE: ${currentArchetype.basePrice.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ARCHETYPES.map((arch) => {
                  const selected = scopeState.archetypeId === arch.id;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() =>
                        onUpdateScope((prev) => ({ ...prev, archetypeId: arch.id }))
                      }
                      className={`text-left p-3.5 border transition-all duration-150 flex items-center justify-between ${
                        selected
                          ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                          : 'border-[#e5e2dc] bg-[#faf9f6] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span className="font-mono text-xs uppercase tracking-wider font-medium">
                        {arch.name}
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          selected ? 'text-[#faf9f6]' : 'text-[#666460]'
                        }`}
                      >
                        ₹{arch.basePrice.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Screen Count Slider */}
            <div>
              <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-2 mb-4 font-mono text-xs tracking-wider uppercase">
                <span className="text-[#111111] font-semibold">02. TOTAL SCREEN / VIEW SCOPE</span>
                <span className="text-[#c04a26] font-semibold">
                  {scopeState.screens} {scopeState.screens === 1 ? 'SCREEN' : 'SCREENS'} [
                  {screenCost === 0 ? 'BASELINE' : `+₹${screenCost}`}]
                </span>
              </div>

              <div className="space-y-3 px-1">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={scopeState.screens}
                  onChange={(e) =>
                    onUpdateScope((prev) => ({ ...prev, screens: parseInt(e.target.value) }))
                  }
                  className="w-full h-1.5 bg-[#e5e2dc] appearance-none cursor-pointer accent-[#111111]"
                />
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-[#666460]">
                  <span>1 SCREEN [BASELINE]</span>
                  <span>4 SCREENS</span>
                  <span>10 SCREENS</span>
                  <span>20 SCREENS</span>
                </div>
              </div>
            </div>

            {/* Step 3: Infrastructure Add-ons */}
            <div>
              <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-2 mb-4 font-mono text-xs tracking-wider uppercase">
                <span className="text-[#111111] font-semibold">
                  03. ARCHITECTURAL INFRASTRUCTURE &amp; ADD-ONS
                </span>
                <span className="text-[#666460]">
                  {scopeState.selectedAddons.length} SELECTED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const isChecked = scopeState.selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer p-3 border transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-[#111111] bg-[#111111]/5 text-[#111111]'
                          : 'border-[#e5e2dc] bg-[#faf9f6] text-[#444748] hover:border-[#111111]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                              : 'border-[#c4c7c7] bg-[#faf9f6]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wide">
                          {addon.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#c04a26] font-semibold">
                        +₹{addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4 & 5: Design Framework & Velocity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Framework */}
              <div>
                <div className="border-b border-[#e5e2dc] pb-2 mb-3 font-mono text-xs tracking-wider uppercase text-[#111111] font-semibold">
                  04. DESIGN FRAMEWORK
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateScope((prev) => ({ ...prev, designFramework: 'bespoke' }))
                    }
                    className={`py-2.5 px-3 border font-mono text-xs uppercase tracking-wider text-center transition-all ${
                      scopeState.designFramework === 'bespoke'
                        ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                        : 'border-[#e5e2dc] bg-[#faf9f6] text-[#444748]'
                    }`}
                  >
                    BESPOKE [1.0X]
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateScope((prev) => ({ ...prev, designFramework: 'standard' }))
                    }
                    className={`py-2.5 px-3 border font-mono text-xs uppercase tracking-wider text-center transition-all ${
                      scopeState.designFramework === 'standard'
                        ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                        : 'border-[#e5e2dc] bg-[#faf9f6] text-[#444748]'
                    }`}
                  >
                    STANDARD [0.85X]
                  </button>
                </div>
              </div>

              {/* Velocity */}
              <div>
                <div className="border-b border-[#e5e2dc] pb-2 mb-3 font-mono text-xs tracking-wider uppercase text-[#111111] font-semibold">
                  05. DELIVERY VELOCITY
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateScope((prev) => ({ ...prev, deliveryVelocity: 'standard' }))
                    }
                    className={`py-2.5 px-3 border font-mono text-xs uppercase tracking-wider text-center transition-all ${
                      scopeState.deliveryVelocity === 'standard'
                        ? 'border-[#111111] bg-[#111111] text-[#faf9f6]'
                        : 'border-[#e5e2dc] bg-[#faf9f6] text-[#444748]'
                    }`}
                  >
                    STANDARD
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateScope((prev) => ({ ...prev, deliveryVelocity: 'priority' }))
                    }
                    className={`py-2.5 px-3 border font-mono text-xs uppercase tracking-wider text-center transition-all ${
                      scopeState.deliveryVelocity === 'priority'
                        ? 'border-[#c04a26] bg-[#c04a26] text-[#faf9f6]'
                        : 'border-[#e5e2dc] bg-[#faf9f6] text-[#444748]'
                    }`}
                  >
                    PRIORITY [+35%]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Computation Inverted Slab Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#111111] text-[#faf9f6] border border-[#111111] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                {/* Status dot and label */}
                <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#8c8984]">
                    LIVE SCOPE COMPUTATION
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#c04a26] animate-pulse"></span>
                </div>

                {/* Primary Price Range Headline */}
                <div className="mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c8984] block mb-1">
                    ESTIMATED INVESTMENT RANGE
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#faf9f6]">
                    ₹{lowEstimate.toLocaleString()} — ₹{highEstimate.toLocaleString()}
                  </div>
                </div>

                {/* Velocity and Payment Terms */}
                <div className="grid grid-cols-2 gap-4 border-y border-[#262626] py-4 mb-6 font-mono text-xs">
                  <div>
                    <span className="text-[#8c8984] text-[10px] uppercase tracking-wider block">
                      ESTIMATED VELOCITY
                    </span>
                    <span className="text-[#faf9f6] font-semibold text-sm">
                      {durationText}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8c8984] text-[10px] uppercase tracking-wider block">
                      PAYMENT TERMS
                    </span>
                    <span className="text-[#faf9f6] font-semibold text-sm">
                      50% INIT / 50% SHIP
                    </span>
                  </div>
                </div>

                {/* Detailed Breakdown Ledger */}
                <div className="space-y-2.5 font-mono text-xs text-[#8c8984] mb-8">
                  <div className="flex justify-between items-center pb-1 border-b border-[#262626]/60">
                    <span>ARCHETYPE BASE:</span>
                    <span className="text-[#faf9f6]">
                      {currentArchetype.name} [₹{currentArchetype.basePrice.toLocaleString()}]
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-1 border-b border-[#262626]/60">
                    <span>SCREEN SCALE:</span>
                    <span className="text-[#faf9f6]">
                      {scopeState.screens} VIEWS [+{screenCost === 0 ? '₹0' : `₹${screenCost}`}]
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-1 border-b border-[#262626]/60">
                    <span>ADD-ON FEATURES:</span>
                    <span className="text-[#faf9f6]">
                      {String(scopeState.selectedAddons.length).padStart(2, '0')} SELECTED [+₹
                      {addonCost}]
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-1 border-b border-[#262626]/60">
                    <span>DESIGN SYSTEM TIER:</span>
                    <span className="text-[#faf9f6] uppercase">
                      {scopeState.designFramework} [
                      {scopeState.designFramework === 'bespoke' ? '1.0X' : '0.85X'}]
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-1 border-b border-[#262626]/60">
                    <span>PIPELINE VELOCITY:</span>
                    <span className="text-[#faf9f6] uppercase">
                      {scopeState.deliveryVelocity === 'priority'
                        ? 'PRIORITY RUSH [+35%]'
                        : 'STANDARD DELIVERY'}
                    </span>
                  </div>
                </div>

                <p className="font-mono text-[10px] text-[#8c8984] leading-relaxed mb-6">
                  * Non-binding compute metric. Final binding quotation confirmed following a
                  15-minute scoping brief call.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={onLockEstimate}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#c04a26] hover:bg-[#a83916] text-[#ffffff] font-mono text-xs uppercase tracking-widest py-4 transition-colors font-bold shadow-md cursor-pointer"
              >
                <span>LOCK ESTIMATE INTO BRIEF</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
