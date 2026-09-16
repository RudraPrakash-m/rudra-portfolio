import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';

export const HeaderNav = ({ isMuted, setIsMuted, onNavigate, activeIndex = 0, onOpenTerminal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', num: '01', index: 0 },
    { name: 'Works', href: '#works', num: '02', index: 1 },
    { name: 'Journey', href: '#timeline', num: '03', index: 2 },
    { name: 'Personal', href: '#about', num: '04', index: 3 },
    { name: 'Contact', href: '#contact', num: '05', index: 4 },
  ];

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(index);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-5 sm:px-10 lg:px-16 py-4 sm:py-6 flex items-center justify-between pointer-events-auto text-[#1c1c1c]">
        <div />

        {/* Right Menu & Sound controls */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white/50 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-1.5 sm:p-0 rounded-full">
          {/* Interactive Developer Terminal Button */}
          <button
            onClick={onOpenTerminal}
            aria-label="Open Developer Terminal (Ctrl+K)"
            className="p-2 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer text-[#1c1c1c] group relative"
            title="Developer CLI Terminal (Ctrl+K)"
          >
            <Terminal className="w-5 h-5 text-neutral-700 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden md:inline-block ml-1 text-[11px] font-mono font-bold text-neutral-500 group-hover:text-emerald-600">
              CLI
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? "Unmute Background Audio" : "Mute Background Audio"}
            className="p-2 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer text-[#1c1c1c]"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-neutral-400" /> : <Volume2 className="w-5 h-5 text-black" />}
          </button>

          {/* Minimalist Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            className="p-2 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer text-[#1c1c1c]"
            title="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>
      </header>

      {/* Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col justify-center px-6 sm:px-16 lg:px-24">
          <div className="max-w-xl mx-auto w-full space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
              Navigation Index
            </p>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/10 py-3.5 sm:py-4 text-2xl sm:text-4xl md:text-5xl font-bold text-[#1c1c1c] hover:opacity-60 transition-all"
              >
                <span>{link.name}</span>
                <span className="text-xs sm:text-sm font-mono text-neutral-400">{link.num}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
