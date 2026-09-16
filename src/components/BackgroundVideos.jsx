import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

export const BackgroundVideos = forwardRef(({ isMuted, activeIndex }, ref) => {
  const videoRefs = useRef([]);
  // Preload video 1 (hero) and video 2 (first scroll) immediately for zero-latency presentation
  const [loadedIndices, setLoadedIndices] = useState([0, 1]);

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

  // Intelligent On-Demand Pre-warming
  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      if (activeIndex + 1 < videos.length) next.add(activeIndex + 1);
      if (activeIndex - 1 >= 0) next.add(activeIndex - 1);
      return Array.from(next);
    });
  }, [activeIndex, videos.length]);

  // Handle active video playback & pause others (plays once upon entering)
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        video.muted = isMuted;
        if (idx === activeIndex) {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
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
                muted={isMuted}
                preload={idx <= 1 ? "auto" : "metadata"}
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
