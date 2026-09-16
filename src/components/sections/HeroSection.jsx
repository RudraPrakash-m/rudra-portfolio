import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { rudraData } from '../../data/videos';

export const HeroSection = ({ sectionRef }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.hero-fade'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between px-5 sm:px-12 lg:px-24 py-16 sm:py-20 pointer-events-none select-none"
    >
      <div className="h-6 sm:h-12" />

      {/* Main Top / Center Typography */}
      <div 
        ref={contentRef}
        className="w-full max-w-4xl ml-auto text-right space-y-1 sm:space-y-2 pointer-events-auto z-20 pt-4 sm:pt-8 bg-[#f5f5f5]/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl"
      >
        <p className="hero-fade text-xl sm:text-3xl md:text-4xl font-medium text-[#1c1c1c]/90">
          Hi,
        </p>

        <h1 className="hero-fade text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-[#1c1c1c] leading-[0.95]">
          I build.
        </h1>

        <h1 className="hero-fade text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-[#1c1c1c] leading-[0.95]">
          Ideas launch.
          <span className="block mt-1 sm:mt-3">Simple.</span>
        </h1>
      </div>

      {/* Bottom Right Author Details */}
      <div className="w-full max-w-4xl ml-auto text-right pointer-events-auto z-20 pt-6 sm:pt-8 bg-[#f5f5f5]/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-2xl">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1c1c1c]">
          {rudraData.name}
        </h2>
        <div className="flex justify-end items-center gap-4 sm:gap-12 text-xs sm:text-base md:text-lg font-medium text-[#1c1c1c]/80 mt-1">
          <p>{rudraData.role}</p>
          <span className="text-neutral-400">&bull;</span>
          <p>MERN Stack</p>
        </div>
      </div>
    </section>
  );
};
