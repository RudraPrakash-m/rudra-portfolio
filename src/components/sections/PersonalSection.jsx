import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, Music, Video, Smile, Coffee, Code } from 'lucide-react';

const personalCards = [
  { id: 1, title: 'Motion Physics & R&D', tag: 'Shader Math', icon: Code, rotation: '-4deg', offset: '-8px' },
  { id: 2, title: 'Sound Design & Beats', tag: 'Synthesizer', icon: Music, rotation: '3deg', offset: '10px' },
  { id: 3, title: 'Visual Memes & Pop Art', tag: 'Culture', icon: Smile, rotation: '-2deg', offset: '-4px' },
  { id: 4, title: 'Late Night Coffee & Renders', tag: 'Vibe', icon: Coffee, rotation: '5deg', offset: '12px' },
];

export const PersonalSection = ({ sectionRef }) => {
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.personal-title'),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        el.querySelectorAll('.stacked-card'),
        { y: 60, opacity: 0, rotation: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 15%',
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
      id="about"
      className="relative w-full min-h-[150vh] flex items-center justify-end px-6 md:px-12 lg:px-24 py-28"
    >
      <div 
        ref={containerRef}
        className="w-full lg:max-w-2xl flex flex-col items-start lg:items-end text-left lg:text-right z-20 pointer-events-auto"
      >
        {/* Section Heading (Cartooneast verbatim style) */}
        <div className="personal-title mb-10">
          <div className="flex items-center gap-2 mb-2 justify-start lg:justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Passions & Experiments
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-['Syne']">
            This Is Where It Gets Personal.
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-['Quicksand'] mt-3 max-w-lg">
            Beyond commercial pipelines — sculpting experimental audio-visual mechanics, generative shader art, and playful creative code.
          </p>
        </div>

        {/* Stacked Interactive Card Carousel / Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {personalCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCard(idx)}
                className="stacked-card group p-5 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white font-['Syne'] group-hover:text-emerald-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 font-['Quicksand'] mt-1">
                  Creative exploration synchronized with dynamic canvas layers.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
