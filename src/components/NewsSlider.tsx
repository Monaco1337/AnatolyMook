import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, MessageCircle, ArrowRight, Calendar, Clock } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  category: string;
  views_count: number;
  published_at: string;
}

interface NewsSliderProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

export default function NewsSlider({ articles, onArticleClick }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(320);

  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardWidth(Math.min(400, (width - 96) / 3 - 24));
      } else if (width >= 768) {
        setCardWidth(Math.min(400, (width - 64) / 2 - 16));
      } else {
        setCardWidth(Math.min(360, width - 48));
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (!sliderRef.current) return;
    const gap = 24;
    const scrollAmount = index * (cardWidth + gap);
    sliderRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, [cardWidth]);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const gap = 24;
    const newIndex = Math.round(sliderRef.current.scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(newIndex, articles.length - 1)));
  }, [cardWidth, articles.length]);

  const nextSlide = useCallback(() => {
    const newIndex = currentIndex < articles.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [currentIndex, articles.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : articles.length - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [currentIndex, articles.length, scrollToIndex]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
          <div className="px-5 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)'
            }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Aktuell im Fokus
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4"
              style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              Klare{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Einstiege
              </span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg font-light flex items-center gap-2">
              <span>Neue Formate</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">Direkt zur Übersicht</span>
            </p>
          </div>

          {articles.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="group relative w-14 h-14 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
                }}
                aria-label="Vorheriger Artikel"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-500" />
                <ChevronLeft className="absolute inset-0 m-auto w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
              </button>
              <button
                onClick={nextSlide}
                className="group relative w-14 h-14 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
                }}
                aria-label="Nächster Artikel"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-500" />
                <ChevronRight className="absolute inset-0 m-auto w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <style>{`
          .news-slider-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          ref={sliderRef}
          className="news-slider-scroll flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onScroll={handleScroll}
        >
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex-shrink-0"
              style={{
                width: `${cardWidth}px`,
                minHeight: '520px',
                scrollSnapAlign: 'start'
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onArticleClick(article);
                }}
                className="group relative w-full h-full cursor-pointer transition-all duration-700 ease-out hover:-translate-y-3 active:scale-[0.98] block"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label={`Artikel öffnen: ${article.title}`}
              >
                <div className="relative w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.15]"
                        loading="lazy"
                        style={{
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 group-hover:from-black group-hover:via-black/85 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
                  </div>

                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between gap-3 z-20 pointer-events-none">
                    {article.category && (
                      <div className="px-4 py-2.5 rounded-xl backdrop-blur-2xl transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.2))',
                          border: '1px solid rgba(251, 191, 36, 0.5)',
                          boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25), 0 0 40px rgba(251, 191, 36, 0.1)'
                        }}
                      >
                        <span className="text-xs font-bold tracking-[0.15em] text-yellow-100 uppercase">
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 space-y-4 pointer-events-none">
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <span>|</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{getReadingTime(article.content)} Min. Lesezeit</span>
                      </div>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl text-white leading-tight transition-all duration-500 group-hover:text-yellow-100"
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 800,
                        letterSpacing: '-0.015em',
                        textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 4px 24px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed line-clamp-2 font-light">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 pointer-events-auto">
                      <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5 transition-all duration-300 group-hover:text-zinc-300">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">{article.views_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 transition-all duration-300 group-hover:text-zinc-300">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-medium">Kommentare</span>
                        </div>
                      </div>

                      <div className="px-6 py-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #ea580c)',
                          boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)'
                        }}
                      >
                        <div className="flex items-center gap-2 text-black">
                          <span className="text-xs font-black tracking-[0.1em] uppercase">Artikel lesen</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-orange-400/0 to-yellow-400/0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.15), transparent 70%)'
                    }}
                  />
                </div>

                <div
                  className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3), rgba(234, 88, 12, 0.2))',
                    filter: 'blur(24px)'
                  }}
                />
              </button>
            </article>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      {articles.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12 md:mt-16">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              className="group relative h-2 rounded-full transition-all duration-500"
              style={{
                width: currentIndex === index ? '48px' : '12px',
                background: currentIndex === index
                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b, #ea580c)'
                  : 'rgba(255, 255, 255, 0.15)',
                boxShadow: currentIndex === index
                  ? '0 0 20px rgba(251, 191, 36, 0.5)'
                  : 'none'
              }}
              aria-label={`Zu Artikel ${index + 1} springen`}
            >
              <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
