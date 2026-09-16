import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Sparkles, 
  ArrowDown, 
  Mail, 
  Download,
  Film,
  Play
} from 'lucide-react';

export const StorySection = ({ section, index, total, sectionRef, isActive }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text entrance on section in view
      gsap.fromTo(
        el.querySelectorAll('.story-reveal'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
      id={`section-${section.id}`}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 pointer-events-none select-none snap-start"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-5xl mx-auto lg:ml-auto lg:mr-0 flex flex-col items-start lg:items-end text-left lg:text-right space-y-5 z-20 pointer-events-auto"
      >
        {/* Track Badge & Chapter */}
        <div className="story-reveal flex items-center gap-3 justify-start lg:justify-end">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider border bg-black/60 backdrop-blur-md text-white border-white/20 shadow-lg">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
            <span>SCREEN {section.number} &bull; {section.tag}</span>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-1 rounded bg-cyan-950/80 border border-cyan-800/60">
            VIDEO {section.number} PLAYING
          </span>
        </div>

        {/* Lead Phrase (Cartooneast style) */}
        <p className="story-reveal text-lg sm:text-2xl md:text-3xl text-slate-200 font-medium font-['Quicksand'] max-w-2xl leading-snug">
          {section.lead}
        </p>

        {/* Main Section Title */}
        <div className="story-reveal space-y-1">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-['Syne'] leading-[0.95]">
            {section.title}
          </h2>
          <p className={`text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${section.accentColor} bg-clip-text text-transparent font-['Syne']`}>
            {section.subtitle}
          </p>
        </div>

        {/* Detailed Narrative Description */}
        <p className="story-reveal text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-['Quicksand'] leading-relaxed backdrop-blur-md p-4 rounded-2xl bg-black/45 border border-white/10 shadow-xl">
          {section.description}
        </p>

        {/* Highlight Specifications Grid */}
        <div className="story-reveal grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl pt-1">
          {section.highlights.map((h, i) => (
            <div 
              key={i}
              className="p-3.5 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all text-left shadow-lg"
            >
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">
                {h.label}
              </span>
              <span className="font-bold text-sm text-white font-['Syne'] block">
                {h.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tags / Keywords */}
        <div className="story-reveal flex flex-wrap gap-2 justify-start lg:justify-end max-w-2xl pt-1">
          {section.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Screen 1 prompt */}
        {section.id === 1 && (
          <div className="story-reveal pt-3 flex items-center gap-2 text-xs font-mono text-cyan-300 animate-bounce">
            <span>Scroll to Screen 02 for Next Video & Experience</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        )}

        {/* Screen 5 CTA */}
        {section.id === 5 && (
          <div className="story-reveal pt-4 flex flex-wrap gap-4 justify-start lg:justify-end">
            <a
              href="mailto:contact@rudra-portfolio.dev"
              className="px-6 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm font-['Syne'] flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
            <button
              onClick={() => alert("Downloading Showreel & Portfolio Package...")}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm font-['Syne'] flex items-center gap-2 backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Showreel</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
