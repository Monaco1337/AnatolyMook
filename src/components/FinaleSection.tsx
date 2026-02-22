import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Plus, Heart, Brain, Shield, Star, Sparkles, Zap, Target, Crown, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FinaleSection() {
  const { t } = useLanguage();
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const transcendenceLevels = useMemo(() => [
    {
      title: t.transformationSlider.levels.mindfulness.title,
      subtitle: t.transformationSlider.levels.mindfulness.subtitle,
      description: t.transformationSlider.levels.mindfulness.description,
      icon: Heart,
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      title: t.transformationSlider.levels.consciousness.title,
      subtitle: t.transformationSlider.levels.consciousness.subtitle,
      description: t.transformationSlider.levels.consciousness.description,
      icon: Brain,
      gradient: 'from-violet-400 to-purple-500'
    },
    {
      title: t.transformationSlider.levels.transformation.title,
      subtitle: t.transformationSlider.levels.transformation.subtitle,
      description: t.transformationSlider.levels.transformation.description,
      icon: Shield,
      gradient: 'from-amber-400 to-orange-500'
    }
  ], [t]);

  const testimonials = useMemo(() => [
    { text: t.transformationSlider.testimonials.testimonial1.text, author: t.transformationSlider.testimonials.testimonial1.author },
    { text: t.transformationSlider.testimonials.testimonial2.text, author: t.transformationSlider.testimonials.testimonial2.author },
    { text: t.transformationSlider.testimonials.testimonial3.text, author: t.transformationSlider.testimonials.testimonial3.author }
  ], [t]);

  const journeyPanels = useMemo(() => [
    {
      id: 1,
      title: t.transformationSlider.journey.panel1.title,
      preview: t.transformationSlider.journey.panel1.preview,
      icon: Target,
      items: t.transformationSlider.journey.panel1.items
    },
    {
      id: 2,
      title: t.transformationSlider.journey.panel2.title,
      preview: t.transformationSlider.journey.panel2.preview,
      icon: Sparkles,
      items: t.transformationSlider.journey.panel2.items
    },
    {
      id: 3,
      title: t.transformationSlider.journey.panel3.title,
      preview: t.transformationSlider.journey.panel3.preview,
      icon: Crown,
      text: t.transformationSlider.journey.panel3.text
    }
  ], [t]);

  const stats = useMemo(() => [
    { value: '15+', label: t.transformationSlider.stats.experience.label, sublabel: t.transformationSlider.stats.experience.sublabel },
    { value: '500+', label: t.transformationSlider.stats.transformations.label, sublabel: t.transformationSlider.stats.transformations.sublabel },
    { value: '98%', label: t.transformationSlider.stats.recommendation.label, sublabel: t.transformationSlider.stats.recommendation.sublabel },
    { value: '1:1', label: t.transformationSlider.stats.individual.label, sublabel: t.transformationSlider.stats.individual.sublabel }
  ], [t]);

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-12 lg:pt-16">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/20 via-amber-500/15 to-orange-500/20 border border-yellow-400/30 backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_0_30px_rgba(250,204,21,0.15)]">
            <div className="relative">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <div className="absolute inset-0 animate-ping">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-300 bg-clip-text text-transparent uppercase">
              {t.transformationSlider.badge}
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-3 sm:mb-4">
            {t.transformationSlider.heading.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {t.transformationSlider.heading.split(' ').slice(-2).join(' ')}
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-xl" />
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t.transformationSlider.description}
          </p>
        </div>

        <div
          className="relative w-full h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0">
            <img
              src="/bildschirmfoto_2026-01-02_um_22.35.10.png"
              alt={t.transformationSlider.imageAlt}
              className="w-full h-full object-cover object-[15%_center] sm:object-[20%_center] scale-105 transition-transform duration-[20s] hover:scale-110"
            />

            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>

          <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex justify-between items-start">
            <div className="hidden sm:flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-8 rounded-full bg-white/20 overflow-hidden"
                >
                  <div
                    className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 transition-all duration-1000"
                    style={{ height: `${(i + 1) * 33}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="ml-auto">
              <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/60">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  <span>{t.transformationSlider.availability}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full flex items-end">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8 lg:pb-12">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
                <div className="hidden lg:block max-w-sm">
                  <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400/60" />
                    <div className="relative">
                      <p className="text-sm text-white/80 italic leading-relaxed mb-3">
                        "{testimonials[activeTestimonial].text}"
                      </p>
                      <p className="text-xs text-yellow-400/80 font-medium">
                        — {testimonials[activeTestimonial].author}
                      </p>
                    </div>
                    <div className="flex gap-1.5 mt-3">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTestimonial(i)}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            i === activeTestimonial
                              ? 'w-6 bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'w-1.5 bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:max-w-lg">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.transformationSlider.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/10 text-white/70 border border-white/10 backdrop-blur-xl"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight mb-3 sm:mb-4">
                    {t.transformationSlider.cta.heading.split(' ').slice(0, -2).join(' ')}{' '}
                    <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {t.transformationSlider.cta.heading.split(' ').slice(-2).join(' ')}
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4 sm:mb-6 max-w-md">
                    {t.transformationSlider.cta.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#booking"
                      className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_16px_48px_rgba(250,204,21,0.3)] hover:shadow-[0_20px_60px_rgba(250,204,21,0.5)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400" />
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative text-black text-sm sm:text-base font-bold">{t.transformationSlider.cta.primary}</span>
                      <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </a>

                    <a
                      href="#coaching"
                      className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <span>{t.transformationSlider.cta.secondary}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/[0.08]" />
        </div>
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20 rounded-2xl sm:rounded-3xl opacity-50" />
            <div className="relative h-full bg-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/[0.08] p-5 sm:p-6 lg:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,1)]" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping opacity-50" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-yellow-300 uppercase">{t.transformationSlider.journey.badge}</span>
                </div>
                <Zap className="w-5 h-5 text-yellow-400/40" />
              </div>

              <div className="mb-6">
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  {t.transformationSlider.journey.intro}
                </p>
              </div>

              <div className="space-y-3">
                {journeyPanels.map((panel) => {
                  const Icon = panel.icon;
                  const isOpen = openPanel === panel.id;
                  return (
                    <div key={panel.id} className="relative group/panel">
                      <div className={`absolute -inset-[1px] bg-gradient-to-r from-yellow-400/40 via-orange-400/30 to-yellow-400/40 rounded-xl sm:rounded-2xl transition-all duration-500 pointer-events-none ${isOpen ? 'opacity-100 blur-[1px]' : 'opacity-0'}`} />
                      <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.08] shadow-[0_8px_32px_rgba(250,204,21,0.1)]' : 'bg-white/[0.04] hover:bg-white/[0.06]'} border border-white/[0.08]`}>
                        <button
                          onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_8px_24px_rgba(250,204,21,0.4)] scale-105' : 'bg-white/10'}`}>
                              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isOpen ? 'text-black' : 'text-yellow-400'}`} strokeWidth={2} />
                            </div>
                            <div>
                              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300 ${isOpen ? 'text-yellow-400' : 'text-yellow-400/70'}`}>
                                {panel.title}
                              </p>
                              <p className={`text-sm sm:text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/70'}`}>
                                {panel.preview}
                              </p>
                            </div>
                          </div>
                          <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-gradient-to-br from-yellow-400 to-orange-500 rotate-45 shadow-[0_4px_16px_rgba(250,204,21,0.5)]' : 'bg-white/10 group-hover/panel:bg-white/15'}`}>
                            <Plus className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? 'text-black' : 'text-yellow-400'}`} strokeWidth={2.5} />
                          </div>
                        </button>

                        <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                              <div className="h-px bg-gradient-to-r from-yellow-400/30 via-orange-400/20 to-transparent mb-4" />
                              {panel.items ? (
                                <div className="space-y-2.5">
                                  {panel.items.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 group/item">
                                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                                      <p className="text-sm text-white/80 leading-relaxed group-hover/item:text-white/95 transition-colors">{item}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-white/75 leading-relaxed">{panel.text}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-400/20 via-transparent to-yellow-400/20 rounded-2xl sm:rounded-3xl opacity-50" />
            <div className="relative h-full bg-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/[0.08] p-5 sm:p-6 lg:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-amber-200 uppercase">{t.transformationSlider.levels.badge}</span>
                </div>
                <Crown className="w-5 h-5 text-amber-400/40" />
              </div>

              <div className="mb-6">
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  {t.transformationSlider.levels.intro}
                </p>
              </div>

              <div className="space-y-3">
                {transcendenceLevels.map((level, index) => {
                  const Icon = level.icon;
                  const isOpen = expandedLevel === index;
                  return (
                    <div key={index} className="relative group/level">
                      <div className={`absolute -inset-[1px] bg-gradient-to-r ${level.gradient} rounded-xl sm:rounded-2xl transition-all duration-500 pointer-events-none ${isOpen ? 'opacity-40 blur-[2px]' : 'opacity-0'}`} />
                      <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.08] shadow-[0_8px_32px_rgba(251,191,36,0.1)]' : 'bg-white/[0.04] hover:bg-white/[0.06]'} border border-white/[0.08]`}>
                        <button
                          onClick={() => setExpandedLevel(isOpen ? null : index)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'scale-105 shadow-[0_8px_24px_rgba(251,191,36,0.4)]' : ''}`}>
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                              {isOpen && (
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${level.gradient} animate-pulse opacity-50`} />
                              )}
                            </div>
                            <div>
                              <h3 className={`text-sm sm:text-base font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/90'}`}>
                                {level.title}
                              </h3>
                              <p className={`text-xs sm:text-sm transition-colors duration-300 ${isOpen ? 'text-amber-400' : 'text-white/50'}`}>
                                {level.subtitle}
                              </p>
                            </div>
                          </div>
                          <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${isOpen ? `bg-gradient-to-br ${level.gradient} rotate-45 shadow-[0_4px_16px_rgba(251,191,36,0.5)]` : 'bg-white/10 group-hover/level:bg-white/15'}`}>
                            <Plus className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-amber-400'}`} strokeWidth={2.5} />
                          </div>
                        </button>

                        <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                              <div className={`h-px bg-gradient-to-r ${level.gradient} opacity-30 mb-4`} />
                              <p className="text-sm text-white/80 leading-relaxed">{level.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 sm:mt-8">
                <a
                  href="#booking"
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 sm:py-5 overflow-hidden rounded-xl sm:rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                  </div>
                  <span className="relative text-black text-sm sm:text-base font-bold">{t.transformationSlider.cta.finalCta}</span>
                  <ArrowRight className="relative w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </a>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                    <span>{t.transformationSlider.cta.details.duration}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/50 text-xs">{t.transformationSlider.cta.details.confidential}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/50 text-xs">{t.transformationSlider.cta.details.nonBinding}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-500/10 via-black/50 to-orange-500/10 border border-white/[0.08] p-6 sm:p-8 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,146,60,0.1),transparent_50%)]" />

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-white/50">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
