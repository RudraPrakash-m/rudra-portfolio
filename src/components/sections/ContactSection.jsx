import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Mail, ArrowUpRight, Eye, EyeOff, Phone } from 'lucide-react';
import { rudraData } from '../../data/videos';

export const ContactSection = ({ sectionRef }) => {
  const contentRef = useRef(null);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.contact-fade'),
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
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-end px-5 sm:px-12 lg:px-24 py-16 sm:py-20 pointer-events-none select-none"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-md ml-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-5 sm:gap-6 pointer-events-auto z-20 bg-[#f5f5f5]/65 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-3xl"
      >
        {/* Mail, Phone & Location Details */}
        <div className="contact-fade space-y-3 sm:space-y-4 w-full">
          {/* Email */}
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#1c1c1c]/60 mb-0.5">
              Mail me
            </p>
            <a 
              href={`mailto:${rudraData.email}`}
              aria-label={`Send email to ${rudraData.email}`}
              className="text-base sm:text-xl md:text-2xl font-bold text-[#1c1c1c] hover:opacity-70 transition-opacity inline-flex items-center gap-1.5 break-all"
            >
              <span>{rudraData.email}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Phone with View & Hide Toggle */}
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#1c1c1c]/60 mb-0.5">
              Phone Number
            </p>
            <div className="inline-flex items-center justify-center lg:justify-end gap-2 text-base sm:text-xl font-bold text-[#1c1c1c]">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              {showPhone ? (
                <a href={`tel:${rudraData.phone}`} aria-label={`Call ${rudraData.phone}`} className="hover:underline font-mono">
                  {rudraData.phone}
                </a>
              ) : (
                <span className="font-mono tracking-wider text-[#1c1c1c]/80">+91 **********</span>
              )}
              <button
                type="button"
                onClick={() => setShowPhone(!showPhone)}
                aria-label={showPhone ? "Hide Phone Number" : "View Phone Number"}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-neutral-600 hover:text-black"
                title={showPhone ? "Hide Phone Number" : "View Phone Number"}
              >
                {showPhone ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#1c1c1c]/60 mb-0.5">
              Meet me in
            </p>
            <p className="text-base sm:text-lg font-bold text-[#1c1c1c]">
              {rudraData.location}
            </p>
          </div>
        </div>

        {/* Profile Stalk Title */}
        <p className="contact-fade text-xs sm:text-sm font-medium text-[#1c1c1c]/60 -mb-2">
          or stalk my profiles
        </p>

        {/* 4 Black Circular Social Icons */}
        <div className="contact-fade flex items-center gap-2.5 sm:gap-3 justify-center lg:justify-end">
          {/* LinkedIn */}
          <a
            href={rudraData.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0"
            title="LinkedIn Profile"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={rudraData.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0"
            title="GitHub Profile"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Email Direct */}
          <a
            href={`mailto:${rudraData.email}`}
            aria-label="Send Email Directly"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0"
            title="Send Email"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </a>

          {/* Call Direct */}
          <a
            href={`tel:${rudraData.phone}`}
            aria-label={`Call ${rudraData.phone}`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0"
            title="Call"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </a>
        </div>

        {/* Download Resume / CV Pill Button */}
        <div className="contact-fade pt-2">
          <a
            href={rudraData.resumeUrl || "/Rudra _Prakash.pdf"}
            download="Rudra_Prakash_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Rudra Prakash's CV"
            className="group flex items-center h-12 sm:h-14 pl-2 pr-5 sm:pr-6 rounded-full bg-white text-[#1c1c1c] border border-black/10 hover:border-black/30 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer no-underline"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black text-white flex items-center justify-center mr-2.5 sm:mr-3 shadow-md group-hover:translate-y-0.5 transition-transform shrink-0">
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-bold text-xs sm:text-sm md:text-base tracking-tight select-none">
              Download CV
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
