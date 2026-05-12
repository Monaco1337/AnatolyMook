import { useState, useEffect, useMemo, useRef, useId, type CSSProperties, type ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles, Award, Users, Star, TrendingUp, Check, Target, Brain, Heart, Shield, Play, Calendar, Zap, Book, ChevronLeft, ChevronRight, Plus, Minus, AlertCircle, Eye, Repeat, Crown, TrendingDown, Waves, Puzzle, Pause, X, Compass, Lightbulb, Cog, MousePointerClick, Activity, Diamond } from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useLanguage } from '../contexts/LanguageContext';
import PremiumSlider from '../components/PremiumSlider';
import NewsSlider from '../components/NewsSlider';
import NewsDetailModal from '../components/NewsDetailModal';
import EventDetailModal from '../components/EventDetailModal';
import { supabase } from '../lib/supabase';
import { HERO_PORTRAIT } from '../constants/brandAssets';

const iconMap: Record<string, any> = {
  Calendar, Zap, Book, Sparkles, Target, Brain, Heart, Shield,
  Award, Users, Star, TrendingUp
};

/** Mobil: „… in Entscheidungen.“ → zwei Zeilen („… in“ / „Entscheidungen.“) für 3-Zeilen-Oberteil */
function splitHeadlineInEntscheidungenMobile(zweiteZeile: string): [string, string] | null {
  const t = zweiteZeile.trim();
  const m = t.match(/^(.+?)\s+in\s+(Entscheidungen\.?)$/i);
  if (!m) return null;
  const tail = m[2].endsWith('.') ? m[2] : `${m[2]}.`;
  return [`${m[1].trim()} in`, tail];
}

const DEEP_DIVE_PANELS: {
  label: string;
  description: string;
  insight: string;
}[] = [
  {
    label: 'Gesundheit & Vitalität',
    description:
      'Keine zusätzliche Intensität im Kalender — sondern ein Rhythmus, der zu Rolle und Tempo passt.',
    insight: 'Schwerpunkt: Stabilität vor Maximierung.'
  },
  {
    label: 'Beziehung & Liebe',
    description:
      'Nähe funktioniert, wenn Klarheit vor Erwartung kommt — im Gespräch wie in der Bindung.',
    insight: 'Schwerpunkt: Präsenz statt Dynamik aus Erwartung.'
  },
  {
    label: 'Beruf / Berufung',
    description:
      'Wenn Druck, Reichweite und Tempo gleichzeitig steigen, braucht es eine innere Linie.',
    insight: 'Schwerpunkt: Richtung ohne Zerrissenheit.'
  },
  {
    label: 'Geld & Erfolg',
    description:
      'Tragfähiger Erfolg entsteht weniger aus Kompensation als aus sauberer Priorität.',
    insight: 'Schwerpunkt: Souveränität im Umgang mit Knappheit.'
  },
  {
    label: 'Erfüllung',
    description:
      'Sinn ist hier keine Floskel — sondern Übereinstimmung zwischen Wahrnehmen, Wählen und Tun.',
    insight: 'Schwerpunkt: Reduktion auf das Wesentliche.'
  }
];

/** Nach Hero: Transformationsebenen (editorieller Block, keine Feature-Karten) */
const HOME_TRUST_WIRK_PILLARS: { title: string; icon: 'brain' | 'compass' | 'bulb-cog' | 'pointer' }[] = [
  { icon: 'brain', title: 'Ordnung & Präsenz' },
  { icon: 'compass', title: 'Ausrichtung & Führung' },
  { icon: 'bulb-cog', title: 'Klarheit im Entscheiden' },
  { icon: 'pointer', title: 'Wirkung im Alltag' }
];

/** Supabase kann ohne Timeout blockieren → Startseite bleibt sonst im Loading-State (schwarzer Vollbild-Hintergrund). */
const HOME_FETCH_TIMEOUT_MS = 15000;

/** Homepage: Überschriften — Montserrat */
const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
/** Homepage: Fließtext — Avenir Next (Systemstack auf macOS/iOS, sensible Fallbacks) */
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const HOME_TEXT_CLEAR = '#F4F4F4';

const TRANSFORM_ROWS: { from: string; to: string }[] = [
  { from: 'Reaktiv', to: 'Klar in Entscheidungen' },
  { from: 'Getrieben', to: 'Souverän in Führung' },
  { from: 'Unruhig', to: 'Stabil unter Druck' },
  { from: 'Zerrissen', to: 'Fokussiert im Handeln' },
  { from: 'Zweifelnd', to: 'Handlungsklar' },
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
          <stop offset="0%" stopColor="#E6C18A" />
          <stop offset="42%" stopColor="#D6A85E" />
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

function HomeTrustWirkIconFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex size-[3.125rem] shrink-0 items-center justify-center sm:size-[3.375rem] rounded-[12px] border sm:rounded-[14px]"
      style={{
        borderColor: 'rgba(230, 193, 138, 0.18)',
        background:
          'linear-gradient(158deg, rgba(230, 193, 138, 0.16) 0%, rgba(42, 34, 26, 0.62) 38%, rgba(6, 5, 4, 0.94) 100%)',
        boxShadow:
          '0 0 36px -10px rgba(185, 130, 63, 0.42), inset 0 1px 0 rgba(255, 248, 238, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.38)'
      }}
      aria-hidden
    >
      <span
        className="pointer-events-none absolute inset-px rounded-[11px] opacity-[0.5] sm:rounded-[13px]"
        style={{
          background:
            'linear-gradient(118deg, rgba(255, 250, 242, 0.07) 0%, transparent 52%)'
        }}
      />
      <span className="relative z-[1] [&_svg]:drop-shadow-[0_2px_12px_rgba(185,130,63,0.38)]">{children}</span>
    </div>
  );
}

