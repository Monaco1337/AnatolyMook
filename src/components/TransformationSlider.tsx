import { useState, useEffect, useRef } from 'react';
import { Plus, Sparkles, Brain, Heart, Compass, Flame, Target, Shield, ArrowRight, X, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ULTRA MINIMALIST HIGH-END FUSION CARD WITH DROPDOWN
function MinimalistFusionCard() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? 'rounded-3xl' : 'rounded-full'
        }`}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 transition-all duration-700" />

        {/* Subtle Gold Accent */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        </div>

        {/* Premium Border */}
        <div className={`absolute inset-0 border transition-all duration-700 ${
          isExpanded
            ? 'rounded-3xl border-yellow-500/30'
            : 'rounded-full border-neutral-700/50 hover:border-yellow-500/20'
        }`} />

        {/* Subtle Glow */}
        <div className={`absolute -inset-[1px] transition-all duration-700 blur-xl ${
          isExpanded
            ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20'
            : 'bg-transparent'
        }`} />

        {/* Content Container */}
        <div className="relative">

          {/* Compact Header - Always Visible */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 transition-all duration-500 hover:bg-white/[0.02]"
          >
            <div className="flex-1 text-left">
              <p className="text-sm sm:text-base font-light text-white/90 italic leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                {t.transformationCard.quote}
              </p>
            </div>

            {/* Plus/X Toggle Button */}
            <div className="flex-shrink-0">
              <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center transition-all duration-500 ${
                isExpanded ? 'rotate-180 scale-95' : 'rotate-0 hover:scale-110 hover:shadow-[0_0_24px_rgba(250,204,21,0.4)]'
              }`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                {isExpanded ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-black relative z-10" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-black relative z-10" strokeWidth={2.5} />
                )}
              </div>
            </div>
          </button>

          {/* Expandable Content - Dropdown */}
          <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 space-y-6">

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-yellow-500/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-yellow-500/30 to-yellow-500/40" />
              </div>

              {/* CTA Content */}
              <div className="space-y-4 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.015em' }}>
                  {t.transformationCard.heading}
                </h3>

                <p className="text-sm sm:text-base text-white/60 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                  {t.transformationCard.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#booking"
                  className="group relative flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(250,204,21,0.25)] hover:shadow-[0_6px_28px_rgba(250,204,21,0.35)]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
                >
                  <Calendar className="w-4 h-4" strokeWidth={2.5} />
                  {t.transformationCard.bookAppointment}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="#kontakt"
                  className="group relative flex-1 px-6 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-neutral-700/50 hover:border-yellow-500/30 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  {t.transformationCard.sendMessage}
                </a>
              </div>

              {/* Trust Micro-Badge */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                  Kostenfrei
                  <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                  Vertraulich
                  <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                  Unverbindlich
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Light Reflection */}
        <div className={`absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-700 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </div>
  );
}

interface TransformationSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedContent: string[];
  result: string;
  image: string;
  icon: any;
  gradient: string;
}

export default function TransformationSlider() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const slides: TransformationSlide[] = [
    {
      id: 'teacher',
      title: 'Der Lehrer',
      subtitle: 'Anatoly Mook',
      description: 'Bewusstseinstrainer für Freiheit und Performance aus Präsenz.',
      expandedContent: [
        'Anatoly Mook gestaltet die Schnittstelle von innerer Wahrheit und äußerem Resultat. Sein Ansatz ist klar, direkt und alltagstauglich: Blockaden lösen, Selbstführung stabilisieren, Entscheidungen präzisieren – als tragfähige Struktur im Leben und im Business.',
        'Sein Wirken beginnt dort, wo herkömmliche Methoden enden: nicht Motivation, sondern Neuordnung der inneren Architektur – mit spürbarer Konsequenz in Führung, Beziehung und Leben. Keine Lehre zum Sammeln, sondern ein Rahmen, der Erkenntnis in integrierte Meisterschaft übersetzt.',
        'Ich bin hier, um dich zu erinnern, wer du wirklich bist – und welches Potenzial in dir auf dich wartet. Mehr Wahrheit. Präsenz, die trägt. Wirkung, die bleibt.',
        'Ich öffne Raum für Klarheit, bis du dich wieder spürst: ruhig, wach, handlungsfähig. Alles Wesentliche ist bereits da – wir machen es wieder zugänglich.',
        'Du bist genau richtig. Jetzt wird es klar.'
      ],
      result: 'Transformation durch Präsenz und innere Wahrheit',
      image: '/anatoly-mok-hero.png',
      icon: Brain,
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'achtsamkeit',
      title: 'Achtsamkeitslehre',
      subtitle: 'Selbstverwirklichung',
      description: 'Ordnung innen: Ausrichtung wird klar, Ressourcen werden frei, Umsetzungskraft wird stabil.',
      expandedContent: [
        'Ordnung innen: Ausrichtung wird klar, Ressourcen werden frei, Umsetzungskraft wird stabil.'
      ],
      result: 'Selbstverwirklichung als ruhiger, tragfähiger Seinszustand',
      image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1920',
      icon: Heart,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'bewusstsein',
      title: 'Bewusstseinstraining',
      subtitle: 'Transzendenz',
      description: 'Über Muster hinaus: direkte Wahrnehmung, stille Präsenz, innere Autorität.',
      expandedContent: [
        'Über Muster hinaus: direkte Wahrnehmung, stille Präsenz, innere Autorität.'
      ],
      result: 'Transzendenz im Alltag – weniger Illusion, mehr Wahrheit',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1920',
      icon: Compass,
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'transformation',
      title: 'Transformation',
      subtitle: 'Performance',
      description: 'Neuordnung von Körper, Geist und Verhalten: Vitalität, Fokus, Durchsetzungskraft – ohne auszubrennen.',
      expandedContent: [
        'Neuordnung von Körper, Geist und Verhalten: Vitalität, Fokus, Durchsetzungskraft – ohne auszubrennen.'
      ],
      result: 'Leistung aus Klarheit statt Druck',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920',
      icon: Flame,
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 'erfolg',
      title: 'Erfolgscoaching',
      subtitle: 'Wirksamkeit',
      description: 'Erkenntnis wird Resultat: Entscheidungen, Struktur, Wirksamkeit – klar, konkret, konsequent.',
      expandedContent: [
        'Erkenntnis wird Resultat: Entscheidungen, Struktur, Wirksamkeit – klar, konkret, konsequent.'
      ],
      result: 'Erfolg mit Freiheit: Selbstführung und Entscheidungen mit Konsequenz',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
      icon: Target,
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'selbstverwirklichung',
      title: 'Selbstverwirklichung',
      subtitle: 'Freiheit',
      description: 'Vom Tun ins Sein: Liebe, Harmonie, tiefe Erfüllung – unabhängig vom Außen.',
      expandedContent: [
        'Vom Tun ins Sein: Liebe, Harmonie, tiefe Erfüllung – unabhängig vom Außen.'
      ],
      result: 'Freiheit als Grundton – Beziehungen werden echter, Leben wird weiter',
      image: 'https://images.pexels.com/photos/1525043/pexels-photo-1525043.jpeg?auto=compress&cs=tinysrgb&w=1920',
      icon: Shield,
      gradient: 'from-indigo-500/20 to-violet-500/20'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!expandedSlide) {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [expandedSlide, slides.length]);

  const handleSwipeStart = (clientX: number) => {
    isDragging.current = true;
    touchStartX.current = clientX;
    touchEndX.current = clientX;
  };

  const handleSwipeMove = (clientX: number) => {
    if (!isDragging.current) return;
    touchEndX.current = clientX;
    const diff = touchEndX.current - touchStartX.current;
    setSwipeOffset(diff);
  };

  const handleSwipeEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchEndX.current - touchStartX.current;
    const threshold = 50;

    if (swipeDistance > threshold) {
      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (swipeDistance < -threshold) {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }

    setSwipeOffset(0);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTouchStart = (e: TouchEvent) => {
      handleSwipeStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleSwipeMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      handleSwipeEnd();
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleSwipeStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleSwipeMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleSwipeEnd();
    };

    const handleMouseLeave = () => {
      if (isDragging.current) {
        handleSwipeEnd();
      }
    };

    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative bg-black overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32" data-section>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Static Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight tracking-tight" style={{ fontFamily: "'Inter', 'SF Pro Display', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t.transformationSection.header.title1}
            <span className="block mt-1 sm:mt-1.5 md:mt-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.transformationSection.header.title2}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/70 leading-relaxed mb-4 sm:mb-5 md:mb-6 lg:mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            {t.transformationSection.header.description1}
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            {t.transformationSection.header.description2}<br className="hidden sm:block" />
            {t.transformationSection.header.description3}
          </p>
        </div>

        {/* Ultra Premium Slider */}
        <div className="relative mb-10 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24">
          <div
            ref={sliderRef}
            className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[500px] cursor-grab active:cursor-grabbing touch-pan-y select-none"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              const Icon = slide.icon;
              const isExpanded = expandedSlide === slide.id;

              return (
                <div
                  key={slide.id}
                  className={`transition-all ${isDragging.current ? 'duration-0' : 'duration-1000'} ease-out ${
                    isActive ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
                  }`}
                  style={{
                    transform: isActive ? `translateX(${swipeOffset}px)` : undefined,
                  }}
                >
                  {/* Ultra Premium Glass Card */}
                  <div className="relative w-full rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden min-h-[480px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[500px]">
                    {/* Multi-Layer Glass Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03]" />
                    <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150" />

                    {/* Dynamic Accent Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

                    {/* Premium Border System */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] border border-white/[0.15]" />
                    <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] ring-1 ring-inset ring-white/[0.08]" />

                    {/* Ultra Luxury Shadow */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]" />

                    {/* Content Grid */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 p-3 sm:p-4 md:p-5 lg:p-6">
                      {/* LEFT: Image */}
                      <div className="relative rounded-lg sm:rounded-xl md:rounded-[1rem] overflow-hidden h-44 sm:h-52 md:h-60 lg:h-96 order-1">
                        <img
                          src={slide.image}
                          alt={`Anatoly Mook – ${slide.title}: ${slide.subtitle}`}
                          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[10000ms] ease-out"
                          loading="lazy"
                        />

                        {/* Image Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                        <div className={`absolute inset-0 bg-gradient-to-tr ${slide.gradient}`} />

                        {/* Floating Icon Badge */}
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)]">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* RIGHT: Content */}
                      <div className="flex flex-col justify-start space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3 xl:space-y-4 order-2 pb-2">
                        {/* Subtitle Badge */}
                        <div className="inline-flex items-center gap-1 sm:gap-1.5 self-start px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15]">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold text-yellow-400 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {slide.subtitle}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-[0.95] tracking-tighter" style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                          {slide.title}
                        </h3>

                        {/* Divider */}
                        <div className="h-0.5 w-8 sm:w-10 md:w-12 lg:w-16 xl:w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.5' }}>
                          {slide.description}
                        </p>

                        {/* Result Box */}
                        <div className="relative rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-xl bg-white/[0.05] border border-white/[0.12] p-2 sm:p-2.5 md:p-3 lg:p-4">
                          <div className="flex items-start gap-1.5 sm:gap-2">
                            <div className="flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mt-0.5">
                              <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 text-black" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold text-yellow-400 uppercase tracking-wider mb-0.5 sm:mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Ergebnis
                              </p>
                              <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-white/90 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {slide.result}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Dropdown */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedSlide(isExpanded ? null : slide.id);
                          }}
                          className="group relative w-full rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.12] hover:border-yellow-400/30 p-2 sm:p-2.5 md:p-3 lg:p-3.5 transition-all duration-300 active:scale-95 touch-manipulation"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-bold text-white/80 group-hover:text-white uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {isExpanded ? t.transformationSection.showLess : t.transformationSection.showMore}
                            </span>
                            <div className={`w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center transition-transform duration-500 flex-shrink-0 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
                              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-black" strokeWidth={3} />
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1200px] opacity-100 mt-2 sm:mt-2.5 md:mt-3' : 'max-h-0 opacity-0'}`}>
                            <div className="pt-2 sm:pt-2.5 md:pt-3 border-t border-white/[0.08] space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                              {slide.expandedContent.map((text, idx) => (
                                <p key={idx} className={`text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-relaxed ${idx === slide.expandedContent.length - 1 ? 'text-white italic font-medium' : 'text-white/70'}`} style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}>
                                  {text}
                                </p>
                              ))}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Glass Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Navigation Dots */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 md:mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className="group relative touch-manipulation"
                aria-label={`Slide ${index + 1}`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className={`transition-all duration-500 ${
                  index === activeSlide
                    ? 'w-7 sm:w-8 md:w-10 h-1.5 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-500'
                    : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 active:bg-white/40'
                } rounded-full`} />

                {index === activeSlide && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-md opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ULTRA HIGH-END PREMIUM RESULTS SECTION - Maximum Luxury */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24">
          {/* Premium Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mb-1.5 sm:mb-2">
              <div className="h-[1px] w-10 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-yellow-400/50 to-yellow-400/80" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.3em] bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t.transformationSection.results.badge}
              </span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
              <div className="h-[1px] w-10 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-yellow-400/50 to-yellow-400/80" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white leading-tight px-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t.transformationSection.results.heading}
            </h3>
          </div>

          {/* Premium Tab Navigation with Glassmorphism */}
          <div className="relative mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 md:gap-3 pb-1 min-w-max sm:min-w-0">
                {[
                  { id: 'energie', label: t.transformationSection.results.tabs.energie, gradient: 'from-orange-500/20 to-red-600/20' },
                  { id: 'praesenz', label: t.transformationSection.results.tabs.praesenz, gradient: 'from-blue-500/20 to-cyan-600/20' },
                  { id: 'stabilitaet', label: t.transformationSection.results.tabs.stabilitaet, gradient: 'from-green-500/20 to-emerald-600/20' },
                  { id: 'klarheit', label: t.transformationSection.results.tabs.klarheit, gradient: 'from-yellow-400/20 to-yellow-600/20' },
                  { id: 'frieden', label: t.transformationSection.results.tabs.frieden, gradient: 'from-sky-400/20 to-blue-500/20' },
                  { id: 'erfolg', label: t.transformationSection.results.tabs.erfolg, gradient: 'from-yellow-500/20 to-orange-600/20' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const current = expandedSlide === tab.id;
                      setExpandedSlide(current ? null : tab.id);
                    }}
                    className={`group relative px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full backdrop-blur-xl transition-all duration-500 ${
                      expandedSlide === tab.id
                        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/60 scale-105'
                        : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:scale-105'
                    }`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: expandedSlide === tab.id ? 700 : 500,
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <span className={`relative z-10 transition-all duration-300 ${
                      expandedSlide === tab.id
                        ? 'text-white drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                        : 'text-white/60 group-hover:text-white/90'
                    }`}>
                      {tab.label}
                    </span>
                    {expandedSlide === tab.id && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ULTRA PREMIUM DROPDOWN CONTENT WITH IMAGES */}
          <div className={`overflow-hidden transition-all duration-700 ${
            expandedSlide ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4">
              {/* Energie */}
              {expandedSlide === 'energie' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.energie.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.energie.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.energie.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.energie.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Präsenz */}
              {expandedSlide === 'praesenz' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-600/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.praesenz.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.praesenz.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.praesenz.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.praesenz.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stabilität */}
              {expandedSlide === 'stabilitaet' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.stabilitaet.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.stabilitaet.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.stabilitaet.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.stabilitaet.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Klarheit */}
              {expandedSlide === 'klarheit' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.klarheit.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.klarheit.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.klarheit.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.klarheit.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Frieden */}
              {expandedSlide === 'frieden' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-500/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/1525043/pexels-photo-1525043.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.frieden.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-500/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.frieden.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.frieden.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.frieden.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Erfolg */}
              {expandedSlide === 'erfolg' && (
                <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] border border-white/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] group animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/10" />
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-full min-h-[300px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
                      <img
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt={t.transformationSection.results.content.erfolg.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] opacity-0 animate-fade-in-image"
                        loading="eager"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 pointer-events-none" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {t.transformationSection.results.content.erfolg.title}
                      </h4>
                      <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                      <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                        {t.transformationSection.results.content.erfolg.description}
                      </p>
                      <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-yellow-400/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t.transformationSection.results.resultLabel} {t.transformationSection.results.content.erfolg.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MINIMALIST HIGH-END FUSION WITH DROPDOWN */}
        <MinimalistFusionCard />
      </div>

      {/* Custom CSS for horizontal scrolling and animations */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-image {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-image {
          animation: fade-in-image 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}
