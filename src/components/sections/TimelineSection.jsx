import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GraduationCap, Briefcase, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { rudraData } from '../../data/videos';

export const TimelineSection = ({ sectionRef, isActive = true }) => {
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'stack'

  const milestones = [
    {
      year: 'July 2026',
      title: 'Associate Software Engineer - Trainee',
      org: 'Aashdit Technology, Bhubaneswar',
      desc: 'Selected & joining as full-stack software engineer trainee.',
      badge: 'CAREER',
      icon: Briefcase,
      color: 'text-emerald-400',
    },
    {
      year: '2022 - 2026',
      title: 'B.Tech in Computer Science',
      org: 'Gandhi Institute For Technology (GIFT Autonomous)',
      desc: 'CGPA: 8.32 • Full-Stack Web Development, Data Structures & REST APIs.',
      badge: 'DEGREE',
      icon: GraduationCap,
      color: 'text-cyan-400',
    },
    {
      year: '2020 - 2022',
      title: 'Intermediate (12th Science)',
      org: 'Sai Sristi Higher Secondary School, Bhubaneswar',
      desc: 'Score: 79.5% • Physics, Chemistry, Mathematics & Computer Science.',
      badge: 'CHSE',
      icon: GraduationCap,
      color: 'text-amber-400',
    },
    {
      year: '2020',
      title: 'Matriculation (10th)',
      org: 'Saraswati Shishu Vidya Mandir, Paradip',
      desc: 'Score: 73.66% • Foundational Science and Mathematics.',
      badge: 'BSE',
      icon: GraduationCap,
      color: 'text-purple-400',
    },
  ];

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
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full h-full min-h-screen flex items-center justify-end px-4 sm:px-12 lg:px-24 py-12 sm:py-16 pointer-events-none select-none"
    >
      {/* ================= MOBILE VIEW (Bicycle Puppet 100% Unblocked + Bottom Tabbed Capsule) ================= */}
      <div 
        ref={contentRef}
        className="sm:hidden w-full h-full flex flex-col justify-between pt-16 pb-6 px-2 pointer-events-auto z-20"
      >
        {/* Top Header */}
        <div className="timeline-fade w-full text-right pr-2">
          <h2 className="text-2xl font-bold tracking-tight text-white mobile-text-glow">
            Journey
          </h2>
          <p className="text-[11px] font-mono text-neutral-300 mobile-subtext-glow">
            Education & Career Timeline
          </p>
        </div>

        {/* Generous Middle Space: Puppet Riding Bicycle is 100% visible & unblocked */}
        <div className="flex-1" />

        {/* Bottom Floating Tabbed Glass Capsule */}
        <div className="timeline-fade w-full rounded-2xl p-3.5 bg-neutral-950/85 border border-white/20 shadow-2xl backdrop-blur-xl text-white">
          {/* Tabs Selector Header */}
          <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-white/10 mb-3">
            <button
              type="button"
              onClick={() => setActiveTab('milestones')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'milestones'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Milestones</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stack')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'stack'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Tech Stack</span>
            </button>
          </div>

          {/* Tab 1 Content: Milestones Scrollable Stepper */}
          {activeTab === 'milestones' && (
            <div className="max-h-[30vh] overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
              {milestones.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-2.5 items-start p-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 shrink-0 mt-0.5">
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-white truncate">{item.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/15 text-neutral-300 shrink-0">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-300/90 font-medium truncate mt-0.5">{item.org}</p>
                      <p className="text-[10px] text-neutral-300 font-mono line-clamp-1 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2 Content: Skills Badge Grid */}
          {activeTab === 'stack' && (
            <div className="max-h-[30vh] overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-1.5">
                {rudraData.skills.map((skill, i) => (
                  skill === "Git & GitHub" ? (
                    <a
                      key={i}
                      href={rudraData.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-500/40 text-emerald-300 hover:text-black text-xs font-mono font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{skill}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= DESKTOP VIEW (Original Full Graphic & Tech Badges on Right) ================= */}
      <div 
        className="hidden sm:flex w-full max-w-xl ml-auto flex-col items-center lg:items-end text-center lg:text-right gap-2 sm:gap-3 pointer-events-auto z-20"
      >
        {/* Journey Heading */}
        <div className="w-full flex flex-col items-center lg:items-end">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white sm:text-[#1c1c1c] mb-1 sm:mb-2">
            Journey
          </h2>

          {/* Education & Career Journey Graphic */}
          <div className="w-full flex justify-center lg:justify-end my-0.5">
            <img 
              src="/journy.png" 
              alt="Rudra Prakash Mallick Education and Career Journey" 
              width="580"
              height="380"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[36vh] sm:max-h-[42vh] max-w-[320px] sm:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl drop-shadow-md sm:drop-shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Core Technology Stack */}
        <div className="w-full pt-1">
          <h3 className="text-xs sm:text-base md:text-lg font-bold text-white sm:text-[#1c1c1c] mb-1.5 text-center lg:text-right">
            Core Technology Stack
          </h3>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1 sm:gap-2 max-w-lg ml-auto">
            {rudraData.skills.map((skill, i) => (
              skill === "Git & GitHub" ? (
                <a 
                  key={i}
                  href={rudraData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/50 sm:bg-black/10 hover:bg-black text-white sm:text-black hover:text-white text-[10px] sm:text-xs font-mono font-semibold transition-all border border-white/20 sm:border-black/10 cursor-pointer shadow-sm backdrop-blur-sm sm:backdrop-blur-none"
                  title="View GitHub Profile (RudraPrakash-m)"
                >
                  {skill} ↗
                </a>
              ) : (
                <span 
                  key={i} 
                  className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 sm:bg-black/5 hover:bg-black/60 sm:hover:bg-black/10 text-[10px] sm:text-xs font-mono text-white sm:text-[#1c1c1c] font-semibold transition-colors border border-white/20 sm:border-black/5 shadow-sm backdrop-blur-sm sm:backdrop-blur-none"
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
