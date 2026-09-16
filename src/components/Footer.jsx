import React from 'react';
import { Film, Heart, Sparkles, ArrowUp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative border-t border-slate-800/80 bg-[#06070a] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Film className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm font-['Outfit']">
              Rudra Motion Portfolio
            </span>
            <p className="text-xs text-slate-500 font-mono">
              Crafted with GSAP ScrollTrigger & React
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono text-center md:text-right">
          <p>Scrub-synced interactive video sequence showcasing all 5 public media tracks.</p>
          <p className="text-slate-600 mt-1">Scroll up or down to scrub frame timelines.</p>
        </div>
      </div>
    </footer>
  );
};
