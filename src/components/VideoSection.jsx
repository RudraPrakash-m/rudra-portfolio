import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Activity, 
  Sliders, 
  Film,
  Zap,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VideoSection = ({ video, index, total }) => {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const progressFillRef = useRef(null);
  const badgeRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState(1);

  const scrollTimeoutRef = useRef(null);

  // Initialize GSAP ScrollTrigger for Scrubbing
  useEffect(() => {
    const videoElem = videoRef.current;
    const containerElem = containerRef.current;
    const videoWrapper = videoWrapperRef.current;

    if (!videoElem || !containerElem) return;

    let triggerInstance = null;

    const setupScrollTrigger = () => {
      const vidDuration = videoElem.duration || 10;
      setDuration(vidDuration);
      setIsVideoLoaded(true);

      // Clean up previous trigger if exists
      if (triggerInstance) {
        triggerInstance.kill();
      }

      // Entrance animation for the wrapper
      gsap.fromTo(
        videoWrapper,
        { scale: 0.92, opacity: 0.6, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerElem,
            start: "top 80%",
            end: "top 30%",
            scrub: true
          }
        }
      );

      // Scroll-Driven Video Frame Scrubbing
      triggerInstance = ScrollTrigger.create({
        trigger: containerElem,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6, // Smooth easing during scroll scrub
        onUpdate: (self) => {
          if (!isAutoPlaying && videoElem.duration) {
            const targetTime = self.progress * videoElem.duration;
            // Direct frame scrub
            videoElem.currentTime = targetTime;
            setCurrentTime(targetTime);
            setProgressPercent(Math.round(self.progress * 100));

            // Detect active scroll state
            setIsScrolling(true);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 180);
          }
        }
      });
    };

    if (videoElem.readyState >= 1) {
      setupScrollTrigger();
    } else {
      videoElem.addEventListener('loadedmetadata', setupScrollTrigger);
    }

    return () => {
      if (triggerInstance) triggerInstance.kill();
      if (videoElem) {
        videoElem.removeEventListener('loadedmetadata', setupScrollTrigger);
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isAutoPlaying, video.src]);

  // Handle manual play / pause override
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isAutoPlaying) {
      videoRef.current.pause();
      setIsAutoPlaying(false);
    } else {
      videoRef.current.play();
      setIsAutoPlaying(true);
    }
  };

  // Handle Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  // Format time mm:ss.ms
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    const ms = Math.floor((timeInSeconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div 
      id={`video-section-${video.id}`}
      ref={containerRef}
      className="relative w-full h-[220vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
    >
      {/* Sticky Presentation Viewport */}
      <div className="sticky top-16 md:top-20 z-10 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center py-4">
        
        {/* Header line for the video */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full bg-gradient-to-r ${video.accent} text-white shadow-lg shadow-cyan-500/20`}>
              {video.tag}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              Line {index + 1} of {total}
            </span>
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-mono">
              <Film className="w-3 h-3 text-cyan-400" />
              <span>{video.stats.fps}</span>
              <span className="text-slate-600">&bull;</span>
              <span>{video.stats.codec}</span>
            </div>
          </div>

          {/* Scroll Play/Pause State Badge */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
              isScrolling || isAutoPlaying 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/30' 
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/50'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isScrolling || isAutoPlaying ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
              <span className="font-semibold tracking-wide">
                {isAutoPlaying 
                  ? 'AUTOPLAY ACTIVE' 
                  : isScrolling 
                    ? 'SCROLLING & PLAYING' 
                    : 'SCROLL PAUSED'}
              </span>
            </div>
          </div>
        </div>

        {/* Video Player Card */}
        <div 
          ref={videoWrapperRef}
          className="relative group rounded-2xl lg:rounded-3xl overflow-hidden glass-panel border border-slate-700/60 shadow-2xl transition-all duration-500 hover:border-slate-500/60"
          style={{
            boxShadow: `0 20px 50px -15px ${video.glowColor}`
          }}
        >
          {/* Top Title Glass Ribbon */}
          <div className="absolute top-0 inset-x-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                {video.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium">
                {video.subtitle}
              </p>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 text-slate-200 hover:text-white backdrop-blur-md transition-all duration-200"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 text-slate-200 hover:text-white backdrop-blur-md transition-all duration-200"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HTML5 Video Element */}
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={video.src}
              playsInline
              muted={isMuted}
              preload="auto"
              className="w-full h-full object-cover select-none"
              onTimeUpdate={() => {
                if (videoRef.current && isAutoPlaying) {
                  setCurrentTime(videoRef.current.currentTime);
                  if (videoRef.current.duration) {
                    setProgressPercent(Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100));
                  }
                }
              }}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40 mix-blend-multiply" />
            
            {/* Center Pause/Play Watermark feedback on hover */}
            <button 
              onClick={togglePlayPause}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5 text-cyan-400" />}
            </button>
          </div>

          {/* Bottom Interactive HUD Bar */}
          <div className="p-4 sm:p-5 bg-[#0b0e17]/90 border-t border-slate-800/80 backdrop-blur-xl">
            {/* Scrub Progress Bar */}
            <div className="relative w-full mb-3">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  ref={progressFillRef}
                  className={`h-full bg-gradient-to-r ${video.accent} transition-all duration-75`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* HUD Status Details & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-3 text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{progressPercent}% SCRUBBED</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-slate-400 hidden md:inline">
                  {video.description}
                </span>
                <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/50 text-[11px] text-slate-300">
                  Scroll scrub active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll helper prompt below frame */}
        <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500 px-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Scroll down or up to scrub video frames in real-time</span>
          </div>
          <span className="hidden sm:inline text-slate-500">
            Section Progress: {progressPercent}%
          </span>
        </div>

      </div>
    </div>
  );
};
