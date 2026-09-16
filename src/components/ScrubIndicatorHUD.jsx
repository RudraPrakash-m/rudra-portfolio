import React from 'react';
import { Play, Disc, Film } from 'lucide-react';

export const ScrubIndicatorHUD = ({ activeIndex, total, onSelectTrack }) => {
  const titles = [
    'Neural Kinetics',
    'Monolithic Form',
    'Quantum Flux',
    'Cybernetic Vision',
    'Apex Finale'
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-xl text-white">
      {/* Playing Status Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold">
          PLAYING VIDEO 0{activeIndex + 1}
        </span>
      </div>

      {/* Screen Title */}
      <div className="flex items-center gap-2 text-xs font-mono px-2 text-slate-300">
        <Film className="w-3.5 h-3.5 text-cyan-400" />
        <span>{titles[activeIndex]}</span>
        <span className="text-slate-600">&bull;</span>
        <span className="text-cyan-400 font-bold">SCREEN 0{activeIndex + 1} / 0{total}</span>
      </div>

      {/* Screen Jump Buttons */}
      <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTrack(idx)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
              activeIndex === idx 
                ? 'bg-cyan-400 text-black shadow-sm shadow-cyan-400 scale-105' 
                : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
            title={`Switch to Screen 0${idx + 1}: ${titles[idx]}`}
          >
            0{idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
