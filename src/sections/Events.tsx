import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const EVENT_TYPE_LABELS: Record<string, { icon: string; label: string; color: string }> = {
  keynote: { icon: '🎤', label: 'Keynote', color: 'from-purple-500 to-pink-500' },
  seminar: { icon: '🎓', label: 'Seminar', color: 'from-blue-500 to-cyan-500' },
  workshop: { icon: '🛠️', label: 'Workshop', color: 'from-green-500 to-emerald-500' },
  coaching: { icon: '⭐', label: 'Coaching', color: 'from-yellow-400 to-orange-500' },
  corporate: { icon: '🏢', label: 'Corporate Training', color: 'from-gray-500 to-slate-500' },
  webinar: { icon: '💻', label: 'Webinar', color: 'from-indigo-500 to-blue-500' },
  retreat: { icon: '🏔️', label: 'Retreat', color: 'from-teal-500 to-green-500' },
  masterclass: { icon: '👑', label: 'Masterclass', color: 'from-amber-500 to-yellow-500' },
  'live-event': { icon: '🔴', label: 'Live Event', color: 'from-red-500 to-orange-500' },
  'online-live': { icon: '🌐', label: 'Online Live', color: 'from-sky-500 to-blue-500' },
  transformation: { icon: '✨', label: 'Transformation', color: 'from-violet-500 to-purple-500' }
};

