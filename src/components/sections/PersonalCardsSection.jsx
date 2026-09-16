import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles, Code2, Server, Layout, Cpu, ChevronRight } from 'lucide-react';

export const PersonalCardsSection = ({ sectionRef, isActive = true }) => {
  const contentRef = useRef(null);
  const [activeDeck, setActiveDeck] = useState(0);

  const cards = [
    { id: 1, title: 'MERN Stack Focus', badge: 'MERN', desc: 'MongoDB • Express.js • React • Node.js', gradient: 'from-emerald-800 via-teal-950 to-black', rotation: '0deg', zIndex: 40, icon: Code2 },
    { id: 2, title: 'Full-Stack Security', badge: 'BACKEND', desc: 'JWT Authentication • SendGrid OTP Verification', gradient: 'from-blue-900 via-slate-900 to-black', rotation: '-6deg', zIndex: 30, icon: Server },
    { id: 3, title: 'Modern UI & Motion', badge: 'FRONTEND', desc: 'Tailwind CSS • GSAP Animations • Responsive UI', gradient: 'from-amber-600 via-orange-950 to-black', rotation: '6deg', zIndex: 20, icon: Layout },
    { id: 4, title: 'Core Computer Science', badge: 'ALGORITHMS', desc: 'Data Structures • REST APIs • Live Cloud Deployment', gradient: 'from-purple-800 via-violet-950 to-black', rotation: '-12deg', zIndex: 10, icon: Cpu },
  ];

  const currentCard = cards[activeDeck];
  const CurrentIcon = currentCard.icon;

  useEffect(() => {
    if (!isActive) return;
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.card-stack-item'),
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [isActive]);

  const nextCard = (e) => {
    if (e) e.stopPropagation();
    setActiveDeck((prev) => (prev + 1) % cards.length);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-full min-h-screen flex items-center justify-end px-4 sm:px-12 lg:px-24 py-12 sm:py-20 pointer-events-none select-none"
    >
      {/* ================= MOBILE VIEW (Character 100% Unblocked + Bottom Floating Mini Card Capsule) ================= */}
      <div 
        ref={contentRef}
        className="sm:hidden w-full h-full flex flex-col justify-between pt-16 pb-6 px-2 pointer-events-auto z-20"
      >
        {/* Top Header */}
        <div className="card-stack-item w-full text-right pr-2">
          <h2 className="text-2xl font-bold tracking-tight text-white mobile-text-glow">
            Personal
          </h2>
          <p className="text-[11px] font-mono text-neutral-300 mobile-subtext-glow">
            Core Competencies
          </p>
        </div>

        {/* Generous Middle Space: Puppet character is 100% visible & unblocked */}
        <div className="flex-1" />

        {/* Bottom Floating Interactive Card Capsule */}
        <div
          onClick={nextCard}
          className={`card-stack-item w-full rounded-2xl p-4 bg-gradient-to-r ${currentCard.gradient} border border-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 active:scale-[0.98] cursor-pointer text-white`}
        >
          {/* Top Meta Row */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[9px] font-mono font-bold tracking-wider backdrop-blur-md">
              {currentCard.badge}
            </span>

            {/* 4 Interactive Progress Dots */}
            <div className="flex items-center gap-1.5">
              {cards.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDeck(dotIdx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeDeck === dotIdx
                      ? 'w-5 h-1.5 bg-emerald-400'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Select card ${dotIdx + 1}`}
                />
              ))}
            </div>

            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          </div>

          {/* Card Body Row */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <CurrentIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base tracking-tight truncate">
                {currentCard.title}
              </h3>
              <p className="text-[11px] text-neutral-300 font-mono line-clamp-1 mt-0.5">
                {currentCard.desc}
              </p>
            </div>
            <div className="shrink-0 p-1.5 rounded-full bg-white/10 border border-white/15 text-white/80">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Tap Hint */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Tap card to cycle ({activeDeck + 1}/{cards.length})</span>
            <span className="text-emerald-400 font-semibold">Next ➔</span>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP VIEW (Original 3D Fanned Card Deck on Right) ================= */}
      <div
        className="hidden sm:flex w-full max-w-md ml-auto flex-col items-center lg:items-end pointer-events-auto z-20"
      >
        {/* Section Heading */}
        <div className="w-full flex flex-col items-center lg:items-end text-center lg:text-right mb-1 sm:mb-2">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white sm:text-[#1c1c1c]">
            Personal
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-300 sm:text-[#1c1c1c]/60 mt-0.5">
            Core Competencies & Focus
          </p>
        </div>

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
