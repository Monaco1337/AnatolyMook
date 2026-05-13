import { useState, useEffect, useMemo, useRef, useId, type ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronsRight, ChevronDown, Sparkles, Award, Users, Star, TrendingUp, Check, Target, Brain, Heart, Shield, Play, Calendar, Zap, Book, ChevronLeft, ChevronRight, Plus, Minus, AlertCircle, Eye, Repeat, Crown, TrendingDown, Waves, Puzzle, Pause, X, Compass, Lightbulb, Cog, MousePointerClick, Activity, Diamond } from 'lucide-react';
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

/** Unter dem Hero: drei kuratierte Einstiegskacheln (ruhig, editorial, ohne Slider). */
const HOME_MEISTERSCHAFT_WAYS: {
  label: string;
  body: string;
  cta: string;
  to: string;
  imageSrc: string;
  imageClassName: string;
}[] = [
  {
    label: 'ONLINE',
    body: 'Für Menschen, die Orientierung in ihren Alltag integrieren möchten.',
    cta: 'Portfolio ansehen',
    to: '/formate',
    imageSrc: '/images/home/wirkung-pier.png',
    imageClassName:
      'h-full w-full object-cover object-[50%_44%]'
  },
  {
    label: 'SEMINARE',
    body: 'Verdichtete Räume für Klarheit, Neuordnung und bewusste Ausrichtung.',
    cta: 'Seminare entdecken',
    to: '/seminare',
    imageSrc: '/images/home/fuehrung-boardroom.png',
    imageClassName:
      'h-full w-full object-cover object-[48%_46%]'
  },
  {
    label: '1:1 FÜHRUNG',
    body: 'Präzise persönliche Begleitung für tiefgreifende innere Neuordnung.',
    cta: 'Exklusive Begleitung',
    to: '/coaching',
    imageSrc: '/images/home/stabilitaet-berg.png',
    imageClassName:
      'h-full w-full object-cover object-[52%_38%]'
  }
];

/** Supabase kann ohne Timeout blockieren → Startseite bleibt sonst im Loading-State (schwarzer Vollbild-Hintergrund). */
const HOME_FETCH_TIMEOUT_MS = 15000;

/** Homepage: Überschriften — Montserrat */
const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
/** Homepage: Fließtext — Avenir Next (Systemstack auf macOS/iOS, sensible Fallbacks) */
const FONT_BODY =
  "'Avenir Next', 'Avenir Next LT Pro', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const HOME_TEXT_CLEAR = '#F4F4F4';

const TRANSFORM_ROWS: { from: string; to: string }[] = [
  { from: 'Reaktiv', to: 'Klar in Entscheidungen' },
  { from: 'Getrieben', to: 'Souverän in Führung' },
  { from: 'Unruhig', to: 'Stabil unter Druck' },
  { from: 'Zerrissen', to: 'Fokussiert im Handeln' },
  { from: 'Zweifelnd', to: 'Handlungsklar' },
  { from: 'Operativ gebunden', to: 'Strategisch klar' }
];

function HomeTrustWirkIconFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex size-[3.125rem] shrink-0 items-center justify-center sm:size-[3.375rem] rounded-[12px] border sm:rounded-[14px]"
      style={{
        borderColor: 'rgba(230, 193, 138, 0.18)',

        boxShadow:
          '0 0 36px -10px rgba(185, 130, 63, 0.42), inset 0 1px 0 rgba(255, 248, 238, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.38)'
      }}
      aria-hidden
    >
      <span
        className="pointer-events-none absolute inset-px rounded-[11px] opacity-[0.5] sm:rounded-[13px]"
       
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

/**
 * Mobile-only horizontal slider — bestimmt anhand der Scroll-Position des Containers,
 * welche Karte aktuell zentriert ist (closest-to-center). Wird ausschließlich für
 * Pagination-Dots auf kleinen Viewports verwendet; auf Desktop läuft kein Listener.
 */
function useMobileSliderIndex(
  ref: React.RefObject<HTMLElement | null>,
  count: number,
  /** Maximaler Viewport in px, bei dem der Slider aktiv ist (sm = 640, md = 768). */
  maxViewport: number = 768
) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let active = window.innerWidth < maxViewport;

    const compute = () => {
      raf = 0;
      const containerRect = el.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < children.length; i++) {
        const r = children[i].getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setIdx(best);
    };

    const onScroll = () => {
      if (!active) return;
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    const onResize = () => {
      active = window.innerWidth < maxViewport;
      if (active) compute();
    };

    compute();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [ref, count, maxViewport]);

  return idx;
}

