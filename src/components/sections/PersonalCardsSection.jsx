import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles, Code2, Server, Layout, Cpu } from 'lucide-react';
import { rudraData } from '../../data/videos';

export const PersonalCardsSection = ({ sectionRef }) => {
  const contentRef = useRef(null);
  const [activeDeck, setActiveDeck] = useState(0);

  const cards = [
    { id: 1, title: 'MERN Stack Focus', badge: 'MERN', desc: 'MongoDB • Express.js • React • Node.js', gradient: 'from-emerald-800 via-teal-950 to-black', rotation: '0deg', zIndex: 40, icon: Code2 },
    { id: 2, title: 'Full-Stack Security', badge: 'BACKEND', desc: 'JWT Authentication • SendGrid OTP Verification', gradient: 'from-blue-900 via-slate-900 to-black', rotation: '-6deg', zIndex: 30, icon: Server },
    { id: 3, title: 'Modern UI & Motion', badge: 'FRONTEND', desc: 'Tailwind CSS • GSAP Animations • Responsive UI', gradient: 'from-amber-600 via-orange-950 to-black', rotation: '6deg', zIndex: 20, icon: Layout },
    { id: 4, title: 'Core Computer Science', badge: 'ALGORITHMS', desc: 'Data Structures • REST APIs • Live Cloud Deployment', gradient: 'from-purple-800 via-violet-950 to-black', rotation: '-12deg', zIndex: 10, icon: Cpu },
  ];

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.card-stack-item'),
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
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
      id="about"
      className="relative w-full min-h-screen flex items-center justify-end px-5 sm:px-12 lg:px-24 py-16 sm:py-20 pointer-events-none select-none"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-md ml-auto flex flex-col items-center lg:items-end pointer-events-auto z-20"
      >
        {/* Interactive Fanned Card Deck */}
        <div className="relative w-56 sm:w-64 md:w-72 aspect-[5/7] flex items-center justify-center my-6 sm:my-8">
          {cards.map((card, idx) => {
            const isTop = activeDeck === idx;
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveDeck((prev) => (prev + 1) % cards.length)}
                className={`card-stack-item absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 cursor-pointer bg-gradient-to-b ${card.gradient}`}
                style={{
                  transform: isTop ? 'rotate(0deg) translateY(-8px) scale(1.02)' : `rotate(${card.rotation})`,
                  zIndex: isTop ? 50 : card.zIndex,
                }}
              >
                {/* Card Graphic Header */}
                <div className="p-4 sm:p-6 flex flex-col justify-between h-full text-white select-none">
                  <div className="flex justify-between items-center">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/20 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest backdrop-blur-md">
                      {card.badge}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
                  </div>

                  {/* Center Emblem */}
                  <div className="w-full flex flex-col items-center justify-center text-center my-auto">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 sm:mb-3 shadow-inner">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight">
                      {card.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-mono mt-1 sm:mt-2 px-1">
                      {card.desc}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-300 text-center border-t border-white/10 pt-2 sm:pt-3">
                    Click to cycle competencies
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