function HomeTrustWirkIcon({
  kind,
  gradId
}: {
  kind: 'brain' | 'compass' | 'bulb-cog' | 'pointer';
  gradId: string;
}) {
  const strokeUrl = `url(#${gradId})`;
  const strokeW = 1.55;
  const iconClass = 'shrink-0';
  const sz = 34;

  let inner: ReactNode;
  if (kind === 'brain') {
    inner = <Brain size={sz} className={iconClass} stroke={strokeUrl} strokeWidth={strokeW} fill="none" />;
  } else if (kind === 'compass') {
    inner = <Compass size={sz} className={iconClass} stroke={strokeUrl} strokeWidth={strokeW} fill="none" />;
  } else if (kind === 'bulb-cog') {
    inner = (
      <div className="relative flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
        <Lightbulb
          size={sz}
          className="opacity-[0.97]"
          stroke={strokeUrl}
          strokeWidth={strokeW}
          fill="none"
        />
        <Cog
          size={15}
          className="pointer-events-none absolute bottom-0 right-0 sm:bottom-px sm:right-px"
          stroke={strokeUrl}
          strokeWidth={strokeW}
          fill="none"
        />
      </div>
    );
  } else {
    inner = <MousePointerClick size={sz} className={iconClass} stroke={strokeUrl} strokeWidth={strokeW} fill="none" />;
  }

  return <HomeTrustWirkIconFrame>{inner}</HomeTrustWirkIconFrame>;
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
  const navigate = useNavigate();
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
  const [expandedClarityAreaId, setExpandedClarityAreaId] = useState<string | null>(null);
  const trustWirkStrokeGradId = useId();

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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error(`Home content fetch timed out after ${HOME_FETCH_TIMEOUT_MS}ms`)),
        HOME_FETCH_TIMEOUT_MS
      );
    });
    try {
      const [contentRes, eventsRes, newsRes] = await Promise.race([
        Promise.all([
          supabase.from('home_content').select('*').eq('is_active', true),
          supabase.from('home_events').select('*').order('display_order'),
          supabase.from('news_articles').select('*').eq('published', true).eq('featured', true).order('published_at', { ascending: false }).limit(6)
        ]),
        timeoutPromise
      ]);
      if (timeoutId) clearTimeout(timeoutId);

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
      if (timeoutId) clearTimeout(timeoutId);
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

  const woKlarheitAreas = useMemo(
    () =>
      [
        {
          id: 'health',
          title: t.consciousness.healthVitality.title,
          points: t.consciousness.healthVitality.points as string[]
        },
        {
          id: 'relationship',
          title: t.consciousness.relationshipLove.title,
          points: t.consciousness.relationshipLove.points as string[]
        },
        {
          id: 'vocation',
          title: 'Berufung',
          points: t.consciousness.vocationCalling.points as string[]
        },
        {
          id: 'success',
          title: 'Erfolg',
          points: t.consciousness.moneySuccess.points as string[]
        },
        {
          id: 'fulfillment',
          title: 'Erfüllung',
          points: t.consciousness.fulfillmentBliss.points as string[]
        }
      ] as const,
    [t]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bg.primary }}>
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full animate-spin mx-auto mb-4 border-solid border-4 border-t-transparent"
            style={{ borderColor: colors.accent.primary, borderTopColor: 'transparent' }}
            aria-hidden
          />
          <p className={text.tertiary} style={{ color: colors.text.secondary }}>{t.common.loadingContent}</p>
        </div>
      </div>
    );
  }

  const hero = {
    ...(content.hero || {}),
    ...{
      mainHeading:
        'Klarheit im Denken.\nRuhe in Entscheidungen.\nFührung, die trägt.',
      subheading:
        'Wenn Tempo die Linie verwischt, liegt der nächste Hebel selten im Markt — sondern in der Ruhe Ihrer Führung.',
      ctaText: 'Erstgespräch vereinbaren'
    }
  };
  const themes = content.themes || {};
  const servicesIntro = content.services_intro || {};
  const servicesTestimonials = content.services_testimonials || {};
  const servicesProcess = content.services_process || {};
  const anchor = content.anchor || {};
  const eventsHeader = content.events_header || {
    heading: 'Aktuell',
    highlight: '',
    subline: '',
    linkText: 'Alle Formate',
    linkTarget: '#buchen'
  };

  const deepPane = DEEP_DIVE_PANELS[deepDiveTab];

  return (
    <div className="home-scroll-flow" style={{ backgroundColor: colors.bg.primary }}>
      {/* 1️⃣ HERO */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#000', height: '100svh', minHeight: '100vh' }} data-section>
        <div className="relative w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            {/* Hero scoped premium styles */}
            <style>{`
              /* Bronze-CTA: premium-system.css (Radius wie Nav „Termin buchen“) */

              /* Hero-Typo — Bronze / Champagne (high-end, konsistent mit CTA) */
              .hero-badge-text {
                background-image: linear-gradient(
                  135deg,
                  rgba(255, 248, 238, 0.98) 0%,
                  #E6C18A 38%,
                  #B9823F 58%,
                  #D6A85E 100%
                );
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent !important;
                font-family: 'Montserrat', system-ui, sans-serif !important;
                filter: drop-shadow(0 1px 10px rgba(0, 0, 0, 0.5))
                  drop-shadow(0 0 14px rgba(185, 130, 63, 0.22));
              }
              .hero-subline {
                color: rgba(234, 221, 203, 0.9) !important;
                font-weight: 400 !important;
                text-shadow:
                  0 2px 18px rgba(0, 0, 0, 0.55),
                  0 0 32px rgba(185, 130, 63, 0.08) !important;
              }
              .hero-quote {
                color: rgba(234, 221, 203, 0.72) !important;
                text-shadow:
                  0 1px 14px rgba(0, 0, 0, 0.45),
                  0 0 24px rgba(185, 130, 63, 0.1) !important;
              }
              .hero-microtrust-label {
                background-image: linear-gradient(
                  135deg,
                  rgba(255, 250, 242, 0.96) 0%,
                  #E6C18A 34%,
                  #C99552 52%,
                  #E6C18A 78%,
                  rgba(244, 239, 231, 0.92) 100%
                );
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent !important;
                font-weight: 600 !important;
                font-family: 'Montserrat', system-ui, sans-serif !important;
                filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.55))
                  drop-shadow(0 0 16px rgba(185, 130, 63, 0.2));
              }

              .hero-headline,
              .hero-headline .hero-headline-line {
                font-family: 'Montserrat', system-ui, sans-serif !important;
              }
              .hero-subline,
              .hero-quote,
              .hero-trust-label {
                font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
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

              /* MOBILE — editorial rhythm: Luft zwischen Zeilen, Block nicht „klebend“ */
              @media (max-width: 640px) {
                .hero-headline {
                  font-size: clamp(1.15rem, 5vw, 1.55rem) !important;
                  line-height: 1.26 !important;
                  letter-spacing: -0.026em !important;
                  text-shadow: 0 8px 28px rgba(0,0,0,0.78), 0 2px 10px rgba(0,0,0,0.55) !important;
                }
                .hero-headline .hero-headline-line:not(:last-child) {
                  margin-bottom: 0.42rem !important;
                }
                .hero-headline .hero-headline-line:last-child {
                  margin-bottom: 0 !important;
                }
                .hero-subline {
                  font-size: 0.8125rem !important;
                  line-height: 1.68 !important;
                  max-width: 86% !important;
                  margin-top: 0.125rem !important;
                  color: rgba(234, 221, 203, 0.88) !important;
                  text-shadow:
                    0 2px 14px rgba(0, 0, 0, 0.68),
                    0 0 26px rgba(185, 130, 63, 0.07) !important;
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
                  margin-left: 0.375rem !important;
                  margin-right: 0.375rem !important;
                }
                .hero-microtrust-inline-mobile {
                  flex-wrap: nowrap !important;
                  justify-content: flex-start !important;
                }
                .hero-microtrust-inline-mobile .hero-microtrust-label {
                  font-size: clamp(0.42rem, 0.36rem + 0.95vw, 0.52rem) !important;
                  letter-spacing: 0.08em !important;
                }
                .hero-microtrust-inline-mobile .hero-microtrust-divider {
                  height: 9px !important;
                  margin-left: 0.2rem !important;
                  margin-right: 0.2rem !important;
                }
              /* Mobil: Text nur oben/links — rechts bleibt „Safe Zone“ fürs Gesicht */
              .hero-content-wrap {
                width: min(100%, 17.75rem) !important;
                max-width: min(100%, 17.75rem) !important;
                padding-right: 0 !important;
              }
              .hero-portrait-img {
                transform: none !important;
                transition: none !important;
              }
              /* Content-Rahmen: Mobil weiter unten + seitlicher Luft nach innen */
              .hero-content-shell {
                bottom: auto !important;
                top: 0 !important;
                padding-top: max(8.75rem, calc(env(safe-area-inset-top, 0px) + 6.75rem)) !important;
                padding-bottom: 1.75rem !important;
                padding-left: max(0px, env(safe-area-inset-left, 0px)) !important;
                padding-right: max(0px, env(safe-area-inset-right, 0px)) !important;
              }
            }
              @media (min-width: 640px) {
                .hero-content-shell {
                  top: auto !important;
                  bottom: clamp(56px, 12vh, 180px) !important;
                  padding-top: 0 !important;
                  padding-bottom: 0 !important;
                }
              }
              /* Tablet — gleiches editorial spacing wie Mobil+, aber skaliert mit Viewport */
              @media (min-width: 641px) and (max-width: 1023px) {
                .hero-headline {
                  line-height: 1.14 !important;
                  letter-spacing: -0.032em !important;
                }
                .hero-headline .hero-headline-line:not(:last-child) {
                  margin-bottom: 0.2rem !important;
                }
                .hero-headline .hero-headline-line:last-child {
                  margin-bottom: 0 !important;
                }
                .hero-subline {
                  line-height: 1.64 !important;
                }
              }
              @media (max-width: 380px) {
                .hero-headline {
                  font-size: clamp(1.05rem, 4.6vw, 1.4rem) !important;
                  line-height: 1.24 !important;
                }
                .hero-headline .hero-headline-line:not(:last-child) {
                  margin-bottom: 0.38rem !important;
                }
                .hero-subline {
                  font-size: 0.75rem !important;
                }
                .hero-content-wrap {
                  width: min(100%, 16.25rem) !important;
                  max-width: min(100%, 16.25rem) !important;
                }
              }
            `}</style>

            <picture className="absolute inset-0 z-0 block h-full w-full">
              <img
                src={`${HERO_PORTRAIT.pathBase}.png`}
                width={HERO_PORTRAIT.width}
                height={HERO_PORTRAIT.height}
                alt={HERO_PORTRAIT.altDe}
                className="hero-portrait-img absolute inset-0 h-full w-full object-cover max-[639px]:object-[42%_56%] sm:object-[46%_46%] md:object-[50%_42%] lg:object-[52%_40%] xl:object-[54%_38%] 2xl:object-[56%_36%]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  transform: `scale(${1.008 + scrollY * 0.00006})`,
                  transition: 'transform 0.1s linear',
                  transformOrigin: '54% 38%'
                }}
              />
            </picture>

            {/* CINEMATIC LIGHTING — gentle bronze aura from upper right (editorial, not sunset) */}
            <div
              className="hero-sun absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 50% 42% at 82% 22%, rgba(214,168,94,0.22) 0%, rgba(185,130,63,0.10) 38%, rgba(122,74,36,0.04) 62%, transparent 80%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* SOFT BRONZE HAZE — very subtle, almost ambient */}
            <div
              className="hero-rays absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(155deg, transparent 42%, rgba(185,130,63,0.04) 52%, transparent 64%),
                  linear-gradient(170deg, transparent 48%, rgba(214,168,94,0.03) 58%, transparent 70%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* Obsidian — Desktop etwas reduziert rechts = Motiv wirkt schärfer */}
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,5,5,0.38) 0%, rgba(5,5,5,0.14) 28%, rgba(5,5,5,0.28) 62%, rgba(5,5,5,0.65) 100%)'
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,5,5,0.22) 0%, rgba(5,5,5,0.08) 40%, rgba(5,5,5,0.12) 72%, rgba(5,5,5,0.38) 100%)'
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none max-[639px]:opacity-45 sm:opacity-85"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,15,10,0.14) 0%, transparent 38%, rgba(10,8,6,0.14) 100%)',
                mixBlendMode: 'multiply'
              }}
            />

            {/* LINKER TEXT-KORRIDOR — breiterer Schutz, Gesicht bleibt rechts frei */}
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,2,2,0.94) 0%, rgba(4,3,2,0.82) min(32vw, 520px), rgba(5,4,3,0.38) min(48vw, 720px), rgba(5,4,3,0.06) min(62vw, 980px), transparent 100%)'
              }}
            />

            {/* MOBILE OVERLAY — Lesbarkeit nur oben; Gesichtsbereich bleibt frei */}
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.91) 0%, rgba(0,0,0,0.76) 22%, rgba(0,0,0,0.28) 46%, rgba(0,0,0,0.08) 62%, transparent 100%), linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.18) 42%, transparent 72%)'
              }}
            />

            {/* HEAVY BOTTOM ANCHOR — Desktop; Mobil schwächer = Porträt wirkt schärfer */}
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none max-[639px]:opacity-55 sm:h-[55%] sm:opacity-100"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.94) 0%, rgba(2,2,2,0.78) 18%, rgba(5,4,3,0.42) 45%, transparent 100%)'
              }}
            />

            {/* Cinematic vignette — getrennt: Mobil leicht, Desktop stark */}
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{ boxShadow: 'inset 0 0 90px 28px rgba(0,0,0,0.38)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{ boxShadow: 'inset 0 0 220px 64px rgba(0,0,0,0.48)' }}
            />

            {/* Subtle top fade for navbar readability over light sky */}
            <div
              className="absolute inset-x-0 top-0 h-32 sm:h-36 md:h-40 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)'
              }}
            />

            {/* Hairline bronze accent at very top */}
            <div
              className="absolute top-0 inset-x-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.35) 50%, transparent 100%)'
              }}
            />

            {/* Content — Position über .hero-content-shell (CSS): Mobil oben, Desktop unten */}
            <div
              className="hero-content-shell absolute inset-x-0 z-10"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1'
              } as React.CSSProperties}
            >
              <div className="max-w-[1600px] mx-auto max-[639px]:px-8 sm:px-5 md:px-8 lg:px-16">
              <div
                className="hero-content-wrap w-full sm:w-auto max-w-[min(100%,17.75rem)] sm:max-w-[min(26rem,min(92vw,420px))] md:max-w-[min(28rem,min(44vw,440px))] lg:max-w-[min(30rem,min(42vw,460px))] xl:max-w-[min(31rem,min(40vw,480px))] 2xl:max-w-[min(32rem,min(38vw,500px))]"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-6 max-[639px]:mb-6 sm:mb-7 md:mb-8"
                     style={{ opacity: Math.max(0, 0.9 - scrollY * 0.002) }}>
                  <div
                    className="h-px w-7 sm:w-9"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(185, 130, 63, 0) 0%, rgba(185, 130, 63, 0.6) 100%)'
                    }}
                  />
                  <span
                    className="hero-badge-text uppercase"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.6rem, 0.56rem + 0.12vw, 0.7rem)',
                      letterSpacing: '0.28em',
                      fontWeight: 600
                    }}
                  >
                    Bewusstsein · Arbeit · Tiefe
                  </span>
                  <div
                    className="h-px w-5 sm:w-7 hidden sm:block"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(185, 130, 63, 0.5) 0%, rgba(185, 130, 63, 0) 100%)'
                    }}
                  />
                </div>

                {/* Main heading */}
                <h1
                    className="hero-headline mb-4 max-[639px]:mb-5 sm:mb-6 md:mb-7"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 600,
                      fontSize: 'clamp(1.55rem, 0.88rem + 2.05vw, 2.75rem)',
                      lineHeight: 1.11,
                      letterSpacing: '-0.04em',
                      color: HOME_TEXT_CLEAR,
                      textShadow:
                        '0 14px 44px rgba(0,0,0,0.62), 0 2px 14px rgba(0,0,0,0.45)',
                      fontFeatureSettings: '"kern" 1, "liga" 1, "ss01" 1',
                      opacity: Math.max(0, 1 - scrollY * 0.001)
                    } as React.CSSProperties}>
                  {hero.mainHeading
                    ? (() => {
                        const arr = hero.mainHeading.split('\n');
                        const gradientStyle = {
                          backgroundImage:
                            'linear-gradient(180deg, #F4E8D4 0%, #E6C18A 32%, #B9823F 52%, #7A4A24 100%)',
                          WebkitBackgroundClip: 'text' as const,
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text' as const,
                          color: 'transparent',
                          filter:
                            'drop-shadow(0 4px 18px rgba(185,130,63,0.28)) drop-shadow(0 1px 3px rgba(0,0,0,0.58))',
                          letterSpacing: '-0.04em'
                        };
                        const goldIdx = arr.length - 1;
                        const mitteSplit =
                          arr.length >= 3 ? splitHeadlineInEntscheidungenMobile(arr[1]) : null;

                        return (
                          <>
                            <span className="hidden sm:block">
                              {arr.map((line: string, i: number) => {
                                const isGoldLine = i === goldIdx;
                                return isGoldLine ? (
                                  <span key={`d-${i}`} className="hero-headline-line block" style={gradientStyle}>
                                    <span className="sm:whitespace-nowrap">{line}</span>
                                  </span>
                                ) : (
                                  <span key={`d-${i}`} className="hero-headline-line block sm:whitespace-nowrap">
                                    {line}
                                  </span>
                                );
                              })}
                            </span>
                            <span className="sm:hidden block">
                              {arr.length >= 3 ? (
                                <>
                                  <span className="hero-headline-line block">{arr[0]}</span>
                                  {mitteSplit ? (
                                    <>
                                      <span className="hero-headline-line block">{mitteSplit[0]}</span>
                                      <span className="hero-headline-line block">{mitteSplit[1]}</span>
                                    </>
                                  ) : (
                                    <span className="hero-headline-line block">{arr[1]}</span>
                                  )}
                                  <span className="hero-headline-line block" style={gradientStyle}>
                                    <span>{arr[goldIdx]}</span>
                                  </span>
                                </>
                              ) : (
                                arr.map((line: string, i: number) => {
                                  const isGoldLine = i === goldIdx;
                                  return isGoldLine ? (
                                    <span key={`m-${i}`} className="hero-headline-line block" style={gradientStyle}>
                                      <span>{line}</span>
                                    </span>
                                  ) : (
                                    <span key={`m-${i}`} className="hero-headline-line block">
                                      {line}
                                    </span>
                                  );
                                })
                              )}
                            </span>
                          </>
                        );
                      })()
                    : null}
                </h1>

                {/* Subheading */}
                <p
                  className="hero-subline mb-4 max-[639px]:max-w-[min(17.75rem,100%)] sm:mb-7 md:mb-8"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
                    lineHeight: 1.62,
                    letterSpacing: '-0.006em',
                    maxWidth: '480px'
                  }}>
                  {(hero.subheading || 'Wenn Tempo die Linie verwischt, liegt der nächste Hebel selten im Markt — sondern in der Ruhe Ihrer Führung.')
                    .split('\n')
                    .map((line: string, i: number) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                </p>

                {/* Trust block — nur ≥sm im Hero (Mobil: kein Stack übers Gesicht; KPIs im Streifen unten) */}
                <div
                  className="hidden sm:flex sm:flex-nowrap sm:items-start gap-x-2 md:gap-x-3 lg:gap-x-3.5 gap-y-2 mb-8 md:mb-10"
                  style={{
                    fontFamily: FONT_BODY,
                    textShadow: '0 1px 10px rgba(0,0,0,0.45)'
                  }}
                >
                  {[
                    { value: '15+' as const, label: 'Jahre Erfahrung', mobileOnly: false },
                    { value: '500+' as const, label: 'Begleitete Menschen', mobileOnly: false },
                    {
                      label: 'Führungskräfte & Unternehmer',
                      mobileOnly: true,
                      mark: true as const
                    },
                    { value: '1:1' as const, label: 'Arbeit im Einzelnen', mobileOnly: false }
                  ].map((item, i, arr) => {
                    const lastVisibleDesktopIndex = arr
                      .map((it, idx) => (!it.mobileOnly ? idx : -1))
                      .filter(idx => idx !== -1)
                      .pop();
                    const showDesktopDivider =
                      !item.mobileOnly && i !== lastVisibleDesktopIndex;
                    const labelStyle: CSSProperties = {
                      color: 'rgba(214, 188, 152, 0.78)',
                      fontSize: 'clamp(0.55rem, 0.52rem + 0.13vw, 0.65rem)',
                      letterSpacing: '0.16em',
                      fontWeight: 500,
                      lineHeight: 1.28,
                      textShadow:
                        '0 1px 10px rgba(0,0,0,0.45), 0 0 18px rgba(185,130,63,0.12)'
                    };
                    return (
                      <div
                        key={i}
                        className={`flex items-stretch h-full ${item.mobileOnly ? 'sm:hidden' : ''}`}
                      >
                        <div className="flex flex-col flex-1 min-w-0 gap-y-1 sm:gap-y-1 text-center sm:text-left leading-none">
                          <div className="flex min-h-0 shrink-0 items-center justify-center sm:justify-start">
                            {'mark' in item && item.mark ? (
                              <TrustExecutiveInsignia idSuffix={`hero-${i}`} size="hero" />
                            ) : (
                              <span
                                className="hero-trust-num"
                                style={{
                                  color: '#F8F0E6',
                                  fontSize: 'clamp(1rem, 0.88rem + 0.45vw, 1.3125rem)',
                                  fontWeight: 500,
                                  letterSpacing: '-0.022em',
                                  fontFeatureSettings: '"tnum" 1, "lnum" 1',
                                  textShadow:
                                    '0 1px 8px rgba(0,0,0,0.55), 0 0 22px rgba(185,130,63,0.14)'
                                }}
                              >
                                {'value' in item ? item.value : null}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col pt-0">
                            <span className="hero-trust-label uppercase">
                              <TrustLabel text={item.label} style={labelStyle} />
                            </span>
                          </div>
                        </div>
                        {showDesktopDivider && (
                          <span
                            aria-hidden="true"
                            className="hidden sm:block ml-3 md:ml-3.5 lg:ml-4 w-px self-stretch min-h-[2.75rem]"
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
                  <div className="hidden sm:block mb-7 sm:mb-9">
                    <p
                       className="hero-quote italic font-light"
                       style={{
                         fontFamily: FONT_BODY,
                         fontSize: 'clamp(0.9rem, 0.86rem + 0.2vw, 1rem)',
                         fontWeight: 400,
                         letterSpacing: '0.01em'
                       }}>
                      „{hero.quote}"
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col items-start gap-4 max-[639px]:gap-3 sm:gap-5">
                  <button
                    className="metallic-bronze-button hero-cta group inline-flex items-center justify-center w-full sm:w-auto whitespace-nowrap max-[639px]:mt-5"
                    style={{
                      padding: 'clamp(12px, 1.2vw, 16px) clamp(24px, 3vw, 32px)',
                      minHeight: 'clamp(46px, 5vw, 54px)',
                      fontFamily: FONT_BODY
                    }}
                    onClick={() => {
                      navigate('/erstgespraech');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span
                      className="leading-none whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(0.85rem, 0.8rem + 0.22vw, 1rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.005em'
                      }}
                    >
                      {hero.ctaText || 'Erstgespräch vereinbaren'}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[3px]"
                      style={{ width: 18, height: 18 }}
                    >
                      <ArrowRight
                        size={16}
                        strokeWidth={2.25}
                      />
                    </span>
                  </button>

                  <Link
                    to="/quiz"
                    className="mt-2.5 sm:mt-3 text-[rgba(214,188,152,0.58)] hover:text-[rgba(238,226,206,0.78)] outline-none transition-[color] duration-300 focus-visible:ring-2 focus-visible:ring-amber-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm focus-visible:no-underline"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.75rem, 0.71rem + 0.22vw, 0.84375rem)',
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      textDecoration: 'underline',
                      textUnderlineOffset: '0.26em',
                      textDecorationThickness: '0.05em'
                    }}
                  >
                    Oder zuerst Orientierung erhalten →
                  </Link>

                  {/* Micro-trust unter CTA — Mobil (eine Zeile) */}
                  <div className="flex sm:hidden flex-col items-start gap-2 mt-0.5 w-full max-w-[min(17.75rem,100%)]">
                    <span
                      aria-hidden="true"
                      className="block max-w-full"
                      style={{
                        width: 'clamp(28px, 48%, 120px)',
                        height: '1px',
                        background:
                          'linear-gradient(90deg, rgba(230, 193, 138, 0) 0%, rgba(230, 193, 138, 0.65) 50%, rgba(230, 193, 138, 0) 100%)',
                        boxShadow: '0 0 8px rgba(230, 193, 138, 0.25)'
                      }}
                    />
                    <div
                      className="hero-microtrust-inline-mobile flex flex-nowrap items-center justify-start gap-x-0 w-full min-w-0"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      { ['15 Min.', 'Vertraulich', 'Orientierung'].map((label, i, arr) => (
                        <div key={`m-micro-${i}`} className="flex flex-none items-center shrink-0">
                          <span
                            className="hero-microtrust-label uppercase leading-none"
                            style={{
                              fontSize: 'clamp(0.42rem, 0.36rem + 0.95vw, 0.52rem)',
                              letterSpacing: '0.08em',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {label}
                          </span>
                          {i < arr.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="hero-microtrust-divider mx-0.5 inline-block shrink-0"
                              style={{
                                width: '1px',
                                height: '9px',
                                background:
                                  'linear-gradient(180deg, rgba(230, 193, 138, 0) 0%, rgba(230, 193, 138, 0.55) 50%, rgba(230, 193, 138, 0) 100%)'
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micro-trust unter CTA — Desktop */}
                  <div className="hidden sm:flex flex-col items-start gap-3 sm:gap-3.5 mt-1 pl-1">
                    {/* Hairline gold accent */}
                    <span
                      aria-hidden="true"
                      className="block"
                      style={{
                        width: 'clamp(36px, 6vw, 56px)',
                        height: '1px',
                        background:
                          'linear-gradient(90deg, rgba(230, 193, 138, 0) 0%, rgba(230, 193, 138, 0.65) 50%, rgba(230, 193, 138, 0) 100%)',
                        boxShadow: '0 0 8px rgba(230, 193, 138, 0.25)'
                      }}
                    />

                    <div
                      className="flex flex-wrap items-center gap-y-3"
                      style={{
                        fontFamily: FONT_BODY
                      }}
                    >
                      {['15 Min.', 'Vertraulich', 'Orientierung'].map(
                        (label, i, arr) => (
                          <div key={i} className="flex items-center">
                            <span
                              className="hero-microtrust-label uppercase"
                              style={{
                                fontSize: 'clamp(0.575rem, 0.54rem + 0.13vw, 0.7rem)',
                                letterSpacing: '0.14em',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {label}
                            </span>
                            {i < arr.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="hero-microtrust-divider mx-1.5 sm:mx-2 md:mx-2.5 inline-block"
                                style={{
                                  width: '1px',
                                  height: '12px',
                                  background:
                                    'linear-gradient(180deg, rgba(230, 193, 138, 0) 0%, rgba(230, 193, 138, 0.55) 50%, rgba(230, 193, 138, 0) 100%)'
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

      {/* Erste Orientierung — Klarcheck & Anamnese (editorial, vor Transformation) */}
      <section
        aria-labelledby="home-orientierung-heading"
        className="relative w-full overflow-hidden border-t border-transparent"
        data-section
        data-section-id="orientierung-erster-schritt"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-md:min-h-[100%]" aria-hidden>
          <img
            src="/images/home/orientierung-berg-hintergrund.png"
            alt=""
            className="absolute inset-0 h-full min-h-[100%] w-full scale-[1.02] object-cover object-[74%_42%] sm:object-[78%_40%]"
            loading="lazy"
            decoding="async"
          />
          {/* Lesefläche links — Bild rechts zeigt Licht & Tiefe */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(4,4,5,0.85) 0%, rgba(4,4,5,0.55) 38%, rgba(4,4,5,0.72) 100%)'
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(5,4,3,0.96) 0%, rgba(5,4,3,0.88) min(42%,22rem), rgba(5,4,3,0.42) min(72%,54rem), rgba(5,4,3,0.08) 88%, transparent 100%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(3,3,4,0.38) 0%, transparent min(42%,380px), transparent 72%, rgba(2,2,3,0.55) 100%)'
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              background: 'linear-gradient(125deg, rgba(214,168,94,0.12) 0%, transparent 45%)'
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[1600px] px-6 pb-14 pt-[2.875rem] sm:px-8 sm:pb-[3.25rem] sm:pt-[3.25rem] md:px-12 lg:min-h-[min(52svh,520px)] lg:px-16 lg:flex lg:flex-col lg:justify-center lg:pb-16 lg:pt-14">
          <div className="mx-auto max-w-[40rem] text-center lg:mx-0 lg:max-w-[44rem] lg:text-left">
            <p
              className="m-0 uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.625rem, 0.58rem + 0.15vw, 0.703125rem)',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: 'rgba(222, 198, 164, 0.78)'
              }}
            >
              Erster Schritt
            </p>
            <h2
              id="home-orientierung-heading"
              className="mt-[1.125rem] m-0 font-medium tracking-[-0.034em] antialiased"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(1.3125rem, 0.94rem + 1.12vw, 1.9375rem)',
                lineHeight: 1.22,
                color: 'rgba(252, 246, 236, 0.98)',
                textShadow:
                  '0 1px 0 rgba(0,0,0,0.55), 0 22px 52px rgba(0,0,0,0.5), 0 0 56px rgba(0,0,0,0.25)'
              }}
            >
              Nicht jede Situation braucht sofort eine Entscheidung.
            </h2>
            <p
              className="m-0 mt-[1.125rem] max-w-[28rem] text-balance lg:max-w-[30rem]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem)',
                fontWeight: 400,
                lineHeight: 1.62,
                letterSpacing: '-0.012em',
                color: 'rgba(228, 218, 202, 0.9)',
                textShadow: '0 10px 36px rgba(0,0,0,0.45), 0 1px 12px rgba(0,0,0,0.35)'
              }}
            >
              Manchmal hilft zuerst ein klarer Blick auf die eigene Situation.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:mt-11 sm:gap-[1.125rem] lg:mx-0 lg:max-w-[52rem] lg:grid-cols-2">
            <Link
              to="/quiz"
              className="group relative block rounded-[13px] border border-[rgba(214,168,94,0.22)] px-5 py-[1.1875rem] no-underline outline-none transition-[border-color,box-shadow,background-color] duration-300 sm:px-[1.25rem] sm:py-5 backdrop-blur-[12px] focus-visible:border-[rgba(214,168,94,0.32)] focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.24)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 hover:border-[rgba(214,168,94,0.28)] hover:shadow-[0_0_42px_-18px_rgba(185,130,63,0.12)]"
              style={{
                background:
                  'linear-gradient(165deg, rgba(12,11,10,0.78) 0%, rgba(5,5,6,0.86) 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 248, 238, 0.045), 0 1px 0 rgba(0,0,0,0.5), 0 28px 56px -30px rgba(0,0,0,0.75)'
              }}
            >
              <span
                className="pointer-events-none absolute inset-px rounded-[12px] opacity-[0.45]"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255, 250, 242, 0.034) 0%, transparent 55%)'
                }}
              />
              <div className="relative">
                <h3
                  className="m-0 font-semibold tracking-[-0.022em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 'clamp(1.03125rem, 0.95rem + 0.28vw, 1.2rem)',
                    letterSpacing: '-0.022em',
                    lineHeight: 1.3,
                    color: 'rgba(252, 247, 236, 0.96)'
                  }}
                >
                  Klarcheck
                </h3>
                <p
                  className="m-0 mt-2"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.828125rem, 0.79rem + 0.13vw, 0.890625rem)',
                    lineHeight: 1.56,
                    fontWeight: 400,
                    letterSpacing: '-0.008em',
                    color: 'rgba(234, 224, 206, 0.9)'
                  }}
                >
                  Eine ruhige erste Orientierung für aktuelle Herausforderungen und innere Unklarheit.
                </p>
                <span
                  className="mt-[1.0625rem] inline-flex font-medium transition-colors duration-300 group-hover:text-[rgba(240,226,196,0.92)]"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.796875rem, 0.765rem + 0.09vw, 0.84375rem)',
                    letterSpacing: '0.05em',
                    color: 'rgba(208, 182, 144, 0.82)'
                  }}
                >
                  Orientierung starten →
                </span>
              </div>
            </Link>

            <Link
              to="/anamnesis"
              className="group relative block rounded-[13px] border border-[rgba(214,168,94,0.22)] px-5 py-[1.1875rem] no-underline outline-none transition-[border-color,box-shadow,background-color] duration-300 sm:px-[1.25rem] sm:py-5 backdrop-blur-[12px] focus-visible:border-[rgba(214,168,94,0.32)] focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.24)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 hover:border-[rgba(214,168,94,0.28)] hover:shadow-[0_0_42px_-18px_rgba(185,130,63,0.12)]"
              style={{
                background:
                  'linear-gradient(165deg, rgba(12,11,10,0.78) 0%, rgba(5,5,6,0.86) 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 248, 238, 0.045), 0 1px 0 rgba(0,0,0,0.5), 0 28px 56px -30px rgba(0,0,0,0.75)'
              }}
            >
              <span
                className="pointer-events-none absolute inset-px rounded-[12px] opacity-[0.45]"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255, 250, 242, 0.034) 0%, transparent 55%)'
                }}
              />
              <div className="relative">
                <h3
                  className="m-0 font-semibold tracking-[-0.022em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 'clamp(1.03125rem, 0.95rem + 0.28vw, 1.2rem)',
                    letterSpacing: '-0.022em',
                    lineHeight: 1.3,
                    color: 'rgba(252, 247, 236, 0.96)'
                  }}
                >
                  Anamnese
                </h3>
                <p
                  className="m-0 mt-2"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.828125rem, 0.79rem + 0.13vw, 0.890625rem)',
                    lineHeight: 1.56,
                    fontWeight: 400,
                    letterSpacing: '-0.008em',
                    color: 'rgba(234, 224, 206, 0.9)'
                  }}
                >
                  Ein strukturierter Einstieg zur tieferen Analyse Ihrer aktuellen Situation.
                </p>
                <span
                  className="mt-[1.0625rem] inline-flex font-medium transition-colors duration-300 group-hover:text-[rgba(240,226,196,0.92)]"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.796875rem, 0.765rem + 0.09vw, 0.84375rem)',
                    letterSpacing: '0.05em',
                    color: 'rgba(208, 182, 144, 0.82)'
                  }}
                >
                  Analyse beginnen →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2️⃣ TRUST + PROBLEM */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: colors.bg.primary }}
        data-section
        data-section-id="trust-problem"
      >
        {/* Subtiler Bronze-Flow — keine Fläche, nur Tiefe */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute -top-[38%] -left-[8%] h-[min(72vh,520px)] w-[min(92vw,780px)] rounded-full blur-[120px] opacity-[0.55]"
            style={{
              background:
                'radial-gradient(ellipse 62% 58% at 50% 48%, rgba(185, 130, 63, 0.26) 0%, rgba(80, 52, 28, 0.06) 48%, transparent 72%)'
            }}
          />
          <div
            className="absolute top-[18%] -right-[12%] h-[min(56vh,420px)] w-[min(78vw,560px)] rounded-full blur-[100px] opacity-[0.42]"
            style={{
              background:
                'radial-gradient(ellipse 58% 52% at 42% 44%, rgba(230, 193, 138, 0.11) 0%, rgba(40, 32, 24, 0.05) 55%, transparent 74%)'
            }}
          />
        </div>

        <div className="relative z-[1] max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-5 sm:pt-7 md:pt-8 pb-0">

          {/* Transformation / Transformationsebenen */}
          <div className="relative">
            <svg width={0} height={0} className="absolute overflow-hidden" aria-hidden>
              <defs>
                <linearGradient id={trustWirkStrokeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F4E8D4" />
                  <stop offset="22%" stopColor="#E6C18A" />
                  <stop offset="52%" stopColor="#D6A85E" />
                  <stop offset="82%" stopColor="#B9823F" />
                  <stop offset="100%" stopColor="#7A4A24" />
                </linearGradient>
              </defs>
            </svg>

            <header className="mx-auto max-w-[52rem] text-center lg:mx-0 lg:max-w-[56rem] lg:text-left mb-5 sm:mb-6 lg:mb-7">
              <h2
                className="m-0 font-medium tracking-tight text-[#F4F4F4] text-[clamp(1.45rem,1.05rem+1.35vw,2.2rem)] lg:text-[clamp(1.28rem,0.82rem+0.72vw,1.92rem)] lg:whitespace-nowrap"
                style={{
                  fontFamily: FONT_DISPLAY,
                  letterSpacing: '-0.032em',
                  lineHeight: 1.14,
                  textShadow: '0 14px 44px rgba(0,0,0,0.42)'
                }}
              >
                Transformation — innere Ordnung wird wirksam.
              </h2>
              <p
                className="mt-3 sm:mt-3.5 m-0 max-w-[40rem] lg:mx-0 mx-auto"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.9375rem, 0.875rem + 0.22vw, 1.0625rem)',
                  lineHeight: 1.58,
                  letterSpacing: '-0.008em',
                  fontWeight: 400,
                  color: 'rgba(140, 138, 135, 0.88)'
                }}
              >
                Wo innere Ordnung wieder tragende Basis wird.
              </p>
              {/* Haarlinie unter Claim — horizontal, Bronze-Kern */}
              <div
                aria-hidden
                className="mt-5 sm:mt-[1.125rem] h-px w-full max-w-xl lg:max-w-[44rem] mx-auto lg:mx-0"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(230, 193, 138, 0.06) 14%, rgba(230, 193, 138, 0.32) 50%, rgba(230, 193, 138, 0.06) 86%, transparent 100%)',
                  boxShadow: '0 0 24px rgba(185, 130, 63, 0.06)'
                }}
              />
            </header>

            {/* Editorial-Kicker: einmal, nicht wie Feature-Bullets */}
            <p
              className="m-0 mb-5 sm:mb-6 lg:mb-7 max-w-[40rem] text-center lg:text-left lg:mx-0 mx-auto"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.6875rem, 0.62rem + 0.18vw, 0.78125rem)',
                fontWeight: 300,
                letterSpacing: '0.14em',
                textTransform: 'none',
                color: 'rgba(214, 188, 152, 0.76)',
                lineHeight: 1.45
              }}
            >
              Schwerpunkte
            </p>

            <div className="lg:grid lg:grid-cols-4 lg:gap-0 lg:items-stretch">
              {HOME_TRUST_WIRK_PILLARS.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="relative flex gap-3.5 sm:gap-4 items-center py-5 sm:py-6 lg:py-2 lg:min-h-[5.25rem] lg:px-3 xl:px-5"
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-[18%] bottom-[18%] hidden w-px lg:block"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 0%, rgba(230, 193, 138, 0.2) 38%, rgba(255, 250, 242, 0.09) 50%, rgba(230, 193, 138, 0.16) 62%, transparent 100%)',
                        boxShadow: '0 0 14px rgba(185, 130, 63, 0.06)'
                      }}
                    />
                  )}
                  {i < HOME_TRUST_WIRK_PILLARS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-px lg:hidden"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(230, 193, 138, 0.08) 18%, rgba(230, 193, 138, 0.22) 50%, rgba(230, 193, 138, 0.08) 82%, transparent 100%)'
                      }}
                    />
                  )}
                  <HomeTrustWirkIcon kind={pillar.icon} gradId={trustWirkStrokeGradId} />
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className="m-0 font-semibold leading-snug"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 'clamp(1rem, 0.88rem + 0.38vw, 1.1875rem)',
                        letterSpacing: '-0.024em',
                        lineHeight: 1.3,
                        background: 'linear-gradient(182deg, #F6ECD8 0%, #E6C18A 26%, #C99552 58%, #8B5A2B 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                        filter:
                          'drop-shadow(0 1px 0 rgba(0,0,0,0.48)) drop-shadow(0 10px 28px rgba(185, 130, 63, 0.16))'
                      }}
                    >
                      {pillar.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 lg:gap-0 sm:mt-6 lg:mt-7">
              <div className="lg:col-span-1 flex justify-start">
                <button
                  type="button"
                  className="metallic-bronze-button btn-bronze group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.9rem] font-medium tracking-tight"
                  onClick={() => {
                    document.querySelector('[data-home-problem-intro]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span>Weiter</span>
                  <ArrowRight
                    size={17}
                    strokeWidth={2.25}
                    className="transition-transform duration-300 group-hover:translate-x-[3px]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CINEMATIC TENSION SECTION — Luxury Editorial */}
          <div
            data-home-problem-intro
            className="relative isolate overflow-hidden -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16 flex items-center mt-0"
            style={{
              backgroundColor: '#000000',
              minHeight: 'min(80svh, 720px)',
              paddingTop: 'clamp(1.35rem, 3.2vw, 2.35rem)',
              paddingBottom: '0'
            }}
          >
            <style>{`
              @keyframes tensionReveal {
                0% { opacity: 0; transform: translate3d(0, 14px, 0); filter: blur(6px); }
                100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
              }
              @keyframes tensionLineGrow {
                0% { transform: scaleY(0); opacity: 0; }
                70% { opacity: 1; }
                100% { transform: scaleY(1); opacity: 1; }
              }
              @keyframes tensionBarSlide {
                0% { transform: translateX(-22px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
              }
              @keyframes tensionGlow {
                0%, 100% { opacity: 0.42; }
                50%      { opacity: 0.7; }
              }
              .tension-fade-in { animation: tensionReveal 1.05s cubic-bezier(0.22, 1, 0.36, 1) both; }
              .tension-line-row { animation: tensionBarSlide 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
              .tension-line-row .tension-mark {
                transform-origin: top center;
                animation: tensionLineGrow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
              }
              .tension-flow {
                animation: tensionGlow 11s ease-in-out infinite;
                will-change: opacity;
              }
              @media (prefers-reduced-motion: reduce) {
                .tension-fade-in, .tension-line-row, .tension-line-row .tension-mark, .tension-flow {
                  animation: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                  filter: none !important;
                }
              }
            `}</style>

            {/* Hintergrund — Kapitel I (fullscreen, sanfter Bottom-Fade für smoothen Bildwechsel) */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/manifest-kapitel-1-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {/* Top-Fade: weicher Anschluss an die Section darüber */}
              <div
                className="absolute inset-x-0 top-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.42) 52%, rgba(0,0,0,0.14) 82%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Bottom-Fade: dunkle Brücke zu Kapitel II */}
              <div
                className="absolute inset-x-0 bottom-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>

            <div className="relative z-[1] w-full mx-auto max-w-[1320px] px-6 sm:px-10 md:px-14 lg:px-20">

              {/* Editorial-Marker — links, sehr fein */}
              <div className="tension-fade-in flex items-center gap-3 mb-6 sm:mb-7 lg:mb-8">
                <span
                  aria-hidden
                  className="block h-px w-7 sm:w-9"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.7) 100%)'
                  }}
                />
                <span
                  className="block uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.58rem, 0.55rem + 0.1vw, 0.66rem)',
                    letterSpacing: '0.36em',
                    fontWeight: 500,
                    color: 'rgba(214, 168, 94, 0.78)'
                  }}
                >
                  Manifest · Kapitel I
                </span>
              </div>

              {/* Zweispaltige Komposition — Headline links, Manifest rechts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 xl:gap-x-16 gap-y-9 lg:gap-y-0 items-start">

                {/* LINKS — Headline */}
                <h2
                  className="tension-fade-in m-0 lg:col-span-7 text-left"
                  style={{
                    textRendering: 'geometricPrecision',
                    animationDelay: '0.05s'
                  }}
                >
                  <span
                    className="block"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: 'clamp(2.1rem, 4.8vw, 4rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.02,
                      color: HOME_TEXT_CLEAR,
                      textShadow: '0 2px 18px rgba(0,0,0,0.65)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }}
                  >
                    Du trägst viel — auf hohem Niveau.
                  </span>
                  <span
                    className="block mt-4 sm:mt-5 lg:mt-6"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: 'clamp(1.4rem, 3.05vw, 2.5rem)',
                      letterSpacing: '-0.028em',
                      lineHeight: 1.16,
                      color: 'rgba(244, 244, 244, 0.94)',
                      textShadow: '0 2px 16px rgba(0,0,0,0.65)'
                    }}
                  >
                    Wo es zählt, fehlt{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        letterSpacing: '-0.03em',
                        background:
                          'linear-gradient(182deg, #F2E2C0 0%, #D6A85E 32%, #B9823F 58%, #7A4A24 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Klarheit
                    </span>
                    .
                  </span>

                  {/* Closing direkt unter der Headline (Desktop) */}
                  <span
                    className="hidden lg:block mt-8"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.7rem, 0.62rem + 0.18vw, 0.82rem)',
                      lineHeight: 1.7,
                      fontWeight: 400,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(214, 188, 152, 0.62)'
                    }}
                  >
                    Das Spannungsfeld liegt selten im Tun — sondern in der{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        background:
                          'linear-gradient(185deg, #F6E4BC 0%, #C99552 45%, #8A5A24 95%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Führung
                    </span>
                    .
                  </span>
                </h2>

                {/* RECHTS — Manifest, nur feine Bronze-Striche */}
                <ul
                  className="m-0 p-0 list-none flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-[1.35rem] lg:col-span-5 lg:pt-2"
                >
                  {[
                    'Nach außen wirkt es rund — innen bleibt Spannung.',
                    'Entscheidungen kosten mehr Kraft, als sie sollten.',
                    'Tempo wächst — Ruhe wird seltener.',
                    'Operativ stark — strategisch unscharf.',
                    'Erfahrung da — die Linie weicht.'
                  ].map((line, i) => (
                    <li
                      key={line}
                      className="tension-line-row relative flex items-center gap-5 sm:gap-6"
                      style={{ animationDelay: `${0.18 + i * 0.07}s` }}
                    >
                      <span
                        aria-hidden
                        className="block shrink-0"
                        style={{
                          width: '1px',
                          height: 'clamp(1.35rem, 2vw, 1.85rem)',
                          background:
                            'linear-gradient(180deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.85) 50%, rgba(214,168,94,0) 100%)'
                        }}
                      />
                      <p
                        className="m-0"
                        style={{
                          fontFamily: FONT_BODY,
                          fontWeight: 400,
                          fontSize: 'clamp(0.95rem, 0.85rem + 0.45vw, 1.125rem)',
                          lineHeight: 1.58,
                          letterSpacing: '-0.006em',
                          color: 'rgba(234, 221, 203, 0.94)',
                          textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                        }}
                      >
                        {line}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Closing (Mobil) — schließt die Section */}
              <p
                className="tension-fade-in lg:hidden m-0 mt-8 sm:mt-9 text-left"
                style={{
                  animationDelay: '0.7s',
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.68rem, 0.6rem + 0.22vw, 0.78rem)',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(214, 188, 152, 0.6)'
                }}
              >
                Das Spannungsfeld liegt selten im Tun — sondern in der{' '}
                <span
                  style={{
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    background:
                      'linear-gradient(185deg, #F6E4BC 0%, #C99552 45%, #8A5A24 95%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
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

      {/* 3️⃣ VOM REAGIEREN ZUR KLAREN FÜHRUNG — Luxury Editorial */}
      <section
        className="relative w-full overflow-hidden isolate flex items-center"
        style={{
          backgroundColor: '#000000',
          minHeight: 'min(80svh, 720px)',
          paddingTop: '0',
          paddingBottom: 'clamp(1.2rem, 2.8vw, 2.15rem)'
        }}
        data-section
        data-section-id="respond-to-shape"
      >
        <style>{`
          @keyframes timelineRowReveal {
            0% { opacity: 0; transform: translate3d(0, 14px, 0); filter: blur(6px); }
            100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
          }
          .tl-row { animation: timelineRowReveal 1.05s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .tl-row {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          }
        `}</style>

        {/* Hintergrund — wie Kapitel I: gleicher 1600-Rahmen + seitlicher Bleed (Bild „schwebt“ in #000) */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div className="relative mx-auto h-full max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div
              className="absolute inset-y-0 overflow-hidden -left-6 -right-6 sm:-left-8 sm:-right-8 md:-left-12 md:-right-12 lg:-left-16 lg:-right-16 xl:-left-[5.5rem] xl:-right-[5.5rem]"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/manifest-kapitel-2-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {/* Top-Fade */}
              <div
                className="absolute inset-x-0 top-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Bottom-Fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.48) 44%, rgba(0,0,0,0.14) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-[1] w-full mx-auto max-w-[1320px] px-6 sm:px-10 md:px-14 lg:px-20">
          <div className="w-full">
            {/* Editorial-Marker — links, sehr fein */}
            <div className="flex items-center gap-3 mb-6 sm:mb-7 lg:mb-8">
              <span
                aria-hidden
                className="block h-px w-7 sm:w-9"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.7) 100%)'
                }}
              />
              <span
                className="block uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.58rem, 0.55rem + 0.1vw, 0.66rem)',
                  letterSpacing: '0.36em',
                  fontWeight: 500,
                  color: 'rgba(214, 168, 94, 0.78)'
                }}
              >
                Manifest · Kapitel II
              </span>
            </div>

            {/* Asymmetrische Editorial-Komposition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 xl:gap-x-16 gap-y-9 lg:gap-y-0 items-start">

              {/* LINKS — Headline & Untertitel & feiner CTA */}
              <div className="lg:col-span-7 text-left">
                <h2
                  className="m-0"
                  style={{
                    textRendering: 'geometricPrecision',
                    lineHeight: 1.02
                  }}
                >
                  <span
                    className="block"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: 'clamp(2.1rem, 4.8vw, 4rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.02,
                      color: HOME_TEXT_CLEAR,
                      textShadow: '0 2px 18px rgba(0,0,0,0.65)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }}
                  >
                    Vom Reagieren
                  </span>
                  <span
                    className="block mt-1 sm:mt-1.5"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: 'clamp(2.1rem, 4.8vw, 4rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.02,
                      color: HOME_TEXT_CLEAR,
                      textShadow: '0 2px 18px rgba(0,0,0,0.65)'
                    }}
                  >
                    zur{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        letterSpacing: '-0.032em',
                        background:
                          'linear-gradient(182deg, #F2E2C0 0%, #D6A85E 32%, #B9823F 58%, #7A4A24 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      klaren Führung
                    </span>
                    <span
                      style={{
                        fontWeight: 300,
                        letterSpacing: '-0.04em',
                        color: HOME_TEXT_CLEAR
                      }}
                    >
                      .
                    </span>
                  </span>
                </h2>

                <p
                  className="m-0 mt-6 sm:mt-7 lg:mt-8"
                  style={{
                    maxWidth: '32rem',
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.95rem, 0.86rem + 0.4vw, 1.0625rem)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    letterSpacing: '-0.006em',
                    color: 'rgba(238, 230, 216, 0.62)',
                    textShadow: '0 1px 12px rgba(0,0,0,0.45)'
                  }}
                >
                  Was sich verändert, wenn Klarheit zurückkehrt.
                </p>

                {/* Feiner Toggle — editorial, kein Button-Look */}
                <button
                  type="button"
                  onClick={() => {
                    setTransformExpanded(!transformExpanded);
                    setTransformPeek(false);
                  }}
                  onMouseEnter={() => !transformExpanded && setTransformPeek(true)}
                  onMouseLeave={() => setTransformPeek(false)}
                  className="group inline-flex items-center gap-3 mt-8 sm:mt-9 lg:mt-10 transition-colors duration-300"
                >
                  <span
                    aria-hidden
                    className="block h-px transition-all duration-500 group-hover:w-12"
                    style={{
                      width: '1.75rem',
                      background:
                        'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.78) 100%)'
                    }}
                  />
                  <span
                    className="block uppercase transition-colors duration-300"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.6rem, 0.55rem + 0.12vw, 0.7rem)',
                      letterSpacing: '0.36em',
                      fontWeight: 500,
                      color: 'rgba(214, 168, 94, 0.72)'
                    }}
                  >
                    {transformExpanded ? 'Schließen' : 'Weitere Bewegungen'}
                  </span>
                </button>
              </div>

              {/* RECHTS — Manifest (kein Pfeil, kein Vorher/Nachher-Grid, nur feine Bronze-Striche) */}
              <ul
                className="m-0 p-0 list-none flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-[1.35rem] lg:col-span-5 lg:pt-2"
              >
                {(() => {
                  const visibleRows = transformExpanded || transformPeek ? TRANSFORM_ROWS : TRANSFORM_ROWS.slice(0, 3);
                  return visibleRows.map((row, i) => (
                    <li
                      key={`tl-${row.from}-${i}`}
                      className="tl-row relative flex items-center gap-5 sm:gap-6"
                      style={{ animationDelay: `${0.16 + i * 0.07}s` }}
                    >
                      <span
                        aria-hidden
                        className="block shrink-0"
                        style={{
                          width: '1px',
                          height: 'clamp(1.5rem, 2.2vw, 2rem)',
                          background:
                            'linear-gradient(180deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.85) 50%, rgba(214,168,94,0) 100%)'
                        }}
                      />
                      <p
                        className="m-0"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(0.95rem, 0.86rem + 0.4vw, 1.125rem)',
                          lineHeight: 1.58,
                          letterSpacing: '-0.006em',
                          textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 300,
                            color: 'rgba(140, 138, 135, 0.85)'
                          }}
                        >
                          {row.from}
                        </span>
                        <span
                          aria-hidden
                          className="inline-block mx-2.5 sm:mx-3 align-middle"
                          style={{
                            width: '0.85rem',
                            height: '1px',
                            background:
                              'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0.85) 100%)',
                            verticalAlign: 'middle'
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 500,
                            background:
                              'linear-gradient(182deg, #F2E2C0 0%, #D6A85E 32%, #B9823F 58%, #7A4A24 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent'
                          }}
                        >
                          {row.to}
                        </span>
                      </p>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 📰 NEWS SLIDER */}
      {newsArticles.length > 0 && (
        <section className="relative py-16 md:py-24" style={{ backgroundColor: colors.bg.primary }} data-section>
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
        <section className="relative py-16 sm:py-20" style={{ backgroundColor: colors.bg.primary }} data-section>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2"
                    style={{ fontFamily: FONT_DISPLAY, fontWeight: 900 }}>
                  {eventsHeader.heading}
                  {eventsHeader.highlight && (
                    <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                      {eventsHeader.highlight}
                    </span>
                  )}
                </h2>
                {eventsHeader.subline && (
                  <p className="text-base sm:text-lg text-zinc-400 mb-3 leading-relaxed" style={{ fontFamily: FONT_BODY }}>
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
                    'yellow-400': '#B9823F',
                    'yellow-500': '#B9823F',
                    'orange-400': '#8A5528',
                    'orange-500': '#7A4A24',
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

                  const fromColor = gradientColors[event.gradient_from] || '#B9823F';
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
                              fontFamily: event.title_font_family || FONT_DISPLAY,
                              fontWeight: event.title_font_weight || 900,
                              textTransform: (event.title_text_transform || 'uppercase') as any,
                              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)'
                            }}
                          >
                            {event.title}
                          </h3>
                        </div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(185, 130, 63, 0.15), transparent 70%)' }}
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


      {/* Editorial Luxury Section — „Ebene für Ebene. Ein System.“ (fusioniert mit „Präzision trifft Tiefe“) */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: '#000000' }}
        data-section
        data-section-id="deep-dive"
      >
        <style>{`
          @keyframes systemFade {
            from { opacity: 0; transform: translate3d(0, 12px, 0); filter: blur(4px); }
            to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
          }
          .sys-fade { animation: systemFade 1.05s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .sys-fade { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
          }
        `}</style>

        {/* Stein-Hintergrund „Präzision trifft Tiefe“ — voll scharf, kein Blur/Filter auf dem Motiv */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/images/manifest/precision-depth-stone-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Dezente Vignette + Kanten-Fades nur für Lesbarkeit und Section-Übergänge (liegt über dem Bild, verwischt es nicht) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(115% 88% at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.14) 52%, rgba(0,0,0,0.55) 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-40"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-40"
            style={{
              background:
                'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-10 sm:pb-12 md:pb-14 lg:pb-16">

          {/* OBERER BLOCK: Portrait links · Headline + Inhalte rechts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-9 lg:gap-x-12 xl:gap-x-16 items-start">

            {/* Headline für Mobile zuerst */}
            <div className="lg:hidden">
              <h2
                className="m-0 tracking-tight"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(2.05rem, 6.6vw, 3.3rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.02,
                  color: HOME_TEXT_CLEAR,
                  textShadow: '0 2px 20px rgba(0,0,0,0.72)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                <span
                  style={{
                    fontWeight: 400,
                    background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Präzision
                </span>{' '}
                <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>trifft</span>{' '}
                <span
                  style={{
                    fontWeight: 400,
                    background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Tiefe
                </span>
              </h2>
            </div>

            {/* LINKS — Portrait freistehend, organisch in den BG verschmolzen */}
            <div className="lg:col-span-5 sys-fade">
              <div className="relative w-full" style={{ aspectRatio: '4 / 5' }}>
                {/* Subtiler Bronze-Glow hinter dem Portrait — Tiefe ohne Container */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    inset: '-8%',
                    background:
                      'radial-gradient(55% 60% at 50% 42%, rgba(214,168,94,0.18) 0%, rgba(214,168,94,0.06) 38%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(28px)',
                    zIndex: 0
                  }}
                />

                {/* Portrait — freistehend, weiche Mask, keine harten Kanten */}
                <img
                  src="/images/portrait/anatoly-precision-portrait.png"
                  alt="Anatoly Mook"
                  className="relative block h-full w-full select-none"
                  draggable={false}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    zIndex: 1,
                    WebkitMaskImage:
                      'radial-gradient(78% 88% at 50% 46%, #000 0%, #000 56%, rgba(0,0,0,0.92) 68%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.18) 92%, rgba(0,0,0,0) 100%)',
                    maskImage:
                      'radial-gradient(78% 88% at 50% 46%, #000 0%, #000 56%, rgba(0,0,0,0.92) 68%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.18) 92%, rgba(0,0,0,0) 100%)',
                    filter: 'drop-shadow(0 28px 60px rgba(0,0,0,0.55)) contrast(1.04) saturate(1.02)'
                  }}
                />

                {/* Soft bottom blend in die Section */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 2,
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>

            {/* RECHTS — Headline, Subline, Body, Premium-Cards, CTA */}
            <div className="lg:col-span-7 sys-fade" style={{ animationDelay: '0.1s' }}>
              {/* Desktop-Headline */}
              <h2
                className="hidden lg:block m-0 tracking-tight"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(2.7rem, 4.8vw, 4.6rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.042em',
                  lineHeight: 1,
                  color: HOME_TEXT_CLEAR,
                  textShadow: '0 2px 24px rgba(0,0,0,0.72)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                <span
                  style={{
                    fontWeight: 400,
                    background:
                      'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Präzision
                </span>{' '}
                <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>trifft</span>{' '}
                <span
                  style={{
                    fontWeight: 400,
                    background:
                      'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Tiefe
                </span>
              </h2>

              {/* Subline */}
              <p
                className="m-0 mt-4 sm:mt-5"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 0.92rem + 0.32vw, 1.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  letterSpacing: '-0.008em',
                  color: 'rgba(234,221,203,0.9)'
                }}
              >
                Klarheit für Führung, Entscheidungen und Wachstum.
              </p>

              {/* Body */}
              <p
                className="m-0 mt-5 sm:mt-6 max-w-[42rem]"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 0.9rem + 0.22vw, 1.05rem)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(234,221,203,0.66)'
                }}
              >
                Echte Orientierung entsteht nicht durch mehr Information,
                sondern durch präzise Wahrnehmung, innere Ordnung und
                klare Selbstführung.
              </p>

              {/* Premium-Feature-Cards (Glas, dünne Bronze-Border, keine billigen Icons) */}
              <div className="mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: <Users className="h-[18px] w-[18px]" strokeWidth={1.4} />, title: 'Präsenz', sub: 'Wahrnehmung schärfen.' },
                  { icon: <Shield className="h-[18px] w-[18px]" strokeWidth={1.4} />, title: 'Selbstführung', sub: 'Stabilität verkörpern.' },
                  { icon: <Target className="h-[18px] w-[18px]" strokeWidth={1.4} />, title: 'Wirksamkeit', sub: 'Klar handeln.' }
                ].map((item, i) => (
                  <div
                    key={`sys-card-${i}`}
                    className="group relative rounded-xl px-4 py-5 transition-all duration-500 hover:-translate-y-[2px]"
                    style={{
                      background:
                        'linear-gradient(158deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 60%, rgba(0,0,0,0.18) 100%)',
                      border: '1px solid rgba(214, 168, 94, 0.16)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 10px 32px -16px rgba(0,0,0,0.6)'
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-px rounded-[11px] opacity-50"
                      aria-hidden
                      style={{ background: 'linear-gradient(118deg, rgba(255,250,242,0.05) 0%, transparent 55%)' }}
                    />
                    <div
                      className="relative z-[1] mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                      aria-hidden
                      style={{
                        background:
                          'linear-gradient(158deg, rgba(230,193,138,0.18) 0%, rgba(40,28,16,0.6) 65%, rgba(8,6,4,0.92) 100%)',
                        border: '1px solid rgba(214,168,94,0.22)',
                        color: '#E6C18A'
                      }}
                    >
                      {item.icon}
                    </div>
                    <h4
                      className="relative z-[1] m-0"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: '1rem',
                        fontWeight: 500,
                        letterSpacing: '-0.012em',
                        color: HOME_TEXT_CLEAR
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="relative z-[1] m-0 mt-1"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'rgba(234,221,203,0.58)'
                      }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-7 sm:mt-9 flex flex-col items-start gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/erstgespraech');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="metallic-bronze-button btn-bronze group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.95rem]"
                >
                  <span>Strategisches Gespräch anfragen</span>
                  <ArrowRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.5} />
                </button>
                <p
                  className="m-0 pl-0.5 mt-1"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.78rem',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    color: 'rgba(214, 188, 152, 0.56)'
                  }}
                >
                  Konkrete Einordnung deiner Situation.
                </p>
              </div>
            </div>
          </div>

          {/* UNTERER BLOCK: zwei breite Editorial-Cards */}
          <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 sys-fade" style={{ animationDelay: '0.2s' }}>
            {/* Kernversprechen — expandable */}
            <article
              className="relative rounded-2xl p-7 sm:p-8 md:p-9"
              style={{
                background:
                  'linear-gradient(158deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 55%, rgba(0,0,0,0.22) 100%)',
                border: '1px solid rgba(214, 168, 94, 0.18)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 18px 60px -22px rgba(0,0,0,0.65)'
              }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-hidden
                    className="block h-px w-7 shrink-0"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.7) 100%)' }}
                  />
                  <h3
                    className="m-0"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(1.05rem, 0.95rem + 0.4vw, 1.3rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.012em',
                      color: HOME_TEXT_CLEAR
                    }}
                  >
                    Kernversprechen
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label={expandedPanels.promise ? 'Kernversprechen einklappen' : 'Kernversprechen aufklappen'}
                  aria-expanded={!!expandedPanels.promise}
                  onClick={() => setExpandedPanels(prev => ({ ...prev, promise: !prev.promise }))}
                  className="group relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-transparent p-0 outline-none transition-opacity duration-300 hover:opacity-90 focus-visible:ring-1 focus-visible:ring-[rgba(214,168,94,0.5)]"
                  style={{ color: 'rgba(214,168,94,0.78)' }}
                >
                  {expandedPanels.promise ? (
                    <X className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  ) : (
                    <Plus className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  )}
                </button>
              </header>

              <p
                className="m-0 mt-5"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(0.98rem, 0.9rem + 0.3vw, 1.1rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.45,
                  background:
                    'linear-gradient(182deg, #F2E2C0 0%, #D6A85E 32%, #B9823F 58%, #7A4A24 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Transzendenz in ein neues Bewusstsein
              </p>

              <ul className="m-0 p-0 list-none mt-4 flex flex-col gap-2.5">
                {[
                  'Nicht nur Einsicht, sondern innere Ordnung.',
                  'Nicht nur Motivation, sondern Stabilität.',
                  'Nicht nur Impuls, sondern tragfähige Ausrichtung.'
                ].map((line, i) => (
                  <li key={`promise-${i}`} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 block shrink-0"
                      style={{
                        width: '1px',
                        height: '1rem',
                        background:
                          'linear-gradient(180deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.85) 50%, rgba(214,168,94,0) 100%)'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.9375rem',
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: 'rgba(234,221,203,0.76)'
                      }}
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Expandable Bulletpoints */}
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: expandedPanels.promise ? '600px' : '0px',
                  opacity: expandedPanels.promise ? 1 : 0,
                  transition: 'max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, margin-top 0.45s ease',
                  marginTop: expandedPanels.promise ? '1.5rem' : '0'
                }}
              >
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(214,168,94,0.16)' }}
                >
                  <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
                    {[
                      { title: 'Ressourcengewinnung', desc: 'Konditionierte Last fällt ab, frische Energie wird frei.' },
                      { title: 'Souveränität', desc: 'Stabile, ruhige Haltung und fokussierte Präsenz – auch unter Druck.' },
                      { title: 'Handlungsfähigkeit', desc: 'Klares Erkennen statt Grübeln. Konsequente Umsetzung statt Zögern.' }
                    ].map((b, i) => (
                      <li key={`promise-bullet-${i}`} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{
                            background: 'linear-gradient(180deg, #F2E2C0 0%, #B9823F 100%)',
                            boxShadow: '0 0 8px rgba(214,168,94,0.4)'
                          }}
                        />
                        <div className="min-w-0">
                          <p
                            className="m-0"
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              letterSpacing: '-0.008em',
                              color: HOME_TEXT_CLEAR
                            }}
                          >
                            {b.title}
                          </p>
                          <p
                            className="m-0 mt-0.5"
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: '0.875rem',
                              fontWeight: 400,
                              lineHeight: 1.6,
                              color: 'rgba(234,221,203,0.62)'
                            }}
                          >
                            {b.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* Das „Wie“ — expandable */}
            <article
              className="relative rounded-2xl p-7 sm:p-8 md:p-9"
              style={{
                background:
                  'linear-gradient(158deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 55%, rgba(0,0,0,0.22) 100%)',
                border: '1px solid rgba(214, 168, 94, 0.18)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 18px 60px -22px rgba(0,0,0,0.65)'
              }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-hidden
                    className="block h-px w-7 shrink-0"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.7) 100%)' }}
                  />
                  <h3
                    className="m-0"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(1.05rem, 0.95rem + 0.4vw, 1.3rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.012em',
                      color: HOME_TEXT_CLEAR
                    }}
                  >
                    Das „Wie“ macht den Unterschied
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label={expandedPanels.how ? 'Details einklappen' : 'Details aufklappen'}
                  aria-expanded={!!expandedPanels.how}
                  onClick={() => setExpandedPanels(prev => ({ ...prev, how: !prev.how }))}
                  className="group relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-transparent p-0 outline-none transition-opacity duration-300 hover:opacity-90 focus-visible:ring-1 focus-visible:ring-[rgba(214,168,94,0.5)]"
                  style={{ color: 'rgba(214,168,94,0.78)' }}
                >
                  {expandedPanels.how ? (
                    <X className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  ) : (
                    <Plus className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  )}
                </button>
              </header>

              <p
                className="m-0 mt-5"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 0.9rem + 0.22vw, 1.05rem)',
                  fontWeight: 400,
                  lineHeight: 1.72,
                  color: 'rgba(234,221,203,0.78)'
                }}
              >
                Die Besonderheit liegt nicht im Wissen allein, sondern in der
                Art der Vermittlung: verkörpert, präzise, energetisierend und
                auf reale Lebens- und Business-Herausforderungen
                ausgerichtet.
              </p>

              {/* Expandable Bulletpoints */}
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: expandedPanels.how ? '700px' : '0px',
                  opacity: expandedPanels.how ? 1 : 0,
                  transition: 'max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, margin-top 0.45s ease',
                  marginTop: expandedPanels.how ? '1.5rem' : '0'
                }}
              >
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(214,168,94,0.16)' }}
                >
                  <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
                    {[
                      { title: 'Laser-scharfe Klarheit', desc: 'Wir nutzen eine präzise Sprache, die Gedanken und Emotionen sofort ordnet.' },
                      { title: 'Verkörperte Energie', desc: 'Das Miteinander ist wach, belebend und modern.' },
                      { title: 'Saubere Synthese', desc: 'Spirituelle Tiefe und greifbare Resultate bilden eine synergetische Wirkungslinie.' },
                      { title: 'Maßgeschneiderte Konsequenz', desc: 'Wir gestalten Schritte, die deiner wahren Natur entsprechen und im echten Leben bestehen.' }
                    ].map((b, i) => (
                      <li key={`how-bullet-${i}`} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{
                            background: 'linear-gradient(180deg, #F2E2C0 0%, #B9823F 100%)',
                            boxShadow: '0 0 8px rgba(214,168,94,0.4)'
                          }}
                        />
                        <div className="min-w-0">
                          <p
                            className="m-0"
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              letterSpacing: '-0.008em',
                              color: HOME_TEXT_CLEAR
                            }}
                          >
                            {b.title}
                          </p>
                          <p
                            className="m-0 mt-0.5"
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: '0.875rem',
                              fontWeight: 400,
                              lineHeight: 1.6,
                              color: 'rgba(234,221,203,0.62)'
                            }}
                          >
                            {b.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Wo Klarheit wirkt — Editorial Premium Cards (matched to „Präzision trifft Tiefe“) */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: '#000000' }}
        data-section
        data-section-id="clarity-areas"
      >
        <style>{`
          @keyframes clarityFade {
            from { opacity: 0; transform: translate3d(0, 14px, 0); filter: blur(4px); }
            to   { opacity: 1; transform: translate3d(0, 0, 0);  filter: blur(0); }
          }
          .clarity-fade { animation: clarityFade 1.05s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .clarity-fade { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
          }
          .clarity-card {
            transition:
              transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
              border-color 500ms ease,
              box-shadow 500ms ease,
              background 500ms ease;
          }
          .clarity-card:hover {
            transform: translateY(-2px);
            border-color: rgba(214,168,94,0.32) !important;
            box-shadow:
              0 22px 60px -28px rgba(0,0,0,0.85),
              0 0 0 1px rgba(214,168,94,0.10) inset,
              0 0 60px -30px rgba(214,168,94,0.45) !important;
          }
          .clarity-card .clarity-hover-glow { opacity: 0; transition: opacity 600ms ease; }
          .clarity-card:hover .clarity-hover-glow,
          .clarity-card[data-open="true"] .clarity-hover-glow { opacity: 1; }
          .clarity-index {
            font-feature-settings: "tnum", "lnum";
          }
          .clarity-expand-grid {
            display: grid;
            transition: grid-template-rows 520ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          @media (prefers-reduced-motion: reduce) {
            .clarity-expand-grid { transition: none !important; }
          }
        `}</style>

        {/* Atmosphärischer Hairline-Top (oberer Übergang) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px z-[2]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.22) 18%, rgba(214,168,94,0.42) 50%, rgba(214,168,94,0.22) 82%, rgba(214,168,94,0) 100%)'
          }}
        />

        {/* Background-Bild — volle Tiefenwirkung, scharf, nur saubere Section-Kanten */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div className="relative mx-auto h-full max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="absolute inset-y-0 overflow-hidden -left-6 -right-6 sm:-left-8 sm:-right-8 md:-left-12 md:-right-12 lg:-left-16 lg:-right-16 xl:-left-[5.5rem] xl:-right-[5.5rem]">
              {/* Bild – scharf, kein Blur, kräftige Tiefe */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/clarity-stone-veil-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 1,
                  filter: 'saturate(1.02) contrast(1.04)'
                }}
              />
              {/* Sehr leichte Dunkel-Lasur – verankert die Section ohne Tiefe zu killen */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.16)' }}
              />
              {/* Top-Fade – weicher Übergang zur vorherigen Section */}
              <div
                className="absolute inset-x-0 top-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Bottom-Fade – weicher Übergang zur nächsten Section */}
              <div
                className="absolute inset-x-0 bottom-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesbarkeits-Scrim hinter dem Header (linksbündig) – High-End-Typo bleibt lesbar, Steinstruktur bleibt sichtbar */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 right-0 lg:right-[35%] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 35%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0) 100%)'
          }}
        />

        <div
          className={`relative z-[1] mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 transition-[padding-bottom] duration-500 ease-out motion-reduce:transition-none ${
            expandedClarityAreaId
              ? 'pb-16 sm:pb-20 md:pb-24 lg:pb-28'
              : 'pb-12 sm:pb-16 md:pb-20 lg:pb-24'
          }`}
        >

          {/* HEADER — Editorial, linksbündig, Eyebrow + Headline + Lead */}
          <header className="clarity-fade max-w-[68rem]">
            {/* Premium Eyebrow */}
            <div className="flex items-center gap-3 mb-6 sm:mb-7">
              <span
                aria-hidden
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.55) 60%, rgba(214,168,94,0.9) 100%)'
                }}
              />
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #F2E2C0 0%, #D6A85E 45%, #B9823F 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter:
                    'drop-shadow(0 1px 8px rgba(0,0,0,0.7)) drop-shadow(0 0 12px rgba(185,130,63,0.18))'
                }}
              >
                Orientierung
              </span>
            </div>

            {/* Editorial Headline */}
            <h2
              className="m-0 tracking-tight"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 1.3rem + 2.6vw, 3.6rem)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                color: HOME_TEXT_CLEAR,
                textShadow:
                  '0 2px 18px rgba(0,0,0,0.85), 0 6px 36px rgba(0,0,0,0.55), 0 0 28px rgba(185,130,63,0.10)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>Wo </span>
              <span
                style={{
                  fontWeight: 400,
                  background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Klarheit
              </span>
              <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}> wirkt.</span>
            </h2>

            {/* Lead */}
            <p
              className="m-0 mt-6 sm:mt-7 max-w-[42rem]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 0.85rem + 0.3vw, 1.075rem)',
                fontWeight: 300,
                letterSpacing: '-0.005em',
                lineHeight: 1.62,
                color: 'rgba(234,221,203,0.92)',
                textShadow: '0 2px 14px rgba(0,0,0,0.75), 0 0 22px rgba(0,0,0,0.4)'
              }}
            >
              Fünf Felder, in denen innere Ordnung nach außen trägt —
              <span style={{ color: 'rgba(255,250,242,0.98)' }}> ruhig, präzise, mit Maß.</span>
            </p>

            {/* Hairline Divider */}
            <div
              className="mt-10 sm:mt-12 h-px w-full"
              aria-hidden
              style={{
                background:
                  'linear-gradient(90deg, rgba(214,168,94,0.32) 0%, rgba(214,168,94,0.10) 38%, rgba(255,255,255,0.04) 70%, rgba(255,255,255,0) 100%)'
              }}
            />
          </header>

          {/* GRID — fünf Editorial-Cards
              Geöffnetes Detail fließt im Dokument: die Section wächst, alle Punkte bleiben lesbar.
              items-start: geschlossene Karten behalten ihre Höhe. */}
          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-5 items-start">
            {woKlarheitAreas.map((area, idx) => {
              const open = expandedClarityAreaId === area.id;
              const indexLabel = String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={area.id}
                  className="clarity-fade flex min-w-0 flex-col"
                  style={{ animationDelay: `${0.06 * idx + 0.05}s` }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`clarity-area-${area.id}`}
                    id={`clarity-area-trigger-${area.id}`}
                    onClick={() =>
                      setExpandedClarityAreaId(prev => (prev === area.id ? null : area.id))
                    }
                    data-open={open}
                    className="clarity-card group relative w-full shrink-0 text-left rounded-2xl outline-none focus-visible:ring-1 focus-visible:ring-[rgba(214,168,94,0.55)] flex flex-col"
                    style={{
                      padding: 'clamp(1.1rem, 0.85rem + 0.7vw, 1.4rem)',
                      minHeight: 'clamp(15.5rem, 14rem + 3vw, 18rem)',
                      background:
                        'linear-gradient(165deg, rgba(18,14,10,0.78) 0%, rgba(10,8,6,0.72) 52%, rgba(0,0,0,0.82) 100%)',
                      border: open
                        ? '1px solid rgba(214,168,94,0.42)'
                        : '1px solid rgba(214,168,94,0.20)',
                      boxShadow: open
                        ? '0 26px 70px -28px rgba(0,0,0,0.92), 0 0 0 1px rgba(214,168,94,0.12) inset, 0 0 70px -28px rgba(214,168,94,0.45)'
                        : '0 20px 50px -24px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.02) inset',
                      backdropFilter: 'blur(14px) saturate(1.08)',
                      WebkitBackdropFilter: 'blur(14px) saturate(1.08)'
                    }}
                  >
                    {/* Soft Hover-Glow */}
                    <span
                      aria-hidden
                      className="clarity-hover-glow pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          'radial-gradient(60% 70% at 50% 0%, rgba(214,168,94,0.10) 0%, rgba(214,168,94,0) 70%)'
                      }}
                    />

                    {/* Index + Chevron */}
                    <div className="relative flex items-start justify-between gap-3">
                      <span
                        className="clarity-index"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          letterSpacing: '0.18em',
                          color: 'rgba(214,168,94,0.7)'
                        }}
                      >
                        {indexLabel}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-out ${
                          open ? 'rotate-180' : 'rotate-0'
                        }`}
                        strokeWidth={1.4}
                        style={{ color: 'rgba(214,168,94,0.55)' }}
                        aria-hidden
                      />
                    </div>

                    {/* Titel — fixe min-height für identische Karten-Optik trotz unterschiedlicher Titellängen */}
                    <h3
                      className="relative m-0 mt-6 flex items-end"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 'clamp(1.05rem, 0.95rem + 0.35vw, 1.2rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.18,
                        color: HOME_TEXT_CLEAR,
                        textShadow: '0 1px 8px rgba(0,0,0,0.55)',
                        minHeight: '2.6em'
                      }}
                    >
                      <span>{area.title}</span>
                    </h3>

                    {/* Hairline Underline */}
                    <div
                      className="relative mt-3 h-px w-10"
                      aria-hidden
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(214,168,94,0.75) 0%, rgba(214,168,94,0.1) 100%)'
                      }}
                    />

                    {/* Teaser — flex-grow füllt den Mittelteil, line-clamp hält Höhe konsistent */}
                    <p
                      className="relative m-0 mt-3.5 line-clamp-3 flex-1"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.8125rem',
                        fontWeight: 300,
                        lineHeight: 1.58,
                        letterSpacing: '-0.002em',
                        color: 'rgba(234,221,203,0.82)'
                      }}
                    >
                      {area.points[0]}
                    </p>

                    {/* Reveal Hint — immer am Footer */}
                    <div
                      className="relative mt-4 flex items-center gap-2"
                      aria-hidden
                    >
                      <span
                        className="h-px w-5"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: open
                            ? 'rgba(230,193,138,0.9)'
                            : 'rgba(234,221,203,0.42)'
                        }}
                      >
                        {open ? 'Schließen' : 'Einblick'}
                      </span>
                    </div>
                  </button>

                  {/* Detail-Panel — im Flow: Section/Höhe wächst, sanfte Höhen-Animation */}
                  <div
                    className="clarity-expand-grid min-w-0"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        id={`clarity-area-${area.id}`}
                        role="region"
                        aria-labelledby={`clarity-area-trigger-${area.id}`}
                        aria-hidden={!open}
                        className={`overflow-hidden transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <div
                          className="mt-2.5 rounded-xl px-4 py-4 sm:px-4 sm:py-4"
                          style={{
                            background:
                              'linear-gradient(160deg, rgba(18,14,10,0.94) 0%, rgba(8,6,4,0.88) 45%, rgba(0,0,0,0.82) 100%)',
                            border: '1px solid rgba(214,168,94,0.22)',
                            boxShadow:
                              '0 22px 56px -20px rgba(0,0,0,0.92), 0 0 0 1px rgba(214,168,94,0.08) inset',
                            backdropFilter: 'blur(16px) saturate(1.08)',
                            WebkitBackdropFilter: 'blur(16px) saturate(1.08)'
                          }}
                        >
                          <ul className="m-0 list-none space-y-3.5">
                            {area.points.map((pt, ptIdx) => (
                              <li key={`${area.id}-pt-${ptIdx}`} className="flex gap-3">
                                <span
                                  aria-hidden
                                  className="mt-[0.52rem] block h-px w-3.5 shrink-0"
                                  style={{
                                    background:
                                      'linear-gradient(90deg, rgba(214,168,94,0.85) 0%, rgba(214,168,94,0) 100%)'
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontSize: '0.78rem',
                                    fontWeight: 300,
                                    lineHeight: 1.62,
                                    letterSpacing: '-0.002em',
                                    color: 'rgba(234,221,203,0.93)'
                                  }}
                                >
                                  {pt}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF — Editorial Whisper Testimonials ── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: '#000000' }}
        data-section
        data-section-id="voices"
      >
        <style>{`
          @keyframes voicesFade {
            from { opacity: 0; transform: translate3d(0, 14px, 0); filter: blur(4px); }
            to   { opacity: 1; transform: translate3d(0, 0, 0);  filter: blur(0); }
          }
          .voices-fade { animation: voicesFade 1.05s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .voices-fade { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
          }
          .voice-card {
            transition:
              transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
              border-color 500ms ease,
              box-shadow 500ms ease;
          }
          .voice-card:hover {
            transform: translateY(-2px);
            border-color: rgba(214,168,94,0.32) !important;
            box-shadow:
              0 26px 70px -30px rgba(0,0,0,0.92),
              0 0 0 1px rgba(214,168,94,0.10) inset,
              0 0 60px -30px rgba(214,168,94,0.40) !important;
          }
        `}</style>

        {/* Hairline-Top — gleiche Sprache wie Clarity / Deep-Dive */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px z-[3]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.22) 18%, rgba(214,168,94,0.42) 50%, rgba(214,168,94,0.22) 82%, rgba(214,168,94,0) 100%)'
          }}
        />

        {/* Background-Bild — wie „Wo Klarheit wirkt“: max-width-Container, nicht full-bleed; scharf, volle Tiefe */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div className="relative mx-auto h-full max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="absolute inset-y-0 overflow-hidden -left-6 -right-6 sm:-left-8 sm:-right-8 md:-left-12 md:-right-12 lg:-left-16 lg:-right-16 xl:-left-[5.5rem] xl:-right-[5.5rem]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/voices-threadstone-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 1,
                  filter: 'saturate(1.03) contrast(1.05)'
                }}
              />
              {/* Leichte Lasur nur zur Lesbarkeit — kein Weichzeichnen des Motivs */}
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.14)' }} />
              <div
                className="absolute inset-x-0 top-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-36 sm:h-44"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesbarkeits-Scrim links — Headline & Lead bleiben editorial lesbar */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 right-0 lg:right-[30%] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* Unterer Bereich etwas gebunden — Zitat-Karten bleiben sauber lesbar */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] max-h-[28rem] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0) 100%)'
          }}
        />

        <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-16 pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-14 sm:pb-16 md:pb-20 lg:pb-24">

          {/* HEADER */}
          <header className="voices-fade max-w-[68rem]">
            <h2
              className="m-0 tracking-tight"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 1.3rem + 2.6vw, 3.6rem)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                color: HOME_TEXT_CLEAR,
                textShadow:
                  '0 2px 18px rgba(0,0,0,0.88), 0 6px 32px rgba(0,0,0,0.55), 0 0 26px rgba(185,130,63,0.08)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>Stimmen aus der </span>
              <span
                style={{
                  fontWeight: 400,
                  background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Begleitung
              </span>
              <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>.</span>
            </h2>

            <p
              className="m-0 mt-6 sm:mt-7 max-w-[40rem]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 0.85rem + 0.3vw, 1.075rem)',
                fontWeight: 300,
                letterSpacing: '-0.005em',
                lineHeight: 1.62,
                color: 'rgba(234,221,203,0.9)',
                textShadow: '0 2px 14px rgba(0,0,0,0.72), 0 0 22px rgba(0,0,0,0.35)'
              }}
            >
              Kurze Aussagen aus der Arbeit — ohne Inszenierung.
              <span style={{ color: 'rgba(255,250,242,0.92)' }}> Was sich nachhaltig verschoben hat.</span>
            </p>

            <div
              className="mt-10 sm:mt-12 h-px w-full"
              aria-hidden
              style={{
                background:
                  'linear-gradient(90deg, rgba(214,168,94,0.32) 0%, rgba(214,168,94,0.10) 38%, rgba(255,255,255,0.04) 70%, rgba(255,255,255,0) 100%)'
              }}
            />
          </header>

          {/* TESTIMONIAL GRID — schlicht, klein, edel, vier in einer Reihe */}
          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 items-start">
            {[
              {
                quote: 'Alles fühlt sich wieder geordnet und tragfähig an.',
                name: 'M. K.',
                role: 'Unternehmerin · Zürich'
              },
              {
                quote: 'Entscheidungen sind wieder leicht — nicht leichtfertig.',
                name: 'T. R.',
                role: 'CEO · Hamburg'
              },
              {
                quote: 'Ruhe, Präsenz — und eine Linie, die ich spüre.',
                name: 'S. F.',
                role: 'Coach · München'
              },
              {
                quote: 'Es verschiebt nicht nur Gedanken — sondern wie ich den Tag trage.',
                name: 'D. B.',
                role: 'Gründer · Berlin'
              }
            ].map((t, idx) => (
              <figure
                key={`voice-${idx}`}
                className="voices-fade m-0"
                style={{ animationDelay: `${0.07 * idx + 0.05}s` }}
              >
                <div
                  className="voice-card relative w-full rounded-xl flex flex-col"
                  style={{
                    padding: 'clamp(1rem, 0.85rem + 0.45vw, 1.25rem)',
                    background:
                      'linear-gradient(165deg, rgba(14,11,8,0.82) 0%, rgba(6,5,4,0.78) 55%, rgba(0,0,0,0.86) 100%)',
                    border: '1px solid rgba(214,168,94,0.2)',
                    boxShadow: '0 16px 42px -26px rgba(0,0,0,0.88), 0 0 0 1px rgba(255,255,255,0.025) inset',
                    backdropFilter: 'blur(14px) saturate(1.08)',
                    WebkitBackdropFilter: 'blur(14px) saturate(1.08)',
                    minHeight: 'clamp(10.5rem, 9.5rem + 2vw, 12rem)'
                  }}
                >
                  {/* Quote-Mark — sehr klein, hochwertig */}
                  <span
                    aria-hidden
                    className="leading-none"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: '1.05rem',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      background:
                        'linear-gradient(180deg, #E6C18A 0%, #B9823F 80%, #6A4A22 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.75,
                      display: 'inline-block'
                    }}
                  >
                    ”
                  </span>

                  <blockquote
                    className="m-0 mt-2 flex-1"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.85rem, 0.8rem + 0.18vw, 0.95rem)',
                      fontWeight: 300,
                      letterSpacing: '-0.012em',
                      lineHeight: 1.5,
                      color: 'rgba(248,241,226,0.97)',
                      textShadow:
                        '0 1px 10px rgba(0,0,0,0.65), 0 2px 20px rgba(0,0,0,0.45)'
                    }}
                  >
                    {t.quote}
                  </blockquote>

                  {/* Bronze Hairline */}
                  <div
                    className="mt-4 h-px w-8"
                    aria-hidden
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(214,168,94,0.75) 0%, rgba(214,168,94,0.08) 100%)'
                    }}
                  />

                  <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: 'rgba(140,138,135,0.92)'
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.625rem',
                        fontWeight: 400,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(234,221,203,0.4)'
                      }}
                    >
                      · {t.role}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — „Ein Gespräch kann viel ordnen“ ── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: '#000000' }}
        data-section
        data-section-id="final-cta"
      >
        <style>{`
          @keyframes ctaFade {
            from { opacity: 0; transform: translate3d(0, 14px, 0); filter: blur(4px); }
            to   { opacity: 1; transform: translate3d(0, 0, 0);  filter: blur(0); }
          }
          .cta-fade { animation: ctaFade 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .cta-fade { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
          }
          .cta-primary {
            transition:
              transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 500ms ease,
              background 500ms ease,
              border-color 500ms ease;
          }
          .cta-primary:hover {
            transform: translateY(-2px);
            box-shadow:
              0 28px 70px -28px rgba(0,0,0,0.85),
              0 0 0 1px rgba(244,239,231,0.5) inset,
              0 0 0 1px rgba(230,193,138,0.1) inset,
              0 0 38px rgba(214,168,94,0.45),
              0 0 90px rgba(185,130,63,0.28) !important;
          }
          .cta-secondary {
            transition:
              transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
              border-color 500ms ease,
              color 500ms ease,
              background 500ms ease;
          }
          .cta-secondary:hover {
            transform: translateY(-2px);
            border-color: rgba(214,168,94,0.45) !important;
            color: #F4F4F4 !important;
            background: rgba(214,168,94,0.06) !important;
          }
        `}</style>

        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(55% 60% at 50% 50%, rgba(214,168,94,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(40% 55% at 80% 100%, rgba(90,60,30,0.10) 0%, rgba(0,0,0,0) 60%)'
          }}
        />
        {/* Hairline-Top */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.20) 20%, rgba(214,168,94,0.38) 50%, rgba(214,168,94,0.20) 80%, rgba(214,168,94,0) 100%)'
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[920px] px-6 sm:px-8 md:px-12 lg:px-16 pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-14 sm:pb-16 md:pb-20 lg:pb-24 text-center">

          {/* Headline */}
          <h2
            className="cta-fade m-0 mx-auto tracking-tight"
            style={{
              animationDelay: '0.08s',
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(2.2rem, 1.4rem + 2.8vw, 3.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.042em',
              lineHeight: 1.04,
              color: HOME_TEXT_CLEAR,
              textShadow: '0 2px 24px rgba(0,0,0,0.75), 0 0 30px rgba(185,130,63,0.10)',
              maxWidth: '22ch',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>Ein </span>
            <span
              style={{
                fontWeight: 400,
                background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Gespräch
            </span>
            <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}> ordnet viel.</span>
          </h2>

          {/* Subline */}
          <p
            className="cta-fade m-0 mt-7 sm:mt-8 mx-auto"
            style={{
              animationDelay: '0.16s',
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.98rem, 0.88rem + 0.32vw, 1.125rem)',
              fontWeight: 300,
              letterSpacing: '-0.005em',
              lineHeight: 1.62,
              color: 'rgba(140,138,135,0.92)',
              maxWidth: '38rem',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)'
            }}
          >
            Reservieren Sie ein Erstgespräch — vertraulich.
            <span style={{ color: 'rgba(255,250,242,0.95)' }}> Wir klären, was jetzt trägt.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className="cta-fade mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            style={{ animationDelay: '0.24s' }}
          >
            <button
              type="button"
              onClick={() => {
                const bookingSection = document.querySelector('[data-section="booking"]');
                if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else window.location.href = '/booking';
              }}
              className="cta-primary group relative inline-flex items-center justify-center gap-2.5 rounded-[14px]"
              style={{
                padding: '0.95rem 1.85rem',
                background:
                  'linear-gradient(180deg, rgba(244,239,231,0.16) 0%, rgba(230,193,138,0.10) 55%, rgba(214,168,94,0.06) 100%)',
                border: '1px solid rgba(230,193,138,0.34)',
                boxShadow:
                  '0 1px 0 rgba(244,239,231,0.35) inset, 0 0 0 1px rgba(230,193,138,0.06) inset, 0 0 22px rgba(214,168,94,0.20), 0 0 60px rgba(185,130,63,0.10), 0 6px 18px rgba(0,0,0,0.4)'
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px] overflow-hidden"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(244,239,231,0.20) 0%, rgba(244,239,231,0) 45%)'
                }}
              />
              <span
                className="relative"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  letterSpacing: '0.005em',
                  color: '#FFFAF2'
                }}
              >
                Zeit reservieren
              </span>
              <ArrowRight
                className="relative h-4 w-4 transition-transform duration-400 group-hover:translate-x-[3px]"
                strokeWidth={2}
                style={{ color: '#FFFAF2' }}
                aria-hidden
              />
            </button>

            <a
              href="/kontakt"
              className="cta-secondary inline-flex items-center justify-center gap-2 rounded-[14px]"
              style={{
                padding: '0.95rem 1.65rem',
                background: 'transparent',
                border: '1px solid rgba(214,168,94,0.22)',
                color: 'rgba(140,138,135,0.92)',
                fontFamily: FONT_BODY,
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.005em'
              }}
            >
              Nachricht senden
            </a>
          </div>

          {/* Trust Line */}
          <p
            className="cta-fade m-0 mt-8 sm:mt-10"
            style={{
              animationDelay: '0.32s',
              fontFamily: FONT_BODY,
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(214,188,152,0.55)',
              textShadow: '0 0 18px rgba(185,130,63,0.12)'
            }}
          >
            Vertraulich · Unverbindlich · Kostenfrei
          </p>
        </div>

        {/* Weicher Übergang in den Footer — keine harte Kante */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-44 z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)'
          }}
        />
      </section>

      {/* 🎯 SEKTION 3 – LEHRERBILD & USP — DEPRECATED (entfernt, mit Deep-Dive fusioniert) */}
      {false && (
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
                    textShadow: '0 4px 40px rgba(185, 130, 63, 0.22)'
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
                        background: 'rgba(185, 130, 63, 0.06)',
                        border: '1px solid rgba(185, 130, 63, 0.18)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.22)'
                      }}
                    >
                      <div
                        className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #B9823F 0%, #8A5528 100%)',
                          boxShadow: '0 2px 8px rgba(185, 130, 63, 0.18)'
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
                  className="metallic-bronze-button btn-bronze group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.95rem]"
                >
                  <span>Erstgespräch anfragen</span>
                  <ArrowRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.5} />
                </button>
                <p
                  className="m-0 pl-0.5 text-[10px] font-medium leading-relaxed tracking-[0.12em] uppercase"
                  style={{
                    color: 'rgba(214, 188, 152, 0.55)',
                    textShadow: '0 0 20px rgba(185, 130, 63, 0.12)'
                  }}
                >
                  Kurz · vertraulich · mit klarer Orientierung
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
                border: expandedPanels.promise ? '1px solid rgba(185, 130, 63, 0.4)' : '1px solid rgba(185, 130, 63, 0.2)',
                boxShadow: expandedPanels.promise ? '0 12px 40px rgba(185, 130, 63, 0.15)' : '0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #B9823F 0%, #8A5528 100%)'
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
                        background: 'rgba(185, 130, 63, 0.08)',
                        border: '1px solid rgba(185, 130, 63, 0.15)'
                      }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(135deg, #B9823F 0%, #8A5528 100%)'
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
                background: 'linear-gradient(135deg, rgba(185, 130, 63, 0.12) 0%, rgba(122, 74, 36, 0.08) 100%)',
                border: expandedPanels.how ? '1px solid rgba(185, 130, 63, 0.4)' : '1px solid rgba(185, 130, 63, 0.2)',
                boxShadow: expandedPanels.how ? '0 12px 40px rgba(185, 130, 63, 0.15)' : '0 8px 24px rgba(0,0,0,0.3)',
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
                        border: '1px solid rgba(185, 130, 63, 0.15)'
                      }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(135deg, #B9823F 0%, #8A5528 100%)'
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
                className="metallic-bronze-button btn-bronze group inline-flex items-center gap-2 px-6 py-3 text-sm"
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
      )}


      {/* ⚓ IDENTITÄTS-ANKER — Editorial Variant (matched zu Wo Klarheit wirkt / Final CTA) */}
      {anchor && anchor.mainText && (
        <section
          className="relative isolate overflow-hidden"
          style={{ backgroundColor: '#000000' }}
          data-section
          data-section-id="anchor"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                'radial-gradient(50% 60% at 50% 50%, rgba(214,168,94,0.06) 0%, rgba(0,0,0,0) 60%)'
            }}
          />
          <div className="relative z-[1] mx-auto max-w-[820px] px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
            <p
              className="m-0"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(1.55rem, 1.05rem + 1.8vw, 2.4rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.22,
                color: HOME_TEXT_CLEAR,
                textShadow: '0 2px 18px rgba(0,0,0,0.7)'
              }}
            >
              <span
                style={{
                  fontWeight: 400,
                  background: 'linear-gradient(180deg, #F2E2C0 0%, #D6A85E 38%, #B9823F 70%, #8A5528 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {anchor.mainText}
              </span>
            </p>

            {anchor.secondaryText && (
              <p
                className="m-0 mt-6"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 0.85rem + 0.3vw, 1.075rem)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(234,221,203,0.76)'
                }}
              >
                {anchor.secondaryText}
              </p>
            )}

            {anchor.authorName && (
              <p
                className="m-0 mt-8"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(214,188,152,0.65)'
                }}
              >
                {anchor.authorName}
              </p>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
