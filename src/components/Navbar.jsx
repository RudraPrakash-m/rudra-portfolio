import React from 'react';
import { Film, PlayCircle, Sparkles, Layers } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#06070a]/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-['Outfit']">
              <span>RUDRA</span>
              <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                MOTION STUDIO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">
              GSAP SCROLL-TRIGGERED TIMELINES
            </p>
          </div>
        </div>

        {/* Center Pill */}
        <div className="hidden md:flex items-center space-x-1 glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>5 Optimized Motion Sequences</span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          <a
            href="#video-section-1"
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Begin Scroll</span>
          </a>
        </div>
      </div>
    </header>
  );
};
