import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { rudraData } from '../../data/videos';

export const TimelineSection = ({ sectionRef, isActive = true }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.timeline-fade'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full h-full min-h-screen flex items-center justify-end px-5 sm:px-12 lg:px-24 py-12 sm:py-16 pointer-events-none select-none"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-xl ml-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-3 sm:gap-4 pointer-events-auto z-20 bg-[#f5f5f5]/65 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-3xl"
      >
        {/* Journey Heading */}
        <div className="timeline-fade w-full flex flex-col items-center lg:items-end">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1c1c] mb-2 sm:mb-3">
            Journey
          </h2>

          {/* Education & Career Journey Graphic */}
          <div className="w-full flex justify-center lg:justify-end my-1">
            <img 
              src="/journy.png" 
              alt="Rudra Prakash Mallick Education and Career Journey" 
              width="580"
              height="380"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[38vh] sm:max-h-[42vh] max-w-[340px] sm:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl drop-shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Core Technology Stack */}
        <div className="timeline-fade w-full pt-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1c1c1c] mb-2 text-center lg:text-right">
            Core Technology Stack
          </h3>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2 max-w-lg ml-auto">
            {rudraData.skills.map((skill, i) => (
              skill === "Git & GitHub" ? (
                <a 
                  key={i}
                  href={rudraData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-black/10 hover:bg-black text-black hover:text-white text-[11px] sm:text-xs font-mono font-semibold transition-all border border-black/10 cursor-pointer"
                  title="View GitHub Profile (RudraPrakash-m)"
                >
                  {skill} ↗
                </a>
              ) : (
                <span 
                  key={i} 
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 text-[11px] sm:text-xs font-mono text-[#1c1c1c] font-semibold transition-colors border border-black/5"
                >
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
