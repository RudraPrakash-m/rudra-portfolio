import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { rudraData } from '../../data/videos';

export const HeroSection = ({ sectionRef, isActive = true }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.hero-fade'),
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
      id="home"
      className="relative w-full h-full min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-24 py-12 sm:py-20 pointer-events-none select-none"
    >
      <div className="h-4 sm:h-12" />

      {/* Main Top / Center Typography - Clean Transparent Layout */}
      <div 
        ref={contentRef}
        className="w-full max-w-4xl ml-auto text-right space-y-1 sm:space-y-2 pointer-events-auto z-20"
      >
        <p className="hero-fade text-lg sm:text-3xl md:text-4xl font-medium text-white sm:text-[#1c1c1c]/90 mobile-text-glow sm:[text-shadow:none]">
          Hi,
        </p>

        <h1 className="hero-fade text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-white sm:text-[#1c1c1c] leading-[0.95] mobile-text-glow sm:[text-shadow:none]">
          I build.
        </h1>

        <h1 className="hero-fade text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-white sm:text-[#1c1c1c] leading-[0.95] mobile-text-glow sm:[text-shadow:none]">
          Ideas launch.
          <span className="block mt-1 sm:mt-3">Simple.</span>
        </h1>
      </div>

      {/* Bottom Right Author Details - Clean Transparent Layout */}
      <div className="w-full max-w-4xl ml-auto text-right pointer-events-auto z-20 pb-2 sm:pb-0">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white sm:text-[#1c1c1c] mobile-text-glow sm:[text-shadow:none]">
          {rudraData.name}
        </h2>
        <div className="flex justify-end items-center gap-3 sm:gap-12 text-xs sm:text-base md:text-lg font-medium text-neutral-200 sm:text-[#1c1c1c]/80 mt-1 mobile-subtext-glow sm:[text-shadow:none]">
          <p>{rudraData.role}</p>
          <span className="text-neutral-300 sm:text-neutral-400">&bull;</span>
          <p>MERN Stack</p>
        </div>
      </div>
    </section>
  );
};
