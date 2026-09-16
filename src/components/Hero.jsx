import React from 'react';
import { ArrowDown, Play, Sparkles, Cpu, Layers, Disc } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-grid-pattern">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/10 to-purple-600/15 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sub-badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-cyan-300 border border-cyan-500/30 mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Scroll-Driven Video Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-['Outfit']">
          Every Frame Governed By <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Scroll Motion
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light mb-10 leading-relaxed">
          5 high-definition video productions sequenced line by line. Scroll down to advance frame playback smoothly. Pause your scroll to freeze the motion canvas in real time.
        </p>

        {/* Feature Pill Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 mb-12">
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>GSAP ScrollTrigger Engine</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center space-x-2">
            <Disc className="w-3.5 h-3.5 text-purple-400" />
            <span>Realtime Frame Scrubbing</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>5 Line-by-Line Sequences</span>
          </div>
        </div>

        {/* Scroll down indicator button */}
        <div className="flex flex-col items-center">
          <a
            href="#video-section-1"
            className="group inline-flex flex-col items-center text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span className="text-xs font-mono uppercase tracking-widest mb-2 group-hover:translate-y-0.5 transition-transform">
              Scroll to explore
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-slate-700 group-hover:border-cyan-500/60 flex items-start justify-center p-1.5 transition-colors">
              <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
