import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

export const BackgroundVideos = forwardRef(({ isMuted, activeIndex }, ref) => {
  const videoRefs = useRef([]);
  // Track which videos have been requested to load
  const [loadedIndices, setLoadedIndices] = useState([0]); // Only load Video 1 on initial render

  const videos = [
    { id: 1, src: '/1_optimized.mp4' },
    { id: 2, src: '/2_optimized.mp4' },
    { id: 3, src: '/3_optimized.mp4' },
    { id: 4, src: '/4_optimized.mp4' },
    { id: 5, src: '/5_optimized.mp4' },
  ];

  useImperativeHandle(ref, () => ({
    getVideo: (index) => videoRefs.current[index],
    getAllVideos: () => videoRefs.current,
  }));

  // Intelligent On-Demand Video Loading
  // When user approaches section N, pre-warm section N-1, N, N+1
  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      if (activeIndex + 1 < videos.length) next.add(activeIndex + 1);
      if (activeIndex - 1 >= 0) next.add(activeIndex - 1);
      return Array.from(next);
    });
  }, [activeIndex, videos.length]);

  // Handle active video playback & pause others
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        video.muted = isMuted;
        if (idx === activeIndex) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay safety catch
            });
          }
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, isMuted, loadedIndices]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#f5f5f5]">
      {videos.map((video, idx) => {
        const isLoaded = loadedIndices.includes(idx);
        return (
          <div
            key={video.id}
            id={`bg-video-layer-${idx}`}
            className="fixed inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
            style={{
              opacity: activeIndex === idx ? 1 : 0,
              zIndex: activeIndex === idx ? 10 : 1,
            }}
          >
            {isLoaded && (
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={video.src}
                playsInline
                autoPlay={idx === activeIndex}
                loop
                muted={isMuted}
                preload={idx === 0 ? "metadata" : "none"}
                className="absolute inset-0 w-full h-full object-cover object-[15%_center] sm:object-left lg:object-center select-none transform-gpu will-change-transform"
              />
            )}

            {/* Mobile Top Scrim for crisp text contrast */}
            <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/80 via-[#f5f5f5]/30 to-transparent pointer-events-none h-[40vh]" />
          </div>
        );
      })}
    </div>
  );
});

BackgroundVideos.displayName = 'BackgroundVideos';
