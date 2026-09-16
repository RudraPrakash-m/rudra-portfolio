import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Folder, FileText, ArrowUpRight } from 'lucide-react';
import { rudraData } from '../../data/videos';

export const WorksSection = ({ sectionRef, isActive = true }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.work-row'),
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full h-full min-h-screen flex items-center justify-end px-5 sm:px-12 lg:px-24 py-16 sm:py-20 pointer-events-none select-none"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-2xl ml-auto flex flex-col items-start gap-3 sm:gap-5 pointer-events-auto z-20 bg-[#f5f5f5]/65 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-3xl"
      >
        {/* Section Heading */}
        <h2 className="work-row text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1c1c] mb-1 sm:mb-3">
          Works
        </h2>

        {/* Projects List */}
        {rudraData.projects.map((item, idx) => (
          <a
            key={item.id}
            href={item.liveLink}
            target="_blank"
            rel="noreferrer"
            className="work-row group flex items-center justify-between w-full py-1 sm:py-2 cursor-pointer text-[#1c1c1c] hover:opacity-75 transition-opacity"
          >
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="shrink-0 text-[#1c1c1c] group-hover:scale-110 transition-transform">
                {idx === 4 ? (
                  <FileText className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.5]" />
                ) : (
                  <Folder className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.5]" />
                )}
              </div>
              <div className="text-left">
                <span className="font-medium tracking-tight text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight block">
                  {item.title}
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm text-[#1c1c1c]/60 font-mono mt-0.5 block">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 sm:p-2 text-neutral-600 group-hover:text-black shrink-0">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
