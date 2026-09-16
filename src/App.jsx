import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundVideos } from './components/BackgroundVideos';
import { HeaderNav } from './components/HeaderNav';
import { SEO } from './components/SEO';
import { HeroSection } from './components/sections/HeroSection';
import { WorksSection } from './components/sections/WorksSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { PersonalCardsSection } from './components/sections/PersonalCardsSection';
import { ContactSection } from './components/sections/ContactSection';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const bgVideosRef = useRef(null);

  // 5 Section References
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  const sectionRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref];

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.3,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP ScrollTrigger to switch video as each screen enters view
    const triggers = [];

    sectionRefs.forEach((ref, index) => {
      const sectionEl = ref.current;
      if (!sectionEl) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      triggers.push(trigger);
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] text-[#1c1c1c] selection:bg-black selection:text-white overflow-x-hidden font-['Quicksand']">
      {/* SEO & Meta Tags */}
      <SEO />

      {/* 5 Left-Aligned Character Videos (Plays Active Video per Screen) */}
      <BackgroundVideos 
        ref={bgVideosRef} 
        isMuted={isMuted} 
        activeIndex={activeIndex} 
      />

      {/* Minimalist Top Right Header */}
      <HeaderNav 
        isMuted={isMuted} 
        setIsMuted={setIsMuted} 
      />

      {/* 5 Distinct Portfolio Screens */}
      <main className="relative z-10 w-full">
        {/* Screen 1: Home / Intro (Video 1) */}
        <HeroSection sectionRef={section1Ref} />

        {/* Screen 2: Works Folder List (Video 2) */}
        <WorksSection sectionRef={section2Ref} />

        {/* Screen 3: Timeline & Collaborations (Video 3) */}
        <TimelineSection sectionRef={section3Ref} />

        {/* Screen 4: Interactive Stacked Cards (Video 4) */}
        <PersonalCardsSection sectionRef={section4Ref} />

        {/* Screen 5: Profiles & Download Resume (Video 5) */}
        <ContactSection sectionRef={section5Ref} />
      </main>
    </div>
  );
};

export default App;