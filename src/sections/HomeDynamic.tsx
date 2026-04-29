import { useState, useEffect, useMemo, useRef, type CSSProperties } from 'react';
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

const DEEP_DIVE_PANELS: {
  label: string;
  description: string;
  insight: string;
}[] = [
  {
    label: 'Gesundheit & Vitalität',
    description:
      'Hier geht es nicht um Optimierung um jeden Preis, sondern um ein Nervensystem, das mit deiner Rolle und deinem Tempo mitgeht.',
    insight: 'Spürbarer Schwerpunkt: Stabilität vor Intensität.'
  },
  {
    label: 'Beziehung & Liebe',
    description:
      'Nähe wirkt, wenn Klarheit vor Anspruch kommt — in Konversation, Nähe und Verbindlichkeit.',
    insight: 'Spürbarer Schwerpunkt: Präsenz statt Erwartungsdynamik.'
  },
  {
    label: 'Beruf / Berufung',
    description:
      'Entscheidungen brauchen eine innere Linie, wenn Druck, Reichweite und Tempo gleichzeitig steigen.',
    insight: 'Spürbarer Schwerpunkt: Richtung ohne Zerrissenheit.'
  },
  {
    label: 'Geld & Erfolg',
    description:
      'Erfolg wird tragfähig, wenn er nicht aus Kompensation gespeist wird, sondern aus klarer Bewertung und Priorität.',
    insight: 'Spürbarer Schwerpunkt: Souveränität in der Knappheitsfrage.'
  },
  {
    label: 'Erfüllung',
    description:
      'Sinn ist keine Floskel, sondern Übereinstimmung zwischen Wahrnehmung, Wahl und Handlung.',
    insight: 'Spürbarer Schwerpunkt: Reduktion auf das Wesentliche.'
  }
];

const TRANSFORM_ROWS: { from: string; to: string }[] = [
  { from: 'Reaktiv', to: 'Klar in Entscheidungen' },
  { from: 'Getrieben', to: 'Souverän in Führung' },
  { from: 'Unruhig', to: 'Stabil unter Druck' },
  { from: 'Zerrissen', to: 'Fokussiert im Handeln' },
  { from: 'Zweifelnd', to: 'Entscheidungsstark' },
  { from: 'Operativ gebunden', to: 'Strategisch klar' }
];

