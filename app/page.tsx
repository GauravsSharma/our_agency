'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesLedger } from '../components/ServicesLedger';
import { WorkArchive } from '../components/WorkArchive';
import { ScopeEstimator, ScopeState } from '../components/ScopeEstimator';
import { Principals } from '../components/Principals';
import { ProjectBrief } from '../components/ProjectBrief';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ADDONS, ARCHETYPES } from '../data/studioData';
import { ServiceItem } from '../types';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Calculator Scope State
  const [scopeState, setScopeState] = useState<ScopeState>({
    archetypeId: 'landing_page',
    screens: 4,
    selectedAddons: ['admin_cms', 'payments_engine'],
    designFramework: 'bespoke',
    deliveryVelocity: 'standard',
  });

  // Project brief custom notes (synced with calculator)
  const [customScopeNotes, setCustomScopeNotes] = useState<string>(() => {
    return generateScopeSummary({
      archetypeId: 'landing_page',
      screens: 4,
      selectedAddons: ['admin_cms', 'payments_engine'],
      designFramework: 'bespoke',
      deliveryVelocity: 'standard',
    });
  });

  // Helper to generate the exact scope summary as shown in the screenshot
  function generateScopeSummary(scope: ScopeState): string {
    const arch = ARCHETYPES.find((a) => a.id === scope.archetypeId) || ARCHETYPES[0];
    const addonNames = scope.selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return `[ CALCULATOR SCOPE SUMMARY: ]
• Target Archetype: ${arch.name} [₹${arch.basePrice.toLocaleString()}]
• Scope Count: ${scope.screens} Interactive Views/Screens
• Add-on Features: ${addonNames || 'None selected'}
• Design Tier: ${scope.designFramework.toUpperCase()} [${scope.designFramework === 'bespoke' ? '1.0x' : '0.85x'}]
• Delivery Velocity: ${
      scope.deliveryVelocity === 'priority' ? 'PRIORITY RUSH [+35%]' : 'Standard Delivery (2 — 3 WEEKS)'
    }`;
  }

  // Sync summary when estimator changes
  const handleUpdateScope = (updater: (prev: ScopeState) => ScopeState) => {
    setScopeState((prev) => {
      const next = updater(prev);
      setCustomScopeNotes(generateScopeSummary(next));
      return next;
    });
  };

  // Lock estimate handler
  const handleLockEstimate = () => {
    const summary = generateScopeSummary(scopeState);
    setCustomScopeNotes(summary);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select service from ledger
  const handleSelectServiceFromLedger = (service: ServiceItem) => {
    // Map service to archetype
    let targetArchetype = 'landing_page';
    if (service.id === 'business_portfolio') targetArchetype = 'business_site';
    else if (service.id === 'ecommerce') targetArchetype = 'ecommerce_store';
    else if (service.id === 'webapps_saas') targetArchetype = 'webapp_saas';
    else if (service.id === 'redesign_audit') targetArchetype = 'architectural_redesign';
    else if (service.id === 'ai_automation') {
      targetArchetype = 'webapp_saas';
    }

    setScopeState((prev) => {
      const next = {
        ...prev,
        archetypeId: targetArchetype,
        selectedAddons:
          service.id === 'ai_automation'
            ? Array.from(new Set([...prev.selectedAddons, 'rag_chatbot']))
            : prev.selectedAddons,
      };
      setCustomScopeNotes(generateScopeSummary(next));
      return next;
    });

    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Allow modals to pause / resume Lenis via custom events
    const handleStop = () => lenis.stop();
    const handleStart = () => lenis.start();
    window.addEventListener('lenis:stop', handleStop);
    window.addEventListener('lenis:start', handleStart);

    // Track active section for mobile navigation
    const sections = ['hero', 'services', 'work', 'estimator', 'team', 'contact'];
    const handleScrollTracking = () => {
      const scrollY = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollTracking);

    // GSAP ScrollTrigger subtle reveal effects
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('section h2').forEach((header) => {
        gsap.from(header, {
          y: 24,
          opacity: 0.2,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScrollTracking);
      window.removeEventListener('lenis:stop', handleStop);
      window.removeEventListener('lenis:start', handleStart);
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // Precision custom cursor follower on desktop
  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf9f6] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#faf9f6] relative paper-grain overflow-x-hidden"
    >
      {/* Precision cursor follower for desktop editorial feel */}
      <div
        ref={cursorDotRef}
        className="cursor-follower hidden md:block w-3 h-3 bg-[#c04a26] rounded-full mix-blend-difference pointer-events-none opacity-80"
        style={{ top: 0, left: 0 }}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenCalculator={() => scrollTo('estimator')}
        onOpenBrief={() => scrollTo('contact')}
      />

      <main>
        {/* Module 01: Hero */}
        <div id="hero">
          <Hero
            onScrollToEstimator={() => scrollTo('estimator')}
            onScrollToWork={() => scrollTo('work')}
          />
        </div>

        {/* Module 02: Services Ledger */}
        <ServicesLedger onSelectService={handleSelectServiceFromLedger} />

        {/* Module 03: Selected Work Archive */}
        <WorkArchive />

        {/* Module 04: Dynamic Scope Estimator */}
        <ScopeEstimator
          scopeState={scopeState}
          onUpdateScope={handleUpdateScope}
          onLockEstimate={handleLockEstimate}
        />

        {/* Module 05: Principals / Engineers Only */}
        <Principals />

        {/* Module 06: Initiate Transmission / Project Brief */}
        <ProjectBrief
          scopeState={scopeState}
          customScopeNotes={customScopeNotes}
          setCustomScopeNotes={setCustomScopeNotes}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={(id) => scrollTo(id)}
      />
    </div>
  );
}
