import React, { useEffect, useState } from 'react';
import { ChevronUp, Film } from 'lucide-react';

export const ScrollNavigator = ({ videos }) => {
  const [activeId, setActiveId] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Determine which video is in view
      videos.forEach((v) => {
        const el = document.getElementById(`video-section-${v.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveId(v.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videos]);

  const scrollToVideo = (id) => {
    const el = document.getElementById(`video-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Right Floating Vertical Quick Bar */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 p-2 rounded-2xl glass-panel border border-slate-800 shadow-2xl">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest rotate-90 my-2">
          TRACK
        </span>

        {videos.map((v) => {
          const isActive = activeId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => scrollToVideo(v.id)}
              className={`group relative flex items-center justify-center w-8 h-8 rounded-xl font-mono text-xs transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500 text-black font-bold scale-110 shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>0{v.id}</span>
              
              {/* Hover Tooltip */}
              <span className="absolute right-10 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                {v.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Bottom Center Bar for Mobile / Tablet */}
      <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center md:hidden px-4">
        <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-slate-700/80 shadow-2xl">
          {videos.map((v) => {
            const isActive = activeId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => scrollToVideo(v.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                0{v.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Back to top floating button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl glass-panel border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500/20 shadow-xl transition-all duration-300 hover:scale-105"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