export default function Events() {
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerContent, setHeaderContent] = useState<any>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      console.log('[Events Frontend] Loading content...');

      const [eventsRes, headerRes] = await Promise.all([
        supabase.from('home_events').select('*').order('display_order'),
        supabase.from('home_content').select('content').eq('section', 'events_header').eq('is_active', true).maybeSingle()
      ]);

      console.log('[Events Frontend] Header response:', headerRes);
      console.log('[Events Frontend] Events response:', eventsRes);

      if (eventsRes.data) {
        console.log('[Events Frontend] Setting events:', eventsRes.data.length);
        setEvents(eventsRes.data);
      }

      if (headerRes.data?.content) {
        console.log('[Events Frontend] Setting header content:', headerRes.data.content);
        setHeaderContent(headerRes.data.content);
      } else {
        console.warn('[Events Frontend] No header data, using defaults');
        setHeaderContent({
          heading: 'Events',
          highlight: 'befreien',
          linkText: 'Events entdecken',
          linkTarget: '#seminare'
        });
      }
    } catch (error) {
      console.error('[Events Frontend] Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

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
    'cyan-500': '#06b6d4'
  };

  const titleFontSizeClasses: Record<string, string> = {
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const textFontSizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const letterSpacingClasses: Record<string, string> = {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
          <p className="text-white/60 font-semibold">Events werden geladen...</p>
        </div>
      </div>
    );
  }

  const heading = headerContent.heading || 'Events';
  const highlight = headerContent.highlight || 'befreien';
  const linkText = headerContent.linkText || 'Events entdecken';
  const linkTarget = headerContent.linkTarget || '#seminare';

  console.log('[Events Frontend] Rendering with:', { heading, highlight, linkText, linkTarget });

  return (
    <div className="bg-black min-h-screen">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(250, 204, 21, 0.03)' : 'rgba(249, 115, 22, 0.02)'} 0%, transparent 70%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 py-32 text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 backdrop-blur-xl border border-yellow-400/30 shadow-[0_0_80px_rgba(234,179,8,0.15)]"
               style={{
                 background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08), rgba(249, 115, 22, 0.08))'
               }}>
            <Zap className="text-yellow-400" size={20} strokeWidth={2.5} />
            <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase">Live Events & Keynotes</span>
          </div>

          <h1 className="text-[52px] sm:text-[64px] lg:text-[88px] xl:text-[108px] font-[900] mb-6 leading-[0.95] tracking-[-0.045em]">
            <span className="inline-block bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(255,255,255,0.15)]">
              {heading}{' '}
            </span>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_80px_rgba(234,179,8,0.3)]">
              {highlight}
            </span>
          </h1>

          <p className="text-[19px] sm:text-[21px] lg:text-[24px] text-white/70 font-[420] max-w-[920px] mx-auto mb-12 leading-[1.65] tracking-[-0.015em]">
            Transformative Erlebnisse, die tiefgreifende Veränderungen bewirken und nachhaltige Resultate schaffen
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={linkTarget}
              className="group relative inline-flex items-center justify-center gap-3 h-[60px] px-10 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_60px_rgba(234,179,8,0.3)] hover:shadow-[0_0_100px_rgba(234,179,8,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #facc15 0%, #f97316 100%)'
              }}
            >
              <span className="relative text-black font-bold text-[15px] tracking-[-0.01em]">
                {linkText}
              </span>
              <ArrowRight className="relative text-black transition-transform duration-500 group-hover:translate-x-1" size={18} strokeWidth={2.5} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </a>

            <button className="group inline-flex items-center gap-3 h-[60px] px-10 rounded-full border-2 border-white/20 backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/60 hover:bg-white/5"
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
              <Calendar className="text-yellow-400" size={18} strokeWidth={2.5} />
              <span className="text-white font-semibold text-[15px] tracking-[-0.01em]">
                Kalender ansehen
              </span>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      <section className="relative py-20 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {events.map((event) => {
              const fromColor = gradientColors[event.gradient_from] || '#facc15';
              const toColor = gradientColors[event.gradient_to] || '#f97316';
              const titleSizeClass = titleFontSizeClasses[event.title_font_size || '3xl'] || 'text-3xl';
              const subtitleSizeClass = textFontSizeClasses[event.subtitle_font_size || 'sm'] || 'text-sm';
              const descriptionSizeClass = textFontSizeClasses[event.description_font_size || 'sm'] || 'text-sm';
              const letterSpacingClass = letterSpacingClasses[event.title_letter_spacing || 'tight'] || 'tracking-tight';
              const eventTypeInfo = EVENT_TYPE_LABELS[event.event_type] || EVENT_TYPE_LABELS.keynote;

              return (
                <div
                  key={event.id}
                  className={`group relative cursor-pointer ${event.custom_css_classes || ''}`}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black transition-all duration-700 hover:scale-[1.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    style={{ height: event.card_height || '450px' }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={event.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${fromColor}15, ${toColor}15)`
                        }}
                      />
                    </div>

                    <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                      <h3
                        className={`${titleSizeClass} text-white leading-tight ${letterSpacingClass} transition-all duration-300 group-hover:text-shadow-glow`}
                        style={{
                          fontFamily: event.title_font_family || 'SF Pro Display, sans-serif',
                          fontWeight: event.title_font_weight || 900,
                          textTransform: (event.title_text_transform as any) || 'uppercase',
                          textShadow: '0 2px 20px rgba(0,0,0,0.8)'
                        }}
                      >
                        {event.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{
                           boxShadow: `inset 0 0 100px ${fromColor}30, inset 0 0 60px ${toColor}20`
                         }} />
                  </div>

                  <div
                    className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${fromColor}, ${toColor})`
                    }}
                  />
                </div>
              );
            })}
          </div>

          {events.length === 0 && (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                   style={{
                     background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(249, 115, 22, 0.1))',
                     border: '2px solid rgba(250, 204, 21, 0.2)'
                   }}>
                <Sparkles className="text-yellow-400" size={40} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Keine Events verfügbar</h3>
              <p className="text-white/60 max-w-md mx-auto">
                Aktuell sind keine Events geplant. Schauen Sie bald wieder vorbei für neue spannende Veranstaltungen!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/5 via-transparent to-transparent" />

        <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 backdrop-blur-xl border border-yellow-400/30"
               style={{
                 background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08), rgba(249, 115, 22, 0.08))'
               }}>
            <Sparkles className="text-yellow-400" size={18} strokeWidth={2.5} />
            <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase">Digitaler Zugang</span>
          </div>

          <h2 className="text-[44px] sm:text-[56px] lg:text-[72px] font-[900] mb-7 leading-[1.05] tracking-[-0.045em]">
            <span className="inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,255,255,0.1)]">
              Nicht vor Ort?
            </span>
          </h2>

          <p className="text-[18px] sm:text-[20px] text-white/70 font-[420] mb-12 leading-[1.7] max-w-[760px] mx-auto tracking-[-0.015em]">
            Alle Events werden aufgezeichnet und als digitale Erlebnisse verfügbar gemacht. Erhalten Sie lebenslangen Zugang zu Content, Workbooks und Bonus-Materialien.
          </p>

          <button
            className="group relative inline-flex items-center justify-center gap-3 h-[60px] px-10 rounded-full backdrop-blur-xl border-2 border-white/20 transition-all duration-500 hover:border-yellow-400/60 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            <span className="text-white font-bold text-[15px] tracking-[-0.01em]">
              Digitalen Zugang erkunden
            </span>
            <ArrowRight className="text-white transition-transform duration-500 group-hover:translate-x-1" size={18} strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </div>
  );
}
