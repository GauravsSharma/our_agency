'use client';

import React from 'react';
import { Home, Layers, Calculator, Users, Mail } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: 'hero', label: 'HOME', icon: Home },
    { id: 'services', label: 'SERVICES', icon: Layers },
    { id: 'estimator', label: 'ESTIMATOR', icon: Calculator },
    { id: 'team', label: 'ABOUT', icon: Users },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-t border-[#e5e2dc] px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
              isActive ? 'text-[#c04a26]' : 'text-[#666460] hover:text-[#111111]'
            }`}
          >
            <Icon className={`w-4 h-4 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
            <span
              className={`font-mono text-[9px] uppercase tracking-wider ${
                isActive ? 'font-bold' : 'font-normal'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
