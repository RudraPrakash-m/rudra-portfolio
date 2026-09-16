import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Compass, Sparkles, Cpu, Layers, Award, Terminal } from 'lucide-react';

const milestones = [
  { step: '01', title: 'Conceptual Discovery', desc: 'Narrative ideation, moodboarding & kinetic direction' },
  { step: '02', title: '3D Spatial Modeling', desc: 'Procedural geometry, volumetric lighting & materials' },
  { step: '03', title: 'Shader & Code Craft', desc: 'WebGL shaders, GSAP physics & interactive choreography' },
  { step: '04', title: 'Master Production', desc: '60FPS 4K rendering & responsive web deployment' },
];

const colabs = [
  'Xiaomi India', 'DriveX Mobility', 'Polygon Labs', 'HyperSwitch', 'Phantom 3D', 'Aether Audio'
];

export const JourneySection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.journey-title'),
        { y: -30, opacity: 0 },
        {
          y: 0,
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
        el.querySelectorAll('.timeline-step'),
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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
      id="timeline"
      className="relative w-full min-h-[150vh] flex items-center justify-end px-6 md:px-12 lg:px-24 py-28"
    >
      <div 
        ref={containerRef}
        className="w-full lg:max-w-2xl flex flex-col items-start lg:items-end text-left lg:text-right z-20 pointer-events-auto"
      >
        {/* Section Heading */}
        <div className="journey-title mb-8">
          <div className="flex items-center gap-2 mb-2 justify-start lg:justify-end">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
              Evolution & Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Syne']">
            The Design Journey
          </h2>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mb-8">
          {milestones.map((m) => (
            <div 
              key={m.step}
              className="timeline-step p-4 sm:p-5 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-xl hover:border-amber-500/40 transition-all text-left shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  PHASE {m.step}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300/60" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Syne']">
                {m.title}
              </h3>
              <p className="text-xs text-slate-300 font-['Quicksand'] mt-1 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Notable Colabs / Brands */}
        <div className="w-full p-5 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-xl text-left lg:text-right">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Some Notable Collaborations & Platforms
          </h4>
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
            {colabs.map((colab, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors"
              >
                {colab}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