/** Dezente Bronze-Pagination, nur auf Mobile sichtbar. */
function MobileSliderDots({
  count,
  active,
  hideAt = 'md'
}: {
  count: number;
  active: number;
  hideAt?: 'sm' | 'md' | 'lg';
}) {
  const hiddenClass =
    hideAt === 'sm' ? 'sm:hidden' : hideAt === 'lg' ? 'lg:hidden' : 'md:hidden';
  return (
    <div
      role="tablist"
      aria-label="Slider Navigation"
      className={`mt-6 flex items-center justify-center gap-2 ${hiddenClass}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <span
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-hidden
            className="block h-1 rounded-full transition-all duration-500 ease-out"
            style={{
              width: isActive ? '22px' : '6px',
              backgroundColor: isActive
                ? 'rgba(214, 168, 94, 0.85)'
                : 'rgba(234, 221, 203, 0.20)',
              boxShadow: isActive
                ? '0 0 12px rgba(214, 168, 94, 0.45)'
                : 'none'
            }}
          />
        );
      })}
    </div>
  );
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
  const [expandedClarityAreaId, setExpandedClarityAreaId] = useState<string | null>(null);

  // Mobile-Only Aufklapp-State für Manifest-Kapitel (Desktop ignoriert diesen State)
  const [manifestK1Expanded, setManifestK1Expanded] = useState(false);
  const [manifestK2Expanded, setManifestK2Expanded] = useState(false);

  // Mobile-Only Slider-Refs (Premium Swipe Carousels für drei Home-Sections)
  const mobileWaysRef = useRef<HTMLDivElement>(null);
  const mobileClarityRef = useRef<HTMLDivElement>(null);
  const mobileVoicesRef = useRef<HTMLDivElement>(null);
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

  // Mobile-Slider Indizes (nur < md / < sm aktiv — auf Desktop ohne Overhead)
  const activeWaysIndex = useMobileSliderIndex(mobileWaysRef, HOME_MEISTERSCHAFT_WAYS.length, 768);
  const activeClarityIndex = useMobileSliderIndex(mobileClarityRef, woKlarheitAreas.length, 640);
  const activeVoicesIndex = useMobileSliderIndex(mobileVoicesRef, 4, 640);

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
      quote:
        'Der Eintritt in erwachte Präsenz, bewusste Selbstführung und gelebte Wirkkraft.',
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
    <div className="home-scroll-flow cinematic-home" style={{ backgroundColor: colors.bg.primary }}>
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
              /* Mobile: Content-Block sitzt bündig unten-links — Premium Editorial.
                 Bottom-Anchor löst „klebt oben am Rand und überschneidet Gesicht" auf. */
              .hero-content-shell {
                top: auto !important;
                bottom: 0 !important;
                padding-top: 0 !important;
                padding-bottom: max(clamp(1.75rem, 4.5vh, 3rem), calc(env(safe-area-inset-bottom, 0px) + 1.5rem)) !important;
                padding-left: max(0px, env(safe-area-inset-left, 0px)) !important;
                padding-right: max(0px, env(safe-area-inset-right, 0px)) !important;
              }
              /* Mobile: redundanten Eyebrow ausblenden (die Ghost-CTAs unten
                 sagen bereits „Orientierung" / „Anamnese") */
              .hero-eyebrow-anamnese {
                display: none !important;
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
                className="hero-portrait-img absolute inset-0 h-full w-full object-cover max-[639px]:object-[58%_30%] sm:object-[60%_30%] md:object-[60%_30%] lg:object-[62%_30%] xl:object-[63%_30%] 2xl:object-[64%_30%]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  transform: `scale(${1.008 + scrollY * 0.00006})`,
                  transition: 'transform 0.1s linear',
                  transformOrigin: '62% 32%'
                }}
              />
            </picture>

            {/* CINEMATIC LIGHTING — bronze halo kept off facial core (lighter = less veil on eyes/skin) */}
            <div
              className="hero-sun absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 52% 40% at 88% 12%, rgba(214,168,94,0.09) 0%, rgba(185,130,63,0.05) 40%, transparent 74%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* SOFT BRONZE HAZE — very subtle */}
            <div
              className="hero-rays absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(155deg, transparent 42%, rgba(185,130,63,0.025) 52%, transparent 64%),
                  linear-gradient(170deg, transparent 48%, rgba(214,168,94,0.02) 58%, transparent 70%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* Lesbarkeit links / unten nur — kein Multiply über dem Gesamtbild */}
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background:
                  'linear-gradient(90deg, rgba(5,7,11,0.58) 0%, rgba(5,7,11,0.22) min(52%,520px), rgba(5,7,11,0.06) min(72%,940px), transparent 88%)'
              }}
            />

            {/* Mobil: Scrims vor allem oben (Headline); Gesicht weiter unten/rechts möglichst frei */}
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(6,8,11,0.72) 0%, rgba(6,8,11,0.18) min(42%,340px), transparent min(76%,620px)), linear-gradient(90deg, rgba(4,5,10,0.45) 0%, transparent min(92%,780px))'
              }}
            />

            {/* Bottom anchor — Überblendung zur Lesbarkeit, nicht zur Gesichtsmitte */}
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none max-[639px]:opacity-65 sm:h-[52%]"
              style={{
                background:
                  'linear-gradient(0deg, rgba(4,6,11,0.52) 0%, rgba(4,6,11,0.12) 58%, transparent 100%)'
              }}
            />

            {/* Vignette — weicher, Gesicht weniger eingegraut */}
            <div
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{ boxShadow: 'inset 0 0 76px 20px rgba(0,0,0,0.26)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{ boxShadow: 'inset 0 0 172px 48px rgba(0,0,0,0.3)' }}
            />

            {/* Subtle top fade for navbar */}
            <div
              className="absolute inset-x-0 top-0 h-32 sm:h-36 md:h-40 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(4,7,14,0.48) 0%, rgba(4,7,14,0.12) 55%, transparent 100%)'
              }}
            />

            <div
              className="absolute top-0 inset-x-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(214,168,94,0.14), transparent)'
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
                {/* Main heading */}
                <h1
                    className="hero-headline mb-4 max-[639px]:mb-4 sm:mb-6 md:mb-7"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
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
                        const headlineAccentStyle = {
                          color: '#EADDCB',
                          fontWeight: 300,
                          letterSpacing: '-0.04em',
                          textShadow: '0 2px 16px rgba(0,0,0,0.5)'
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
                                  <span key={`d-${i}`} className="hero-headline-line block" style={headlineAccentStyle}>
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
                                  <span className="hero-headline-line block" style={headlineAccentStyle}>
                                    <span>{arr[goldIdx]}</span>
                                  </span>
                                </>
                              ) : (
                                arr.map((line: string, i: number) => {
                                  const isGoldLine = i === goldIdx;
                                  return isGoldLine ? (
                                    <span key={`m-${i}`} className="hero-headline-line block" style={headlineAccentStyle}>
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

                {/* Subheading (nur wenn in home_content gesetzt) */}
                {hero.subheading?.trim() ? (
                <p
                  className="hero-subline mb-4 max-[639px]:max-w-[min(17.75rem,100%)] sm:mb-7 md:mb-8"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
                    lineHeight: 1.62,
                    letterSpacing: '-0.006em',
                    maxWidth: '480px'
                  }}>
                  {hero.subheading
                    .split('\n')
                    .map((line: string, i: number) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                </p>
                ) : null}

                {/* Quote */}
                {hero.quote && (
                  <div className="mb-6 max-[639px]:mb-5 sm:mb-7 md:mb-9">
                    <p
                       className="hero-quote italic font-light"
                       style={{
                         fontFamily: FONT_BODY,
                         fontSize: 'clamp(0.9rem, 0.86rem + 0.2vw, 1rem)',
                         fontWeight: 400,
                         letterSpacing: '0.01em'
                       }}>
                      „{hero.quote}“
                    </p>
                  </div>
                )}

                {/* CTA — Primär high-end + Mikrocopy; Sekundär: zwei kompakte CTAs */}
                <div className="flex flex-col items-start gap-0 max-[639px]:w-full">
                  <button
                    className="metallic-bronze-button hero-cta group inline-flex items-center justify-center w-full sm:w-auto whitespace-nowrap max-[639px]:mt-5"
                    style={{
                      padding: 'clamp(14px, 1.35vw, 18px) clamp(26px, 3.2vw, 36px)',
                      minHeight: 'clamp(48px, 5.2vw, 56px)',
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
                        fontSize: 'clamp(0.875rem, 0.8rem + 0.24vw, 1.02rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.006em'
                      }}
                    >
                      {hero.ctaText || 'Erstgespräch vereinbaren'}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-3 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[2px]"
                      style={{ width: 22, height: 22 }}
                    >
                      <ChevronsRight size={20} strokeWidth={2.35} />
                    </span>
                  </button>

                  <p
                    className="hero-primary-microcopy m-0 mt-3 max-[639px]:mt-3.5"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.6875rem, 0.63rem + 0.22vw, 0.796875rem)',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'rgba(214, 188, 152, 0.62)'
                    }}
                  >
                    15 Min. Vertraulich
                  </p>

                  <div className="mt-8 max-[639px]:mt-5 w-full sm:max-w-[min(26rem,min(92vw,420px))]">
                    <p
                      className="hero-eyebrow-anamnese m-0"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 'clamp(0.703125rem, 0.64rem + 0.22vw, 0.796875rem)',
                        fontWeight: 600,
                        letterSpacing: '0.26em',
                        textTransform: 'uppercase',
                        color: 'rgba(230, 202, 168, 0.78)'
                      }}
                    >
                      Orientierung und Anamnese
                    </p>
                    <p
                      className="hero-subline hero-eyebrow-anamnese m-0 mt-2 mb-4 max-[639px]:mb-3.5"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.8125rem, 0.76rem + 0.16vw, 0.90625rem)',
                        lineHeight: 1.55,
                        letterSpacing: '-0.01em',
                        maxWidth: '28rem',
                        color: 'rgba(234, 221, 203, 0.82)'
                      }}
                    >
                      ruhige erste Orientierung
                    </p>
                    <div className="flex flex-row flex-wrap gap-2.5 w-full">
                      <Link
                        to="/quiz"
                        className="hero-cta-ghost group inline-flex flex-1 min-w-[7.25rem] items-center justify-center gap-2 rounded-[11px] border border-[rgba(214,168,94,0.22)] px-3.5 py-2.5 no-underline transition-[border-color,background-color,box-shadow,transform] duration-300 outline-none hover:border-[rgba(214,168,94,0.38)] hover:-translate-y-px hover:shadow-[0_14px_40px_-22px_rgba(185,130,63,0.35)] focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.32)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/85 sm:min-w-[8.75rem]"
                        style={{
                          fontFamily: FONT_BODY,

                          boxShadow:
                            'inset 0 1px 0 rgba(255,248,238,0.04), 0 1px 0 rgba(0,0,0,0.45)'
                        }}
                      >
                        <span
                          className="text-[0.8125rem] font-medium tracking-tight"
                          style={{ color: 'rgba(252, 247, 236, 0.94)' }}
                        >
                          Orientierung
                        </span>
                        <ChevronsRight
                          size={15}
                          strokeWidth={2.35}
                          className="opacity-85 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                      <Link
                        to="/anamnesis"
                        className="hero-cta-ghost group inline-flex flex-1 min-w-[7.25rem] items-center justify-center gap-2 rounded-[11px] border border-[rgba(214,168,94,0.22)] px-3.5 py-2.5 no-underline transition-[border-color,background-color,box-shadow,transform] duration-300 outline-none hover:border-[rgba(214,168,94,0.38)] hover:-translate-y-px hover:shadow-[0_14px_40px_-22px_rgba(185,130,63,0.35)] focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.32)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/85 sm:min-w-[8.75rem]"
                        style={{
                          fontFamily: FONT_BODY,

                          boxShadow:
                            'inset 0 1px 0 rgba(255,248,238,0.04), 0 1px 0 rgba(0,0,0,0.45)'
                        }}
                      >
                        <span
                          className="text-[0.8125rem] font-medium tracking-tight"
                          style={{ color: 'rgba(252, 247, 236, 0.94)' }}
                        >
                          Anamnese
                        </span>
                        <ChevronsRight
                          size={15}
                          strokeWidth={2.35}
                          className="opacity-85 transition-transform duration-300 group-hover:translate-x-0.5"
                          style={{ color: 'rgba(230,193,138,0.88)', stroke: 'rgba(230,193,138,0.88)' }}
                          aria-hidden
                        />
                      </Link>
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

      {/* Neue Wege zur Meisterschaft — drei kuratierte Einstiege unter dem Hero (still, editorial).
          Cinematic Wings-Background: dunkles Zentrum für Card-Lesbarkeit, Flügel rahmen seitlich. */}
      <section
        aria-labelledby="home-meisterschaft-heading"
        className="relative w-full overflow-hidden border-t border-transparent"
        style={{ backgroundColor: '#000000' }}
        data-section
        data-section-id="neue-wege-meisterschaft"
      >
        {/* Background-Bild + atmosphärische Layers (analog Klarheit-/Voices-Pattern) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden>
          <div
            className="meisterschaft-bg-img absolute inset-0"
            style={{
              backgroundImage: 'url(/images/manifest/meisterschaft-wings-bg.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.78,
              filter: 'saturate(0.96) contrast(1.02)'
            }}
          />
          {/* Dunkler Mittenwash — sichert Card-Lesbarkeit ohne das Bild zu erschlagen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 70% at 50% 56%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.32) 48%, rgba(0,0,0,0) 80%)'
            }}
          />
          {/* Matte Tiefen-Lasur — nimmt dem Bild die Direktheit, behält die Materialität */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.18)' }}
          />
          {/* Top-Fade — weicher Übergang vom Hero-Saum in die Wings-Atmosphäre */}
          <div
            className="absolute inset-x-0 top-0 h-44 sm:h-56"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.62) 40%, rgba(10,10,10,0.22) 74%, rgba(10,10,10,0) 100%)'
            }}
          />
          {/* Bottom-Fade — dunkle Brücke zur nächsten Section (Trust + Manifest Kapitel I) */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
            style={{
              background:
                'linear-gradient(0deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.62) 42%, rgba(10,10,10,0.22) 76%, rgba(10,10,10,0) 100%)'
            }}
          />
          {/* Subtiler Bronze-Atem unten Mitte — pickt das warme Licht des Bildes auf */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-40 mix-blend-screen"
            style={{
              background:
                'radial-gradient(60% 100% at 50% 100%, rgba(214,168,94,0.07) 0%, rgba(185,130,63,0.03) 38%, rgba(0,0,0,0) 70%)'
            }}
          />
          {/* Atmosphärischer Hairline-Top — feiner Bronze-Saum als visueller Anker */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.18) 50%, transparent 100%)'
            }}
          />
        </div>

        {/* Responsives Background-Positioning — Flügel beidseitig im Frame */}
        <style>{`
          .meisterschaft-bg-img { background-position: center center; }
          @media (min-width: 768px) {
            .meisterschaft-bg-img { background-position: center 48%; }
          }
          @media (min-width: 1280px) {
            .meisterschaft-bg-img { background-position: center 50%; }
          }
        `}</style>

        <div className="relative z-[1] mx-auto max-w-[1600px] px-6 pb-[2.875rem] pt-[2.875rem] sm:px-8 sm:pb-14 sm:pt-12 md:px-12 lg:px-16 lg:pb-16 lg:pt-14">
          <header className="mx-auto mb-10 max-w-[42rem] text-center lg:mx-0 lg:mb-11 lg:max-w-[46rem] lg:text-left">
            <h2
              id="home-meisterschaft-heading"
              className="m-0 text-balance"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 300,
                letterSpacing: '-0.036em',
                lineHeight: 1.06,
                fontSize: 'clamp(1.5rem, 1.02rem + 1.52vw, 2.3125rem)',
                color: HOME_TEXT_CLEAR,
                textShadow: '0 12px 40px rgba(0,0,0,0.45)'
              }}
            >
              Neue Wege zur Meisterschaft
            </h2>
            <p
              className="m-0 mt-4 max-w-[34rem] text-balance lg:mx-0 mx-auto lg:text-left"
              style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: 'clamp(0.90625rem, 0.85rem + 0.17vw, 1rem)',
                lineHeight: 1.58,
                letterSpacing: '-0.01em',
                color: 'rgba(234, 221, 203, 0.86)'
              }}
            >
              Drei Einstiegspunkte — unterschiedliche Räume, dieselbe Richtung.
            </p>
            <div
              className="mt-7 sm:mt-8 h-px w-full max-w-xl lg:max-w-[40rem] mx-auto lg:mx-0"
              aria-hidden
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(230, 193, 138, 0.09) 14%, rgba(230, 193, 138, 0.26) 50%, rgba(230, 193, 138, 0.09) 86%, transparent 100%)'
              }}
            />
          </header>

          <div
            ref={mobileWaysRef}
            className="flex md:grid scrollbar-hide snap-x snap-mandatory md:snap-none overflow-x-auto md:overflow-visible scroll-px-6 -mx-6 sm:-mx-8 md:mx-0 px-6 sm:px-8 md:px-0 pb-3 md:pb-0 gap-5 md:gap-6 xl:gap-7 md:grid-cols-2 xl:grid-cols-3"
            style={{
              scrollPaddingInline: '1.5rem',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {HOME_MEISTERSCHAFT_WAYS.map((way, idx) => (
              <Link
                key={way.to}
                to={way.to}
                aria-label={`${way.label}: ${way.body} — ${way.cta}`}
                className={
                  idx === 2
                    ? 'home-mastery-way-card group snap-center shrink-0 basis-[86%] max-w-[22rem] md:basis-auto md:shrink md:max-w-[min(100%,24rem)] md:col-span-2 md:justify-self-center xl:col-span-1 xl:max-w-none xl:justify-self-stretch'
                    : 'home-mastery-way-card group snap-center shrink-0 basis-[86%] max-w-[22rem] md:basis-auto md:shrink md:max-w-none'
                }
              >
                <div className="home-mastery-way-card__media relative">
                  <img
                    src={way.imageSrc}
                    alt=""
                    className={way.imageClassName}
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(6,5,4,0.12) 0%, rgba(4,3,2,0.48) 46%, rgba(2,2,3,0.9) 100%)'
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-90"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(230,193,138,0.2), transparent)'
                    }}
                  />
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-[1.25rem] sm:pb-5 sm:pt-[1.125rem]">
                  <p
                    className="m-0 text-[0.625rem] font-medium uppercase tracking-[0.32em]"
                    style={{
                      fontFamily: FONT_BODY,
                      color: 'rgba(214, 188, 152, 0.7)'
                    }}
                  >
                    {way.label}
                  </p>
                  <p
                    className="m-0 mt-3 flex-1"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.859375rem, 0.79rem + 0.2vw, 0.9375rem)',
                      lineHeight: 1.55,
                      letterSpacing: '-0.012em',
                      fontWeight: 400,
                      color: 'rgba(244,244,244,0.92)'
                    }}
                  >
                    {way.body}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 border-t pt-4"
                    style={{
                      borderColor: 'rgba(230, 193, 138, 0.12)',
                      fontFamily: FONT_BODY,
                      fontSize: '0.78125rem',
                      fontWeight: 500,
                      letterSpacing: '0.07em',
                      color: 'rgba(226, 202, 168, 0.76)'
                    }}
                  >
                    {way.cta}
                    <ChevronsRight
                      className="home-mastery-way-card__cta-icon opacity-88 shrink-0"
                      size={15}
                      strokeWidth={2.35}
                      style={{ color: 'rgba(230, 193, 138, 0.72)' }}
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <MobileSliderDots
            count={HOME_MEISTERSCHAFT_WAYS.length}
            active={activeWaysIndex}
            hideAt="md"
          />
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
                      className="m-0 leading-snug"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 'clamp(1rem, 0.88rem + 0.38vw, 1.1875rem)',
                        letterSpacing: '-0.024em',
                        lineHeight: 1.3,
                        fontWeight: 400,
                        color: '#EADDCB',
                        textShadow: '0 1px 8px rgba(0,0,0,0.42)'
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
                  <ChevronsRight
                    size={17}
                    strokeWidth={2.25}
                    className="transition-transform duration-300 group-hover:translate-x-[3px]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CINEMATIC TENSION SECTION — Luxury Editorial · Fullscreen-Hintergrund.
              w-screen + translate-Pattern bricht aus dem max-w-[1600px] Container aus
              und garantiert echtes Vollbild auf allen Viewports (auch >1600px). */}
          <div
            data-home-problem-intro
            data-section
            data-section-id="manifest-kapitel-1"
            className="relative isolate overflow-hidden flex items-center mt-0 w-screen left-1/2 -translate-x-1/2"
            style={{
              backgroundColor: '#000000',
              minHeight: '100svh',
              paddingTop: 'clamp(4rem, 9vw, 7rem)',
              paddingBottom: 'clamp(4rem, 9vw, 7rem)'
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

            {/* Hintergrund — Kapitel I (cineastische Steinkammer mit Bronze-Lichtschacht) */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
              {/* Schärfe und Tiefe des Bildes bleiben unberührt — keine Filter, kein Blur */}
              <div
                className="kapitel-1-bg-img absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/manifest-kapitel-1-stone-light.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {/* Tiefen-Vignette (oben/unten + seitlich) — verschmilzt das Bild matt mit der Section
                  ohne Detailverlust; reine Overlay-Maskierung statt Weichzeichnung. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(140% 100% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.36) 78%, rgba(0,0,0,0.78) 100%)'
                }}
              />
              {/* Linkes Tiefen-Wash — hält Headline ruhig und lesbar, ohne das Bild zu glätten */}
              <div
                className="absolute inset-y-0 left-0 w-full lg:w-[62%]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(4,4,6,0.78) 0%, rgba(6,6,8,0.55) 30%, rgba(8,8,10,0.28) 62%, rgba(10,10,12,0.06) 100%)'
                }}
              />
              {/* Top-Fade: weicher Anschluss an die Section darüber */}
              <div
                className="absolute inset-x-0 top-0 h-40 sm:h-52"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Bottom-Fade: dunkle Brücke zu Kapitel II, leichte warme Reflexion am Saum */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Warmer Bronze-Atem (sehr fein) — verbindet die Lichtquelle visuell mit dem Footer-Saum */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 sm:h-36 mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(80% 100% at 62% 100%, rgba(214,168,94,0.10) 0%, rgba(185,130,63,0.04) 35%, rgba(0,0,0,0) 70%)'
                }}
              />
            </div>

            {/* Bildposition responsiv steuern — auf Mobile rückt der Bronze-Lichtschacht
                stärker ins Blickfeld; Desktop bleibt mittig komponiert. */}
            <style>{`
              .kapitel-1-bg-img { background-position: 58% center; }
              @media (min-width: 768px) {
                .kapitel-1-bg-img { background-position: center center; }
              }
            `}</style>

            <div className="relative z-[1] w-full mx-auto max-w-[1320px] px-6 sm:px-10 md:px-14 lg:px-20">

              {/* Editorial-Marker — links, sehr fein */}
              <div className="tension-fade-in flex items-center gap-3 mb-6 sm:mb-7 lg:mb-8">
                <span
                  aria-hidden
                  className="block h-px w-7 sm:w-9"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(214,168,94,0.85) 0%, rgba(214,168,94,0.15) 100%)'
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
                        color: '#EADDCB'
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
                        color: '#EADDCB'
                      }}
                    >
                      Führung
                    </span>
                    .
                  </span>
                </h2>

                {/* RECHTS — Manifest, nur feine Bronze-Striche.
                    Mobile: per Toggle aufklappbar (siehe unten), default geschlossen. */}
                <ul
                  id="manifest-k1-bullets"
                  aria-hidden={!manifestK1Expanded ? true : undefined}
                  className={`m-0 p-0 list-none flex-col gap-y-4 sm:gap-y-5 lg:gap-y-[1.35rem] lg:col-span-5 lg:pt-2 ${
                    manifestK1Expanded ? 'flex max-lg:mt-4' : 'hidden lg:flex'
                  }`}
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
                            'linear-gradient(180deg, transparent 0%, rgba(214,168,94,0.55) 45%, rgba(214,168,94,0.18) 100%)',
                          boxShadow: '0 0 10px rgba(185,130,63,0.12)'
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

              {/* Mobile-only Block — Closing + Aufklapp-Toggle für die Bullet-Points.
                  Auf Desktop unsichtbar; Bullet-Liste oben rechts ist dort immer sichtbar. */}
              <div className="lg:hidden">
                {/* Closing (Mobil) — atmosphärischer Premium-Schluss vor dem Toggle */}
                <p
                  className="tension-fade-in m-0 mt-8 sm:mt-9 text-left"
                  style={{
                    animationDelay: '0.5s',
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.68rem, 0.6rem + 0.22vw, 0.78rem)',
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
                      color: '#EADDCB'
                    }}
                  >
                    Führung
                  </span>
                  .
                </p>

                {/* Aufklapp-Toggle — editorial, kein Button-Look */}
                <button
                  type="button"
                  aria-expanded={manifestK1Expanded}
                  aria-controls="manifest-k1-bullets"
                  onClick={() => setManifestK1Expanded(v => !v)}
                  className="group mt-7 inline-flex items-center gap-3 transition-colors duration-300"
                >
                  <span
                    aria-hidden
                    className="block h-px shrink-0 transition-all duration-500"
                    style={{
                      width: '1.75rem',
                      background:
                        'linear-gradient(90deg, rgba(214,168,94,0.78) 0%, rgba(214,168,94,0.18) 100%)'
                    }}
                  />
                  <span
                    className="block uppercase"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.6rem, 0.55rem + 0.12vw, 0.7rem)',
                      letterSpacing: '0.36em',
                      fontWeight: 500,
                      color: manifestK1Expanded
                        ? 'rgba(234, 221, 203, 0.92)'
                        : 'rgba(214, 168, 94, 0.78)',
                      transition: 'color 400ms ease'
                    }}
                  >
                    {manifestK1Expanded ? 'Weniger' : 'Spannungsfelder sehen'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-out ${
                      manifestK1Expanded ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.4}
                    style={{ color: 'rgba(214,168,94,0.7)' }}
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ VOM REAGIEREN ZUR KLAREN FÜHRUNG — Luxury Editorial · Fullscreen-Hintergrund */}
      <section
        className="relative w-full overflow-hidden isolate flex items-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '100svh',
          paddingTop: 'clamp(4rem, 9vw, 7rem)',
          paddingBottom: 'clamp(4rem, 9vw, 7rem)'
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

        {/* Hintergrund — Kapitel II: Dawn-Plateau mit Bronze-Lichtportal · Fullscreen edge-to-edge,
            kein 1600-Rahmen mehr (verhindert harten Cut rechts auf breiten Viewports).
            Schärfe + Tiefe des Bildes bleiben unangetastet — nur sanfte Lese-Atmosphäre. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div
            className="kapitel-2-bg-img absolute inset-0"
            style={{
              backgroundImage: 'url(/images/manifest/manifest-kapitel-2-horizon-light.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Globale matte Tiefen-Vignette — sehr sanft, kein Detailverlust */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(155% 105% at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.28) 76%, rgba(0,0,0,0.62) 100%)'
            }}
          />
          {/* Linkes Lesefeld — sanfter Wash, blendet weich ins Bild über. Mobile etwas stärker
              für Lesbarkeit, Desktop ruhiger damit das Bronze-Portal sichtbar bleibt. */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[58%]"
            style={{
              background:
                'linear-gradient(90deg, rgba(4,6,10,0.78) 0%, rgba(6,8,12,0.55) 32%, rgba(8,10,14,0.28) 64%, rgba(10,12,16,0.06) 100%)'
            }}
          />
          {/* Mobile-only: zusätzlicher dezenter vertikaler Wash, hält Headline ruhig */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(4,6,10,0.18) 0%, rgba(4,6,10,0.32) 45%, rgba(4,6,10,0.55) 100%)'
            }}
          />
          {/* Top-Fade — sanfter Übergang aus Kapitel I (dunkler Saum oben) */}
          <div
            className="absolute inset-x-0 top-0 h-44 sm:h-56"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Bottom-Fade — Brücke in die nächste Section */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
            style={{
              background:
                'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.12) 78%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Warmer Bronze-Atem unten rechts — verlängert das Lichtportal sanft */}
          <div
            className="absolute right-0 bottom-0 w-[78%] h-32 sm:h-40 mix-blend-screen"
            style={{
              background:
                'radial-gradient(70% 100% at 72% 100%, rgba(214,168,94,0.10) 0%, rgba(185,130,63,0.04) 38%, rgba(0,0,0,0) 70%)'
            }}
          />
        </div>

        {/* Bildposition responsiv — auf Mobile rückt das Bronze-Portal etwas
            ins Sichtfeld, ohne die Headline-Lesbarkeit aufzugeben. */}
        <style>{`
          .kapitel-2-bg-img { background-position: 62% center; }
          @media (min-width: 768px) {
            .kapitel-2-bg-img { background-position: center center; }
          }
        `}</style>

        <div className="relative z-[1] w-full mx-auto max-w-[1320px] px-6 sm:px-10 md:px-14 lg:px-20">
          <div className="w-full">
            {/* Editorial-Marker — links, sehr fein */}
            <div className="flex items-center gap-3 mb-6 sm:mb-7 lg:mb-8">
              <span
                aria-hidden
                className="block h-px w-7 sm:w-9 shrink-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,94,0.85) 0%, rgba(214,168,94,0.15) 100%)'
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
                      textShadow:
                        '0 2px 32px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.9)',
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
                      textShadow:
                        '0 2px 32px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.9)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }}
                  >
                    zur{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        letterSpacing: '-0.032em',
                        color: '#EADDCB'
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
                    lineHeight: 1.62,
                    letterSpacing: '-0.006em',
                    color: 'rgba(244, 244, 244, 0.93)',
                    textShadow:
                      '0 2px 24px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,1), 0 0 1px rgba(0,0,0,0.85)'
                  }}
                >
                  Was sich verändert, wenn Klarheit zurückkehrt.
                </p>

                {/* Mobile-only Aufklapp-Toggle — Editorial, kein Button-Look.
                    Auf Desktop unsichtbar; UL rechts ist dort permanent. */}
                <button
                  type="button"
                  aria-expanded={manifestK2Expanded}
                  aria-controls="manifest-k2-bullets"
                  onClick={() => setManifestK2Expanded(v => !v)}
                  className="group lg:hidden mt-7 sm:mt-8 inline-flex items-center gap-3 transition-colors duration-300"
                >
                  <span
                    aria-hidden
                    className="block h-px shrink-0 transition-all duration-500"
                    style={{
                      width: '1.75rem',
                      background:
                        'linear-gradient(90deg, rgba(214,168,94,0.78) 0%, rgba(214,168,94,0.18) 100%)'
                    }}
                  />
                  <span
                    className="block uppercase"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 'clamp(0.6rem, 0.55rem + 0.12vw, 0.7rem)',
                      letterSpacing: '0.36em',
                      fontWeight: 500,
                      color: manifestK2Expanded
                        ? 'rgba(234, 221, 203, 0.92)'
                        : 'rgba(214, 168, 94, 0.78)',
                      transition: 'color 400ms ease'
                    }}
                  >
                    {manifestK2Expanded ? 'Weniger' : 'Bewegungen sehen'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-out ${
                      manifestK2Expanded ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.4}
                    style={{ color: 'rgba(214,168,94,0.7)' }}
                    aria-hidden
                  />
                </button>

              </div>

              {/* RECHTS — Manifest (kein Pfeil, kein Vorher/Nachher-Grid, nur feine Bronze-Striche).
                  Mobile: aufklappbar via Toggle oben; default geschlossen. */}
              <ul
                id="manifest-k2-bullets"
                aria-hidden={!manifestK2Expanded ? true : undefined}
                className={`m-0 p-0 list-none flex-col gap-y-4 sm:gap-y-5 lg:gap-y-[1.35rem] lg:col-span-5 lg:pt-2 ${
                  manifestK2Expanded ? 'flex max-lg:mt-2' : 'hidden lg:flex'
                }`}
              >
                {TRANSFORM_ROWS.map((row, i) => (
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
                            'linear-gradient(180deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0.12) 100%)'
                        }}
                      />
                      <p
                        className="m-0"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(0.95rem, 0.86rem + 0.4vw, 1.125rem)',
                          lineHeight: 1.58,
                          letterSpacing: '-0.006em',
                          textShadow: '0 2px 20px rgba(0,0,0,0.88), 0 1px 2px rgba(0,0,0,0.95)'
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 400,
                            color: 'rgba(234, 230, 220, 0.88)'
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
                              'linear-gradient(90deg, rgba(214,168,94,0.5), rgba(214,168,94,0.12))',
                            verticalAlign: 'middle'
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 500,
                            letterSpacing: '-0.01em',
                            color: 'rgba(234, 221, 203, 0.96)'
                          }}
                        >
                          {row.to}
                        </span>
                      </p>
                    </li>
                  ))}
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
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 text-[#f4f4f4]"
                    style={{ fontFamily: FONT_DISPLAY, fontWeight: 300, letterSpacing: '-0.03em' }}>
                  {eventsHeader.heading}
                  {eventsHeader.highlight && (
                    <span className="text-[#EADDCB]" style={{ fontFamily: FONT_DISPLAY, fontWeight: 300 }}>
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
                'radial-gradient(120% 90% at 44% 40%, transparent 0%, rgba(0,0,0,0.06) 48%, rgba(0,0,0,0.38) 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-40 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,4,10,0.55) 0%, transparent 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-40 pointer-events-none"
            style={{
              background:
                'linear-gradient(0deg, rgba(4,7,13,0.45) 0%, transparent 100%)'
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
                    color: '#EADDCB'
                  }}
                >
                  Präzision
                </span>{' '}
                <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>trifft</span>{' '}
                <span
                  style={{
                    fontWeight: 400,
                    color: '#EADDCB'
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
                  className="relative block h-full w-full select-none max-[639px]:object-[52%_30%] object-cover object-[52%_28%]"
                  draggable={false}
                  style={{
                    zIndex: 1,
                    WebkitMaskImage:
                      'radial-gradient(94% 100% at 52% 36%, #000 0%, #000 72%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,0.35) 90%, transparent 100%)',
                    maskImage:
                      'radial-gradient(94% 100% at 52% 36%, #000 0%, #000 72%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,0.35) 90%, transparent 100%)',
                    filter: 'drop-shadow(0 28px 60px rgba(0,0,0,0.55))'
                  }}
                />

                {/* Soft bottom blend — nur Bildfuß, kein Multiply über dem Gesicht */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] sm:h-[30%]"
                  style={{
                    zIndex: 2,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 72%, transparent 100%)'
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
                    color: '#EADDCB'
                  }}
                >
                  Präzision
                </span>{' '}
                <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>trifft</span>{' '}
                <span
                  style={{
                    fontWeight: 400,
                    color: '#EADDCB'
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
                  <ChevronsRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.5} />
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

      {/* Wo Klarheit wirkt — Editorial Premium Cards · Fullscreen-Hintergrund auf Desktop.
          Hintergrundbild trägt den ganzen Viewport; Content vertikal zentriert. */}
      <section
        className="relative isolate overflow-hidden lg:flex lg:flex-col lg:justify-center lg:min-h-[100svh]"
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
              'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.18) 50%, transparent 100%)'
          }}
        />

        {/* Background-Bild — Dawn-Horizont mit Gräser-Vordergrund.
            Schärfe und Tiefe des Bildes bleiben erhalten; nur dezente Color-Refine, kein Blur. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div className="relative mx-auto h-full max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="absolute inset-y-0 overflow-hidden -left-6 -right-6 sm:-left-8 sm:-right-8 md:-left-12 md:-right-12 lg:-left-16 lg:-right-16 xl:-left-[5.5rem] xl:-right-[5.5rem]">
              <div
                className="clarity-bg-img absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/clarity-horizon-grass-bg.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  opacity: 1,
                  filter: 'saturate(0.96) contrast(1.04)'
                }}
              />
              {/* Matter Tiefen-Wash — bringt das helle Dawn-Bild in die Lichtwelt der Section,
                  ohne Detail oder Schärfe zu verlieren. */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.22)' }}
              />
              {/* Radiale Mattvignette — saubere Sektion-Kanten, Mitte bleibt detailtreu */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(150% 110% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.30) 78%, rgba(0,0,0,0.68) 100%)'
                }}
              />
              {/* Top-Fade — verlängert, damit der Anschluss aus dem dunklen Saum von Kapitel II
                  wie ein langsamer Atemzug ins Licht wirkt. */}
              <div
                className="absolute inset-x-0 top-0 h-44 sm:h-56"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.6) 38%, rgba(10,10,10,0.22) 72%, rgba(10,10,10,0) 100%)'
                }}
              />
              {/* Bottom-Fade — dunkle Brücke zur nächsten Section */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.62) 42%, rgba(10,10,10,0.22) 76%, rgba(10,10,10,0) 100%)'
                }}
              />
              {/* Warmer Bronze-Atem unten links — verbindet den Sonnen-Horizont visuell
                  mit dem unteren Sektionsrand, ohne harten Cut. */}
              <div
                className="absolute left-0 bottom-0 w-[70%] h-28 sm:h-36 mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(70% 100% at 20% 100%, rgba(214,168,94,0.08) 0%, rgba(185,130,63,0.04) 38%, rgba(0,0,0,0) 70%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesbarkeits-Scrim hinter dem Header (linksbündig) — etwas weicher kalibriert,
            damit der Bronze-Horizont mit dem Headline-Akzent „Klarheit“ harmoniert. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 right-0 lg:right-[35%] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,10,0.62) 0%, rgba(8,8,10,0.38) 38%, rgba(8,8,10,0.12) 72%, rgba(8,8,10,0) 100%)'
          }}
        />

        {/* Bildposition responsiv — Horizontlinie bleibt auf allen Größen im oberen
            Drittel, das Gräser-Volumen trägt den Cards-Bereich. */}
        <style>{`
          .clarity-bg-img { background-position: center 38%; }
          @media (min-width: 768px) {
            .clarity-bg-img { background-position: center 42%; }
          }
        `}</style>

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
                    'linear-gradient(90deg, rgba(230,193,138,0.55) 0%, rgba(230,193,138,0.18) 100%)'
                }}
              />
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',

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
                  'linear-gradient(90deg, rgba(230,193,138,0.22) 0%, rgba(230,193,138,0.08) 50%, transparent 100%)'
              }}
            />
          </header>

          {/* GRID — fünf Editorial-Cards
              Geöffnetes Detail fließt im Dokument: die Section wächst, alle Punkte bleiben lesbar.
              items-start: geschlossene Karten behalten ihre Höhe.
              Mobile: horizontaler Premium-Slider mit Snap. */}
          <div
            ref={mobileClarityRef}
            className="mt-10 sm:mt-12 md:mt-14 flex sm:grid scrollbar-hide snap-x snap-mandatory sm:snap-none overflow-x-auto sm:overflow-visible -mx-6 sm:mx-0 px-6 sm:px-0 pb-3 sm:pb-0 gap-4 sm:gap-5 lg:gap-5 sm:grid-cols-2 lg:grid-cols-5 items-start"
            style={{
              scrollPaddingInline: '1.5rem',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {woKlarheitAreas.map((area, idx) => {
              const open = expandedClarityAreaId === area.id;
              const indexLabel = String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={area.id}
                  className="clarity-fade flex min-w-0 flex-col snap-center shrink-0 basis-[86%] max-w-[22rem] sm:basis-auto sm:shrink sm:max-w-none"
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
                          'linear-gradient(90deg, rgba(230,193,138,0.55) 0%, rgba(230,193,138,0) 100%)'
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

          <MobileSliderDots
            count={woKlarheitAreas.length}
            active={activeClarityIndex}
            hideAt="sm"
          />
        </div>
      </section>

      {/* ── SOCIAL PROOF — Editorial Whisper Testimonials · Fullscreen-Hintergrund auf Desktop ── */}
      <section
        className="relative isolate overflow-hidden lg:flex lg:flex-col lg:justify-center lg:min-h-[100svh]"
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
              'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.18) 50%, transparent 100%)'
          }}
        />

        {/* Background-Bild — Infinity-Plateau über dem Bronze-Horizont.
            Scharf, kein Blur; dezente Color-Refine. Matte Tiefen-Lasuren statt Bild-Manipulation. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
          <div className="relative mx-auto h-full max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="absolute inset-y-0 overflow-hidden -left-6 -right-6 sm:-left-8 sm:-right-8 md:-left-12 md:-right-12 lg:-left-16 lg:-right-16 xl:-left-[5.5rem] xl:-right-[5.5rem]">
              <div
                className="voices-bg-img absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/manifest/voices-horizon-pool-bg.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  opacity: 1,
                  filter: 'saturate(0.98) contrast(1.04)'
                }}
              />
              {/* Matter Tiefen-Wash — Bild rückt in dieselbe Lichtwelt wie die Section darüber */}
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.20)' }} />
              {/* Radiale Mattvignette — saubere Sektion-Kanten, Detail bleibt zentral erhalten */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(150% 110% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.30) 78%, rgba(0,0,0,0.70) 100%)'
                }}
              />
              {/* Top-Fade — verlängert, weicher Atemzug aus „Wo Klarheit wirkt“ in die Stille */}
              <div
                className="absolute inset-x-0 top-0 h-44 sm:h-56"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.6) 38%, rgba(10,10,10,0.22) 72%, rgba(10,10,10,0) 100%)'
                }}
              />
              {/* Bottom-Fade — Brücke zur nächsten Section */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.62) 42%, rgba(10,10,10,0.22) 76%, rgba(10,10,10,0) 100%)'
                }}
              />
              {/* Warmer Bronze-Atem mittig — die Sonnen-Reflexion trägt subtil
                  in den unteren Section-Saum und führt zum nächsten Kapitel. */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 sm:h-40 mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(60% 100% at 50% 100%, rgba(214,168,94,0.09) 0%, rgba(185,130,63,0.04) 38%, rgba(0,0,0,0) 70%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesbarkeits-Scrim links — feiner kalibriert, damit der Bronze-Horizont
            unter „Begleitung“ in der Headline durchatmen kann. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 right-0 lg:right-[34%] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,10,0.62) 0%, rgba(8,8,10,0.38) 38%, rgba(8,8,10,0.12) 72%, rgba(8,8,10,0) 100%)'
          }}
        />

        {/* Unterer Lesbarkeits-Wash — verankert das Stimmen-Raster ruhig vor der Pool-Reflexion */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] max-h-[28rem] z-[1]"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(8,8,10,0) 0%, rgba(8,8,10,0.42) 48%, rgba(8,8,10,0.78) 100%)'
          }}
        />

        {/* Bildposition responsiv — Horizont bleibt sichtbar, Reflexionsfläche
            trägt die Testimonial-Karten. */}
        <style>{`
          .voices-bg-img { background-position: 58% 38%; }
          @media (min-width: 768px) {
            .voices-bg-img { background-position: center 42%; }
          }
        `}</style>

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
                  '0 2px 18px rgba(0,0,0,0.88), 0 6px 32px rgba(0,0,0,0.55)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              <span style={{ fontWeight: 300, color: HOME_TEXT_CLEAR }}>Stimmen aus der </span>
              <span
                style={{
                  fontWeight: 400,
                  color: '#EADDCB'
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
              Kurze Aussagen aus der Transformation — ohne Inszenierung.
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

          {/* TESTIMONIAL GRID — schlicht, klein, edel, vier in einer Reihe.
              Mobile: horizontaler Premium-Slider mit Snap. */}
          <div
            ref={mobileVoicesRef}
            className="mt-10 sm:mt-12 md:mt-14 flex sm:grid scrollbar-hide snap-x snap-mandatory sm:snap-none overflow-x-auto sm:overflow-visible -mx-6 sm:mx-0 px-6 sm:px-0 pb-3 sm:pb-0 gap-3.5 sm:gap-4 lg:gap-5 sm:grid-cols-2 lg:grid-cols-4 items-start"
            style={{
              scrollPaddingInline: '1.5rem',
              WebkitOverflowScrolling: 'touch'
            }}
          >
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
                className="voices-fade m-0 snap-center shrink-0 basis-[86%] max-w-[22rem] sm:basis-auto sm:shrink sm:max-w-none"
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
                      color: 'rgba(201,163,112,0.82)',
                      opacity: 0.85,
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

          <MobileSliderDots count={4} active={activeVoicesIndex} hideAt="sm" />
        </div>
      </section>

      {/* Erste Orientierung — Klarcheck & Anamnese (editorial, vor Transformation) */}
      <section
        aria-labelledby="home-orientierung-heading"
        className="relative w-full overflow-hidden border-t border-transparent"
        data-section
        data-section-id="orientierung-teaser"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-md:min-h-[100%]" aria-hidden>
          {/* Nahtlos aus schwarzem Abschnitt oben */}
          <div
            className="absolute inset-x-0 top-0 z-[3] h-36 pointer-events-none"
            aria-hidden
            style={{
              background:
                'linear-gradient(180deg, rgba(2, 3, 5, 0.82) 0%, rgba(4, 5, 8, 0.28) min(92%,620px), transparent 100%)'
            }}
          />

          <img
            src="/images/home/orientierung-kueste-twilight.png"
            alt=""
            className="absolute inset-0 h-full min-h-[100%] w-full scale-[1.01] object-cover object-[52%_50%] sm:object-[55%_48%] lg:object-[52%_46%]"
            loading="lazy"
            decoding="async"
          />
          {/* Mobil: dunkle Lesefläche (Text mittig/oben auf Bild) */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(6, 8, 12, 0.78) 0%, rgba(8, 10, 14, 0.48) min(78%,720px), rgba(12, 12, 15, 0.18) 100%), linear-gradient(90deg, rgba(8, 10, 15, 0.55) 0%, transparent min(94%,940px))'
            }}
          />
          {/* Desktop: links Editorial-Korridor, rechts Küstenlicht sichtbar */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(7, 9, 14, 0.9) 0%, rgba(10, 12, 18, 0.58) min(48%,640px), rgba(16, 15, 18, 0.2) min(78%,940px), rgba(18, 17, 19, 0.04) min(94%,980px))'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(120% 90% at 12% 32%, rgba(0, 0, 0, 0.52) 0%, transparent min(74%,940px)), radial-gradient(90% 80% at 100% 100%, rgba(0, 0, 0, 0.22) 0%, transparent 58%)'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.055]"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(4, 5, 8, 0.4) 100%)'
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[1600px] px-6 pb-14 pt-[2.5rem] sm:px-8 sm:pb-[3.25rem] sm:pt-[2.75rem] md:px-12 lg:min-h-[min(52svh,520px)] lg:px-16 lg:flex lg:flex-col lg:justify-center lg:pb-16 lg:pt-12">
          <div className="mx-auto max-w-[40rem] text-center lg:mx-0 lg:max-w-[44rem] lg:text-left">
            <h2
              id="home-orientierung-heading"
              className="m-0 font-medium tracking-[-0.034em] antialiased"
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
                color: 'rgba(244, 242, 236, 0.94)',
                textShadow:
                  '0 2px 24px rgba(0, 0, 0, 0.82), 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 1px rgba(0, 0, 0, 0.6)'
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
                  'linear-gradient(180deg, rgba(18,16,14,0.72) 0%, rgba(12,11,10,0.78) 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 248, 238, 0.045), 0 1px 0 rgba(0,0,0,0.5), 0 28px 56px -30px rgba(0,0,0,0.75)'
              }}
            >
              <span
                className="pointer-events-none absolute inset-px rounded-[12px] opacity-[0.45]"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(180deg, rgba(230,193,138,0.08) 0%, rgba(230,193,138,0) 50%, rgba(230,193,138,0.04) 100%)'
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
                  <span className="inline-flex items-center gap-1.5">
                    Orientierung starten
                    <ChevronsRight size={14} strokeWidth={2.35} className="opacity-90" aria-hidden />
                  </span>
                </span>
              </div>
            </Link>

            <Link
              to="/anamnesis"
              className="group relative block rounded-[13px] border border-[rgba(214,168,94,0.22)] px-5 py-[1.1875rem] no-underline outline-none transition-[border-color,box-shadow,background-color] duration-300 sm:px-[1.25rem] sm:py-5 backdrop-blur-[12px] focus-visible:border-[rgba(214,168,94,0.32)] focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.24)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 hover:border-[rgba(214,168,94,0.28)] hover:shadow-[0_0_42px_-18px_rgba(185,130,63,0.12)]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(18,16,14,0.72) 0%, rgba(12,11,10,0.78) 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 248, 238, 0.045), 0 1px 0 rgba(0,0,0,0.5), 0 28px 56px -30px rgba(0,0,0,0.75)'
              }}
            >
              <span
                className="pointer-events-none absolute inset-px rounded-[12px] opacity-[0.45]"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(180deg, rgba(230,193,138,0.08) 0%, rgba(230,193,138,0) 50%, rgba(230,193,138,0.04) 100%)'
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
                  <span className="inline-flex items-center gap-1.5">
                    Analyse beginnen
                    <ChevronsRight size={14} strokeWidth={2.35} className="opacity-90" aria-hidden />
                  </span>
                </span>
              </div>
            </Link>
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
              'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.20) 50%, transparent 100%)'
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

                border: '1px solid rgba(230,193,138,0.34)',
                boxShadow:
                  '0 1px 0 rgba(244,239,231,0.35) inset, 0 0 0 1px rgba(230,193,138,0.06) inset, 0 0 22px rgba(214,168,94,0.20), 0 0 60px rgba(185,130,63,0.10), 0 6px 18px rgba(0,0,0,0.4)'
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px] overflow-hidden"
               
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
              <ChevronsRight
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
              'linear-gradient(180deg, rgba(8,8,10,0) 0%, rgba(8,8,10,0.55) 55%, rgba(8,8,10,0.9) 100%)'
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
                  className="m-0 tracking-tight text-[#f4f4f4]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 300,
                    fontSize:
                      'clamp(2.5rem, 1.85rem + 2.85vw, 4rem)',
                    lineHeight: 1.14,
                    letterSpacing: '-0.03em',
                    textShadow: '0 8px 32px rgba(0,0,0,0.45)'
                  }}
                >
                  <span className="inline-block text-[#EADDCB]" style={{ fontFamily: FONT_DISPLAY, fontWeight: 300 }}>
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

                          boxShadow: '0 2px 8px rgba(185, 130, 63, 0.18)'
                        }}
                      >
                        {item.icon}
                      </div>
                      <h4 className="mb-1 text-[11px] font-black tracking-tight text-white">{item.title}</h4>
                      <p className="m-0 text-[10px] leading-snug text-white/55">
                        <ChevronsRight
                          aria-hidden="true"
                          className="mt-px inline shrink-0 text-white/35"
                          size={13}
                          strokeWidth={2.5}
                        />
                        <span aria-hidden className="inline w-1.5 shrink-0" />
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
                  <ChevronsRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.5} />
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

                border: expandedPanels.promise ? '1px solid rgba(185, 130, 63, 0.4)' : '1px solid rgba(185, 130, 63, 0.2)',
                boxShadow: expandedPanels.promise ? '0 12px 40px rgba(185, 130, 63, 0.15)' : '0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center">
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
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
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
                <ChevronsRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/formate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="portfolio-cta-cool-to-bronze group inline-flex items-center gap-2 px-6 py-3 text-sm rounded-[11px]"
              >
                <Book className="w-4 h-4 transition-colors duration-300 opacity-90 group-hover:opacity-100" strokeWidth={2.2} />
                Portfolio ansehen
                <ChevronsRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
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
