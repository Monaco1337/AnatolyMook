import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, MapPin, Users, ArrowRight, CheckCircle, Target, Zap, Award, Sparkles } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  cta_text?: string;
  card_height?: string;
  overlay_opacity?: number;
  show_author_badge?: boolean;
  gradient_from?: string;
  gradient_to?: string;
  title_font_size?: string;
  subtitle_font_size?: string;
  description_font_size?: string;
  title_letter_spacing?: string;
  title_font_family?: string;
  title_font_weight?: number;
  title_text_transform?: string;
  subtitle_font_family?: string;
  subtitle_font_weight?: number;
  custom_css_classes?: string;
}

interface EventDetailModalProps {
  event: EventData;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);

      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      requestAnimationFrame(() => {
        if (typeof scrollY === 'number' && scrollY >= 0) {
          try {
            window.scrollTo({
              top: scrollY,
              left: 0,
              behavior: 'instant' as ScrollBehavior
            });
          } catch (e) {
            window.scrollTo(0, scrollY);
          }
        }
      });
    };
  }, []);

  if (!event) return null;

  const benefits = [
    'Sofortige praktische Anwendung',
    'Persoenliche Transformation',
    'Nachhaltige Verhaltensaenderung',
    'Exklusive Ressourcen & Tools',
    'Lebenslanger Zugang zu Materialien',
    'Zertifikat nach Abschluss'
  ];

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      try {
        window.location.hash = '#contact';
      } catch (e) {
        console.error('Error navigating to contact:', e);
      }
    }, 100);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={scrollContainerRef}
        className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 100px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          margin: 'auto',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
            <button
              onClick={handleCloseClick}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
              aria-label="Schliessen"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 hover:text-white" strokeWidth={2.5} />
            </button>

            {event.image_url && (
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(245, 158, 11, 0.9))',
                      color: '#000'
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Event
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`${event.image_url ? '' : 'pt-14'}`}>
              <div className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6">
                <h1
                  className="text-xl sm:text-2xl lg:text-3xl text-white font-bold mb-2 sm:mb-3"
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    lineHeight: 1.15
                  }}
                >
                  {event.title}
                </h1>

                {event.subtitle && (
                  <div className="mb-4 sm:mb-5 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/10 border border-yellow-400/40">
                    <p className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold leading-relaxed">
                      {event.subtitle}
                    </p>
                  </div>
                )}

                {event.description && (
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                      <h2 className="text-base sm:text-lg lg:text-xl text-white font-semibold">Ueber das Event</h2>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}


                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-yellow-400/10 to-orange-400/5 border border-yellow-400/20">
                    <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 mx-auto mb-1.5 sm:mb-2" />
                    <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base">Termine</h3>
                    <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-sm mt-0.5 hidden sm:block">Flexibel</p>
                  </div>

                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-yellow-400/10 to-orange-400/5 border border-yellow-400/20">
                    <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 mx-auto mb-1.5 sm:mb-2" />
                    <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base">Ort</h3>
                    <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-sm mt-0.5 hidden sm:block">Live & Online</p>
                  </div>

                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-yellow-400/10 to-orange-400/5 border border-yellow-400/20">
                    <Users className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 mx-auto mb-1.5 sm:mb-2" />
                    <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base">Format</h3>
                    <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-sm mt-0.5 hidden sm:block">Interaktiv</p>
                  </div>
                </div>

                <div className="space-y-3 pt-5 sm:pt-6 border-t border-white/10">
                  <button
                    onClick={handleContactClick}
                    className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                      boxShadow: '0 8px 32px rgba(251, 191, 36, 0.35)'
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-black">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>{event.cta_text || 'Jetzt Anmelden'}</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </button>

                  <button
                    onClick={handleCloseClick}
                    className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-white/70 font-medium text-sm sm:text-base transition-all duration-300 hover:text-white hover:bg-white/5 border border-white/10"
                  >
                    Schliessen
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>,
    document.body
  );
}
