import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface SliderItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  category: string;
}

interface PremiumSliderProps {
  items: SliderItem[];
  hideCounter?: boolean;
  autoplayInterval?: number;
  showControls?: boolean;
}

export default function PremiumSlider({ items, hideCounter = false, autoplayInterval, showControls }: PremiumSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      checkScrollButtons();
    };

    checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      checkScrollButtons();
    }, 100);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.85;
    const targetScroll = direction === 'left'
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => checkScrollButtons(), 300);
  };

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        if (hoveredCard === id) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [hoveredCard]);

  return (
    <div className="relative group/slider -mx-4 sm:mx-0">
      <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
        <div className="flex items-center gap-3">
          {!hideCounter && (
            <span className="text-white/60 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tight">
              {items.length} Events
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-6 px-4 sm:px-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '1rem',
          scrollPaddingRight: '1rem'
        }}
      >
        {items.map((item, index) => {
          const cardWidth = windowWidth < 640 ? 'calc(88vw)' :
                           windowWidth < 768 ? 'calc(55vw)' :
                           windowWidth < 1024 ? 'calc(40vw)' :
                           windowWidth < 1280 ? 'calc(30vw)' :
                           windowWidth < 1536 ? 'calc(25vw)' : 'calc(20vw)';

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group/card flex-shrink-0 cursor-pointer"
              style={{
                width: cardWidth,
                maxWidth: '420px',
                minWidth: '280px',
                scrollSnapAlign: 'start'
              }}
            >
            <div className="relative h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px] xl:h-[640px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.7)]"
              style={{
                boxShadow: '0 12px 50px -10px rgba(0,0,0,0.5)'
              }}
            >
              <div className="absolute inset-0">
                {item.type === 'video' ? (
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    poster={item.poster}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget;
                      if (!video.src) {
                        video.src = item.src;
                      }
                    }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/95" />

              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-[10px] sm:text-[11px] md:text-xs font-bold tracking-widest uppercase">
                    {item.category}
                  </span>

                  {item.type === 'video' && (
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" strokeWidth={0} />
                    </div>
                  )}
                </div>

                <div className="transform transition-all duration-300 group-hover/card:translate-y-[-8px]">
                  <p className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-widest text-white/60 mb-2 sm:mb-2.5 uppercase">
                    ANATOLY MOOK
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight"
                    style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      fontWeight: 700
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', -apple-system, sans-serif"
                    }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{
                  mixBlendMode: 'overlay'
                }}
              />
            </div>
          </div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
