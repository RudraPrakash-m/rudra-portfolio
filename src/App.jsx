import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BackgroundVideos } from './components/BackgroundVideos';
import { HeaderNav } from './components/HeaderNav';
import { DeveloperTerminal } from './components/DeveloperTerminal';
import { RudraAIAssistant } from './components/RudraAIAssistant';
import { SEO } from './components/SEO';
import { HeroSection } from './components/sections/HeroSection';
import { WorksSection } from './components/sections/WorksSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { PersonalCardsSection } from './components/sections/PersonalCardsSection';
import { ContactSection } from './components/sections/ContactSection';
import './index.css';

const App = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    const bgVideosRef = useRef(null);
    const isTransitioningRef = useRef(false);
    const activeIndexRef = useRef(0);
    const isTerminalOpenRef = useRef(false);

    // Sync refs with state
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        isTerminalOpenRef.current = isTerminalOpen;
    }, [isTerminalOpen]);

    // Smooth Transition to Target Section
    const goToSection = useCallback((targetIndex) => {
        if (targetIndex < 0 || targetIndex > 4) return;
        if (targetIndex === activeIndexRef.current) return;

        isTransitioningRef.current = true;
        setActiveIndex(targetIndex);

        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 850);
    }, []);

    useEffect(() => {
        // 1. Mouse Wheel with small threshold for automatic smooth section glide
        const handleWheel = (e) => {
            // If terminal is open or currently transitioning, ignore background scroll
            if (isTerminalOpenRef.current || isTransitioningRef.current) return;

            // Small scroll delta triggers next / previous section smoothly
            if (Math.abs(e.deltaY) > 8) {
                if (e.deltaY > 0 && activeIndexRef.current < 4) {
                    goToSection(activeIndexRef.current + 1);
                } else if (e.deltaY < 0 && activeIndexRef.current > 0) {
                    goToSection(activeIndexRef.current - 1);
                }
            }
        };

        // 2. Touch Gestures for mobile smooth section gliding
        let touchStartY = 0;
        let touchStartX = 0;

        const handleTouchStart = (e) => {
            if (isTerminalOpenRef.current) return;
            if (e.touches && e.touches.length > 0) {
                touchStartY = e.touches[0].clientY;
                touchStartX = e.touches[0].clientX;
            }
        };

        const handleTouchEnd = (e) => {
            if (isTerminalOpenRef.current || isTransitioningRef.current) return;
            if (e.changedTouches && e.changedTouches.length > 0) {
                const touchEndY = e.changedTouches[0].clientY;
                const touchEndX = e.changedTouches[0].clientX;
                const diffY = touchStartY - touchEndY;
                const diffX = touchStartX - touchEndX;

                // If swipe gesture is detected (> 30px)
                if (Math.abs(diffY) > 30 && Math.abs(diffY) > Math.abs(diffX)) {
                    if (diffY > 0 && activeIndexRef.current < 4) {
                        goToSection(activeIndexRef.current + 1);
                    } else if (diffY < 0 && activeIndexRef.current > 0) {
                        goToSection(activeIndexRef.current - 1);
                    }
                }
            }
        };

        // 3. Keyboard Navigation
        const handleKeyDown = (e) => {
            if (isTerminalOpenRef.current || isTransitioningRef.current) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
                if (activeIndexRef.current < 4) {
                    e.preventDefault();
                    goToSection(activeIndexRef.current + 1);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
                if (activeIndexRef.current > 0) {
                    e.preventDefault();
                    goToSection(activeIndexRef.current - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [goToSection]);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#f5f5f5] text-[#1c1c1c] selection:bg-black selection:text-white font-['Quicksand']">
            {/* SEO & Meta Tags */}
            <SEO />

            {/* 5 Left-Aligned Character Videos (Plays Active Video per Screen) */}
            <BackgroundVideos
                ref={bgVideosRef}
                isMuted={isMuted}
                activeIndex={activeIndex}
            />

            {/* Minimalist Top Right Header with Terminal Trigger & Section Links */}
            <HeaderNav
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                onNavigate={goToSection}
                activeIndex={activeIndex}
                onOpenTerminal={() => setIsTerminalOpen(true)}
            />

            {/* Interactive Developer CLI Terminal (Ctrl+K) */}
            <DeveloperTerminal
                isOpen={isTerminalOpen}
                setIsOpen={setIsTerminalOpen}
            />

            {/* Rudra AI Recruiter & Technical Assistant (Bottom-Right Floating Chat) */}
            <RudraAIAssistant />

            {/* Floating Minimalist Section Indicators (Desktop Right) */}
            <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
                {[0, 1, 2, 3, 4].map((idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSection(idx)}
                        aria-label={`Go to section ${idx + 1}`}
                        className={`w-2.5 transition-all duration-300 rounded-full cursor-pointer ${activeIndex === idx
                                ? 'h-8 bg-black'
                                : 'h-2.5 bg-black/25 hover:bg-black/50'
                            }`}
                        title={`Section 0${idx + 1}`}
                    />
                ))}
            </div>

            {/* 5 Smooth-Sliding Full-Screen Sections */}
            <main
                className="relative z-10 w-full h-full will-change-transform"
                style={{
                    transform: `translate3d(0, -${activeIndex * 100}%, 0)`,
                    transition: 'transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
            >
                {/* Screen 1: Home / Intro (Video 1) */}
                <div className="w-full h-screen h-[100dvh] shrink-0 overflow-hidden flex flex-col justify-between">
                    <HeroSection isActive={activeIndex === 0} />
                </div>

                {/* Screen 2: Works Folder List (Video 2) */}
                <div className="w-full h-screen h-[100dvh] shrink-0 overflow-hidden flex items-center justify-end">
                    <WorksSection isActive={activeIndex === 1} />
                </div>

                {/* Screen 3: Timeline & Collaborations (Video 3) */}
                <div className="w-full h-screen h-[100dvh] shrink-0 overflow-hidden flex items-center justify-end">
                    <TimelineSection isActive={activeIndex === 2} />
                </div>

                {/* Screen 4: Interactive Stacked Cards (Video 4) */}
                <div className="w-full h-screen h-[100dvh] shrink-0 overflow-hidden flex items-center justify-end">
                    <PersonalCardsSection isActive={activeIndex === 3} />
                </div>

                {/* Screen 5: Profiles & Download Resume (Video 5) */}
                <div className="w-full h-screen h-[100dvh] shrink-0 overflow-hidden flex items-center justify-end">
                    <ContactSection isActive={activeIndex === 4} />
                </div>
            </main>
        </div>
    );
};

export default App;