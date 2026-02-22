import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Award, Users, Star, TrendingUp, Check, Target, Brain, Heart, Shield, Play, Calendar, Zap, Book, ChevronLeft, ChevronRight, Plus, Minus, AlertCircle, Eye, Repeat, Crown, TrendingDown, Waves, Puzzle, Pause, X } from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useLanguage } from '../contexts/LanguageContext';
import PremiumSlider from '../components/PremiumSlider';
import ConsciousnessComparison from '../components/ConsciousnessComparison';
import AwarenessModule from '../components/AwarenessModule';
import TransformationSlider from '../components/TransformationSlider';
import FinaleSection from '../components/FinaleSection';
import NewsSlider from '../components/NewsSlider';
import NewsDetailModal from '../components/NewsDetailModal';
import EventDetailModal from '../components/EventDetailModal';
import { supabase } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Calendar, Zap, Book, Sparkles, Target, Brain, Heart, Shield,
  Award, Users, Star, TrendingUp
};

interface HomeContent {
  section: string;
  content: any;
}

interface HomeEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  event_type: string;
  gradient_from: string;
  gradient_to: string;
  display_order: number;
  cta_text?: string;
  title_font_family?: string;
  title_font_weight?: number;
  title_font_size?: string;
  title_letter_spacing?: string;
  title_text_transform?: string;
  subtitle_font_family?: string;
  subtitle_font_weight?: number;
  subtitle_font_size?: string;
  description_font_size?: string;
  card_height?: string;
  overlay_opacity?: number;
  show_author_badge?: boolean;
  custom_css_classes?: string;
}

interface CompactPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  content: string;
  icon: React.ReactNode;
  t: any;
}

const CompactPanel: React.FC<CompactPanelProps> = ({ isOpen, onToggle, content, icon, t }) => (
  <button
    onClick={onToggle}
    className="w-full text-left relative group/compact transition-all duration-300"
  >
    <div
      className="relative rounded-lg sm:rounded-xl overflow-hidden backdrop-blur transition-all duration-400"
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(217,119,6,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(217,119,6,0.03) 100%)',
        border: isOpen ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(251,191,36,0.15)',
        boxShadow: isOpen ? '0 4px 16px rgba(251,191,36,0.15)' : 'none'
      }}
    >
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5">
        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center"
          style={{
            background: isOpen ? 'rgba(251,191,36,0.15)' : 'rgba(251,191,36,0.08)',
            color: isOpen ? '#fcd34d' : '#a3a3a3'
          }}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="overflow-hidden transition-all duration-400"
            style={{
              maxHeight: isOpen ? '150px' : '0px',
              opacity: isOpen ? 1 : 0
            }}
          >
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light whitespace-pre-wrap break-words" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              {content}
            </p>
          </div>
          {!isOpen && (
            <p className="text-xs sm:text-sm text-zinc-400 font-medium truncate">
              {t.common.clickToOpen}
            </p>
          )}
        </div>

        <div className="flex-shrink-0">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          />
        </div>
      </div>
    </div>
  </button>
);