/** Split long labels at " & " so all stat columns share a common label baseline */
function TrustLabel({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const parts = text.split(' & ');
  if (parts.length === 2) {
    return (
      <span className={className} style={style}>
        {parts[0]}
        <br />
        <span>& {parts[1]}</span>
      </span>
    );
  }
  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
}

/** Premium gold hex mark for “Führungskräfte & Unternehmer” (replaces bullet) */
function TrustExecutiveInsignia({ idSuffix, size }: { idSuffix: string; size: 'hero' | 'strip' }) {
  const gid = `trust-exec-${idSuffix}`;
  const dim =
    size === 'hero'
      ? 'clamp(1rem, 0.88rem + 0.45vw, 1.3125rem)'
      : 'clamp(2rem, 5.2vw, 3.5rem)';
  return (
    <svg
      viewBox="0 0 48 48"
      className="hero-trust-insignia shrink-0"
      aria-hidden
      style={{ width: dim, height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FCE6A0" />
          <stop offset="42%" stopColor="#E6BE5A" />
          <stop offset="100%" stopColor="#8A6820" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="1.35"
        strokeLinejoin="round"
        d="M24 4 L41 13.5 V34.5 L24 44 L7 34.5 V13.5 Z"
      />
      <path fill={`url(#${gid})`} fillOpacity={0.18} d="M24 13 L34.5 19 V31 L24 37 L13.5 31 V19 Z" />
    </svg>
  );
}

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
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [deepDiveTab, setDeepDiveTab] = useState(0);
  const [transformExpanded, setTransformExpanded] = useState(false);
  const [transformPeek, setTransformPeek] = useState(false);

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

  const hero = {
    ...(content.hero || {}),
    ...{
      mainHeading:
        'Klarheit im Denken.\nStabilität in Entscheidungen.\nFührung, die trägt.',
      subheading:
        'Wenn dein Unternehmen wächst, aber Entscheidungen an Klarheit verlieren,\nliegt das Problem nicht im Außen – sondern in der Führung.',
      ctaText: 'Strategisches Gespräch anfragen'
    }
  };
  const themes = content.themes || {};
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

  const deepPane = DEEP_DIVE_PANELS[deepDiveTab];

  return (
    <div style={{ backgroundColor: colors.bg.primary }}>
      {/* 1️⃣ HERO */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#000', height: '100svh', minHeight: '100vh' }} data-section>
        <div className="relative w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            {/* Hero scoped premium styles */}
            <style>{`
              .hero-cta {
                position: relative;
                background:
                  linear-gradient(180deg, #FCE08F 0%, #F0C25B 28%, #D69D2C 62%, #B07A18 100%);
                border: 1px solid rgba(255,236,160,0.65);
                color: #1A1208;
                box-shadow:
                  inset 0 1px 0 rgba(255,250,235,0.7),
                  inset 0 0 0 1px rgba(255,233,160,0.35),
                  inset 0 -1px 0 rgba(80,48,0,0.28),
                  0 1px 2px rgba(20,12,0,0.25),
                  0 10px 26px -10px rgba(192,140,40,0.55),
                  0 24px 60px -16px rgba(214,168,62,0.32);
                transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1),
                            box-shadow 0.35s cubic-bezier(0.2,0.8,0.2,1),
                            filter 0.35s cubic-bezier(0.2,0.8,0.2,1);
                isolation: isolate;
                overflow: hidden;
              }
              /* Inner satin sheen */
              .hero-cta::before {
                content: '';
                position: absolute;
                inset: 0;
                background:
                  linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 38%);
                pointer-events: none;
                border-radius: inherit;
                z-index: 0;
              }
              /* Soft moving highlight on hover */
              .hero-cta::after {
                content: '';
                position: absolute;
                top: 0;
                left: -120%;
                width: 60%;
                height: 100%;
                background: linear-gradient(115deg,
                  rgba(255,255,255,0) 0%,
                  rgba(255,250,225,0.35) 50%,
                  rgba(255,255,255,0) 100%);
                transform: skewX(-18deg);
                transition: left 0.85s cubic-bezier(0.2,0.8,0.2,1);
                pointer-events: none;
                z-index: 1;
              }
              .hero-cta > * {
                position: relative;
                z-index: 2;
              }
              .hero-cta:hover {
                transform: translateY(-1.5px);
                filter: brightness(1.04);
                box-shadow:
                  inset 0 1px 0 rgba(255,252,240,0.78),
                  inset 0 0 0 1px rgba(255,238,170,0.45),
                  inset 0 -1px 0 rgba(80,48,0,0.32),
                  0 1px 2px rgba(20,12,0,0.25),
                  0 14px 32px -10px rgba(192,140,40,0.65),
                  0 30px 80px -16px rgba(214,168,62,0.45);
              }
              .hero-cta:hover::after {
                left: 130%;
              }
              .hero-cta:active {
                transform: translateY(0);
                filter: brightness(0.98);
                box-shadow:
                  inset 0 1px 0 rgba(255,252,240,0.55),
                  inset 0 0 0 1px rgba(255,233,160,0.35),
                  inset 0 -1px 0 rgba(80,48,0,0.32),
                  0 1px 2px rgba(20,12,0,0.3),
                  0 8px 22px -10px rgba(192,140,40,0.5),
                  0 18px 50px -16px rgba(214,168,62,0.28);
              }
              .hero-cta:focus-visible {
                outline: none;
                box-shadow:
                  inset 0 1px 0 rgba(255,252,240,0.7),
                  inset 0 0 0 1px rgba(255,238,170,0.5),
                  inset 0 -1px 0 rgba(80,48,0,0.32),
                  0 0 0 3px rgba(214,168,62,0.35),
                  0 14px 32px -10px rgba(192,140,40,0.55),
                  0 30px 80px -16px rgba(214,168,62,0.4);
              }

              @keyframes heroSunDrift {
                0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0.85; }
                50%  { transform: translate3d(-1.2%, 0.6%, 0) scale(1.02); opacity: 1; }
                100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.85; }
              }
              .hero-sun {
                animation: heroSunDrift 14s ease-in-out infinite;
                will-change: transform, opacity;
              }
              @keyframes heroRaysShimmer {
                0%, 100% { opacity: 0.55; }
                50%      { opacity: 0.85; }
              }
              .hero-rays {
                animation: heroRaysShimmer 9s ease-in-out infinite;
                will-change: opacity;
              }

              /* MOBILE PRECISION TUNING — premium compact (≤ 640px) */
              @media (max-width: 640px) {
                .hero-headline {
                  font-size: clamp(1.4rem, 6.2vw, 1.875rem) !important;
                  line-height: 1.09 !important;
                  letter-spacing: -0.034em !important;
                  text-shadow: 0 8px 28px rgba(0,0,0,0.78), 0 2px 10px rgba(0,0,0,0.55) !important;
                }
                .hero-subline {
                  font-size: 0.8125rem !important;
                  line-height: 1.55 !important;
                  max-width: 86% !important;
                  color: rgba(248,244,234,0.8) !important;
                  text-shadow: 0 2px 12px rgba(0,0,0,0.65) !important;
                }
                .hero-badge-text {
                  font-size: 0.56rem !important;
                  letter-spacing: 0.24em !important;
                }
                .hero-trust-num {
                  font-size: 0.95rem !important;
                }
                .hero-trust-insignia {
                  width: 0.95rem !important;
                  max-width: 0.95rem !important;
                }
                .hero-trust-label {
                  font-size: 0.54rem !important;
                  letter-spacing: 0.16em !important;
                  margin-top: 6px !important;
                }
                .hero-microtrust-label {
                  font-size: 0.54rem !important;
                  letter-spacing: 0.18em !important;
                }
                .hero-microtrust-divider {
                  height: 10px !important;
                  margin-left: 0.625rem !important;
                  margin-right: 0.625rem !important;
                }
                .hero-content-wrap {
                  max-width: 78% !important;
                }
              }
              @media (max-width: 380px) {
                .hero-headline {
                  font-size: clamp(1.25rem, 5.8vw, 1.6rem) !important;
                }
                .hero-subline {
                  font-size: 0.75rem !important;
                }
                .hero-content-wrap {
                  max-width: 84% !important;
                }
              }
            `}</style>

            <img
              src="/anatoly_mook_hero_v2.png"
              alt="Anatoly Mook – Bewusstseinscoach und Mentor für innere Transformation und bewusstes Leben"
              className="absolute inset-0 w-full h-full object-cover object-[68%_30%] sm:object-[65%_28%] md:object-[60%_28%] lg:object-[58%_28%] xl:object-[55%_28%]"
              loading="eager"
              fetchPriority="high"
              style={{
                transform: `scale(${1.02 + scrollY * 0.00012})`,
                transition: 'transform 0.1s linear',
                transformOrigin: '65% 40%'
              }}
            />

            {/* CINEMATIC LIGHTING — warm sun bloom from upper right */}
            <div
              className="hero-sun absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 78% 28%, rgba(255,205,135,0.32) 0%, rgba(255,178,90,0.16) 35%, rgba(255,150,60,0.06) 60%, transparent 78%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* GOD RAYS — diagonal volumetric streaks */}
            <div
              className="hero-rays absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(152deg, transparent 38%, rgba(255,220,150,0.07) 50%, transparent 62%),
                  linear-gradient(165deg, transparent 42%, rgba(255,210,140,0.05) 55%, transparent 68%),
                  linear-gradient(140deg, transparent 32%, rgba(255,225,160,0.045) 46%, transparent 58%),
                  linear-gradient(175deg, transparent 45%, rgba(255,200,120,0.04) 58%, transparent 70%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* Subtle warm color grade across whole image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,170,80,0.04) 0%, transparent 35%, rgba(60,30,0,0.06) 100%)',
                mixBlendMode: 'overlay'
              }}
            />

            {/* PREMIUM LEFT FADE — typography depth (desktop) */}
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,2,2,0.92) 0%, rgba(4,3,2,0.78) 22%, rgba(5,4,3,0.50) 42%, rgba(5,4,3,0.16) 62%, rgba(5,4,3,0.02) 82%, transparent 100%)'
              }}
            />

            {/* MOBILE OVERLAY — full-frame readability */}
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(2,2,2,0.48) 0%, rgba(2,2,2,0.32) 28%, rgba(2,2,2,0.18) 50%, rgba(2,2,2,0.45) 78%, rgba(0,0,0,0.78) 100%)'
              }}
            />

            {/* HEAVY BOTTOM ANCHOR — kills shoulders / chest area cinematically */}
            <div
              className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.94) 0%, rgba(2,2,2,0.78) 18%, rgba(5,4,3,0.42) 45%, transparent 100%)'
              }}
            />

            {/* Cinematic vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 260px 80px rgba(0,0,0,0.55)' }}
            />

            {/* Subtle top fade for navbar readability over light sky */}
            <div
              className="absolute inset-x-0 top-0 h-32 sm:h-36 md:h-40 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)'
              }}
            />

            {/* Hairline accent at very top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

            {/* Content — centered safe-area, left-aligned within */}
            <div
              className="absolute inset-x-0 z-10"
              style={{
                bottom: 'clamp(56px, 12vh, 180px)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1'
              } as React.CSSProperties}
            >
              <div className="max-w-[1600px] mx-auto px-3 sm:px-5 md:px-8 lg:px-16">
              <div
                className="hero-content-wrap w-full sm:w-auto sm:max-w-[460px] md:max-w-[560px] lg:max-w-[680px] xl:max-w-[760px] 2xl:max-w-[820px]"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-7 md:mb-8"
                     style={{ opacity: Math.max(0, 0.9 - scrollY * 0.002) }}>
                  <div
                    className="h-px w-7 sm:w-9"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(214,168,62,0) 0%, rgba(214,168,62,0.6) 100%)'
                    }}
                  />
                  <span
                    className="hero-badge-text uppercase"
                    style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      color: '#D6A83E',
                      fontSize: 'clamp(0.6rem, 0.56rem + 0.12vw, 0.7rem)',
                      letterSpacing: '0.28em',
                      fontWeight: 600,
                      textShadow: '0 1px 8px rgba(0,0,0,0.45)'
                    }}
                  >
                    Bewusstseinsarbeit & Transformation
                  </span>
                  <div
                    className="h-px w-5 sm:w-7 hidden sm:block"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(214,168,62,0.5) 0%, rgba(214,168,62,0) 100%)'
                    }}
                  />
                </div>

                {/* Main heading */}
                <h1
                    className="hero-headline mb-5 sm:mb-6 md:mb-7"
                    style={{
                      fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1.875rem, 1rem + 2.6vw, 3.375rem)',
                      lineHeight: 1.06,
                      letterSpacing: '-0.04em',
                      color: '#F8F4EA',
                      textShadow:
                        '0 14px 44px rgba(0,0,0,0.62), 0 2px 14px rgba(0,0,0,0.45)',
                      fontFeatureSettings: '"kern" 1, "liga" 1, "ss01" 1',
                      opacity: Math.max(0, 1 - scrollY * 0.001)
                    } as React.CSSProperties}>
                  {hero.mainHeading
                    ? hero.mainHeading.split('\n').map((line: string, i: number, arr: string[]) => {
                        const gradientStyle = {
                          backgroundImage:
                            'linear-gradient(135deg, #FFF1B0 0%, #E8C36A 28%, #C99536 58%, #A77018 100%)',
                          WebkitBackgroundClip: 'text' as const,
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text' as const,
                          color: 'transparent',
                          filter:
                            'drop-shadow(0 8px 26px rgba(214,168,62,0.22)) drop-shadow(0 1px 2px rgba(0,0,0,0.35))',
                          letterSpacing: '-0.04em'
                        };
                        const isGoldLine = i === arr.length - 1;
                        return isGoldLine ? (
                          <span key={i} className="block" style={gradientStyle}>
                            <span className="block sm:whitespace-nowrap">{line}</span>
                          </span>
                        ) : (
                          <span key={i} className="block sm:whitespace-nowrap">
                            {line}
                            <br />
                          </span>
                        );
                      })
                    : null}
                </h1>

                {/* Subheading */}
                <p
                  className="hero-subline mb-6 sm:mb-7 md:mb-8"
                  style={{
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    color: 'rgba(248,244,234,0.74)',
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
                    lineHeight: 1.6,
                    letterSpacing: '-0.005em',
                    fontWeight: 300,
                    maxWidth: '480px',
                    textShadow: '0 2px 14px rgba(0,0,0,0.55)'
                  }}>
                  {(hero.subheading || 'Wenn dein Unternehmen wächst, aber Entscheidungen an Klarheit verlieren,\nliegt das Problem nicht im Außen – sondern in der Führung.')
                    .split('\n')
                    .map((line: string, i: number) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                </p>

                {/* Trust block */}
                <div
                  className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-nowrap sm:items-stretch sm:gap-x-5 md:gap-x-7 lg:gap-x-8 sm:gap-y-3 mb-7 sm:mb-8 md:mb-10"
                  style={{
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    textShadow: '0 1px 10px rgba(0,0,0,0.45)'
                  }}
                >
                  {[
                    { value: '15+' as const, label: 'Jahre Erfahrung', mobileOnly: false },
                    { value: '500+' as const, label: 'Transformationen', mobileOnly: false },
                    {
                      label: 'Führungskräfte & Unternehmer',
                      mobileOnly: true,
                      mark: true as const
                    },
                    { value: '1:1' as const, label: 'Präzisionsarbeit', mobileOnly: false }
                  ].map((item, i, arr) => {
                    const lastVisibleDesktopIndex = arr
                      .map((it, idx) => (!it.mobileOnly ? idx : -1))
                      .filter(idx => idx !== -1)
                      .pop();
                    const showDesktopDivider =
                      !item.mobileOnly && i !== lastVisibleDesktopIndex;
                    const labelStyle: CSSProperties = {
                      color: 'rgba(248,244,234,0.55)',
                      fontSize: 'clamp(0.55rem, 0.52rem + 0.13vw, 0.65rem)',
                      letterSpacing: '0.18em',
                      fontWeight: 500,
                      lineHeight: 1.35
                    };
                    return (
                      <div
                        key={i}
                        className={`flex items-stretch h-full ${item.mobileOnly ? 'sm:hidden' : ''}`}
                      >
                        <div className="flex flex-col flex-1 h-full min-w-0 leading-none text-center sm:text-left">
                          <div className="flex min-h-[2.75rem] sm:min-h-[3rem] shrink-0 items-center justify-center sm:justify-start">
                            {'mark' in item && item.mark ? (
                              <TrustExecutiveInsignia idSuffix={`hero-${i}`} size="hero" />
                            ) : (
                              <span
                                className="hero-trust-num"
                                style={{
                                  color: '#E6BE5A',
                                  fontSize: 'clamp(1rem, 0.88rem + 0.45vw, 1.3125rem)',
                                  fontWeight: 500,
                                  letterSpacing: '-0.022em',
                                  fontFeatureSettings: '"tnum" 1, "lnum" 1'
                                }}
                              >
                                {'value' in item ? item.value : null}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col justify-end pt-2 min-h-[2.85em]">
                            <span className="hero-trust-label uppercase">
                              <TrustLabel text={item.label} style={labelStyle} />
                            </span>
                          </div>
                        </div>
                        {showDesktopDivider && (
                          <span
                            aria-hidden="true"
                            className="hidden sm:block ml-6 md:ml-8 lg:ml-9 w-px self-stretch"
                            style={{
                              background:
                                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)'
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quote */}
                {hero.quote && (
                  <div className="mb-7 sm:mb-9">
                    <p
                       className="italic font-light"
                       style={{
                         fontFamily: "'Inter', -apple-system, sans-serif",
                         color: 'rgba(248,244,234,0.55)',
                         fontSize: 'clamp(0.9rem, 0.86rem + 0.2vw, 1rem)',
                         textShadow: '0 1px 8px rgba(0,0,0,0.3)'
                       }}>
                      „{hero.quote}"
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col items-start gap-5">
                  <button
                    className="hero-cta group inline-flex items-center justify-center w-full sm:w-auto whitespace-nowrap"
                    style={{
                      padding: 'clamp(14px, 1.4vw, 18px) clamp(22px, 3vw, 30px)',
                      borderRadius: '16px',
                      minHeight: 'clamp(52px, 6vw, 60px)',
                      color: '#1A1208',
                      fontFamily: "'Inter', -apple-system, sans-serif"
                    }}
                    onClick={() => {
                      window.location.hash = '#booking';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span
                      className="leading-none whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(0.875rem, 0.82rem + 0.25vw, 1.0625rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.012em',
                        textShadow: '0 1px 0 rgba(255,250,225,0.45)'
                      }}
                    >
                      {hero.ctaText || 'Strategisches Gespräch anfragen'}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[3px]"
                      style={{ width: 20, height: 20 }}
                    >
                      <ArrowRight
                        size={18}
                        strokeWidth={2.25}
                        color="#1A1208"
                      />
                    </span>
                  </button>

                  {/* Micro-trust under CTA — luxury label style */}
                  <div className="flex flex-col items-start gap-3 sm:gap-3.5 mt-1 pl-1">
                    {/* Hairline gold accent */}
                    <span
                      aria-hidden="true"
                      className="block"
                      style={{
                        width: 'clamp(36px, 6vw, 56px)',
                        height: '1px',
                        background:
                          'linear-gradient(90deg, rgba(225,184,79,0) 0%, rgba(225,184,79,0.65) 50%, rgba(225,184,79,0) 100%)',
                        boxShadow: '0 0 8px rgba(225,184,79,0.25)'
                      }}
                    />

                    <div
                      className="flex flex-wrap items-center gap-y-3"
                      style={{
                        fontFamily: "'Inter', -apple-system, sans-serif",
                        textShadow: '0 1px 8px rgba(0,0,0,0.5)'
                      }}
                    >
                      {['15 Minuten', 'vertraulich', 'klare Einordnung'].map(
                        (label, i, arr) => (
                          <div key={i} className="flex items-center">
                            <span
                              className="hero-microtrust-label uppercase"
                              style={{
                                color: 'rgba(248,244,234,0.7)',
                                fontSize: 'clamp(0.575rem, 0.54rem + 0.13vw, 0.7rem)',
                                fontWeight: 500,
                                letterSpacing: '0.22em',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {label}
                            </span>
                            {i < arr.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="hero-microtrust-divider mx-3 sm:mx-4 md:mx-5 inline-block"
                                style={{
                                  width: '1px',
                                  height: '12px',
                                  background:
                                    'linear-gradient(180deg, rgba(225,184,79,0) 0%, rgba(225,184,79,0.55) 50%, rgba(225,184,79,0) 100%)'
                                }}
                              />
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
          </div>
        </div>

      </section>

      {/* 2️⃣ TRUST + PROBLEM */}
      <section
        className="relative w-full"
        style={{ backgroundColor: colors.bg.primary }}
        data-section
        data-section-id="trust-problem"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-0 sm:pt-1 md:pt-2 pb-1 sm:pb-2 md:pb-2 lg:pb-3">

          {/* TRUST STRIP */}
          <div className="grid grid-cols-4 items-stretch">
            {[
              { value: '15+' as const, label: 'Jahre Erfahrung' },
              { value: '500+' as const, label: 'Transformationen' },
              { mark: true as const, label: 'Führungskräfte & Unternehmer' },
              { value: '1:1' as const, label: 'Präzisionsarbeit' }
            ].map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col h-full text-center py-10 sm:py-12 md:py-14 px-2"
              >
                {/* Refined vertical divider — fades at top/bottom for luxury feel */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      width: '1px',
                      height: '62%',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)'
                    }}
                  />
                )}

                <div className="flex flex-1 flex-col w-full min-h-0">
                  <div className="flex min-h-[clamp(3rem,11vw,4.75rem)] shrink-0 items-center justify-center">
                    {'mark' in item && item.mark ? (
                      <TrustExecutiveInsignia idSuffix={`strip-${i}`} size="strip" />
                    ) : (
                      <div
                        style={{
                          fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(2.125rem, 5.4vw, 4rem)',
                          background: 'linear-gradient(180deg, #FCE6A0 0%, #E6BE5A 38%, #D69D2C 72%, #A87E1F 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          color: 'transparent',
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                          filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.5)) drop-shadow(0 14px 30px rgba(214, 168, 62, 0.20))'
                        }}
                      >
                        {'value' in item ? item.value : null}
                      </div>
                    )}
                  </div>

                  {/* Hairline accent — luxe detail */}
                  <div
                    className="mt-4 sm:mt-5 shrink-0 flex justify-center"
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(225, 184, 79, 0.55) 50%, transparent 100%)'
                      }}
                    />
                  </div>

                  {/* Label — shared bottom alignment across columns */}
                  <div className="flex flex-1 flex-col justify-end pt-3 sm:pt-4 min-h-[3.5em]">
                    <div
                      className="uppercase flex items-end justify-center text-center w-full"
                      style={{
                        fontFamily: "'Inter', -apple-system, sans-serif",
                        fontSize: 'clamp(0.7rem, 1.05vw, 0.8125rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(255, 255, 255, 0.66)',
                        fontWeight: 500,
                        lineHeight: 1.35
                      }}
                    >
                      <TrustLabel text={item.label} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 80px gap */}
          <div className="h-20" />

          {/* PROBLEM BLOCK */}
          <div className="max-w-[680px] mx-auto text-center">
            <div className="relative mx-auto">
              <div
                aria-hidden="true"
                className="mx-auto"
                style={{
                  width: 'min(100px, 28%)',
                  height: '1px',
                  marginBottom: 'clamp(1.75rem, 3vw, 2.25rem)',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 25%, rgba(225,184,79,0.45) 50%, rgba(255,255,255,0.12) 75%, transparent 100%)'
                }}
              />
              <h2
                className="m-0 p-0"
                style={{
                  textRendering: 'geometricPrecision'
                }}
              >
                <span
                  className="block"
                  style={{
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 200,
                    fontSize: 'clamp(2.125rem, 5.2vw, 3.75rem)',
                    letterSpacing: '-0.034em',
                    lineHeight: 1.02,
                    background: 'linear-gradient(185deg, #FFFFFF 0%, #F2EDE4 38%, #C8BFB2 72%, rgba(160,148,138,0.92) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    filter:
                      'drop-shadow(0 1px 0 rgba(0, 0, 0, 0.62)) drop-shadow(0 -0.5px 0 rgba(255,255,255,0.06)) drop-shadow(0 22px 48px rgba(0, 0, 0, 0.35)) drop-shadow(0 12px 40px rgba(225, 184, 79, 0.05))'
                  }}
                >
                  Du funktionierst auf hohem Niveau.
                </span>
                <span
                  className="block mt-2 sm:mt-2.5"
                  style={{
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 350,
                    fontSize: 'clamp(1.875rem, 4.5vw, 3.125rem)',
                    letterSpacing: '-0.028em',
                    lineHeight: 1.08,
                    background: 'linear-gradient(178deg, #FFFCF7 0%, #EDE5D8 35%, #C4B5A2 78%, rgba(155,138,125,0.95) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    filter:
                      'drop-shadow(0 1.5px 0 rgba(0, 0, 0, 0.58)) drop-shadow(0 16px 36px rgba(0, 0, 0, 0.28)) drop-shadow(0 0 52px rgba(225, 184, 79, 0.07))'
                  }}
                >
                  Aber{' '}
                  <span
                    style={{
                      fontWeight: 450,
                      letterSpacing: '-0.032em',
                      background: 'linear-gradient(182deg, #FFF9E6 0%, #F0D78C 32%, #E1B84F 58%, #9A7224 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter:
                        'drop-shadow(0 1px 0 rgba(60, 40, 0, 0.35)) drop-shadow(0 8px 28px rgba(225, 184, 79, 0.18))'
                    }}
                  >
                    Klarheit
                  </span>{' '}
                  fehlt in entscheidenden Momenten.
                </span>
              </h2>
              <div
                aria-hidden="true"
                className="mx-auto"
                style={{
                  width: 'min(160px, 42%)',
                  height: '1px',
                  marginTop: 'clamp(1.75rem, 2.8vw, 2.35rem)',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(225,184,79,0.22) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)'
                }}
              />
            </div>

            <div
              className="mx-auto mt-6 md:mt-8 max-w-[580px]"
            >
              <div
                aria-hidden="true"
                className="mx-auto"
                style={{
                  width: 'min(220px, 55%)',
                  height: '1px',
                  marginBottom: 'clamp(1.25rem, 2vw, 1.5rem)',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(225,184,79,0.35) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)'
                }}
              />
              <p
                style={{
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  fontSize: 'clamp(1.0625rem, 1.45vw, 1.1875rem)',
                  lineHeight: 1.65,
                  fontWeight: 400,
                  fontFeatureSettings: '"ss01", "kern"',
                  letterSpacing: '0.02em',
                  margin: 0,
                  padding: '0 0.5rem',
                  background: 'linear-gradient(165deg, #FFFFFF 0%, #F8F4EC 42%, rgba(215,198,165,0.88) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter:
                    'drop-shadow(0 1px 0 rgba(0, 0, 0, 0.42)) drop-shadow(0 8px 24px rgba(225, 184, 79, 0.04))'
                }}
              >
                Im Außen läuft alles – doch intern entsteht Reibung.
              </p>
              <div
                aria-hidden="true"
                className="mx-auto"
                style={{
                  width: 'min(220px, 55%)',
                  height: '1px',
                  marginTop: 'clamp(1.25rem, 2vw, 1.5rem)',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(225,184,79,0.28) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)'
                }}
              />
            </div>

            <div
              className="mt-10 md:mt-12 mx-auto max-w-[520px] flex flex-col items-stretch text-center"
              role="presentation"
            >
              {[
                'Entscheidungen kosten unnötig Energie',
                'Wachstum bringt Unruhe statt Stabilität',
                'Du bist operativ stark, aber strategisch blockiert',
                'Klarheit fehlt – trotz Erfahrung'
              ].map((line, i, arr) => (
                <div key={line}>
                  <p
                    style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                      lineHeight: 1.55,
                      color: 'rgba(255, 255, 255, 0.78)',
                      fontWeight: 400,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.45)',
                      margin: 0,
                      letterSpacing: '0.01em'
                    }}
                  >
                    {line}
                  </p>
                  {i < arr.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="mx-auto"
                      style={{
                        height: '1px',
                        marginTop: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                        marginBottom: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                        maxWidth: 'min(280px, 72%)',
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 18%, rgba(225,184,79,0.28) 50%, rgba(255,255,255,0.08) 82%, transparent 100%)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Editorial closing — refined typographic frame */}
            <div
              className="mx-auto max-w-[520px]"
              style={{ marginTop: 'clamp(2.5rem, 3vw, 3.5rem)' }}
            >
              <div
                aria-hidden="true"
                className="mx-auto mb-8"
                style={{
                  width: 'min(280px, 78%)',
                  height: '1px',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 15%, rgba(225,184,79,0.22) 50%, rgba(255,255,255,0.07) 85%, transparent 100%)'
                }}
              />
              <p
                className="text-center px-4"
                style={{
                  fontFamily: "'SF Pro Display', 'Inter', -apple-system, sans-serif",
                  fontSize: 'clamp(0.68rem, 0.92vw, 0.8125rem)',
                  lineHeight: 1.75,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '0.14em',
                  margin: 0,
                  background: 'linear-gradient(182deg, rgba(248,246,238,0.88) 0%, rgba(200,178,138,0.65) 55%, rgba(225,184,79,0.55) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter:
                    'drop-shadow(0 1px 0 rgba(0, 0, 0, 0.55)) drop-shadow(0 6px 20px rgba(225, 184, 79, 0.07))'
                }}
              >
                Das Problem liegt nicht im Tun – sondern in der{' '}
                <span
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    background: 'linear-gradient(185deg, #FFF6D8 0%, #E1B84F 45%, #B8923A 85%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    paddingBottom: '0.06em'
                  }}
                >
                  Führung
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ VOM REAGIEREN ZUM GESTALTEN */}
      <section
        className="relative w-full"
        style={{ backgroundColor: colors.bg.primary }}
        data-section
        data-section-id="respond-to-shape"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-2 sm:pt-3 md:pt-3 lg:pt-4 pb-10 sm:pb-12 md:pb-14 lg:pb-16">
          <div className="w-full flex flex-col items-center">
            <div
              aria-hidden="true"
              style={{
                width: 'min(120px, 32%)',
                height: '1px',
                marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 22%, rgba(225,184,79,0.42) 50%, rgba(255,255,255,0.1) 78%, transparent 100%)'
              }}
            />
            <h2
              className="m-0 px-3 text-center"
              style={{
                maxWidth: '720px',
                width: '100%',
                textRendering: 'geometricPrecision',
                lineHeight: 1.12
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 250,
                  fontSize: 'clamp(2rem, 4.35vw, 3.375rem)',
                  letterSpacing: '-0.032em',
                  background: 'linear-gradient(183deg, #FFFFFF 0%, #EDE8DD 42%, rgba(185,173,158,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter:
                    'drop-shadow(0 1px 0 rgba(0, 0, 0, 0.62)) drop-shadow(0 -0.5px 0 rgba(255,255,255,0.05)) drop-shadow(0 20px 44px rgba(0, 0, 0, 0.32)) drop-shadow(0 10px 36px rgba(225, 184, 79, 0.06))'
                }}
              >
                Vom Reagieren zur{' '}
              </span>
              <span
                style={{
                  fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 450,
                  fontSize: 'clamp(2rem, 4.35vw, 3.375rem)',
                  letterSpacing: '-0.036em',
                  background: 'linear-gradient(178deg, #FFFBE8 0%, #F0D076 38%, #E1B84F 58%, #8A6820 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter:
                    'drop-shadow(0 1.5px 0 rgba(40, 28, 0, 0.42)) drop-shadow(0 8px 32px rgba(225, 184, 79, 0.22)) drop-shadow(0 0 48px rgba(225, 184, 79, 0.08))'
                }}
              >
                klaren Führung
              </span>
              <span
                style={{
                  fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 250,
                  fontSize: 'clamp(2rem, 4.35vw, 3.375rem)',
                  letterSpacing: '-0.032em',
                  background: 'linear-gradient(183deg, #FFFFFF 0%, #EDE8DD 42%, rgba(185,173,158,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter:
                    'drop-shadow(0 1px 0 rgba(0, 0, 0, 0.62)) drop-shadow(0 20px 44px rgba(0, 0, 0, 0.32))'
                }}
              >
                .
              </span>
            </h2>
            <div
              aria-hidden="true"
              style={{
                width: 'min(200px, 52%)',
                height: '1px',
                marginTop: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 28%, rgba(225,184,79,0.2) 50%, rgba(255,255,255,0.05) 72%, transparent 100%)'
              }}
            />
            <p
              className="mx-auto px-6 text-center m-0"
              style={{
                maxWidth: '520px',
                marginTop: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: 'clamp(0.98rem, 2vw, 1.125rem)',
                fontWeight: 400,
                lineHeight: 1.55,
                letterSpacing: '0.01em',
                color: 'rgba(248,244,234,0.72)',
                textShadow: '0 1px 12px rgba(0,0,0,0.45)'
              }}
            >
              Was sich verändert, wenn Klarheit entsteht.
            </p>
          </div>

          <div
            className="relative mx-auto mt-[clamp(3rem,5vw,4.25rem)] md:mt-20 px-5 sm:px-10"
            style={{ maxWidth: 'min(620px, 100%)' }}
          >
            <div className="relative z-[1]">
              {TRANSFORM_ROWS.slice(0, 3).map((row, i) => (
                <div key={`tf-top-${row.from}-${i}`}>
                  <div className="group/tr rounded-[14px] px-2 py-5 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_32px_-14px_rgba(0,0,0,0.48)] sm:px-3 sm:py-6 md:py-[1.65rem]">
                    <div
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-3 md:gap-x-4"
                      style={{ minHeight: '3.15rem' }}
                    >
                      <span
                        aria-hidden="true"
                        className="w-8 shrink-0 justify-self-start text-left tabular-nums sm:w-9"
                        style={{
                          fontFamily: "'Inter', -apple-system, sans-serif",
                          fontSize: '0.5625rem',
                          fontWeight: 500,
                          letterSpacing: '0.22em',
                          color: 'rgba(225, 184, 79, 0.32)'
                        }}
                      >
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontFamily:
                            "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: 'clamp(0.94rem, 2vw, 1.105rem)',
                          fontWeight: 300,
                          letterSpacing: '-0.022em',
                          background:
                            'linear-gradient(178deg, rgba(245,243,239,0.85) 0%, rgba(175,164,154,0.72) 55%, rgba(120,112,106,0.82) 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))'
                        }}
                      >
                        {row.from}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 select-none justify-self-center text-[rgba(148,146,138,0.55)] opacity-55"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 'clamp(0.62rem, 1.05vw, 0.74rem)',
                          fontWeight: 400
                        }}
                      >
                        →
                      </span>
                      <span
                        className="text-left"
                        style={{
                          fontFamily:
                            "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: 'clamp(0.94rem, 2vw, 1.105rem)',
                          fontWeight: 450,
                          letterSpacing: '-0.02em',
                          background:
                            'linear-gradient(178deg, #FFF8E4 0%, #F0D278 35%, #E1B84F 55%, #8E6520 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 1px 0 rgba(40, 28, 0, 0.28))'
                        }}
                      >
                        {row.to}
                      </span>
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      aria-hidden="true"
                      className="mx-auto my-[0.625rem]"
                      style={{
                        height: '1px',
                        marginLeft: '1.875rem',
                        maxWidth: 'calc(100% - 1.875rem)',
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 14%, rgba(225,184,79,0.1) 50%, rgba(255,255,255,0.04) 86%, transparent 100%)'
                      }}
                    />
                  )}
                </div>
              ))}

              {!transformExpanded && (
                <div
                  role="presentation"
                  tabIndex={-1}
                  onMouseEnter={() => setTransformPeek(true)}
                  onMouseLeave={() => setTransformPeek(false)}
                  className={`mx-auto mb-3 flex cursor-default justify-center rounded-lg border px-6 py-[0.875rem] transition-colors duration-300 md:py-4 ${transformPeek ? 'border-white/[0.08] bg-white/[0.03]' : 'border-transparent'}`}
                >
                  <span className="text-[10px] font-light uppercase tracking-[0.55em] text-white/35">
                    Mehr
                  </span>
                </div>
              )}

              {(transformExpanded || transformPeek) &&
                TRANSFORM_ROWS.slice(3).map((row, i) => (
                  <div key={`tf-bot-${row.from}-${i}`}>
                    <div className="group/tr rounded-[14px] px-2 py-5 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_32px_-14px_rgba(0,0,0,0.48)] sm:px-3 sm:py-6 md:py-[1.65rem]">
                      <div
                        className="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-3 md:gap-x-4"
                        style={{ minHeight: '3.15rem' }}
                      >
                        <span
                          aria-hidden="true"
                          className="w-8 shrink-0 justify-self-start text-left tabular-nums sm:w-9"
                          style={{
                            fontFamily: "'Inter', -apple-system, sans-serif",
                            fontSize: '0.5625rem',
                            fontWeight: 500,
                            letterSpacing: '0.22em',
                            color: 'rgba(225, 184, 79, 0.32)'
                          }}
                        >
                          {(i + 4).toString().padStart(2, '0')}
                        </span>
                        <span
                          className="text-right"
                          style={{
                            fontFamily:
                              "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontSize: 'clamp(0.94rem, 2vw, 1.105rem)',
                            fontWeight: 300,
                            letterSpacing: '-0.022em',
                            background:
                              'linear-gradient(178deg, rgba(245,243,239,0.85) 0%, rgba(175,164,154,0.72) 55%, rgba(120,112,106,0.82) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))'
                          }}
                        >
                          {row.from}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 select-none justify-self-center text-[rgba(148,146,138,0.55)] opacity-55"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 'clamp(0.62rem, 1.05vw, 0.74rem)',
                            fontWeight: 400
                          }}
                        >
                          →
                        </span>
                        <span
                          className="text-left"
                          style={{
                            fontFamily:
                              "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontSize: 'clamp(0.94rem, 2vw, 1.105rem)',
                            fontWeight: 450,
                            letterSpacing: '-0.02em',
                            background:
                              'linear-gradient(178deg, #FFF8E4 0%, #F0D278 35%, #E1B84F 55%, #8E6520 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 1px 0 rgba(40, 28, 0, 0.28))'
                          }}
                        >
                          {row.to}
                        </span>
                      </div>
                    </div>
                    {i < 2 && (
                      <div
                        aria-hidden="true"
                        className="mx-auto my-[0.625rem]"
                        style={{
                          height: '1px',
                          marginLeft: '1.875rem',
                          maxWidth: 'calc(100% - 1.875rem)',
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 14%, rgba(225,184,79,0.1) 50%, rgba(255,255,255,0.04) 86%, transparent 100%)'
                        }}
                      />
                    )}
                  </div>
                ))}

              {!transformExpanded && (
                <div className="flex flex-col items-center gap-6 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTransformExpanded(true);
                      setTransformPeek(false);
                    }}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/41 transition-colors duration-300 hover:text-white/68"
                  >
                    Alle Schichten dauerhaft einblenden
                  </button>
                </div>
              )}
              {transformExpanded && (
                <div className="flex justify-center pt-5">
                  <button
                    type="button"
                    onClick={() => setTransformExpanded(false)}
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/37 transition-colors duration-300 hover:text-white/60"
                  >
                    Weniger anzeigen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
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


      {/* Deep Dive — Lebensbereiche (Fusion: Themen • Reise • Zielgruppe) */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{ backgroundColor: colors.bg.primary }}
        data-section
        data-section-id="deep-dive"
      >
        <style>{`
          @keyframes deepDiveFade {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .deep-dive-pane { animation: deepDiveFade 0.52s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        `}</style>
        <div className="relative z-[1] mx-auto max-w-[min(1320px,100%)] px-6 sm:px-8 lg:px-12">
          <div className="mb-11 flex flex-col gap-10 md:mb-14 lg:flex-row lg:items-start lg:justify-between lg:gap-x-14">
            <div className="max-w-[min(700px,100%)]">
              <h2
                className="m-0 font-black tracking-tight text-white"
                style={{
                  fontFamily: "'SF Pro Display', 'Inter', sans-serif",
                  fontSize: 'clamp(2.25rem, 4.8vw, 3.65rem)',
                  lineHeight: 1.09,
                  fontWeight: 800
                }}
              >
                <span className="bg-gradient-to-br from-[#fffefb] via-[#fcd982] to-[#b8842a] bg-clip-text text-transparent">
                  {themes?.heading || 'Ebene für Ebene. Ein System.'}
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-[0.975rem] leading-[1.72] text-white/62 md:text-[1.0625rem] md:leading-[1.74]">
                {themes?.subheading ||
                  'Wechsle zwischen Lebensbereichen — ohne Seitenwechsel und ohne zusätzliche Scroll-Strecke. Ein Fokus, eine Tiefe pro Moment.'}
              </p>
            </div>

            <nav
              role="tablist"
              aria-label="Lebensbereiche"
              className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-[min(380px,100%)] lg:flex-col xl:w-[400px]"
            >
              {DEEP_DIVE_PANELS.map((pane, idx) => {
                const active = deepDiveTab === idx;
                return (
                  <button
                    key={pane.label}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    id={`deep-dive-tab-${idx}`}
                    onClick={() => setDeepDiveTab(idx)}
                    className="rounded-xl px-[1.125rem] py-[0.625rem] text-left text-[0.8125rem] font-medium tracking-[0.04em] transition-all duration-300 hover:bg-white/[0.07] md:text-[0.845rem]"
                    style={{
                      background: active ? 'rgba(251,191,36,0.085)' : 'rgba(255,255,255,0.038)',
                      border: active ? '1px solid rgba(225,184,79,0.38)' : '1px solid rgba(255,255,255,0.09)',
                      color: active ? 'rgba(255,252,238,0.94)' : 'rgba(240,236,228,0.58)',
                      boxShadow: active
                        ? '0 0 32px -10px rgba(225,184,79,0.42), inset 0 1px 0 rgba(255,248,225,0.07)'
                        : undefined
                    }}
                  >
                    {pane.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div key={deepDiveTab} className="deep-dive-pane">
            <div className="mx-auto max-w-[min(720px,100%)] px-0 pt-4">
              <div className="flex flex-col space-y-8">
                <p className="m-0 text-[1rem] leading-[1.78] text-white/[0.76] md:text-[1.055rem]">
                  {deepPane.description}
                </p>
                <p
                  className="m-0 border-l border-[rgba(225,184,79,0.38)] pl-5 text-[0.95rem] font-light leading-[1.68] text-[rgba(236,230,214,0.72)] md:text-[1.02rem]"
                  style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}
                >
                  {deepPane.insight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 SEKTION 3 – LEHRERBILD & USP - ULTIMATE PREMIUM */}
      <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: colors.bg.primary }} data-section data-section-id="teacher-usp">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-amber-500/[0.05] via-yellow-500/[0.04] to-orange-500/[0.05] rounded-full blur-[220px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/[0.02] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Methoden-Zweispalter — Editorial (Bild ohne Card-Chrome) */}
          <div className="mb-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-x-14 xl:gap-x-16">
            {/* LEFT — freistehend */}
            <div className="relative w-full lg:mt-[clamp(2rem,4vw,3.5rem)] lg:max-w-[min(560px,45vw)]">
              <div className="relative">
                <img
                  src="/bildschirmfoto_2026-01-09_um_18.51.39.png"
                  alt="Anatoly Mook"
                  className="block h-auto w-full max-h-[min(88vh,640px)] object-cover object-[30%_15%] sm:object-[40%_15%] lg:object-[center_18%]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 95% 72% at 50% 100%, rgba(0,0,0,0.84) 0%, transparent 52%), radial-gradient(ellipse 72% 90% at 0% 50%, rgba(0,0,0,0.44) 0%, transparent 55%), radial-gradient(ellipse 72% 90% at 100% 50%, rgba(0,0,0,0.44) 0%, transparent 55%), radial-gradient(circle at 50% 18%, transparent 42%, rgba(0,0,0,0.14) 100%)'
                  }}
                />
              </div>
            </div>

            {/* RIGHT — Text */}
            <div className="flex min-w-0 w-full flex-col lg:max-w-[min(680px,100%)]">
              <div className="flex flex-col space-y-7 md:space-y-9">
                <h2
                  className="m-0 font-black tracking-tight text-white"
                  style={{
                    fontSize:
                      'clamp(2.5rem, 1.85rem + 2.85vw, 4rem)',
                    lineHeight: 1.14,
                    textShadow: '0 4px 40px rgba(251,191,36,0.22)'
                  }}
                >
                  <span className="inline-block bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Präzision trifft Tiefe
                  </span>
                </h2>
                <p
                  className="m-0 text-xl leading-[1.58] text-white/85 font-light sm:text-[1.35rem]"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  Klarheit für Führung, Entscheidungen und Wachstum.
                </p>
                <p className="m-0 text-base leading-[1.75] text-white/70 sm:text-[1.0625rem]">
                  Echte Klarheit entsteht nicht durch mehr Informationen,
                  {' '}sondern durch präzise Wahrnehmung und klare Führung.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-11 sm:grid-cols-3 sm:gap-7 lg:gap-8">
                {[
                  { icon: <Brain className="h-4 w-4" strokeWidth={2} />, title: 'Klarheit', line: 'Entscheidungen treffen, die tragen', gradient: 'from-yellow-400 to-yellow-500' },
                  { icon: <Shield className="h-4 w-4" strokeWidth={2} />, title: 'Führung', line: 'Stabilität im Unternehmen schaffen', gradient: 'from-amber-400 to-amber-500' },
                  { icon: <Target className="h-4 w-4" strokeWidth={2} />, title: 'Fokus', line: 'Energie gezielt einsetzen', gradient: 'from-orange-400 to-orange-500' }
                ].map((item, i) => (
                  <div key={`methode-${i}`} className="group relative">
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-[0.04]`}
                    />
                    <div
                      className="relative rounded-2xl px-3 py-4 text-center backdrop-blur-[2px] transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-[1px] group-hover:scale-[1.02]"
                      style={{
                        background: 'rgba(251,191,36,0.06)',
                        border: '1px solid rgba(251,191,36,0.18)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.22)'
                      }}
                    >
                      <div
                        className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          boxShadow: '0 2px 8px rgba(251,191,36,0.18)'
                        }}
                      >
                        {item.icon}
                      </div>
                      <h4 className="mb-1 text-[11px] font-black tracking-tight text-white">{item.title}</h4>
                      <p className="m-0 text-[10px] leading-snug text-white/55">
                        <span aria-hidden="true" className="text-white/30">
                          →{' '}
                        </span>
                        {item.line}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-start gap-1.5 md:mt-12">
                <button
                  type="button"
                  onClick={() => {
                    const bookingSection = document.querySelector('[data-section="booking"]');
                    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold text-[#1a1407] transition-transform duration-300 hover:-translate-y-px active:translate-y-0"
                  style={{
                    background: 'linear-gradient(180deg, #f5c542 0%, #e3b138 100%)',
                    boxShadow:
                      '0 4px 14px rgba(212,164,56,0.26), inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 2px rgba(0,0,0,0.10)',
                    letterSpacing: '-0.005em'
                  }}
                >
                  <span>Strategisches Gespräch anfragen</span>
                  <ArrowRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.5} />
                </button>
                <p
                  className="m-0 pl-0.5 text-[10px] font-light leading-relaxed tracking-[0.05em]"
                  style={{ color: 'rgba(255,255,255,0.36)' }}
                >
                  Konkrete Einordnung deiner Situation.
                </p>
              </div>
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
            <p className="text-lg sm:text-xl font-medium text-white/90 mb-5">
              Vertrauen als Fundament für den gemeinsamen Weg
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-section="booking"]');
                  if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#1a1407] transition-transform duration-300 hover:-translate-y-[1px]"
                style={{
                  background: 'linear-gradient(180deg, #f5c542 0%, #e3b138 100%)',
                  boxShadow: '0 4px 14px rgba(212,164,56,0.28), inset 0 1px 0 rgba(255,255,255,0.35)'
                }}
              >
                <Calendar className="w-4 h-4" strokeWidth={2.2} />
                Erstgespräch vereinbaren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.2} />
              </button>
              <button
                onClick={() => {
                  const seminarsSection = document.querySelector('[data-section="seminars"]');
                  if (seminarsSection) seminarsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/[0.10] hover:-translate-y-[1px]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                <Book className="w-4 h-4 text-white/70" strokeWidth={2.2} />
                Formate entdecken
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" strokeWidth={2.2} />
              </button>
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