export default function HomeDynamic() {
  const { theme, colors, text, bg } = useThemeStyles();
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [content, setContent] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isTeacherExpanded, setIsTeacherExpanded] = useState(false);
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    try {
      const [contentRes, eventsRes, newsRes] = await Promise.all([
        supabase.from('home_content').select('*').eq('is_active', true),
        supabase.from('home_events').select('*').order('display_order'),
        supabase.from('news_articles').select('*').eq('published', true).eq('featured', true).order('published_at', { ascending: false }).limit(6)
      ]);

      if (contentRes.data) {
        const contentMap: Record<string, any> = {};
        contentRes.data.forEach(item => {
          // Extract content for current language
          const contentData = item.content;
          if (contentData && typeof contentData === 'object' && contentData[language]) {
            contentMap[item.section] = contentData[language];
          } else if (contentData && typeof contentData === 'object' && contentData.de) {
            // Fallback to German if current language not available
            contentMap[item.section] = contentData.de;
          } else {
            // Old format fallback
            contentMap[item.section] = contentData;
          }
        });
        setContent(contentMap);
      }

      if (eventsRes.data) setEvents(eventsRes.data);
      if (newsRes.data) setNewsArticles(newsRes.data);
    } catch (error) {
      console.error('Error loading home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const keynoteSlides = useMemo(() =>
    events.map(event => ({
      id: event.id,
      type: 'image' as const,
      src: event.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      poster: event.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      title: event.title.toUpperCase(),
      subtitle: event.subtitle,
      description: event.description,
      category: event.event_type.toUpperCase(),
      gradientFrom: event.gradient_from,
      gradientTo: event.gradient_to
    }))
  , [events]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bg.primary }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={text.tertiary}>{t.common.loadingContent}</p>
        </div>
      </div>
    );
  }

  const hero = content.hero || {};
  const themes = content.themes || {};
  const teacher = content.teacher || {};
  const targetAudience = content.target_audience || {};
  const servicesIntro = content.services_intro || {};
  const servicesTestimonials = content.services_testimonials || {};
  const servicesProcess = content.services_process || {};
  const anchor = content.anchor || {};
  const eventsHeader = content.events_header || {
    heading: 'Aktuell im Fokus',
    highlight: '',
    subline: '',
    linkText: 'Alle Formate - direkt zur Übersicht >>',
    linkTarget: '#buchen'
  };

  return (
    <div style={{ backgroundColor: colors.bg.primary }}>
      {/* 1️⃣ HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: colors.bg.primary }} data-section>
        <div className="relative w-full max-w-[1600px] mx-auto h-screen px-3 sm:px-5 md:px-8 lg:px-16 pt-24 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8">
          <div className="relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/anatoly_mook.png"
              alt="Anatoly Mook – Bewusstseinscoach und Mentor für innere Transformation und bewusstes Leben"
              className="w-full h-full object-cover object-[65%_center] sm:object-[center_20%] md:object-[center_15%] lg:object-[center_10%]"
              loading="eager"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />
            <div className="absolute inset-x-0 bottom-0 h-[55vh] sm:h-[58vh] md:h-[62vh] lg:h-[68vh] bg-gradient-to-t from-yellow-400/80 via-yellow-400/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] bg-gradient-to-t from-yellow-500/50 via-yellow-500/20 to-transparent" />

            <div className="absolute inset-x-5 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 xl:inset-x-20 bottom-8 sm:bottom-12 md:bottom-14 lg:bottom-16 z-10">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
                  <div className="flex-1">
                    <h1 className="text-[1.85rem] leading-[1.08] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem] text-white mb-2 sm:mb-3.5 md:mb-4"
                        style={{
                          fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 800,
                          letterSpacing: '-0.04em',
                          textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 0 60px rgba(255,215,0,0.15)'
                        }}>
                      {hero.mainHeading?.split('\n').map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                      )) || 'Innere Ruhe. Klarheit im Denken. Ein Leben, das sich richtig anfühlt.'}
                    </h1>

                    <p className="text-[0.8rem] sm:text-[0.9rem] md:text-[0.95rem] lg:text-base text-white/85 mb-2 sm:mb-3.5 md:mb-4 font-semibold leading-relaxed"
                       style={{
                         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                         letterSpacing: '0.01em',
                         textShadow: '0 1px 8px rgba(0,0,0,0.3)'
                       }}>
                      {hero.subheading?.split('\n').map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>

                    <div className="inline-block group/quote mb-3 sm:mb-4">
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25),_0_0_80px_rgba(255,215,0,0.1)] transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.3),_0_0_100px_rgba(255,215,0,0.15)] hover:border-white/40">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl" />
                        <p className="relative text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] text-white/95 font-medium italic"
                           style={{
                             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                             letterSpacing: '0.01em'
                           }}>
                          „{hero.quote}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex-shrink-0">
                    <button
                      className="group relative inline-flex items-center justify-center gap-2.5
                      h-11 sm:h-[52px] md:h-14 lg:h-[60px] px-7 sm:px-9 md:px-10 lg:px-11
                      bg-white hover:bg-white
                      text-black
                      text-[0.85rem] sm:text-[0.95rem] md:text-base lg:text-[1.05rem] font-semibold
                      rounded-full
                      transition-all duration-500 ease-out
                      hover:scale-[1.03]
                      active:scale-[0.97]
                      shadow-[0_8px_32px_rgba(0,0,0,0.3),_0_0_80px_rgba(255,255,255,0.2)]
                      hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),_0_0_120px_rgba(255,255,255,0.3)]
                      overflow-hidden"
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                      onClick={() => {
                        window.location.hash = '#booking';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/30 via-transparent to-yellow-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative font-semibold tracking-wide">{hero.ctaText || 'Kostenlos Erstgespräch'}</span>
                      <ArrowRight
                        className="relative w-[18px] h-[18px] md:w-5 md:h-5 transition-transform duration-500 group-hover:translate-x-1.5"
                        strokeWidth={2.5}
                      />
                    </button>
                    <p className="text-[0.65rem] sm:text-[0.75rem] text-white/60 text-center mt-1.5 sm:mt-2 italic">
                      {hero.ctaSubtext || '15 Minuten · vertraulich · unverbindlich'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ChevronDown size={20} className="animate-bounce" strokeWidth={2.5} />
          </div>
        </button>
      </section>

      {/* 📰 NEWS SLIDER */}
      {newsArticles.length > 0 && (
        <section className="relative py-24 md:py-32" style={{ backgroundColor: colors.bg.primary }} data-section>
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
            <NewsSlider
              articles={newsArticles}
              onArticleClick={(article) => setSelectedArticle(article)}
            />
          </div>
        </section>
      )}

      {selectedArticle && (
        <NewsDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* 🎯 EVENTS SLIDER - BULLETPROOF FOR ALL BROWSERS */}
      {events.length > 0 && (
        <section className="relative py-24" style={{ backgroundColor: colors.bg.primary }} data-section>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2"
                    style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                  {eventsHeader.heading}
                  {eventsHeader.highlight && (
                    <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                      {eventsHeader.highlight}
                    </span>
                  )}
                </h2>
                {eventsHeader.subline && (
                  <p className="text-base sm:text-lg text-zinc-400 mb-3 leading-relaxed">
                    {eventsHeader.subline}
                  </p>
                )}
                {eventsHeader.linkText && (
                  <button
                    onClick={() => {
                      window.location.hash = eventsHeader.linkTarget || '#buchen';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors group"
                  >
                    <span className="text-base sm:text-lg">{eventsHeader.linkText}</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (sliderRef.current) {
                      const card = sliderRef.current.querySelector('[data-event-card]') as HTMLElement;
                      const cardWidth = card ? card.offsetWidth + 24 : 344;
                      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label={t.common.previousCard}
                >
                  <ChevronLeft size={24} className="text-white" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => {
                    if (sliderRef.current) {
                      const card = sliderRef.current.querySelector('[data-event-card]') as HTMLElement;
                      const cardWidth = card ? card.offsetWidth + 24 : 344;
                      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label={t.common.nextCard}
                >
                  <ChevronRight size={24} className="text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Slider Container */}
            <div className="relative">
              <div
                ref={sliderRef}
                data-hide-scrollbar
                className="flex gap-4 sm:gap-6 overflow-x-scroll pb-4"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                onScroll={(e) => {
                  const target = e.target as HTMLDivElement;
                  const card = target.querySelector('[data-event-card]') as HTMLElement;
                  const cardWidth = card ? card.offsetWidth + 24 : 344;
                  const newSlide = Math.round(target.scrollLeft / cardWidth);
                  setCurrentSlide(Math.min(newSlide, events.length - 1));
                }}
              >
                {events.map((event, index) => {
                  const gradientColors: Record<string, string> = {
                    'yellow-400': '#facc15',
                    'yellow-500': '#eab308',
                    'orange-400': '#fb923c',
                    'orange-500': '#f97316',
                    'blue-400': '#60a5fa',
                    'blue-500': '#3b82f6',
                    'purple-400': '#c084fc',
                    'purple-500': '#a855f7',
                    'green-400': '#4ade80',
                    'green-500': '#22c55e',
                    'pink-400': '#f472b6',
                    'pink-500': '#ec4899',
                    'red-400': '#f87171',
                    'red-500': '#ef4444',
                    'cyan-400': '#22d3ee',
                    'cyan-500': '#06b6d4',
                  };

                  const fromColor = gradientColors[event.gradient_from] || '#facc15';
                  const toColor = gradientColors[event.gradient_to] || '#f97316';

                  const titleFontSizeClasses: Record<string, string> = {
                    'xl': 'text-xl',
                    '2xl': 'text-2xl',
                    '3xl': 'text-3xl',
                    '4xl': 'text-4xl',
                    '5xl': 'text-5xl',
                    '6xl': 'text-6xl'
                  };

                  const letterSpacingClasses: Record<string, string> = {
                    'tighter': 'tracking-tighter',
                    'tight': 'tracking-tight',
                    'normal': 'tracking-normal',
                    'wide': 'tracking-wide',
                    'wider': 'tracking-wider',
                    'widest': 'tracking-widest'
                  };

                  const titleSizeClass = titleFontSizeClasses[event.title_font_size || '3xl'] || 'text-3xl';
                  const letterSpacingClass = letterSpacingClasses[event.title_letter_spacing || 'tight'] || 'tracking-tight';

                  return (
                    <button
                      key={event.id}
                      data-event-card
                      onClick={() => setSelectedEvent(event)}
                      className={`group relative cursor-pointer transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] ${event.custom_css_classes || ''}`}
                      style={{
                        flexShrink: 0,
                        width: 'min(320px, calc(100vw - 48px))',
                        minWidth: '280px',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                      aria-label={`${t.common.openEvent}: ${event.title}`}
                    >
                      <div
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500"
                        style={{
                          height: event.card_height || '420px',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        <div className="absolute inset-0">
                          <img
                            src={event.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading={index < 3 ? 'eager' : 'lazy'}
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"
                            style={{ opacity: (event.overlay_opacity || 70) / 100 }}
                          />
                        </div>

                        <div className="relative h-full flex flex-col justify-center p-5 sm:p-6 md:p-8">
                          <h3
                            className={`${titleSizeClass} text-white leading-tight ${letterSpacingClass} transition-colors duration-300 group-hover:text-yellow-100`}
                            style={{
                              fontFamily: event.title_font_family || "'SF Pro Display', -apple-system, sans-serif",
                              fontWeight: event.title_font_weight || 900,
                              textTransform: (event.title_text_transform || 'uppercase') as any,
                              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)'
                            }}
                          >
                            {event.title}
                          </h3>
                        </div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.15), transparent 70%)' }}
                        />
                      </div>

                      <div
                        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})`, filter: 'blur(20px)' }}
                      />
                    </button>
                  );
                })}
                {/* Spacer at end for scroll padding */}
                <div style={{ flexShrink: 0, width: '1px' }} aria-hidden="true" />
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (sliderRef.current) {
                      const card = sliderRef.current.querySelector('[data-event-card]') as HTMLElement;
                      const cardWidth = card ? card.offsetWidth + 24 : 344;
                      sliderRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-yellow-400'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`${t.common.goToCard} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🎨 THEMEN */}
      {themes && themes.heading && (
        <section className="py-24" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="themes">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
                  style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                {themes.heading}
              </h2>
              {themes.subheading && (
                <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mt-4">
                  {themes.subheading}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(themes.themes || []).map((theme: any, index: number) => {
                const Icon = iconMap[theme.icon] || Brain;
                return (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-500">
                      <div className="mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-black" strokeWidth={2.5} />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {theme.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 🔥 DEINE REISE - ULTRA-COMPACT FUSION CARD 🔥 */}
      {teacher && teacher.heading && (
        <section className="relative py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="teacher">
          <style>{`
            @keyframes shimmerPulse {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes floatCard {
              0%, 100% { box-shadow: 0 20px 60px rgba(251,191,36,0.25), 0 0 0 1px rgba(251,191,36,0.1); }
              50% { box-shadow: 0 30px 80px rgba(251,191,36,0.35), 0 0 0 1px rgba(251,191,36,0.15); }
            }
            .shimmer-pulse { animation: shimmerPulse 4s ease-in-out infinite; }
            .float-card { animation: floatCard 3s ease-in-out infinite; }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/5 w-[800px] h-[800px] bg-amber-500/[0.05] rounded-full blur-[180px]" />
              <div className="absolute bottom-1/4 right-1/5 w-[700px] h-[700px] bg-yellow-400/[0.04] rounded-full blur-[160px]" />
            </div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group/card">
              <div
                className="relative rounded-3xl sm:rounded-[32px] overflow-hidden backdrop-blur-xl float-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(10,10,10,0.7) 100%)',
                  border: '1px solid rgba(251,191,36,0.25)'
                }}
              >
                <div className="grid lg:grid-cols-[42%_58%] gap-0 min-h-[420px] lg:min-h-[480px]">
                  {/* LEFT - DOMINANT IMAGE */}
                  {teacher.imageUrl && (
                    <div className="relative group/image order-2 lg:order-1 h-[300px] sm:h-[380px] lg:h-auto overflow-hidden rounded-t-3xl lg:rounded-l-[32px] lg:rounded-tr-none" style={{ backgroundColor: colors.bg.secondary }}>
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.heading}
                        className="w-full h-full object-contain object-top transform group-hover/image:scale-[1.05] transition-transform duration-[1400ms] ease-out"
                        style={{ filter: 'brightness(0.92)' }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-all duration-900"
                        style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, transparent 60%)' }}
                      />

                      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                        <div
                          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl backdrop-blur-lg"
                          style={{
                            background: 'linear-gradient(135deg, rgba(251,191,36,0.25) 0%, rgba(217,119,6,0.15) 100%)',
                            border: '1px solid rgba(251,191,36,0.35)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ boxShadow: '0 0 10px rgba(251,191,36,0.9)' }} />
                          <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-50 uppercase">
                            {t.common.transformation}
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    </div>
                  )}

                  {/* RIGHT - COMPACT CONTENT */}
                  <div className="relative order-1 lg:order-2 p-5 sm:p-7 md:p-8 lg:p-9 flex flex-col justify-between">
                    <div>
                      <h2 className="mb-2 sm:mb-3">
                        <span
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.08] shimmer-pulse"
                          style={{
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 20%, #fbbf24 40%, #f59e0b 60%, #fbbf24 80%, #fcd34d 100%)',
                            backgroundSize: '350% 350%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5))'
                          }}
                        >
                          {teacher.heading}
                        </span>
                      </h2>

                      {teacher.paragraph1 && (
                        <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-light mb-4 sm:mb-5" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                          {teacher.paragraph1}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 sm:space-y-2.5 max-h-[220px] overflow-y-auto scrollbar-hide">
                      {teacher.paragraph2 && (
                        <CompactPanel
                          isOpen={expandedPanels.panel1 || false}
                          onToggle={() => setExpandedPanels(p => ({ ...p, panel1: !p.panel1 }))}
                          content={teacher.paragraph2}
                          icon={<Zap className="w-4 h-4" />}
                          t={t}
                        />
                      )}

                      {teacher.paragraph3 && (
                        <CompactPanel
                          isOpen={expandedPanels.panel2 || false}
                          onToggle={() => setExpandedPanels(p => ({ ...p, panel2: !p.panel2 }))}
                          content={teacher.paragraph3}
                          icon={<Brain className="w-4 h-4" />}
                          t={t}
                        />
                      )}

                      {teacher.paragraph4 && (
                        <CompactPanel
                          isOpen={expandedPanels.panel3 || false}
                          onToggle={() => setExpandedPanels(p => ({ ...p, panel3: !p.panel3 }))}
                          content={teacher.paragraph4}
                          icon={<Heart className="w-4 h-4" />}
                          t={t}
                        />
                      )}
                    </div>

                    {teacher.tagline && (
                      <p
                        className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-tight mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-amber-500/20 shimmer-pulse"
                        style={{
                          background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 30%, #fbbf24 60%, #f59e0b 100%)',
                          backgroundSize: '300% 300%',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.6))'
                        }}
                      >
                        {teacher.tagline}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute -inset-[2px] rounded-[34px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 -z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(217,119,6,0.1) 50%, rgba(251,191,36,0.2) 100%)',
                  filter: 'blur(24px)'
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ZIELGRUPPE - ABSOLUTE MAXIMUM HIGH-END */}
      {targetAudience && targetAudience.heading && (
        <section className="relative py-40 sm:py-48 md:py-56 lg:py-64 overflow-hidden" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="target">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-[15%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
              <div className="absolute bottom-1/3 right-[15%] w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[150px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[180px]" />
              <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-yellow-400/[0.02] rounded-full blur-[100px]" />
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
            <div className="text-center mb-24 md:mb-32">
              <div className="inline-block relative">
                <h2
                  className="text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black tracking-tight leading-[0.85]"
                  style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 15%, #fcd34d 30%, #fbbf24 45%, #f59e0b 60%, #fbbf24 75%, #fcd34d 90%, #fef3c7 100%)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 80px rgba(251,191,36,0.5)) drop-shadow(0 0 150px rgba(251,191,36,0.25))'
                  }}
                >
                  {targetAudience.heading}
                </h2>
                <div className="absolute -inset-12 bg-gradient-to-r from-amber-500/15 via-yellow-500/8 to-amber-500/15 blur-[60px] -z-10 rounded-full opacity-80" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
              <div className="group relative">
                <div className="absolute -inset-[3px] rounded-[36px] opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.6) 0%, rgba(16,185,129,0.3) 50%, rgba(5,150,105,0.5) 100%)', filter: 'blur(3px)' }} />
                <div className="absolute -inset-8 bg-emerald-500/20 rounded-[56px] blur-[50px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div
                  className="relative h-full rounded-[32px] overflow-hidden transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(160deg, rgba(6,95,70,0.95) 0%, rgba(4,63,47,0.98) 35%, rgba(6,78,59,0.92) 70%, rgba(5,46,35,0.95) 100%)',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7), 0 25px 50px -25px rgba(16,185,129,0.35), 0 0 0 1px rgba(52,211,153,0.15), inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-transparent to-emerald-600/8" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400/15 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5 w-16 h-16 border-l-2 border-t-2 border-emerald-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 right-5 w-16 h-16 border-r-2 border-b-2 border-emerald-400/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-12 md:p-14">
                    <div className="mb-12">
                      <div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl relative transform transition-all duration-500 group-hover:scale-115 group-hover:rotate-6"
                        style={{
                          background: 'linear-gradient(145deg, #6ee7b7 0%, #34d399 25%, #10b981 50%, #059669 100%)',
                          boxShadow: '0 20px 60px rgba(16,185,129,0.6), 0 8px 25px rgba(16,185,129,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/15 to-white/30" />
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
                        <Check className="w-10 h-10 text-white relative z-10" strokeWidth={3} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-12 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                      {t.common.rightForYou}
                    </h3>

                    <ul className="space-y-6">
                      {(targetAudience.rightFor || []).map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-5 group/item hover:translate-x-3 transition-all duration-400"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 transition-all duration-400 group-hover/item:scale-125"
                            style={{
                              background: 'linear-gradient(135deg, rgba(52,211,153,0.3) 0%, rgba(16,185,129,0.4) 100%)',
                              boxShadow: '0 4px 15px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                              border: '1px solid rgba(52,211,153,0.4)'
                            }}
                          >
                            <Check className="w-4 h-4 text-emerald-300" strokeWidth={3} />
                          </div>
                          <span className="text-lg md:text-xl text-zinc-100 leading-relaxed font-normal group-hover/item:text-white transition-colors duration-300" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(52,211,153,0.1) 0%, transparent 40%)' }} />
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[3px] rounded-[36px] opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ background: 'linear-gradient(135deg, rgba(248,113,113,0.5) 0%, rgba(220,38,38,0.25) 50%, rgba(185,28,28,0.4) 100%)', filter: 'blur(3px)' }} />
                <div className="absolute -inset-8 bg-red-500/15 rounded-[56px] blur-[50px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div
                  className="relative h-full rounded-[32px] overflow-hidden transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(160deg, rgba(153,27,27,0.92) 0%, rgba(69,10,10,0.96) 35%, rgba(127,29,29,0.88) 70%, rgba(55,10,10,0.94) 100%)',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7), 0 25px 50px -25px rgba(185,28,28,0.25), 0 0 0 1px rgba(248,113,113,0.1), inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-transparent to-red-600/5" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-400/10 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5 w-16 h-16 border-l-2 border-t-2 border-red-400/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 right-5 w-16 h-16 border-r-2 border-b-2 border-red-400/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-12 md:p-14">
                    <div className="mb-12">
                      <div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl relative transform transition-all duration-500 group-hover:scale-115 group-hover:-rotate-6"
                        style={{
                          background: 'linear-gradient(145deg, #fca5a5 0%, #f87171 25%, #dc2626 50%, #b91c1c 100%)',
                          boxShadow: '0 20px 60px rgba(185,28,28,0.5), 0 8px 25px rgba(185,28,28,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/10 to-white/25" />
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 50%)' }} />
                        <span className="text-3xl font-black text-white relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>×</span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-12 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                      {t.common.notRightForYou}
                    </h3>

                    <ul className="space-y-6">
                      {(targetAudience.notRightFor || []).map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-5 group/item hover:translate-x-3 transition-all duration-400"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 transition-all duration-400 group-hover/item:scale-125"
                            style={{
                              background: 'linear-gradient(135deg, rgba(248,113,113,0.25) 0%, rgba(220,38,38,0.35) 100%)',
                              boxShadow: '0 4px 15px rgba(185,28,28,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                              border: '1px solid rgba(248,113,113,0.3)'
                            }}
                          >
                            <span className="text-red-300 text-sm font-black">×</span>
                          </div>
                          <span className="text-lg md:text-xl text-zinc-200 leading-relaxed font-normal group-hover/item:text-zinc-100 transition-colors duration-300" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(248,113,113,0.08) 0%, transparent 40%)' }} />
                </div>
              </div>
            </div>

            {targetAudience.conclusionText && (
              <div className="relative group">
                <div className="absolute -inset-[3px] rounded-[32px] opacity-90 group-hover:opacity-100 transition-all duration-500" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.5) 0%, rgba(245,158,11,0.3) 50%, rgba(251,191,36,0.5) 100%)', filter: 'blur(3px)' }} />
                <div className="absolute -inset-10 bg-amber-500/25 rounded-[50px] blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div
                  className="relative rounded-[28px] overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(145deg, rgba(146,64,14,0.9) 0%, rgba(120,53,15,0.92) 40%, rgba(146,64,14,0.85) 100%)',
                    boxShadow: '0 35px 70px -20px rgba(0,0,0,0.6), 0 20px 40px -20px rgba(251,191,36,0.3), 0 0 0 1px rgba(251,191,36,0.2), inset 0 2px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/12 via-yellow-500/15 to-amber-400/12" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/12 via-transparent to-transparent" />

                  <div className="relative py-12 px-14 md:py-14 md:px-20">
                    <p
                      className="text-center text-2xl md:text-3xl font-bold leading-relaxed tracking-wide"
                      style={{
                        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 30%, #fcd34d 50%, #fef3c7 70%, #fffbeb 100%)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 4s ease-in-out infinite',
                        filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.4))'
                      }}
                    >
                      {targetAudience.conclusionText}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 🎯 SEKTION 3 – LEHRERBILD & USP - ULTIMATE PREMIUM */}
      <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="teacher-usp">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-amber-500/[0.05] via-yellow-500/[0.04] to-orange-500/[0.05] rounded-full blur-[220px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/[0.02] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* PREMIUM SPLIT HERO */}
          <div className="grid lg:grid-cols-[42%_58%] gap-10 lg:gap-16 mb-14 items-center">
            {/* LEFT: Ultra Premium Teacher Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 to-orange-500/40 rounded-[36px] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="relative rounded-[30px] overflow-hidden transition-all duration-500 group-hover:scale-[1.02]" style={{
                border: '2px solid rgba(251,191,36,0.35)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}>
                <div className="relative">
                  <img
                    src="/bildschirmfoto_2026-01-09_um_18.51.39.png"
                    alt="Anatoly Mook"
                    className="w-full h-[480px] sm:h-[540px] object-cover object-[30%_15%] sm:object-[40%_15%] lg:object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                  {/* Floating Expert Badge */}
                  <div className="absolute top-6 right-6 animate-pulse" style={{ animationDuration: '4s' }}>
                    <div className="px-5 py-2.5 rounded-full backdrop-blur-xl" style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.98) 0%, rgba(245,158,11,0.98) 100%)',
                      boxShadow: '0 10px 40px rgba(251,191,36,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
                    }}>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-black fill-black animate-pulse" strokeWidth={2} />
                        <span className="text-xs font-black text-black tracking-wide">EXPERT</span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Name Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm" style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)'
                  }}>
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight" style={{
                          textShadow: '0 2px 20px rgba(251,191,36,0.3)'
                        }}>Anatoly Mook</h3>
                        <p className="text-yellow-200/95 text-sm font-bold mb-3">Bewusstseinslehrer & Coach</p>
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2.5">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 ring-2 ring-black flex items-center justify-center text-xs font-black text-black">
                                {i === 4 ? '...' : ''}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-white/80 font-medium">500+ Klienten</span>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-transform duration-500 group-hover:rotate-12" style={{
                        background: 'rgba(251,191,36,0.25)',
                        border: '1px solid rgba(251,191,36,0.5)',
                        boxShadow: '0 8px 20px rgba(251,191,36,0.2)'
                      }}>
                        <Sparkles className="w-7 h-7 text-yellow-400" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Elite Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.05]" style={{
                  textShadow: '0 4px 40px rgba(251,191,36,0.25)'
                }}>
                  <span className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent inline-block animate-pulse" style={{ animationDuration: '3s' }}>
                    Präzision trifft Tiefe
                  </span>
                </h2>
                <p className="text-xl sm:text-2xl text-white/85 font-light mb-5 leading-tight">
                  Ein Lehrer für wahren Wandel
                </p>
                <p className="text-base text-white/70 leading-relaxed">
                  Anatoly initiiert einen Raum, in dem Achtsamkeitslehre, Bewusstseinstraining und Erfolgscoaching einheitlich wirken. Diese Synergie erzeugt Erkenntnisse und schafft innere Ordnung, die sich im Außen entfaltet: Wahrnehmung wird präzise, Entscheidungen werden stimmig, Umsetzung erfolgt ruhig und konsequent – spürbar in Vitalität, Beziehungen und Business.
                </p>
              </div>

              {/* Ultra Premium 3 Pillars */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Brain className="w-6 h-6" />, title: 'Achtsamkeit', desc: 'Präsenz vertiefen', gradient: 'from-yellow-400 to-yellow-500' },
                  { icon: <Sparkles className="w-6 h-6" />, title: 'Bewusstsein', desc: 'Identität klären', gradient: 'from-amber-400 to-amber-500' },
                  { icon: <Target className="w-6 h-6" />, title: 'Erfolg', desc: 'Wirkkraft leben', gradient: 'from-orange-400 to-orange-500' }
                ].map((item, i) => (
                  <div key={i} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 rounded-2xl transition-all duration-500 blur-xl`} />
                    <div className="relative text-center p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1" style={{
                      background: 'rgba(251,191,36,0.08)',
                      border: '1px solid rgba(251,191,36,0.25)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                    }}>
                      <div className={`w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`} style={{
                        background: `linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)`,
                        boxShadow: '0 6px 16px rgba(251,191,36,0.4)'
                      }}>
                        {item.icon}
                      </div>
                      <h4 className="text-xs font-black text-white mb-1 tracking-tight">{item.title}</h4>
                      <p className="text-[10px] text-white/55 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-section="booking"]');
                  if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-black text-black transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  boxShadow: '0 12px 40px rgba(251,191,36,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
                }}
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" strokeWidth={2.5} />
                <span>Mehr erfahren</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* KERNVERSPRECHEN + DAS WIE - SIDE BY SIDE */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Kernversprechen */}
            <button
              onClick={() => setExpandedPanels(prev => ({ ...prev, promise: !prev.promise }))}
              className="text-left group"
            >
              <div className="relative rounded-2xl p-6" style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.9) 100%)',
                border: expandedPanels.promise ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(251,191,36,0.2)',
                boxShadow: expandedPanels.promise ? '0 12px 40px rgba(251,191,36,0.15)' : '0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                    }}>
                      <Star className="w-5 h-5 text-black" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-white">Kernversprechen</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${expandedPanels.promise ? 'bg-yellow-400 rotate-45' : 'bg-yellow-400/20'}`}>
                    <Plus className={`w-5 h-5 ${expandedPanels.promise ? 'text-black' : 'text-yellow-400'}`} strokeWidth={3} />
                  </div>
                </div>

                <p className="text-lg font-bold text-yellow-200 mb-2">Transzendenz in ein neues Bewusstsein</p>
                <p className="text-sm text-white/60 mb-4">Der Schritt über die persönliche Transformation hinaus – in ein wahrhaftiges, stabiles und handlungsfähiges Leben.</p>

                <div className="overflow-hidden transition-all duration-500" style={{
                  maxHeight: expandedPanels.promise ? '400px' : '0px',
                  opacity: expandedPanels.promise ? 1 : 0
                }}>
                  <div className="pt-4 space-y-3 border-t border-yellow-400/20">
                    {[
                      { icon: <Zap className="w-4 h-4" />, title: 'Ressourcengewinnung', desc: 'Konditionierte Last fällt ab, frische Energie wird frei.' },
                      { icon: <Shield className="w-4 h-4" />, title: 'Souveränität', desc: 'Stabile, ruhige Haltung und fokussierte Präsenz – auch unter Druck.' },
                      { icon: <Check className="w-4 h-4" />, title: 'Handlungsfähigkeit', desc: 'Klares Erkennen statt Grübeln. Konsequente Umsetzung statt Zögern.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                        background: 'rgba(251,191,36,0.08)',
                        border: '1px solid rgba(251,191,36,0.15)'
                      }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                          <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>

            {/* Das WIE */}
            <button
              onClick={() => setExpandedPanels(prev => ({ ...prev, how: !prev.how }))}
              className="text-left group"
            >
              <div className="relative rounded-2xl p-6" style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(217,119,6,0.08) 100%)',
                border: expandedPanels.how ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(251,191,36,0.2)',
                boxShadow: expandedPanels.how ? '0 12px 40px rgba(251,191,36,0.15)' : '0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-black text-white">Das "Wie" macht den Unterschied</h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${expandedPanels.how ? 'bg-yellow-400 rotate-45' : 'bg-yellow-400/20'}`}>
                    <Plus className={`w-5 h-5 ${expandedPanels.how ? 'text-black' : 'text-yellow-400'}`} strokeWidth={3} />
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-4">Die Besonderheit liegt nicht im Wissen, sondern in der Art der Vermittlung.</p>

                <div className="overflow-hidden transition-all duration-500" style={{
                  maxHeight: expandedPanels.how ? '400px' : '0px',
                  opacity: expandedPanels.how ? 1 : 0
                }}>
                  <div className="pt-4 space-y-3 border-t border-yellow-400/20">
                    {[
                      { icon: <Target className="w-4 h-4" />, title: 'Laser-scharfe Klarheit', desc: 'Wir nutzen eine präzise Sprache, die Gedanken und Emotionen sofort ordnet.' },
                      { icon: <Zap className="w-4 h-4" />, title: 'Verkörperte Energie', desc: 'Das Miteinander ist wach, belebend und modern.' },
                      { icon: <Sparkles className="w-4 h-4" />, title: 'Saubere Synthese', desc: 'Spirituelle Tiefe und greifbare Resultate bilden eine synergetische Wirkungslinie.' },
                      { icon: <Check className="w-4 h-4" />, title: 'Maßgeschneiderte Konsequenz', desc: 'Wir gestalten Schritte, die deiner wahren Natur entsprechen und im echten Leben bestehen.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(251,191,36,0.15)'
                      }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                          <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* COMPACT CTA ROW */}
          <div className="text-center">
            <p className="text-lg sm:text-xl font-bold text-white mb-4">
              Vertrauen als Fundament für den gemeinsamen Weg
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-section="booking"]');
                  if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  boxShadow: '0 8px 20px rgba(251,191,36,0.3)'
                }}
              >
                <Calendar className="w-4 h-4" strokeWidth={2.5} />
                Erstgespräch vereinbaren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => {
                  const seminarsSection = document.querySelector('[data-section="seminars"]');
                  if (seminarsSection) seminarsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(251,191,36,0.3)'
                }}
              >
                <Book className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                Formate entdecken
                <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEKTION 4: NEUES BEWUSSTSEIN ==================== */}
      <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: '#000000' }} data-section data-section-id="consciousness">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251,191,36,0.6) 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* HERO SECTION WITH SPLIT LAYOUT */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* LEFT - Text Content */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                Neues Bewusstsein.{' '}
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  Neue Selbstführung.
                </span>
                {' '}Ein neues Leben.
              </h2>

              {/* Resonanz-Fragen kompakt */}
              <div className="space-y-3 mb-8">
                {[
                  'Funktioniert im Außen vieles – doch darunter bleibt ein leiser Rest von Unstimmigkeit?',
                  'Triffst du Entscheidungen – und erkennst später, dass die wahre Klarheit fehlte?',
                  'Ahnst du, dass die heutige Welt eine neue Qualität von Führung verlangt – jenseits von bloßer Leistung?'
                ].map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                    }}>
                      <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                    </div>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">{question}</p>
                  </div>
                ))}
              </div>

              {/* Neuordnung kompakt */}
              <div className="p-6 rounded-2xl" style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(217,119,6,0.1) 100%)',
                border: '1px solid rgba(251,191,36,0.3)',
                boxShadow: '0 20px 60px rgba(251,191,36,0.2)'
              }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                  }}>
                    <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black text-white pt-1">Neuordnung</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Neues Bewusstsein ist kein theoretisches Konzept. Es ist ein qualitativer Perspektivwechsel - eine andere Art zu sehen, zu wählen und zu leben. Du löst dich aus den Prägungen der Vergangenheit und öffnest den Raum für Intuition, Weisheit und klare innere Führung.
                </p>
              </div>
            </div>

            {/* RIGHT - Hero Visual */}
            <div className="relative">
              <div className="relative rounded-[30px] overflow-hidden" style={{
                border: '2px solid rgba(251,191,36,0.3)',
                boxShadow: '0 40px 100px rgba(251,191,36,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}>
                <img
                  src="/bildschirmfoto_2025-12-19_um_01.49.07.png"
                  alt="Bewusstseinsentwicklung"
                  className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover object-[center_20%] sm:object-[center_25%] md:object-[center_30%] lg:object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: <Eye className="w-5 h-5" />, label: 'Klarheit' },
                    { icon: <Target className="w-5 h-5" />, label: 'Präzision' },
                    { icon: <Sparkles className="w-5 h-5" />, label: 'Weisheit' }
                  ].map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl backdrop-blur-xl text-center" style={{
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(251,191,36,0.3)'
                    }}>
                      <div className="w-8 h-8 mx-auto mb-1 rounded-lg flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                      }}>
                        {stat.icon}
                      </div>
                      <p className="text-xs font-bold text-white">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* VOM REAGIEREN ZUM GESTALTEN - KOMPAKTE 3-SPALTEN-GRID */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Vom{' '}
                <span className="text-red-400">Reagieren</span>
                {' '}zum{' '}
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Gestalten
                </span>
              </h3>
              <div className="h-1 w-32 mx-auto rounded-full" style={{
                background: 'linear-gradient(90deg, #ef4444 0%, #fbbf24 100%)'
              }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  left: { title: 'Illusion', desc: 'Identifikation mit dem falschen Ich. Gefangen in Gedanken, Zeit und alten Konzepten.', icon: <AlertCircle className="w-4 h-4" /> },
                  right: { title: 'Wahrheit', desc: 'Erkennen, wer du wirklich bist. Achtsamkeit, Präzision und das Erfahren deiner wahren Natur.', icon: <Eye className="w-4 h-4" /> }
                },
                {
                  left: { title: 'Autopilot', desc: 'Ein Kreislauf aus Suchen, Warten und Beklagen.', icon: <Repeat className="w-4 h-4" /> },
                  right: { title: 'Souveränität', desc: 'Staunen können. Den Moment zelebrieren.', icon: <Crown className="w-4 h-4" /> }
                },
                {
                  left: { title: 'Reaktiv', desc: 'Vergangene Muster steuern das Verhalten. Die Geschichte wiederholt sich.', icon: <Zap className="w-4 h-4" /> },
                  right: { title: 'Schöpferisch', desc: 'Bewusste Wahrnehmung öffnet neue Wege und setzt Ressourcen frei.', icon: <Sparkles className="w-4 h-4" /> }
                },
                {
                  left: { title: 'Getrieben', desc: 'Die Gier nach „mehr", getrieben von Erwartungen.', icon: <TrendingDown className="w-4 h-4" /> },
                  right: { title: 'Integrität', desc: 'Bewusstes Handeln aus Klarheit, Liebe und innerer Stärke.', icon: <Shield className="w-4 h-4" /> }
                },
                {
                  left: { title: 'Widerstand', desc: 'Kontrolle, Anhaften, Haben-Müssen.', icon: <X className="w-4 h-4" /> },
                  right: { title: 'Flow', desc: 'Eine einbeziehende Harmonie mit den Menschen in deiner Umgebung.', icon: <Waves className="w-4 h-4" /> }
                },
                {
                  left: { title: 'Fragmentiert', desc: 'Denken, Fühlen und Handeln ziehen in unterschiedliche Richtungen.', icon: <Puzzle className="w-4 h-4" /> },
                  right: { title: 'Einheit', desc: 'Verstand und Intuition synchronisieren sich – im Rhythmus des Lebens.', icon: <Target className="w-4 h-4" /> }
                }
              ].map((pair, i) => (
                <div key={i} className="group relative">
                  <div className="p-5 rounded-2xl h-full transition-all duration-500 hover:scale-105" style={{
                    background: 'linear-gradient(180deg, rgba(239,68,68,0.1) 0%, rgba(251,191,36,0.15) 100%)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}>
                    {/* Old State - Red */}
                    <div className="mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'rgba(239,68,68,0.2)',
                          border: '1px solid rgba(239,68,68,0.3)'
                        }}>
                          {pair.left.icon}
                        </div>
                        <h4 className="text-base font-black text-red-400 pt-1">{pair.left.title}</h4>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{pair.left.desc}</p>
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center -my-2 relative z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                      }}>
                        <ArrowRight className="w-4 h-4 text-black rotate-90" strokeWidth={3} />
                      </div>
                    </div>

                    {/* New State - Gold */}
                    <div className="pt-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        }}>
                          {pair.right.icon}
                        </div>
                        <h4 className="text-base font-black text-yellow-400 pt-1">{pair.right.title}</h4>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">{pair.right.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION - SPLIT LAYOUT */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* LEFT - Zusammenfassung + Accordion */}
            <div className="space-y-6">
              {/* Zusammenfassung */}
              <div className="p-6 rounded-2xl" style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.8) 100%)',
                border: '2px solid rgba(251,191,36,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}>
                <p className="text-base text-white/90 leading-relaxed">
                  Neue Bewusstheit verbindet innere Fülle mit äußerer Konsequenz. Das Ergebnis ist eine neue Qualität von Klarheit, Stabilität und fokussierte Präsenz. Erlebbar – in{' '}
                  <span className="font-bold text-yellow-400">Vitalität</span>,{' '}
                  <span className="font-bold text-yellow-400">Beziehungen</span>,{' '}
                  <span className="font-bold text-yellow-400">Erfolg</span> und{' '}
                  <span className="font-bold text-yellow-400">Selbstführung</span>.
                </p>
              </div>

              {/* Accordion kompakt */}
              <button
                onClick={() => setExpandedPanels(prev => ({ ...prev, recognition: !prev.recognition }))}
                className="w-full text-left group"
              >
                <div className="p-5 rounded-2xl transition-all duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(217,119,6,0.08) 100%)',
                  border: expandedPanels.recognition ? '2px solid rgba(251,191,36,0.4)' : '1px solid rgba(251,191,36,0.2)',
                  boxShadow: expandedPanels.recognition ? '0 12px 40px rgba(251,191,36,0.2)' : '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                      }}>
                        <Eye className="w-5 h-5 text-black" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-lg font-black text-white">Woran du die Veränderung erkennst</h4>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${expandedPanels.recognition ? 'bg-yellow-400 rotate-45' : 'bg-yellow-400/20'}`}>
                      <Plus className={`w-5 h-5 ${expandedPanels.recognition ? 'text-black' : 'text-yellow-400'}`} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="overflow-hidden transition-all duration-500" style={{
                    maxHeight: expandedPanels.recognition ? '500px' : '0px',
                    opacity: expandedPanels.recognition ? 1 : 0
                  }}>
                    <div className="pt-4 mt-4 space-y-3 border-t border-yellow-400/20">
                      {[
                        { icon: <Pause className="w-4 h-4" />, title: 'Autopilot stoppt', desc: 'Die automatische Reaktion weicht wacher Wahrnehmung.' },
                        { icon: <Target className="w-4 h-4" />, title: 'Klarheit steigt', desc: 'Aufmerksamkeit ist gesammelt und auf das Wesentliche fokussiert.' },
                        { icon: <Shield className="w-4 h-4" />, title: 'Echte Führung', desc: 'Trigger verlieren ihre Macht über dich. Emotionale Reize bestimmen dich nicht mehr. Du reagierst nicht unbewusst, sondern führst dich stabil und weise.' },
                        { icon: <Sparkles className="w-4 h-4" />, title: 'Wirkung aus Enthusiasmus', desc: 'Dein Handeln entspringt keinem konditionierten Verlangen und ist kein bloßes Mittel zum Zweck. Es ist beflügelt von innerer Freude und findet Erfüllung im Prozess selbst.' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                          background: 'rgba(251,191,36,0.08)',
                          border: '1px solid rgba(251,191,36,0.15)'
                        }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                          }}>
                            {item.icon}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                            <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* RIGHT - CTA mit Visual */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden" style={{
                  border: '2px solid rgba(251,191,36,0.3)',
                  boxShadow: '0 30px 80px rgba(251,191,36,0.3)'
                }}>
                  <div className="absolute inset-0">
                    <img
                      src="/bildschirmfoto_2025-12-18_um_21.42.41.png"
                      alt="Transformation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                  </div>

                  <div className="relative p-8">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight">
                      Bereit für neue Ausrichtung und{' '}
                      <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                        Perspektivwechsel?
                      </span>
                    </h3>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          const bookingSection = document.querySelector('[data-section="booking"]');
                          if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="w-full group flex items-center gap-3 p-4 rounded-xl text-base font-bold text-black transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          boxShadow: '0 12px 40px rgba(251,191,36,0.5)'
                        }}
                      >
                        <Calendar className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                        <div className="flex-1 text-left">
                          <div>Erstgespräch vereinbaren</div>
                          <div className="text-xs font-normal opacity-80">kostenfrei & unverbindlich · klare Ausrichtung</div>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" strokeWidth={3} />
                      </button>

                      <button
                        onClick={() => {
                          const seminarsSection = document.querySelector('[data-section="seminars"]');
                          if (seminarsSection) seminarsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="w-full group flex items-center gap-3 p-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105"
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          border: '2px solid rgba(251,191,36,0.4)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <Book className="w-5 h-5 text-yellow-400 flex-shrink-0" strokeWidth={2.5} />
                        <div className="flex-1 text-left">
                          <div>Formate entdecken</div>
                          <div className="text-xs font-normal opacity-70">Seminare · Coaching · Academy</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-2 transition-transform flex-shrink-0" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTIONS */}
      <ConsciousnessComparison />
      <TransformationSlider />
      <AwarenessModule />

      {/* ⚓ IDENTITÄTS-ANKER */}
      {anchor && anchor.mainText && (
        <section className="py-24" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="anchor">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="space-y-8">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
                 style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  {anchor.mainText}
                </span>
              </p>

              {anchor.secondaryText && (
                <p className="text-xl sm:text-2xl text-white/60">
                  {anchor.secondaryText}
                </p>
              )}

              {anchor.authorName && (
                <p className="text-lg text-white/80 font-semibold pt-8">
                  {anchor.authorName}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 🎯 FINALE SECTION */}
      <FinaleSection />

    </div>
  );
}
